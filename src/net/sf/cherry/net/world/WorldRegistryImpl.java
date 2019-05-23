 package net.sf.cherry.net.world;
 
 import java.rmi.ConnectException;
import java.rmi.RemoteException;
import java.rmi.server.UnicastRemoteObject;
import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.Collection;
import java.util.Collections;
import java.util.Comparator;
import java.util.HashMap;
import java.util.HashSet;
import java.util.LinkedHashMap;
import java.util.LinkedList;
import java.util.List;
import java.util.Map;
import java.util.Map.Entry;
import java.util.Properties;
import java.util.Set;
import java.util.concurrent.atomic.AtomicInteger;

import javax.rmi.ssl.SslRMIClientSocketFactory;
import javax.rmi.ssl.SslRMIServerSocketFactory;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import net.sf.cherry.database.DatabaseConnection;
import net.sf.cherry.net.MaplePacket;
import net.sf.cherry.net.channel.remote.ChannelWorldInterface;
import net.sf.cherry.net.login.remote.LoginWorldInterface;
import net.sf.cherry.net.world.guild.MapleAlliance;
import net.sf.cherry.net.world.guild.MapleGuild;
import net.sf.cherry.net.world.guild.MapleGuildCharacter;
import net.sf.cherry.net.world.remote.WorldChannelInterface;
import net.sf.cherry.net.world.remote.WorldLoginInterface;
import net.sf.cherry.net.world.remote.WorldRegistry;
 
 public class WorldRegistryImpl extends UnicastRemoteObject
   implements WorldRegistry
 {
   private static final long serialVersionUID = -5170574938159280746L;
   private static WorldRegistryImpl instance = null;
   private static Logger log = LoggerFactory.getLogger(WorldRegistryImpl.class);
   private Map<Integer, ChannelWorldInterface> channelServer = new LinkedHashMap();
   private List<LoginWorldInterface> loginServer = new LinkedList();
   private Map<Integer, MapleParty> parties = new HashMap();
   private AtomicInteger runningPartyId = new AtomicInteger();
   private Map<Integer, MapleMessenger> messengers = new HashMap();
   private AtomicInteger runningMessengerId = new AtomicInteger();
   private Map<Integer, MapleGuild> guilds = new LinkedHashMap();
   private Map<Integer, MapleAlliance> alliances = new LinkedHashMap();
   private PlayerBuffStorage buffStorage = new PlayerBuffStorage();
 
   private WorldRegistryImpl() throws RemoteException {
     super(0, new SslRMIClientSocketFactory(), new SslRMIServerSocketFactory());
     DatabaseConnection.setProps(WorldServer.getInstance().getDbProp());
 
     Connection con = DatabaseConnection.getConnection();
     PreparedStatement ps = null;
     ResultSet rs = null;
     try {
       ps = con.prepareStatement("SELECT MAX(party)+1 FROM characters");
       rs = ps.executeQuery();
       rs.next();
       this.runningPartyId.set(rs.getInt(1));
       rs.close();
       ps.close();
     }
     catch (SQLException ex) {
       ex.printStackTrace();
     } finally {
       try {
         if (rs != null) {
           rs.close();
         }
         if (ps != null)
           ps.close();
       }
       catch (SQLException ex) {
       }
     }
     this.runningMessengerId.set(1);
   }
 
   public static WorldRegistryImpl getInstance() {
     if (instance == null) {
       try {
         instance = new WorldRegistryImpl();
       }
       catch (RemoteException e) {
         throw new RuntimeException(e);
       }
     }
     return instance;
   }
 
   private int getFreeChannelId() {
     for (int i = 0; i < 30; i++) {
       if (!this.channelServer.containsKey(Integer.valueOf(i))) {
         return i;
       }
     }
     return -1;
   }
 
   public WorldChannelInterface registerChannelServer(String authKey, ChannelWorldInterface cb) throws RemoteException {
     Connection con = null;
     PreparedStatement ps = null;
     ResultSet rs = null;
     try {
       con = DatabaseConnection.getConnection();
       ps = con.prepareStatement("SELECT * FROM channels WHERE `key` = SHA1(?) AND world = ?");
       ps.setString(1, authKey);
       ps.setInt(2, WorldServer.getInstance().getWorldId());
       rs = ps.executeQuery();
       if (rs.next()) {
         int channelId = rs.getInt("number");
         if (channelId < 1) {
           channelId = getFreeChannelId();
           if (channelId == -1) {
             throw new RuntimeException("Maximum channels reached");
           }
         }
         else if (this.channelServer.containsKey(Integer.valueOf(channelId))) {
           ChannelWorldInterface oldch = (ChannelWorldInterface)this.channelServer.get(Integer.valueOf(channelId));
           try {
             oldch.shutdown(0);
           }
           catch (ConnectException ce) {
           }
         }
         this.channelServer.put(Integer.valueOf(channelId), cb);
         cb.setChannelId(channelId);
         WorldChannelInterface ret = new WorldChannelInterfaceImpl(cb, rs.getInt("channelid"));
            rs.close();
                ps.close();
                return ret;
       }
       rs.close();
       ps.close();
     } catch (SQLException ex) {
       log.error("Encountered database error while authenticating channelserver", ex);
     } finally {
       try {
         if (rs != null) {
           rs.close();
         }
         if (ps != null)
           ps.close();
       }
       catch (SQLException ex) {
       }
     }
     throw new RuntimeException("Couldn't find a channel with the given key (" + authKey + ")");
   }
 
   public void deregisterChannelServer(int channel) throws RemoteException {
     this.channelServer.remove(Integer.valueOf(channel));
     for (LoginWorldInterface wli : this.loginServer) {
       wli.channelOffline(channel);
     }
     log.info("Channel {} is offline.", Integer.valueOf(channel));
   }
 
   public WorldLoginInterface registerLoginServer(String authKey, LoginWorldInterface cb) throws RemoteException {
     WorldLoginInterface ret = null;
     Connection con = null;
     PreparedStatement ps = null;
     ResultSet rs = null;
     try {
       con = DatabaseConnection.getConnection();
       ps = con.prepareStatement("SELECT * FROM loginserver WHERE `key` = SHA1(?) AND world = ?");
       ps.setString(1, authKey);
       ps.setInt(2, WorldServer.getInstance().getWorldId());
       rs = ps.executeQuery();
       if (rs.next()) {
         this.loginServer.add(cb);
         for (ChannelWorldInterface cwi : this.channelServer.values()) {
           cb.channelOnline(cwi.getChannelId(), authKey);
         }
       }
       rs.close();
       ps.close();
       ret = new WorldLoginInterfaceImpl();
     } catch (Exception ex) {
       log.error("Encountered database error while authenticating loginserver", ex);
     } finally {
       try {
         if (rs != null) {
           rs.close();
         }
         if (ps != null)
           ps.close();
       }
       catch (SQLException ex) {
       }
     }
     return ret;
   }
 
   public void deregisterLoginServer(LoginWorldInterface cb) throws RemoteException {
     this.loginServer.remove(cb);
   }
 
   public List<LoginWorldInterface> getLoginServer() {
     return new LinkedList(this.loginServer);
   }
 
   public ChannelWorldInterface getChannel(int channel) {
     return (ChannelWorldInterface)this.channelServer.get(Integer.valueOf(channel));
   }
 
   public Set<Integer> getChannelServer() {
     return new HashSet(this.channelServer.keySet());
   }
 
   public Collection<ChannelWorldInterface> getAllChannelServers() {
     return this.channelServer.values();
   }
 
   public int getHighestChannelId() {
     int highest = 0;
     for (Integer channel : this.channelServer.keySet()) {
       if ((channel != null) && (channel.intValue() > highest)) {
         highest = channel.intValue();
       }
     }
     return highest;
   }
 
   public MapleParty createParty(MaplePartyCharacter chrfor) {
     int partyid = this.runningPartyId.getAndIncrement();
     MapleParty party = new MapleParty(partyid, chrfor);
     this.parties.put(Integer.valueOf(party.getId()), party);
     return party;
   }
 
   public MapleParty getParty(int partyid) {
     return (MapleParty)this.parties.get(Integer.valueOf(partyid));
   }
 
   public MapleParty disbandParty(int partyid) {
     return (MapleParty)this.parties.remove(Integer.valueOf(partyid));
   }
 
   public String getStatus() throws RemoteException {
        StringBuilder ret = new StringBuilder();
        List<Entry<Integer, ChannelWorldInterface>> channelServers = new ArrayList<Entry<Integer, ChannelWorldInterface>>(channelServer.entrySet());
        Collections.sort(channelServers, new Comparator<Entry<Integer, ChannelWorldInterface>>() {

            @Override
            public int compare(Entry<Integer, ChannelWorldInterface> o1, Entry<Integer, ChannelWorldInterface> o2) {
                return o1.getKey().compareTo(o2.getKey());
            }
        });
        int totalUsers = 0;
        for (Entry<Integer, ChannelWorldInterface> cs : channelServers) {
            ret.append("Channel ");
            ret.append(cs.getKey());
            try {
                cs.getValue().isAvailable();
                ret.append(": online, ");
                int channelUsers = cs.getValue().getConnected();
                totalUsers += channelUsers;
                ret.append(channelUsers);
                ret.append(" users\n");
            } catch (RemoteException e) {
                ret.append(": offline\n");
            }
        }
        ret.append("Total users online: ");
        ret.append(totalUsers);
        ret.append("\n");
        Properties props = new Properties(WorldServer.getInstance().getWorldProp());
        int loginInterval = Integer.parseInt(props.getProperty("net.sf.odinms.login.interval"));
        for (LoginWorldInterface lwi : loginServer) {
            ret.append("Login: ");
            try {
                lwi.isAvailable();
                ret.append("online\n");
                ret.append("Users waiting in login queue: ");
                ret.append(lwi.getWaitingUsers());
                ret.append(" users\n");
                int loginMinutes = (int) Math.ceil((double) loginInterval * ((double) lwi.getWaitingUsers() / lwi.getPossibleLoginAverage())) / 60000;
                ret.append("Current average login waiting time: ");
                ret.append(loginMinutes);
                ret.append(" minutes\n");
            } catch (RemoteException e) {
                ret.append("offline\n");
            }
        }
        return ret.toString();
    }
 
   public int createGuild(int leaderId, String name) {
     return MapleGuild.createGuild(leaderId, name);
   }
 
   public MapleGuild getGuild(int id, MapleGuildCharacter mgc) {
     synchronized (this.guilds) {
       if (this.guilds.get(Integer.valueOf(id)) != null) {
         return (MapleGuild)this.guilds.get(Integer.valueOf(id));
       }
       if (id > 0) {
         MapleGuild g = new MapleGuild(id, mgc);
 
         if (g.getId() == -1) {
           return null;
         }
 
         this.guilds.put(Integer.valueOf(id), g);
 
         return g;
       }
       //////System.out.println("=======getGuild id<0=====id:" + id);
       return null;
     }
   }
 
   public void clearGuilds()
   {
     synchronized (this.guilds) {
       this.guilds.clear();
     }
     try {
       for (ChannelWorldInterface cwi : getAllChannelServers())
         cwi.reloadGuildCharacters();
     }
     catch (RemoteException re) {
       log.error("RemoteException occurred while attempting to reload guilds.", re);
     }
   }
 
   public void setGuildMemberOnline(MapleGuildCharacter mgc, boolean bOnline, int channel) {
     MapleGuild g = getGuild(mgc.getGuildId(), mgc);
     g.setOnline(mgc.getId(), bOnline, channel);
   }
 
   public int addGuildMember(MapleGuildCharacter mgc) {
     MapleGuild g = (MapleGuild)this.guilds.get(Integer.valueOf(mgc.getGuildId()));
     if (g != null) {
       return g.addGuildMember(mgc);
     }
     return 0;
   }
 
   public void leaveGuild(MapleGuildCharacter mgc) {
     MapleGuild g = (MapleGuild)this.guilds.get(Integer.valueOf(mgc.getGuildId()));
     if (g != null)
       g.leaveGuild(mgc);
   }
 
   public void guildChat(int gid, String name, int cid, String msg)
   {
     MapleGuild g = (MapleGuild)this.guilds.get(Integer.valueOf(gid));
     if (g != null)
       g.guildChat(name, cid, msg);
   }
 
   public void changeRank(int gid, int cid, int newRank)
   {
     MapleGuild g = (MapleGuild)this.guilds.get(Integer.valueOf(gid));
     if (g != null)
       g.changeRank(cid, newRank);
   }
 
   public void expelMember(MapleGuildCharacter initiator, String name, int cid)
   {
     MapleGuild g = (MapleGuild)this.guilds.get(Integer.valueOf(initiator.getGuildId()));
     if (g != null)
       g.expelMember(initiator, name, cid);
   }
 
   public void setGuildNotice(int gid, String notice)
   {
     MapleGuild g = (MapleGuild)this.guilds.get(Integer.valueOf(gid));
     if (g != null)
       g.setGuildNotice(notice);
   }
 
   public void memberLevelJobUpdate(MapleGuildCharacter mgc)
   {
     MapleGuild g = (MapleGuild)this.guilds.get(Integer.valueOf(mgc.getGuildId()));
     if (g != null)
       g.memberLevelJobUpdate(mgc);
   }
 
   public void changeRankTitle(int gid, String[] ranks)
   {
     MapleGuild g = (MapleGuild)this.guilds.get(Integer.valueOf(gid));
     if (g != null)
       g.changeRankTitle(ranks);
   }
 
   public void setGuildEmblem(int gid, short bg, byte bgcolor, short logo, byte logocolor)
   {
     MapleGuild g = (MapleGuild)this.guilds.get(Integer.valueOf(gid));
     if (g != null)
       g.setGuildEmblem(bg, bgcolor, logo, logocolor);
   }
 
   public void disbandGuild(int gid)
   {
     synchronized (this.guilds) {
       MapleGuild g = (MapleGuild)this.guilds.get(Integer.valueOf(gid));
       g.disbandGuild();
       this.guilds.remove(Integer.valueOf(gid));
     }
   }
 
   public boolean setGuildAllianceId(int gId, int aId) {
     MapleGuild guild = (MapleGuild)this.guilds.get(Integer.valueOf(gId));
     if (guild != null) {
       guild.setAllianceId(aId);
       return true;
     }
     return false;
   }
 
   public boolean increaseGuildCapacity(int gid) {
     MapleGuild g = (MapleGuild)this.guilds.get(Integer.valueOf(gid));
     if (g != null) {
       return g.increaseCapacity();
     }
     return false;
   }
 
   public void gainGP(int gid, int amount) {
     MapleGuild g = (MapleGuild)this.guilds.get(Integer.valueOf(gid));
     if (g != null)
       g.gainGP(amount);
   }
 
   public MapleMessenger createMessenger(MapleMessengerCharacter chrfor)
   {
     int messengerid = this.runningMessengerId.getAndIncrement();
     MapleMessenger messenger = new MapleMessenger(messengerid, chrfor);
     this.messengers.put(Integer.valueOf(messenger.getId()), messenger);
     return messenger;
   }
 
   public MapleMessenger getMessenger(int messengerid) {
     return (MapleMessenger)this.messengers.get(Integer.valueOf(messengerid));
   }
 
   public PlayerBuffStorage getPlayerBuffStorage() {
     return this.buffStorage;
   }
 
   public MapleAlliance getAlliance(int id) {
     synchronized (this.alliances) {
       if (this.alliances.containsKey(Integer.valueOf(id))) {
         return (MapleAlliance)this.alliances.get(Integer.valueOf(id));
       }
       return null;
     }
   }
 
   public void addAlliance(int id, MapleAlliance alliance) {
     synchronized (this.alliances) {
       if (!this.alliances.containsKey(Integer.valueOf(id)))
         this.alliances.put(Integer.valueOf(id), alliance);
     }
   }
 
   public void disbandAlliance(int id)
   {
     synchronized (this.alliances) {
       MapleAlliance alliance = (MapleAlliance)this.alliances.get(Integer.valueOf(id));
       if (alliance != null) {
         for (Integer gid : alliance.getGuilds()) {
           MapleGuild guild = (MapleGuild)this.guilds.get(gid);
           guild.setAllianceId(0);
         }
         this.alliances.remove(Integer.valueOf(id));
       }
     }
   }
 
   public void allianceMessage(int id, MaplePacket packet, int exception, int guildex) {
     MapleAlliance alliance = (MapleAlliance)this.alliances.get(Integer.valueOf(id));
     if (alliance != null)
       for (Integer gid : alliance.getGuilds()) {
         if (guildex == gid.intValue()) {
           continue;
         }
         MapleGuild guild = (MapleGuild)this.guilds.get(gid);
         if (guild != null)
           guild.broadcast(packet, exception);
       }
   }
 
   public boolean addGuildtoAlliance(int aId, int guildId)
   {
     MapleAlliance alliance = (MapleAlliance)this.alliances.get(Integer.valueOf(aId));
     if (alliance != null) {
       alliance.addGuild(guildId);
       return true;
     }
     return false;
   }
 
   public boolean removeGuildFromAlliance(int aId, int guildId) {
     MapleAlliance alliance = (MapleAlliance)this.alliances.get(Integer.valueOf(aId));
     if (alliance != null) {
       alliance.removeGuild(guildId);
       return true;
     }
     return false;
   }
 
   public boolean setAllianceRanks(int aId, String[] ranks) {
     MapleAlliance alliance = (MapleAlliance)this.alliances.get(Integer.valueOf(aId));
     if (alliance != null) {
       alliance.setRankTitle(ranks);
       return true;
     }
     return false;
   }
 
   public boolean setAllianceNotice(int aId, String notice) {
     MapleAlliance alliance = (MapleAlliance)this.alliances.get(Integer.valueOf(aId));
     if (alliance != null) {
       alliance.setNotice(notice);
       return true;
     }
     return false;
   }
 
   public boolean increaseAllianceCapacity(int aId, int inc) {
     MapleAlliance alliance = (MapleAlliance)this.alliances.get(Integer.valueOf(aId));
     if (alliance != null) {
       alliance.increaseCapacity(inc);
       return true;
     }
     return false;
   }
 }

/* Location:           E:\maoxiandaodanji\dist\cherry.jar
 * Qualified Name:     net.sf.cherry.net.world.WorldRegistryImpl
 * JD-Core Version:    0.6.0
 */