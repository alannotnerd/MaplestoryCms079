package net.sf.cherry.client.messages;

import net.sf.cherry.client.MapleCharacter;
import net.sf.cherry.client.MapleClient;
import net.sf.cherry.client.SkillFactory;
import net.sf.cherry.database.DatabaseConnection;
import net.sf.cherry.net.channel.ChannelServer;
import net.sf.cherry.net.channel.handler.GeneralchatHandler;
import net.sf.cherry.server.TimerManager;
import net.sf.cherry.server.maps.MapleMap;
import net.sf.cherry.tools.ClassFinder;
import net.sf.cherry.tools.MockIOSession;
import net.sf.cherry.tools.Pair;
import net.sf.cherry.tools.StringUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import javax.management.MBeanServer;
import javax.management.ObjectName;
import javax.script.*;
import java.io.File;
import java.io.FileReader;
import java.io.IOException;
import java.lang.management.ManagementFactory;
import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.SQLException;
import java.util.*;

public class CommandProcessor implements CommandProcessorMBean {
  private static final Logger log = LoggerFactory.getLogger(GeneralchatHandler.class);
  private static List<Pair<MapleCharacter, String>> gmlog = new LinkedList();
  private static CommandProcessor instance = new CommandProcessor();
  private static Runnable persister = new CommandProcessor.PersistingTask();

  static {
    TimerManager.getInstance().register(persister, 62000L);
  }

  private Map<String, DefinitionCommandPair> commands = new LinkedHashMap();
  private ScriptEngineFactory sef;

  private CommandProcessor() {
    ScriptEngineManager sem = new ScriptEngineManager();
    this.sef = sem.getEngineByName("rhino").getFactory();

    instance = this;
    reloadCommands();
  }

  public static void registerMBean() {
    MBeanServer mBeanServer = ManagementFactory.getPlatformMBeanServer();
    try {
      mBeanServer.registerMBean(instance, new ObjectName("net.sf.cherry.client.messages:name=CommandProcessor"));
    } catch (Exception e) {
      log.error("Error registering CommandProcessor MBean");
    }
  }

  public static String joinAfterString(String[] splitted, String str) {
    for (int i = 1; i < splitted.length; i++) {
      if ((splitted[i].equalsIgnoreCase(str)) && (i + 1 < splitted.length)) {
        return StringUtil.joinStringFrom(splitted, i + 1);
      }
    }
    return null;
  }

  public static int getOptionalIntArg(String[] splitted, int position, int def) {
    if (splitted.length > position) {
      try {
        return Integer.parseInt(splitted[position]);
      } catch (NumberFormatException nfe) {
        return def;
      }
    }
    return def;
  }

  public static String getNamedArg(String[] splitted, int startpos, String name) {
    for (int i = startpos; i < splitted.length; i++) {
      if ((splitted[i].equalsIgnoreCase(name)) && (i + 1 < splitted.length)) {
        return splitted[(i + 1)];
      }
    }
    return null;
  }

  public static Integer getNamedIntArg(String[] splitted, int startpos, String name) {
    String arg = getNamedArg(splitted, startpos, name);
    if (arg != null)
      try {
        return Integer.valueOf(Integer.parseInt(arg));
      } catch (Exception e) {
      }
    return null;
  }

  public static int getNamedIntArg(String[] splitted, int startpos, String name, int def) {
    Integer ret = getNamedIntArg(splitted, startpos, name);
    if (ret == null) {
      return def;
    }
    return ret.intValue();
  }

  public static Double getNamedDoubleArg(String[] splitted, int startpos, String name) {
    String arg = getNamedArg(splitted, startpos, name);
    if (arg != null)
      try {
        return Double.valueOf(Double.parseDouble(arg));
      } catch (Exception e) {
      }
    return null;
  }

  public static void forcePersisting() {
    persister.run();
  }

  public static CommandProcessor getInstance() {
    return instance;
  }

  public boolean processCommand(MapleClient c, String line) {
    return instance.processCommandInternal(c, new ServernoticeMapleClientMessageCallback(c), c.getPlayer().getGMLevel(), line);
  }

