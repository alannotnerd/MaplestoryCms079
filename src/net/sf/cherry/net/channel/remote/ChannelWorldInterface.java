package net.sf.cherry.net.channel.remote;

import java.rmi.Remote;
import java.rmi.RemoteException;
import java.util.List;

import net.sf.cherry.client.BuddyList;
import net.sf.cherry.net.MaplePacket;
import net.sf.cherry.net.world.MapleMessenger;
import net.sf.cherry.net.world.MapleParty;
import net.sf.cherry.net.world.MaplePartyCharacter;
import net.sf.cherry.net.world.PartyOperation;
import net.sf.cherry.net.world.guild.MapleGuildSummary;
import net.sf.cherry.net.world.remote.WorldChannelCommonOperations;

public abstract interface ChannelWorldInterface extends Remote, WorldChannelCommonOperations
{
  public abstract void setChannelId(int paramInt)
    throws RemoteException;

  public abstract int getChannelId()
    throws RemoteException;

  public abstract String getIP()
    throws RemoteException;

  public abstract boolean isConnected(int paramInt)
    throws RemoteException;

  public abstract int getConnected()
    throws RemoteException;

  public abstract int getLocation(String paramString)
    throws RemoteException;

  public abstract void updateParty(MapleParty paramMapleParty, PartyOperation paramPartyOperation, MaplePartyCharacter paramMaplePartyCharacter)
    throws RemoteException;

  public abstract void partyChat(MapleParty paramMapleParty, String paramString1, String paramString2)
    throws RemoteException;

  public abstract boolean isAvailable()
    throws RemoteException;

  public abstract BuddyList.BuddyAddResult requestBuddyAdd(String paramString1, int paramInt1, int paramInt2, String paramString2)
    throws RemoteException;

  public abstract void buddyChanged(int paramInt1, int paramInt2, String paramString, int paramInt3, BuddyList.BuddyOperation paramBuddyOperation)
    throws RemoteException;

  public abstract int[] multiBuddyFind(int paramInt, int[] paramArrayOfInt)
    throws RemoteException;

  public abstract void sendPacket(List<Integer> paramList, MaplePacket paramMaplePacket, int paramInt)
    throws RemoteException;

  public abstract void setGuildAndRank(int paramInt1, int paramInt2, int paramInt3)
    throws RemoteException;

  public abstract void setOfflineGuildStatus(int paramInt1, byte paramByte, int paramInt2)
    throws RemoteException;

  public abstract void setGuildAndRank(List<Integer> paramList, int paramInt1, int paramInt2, int paramInt3)
    throws RemoteException;

  public abstract void reloadGuildCharacters()
    throws RemoteException;

  public abstract void changeEmblem(int paramInt, List<Integer> paramList, MapleGuildSummary paramMapleGuildSummary)
    throws RemoteException;

  public abstract String listGMs()
    throws RemoteException;

  public abstract void addMessengerPlayer(MapleMessenger paramMapleMessenger, String paramString, int paramInt1, int paramInt2)
    throws RemoteException;

  public abstract void removeMessengerPlayer(MapleMessenger paramMapleMessenger, int paramInt)
    throws RemoteException;

  public abstract void messengerChat(MapleMessenger paramMapleMessenger, String paramString1, String paramString2)
    throws RemoteException;

  public abstract void declineChat(String paramString1, String paramString2)
    throws RemoteException;

  public abstract void updateMessenger(MapleMessenger paramMapleMessenger, String paramString, int paramInt1, int paramInt2)
    throws RemoteException;
}

/* Location:           E:\maoxiandaodanji\dist\cherry.jar
 * Qualified Name:     net.sf.cherry.net.channel.remote.ChannelWorldInterface
 * JD-Core Version:    0.6.0
 */