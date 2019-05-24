package net.sf.cherry.net.login.remote;

import java.rmi.Remote;
import java.rmi.RemoteException;

public interface LoginWorldInterface extends Remote {
  void channelOnline(int paramInt, String paramString)
      throws RemoteException;

  void channelOffline(int paramInt)
      throws RemoteException;

  void shutdown()
      throws RemoteException;

  boolean isAvailable()
      throws RemoteException;

  double getPossibleLoginAverage()
      throws RemoteException;

  int getWaitingUsers()
      throws RemoteException;
}

/* Location:           E:\maoxiandaodanji\dist\cherry.jar
 * Qualified Name:     net.sf.cherry.net.login.remote.LoginWorldInterface
 * JD-Core Version:    0.6.0
 */