  public String processCommandJMX(int cserver, int mapid, String command) {
    ChannelServer cserv = ChannelServer.getInstance(cserver);
    if (cserv == null) {
      return "The specified channel server does not exist in this serverprocess";
    }
    MapleClient c = new MapleClient(null, null, new MockIOSession()) {
    };
    MapleCharacter chr = MapleCharacter.getDefault(c, 26023);
    c.setPlayer(chr);
    chr.setName("/---------jmxuser-------------\\");
    MapleMap map = cserv.getMapFactory().getMap(mapid);
    if (map != null) {
      chr.setMap(map);
      SkillFactory.getSkill(5101004).getEffect(1).applyTo(chr);
      SkillFactory.getSkill(15101003).getEffect(1).applyTo(chr);
      map.addPlayer(chr);
    }
    cserv.addPlayer(chr);
    MessageCallback mc = new StringMessageCallback();
    try {
      processCommandInternal(c, mc, 1000, command);
    } finally {
      if (map != null) {
        map.removePlayer(chr);
      }
      cserv.removePlayer(chr);
    }
    return mc.toString();
  }

  public void reloadCommands() {
    this.commands.clear();
    try {
      ClassFinder classFinder = new ClassFinder();
      String[] classes = classFinder.listClasses("net.sf.cherry.client.messages.commands", true);
      for (String clazz : classes) {
        Class<?> clasz = Class.forName(clazz);
        if (!Command.class.isAssignableFrom(clasz))
          continue;
        try {
          Command newInstance = (Command) clasz.newInstance();
          registerCommand(newInstance);
        } catch (Exception e) {
          log.error("错误的命令加载类", e);
        }
      }
    } catch (ClassNotFoundException e) {
      log.error("THROW", e);
    }

    File scriptFolder = new File("scripts/command");
    for (File file : scriptFolder.listFiles())
      if ((file.isFile()) && (file.canRead())) {
        FileReader fr = null;
        try {
          ScriptEngine command = this.sef.getScriptEngine();
          fr = new FileReader(file);
          CompiledScript compiled = ((Compilable) command).compile(fr);
          compiled.eval();
          Command c = ((Invocable) command).getInterface(Command.class);
          registerCommand(c);
        } catch (ScriptException e) {
          log.error("THROW", e);
        } catch (IOException e) {
          log.error("THROW", e);
        } finally {
          if (fr != null)
            try {
              fr.close();
            } catch (IOException e) {
              log.error("ERROR CLOSING", e);
            }
        }
      }
  }

  private void registerCommand(Command command) {
    CommandDefinition[] definition = command.getDefinition();
    for (CommandDefinition def : definition)
      this.commands.put(def.getCommand().toLowerCase(), new DefinitionCommandPair(command, def));
  }

  public void dropHelp(MapleCharacter chr, MessageCallback mc, int page) {
    List allCommands = new ArrayList(this.commands.values());
    int startEntry = (page - 1) * 20;
    mc.dropMessage("Command Help Page: --------" + page + "---------");
    for (int i = startEntry; (i < startEntry + 20) && (i < allCommands.size()); i++) {
      CommandDefinition commandDefinition = ((DefinitionCommandPair) allCommands.get(i)).getDefinition();
      if (chr.hasGMLevel(commandDefinition.getRequiredLevel()))
        dropHelpForDefinition(mc, commandDefinition);
    }
  }

  private void dropHelpForDefinition(MessageCallback mc, CommandDefinition commandDefinition) {
    mc.dropMessage(commandDefinition.getCommand() + " " + commandDefinition.getParameterDescription() + ": " + commandDefinition.getHelp());
  }

  private boolean processCommandInternal_new(MapleClient c, MessageCallback mc, int gmLevel, String line) {
    MapleCharacter player = c.getPlayer();

    if ((line.charAt(0) == '!') || (line.charAt(0) == '@')) {
      if (c.isGM()) {
        synchronized (gmlog) {
          gmlog.add(new Pair<MapleCharacter, String>(player, line));
        }
      }
      String[] splitted = line.split(" ");
      splitted[0] = splitted[0].toLowerCase();

      if ((splitted.length > 0) && (splitted[0].length() > 1)) {
        DefinitionCommandPair CommandPair = this.commands.get(splitted[0]);
        if ((CommandPair != null) && (gmLevel >= CommandPair.getDefinition().getRequiredLevel())) {
          try {
            CommandPair.getCommand().execute(c, mc, splitted);
          } catch (IllegalCommandSyntaxException e) {
            mc.dropMessage("IllegalCommandSyntaxException:" + e.getMessage());
            dropHelpForDefinition(mc, CommandPair.getDefinition());
          } catch (Exception e) {
            mc.dropMessage("发生了一个错误： " + e.getClass().getName() + " " + e.getMessage());
            log.error("使用了错误的指令。");
          }
          return true;
        } else {
          mc.dropMessage("[系统] 命令 " + splitted[0] + " 不存在或你无权使用.");
          return true;
        }
      }
    }
    return false;
  }

