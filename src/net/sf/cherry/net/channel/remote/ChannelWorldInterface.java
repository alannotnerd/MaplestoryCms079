package net.sf.cherry.net.channel.remote;

import net.sf.cherry.client.BuddyList;
import net.sf.cherry.net.MaplePacket;
import net.sf.cherry.net.world.MapleMessenger;
import net.sf.cherry.net.world.MapleParty;
import net.sf.cherry.net.world.MaplePartyCharacter;
import net.sf.cherry.net.world.PartyOperation;
import net.sf.cherry.net.world.guild.MapleGuildSummary;
import net.sf.cherry.net.world.remote.WorldChannelCommonOperations;

import java.rmi.Remote;
import java.rmi.RemoteException;
import java.util.List;

public interface ChannelWorldInterface extends Remote, WorldChannelCommonOperations {
  int getChannelId()
      throws RemoteException;

  void setChannelId(int paramInt)
      throws RemoteException;

  String getIP()
      throws RemoteException;

  boolean isConnected(int paramInt)
      throws RemoteException;

  int getConnected()
      throws RemoteException;

  int getLocation(String paramString)
      throws RemoteException;

  void updateParty(MapleParty paramMapleParty, PartyOperation paramPartyOperation, MaplePartyCharacter paramMaplePartyCharacter)
      throws RemoteException;

  void partyChat(MapleParty paramMapleParty, String paramString1, String paramString2)
      throws RemoteException;

  boolean isAvailable()
      throws RemoteException;

  BuddyList.BuddyAddResult requestBuddyAdd(String paramString1, int paramInt1, int paramInt2, String paramString2)
      throws RemoteException;

  void buddyChanged(int paramInt1, int paramInt2, String paramString, int paramInt3, BuddyList.BuddyOperation paramBuddyOperation)
      throws RemoteException;

  int[] multiBuddyFind(int paramInt, int[] paramArrayOfInt)
      throws RemoteException;

  void sendPacket(List<Integer> paramList, MaplePacket paramMaplePacket, int paramInt)
      throws RemoteException;

  void setGuildAndRank(int paramInt1, int paramInt2, int paramInt3)
      throws RemoteException;

  void setOfflineGuildStatus(int paramInt1, byte paramByte, int paramInt2)
      throws RemoteException;

  void setGuildAndRank(List<Integer> paramList, int paramInt1, int paramInt2, int paramInt3)
      throws RemoteException;

  void reloadGuildCharacters()
      throws RemoteException;

  void changeEmblem(int paramInt, List<Integer> paramList, MapleGuildSummary paramMapleGuildSummary)
      throws RemoteException;

  String listGMs()
      throws RemoteException;

  void addMessengerPlayer(MapleMessenger paramMapleMessenger, String paramString, int paramInt1, int paramInt2)
      throws RemoteException;

  void removeMessengerPlayer(MapleMessenger paramMapleMessenger, int paramInt)
      throws RemoteException;

  void messengerChat(MapleMessenger paramMapleMessenger, String paramString1, String paramString2)
      throws RemoteException;

  void declineChat(String paramString1, String paramString2)
      throws RemoteException;

  void updateMessenger(MapleMessenger paramMapleMessenger, String paramString, int paramInt1, int paramInt2)
      throws RemoteException;
}

/* Location:           E:\maoxiandaodanji\dist\cherry.jar
 * Qualified Name:     net.sf.cherry.net.channel.remote.ChannelWorldInterface
 * JD-Core Version:    0.6.0
 */