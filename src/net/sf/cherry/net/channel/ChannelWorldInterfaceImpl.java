 package net.sf.cherry.net.channel;
 
 import java.rmi.RemoteException;
import java.rmi.server.UnicastRemoteObject;
import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.Collections;
import java.util.Iterator;
import java.util.List;

import javax.rmi.ssl.SslRMIClientSocketFactory;
import javax.rmi.ssl.SslRMIServerSocketFactory;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import net.sf.cherry.client.BuddyList;
import net.sf.cherry.client.BuddylistEntry;
import net.sf.cherry.client.MapleCharacter;
import net.sf.cherry.client.MapleCharacterUtil;
import net.sf.cherry.database.DatabaseConnection;
import net.sf.cherry.net.ByteArrayMaplePacket;
import net.sf.cherry.net.MaplePacket;
import net.sf.cherry.net.channel.remote.ChannelWorldInterface;
import net.sf.cherry.net.world.MapleMessenger;
import net.sf.cherry.net.world.MapleMessengerCharacter;
import net.sf.cherry.net.world.MapleParty;
import net.sf.cherry.net.world.MaplePartyCharacter;
import net.sf.cherry.net.world.PartyOperation;
import net.sf.cherry.net.world.guild.MapleGuildSummary;
import net.sf.cherry.net.world.remote.CheaterData;
import net.sf.cherry.server.ShutdownServer;
import net.sf.cherry.server.TimerManager;
import net.sf.cherry.tools.CollectionUtil;
import net.sf.cherry.tools.MaplePacketCreator;
 
public class ChannelWorldInterfaceImpl extends UnicastRemoteObject implements ChannelWorldInterface {

    private static final long serialVersionUID = 7815256899088644192L;
    private ChannelServer server;

    public ChannelWorldInterfaceImpl() throws RemoteException {
        super(0, new SslRMIClientSocketFactory(), new SslRMIServerSocketFactory());
    }
 
   public ChannelWorldInterfaceImpl(ChannelServer server) throws RemoteException {
     super(0, new SslRMIClientSocketFactory(), new SslRMIServerSocketFactory());
     this.server = server;
   }
 
   public void setChannelId(int id) throws RemoteException {
     this.server.setChannel(id);
   }
 
   public int getChannelId() throws RemoteException {
     return this.server.getChannel();
   }
 
   public String getIP() throws RemoteException {
     return this.server.getIP();
   }
 
   public void broadcastMessage(String sender, byte[] message) throws RemoteException {
     MaplePacket packet = new ByteArrayMaplePacket(message);
     this.server.broadcastPacket(packet);
   }
 
   public void whisper(String sender, String target, int channel, String message) throws RemoteException {
     if (isConnected(target))
       this.server.getPlayerStorage().getCharacterByName(target).getClient().getSession().write(MaplePacketCreator.getWhisper(sender, channel, message));
   }
 
   public boolean isConnected(String charName) throws RemoteException
   {
     return this.server.getPlayerStorage().getCharacterByName(charName) != null;
   }
 
   public boolean isConnected(String charName, boolean removePlayer) throws RemoteException {
     if (this.server.getPlayerStorage().getCharacterByName(charName) != null) {
       if (removePlayer) {
         this.server.removePlayer(this.server.getPlayerStorage().getCharacterByName(charName));
       }
       return true;
     }
     return false;
   }
 
   public void shutdown(int time) throws RemoteException {
     if (time / 60000 != 0) {
       this.server.broadcastPacket(MaplePacketCreator.serverNotice(0, "  "));
     }
     TimerManager.getInstance().schedule(new ShutdownServer(this.server.getChannel()), time);
   }
 
   public void broadcastWorldMessage(String message) throws RemoteException {
     this.server.broadcastPacket(MaplePacketCreator.serverNotice(0, message));
   }
 
   public int getConnected() throws RemoteException {
     return this.server.getConnectedClients();
   }
 
