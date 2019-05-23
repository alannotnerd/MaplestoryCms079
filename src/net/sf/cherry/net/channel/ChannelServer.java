package net.sf.cherry.net.channel;

import java.io.File;
import java.io.FileNotFoundException;
import java.io.FileReader;
import java.io.IOException;
import java.lang.management.ManagementFactory;
import java.net.InetSocketAddress;
import java.rmi.NotBoundException;
import java.rmi.RemoteException;
import java.rmi.registry.LocateRegistry;
import java.rmi.registry.Registry;
import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.Collection;
import java.util.Collections;
import java.util.HashMap;
import java.util.LinkedList;
import java.util.List;
import java.util.Map;
import java.util.Map.Entry;
import java.util.Properties;

import javax.management.InstanceAlreadyExistsException;
import javax.management.MBeanRegistrationException;
import javax.management.MBeanServer;
import javax.management.MalformedObjectNameException;
import javax.management.NotCompliantMBeanException;
import javax.management.ObjectName;
import javax.rmi.ssl.SslRMIClientSocketFactory;

import org.apache.mina.common.ByteBuffer;
import org.apache.mina.common.CloseFuture;
import org.apache.mina.common.IoAcceptor;
import org.apache.mina.common.SimpleByteBufferAllocator;
import org.apache.mina.filter.codec.ProtocolCodecFilter;
import org.apache.mina.transport.socket.nio.SocketAcceptor;
import org.apache.mina.transport.socket.nio.SocketAcceptorConfig;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import constants.ServerConfig;
import gui.wqmxd;
import net.sf.cherry.client.MapleCharacter;
import net.sf.cherry.client.anticheat.CheatingOffense;
import net.sf.cherry.client.anticheat.CheatingOffenseEntry;
import net.sf.cherry.client.messages.CommandProcessor;
import net.sf.cherry.database.DatabaseConnection;
import net.sf.cherry.net.MaplePacket;
import net.sf.cherry.net.MapleServerHandler;
import net.sf.cherry.net.PacketProcessor;
import net.sf.cherry.net.Constants.GameConstants;
import net.sf.cherry.net.channel.remote.ChannelWorldInterface;
import net.sf.cherry.net.mina.MapleCodecFactory;
import net.sf.cherry.net.world.MapleParty;
import net.sf.cherry.net.world.MaplePartyCharacter;
import net.sf.cherry.net.world.guild.MapleGuild;
import net.sf.cherry.net.world.guild.MapleGuildCharacter;
import net.sf.cherry.net.world.guild.MapleGuildSummary;
import net.sf.cherry.net.world.remote.WorldChannelInterface;
import net.sf.cherry.net.world.remote.WorldRegistry;
import net.sf.cherry.provider.MapleDataProviderFactory;
import net.sf.cherry.scripting.event.EventScriptManager;
import net.sf.cherry.server.AutobanManager;
import net.sf.cherry.server.MapleSquad;
import net.sf.cherry.server.MapleSquadType;
import net.sf.cherry.server.MapleTrade;
import net.sf.cherry.server.ShutdownServer;
import net.sf.cherry.server.TimerManager;
import net.sf.cherry.server.cherryms.AutoCherryMSEventManager;
import net.sf.cherry.server.maps.FakeCharacter;
import net.sf.cherry.server.maps.MapMonitor;
import net.sf.cherry.server.maps.MapleMap;
import net.sf.cherry.server.maps.MapleMapFactory;
import net.sf.cherry.tools.MaplePacketCreator;

