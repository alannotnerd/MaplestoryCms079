package net.sf.cherry.net.login;

import constants.ServerConfig;
import net.sf.cherry.database.DatabaseConnection;
import net.sf.cherry.net.MapleServerHandler;
import net.sf.cherry.net.PacketProcessor;
import net.sf.cherry.net.login.remote.LoginWorldInterface;
import net.sf.cherry.net.mina.MapleCodecFactory;
import net.sf.cherry.net.world.remote.WorldLoginInterface;
import net.sf.cherry.net.world.remote.WorldRegistry;
import net.sf.cherry.server.SpeedRankings;
import net.sf.cherry.server.TimerManager;
import org.apache.mina.common.ByteBuffer;
import org.apache.mina.common.IoAcceptor;
import org.apache.mina.common.SimpleByteBufferAllocator;
import org.apache.mina.filter.codec.ProtocolCodecFilter;
import org.apache.mina.transport.socket.nio.SocketAcceptor;
import org.apache.mina.transport.socket.nio.SocketAcceptorConfig;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import javax.management.MBeanServer;
import javax.management.ObjectName;
import javax.rmi.ssl.SslRMIClientSocketFactory;
import java.io.FileReader;
import java.io.IOException;
import java.lang.management.ManagementFactory;
import java.net.InetSocketAddress;
import java.rmi.RemoteException;
import java.rmi.registry.LocateRegistry;
import java.rmi.registry.Registry;
import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.util.HashMap;
import java.util.Map;
import java.util.Properties;
import java.util.Set;

