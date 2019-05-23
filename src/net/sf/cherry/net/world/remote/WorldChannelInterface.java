package net.sf.cherry.net.world.remote;

import java.rmi.Remote;
import java.rmi.RemoteException;
import java.util.List;
import java.util.Map;
import java.util.Properties;

import net.sf.cherry.net.MaplePacket;
import net.sf.cherry.net.channel.remote.ChannelWorldInterface;
import net.sf.cherry.net.world.CharacterIdChannelPair;
import net.sf.cherry.net.world.MapleMessenger;
import net.sf.cherry.net.world.MapleMessengerCharacter;
import net.sf.cherry.net.world.MapleParty;
import net.sf.cherry.net.world.MaplePartyCharacter;
import net.sf.cherry.net.world.PartyOperation;
import net.sf.cherry.net.world.PlayerBuffValueHolder;
import net.sf.cherry.net.world.guild.MapleAlliance;
import net.sf.cherry.net.world.guild.MapleGuild;
import net.sf.cherry.net.world.guild.MapleGuildCharacter;

public abstract interface WorldChannelInterface extends Remote, WorldChannelCommonOperations
{
  public abstract Properties getDatabaseProperties()
    throws RemoteException;

  public abstract Properties getGameProperties()
    throws RemoteException;

  public abstract void serverReady()
    throws RemoteException;

  public abstract String getIP(int paramInt)
    throws RemoteException;

  public abstract int find(String paramString)
    throws RemoteException;

  public abstract int find(int paramInt)
    throws RemoteException;

  public abstract Map<Integer, Integer> getConnected()
    throws RemoteException;

  public abstract MapleParty createParty(MaplePartyCharacter paramMaplePartyCharacter)
    throws RemoteException;

  public abstract MapleParty getParty(int paramInt)
    throws RemoteException;

  public abstract void updateParty(int paramInt, PartyOperation paramPartyOperation, MaplePartyCharacter paramMaplePartyCharacter)
    throws RemoteException;

  public abstract void partyChat(int paramInt, String paramString1, String paramString2)
    throws RemoteException;

  public abstract boolean isAvailable()
    throws RemoteException;

  public abstract ChannelWorldInterface getChannelInterface(int paramInt)
    throws RemoteException;

  public abstract WorldLocation getLocation(String paramString)
    throws RemoteException;

  public abstract CharacterIdChannelPair[] multiBuddyFind(int paramInt, int[] paramArrayOfInt)
    throws RemoteException;

  public abstract MapleGuild getGuild(int paramInt, MapleGuildCharacter paramMapleGuildCharacter)
    throws RemoteException;

  public abstract void clearGuilds()
    throws RemoteException;

  public abstract void setGuildMemberOnline(MapleGuildCharacter paramMapleGuildCharacter, boolean paramBoolean, int paramInt)
    throws RemoteException;

  public abstract int addGuildMember(MapleGuildCharacter paramMapleGuildCharacter)
    throws RemoteException;

  public abstract void leaveGuild(MapleGuildCharacter paramMapleGuildCharacter)
    throws RemoteException;

  public abstract void guildChat(int paramInt1, String paramString1, int paramInt2, String paramString2)
    throws RemoteException;

  public abstract void changeRank(int paramInt1, int paramInt2, int paramInt3)
    throws RemoteException;

  public abstract void expelMember(MapleGuildCharacter paramMapleGuildCharacter, String paramString, int paramInt)
    throws RemoteException;

  public abstract void setGuildNotice(int paramInt, String paramString)
    throws RemoteException;

  public abstract void memberLevelJobUpdate(MapleGuildCharacter paramMapleGuildCharacter)
    throws RemoteException;

  public abstract void changeRankTitle(int paramInt, String[] paramArrayOfString)
    throws RemoteException;

  public abstract int createGuild(int paramInt, String paramString)
    throws RemoteException;

  public abstract void setGuildEmblem(int paramInt, short paramShort1, byte paramByte1, short paramShort2, byte paramByte2)
    throws RemoteException;

  public abstract void disbandGuild(int paramInt)
    throws RemoteException;

  public abstract boolean increaseGuildCapacity(int paramInt)
    throws RemoteException;

  public abstract void gainGP(int paramInt1, int paramInt2)
    throws RemoteException;

  public abstract String listGMs()
    throws RemoteException;

  public abstract MapleMessenger createMessenger(MapleMessengerCharacter paramMapleMessengerCharacter)
    throws RemoteException;

  public abstract MapleMessenger getMessenger(int paramInt)
    throws RemoteException;

  public abstract void leaveMessenger(int paramInt, MapleMessengerCharacter paramMapleMessengerCharacter)
    throws RemoteException;

  public abstract void joinMessenger(int paramInt1, MapleMessengerCharacter paramMapleMessengerCharacter, String paramString, int paramInt2)
    throws RemoteException;

  public abstract void silentJoinMessenger(int paramInt1, MapleMessengerCharacter paramMapleMessengerCharacter, int paramInt2)
    throws RemoteException;

  public abstract void silentLeaveMessenger(int paramInt, MapleMessengerCharacter paramMapleMessengerCharacter)
    throws RemoteException;

  public abstract void messengerChat(int paramInt, String paramString1, String paramString2)
    throws RemoteException;

  public abstract void declineChat(String paramString1, String paramString2)
    throws RemoteException;

  public abstract void updateMessenger(int paramInt1, String paramString, int paramInt2)
    throws RemoteException;

  public abstract void addBuffsToStorage(int paramInt, List<PlayerBuffValueHolder> paramList)
    throws RemoteException;

  public abstract List<PlayerBuffValueHolder> getBuffsFromStorage(int paramInt)
    throws RemoteException;

  public abstract MapleAlliance getAlliance(int paramInt)
    throws RemoteException;

  public abstract void addAlliance(int paramInt, MapleAlliance paramMapleAlliance)
    throws RemoteException;

  public abstract void disbandAlliance(int paramInt)
    throws RemoteException;

  public abstract void allianceMessage(int paramInt1, MaplePacket paramMaplePacket, int paramInt2, int paramInt3)
    throws RemoteException;

  public abstract boolean setAllianceNotice(int paramInt, String paramString)
    throws RemoteException;

  public abstract boolean setAllianceRanks(int paramInt, String[] paramArrayOfString)
    throws RemoteException;

  public abstract boolean removeGuildFromAlliance(int paramInt1, int paramInt2)
    throws RemoteException;

  public abstract boolean addGuildtoAlliance(int paramInt1, int paramInt2)
    throws RemoteException;

  public abstract boolean setGuildAllianceId(int paramInt1, int paramInt2)
    throws RemoteException;

  public abstract boolean increaseAllianceCapacity(int paramInt1, int paramInt2)
    throws RemoteException;
}

/* Location:           E:\maoxiandaodanji\dist\cherry.jar
 * Qualified Name:     net.sf.cherry.net.world.remote.WorldChannelInterface
 * JD-Core Version:    0.6.0
 */