public class ChannelServer
        implements Runnable, ChannelServerMBean {

    private static int uniqueID = 1;
    private int port = 7575;
    private static Properties initialProp;
    private static final Logger log = LoggerFactory.getLogger(ChannelServer.class);
    private static WorldRegistry worldRegistry;
    private PlayerStorage players = new PlayerStorage();
    private String serverMessage;
    private String serverNameMessage;
    private int expRate;
    private int mesoRate;
    private int dropRate;
    // private int nxRate;
    private int bossdropRate;
    private int petExpRate;
    private boolean gmWhiteText;
    private boolean cashshop;
    private boolean huodongnpc;
    private boolean mts;
    private boolean dropUndroppables;
    private boolean moreThanOne;
    private int channel;
    private int energyRate;
    private int instanceId = 0;
    private String key;
    private MapleCharacter chr;
    private Properties props = new Properties();
    private ChannelWorldInterface cwi;
    private WorldChannelInterface wci = null;
    private IoAcceptor acceptor;
    public String ip;
    private boolean shutdown = false;
    private boolean finishedShutdown = false;
    private String arrayString;
    public int eventmap;
    public int[] level = {1, 200};
    private MapleMapFactory mapFactory;
    private EventScriptManager eventSM;
    private static Map<Integer, ChannelServer> instances = new HashMap();
    private static Map<String, ChannelServer> pendingInstances = new HashMap();
    private Map<Integer, MapleGuildSummary> gsStore = new HashMap();
    private Boolean worldReady = Boolean.valueOf(true);
    private Map<MapleSquadType, MapleSquad> mapleSquads = new HashMap();
    private Map<Integer, MapMonitor> mapMonitors = new HashMap();
    private static int worldid = 0;
    private Collection<FakeCharacter> clones = new LinkedList<FakeCharacter>();

    private ChannelServer(String key) {
        this.mapFactory = new MapleMapFactory(MapleDataProviderFactory.getDataProvider(new File(ServerConfig.WZPath + "/Map.wz")), MapleDataProviderFactory.getDataProvider(new File(ServerConfig.WZPath + "/String.wz")));
        this.key = key;
    }

    public static WorldRegistry getWorldRegistry() {
        return worldRegistry;
    }

    public boolean getSkillMaxing() {
        throw new UnsupportedOperationException("Not yet implemented");
    }

    public void reconnectWorld() {
    	System.out.println("重新连接World服务器！！！");
    	System.out.println(Thread.currentThread().getStackTrace());
        try {
            this.wci.isAvailable();
        } catch (RemoteException ex) {
            synchronized (this.worldReady) {
                this.worldReady = Boolean.valueOf(false);
            }
            synchronized (this.cwi) {
                synchronized (this.worldReady) {
                    if (this.worldReady.booleanValue()) {
                        return;
                    }
                }
                log.warn("Reconnecting to world server");
                synchronized (this.wci) {
                    try {
                        initialProp = new Properties();
                        FileReader fr = new FileReader(ServerConfig.CONFIG_FILE_NAME);
                        initialProp.load(fr);
                        fr.close();
                        Registry registry = LocateRegistry.getRegistry(initialProp.getProperty("net.sf.cherry.world.host"), 1099, new SslRMIClientSocketFactory());

                        worldRegistry = (WorldRegistry) registry.lookup("WorldRegistry");
                        this.cwi = new ChannelWorldInterfaceImpl(this);
                        this.wci = worldRegistry.registerChannelServer(this.key, this.cwi);
                        this.props = this.wci.getGameProperties();
                        this.expRate = Integer.parseInt(this.props.getProperty("net.sf.cherry.world.exp"));
                        this.energyRate = Integer.parseInt(props.getProperty("net.sf.cherry.world.energy"));
                        this.mesoRate = Integer.parseInt(this.props.getProperty("net.sf.cherry.world.meso"));
                        this.dropRate = Integer.parseInt(this.props.getProperty("net.sf.cherry.world.drop"));
                        this.bossdropRate = Integer.parseInt(this.props.getProperty("net.sf.cherry.world.bossdrop"));
                        this.petExpRate = Integer.parseInt(this.props.getProperty("net.sf.cherry.world.petExp"));
                        this.serverMessage = this.props.getProperty("net.sf.cherry.world.serverMessage");
                        this.serverNameMessage = this.props.getProperty("net.sf.cherry.world.serverNameMessage");
                        this.dropUndroppables = Boolean.parseBoolean(this.props.getProperty("net.sf.cherry.world.alldrop", "false"));
                        this.moreThanOne = Boolean.parseBoolean(this.props.getProperty("net.sf.cherry.world.morethanone", "false"));
                        this.gmWhiteText = Boolean.parseBoolean(this.props.getProperty("net.sf.cherry.world.gmWhiteText", "false"));
                        this.cashshop = Boolean.parseBoolean(this.props.getProperty("net.sf.cherry.world.cashshop", "false"));
                        this.huodongnpc = Boolean.parseBoolean(this.props.getProperty("net.sf.cherry.world.huodongnpc", "false"));
                        this.mts = Boolean.parseBoolean(this.props.getProperty("net.sf.cherry.world.mts", "false"));
                        Properties dbProp = new Properties();
                        fr = new FileReader(ServerConfig.CONFIG_FILE_NAME);
                        dbProp.load(fr);
                        fr.close();
                        DatabaseConnection.setProps(dbProp);
                        DatabaseConnection.getConnection();
                        this.wci.serverReady();
                    } catch (Exception e) {
                        log.info("Reconnecting failed", e);
                    }
                    this.worldReady = Boolean.valueOf(true);
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
            this.cwi = new ChannelWorldInterfaceImpl(this);
            this.wci = worldRegistry.registerChannelServer(this.key, this.cwi);
            this.props = this.wci.getGameProperties();
            this.expRate = Integer.parseInt(this.props.getProperty("net.sf.cherry.world.exp"));
            // this.nxRate = Integer.parseInt(this.props.getProperty("net.sf.cherry.world.nxRate"));
            this.mesoRate = Integer.parseInt(this.props.getProperty("net.sf.cherry.world.meso"));
            this.dropRate = Integer.parseInt(this.props.getProperty("net.sf.cherry.world.drop"));
            this.bossdropRate = Integer.parseInt(this.props.getProperty("net.sf.cherry.world.bossdrop"));
            this.petExpRate = Integer.parseInt(this.props.getProperty("net.sf.cherry.world.petExp"));
            this.serverMessage = this.props.getProperty("net.sf.cherry.world.serverMessage");
            this.serverNameMessage = this.props.getProperty("net.sf.cherry.world.serverNameMessage");
            this.dropUndroppables = Boolean.parseBoolean(this.props.getProperty("net.sf.cherry.world.alldrop", "false"));
            this.moreThanOne = Boolean.parseBoolean(this.props.getProperty("net.sf.cherry.world.morethanone", "false"));
            this.eventSM = new EventScriptManager(this, this.props.getProperty("net.sf.cherry.channel.events").split(","));
            this.gmWhiteText = Boolean.parseBoolean(this.props.getProperty("net.sf.cherry.world.gmWhiteText", "false"));
            this.cashshop = Boolean.parseBoolean(this.props.getProperty("net.sf.cherry.world.cashshop", "false"));
            this.huodongnpc = Boolean.parseBoolean(this.props.getProperty("net.sf.cherry.world.huodongnpc", "false"));
            this.mts = Boolean.parseBoolean(this.props.getProperty("net.sf.cherry.world.mts", "false"));
        } catch (Exception e) {
            throw new RuntimeException(e);
        }

        this.port = Integer.parseInt(this.props.getProperty("net.sf.cherry.channel.net.port"));
        this.ip = (this.props.getProperty("net.sf.cherry.channel.net.interface") + ":" + this.port);

        ByteBuffer.setUseDirectBuffers(false);
        ByteBuffer.setAllocator(new SimpleByteBufferAllocator());

        this.acceptor = new SocketAcceptor();

        SocketAcceptorConfig cfg = new SocketAcceptorConfig();
        cfg.getSessionConfig().setTcpNoDelay(true);
        cfg.getFilterChain().addLast("codec", new ProtocolCodecFilter(new MapleCodecFactory()));
        TimerManager tMan = TimerManager.getInstance();
        tMan.start();
        tMan.register(AutobanManager.getInstance(), 60000L);
        if (this.channel == 1) {
            tMan.register(AutoCherryMSEventManager.getInstance(this, getMapFactory()), 60000L);
        }
        tMan.register(new respawnMaps(), 10000);
        /*
         * tMan.register(new Runnable() { public void run() { try { //
         * ChannelServer.this.getWorldInterface().broadcastMessage(null,
         * MaplePacketCreator.serverNotice(6, "[系统信息]
         * 服务器正试图释放内存.请注意任何网络中断或网络延迟").getBytes()); // System.gc(); } catch
         * (Throwable e) { // e.printStackTrace(); try {
         * //ChannelServer.this.getWorldInterface().broadcastGMMessage(null,
         * MaplePacketCreator.serverNotice(6, "[系统信息] 释放服务器内存空间失败").getBytes());
         * } catch (Throwable t) { } } } }, 33000000L, 33000000L); //64800000L
         */
        try {
            MapleServerHandler serverHandler = new MapleServerHandler(PacketProcessor.getProcessor(PacketProcessor.Mode.CHANNELSERVER), this.channel);
            this.acceptor.bind(new InetSocketAddress(this.port), serverHandler, cfg);
            log.info("←频道→〖{}〗: 已成功开启 使用端口〖{}〗", Integer.valueOf(getChannel()), Integer.valueOf(this.port));
            this.wci.serverReady();
            this.eventSM.init();
        } catch (IOException e) {
            log.error("Binding to port " + this.port + " failed (ch: " + getChannel() + ")", e);
        }
    }

    public void shutdown() { // dc all clients by hand so we get sessionClosed...
        try {
            eventSM.cancel();
        } catch (Exception e) {
        }
        shutdown = true;
        List<CloseFuture> futures = new LinkedList<CloseFuture>();
        Collection<MapleCharacter> allchars = players.getAllCharacters();
        MapleCharacter chrs[] = allchars.toArray(new MapleCharacter[allchars.size()]);
        for (MapleCharacter chr : chrs) {
            if (chr.getTrade() != null) {
                MapleTrade.cancelTrade(chr);
            }
            if (chr.getEventInstance() != null) {
                chr.getEventInstance().playerDisconnected(chr);
            }
            chr.saveToDB(true);
            if (chr.getCheatTracker() != null) {
                chr.getCheatTracker().dispose();
            }
            removePlayer(chr);
        }
        for (MapleCharacter chr : chrs) {
            futures.add(chr.getClient().getSession().close());
        }
        for (CloseFuture future : futures) {
            future.join(500);
        }
        finishedShutdown = true;

        wci = null;
        cwi = null;
    }

    public void unbind() {
        this.acceptor.unbindAll();
    }

    public boolean hasFinishedShutdown() {
        return this.finishedShutdown;
    }

    public MapleMapFactory getMapFactory() {
        return this.mapFactory;
    }

    public static ChannelServer newInstance(String key) throws MalformedObjectNameException, InstanceAlreadyExistsException, MBeanRegistrationException, NotCompliantMBeanException{
        ChannelServer instance = new ChannelServer(key);
        MBeanServer mBeanServer = ManagementFactory.getPlatformMBeanServer();
        ObjectName OName = new ObjectName("net.sf.cherry.net.channel:type=ChannelServer,name=ChannelServer" + uniqueID++);
        mBeanServer.registerMBean(instance, OName);
        pendingInstances.put(key, instance);
        return instance;
    }

    public static ChannelServer getInstance(int channel) {
        ChannelServer ret = null;
        try {
            ret = (ChannelServer) instances.get(Integer.valueOf(channel));
        } catch (IndexOutOfBoundsException e) {
        }
        return ret;
    }

    public void addPlayer(MapleCharacter chr) {
        players.registerPlayer(chr);
        chr.getClient().getSession().write(MaplePacketCreator.serverMessage(serverMessage));
    }

    public IPlayerStorage getPlayerStorage() {
        return this.players;
    }

    public void removePlayer(MapleCharacter chr) {
        this.players.deregisterPlayer(chr);
    }

    public int getConnectedClients() {
        return this.players.getAllCharacters().size();
    }

    public String getServerMessage() {
        return this.serverMessage;
    }

    public String getServerNameMessage() {
        return this.serverNameMessage;
    }

    public void setServerMessage(String newMessage) {
        this.serverMessage = newMessage;
        broadcastPacket(MaplePacketCreator.serverMessage(this.serverMessage));
    }

    public void broadcastPacket(MaplePacket data) {
        for (MapleCharacter chr : players.getAllCharacters()) {
            chr.getClient().getSession().write(data);
        }
    }

    public void broadcastGMPacket(MaplePacket data) {
        for (MapleCharacter chr : players.getAllCharacters()) {
            if (chr.isGM()) {
                chr.getClient().getSession().write(data);
            }
        }
    }

    public int getExpRate() {
        return this.expRate;
    }

    public void setExpRate(int expRate) {
        this.expRate = expRate;
    }

    public int getEnergyRate() {
        return energyRate;
    }

    public void setEnergyRate(int energyRate) {
        this.energyRate = energyRate;
    }

    public String getArrayString() {
        return this.arrayString;
    }

    public void setArrayString(String newStr) {
        this.arrayString = newStr;
    }

    public int getChannel() {
        return this.channel;
    }

    public void setChannel(int channel) {
        if (pendingInstances.containsKey(this.key)) {
            pendingInstances.remove(this.key);
        }
        if (instances.containsKey(Integer.valueOf(channel))) {
            instances.remove(Integer.valueOf(channel));
        }
        instances.put(Integer.valueOf(channel), this);
        this.channel = channel;
        this.mapFactory.setChannel(channel);
    }

    public static Collection<ChannelServer> getAllInstances() {
        return Collections.unmodifiableCollection(instances.values());
    }

    public String getIP() {
        return this.ip;
    }

    public String getIP(int channel) {
        try {
            return getWorldInterface().getIP(channel);
        } catch (RemoteException e) {
            log.error("Lost connection to world server", e);
        }
        throw new RuntimeException("Lost connection to world server");
    }

    public WorldChannelInterface getWorldInterface() {
        synchronized (this.worldReady) {
            while (!this.worldReady.booleanValue()) {
                try {
                    this.worldReady.wait();
                } catch (InterruptedException e) {
                }
            }
        }
        return this.wci;
    }

    public String getProperty(String name) {
        return this.props.getProperty(name);
    }

    public boolean isShutdown() {
        return this.shutdown;
    }

    public void broadcastWorldMessage(String message) {
        try {
            getWorldInterface().broadcastWorldMessage(message);
        } catch (RemoteException e) {
            reconnectWorld();
        }
    }

    public void shutdown(int time) {
        broadcastPacket(MaplePacketCreator.serverNotice(0, " "));
        TimerManager.getInstance().schedule(new ShutdownServer(getChannel()), time);
    }

    public void shutdownWorld(int time) {
        time *= 60000;
        try {
            getWorldInterface().shutdown(time);
        } catch (RemoteException e) {
            reconnectWorld();
        }
    }

    public EventScriptManager getEventSM() {
        return this.eventSM;
    }

    public void reloadEvents() {
        this.eventSM.cancel();
        this.eventSM = new EventScriptManager(this, this.props.getProperty("net.sf.cherry.channel.events").split(","));
        this.eventSM.init();
    }

    public int getMesoRate() {
        return this.mesoRate;
    }

    public void setMesoRate(int mesoRate) {
        this.mesoRate = mesoRate;
    }

    /*
     * public int getnxRate() { return this.nxRate;
    }
     */
    public int getDropRate() {
        return this.dropRate;
    }

    public void setDropRate(int dropRate) {
        this.dropRate = dropRate;
    }

    public int getBossDropRate() {
        return this.bossdropRate;
    }

    public void setBossDropRate(int bossdropRate) {
        this.bossdropRate = bossdropRate;
    }

    public int getPetExpRate() {
        return this.petExpRate;
    }

    public void setPetExpRate(int petExpRate) {
        this.petExpRate = petExpRate;
    }

    public boolean allowUndroppablesDrop() {
        return this.dropUndroppables;
    }

    public boolean allowMoreThanOne() {
        return this.moreThanOne;
    }

    public boolean allowGmWhiteText() {
        return this.gmWhiteText;
    }

    public boolean allowCashshop() {
        return this.cashshop;
    }

    public boolean allowHuoDongnpc() {
        return this.huodongnpc;
    }

    public boolean allowMTS() {
        return this.mts;
    }

    public boolean characterNameExists(String name) {
        int size = 0;
        PreparedStatement ps = null;
        ResultSet rs = null;
        try {
            Connection con = DatabaseConnection.getConnection();
            ps = con.prepareStatement("SELECT id FROM characters WHERE name = ?");
            ps.setString(1, name);
            rs = ps.executeQuery();
            while (rs.next()) {
                size++;
            }
            rs.close();
            ps.close();
        } catch (SQLException ex) {
            log.error("Error in charname check: \r\n" + ex.toString());
        } finally {
            try {
                if (rs != null) {
                    rs.close();
                }
                if (ps != null) {
                    ps.close();
                }
            } catch (SQLException ex) {
            }
        }
        return size >= 1;
    }

    public MapleGuild getGuild(MapleGuildCharacter mgc) {
        int gid = mgc.getGuildId();
        MapleGuild g = null;
        try {
            g = getWorldInterface().getGuild(gid, mgc);
        } catch (RemoteException re) {
            log.error("RemoteException while fetching MapleGuild.", re);
            return null;
        }

        if (this.gsStore.get(Integer.valueOf(gid)) == null) {
            this.gsStore.put(Integer.valueOf(gid), new MapleGuildSummary(g));
        }
        return g;
    }

    public MapleGuildSummary getGuildSummary(int gid) {
        if (this.gsStore.containsKey(Integer.valueOf(gid))) {
            return (MapleGuildSummary) this.gsStore.get(Integer.valueOf(gid));
        }
        try {
            MapleGuild g = getWorldInterface().getGuild(gid, null);
            if (g != null) {
                this.gsStore.put(Integer.valueOf(gid), new MapleGuildSummary(g));
            }
            return (MapleGuildSummary) this.gsStore.get(Integer.valueOf(gid));
        } catch (RemoteException re) {
            log.error("RemoteException while fetching GuildSummary.", re);
        }
        return null;
    }

    public void updateGuildSummary(int gid, MapleGuildSummary mgs) {
        this.gsStore.put(Integer.valueOf(gid), mgs);
    }

    public void reloadGuildSummary() {
        try {
            MapleGuild g;
            for (int i : gsStore.keySet()) {
                g = this.getWorldInterface().getGuild(i, null);
                if (g != null) {
                    gsStore.put(i, new MapleGuildSummary(g));
                } else {
                    gsStore.remove(i);
                }
            }
        } catch (RemoteException re) {
            log.error("RemoteException while reloading GuildSummary.", re);
        }
    }
    public static void init(){
    	Properties dbProp = new Properties();
        FileReader fileReader;
		try {
			fileReader = new FileReader(ServerConfig.CONFIG_FILE_NAME);
			dbProp.load(fileReader);
	        fileReader.close();
		} catch (IOException e) {
			e.printStackTrace();
		}
        DatabaseConnection.setProps(dbProp);
        DatabaseConnection.getConnection();
        Connection c = DatabaseConnection.getConnection();
        PreparedStatement ps = null;
        try {
            ps = c.prepareStatement("UPDATE accounts SET loggedin = 0");
            ps.executeUpdate();
            ps.close();
           System.out.print("帐号在线状态数据处理完成!\r\n");

            ps = c.prepareStatement("UPDATE characters SET loggedin = 0, muted = 0");
            ps.executeUpdate();
            ps.close();
            System.out.print("角色在线状态数据处理完成!\r\n");
            ps = c.prepareStatement("UPDATE hiredmerchant SET onSale = false");
            ps.executeUpdate();
            ps.close();
            ps = c.prepareStatement("UPDATE characters SET HasMerchant = 0 where HasMerchant > 0");
            ps.executeUpdate();
            ps.close();
            System.out.print("雇佣商店数据处理完成!\r\n");
        } catch (SQLException ex) {
            log.error("Could not reset databases", ex);

        } finally {
            try {
                if (ps != null) {
                    ps.close();
                }
            } catch (SQLException ex) {
            }
        }
        initialProp = new Properties();
        try {
			initialProp.load(new FileReader(ServerConfig.CONFIG_FILE_NAME));
			ServerConfig.SetRMIParam();
			Registry registry = LocateRegistry.getRegistry(initialProp.getProperty("net.sf.cherry.world.host"), 1099, new SslRMIClientSocketFactory());
			worldRegistry = (WorldRegistry) registry.lookup("WorldRegistry");
		
	        for (int i = 0; i < Integer.parseInt(initialProp.getProperty("net.sf.cherry.channel.count", "0")); i++) {
	            log.info("current channel No: {}", i);
	            newInstance(initialProp.getProperty("net.sf.cherry.channel." + i + "." + worldid + ".key")).run();
	        }
		} catch (Exception e) {
			e.printStackTrace();
		} 
        DatabaseConnection.getConnection();
        CommandProcessor.registerMBean();
        //ConsoleGUI.main();
        //wqmxd.start();
    }
    public static void main(String[] args) {
        init();
    }

    public MapleSquad getMapleSquad(MapleSquadType type) {
        if (this.mapleSquads.containsKey(type)) {
            return (MapleSquad) this.mapleSquads.get(type);
        }
        return null;
    }

    public boolean addMapleSquad(MapleSquad squad, MapleSquadType type) {
        if (this.mapleSquads.get(type) == null) {
            this.mapleSquads.remove(type);
            this.mapleSquads.put(type, squad);
            return true;
        }
        return false;
    }

    public boolean removeMapleSquad(MapleSquad squad, MapleSquadType type) {
        if ((this.mapleSquads.containsKey(type)) && (this.mapleSquads.get(type) == squad)) {
            this.mapleSquads.remove(type);
            return true;
        }

        return false;
    }

    public int getInstanceId() {
        return this.instanceId;
    }

    public void setInstanceId(int k) {
        this.instanceId = k;
    }

    public void addInstanceId() {
        this.instanceId += 1;
    }

    public void addMapMonitor(int mapId, MapMonitor monitor) {
        if (this.mapMonitors.containsKey(Integer.valueOf(mapId))) {
            log.info("ERROR! Trying to add a map monitor to a map that already has it!");
            return;
        }
        this.mapMonitors.put(Integer.valueOf(mapId), monitor);
    }

    public void removeMapMonitor(int mapId) {
        if (this.mapMonitors.containsKey(Integer.valueOf(mapId))) {
            this.mapMonitors.remove(Integer.valueOf(mapId));
        } else {
            log.info("ERROR! Trying to remove a map monitor that doesn't exist!");
        }
    }

    public List<MapleCharacter> getPartyMembers(MapleParty party) {
        List partym = new LinkedList();
        for (MaplePartyCharacter partychar : party.getMembers()) {
            if (partychar.getChannel() == getChannel()) {
                MapleCharacter chr = getPlayerStorage().getCharacterByName(partychar.getName());
                if (chr != null) {
                    partym.add(chr);
                }
            }
        }
        return partym;
    }

    public List<MapleCharacter> getAllCharsWithPlayerNPCs() {
        List ret = new ArrayList();
        for (MapleCharacter chr : getPlayerStorage().getAllCharacters()) {
            if (chr.hasPlayerNPC()) {
                ret.add(chr);
            }
        }
        return ret;
    }

    public void loadMap(int mapid) {
        this.mapFactory.getMap(mapid);
    }

    public void startEvent(int minlevel, int maxlevel, int map) {
        this.level[0] = minlevel;
        this.level[1] = maxlevel;
        this.eventmap = map;
    }

    public static MapleCharacter getCharacterFromAllServers(int id) {
        for (ChannelServer cserv_ : getAllInstances()) {
            MapleCharacter ret = cserv_.getPlayerStorage().getCharacterById(id);
            if (ret != null) {
                return ret;
            }
        }
        return null;
    }

    public void addClone(FakeCharacter fc) {
        clones.add(fc);
    }

    public void removeClone(FakeCharacter fc) {
        clones.remove(fc);
    }

    public Collection<FakeCharacter> getAllClones() {
        return clones;
    }

    private class respawnMaps implements Runnable {

        @Override
        public void run() {
            for (Entry<Integer, MapleMap> map : mapFactory.getMaps().entrySet()) {
                map.getValue().respawn();
            }
        }
    }

    public void AutoNx(int jsNx) {
        mapFactory.getMap(910000000).AutoNx(jsNx);
    }

    private class autoCherryBan implements Runnable {

        @Override
        public void run() {
            List allplayers = new ArrayList(ChannelServer.this.getPlayerStorage().getAllCharacters());
            for (int x = allplayers.size() - 1; x >= 0; x--) {
                MapleCharacter cheater = (MapleCharacter) allplayers.get(x);
                if (cheater.getCheatTracker().getPoints() > 0) {
                    if ((cheater.getCheatTracker().getPoints() <= 5000) || ((cheater.getCheatTracker().getOffenses().get(CheatingOffense.MOVE_MONSTERS) != null) && (((CheatingOffenseEntry) cheater.getCheatTracker().getOffenses().get(CheatingOffense.MOVE_MONSTERS)).getCount() > 1000) && ((cheater.getMapId() < 230000000) || (cheater.getMapId() > 240000000)))) {
                        cheater.doCherryAutoban("MOVE_MONSTERS");
                    }
                    if ((cheater.getCheatTracker().getOffenses().get(CheatingOffense.ATTACK_WITHOUT_GETTING_HIT) != null) && (((CheatingOffenseEntry) cheater.getCheatTracker().getOffenses().get(CheatingOffense.ATTACK_WITHOUT_GETTING_HIT)).getCount() > 1000) && (cheater.getJob().getId() / 10 == 23)) {
                        cheater.doCherryAutoban("ATTACK_WITHOUT_GETTING_HIT");
                    }
                    if ((cheater.getCheatTracker().getOffenses().get(CheatingOffense.FASTATTACK) != null) && (((CheatingOffenseEntry) cheater.getCheatTracker().getOffenses().get(CheatingOffense.FASTATTACK)).getCount() > 1000)) {
                        cheater.doCherryAutoban("FASTATTACK");
                    }
                    if ((cheater.getCheatTracker().getOffenses().get(CheatingOffense.ATTACK_FARAWAY_MONSTER) != null) && (((CheatingOffenseEntry) cheater.getCheatTracker().getOffenses().get(CheatingOffense.ATTACK_FARAWAY_MONSTER)).getCount() > 1000)) {
                        cheater.doCherryAutoban("ATTACK_FARAWAY_MONSTER");
                    }
                    if ((cheater.getCheatTracker().getOffenses().get(CheatingOffense.ITEMVAC) != null) && (((CheatingOffenseEntry) cheater.getCheatTracker().getOffenses().get(CheatingOffense.ITEMVAC)).getCount() > 1000)) {
                        cheater.doCherryAutoban("ITEMVAC");
                    }
                }
            }
        }
    }
}