   public void loggedOff(String name, int characterId, int channel, int[] buddies) throws RemoteException
   {
     updateBuddies(characterId, channel, buddies, true);
   }
 
   public void loggedOn(String name, int characterId, int channel, int[] buddies) throws RemoteException
   {
     updateBuddies(characterId, channel, buddies, false);
   }
 
   private void updateBuddies(int characterId, int channel, int[] buddies, boolean offline) {
     IPlayerStorage playerStorage = this.server.getPlayerStorage();
     for (int buddy : buddies) {
       MapleCharacter chr = playerStorage.getCharacterById(buddy);
       if (chr != null) {
         BuddylistEntry ble = chr.getBuddylist().get(characterId);
         if ((ble == null) || (!ble.isVisible()))
           continue;
         int mcChannel;
         if (offline) {
           ble.setChannel(-1);
           mcChannel = -1;
         } else {
           ble.setChannel(channel);
           mcChannel = channel - 1;
         }
         chr.getBuddylist().put(ble);
         chr.getClient().getSession().write(MaplePacketCreator.updateBuddyChannel(ble.getCharacterId(), mcChannel));
       }
     }
   }
 
   public void updateParty(MapleParty party, PartyOperation operation, MaplePartyCharacter target)
     throws RemoteException
   {
     for (MaplePartyCharacter partychar : party.getMembers()) {
       if (partychar.getChannel() == this.server.getChannel()) {
         MapleCharacter chr = this.server.getPlayerStorage().getCharacterByName(partychar.getName());
         if (chr != null) {
           if (operation == PartyOperation.DISBAND)
             chr.setParty(null);
           else {
             chr.setParty(party);
           }
           chr.getClient().getSession().write(MaplePacketCreator.updateParty(chr.getClient().getChannel(), party, operation, target));
         }
       }
     }
     switch (operation) {
     case LEAVE:
     case EXPEL:
       if (target.getChannel() != this.server.getChannel()) break;
       MapleCharacter chr = this.server.getPlayerStorage().getCharacterByName(target.getName());
       if (chr == null) break;
       chr.getClient().getSession().write(MaplePacketCreator.updateParty(chr.getClient().getChannel(), party, operation, target));
       chr.setParty(null);
     }
   }
 
   public void partyChat(MapleParty party, String chattext, String namefrom)
     throws RemoteException
   {
     for (MaplePartyCharacter partychar : party.getMembers())
       if ((partychar.getChannel() == this.server.getChannel()) && (!partychar.getName().equals(namefrom))) {
         MapleCharacter chr = this.server.getPlayerStorage().getCharacterByName(partychar.getName());
         if (chr != null)
           chr.getClient().getSession().write(MaplePacketCreator.multiChat(namefrom, chattext, 1));
       }
   }
 
   public boolean isAvailable()
     throws RemoteException
   {
     return true;
   }
 
   public int getLocation(String name) throws RemoteException {
     MapleCharacter chr = this.server.getPlayerStorage().getCharacterByName(name);
     if (chr != null) {
       return this.server.getPlayerStorage().getCharacterByName(name).getMapId();
     }
     return -1;
   }
 
   public List<CheaterData> getCheaters() throws RemoteException {
     List cheaters = new ArrayList();
     List allplayers = new ArrayList(this.server.getPlayerStorage().getAllCharacters());
 
     for (int x = allplayers.size() - 1; x >= 0; x--) {
       MapleCharacter cheater = (MapleCharacter)allplayers.get(x);
       if (cheater.getCheatTracker().getPoints() > 0) {
         cheaters.add(new CheaterData(cheater.getCheatTracker().getPoints(), MapleCharacterUtil.makeMapleReadable(new StringBuilder().append("频道:").append(cheater.getClient().getChannel()).append(" ID: ").append(cheater.getId()).append(" Name: ").append(cheater.getName()).toString()) + " (" + cheater.getCheatTracker().getPoints() + ") " + cheater.getCheatTracker().getSummary()));
       }
     }
     Collections.sort(cheaters);
     return CollectionUtil.copyFirst(cheaters, 10);
   }
 
