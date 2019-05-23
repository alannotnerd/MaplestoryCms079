package net.sf.cherry.net.login.remote;

import java.rmi.Remote;
import java.rmi.RemoteException;

public abstract interface LoginWorldInterface extends Remote
{
  public abstract void channelOnline(int paramInt, String paramString)
    throws RemoteException;

  public abstract void channelOffline(int paramInt)
    throws RemoteException;

  public abstract void shutdown()
    throws RemoteException;

  public abstract boolean isAvailable()
    throws RemoteException;

  public abstract double getPossibleLoginAverage()
    throws RemoteException;

  public abstract int getWaitingUsers()
    throws RemoteException;
}

/* Location:           E:\maoxiandaodanji\dist\cherry.jar
 * Qualified Name:     net.sf.cherry.net.login.remote.LoginWorldInterface
 * JD-Core Version:    0.6.0
 */