public class LoginServer
    implements Runnable, LoginServerMBean {

  static final Logger log = LoggerFactory.getLogger(LoginServer.class);
  public static int PORT = 8484;
  private static WorldRegistry worldRegistry = null;
  private static LoginServer instance = new LoginServer();

  static {
    MBeanServer mBeanServer = ManagementFactory.getPlatformMBeanServer();
    try {
      mBeanServer.registerMBean(instance, new ObjectName("net.sf.cherry.net.login:type=LoginServer,name=LoginServer"));
    } catch (Exception e) {
      log.error("MBEAN ERROR", e);
    }
  }

  int userLimit;
  int loginInterval;
  private IoAcceptor acceptor;
  private Map<Integer, String> channelServer = new HashMap();
  private LoginWorldInterface lwi;
  private WorldLoginInterface wli;
  private Properties prop = new Properties();
  private Properties initialProp = new Properties();
  private Boolean worldReady = Boolean.TRUE;
  private Properties subnetInfo = new Properties();
  private Map<Integer, Integer> load = new HashMap();
  private String serverName;
  private String eventMessage;
  private int flag;
  private int maxCharacters;
  private Map<String, Integer> connectedIps = new HashMap();
  private long rankingInterval;

  public static LoginServer getInstance() {
    return instance;
  }

  public static void init() {
    try {
      getInstance().run();
    } catch (Exception ex) {
      log.error("Error initializing loginserver", ex);
    }
  }

  public static void main(String[] args) {
    init();
  }

  public Set<Integer> getChannels() {
    return this.channelServer.keySet();
  }

  public void addChannel(int channel, String ip) {
    this.channelServer.put(Integer.valueOf(channel), ip);
    this.load.put(Integer.valueOf(channel), Integer.valueOf(0));
  }

  public void removeChannel(int channel) {
    this.channelServer.remove(Integer.valueOf(channel));
    this.load.remove(Integer.valueOf(channel));
  }

  public String getIP(int channel) {
    // fixme: return ip not authkey
    return this.channelServer.get(Integer.valueOf(channel));
  }

  public int getPossibleLogins() {
    int ret = 0;
    try {
      Connection con = DatabaseConnection.getConnection();
      PreparedStatement limitCheck = con.prepareStatement("SELECT COUNT(*) FROM accounts WHERE loggedin > 1 AND gm = 0");
      ResultSet rs = limitCheck.executeQuery();
      if (rs.next()) {
        int usersOn = rs.getInt(1);
        if (usersOn < this.userLimit) {
          ret = this.userLimit - usersOn;
        }
      }
      rs.close();
      limitCheck.close();
    } catch (Exception ex) {
      log.error("loginlimit error", ex);
    }
    return ret;
  }

  public void reconnectWorld() {
    try {
      this.wli.isAvailable();
    } catch (RemoteException ex) {
      synchronized (this.worldReady) {
        this.worldReady = Boolean.FALSE;
      }
      synchronized (this.lwi) {
        synchronized (this.worldReady) {
          if (this.worldReady.booleanValue()) {
            return;
          }
        }

        log.warn("Reconnecting to world server");
        synchronized (this.wli) {
          try {
            FileReader fileReader = new FileReader(ServerConfig.CONFIG_FILE_NAME_LOGIN);
            this.initialProp.load(fileReader);
            fileReader.close();
            Registry registry = LocateRegistry.getRegistry(this.initialProp.getProperty("net.sf.cherry.world.host"), 1099, new SslRMIClientSocketFactory());
            worldRegistry = (WorldRegistry) registry.lookup("WorldRegistry");
            this.lwi = new LoginWorldInterfaceImpl();
            this.wli = worldRegistry.registerLoginServer(this.initialProp.getProperty("net.sf.cherry.login.key"), this.lwi);
            Properties dbProp = new Properties();
            fileReader = new FileReader(ServerConfig.CONFIG_FILE_NAME);
            dbProp.load(fileReader);
            fileReader.close();
            DatabaseConnection.setProps(dbProp);
            DatabaseConnection.getConnection();
            this.prop = this.wli.getWorldProperties();
            this.userLimit = Integer.parseInt(this.prop.getProperty("net.sf.cherry.login.userlimit"));
            this.serverName = this.prop.getProperty("net.sf.cherry.login.serverName");
            this.eventMessage = this.prop.getProperty("net.sf.cherry.login.eventMessage");
            this.flag = Integer.parseInt(this.prop.getProperty("net.sf.cherry.login.flag"));
            this.maxCharacters = Integer.parseInt(this.prop.getProperty("net.sf.cherry.login.maxCharacters"));
            try {
              fileReader = new FileReader(ServerConfig.CONFIG_FILE_NAME);
              this.subnetInfo.load(fileReader);
              fileReader.close();
            } catch (Exception e) {
              log.info("Could not load subnet configuration, falling back to world defaults", e);
            }
          } catch (Exception e) {
            log.error("Reconnecting failed", e);
          }
          this.worldReady = Boolean.TRUE;
        }
      }
      synchronized (this.worldReady) {
        this.worldReady.notifyAll();
      }
    }
  }

  @Override
  public void run() {
    try {
      FileReader fileReader = new FileReader(ServerConfig.CONFIG_FILE_NAME_LOGIN);
      this.initialProp.load(fileReader);
      fileReader.close();
      ServerConfig.SetRMIParam();
      Registry registry = LocateRegistry.getRegistry(this.initialProp.getProperty("net.sf.cherry.world.host"), 1099, new SslRMIClientSocketFactory());
      worldRegistry = (WorldRegistry) registry.lookup("WorldRegistry");
      this.lwi = new LoginWorldInterfaceImpl();
      this.wli = worldRegistry.registerLoginServer(this.initialProp.getProperty("net.sf.cherry.login.key"), this.lwi);
      Properties dbProp = new Properties();
      fileReader = new FileReader(ServerConfig.CONFIG_FILE_NAME);
      dbProp.load(fileReader);
      fileReader.close();
      DatabaseConnection.setProps(dbProp);
      DatabaseConnection.getConnection();
      this.prop = this.wli.getWorldProperties();
      this.userLimit = Integer.parseInt(this.prop.getProperty("net.sf.cherry.login.userlimit"));
      this.serverName = this.prop.getProperty("net.sf.cherry.login.serverName");
      this.eventMessage = this.prop.getProperty("net.sf.cherry.login.eventMessage");
      this.flag = Integer.parseInt(this.prop.getProperty("net.sf.cherry.login.flag"));
      this.maxCharacters = Integer.parseInt(this.prop.getProperty("net.sf.cherry.login.maxCharacters"));
      try {
        fileReader = new FileReader(ServerConfig.CONFIG_FILE_NAME);
        this.subnetInfo.load(fileReader);
        fileReader.close();
      } catch (Exception e) {
        log.trace("Could not load subnet configuration, falling back to world defaults", e);
      }
    } catch (Exception e) {
      throw new RuntimeException("Could not connect to world server.", e);
    }

    ByteBuffer.setUseDirectBuffers(false);
    ByteBuffer.setAllocator(new SimpleByteBufferAllocator());

    this.acceptor = new SocketAcceptor();

    SocketAcceptorConfig cfg = new SocketAcceptorConfig();
    cfg.getSessionConfig().setTcpNoDelay(true);
    cfg.getFilterChain().addLast("codec", new ProtocolCodecFilter(new MapleCodecFactory()));

    SpeedRankings.loadFromDB();

    TimerManager tMan = TimerManager.getInstance();
    tMan.start();
    this.loginInterval = Integer.parseInt(this.prop.getProperty("net.sf.cherry.login.interval"));

    this.rankingInterval = Long.parseLong(this.prop.getProperty("net.sf.cherry.login.ranking.interval"));
    PORT = Integer.parseInt(this.prop.getProperty("net.sf.cherry.login.port"));
    tMan.register(new RankingWorker(), this.rankingInterval);
    InetSocketAddress is = new InetSocketAddress(PORT);
    MapleServerHandler msh = new MapleServerHandler(PacketProcessor.getProcessor(PacketProcessor.Mode.LOGINSERVER));
    try {
      this.acceptor.bind(is, msh, cfg);
      log.info("监听地址为:〖{}〗", Integer.valueOf(PORT));
    } catch (IOException e) {
      log.error("Binding to port {} failed", Integer.valueOf(PORT), e);
    }
  }

  public void shutdown() {
    log.info("Shutting down server...");
    try {
      worldRegistry.deregisterLoginServer(this.lwi);
    } catch (RemoteException e) {
    }
    TimerManager.getInstance().stop();
    System.exit(0);
  }

  public WorldLoginInterface getWorldInterface() {
    synchronized (this.worldReady) {
      while (!this.worldReady.booleanValue()) {
        try {
          this.worldReady.wait();
        } catch (InterruptedException e) {
        }
      }
    }
    return this.wli;
  }

  public int getLoginInterval() {
    return this.loginInterval;
  }

  public Properties getSubnetInfo() {
    return this.subnetInfo;
  }

  public int getUserLimit() {
    return this.userLimit;
  }

  public void setUserLimit(int newLimit) {
    this.userLimit = newLimit;
  }

  public String getServerName() {
    return this.serverName;
  }

  public String getEventMessage() {
    return this.eventMessage;
  }

  public void setEventMessage(String newMessage) {
    this.eventMessage = newMessage;
  }

  public int getFlag() {
    return this.flag;
  }

  public void setFlag(int newflag) {
    this.flag = newflag;
  }

  public int getMaxCharacters() {
    return maxCharacters;
  }

  public Map<Integer, Integer> getLoad() {
    return this.load;
  }

  public void setLoad(Map<Integer, Integer> load) {
    this.load = load;
  }

  public void addConnectedIP(String ip) {
    if (this.connectedIps.containsKey(ip)) {
      int connections = this.connectedIps.get(ip).intValue();
      this.connectedIps.remove(ip);
      this.connectedIps.put(ip, Integer.valueOf(connections + 1));
    } else {
      this.connectedIps.put(ip, Integer.valueOf(1));
    }
  }

  public void removeConnectedIp(String ip) {
    if (this.connectedIps.containsKey(ip)) {
      int connections = this.connectedIps.get(ip).intValue();
      this.connectedIps.remove(ip);
      if (connections - 1 != 0) {
        this.connectedIps.put(ip, Integer.valueOf(connections - 1));
      }
    }
  }

  public boolean ipCanConnect(String ip) {
    return (!this.connectedIps.containsKey(ip))
        || (this.connectedIps.get(ip).intValue() < 5);
  }

  public int getNumberOfSessions() {
    return this.acceptor.getManagedSessions(new InetSocketAddress(PORT)).size();
  }
}