   public BuddyList.BuddyAddResult requestBuddyAdd(String addName, int channelFrom, int cidFrom, String nameFrom)
   {
     MapleCharacter addChar = this.server.getPlayerStorage().getCharacterByName(addName);
     if (addChar != null) {
       BuddyList buddylist = addChar.getBuddylist();
       if (buddylist.isFull()) {
         return BuddyList.BuddyAddResult.BUDDYLIST_FULL;
       }
       if (!buddylist.contains(cidFrom)) {
         buddylist.addBuddyRequest(addChar.getClient(), cidFrom, nameFrom, channelFrom);
       }
       else if (buddylist.containsVisible(cidFrom)) {
         return BuddyList.BuddyAddResult.ALREADY_ON_LIST;
       }
     }
 
     return BuddyList.BuddyAddResult.OK;
   }
 
   public boolean isConnected(int characterId) throws RemoteException {
     return this.server.getPlayerStorage().getCharacterById(characterId) != null;
   }
 
   public void buddyChanged(int cid, int cidFrom, String name, int channel, BuddyList.BuddyOperation operation)
   {
     MapleCharacter addChar = this.server.getPlayerStorage().getCharacterById(cid);
     if (addChar != null) {
       BuddyList buddylist = addChar.getBuddylist();
       switch (operation) {
       case ADDED:
         if (!buddylist.contains(cidFrom)) break;
         buddylist.put(new BuddylistEntry(name, cidFrom, channel, true));
         addChar.getClient().getSession().write(MaplePacketCreator.updateBuddyChannel(cidFrom, channel - 1)); break;
       case DELETED:
         if (!buddylist.contains(cidFrom)) break;
         buddylist.put(new BuddylistEntry(name, cidFrom, -1, buddylist.get(cidFrom).isVisible()));
         addChar.getClient().getSession().write(MaplePacketCreator.updateBuddyChannel(cidFrom, -1));
       }
     }
   }
 
   public void buddyChat(int[] recipientCharacterIds, int cidFrom, String nameFrom, String chattext)
     throws RemoteException
   {
     IPlayerStorage playerStorage = this.server.getPlayerStorage();
     for (int characterId : recipientCharacterIds) {
       MapleCharacter chr = playerStorage.getCharacterById(characterId);
       if ((chr == null) || 
         (!chr.getBuddylist().containsVisible(cidFrom))) continue;
       chr.getClient().getSession().write(MaplePacketCreator.multiChat(nameFrom, chattext, 0));
     }
   }
 
   public int[] multiBuddyFind(int charIdFrom, int[] characterIds)
     throws RemoteException
   {
     List<Integer> ret = new ArrayList(characterIds.length);
     IPlayerStorage playerStorage = this.server.getPlayerStorage();
     for (int characterId : characterIds) {
       MapleCharacter chr = playerStorage.getCharacterById(characterId);
       if ((chr == null) || 
         (!chr.getBuddylist().containsVisible(charIdFrom))) continue;
       ret.add(Integer.valueOf(characterId));
     }
 
     int[] retArr = new int[ret.size()];
     int pos = 0;
     for (Integer i : ret) {
       retArr[(pos++)] = i.intValue();
     }
     return retArr;
   }
 
   public void sendPacket(List<Integer> targetIds, MaplePacket packet, int exception)
     throws RemoteException
   {
     for (Iterator i$ = targetIds.iterator(); i$.hasNext(); ) { int i = ((Integer)i$.next()).intValue();
       if (i == exception) {
         continue;
       }
       MapleCharacter c = this.server.getPlayerStorage().getCharacterById(i);
       if (c != null)
         c.getClient().getSession().write(packet);
     }
   }
 
   public void setGuildAndRank(List<Integer> cids, int guildid, int rank, int exception)
     throws RemoteException
   {
     for (Iterator i$ = cids.iterator(); i$.hasNext(); ) { int cid = ((Integer)i$.next()).intValue();
       if (cid != exception)
         setGuildAndRank(cid, guildid, rank);
     }
   }
 