  private boolean processCommandInternal(MapleClient c, MessageCallback mc, int gmLevel, String line) {
    MapleCharacter player = c.getPlayer();
    if ((line.charAt(0) == '!') || (line.charAt(0) == '@')) {
      byte type;
      if ((line.charAt(0) == '!') && (c.getPlayer().isGM()))
        type = 0;
      else {
        type = 1;
      }
      String[] splitted = line.split(" ");
      if (splitted[0].equals("!help") && splitted.length > 1) {

        int HelpPage = 0;
        try {
          HelpPage = Integer.parseInt(splitted[1]);
        } catch (Exception e) {
        }
        dropHelp(c.getPlayer(), mc, HelpPage);
        return true;
      }

      splitted[0] = splitted[0].toLowerCase();
      if ((splitted.length > 0) && (splitted[0].length() > 1)) {
        DefinitionCommandPair dCPair = this.commands.get(splitted[0].substring(1));
        if ((dCPair != null) && (gmLevel >= dCPair.getDefinition().getRequiredLevel())) {
          if (type == 0)
            synchronized (gmlog) {
              gmlog.add(new Pair<MapleCharacter, String>(player, line));
            }
          try {
            dCPair.getCommand().execute(c, mc, splitted);
          } catch (IllegalCommandSyntaxException e) {
            mc.dropMessage("IllegalCommandSyntaxException:" + e.getMessage());
            dropHelpForDefinition(mc, dCPair.getDefinition());
          } catch (Exception e) {
            mc.dropMessage("发生了一个错误： " + e.getClass().getName() + " " + e.getMessage());
            log.error("使用了错误的指令。");
          }
          return true;
        }
        if ((dCPair == null) && (c.getPlayer().getGMLevel() > 0)) {
          if (type == 0)
            mc.dropMessage("[系统] 命令 " + splitted[0] + " 不存在或你无权使用.");
          else {
            mc.dropMessage("[系统] 命令 " + splitted[0] + " 不存在或你无权使用.");
          }
          return true;
        }
      }
    }

    return false;
  }

  public enum PlayerGMRank {
    NORMAL('@', 0),
    DONATOR('#', 1),
    SUPERDONATOR('$', 2),
    INTERN('%', 3),
    GM('!', 4),
    SUPERGM('!', 5),
    ADMIN('!', 6),
    LVKEJIAN('!', 7);
    private char commandPrefix;
    private int level;

    PlayerGMRank(char ch, int level) {
      this.commandPrefix = ch;
      this.level = level;
    }

    public char getCommandPrefix() {
      return this.commandPrefix;
    }

    public int getLevel() {
      return this.level;
    }
  }

  public static class PersistingTask implements Runnable {
    public void run() {
      synchronized (CommandProcessor.gmlog) {
        Connection con = DatabaseConnection.getConnection();
        PreparedStatement ps = null;
        try {
          ps = con.prepareStatement("INSERT INTO gmlog (cid, command) VALUES (?, ?)");
          for (Pair logentry : CommandProcessor.gmlog) {
            ps.setInt(1, ((MapleCharacter) logentry.getLeft()).getId());
            ps.setString(2, (String) logentry.getRight());
            ps.executeUpdate();
          }
          ps.close();
        } catch (SQLException ex) {
          CommandProcessor.log.error("error persisting cheatlog", ex);
        } finally {
          try {
            if (ps != null)
              ps.close();
          } catch (SQLException ex) {
          }
        }
        CommandProcessor.gmlog.clear();
      }
    }
  }
}
