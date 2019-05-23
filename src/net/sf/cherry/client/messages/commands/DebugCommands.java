 package net.sf.cherry.client.messages.commands;
 
 import java.util.Arrays;
import java.util.List;

import net.sf.cherry.client.MapleCharacter;
import net.sf.cherry.client.MapleClient;
import net.sf.cherry.client.anticheat.CheatingOffense;
import net.sf.cherry.client.messages.Command;
import net.sf.cherry.client.messages.CommandDefinition;
import net.sf.cherry.client.messages.IllegalCommandSyntaxException;
import net.sf.cherry.client.messages.MessageCallback;
import net.sf.cherry.net.channel.ChannelServer;
import net.sf.cherry.server.MaplePortal;
import net.sf.cherry.server.TimerManager;
import net.sf.cherry.server.cherryms.CherryMScustomEventFactory;
import net.sf.cherry.server.maps.MapleMap;
import net.sf.cherry.server.maps.MapleMapObject;
import net.sf.cherry.server.maps.MapleMapObjectType;
import net.sf.cherry.server.maps.MapleReactor;
import net.sf.cherry.server.maps.MapleReactorFactory;
import net.sf.cherry.server.maps.MapleReactorStats;
import net.sf.cherry.server.quest.MapleQuest;
import net.sf.cherry.tools.MaplePacketCreator;
 
 public class DebugCommands
   implements Command
 {
   public void execute(MapleClient c, MessageCallback mc, String[] splitted)
     throws Exception, IllegalCommandSyntaxException
   {
     MapleCharacter player = c.getPlayer();
     if (splitted[0].equals("!resetquest")) {
       MapleQuest.getInstance(Integer.parseInt(splitted[1])).forfeit(c.getPlayer());
     } else if (splitted[0].equals("!nearestportal")) {
       MaplePortal portal = player.getMap().findClosestSpawnpoint(player.getPosition());
       mc.dropMessage(portal.getName() + " id: " + portal.getId() + " script: " + portal.getScriptName());
     } else if (splitted[0].equals("!spawndebug")) {
       c.getPlayer().getMap().spawnDebug(mc);
     } else if (splitted[0].equals("!timerdebug")) {
       TimerManager.getInstance().dropDebugInfo(mc);
     } else if (splitted[0].equals("!threads")) {
       Thread[] threads = new Thread[Thread.activeCount()];
       Thread.enumerate(threads);
       String filter = "";
       if (splitted.length > 1) {
         filter = splitted[1];
       }
       for (int i = 0; i < threads.length; i++) {
         String tstring = threads[i].toString();
         if (tstring.toLowerCase().indexOf(filter.toLowerCase()) > -1)
           mc.dropMessage(i + ": " + tstring);
       }
     }
     else if (splitted[0].equals("!showtrace")) {
       if (splitted.length < 2) {
         throw new IllegalCommandSyntaxException(2);
       }
       Thread[] threads = new Thread[Thread.activeCount()];
       Thread.enumerate(threads);
       Thread t = threads[Integer.parseInt(splitted[1])];
       mc.dropMessage(t.toString() + ":");
       for (StackTraceElement elem : t.getStackTrace())
         mc.dropMessage(elem.toString());
     }
     else if (splitted[0].equals("!fakerelog")) {
       c.getSession().write(MaplePacketCreator.getCharInfo(player));
       player.getMap().removePlayer(player);
       player.getMap().addPlayer(player);
     } else if (splitted[0].equals("!toggleoffense")) {
       try {
         CheatingOffense co = CheatingOffense.valueOf(splitted[1]);
         co.setEnabled(!co.isEnabled());
       } catch (IllegalArgumentException iae) {
         mc.dropMessage("Offense " + splitted[1] + " not found");
       }
     } else if (splitted[0].equals("!tdrops")) {
       player.getMap().toggleDrops();
     } else if (splitted[0].equals("!dropd")) {
       if (splitted.length > 1) {
         player.getMap().toggleDrops();
         final ChannelServer cservv = player.getClient().getChannelServer();
         final int mapid = player.getMapId();
         c.getSession().write(MaplePacketCreator.getClock(Integer.parseInt(splitted[1])));
         TimerManager.getInstance().schedule(new Runnable() {
           public void run()
           {
             cservv.getMapFactory().getMap(mapid).toggleDrops();
           }
         }
         , Integer.parseInt(splitted[1]) * 1000);
       }
 
     }
     else if (splitted[0].equals("!sreactor")) {
       MapleReactorStats reactorSt = MapleReactorFactory.getReactor(Integer.parseInt(splitted[1]));
       MapleReactor reactor = new MapleReactor(reactorSt, Integer.parseInt(splitted[1]));
       reactor.setDelay(-1);
       reactor.setPosition(c.getPlayer().getPosition());
       c.getPlayer().getMap().spawnReactor(reactor);
     } else if (splitted[0].equals("!hreactor")) {
       c.getPlayer().getMap().getReactorByOid(Integer.parseInt(splitted[1])).hitReactor(c);
     } else if (splitted[0].equals("!lreactor")) {
       MapleMap map = c.getPlayer().getMap();
       List<MapleMapObject>  reactors = map.getMapObjectsInRange(c.getPlayer().getPosition(), (1.0D / 0.0D), Arrays.asList(new MapleMapObjectType[] { MapleMapObjectType.REACTOR }));
         for (MapleMapObject reactorL : reactors) {
         MapleReactor reactor2l = (MapleReactor)reactorL;
         mc.dropMessage("Reactor: oID: " + reactor2l.getObjectId() + " reactorID: " + reactor2l.getId() + " Position: " + reactor2l.getPosition().toString() + " State: " + reactor2l.getState());
       }
     } else if (splitted[0].equals("!dreactor")) {
       MapleMap map = c.getPlayer().getMap();
       List<MapleMapObject> reactors = map.getMapObjectsInRange(c.getPlayer().getPosition(), (1.0D / 0.0D), Arrays.asList(new MapleMapObjectType[] { MapleMapObjectType.REACTOR }));
       if (splitted[1].equals("all"))
         for (MapleMapObject reactorL : reactors) {
           MapleReactor reactor2l = (MapleReactor)reactorL;
           c.getPlayer().getMap().destroyReactor(reactor2l.getObjectId());
         }
       else
         c.getPlayer().getMap().destroyReactor(Integer.parseInt(splitted[1]));
     }
     else if (splitted[0].equals("!rreactor")) {
       c.getPlayer().getMap().resetReactors();
     } else if (splitted[0].equals("!cleardrops")) {
       MapleMap map = c.getPlayer().getMap();
       List<MapleMapObject> items = map.getMapObjectsInRange(c.getPlayer().getPosition(), (1.0D / 0.0D), Arrays.asList(new MapleMapObjectType[] { MapleMapObjectType.ITEM }));
       for (MapleMapObject itemmo : items) {
         map.removeMapObject(itemmo);
         map.broadcastMessage(MaplePacketCreator.removeItemFromMap(itemmo.getObjectId(), 0, c.getPlayer().getId()));
       }
       mc.dropMessage("You have cleared " + items.size() + " item(s).");
     } else if (splitted[0].equals("!toggleloot")) {
       MapleMap map = c.getPlayer().getMap();
       map.setLootable(!map.isLootable());
       map.broadcastMessage(MaplePacketCreator.serverNotice(5, map.getMapName() + " is now " + (map.isLootable() ? "lootable" : "unlootable.")));
     } else if (splitted[0].equals("!questdebug")) {
       c.getPlayer().toggleQuestDebug();
     } else if (splitted[0].equals("!energycharge")) {
       if (splitted[1].equals("hax")) {
         c.getPlayer().toggleNoEnergyChargeDec();
         return;
       }
       int amt = 10000;
       if (splitted.length >= 2) {
         amt = Integer.parseInt(splitted[1]);
       }
      // c.getPlayer().handleEnergyChargeGain(amt, true);
     }
     else if (splitted[0].equals("!needlog")) {
       if (CherryMScustomEventFactory.getInstance().isCANLOG()) {
         CherryMScustomEventFactory.getInstance().setCANLOG(false);
         c.getPlayer().dropMessage("关闭日志");
       } else {
         CherryMScustomEventFactory.getInstance().setCANLOG(true);
         c.getPlayer().dropMessage("打开日志");
       }
     } else if (splitted[0].equals("!packetlog")) {
       String pl = splitted[1];
       MapleCharacter mCh = c.getChannelServer().getPlayerStorage().getCharacterByName(pl);
       if (mCh == null) {
         mc.dropMessage("Invalid charname");
         return;
       }
       boolean enable = splitted[2].equalsIgnoreCase("true");
       mCh.getClient().setPacketLog(enable);
       mc.dropMessage(mCh.getName() + " now has a packet log? " + mCh.getClient().hasPacketLog());
     }
   }
 
   public CommandDefinition[] getDefinition()
   {
     return new CommandDefinition[] { 
         /*
         new CommandDefinition("resetquest", "<questid>", "Resets the specified quest", 50),
         new CommandDefinition("nearestportal", "", "Gives you the nearest portal", 50),
         new CommandDefinition("spawndebug", "", "", 50),
         new CommandDefinition("timerdebug", "", "", 50),
         new CommandDefinition("threads", "", "", 50),
         new CommandDefinition("showtrace", "", "", 50),
         new CommandDefinition("toggleoffense", "", "", 550),
         new CommandDefinition("fakerelog", "", "", 50),
         new CommandDefinition("tdrops", "", "", 50),
         new CommandDefinition("givebuff", "", "", 50),
         new CommandDefinition("givemonsbuff", "", "", 50),
         new CommandDefinition("givemonstatus", "", "", 50),
         new CommandDefinition("sreactor", "[id]", "Spawn a Reactor", 50),
         new CommandDefinition("hreactor", "[object ID]", "Hit reactor", 50),
         new CommandDefinition("rreactor", "", "Resets all reactors", 50),
         new CommandDefinition("lreactor", "", "List reactors", 50),
         new CommandDefinition("dreactor", "", "Remove a Reactor", 50),
         new CommandDefinition("dropd", "", "toggle drops on a map for a set time", 50),
         new CommandDefinition("cleardrops", "", "Clear all drops on the current map", 50),
         new CommandDefinition("toggleloot", "", "Makes item pickup un/available to the map", 50),
         new CommandDefinition("questdebug", "", "", 50),
         new CommandDefinition("energycharge", "", "", 50),
         new CommandDefinition("needlog", "", "", 50),
         new CommandDefinition("packetlog", "<charname> <true/false>", "", 50) };
          *
          */
        };
   }
 }

/* Location:           E:\maoxiandaodanji\dist\cherry.jar
 * Qualified Name:     net.sf.cherry.client.messages.commands.DebugCommands
 * JD-Core Version:    0.6.0
 */