   public void setGuildAndRank(int cid, int guildid, int rank)
     throws RemoteException
   {
     MapleCharacter mc = this.server.getPlayerStorage().getCharacterById(cid);
     if (mc == null)
     {
       return;
     }
     boolean bDifferentGuild;
     if ((guildid == -1) && (rank == -1))
     {
       bDifferentGuild = true;
     } else {
       bDifferentGuild = guildid != mc.getGuildId();
       mc.setGuildId(guildid);
       mc.setGuildRank(rank);
       mc.saveGuildStatus();
     }
     if (bDifferentGuild) {
       mc.getMap().broadcastMessage(mc, MaplePacketCreator.removePlayerFromMap(cid), false);
       mc.getMap().broadcastMessage(mc, MaplePacketCreator.spawnPlayerMapobject(mc), false);
     }
   }
 
   public void setOfflineGuildStatus(int guildid, byte guildrank, int cid) throws RemoteException
   {
     Logger log = LoggerFactory.getLogger(getClass());
     PreparedStatement ps = null;
     try {
       Connection con = DatabaseConnection.getConnection();
       ps = con.prepareStatement("UPDATE characters SET guildid = ?, guildrank = ? WHERE id = ?");
       ps.setInt(1, guildid);
       ps.setInt(2, guildrank);
       ps.setInt(3, cid);
       ps.execute();
       ps.close();
     } catch (SQLException ex) {
       //log.error("SQLException: " + se.getLocalizedMessage(), ex);
     } finally {
       try {
         if (ps != null)
           ps.close();
       }
       catch (SQLException ex)
       {
       }
     }
   }
 
   public void reloadGuildCharacters() throws RemoteException {
     for (MapleCharacter mc : this.server.getPlayerStorage().getAllCharacters()) {
       if (mc.getGuildId() > 0)
       {
         this.server.getWorldInterface().setGuildMemberOnline(mc.getMGC(), true, this.server.getChannel());
 
         this.server.getWorldInterface().memberLevelJobUpdate(mc.getMGC());
       }
     }
 
     ChannelServer.getInstance(getChannelId()).reloadGuildSummary();
   }
 
   public void changeEmblem(int gid, List<Integer> affectedPlayers, MapleGuildSummary mgs) throws RemoteException
   {
     ChannelServer.getInstance(getChannelId()).updateGuildSummary(gid, mgs);
     sendPacket(affectedPlayers, MaplePacketCreator.guildEmblemChange(gid, mgs.getLogoBG(), mgs.getLogoBGColor(), mgs.getLogo(), mgs.getLogoColor()), -1);
     setGuildAndRank(affectedPlayers, -1, -1, -1);
   }
 
   public String listGMs() throws RemoteException {
     String list = "";
     for (MapleCharacter c : ChannelServer.getInstance(getChannelId()).getPlayerStorage().getAllCharacters()) {
       if (c.isGM()) {
         list = list + c.getName() + " ";
       }
     }
     return list;
   }
 
   public void messengerInvite(String sender, int messengerid, String target, int fromchannel) throws RemoteException {
     if (isConnected(target)) {
       MapleMessenger messenger = this.server.getPlayerStorage().getCharacterByName(target).getMessenger();
       if (messenger == null) {
         this.server.getPlayerStorage().getCharacterByName(target).getClient().getSession().write(MaplePacketCreator.messengerInvite(sender, messengerid));
         MapleCharacter from = ChannelServer.getInstance(fromchannel).getPlayerStorage().getCharacterByName(sender);
         from.getClient().getSession().write(MaplePacketCreator.messengerNote(target, 4, 1));
       } else {
         MapleCharacter from = ChannelServer.getInstance(fromchannel).getPlayerStorage().getCharacterByName(sender);
         from.getClient().getSession().write(MaplePacketCreator.messengerChat(sender + " : " + target + " is already using Maple Messenger"));
       }
     }
   }
 
