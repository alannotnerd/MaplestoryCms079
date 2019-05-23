package net.sf.cherry.net.world.remote;

import java.rmi.RemoteException;
import java.util.List;

public abstract interface WorldChannelCommonOperations
{
  public abstract boolean isConnected(String paramString)
    throws RemoteException;

  public abstract void broadcastMessage(String paramString, byte[] paramArrayOfByte)
    throws RemoteException;

  public abstract void whisper(String paramString1, String paramString2, int paramInt, String paramString3)
    throws RemoteException;

  public abstract void shutdown(int paramInt)
    throws RemoteException;

  public abstract void broadcastWorldMessage(String paramString)
    throws RemoteException;

  public abstract void loggedOn(String paramString, int paramInt1, int paramInt2, int[] paramArrayOfInt)
    throws RemoteException;

  public abstract void loggedOff(String paramString, int paramInt1, int paramInt2, int[] paramArrayOfInt)
    throws RemoteException;

  public abstract List<CheaterData> getCheaters()
    throws RemoteException;

  public abstract void buddyChat(int[] paramArrayOfInt, int paramInt, String paramString1, String paramString2)
    throws RemoteException;

  public abstract void messengerInvite(String paramString1, int paramInt1, String paramString2, int paramInt2)
    throws RemoteException;

  public abstract void spouseChat(String paramString1, String paramString2, String paramString3)
    throws RemoteException;

  public abstract void broadcastGMMessage(String paramString, byte[] paramArrayOfByte)
    throws RemoteException;
}

/* Location:           E:\maoxiandaodanji\dist\cherry.jar
 * Qualified Name:     net.sf.cherry.net.world.remote.WorldChannelCommonOperations
 * JD-Core Version:    0.6.0
 */