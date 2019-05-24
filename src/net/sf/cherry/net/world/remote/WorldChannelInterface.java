package net.sf.cherry.net.world.remote;

import net.sf.cherry.net.MaplePacket;
import net.sf.cherry.net.channel.remote.ChannelWorldInterface;
import net.sf.cherry.net.world.*;
import net.sf.cherry.net.world.guild.MapleAlliance;
import net.sf.cherry.net.world.guild.MapleGuild;
import net.sf.cherry.net.world.guild.MapleGuildCharacter;

import java.rmi.Remote;
import java.rmi.RemoteException;
import java.util.List;
import java.util.Map;
import java.util.Properties;

public interface WorldChannelInterface extends Remote, WorldChannelCommonOperations {
  Properties getDatabaseProperties()
      throws RemoteException;

  Properties getGameProperties()
      throws RemoteException;

  void serverReady()
      throws RemoteException;

  String getIP(int paramInt)
      throws RemoteException;

  int find(String paramString)
      throws RemoteException;

  int find(int paramInt)
      throws RemoteException;

  Map<Integer, Integer> getConnected()
      throws RemoteException;

  MapleParty createParty(MaplePartyCharacter paramMaplePartyCharacter)
      throws RemoteException;

  MapleParty getParty(int paramInt)
      throws RemoteException;

  void updateParty(int paramInt, PartyOperation paramPartyOperation, MaplePartyCharacter paramMaplePartyCharacter)
      throws RemoteException;

  void partyChat(int paramInt, String paramString1, String paramString2)
      throws RemoteException;

  boolean isAvailable()
      throws RemoteException;

  ChannelWorldInterface getChannelInterface(int paramInt)
      throws RemoteException;

  WorldLocation getLocation(String paramString)
      throws RemoteException;

  CharacterIdChannelPair[] multiBuddyFind(int paramInt, int[] paramArrayOfInt)
      throws RemoteException;

  MapleGuild getGuild(int paramInt, MapleGuildCharacter paramMapleGuildCharacter)
      throws RemoteException;

  void clearGuilds()
      throws RemoteException;

  void setGuildMemberOnline(MapleGuildCharacter paramMapleGuildCharacter, boolean paramBoolean, int paramInt)
      throws RemoteException;

  int addGuildMember(MapleGuildCharacter paramMapleGuildCharacter)
      throws RemoteException;

  void leaveGuild(MapleGuildCharacter paramMapleGuildCharacter)
      throws RemoteException;

  void guildChat(int paramInt1, String paramString1, int paramInt2, String paramString2)
      throws RemoteException;

  void changeRank(int paramInt1, int paramInt2, int paramInt3)
      throws RemoteException;

  void expelMember(MapleGuildCharacter paramMapleGuildCharacter, String paramString, int paramInt)
      throws RemoteException;

  void setGuildNotice(int paramInt, String paramString)
      throws RemoteException;

  void memberLevelJobUpdate(MapleGuildCharacter paramMapleGuildCharacter)
      throws RemoteException;

  void changeRankTitle(int paramInt, String[] paramArrayOfString)
      throws RemoteException;

  int createGuild(int paramInt, String paramString)
      throws RemoteException;

  void setGuildEmblem(int paramInt, short paramShort1, byte paramByte1, short paramShort2, byte paramByte2)
      throws RemoteException;

  void disbandGuild(int paramInt)
      throws RemoteException;

  boolean increaseGuildCapacity(int paramInt)
      throws RemoteException;

  void gainGP(int paramInt1, int paramInt2)
      throws RemoteException;

  String listGMs()
      throws RemoteException;

  MapleMessenger createMessenger(MapleMessengerCharacter paramMapleMessengerCharacter)
      throws RemoteException;

  MapleMessenger getMessenger(int paramInt)
      throws RemoteException;

  void leaveMessenger(int paramInt, MapleMessengerCharacter paramMapleMessengerCharacter)
      throws RemoteException;

  void joinMessenger(int paramInt1, MapleMessengerCharacter paramMapleMessengerCharacter, String paramString, int paramInt2)
      throws RemoteException;

  void silentJoinMessenger(int paramInt1, MapleMessengerCharacter paramMapleMessengerCharacter, int paramInt2)
      throws RemoteException;

  void silentLeaveMessenger(int paramInt, MapleMessengerCharacter paramMapleMessengerCharacter)
      throws RemoteException;

  void messengerChat(int paramInt, String paramString1, String paramString2)
      throws RemoteException;

  void declineChat(String paramString1, String paramString2)
      throws RemoteException;

  void updateMessenger(int paramInt1, String paramString, int paramInt2)
      throws RemoteException;

  void addBuffsToStorage(int paramInt, List<PlayerBuffValueHolder> paramList)
      throws RemoteException;

  List<PlayerBuffValueHolder> getBuffsFromStorage(int paramInt)
      throws RemoteException;

  MapleAlliance getAlliance(int paramInt)
      throws RemoteException;

  void addAlliance(int paramInt, MapleAlliance paramMapleAlliance)
      throws RemoteException;

  void disbandAlliance(int paramInt)
      throws RemoteException;

  void allianceMessage(int paramInt1, MaplePacket paramMaplePacket, int paramInt2, int paramInt3)
      throws RemoteException;

  boolean setAllianceNotice(int paramInt, String paramString)
      throws RemoteException;

  boolean setAllianceRanks(int paramInt, String[] paramArrayOfString)
      throws RemoteException;

  boolean removeGuildFromAlliance(int paramInt1, int paramInt2)
      throws RemoteException;

  boolean addGuildtoAlliance(int paramInt1, int paramInt2)
      throws RemoteException;

  boolean setGuildAllianceId(int paramInt1, int paramInt2)
      throws RemoteException;

  boolean increaseAllianceCapacity(int paramInt1, int paramInt2)
      throws RemoteException;
}

/* Location:           E:\maoxiandaodanji\dist\cherry.jar
 * Qualified Name:     net.sf.cherry.net.world.remote.WorldChannelInterface
 * JD-Core Version:    0.6.0
 */