   public void addMessengerPlayer(MapleMessenger messenger, String namefrom, int fromchannel, int position) throws RemoteException {
     for (MapleMessengerCharacter messengerchar : messenger.getMembers())
       if ((messengerchar.getChannel() == this.server.getChannel()) && (!messengerchar.getName().equals(namefrom))) {
         MapleCharacter chr = this.server.getPlayerStorage().getCharacterByName(messengerchar.getName());
         if (chr != null) {
           MapleCharacter from = ChannelServer.getInstance(fromchannel).getPlayerStorage().getCharacterByName(namefrom);
           chr.getClient().getSession().write(MaplePacketCreator.addMessengerPlayer(namefrom, from, position, fromchannel - 1));
           from.getClient().getSession().write(MaplePacketCreator.addMessengerPlayer(chr.getName(), chr, messengerchar.getPosition(), messengerchar.getChannel() - 1));
         }
       } else if ((messengerchar.getChannel() == this.server.getChannel()) && (messengerchar.getName().equals(namefrom))) {
         MapleCharacter chr = this.server.getPlayerStorage().getCharacterByName(messengerchar.getName());
         if (chr != null)
           chr.getClient().getSession().write(MaplePacketCreator.joinMessenger(messengerchar.getPosition()));
       }
   }
 
   public void removeMessengerPlayer(MapleMessenger messenger, int position)
     throws RemoteException
   {
     for (MapleMessengerCharacter messengerchar : messenger.getMembers())
       if (messengerchar.getChannel() == this.server.getChannel()) {
         MapleCharacter chr = this.server.getPlayerStorage().getCharacterByName(messengerchar.getName());
         if (chr != null)
           chr.getClient().getSession().write(MaplePacketCreator.removeMessengerPlayer(position));
       }
   }
 
   public void messengerChat(MapleMessenger messenger, String chattext, String namefrom)
     throws RemoteException
   {
     for (MapleMessengerCharacter messengerchar : messenger.getMembers())
       if ((messengerchar.getChannel() == this.server.getChannel()) && (!messengerchar.getName().equals(namefrom))) {
         MapleCharacter chr = this.server.getPlayerStorage().getCharacterByName(messengerchar.getName());
         if (chr != null)
           chr.getClient().getSession().write(MaplePacketCreator.messengerChat(chattext));
       }
   }
 
   public void declineChat(String target, String namefrom)
     throws RemoteException
   {
     if (isConnected(target)) {
       MapleMessenger messenger = this.server.getPlayerStorage().getCharacterByName(target).getMessenger();
       if (messenger != null)
         this.server.getPlayerStorage().getCharacterByName(target).getClient().getSession().write(MaplePacketCreator.messengerNote(namefrom, 5, 0));
     }
   }
 
   public void updateMessenger(MapleMessenger messenger, String namefrom, int position, int fromchannel)
     throws RemoteException
   {
     for (MapleMessengerCharacter messengerchar : messenger.getMembers())
       if ((messengerchar.getChannel() == this.server.getChannel()) && (!messengerchar.getName().equals(namefrom))) {
         MapleCharacter chr = this.server.getPlayerStorage().getCharacterByName(messengerchar.getName());
         if (chr != null) {
           MapleCharacter from = ChannelServer.getInstance(fromchannel).getPlayerStorage().getCharacterByName(namefrom);
           chr.getClient().getSession().write(MaplePacketCreator.updateMessengerPlayer(namefrom, from, position, fromchannel - 1));
         }
       }
   }
 
    public void spouseChat(String from, String target, String message) throws RemoteException {
        if (isConnected(target)) {
            server.getPlayerStorage().getCharacterByName(target).getClient().getSession().write(
                    MaplePacketCreator.spouseChat(from, message, 5));
        }
    }

    public void broadcastGMMessage(String sender, byte[] message) throws RemoteException {
        MaplePacket packet = new ByteArrayMaplePacket(message);
        server.broadcastGMPacket(packet);
    }
}

