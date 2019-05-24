package net.sf.cherry.net.world.remote;

import java.rmi.RemoteException;
import java.util.List;

public interface WorldChannelCommonOperations {
  boolean isConnected(String paramString)
      throws RemoteException;

  void broadcastMessage(String paramString, byte[] paramArrayOfByte)
      throws RemoteException;

  void whisper(String paramString1, String paramString2, int paramInt, String paramString3)
      throws RemoteException;

  void shutdown(int paramInt)
      throws RemoteException;

  void broadcastWorldMessage(String paramString)
      throws RemoteException;

  void loggedOn(String paramString, int paramInt1, int paramInt2, int[] paramArrayOfInt)
      throws RemoteException;

  void loggedOff(String paramString, int paramInt1, int paramInt2, int[] paramArrayOfInt)
      throws RemoteException;

  List<CheaterData> getCheaters()
      throws RemoteException;

  void buddyChat(int[] paramArrayOfInt, int paramInt, String paramString1, String paramString2)
      throws RemoteException;

  void messengerInvite(String paramString1, int paramInt1, String paramString2, int paramInt2)
      throws RemoteException;

  void spouseChat(String paramString1, String paramString2, String paramString3)
      throws RemoteException;

  void broadcastGMMessage(String paramString, byte[] paramArrayOfByte)
      throws RemoteException;
}

/* Location:           E:\maoxiandaodanji\dist\cherry.jar
 * Qualified Name:     net.sf.cherry.net.world.remote.WorldChannelCommonOperations
 * JD-Core Version:    0.6.0
 */