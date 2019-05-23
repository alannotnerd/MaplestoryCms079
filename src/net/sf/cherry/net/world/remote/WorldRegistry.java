package net.sf.cherry.net.world.remote;

import java.rmi.Remote;
import java.rmi.RemoteException;

import net.sf.cherry.net.channel.remote.ChannelWorldInterface;
import net.sf.cherry.net.login.remote.LoginWorldInterface;

public abstract interface WorldRegistry extends Remote
{
  public abstract WorldChannelInterface registerChannelServer(String paramString, ChannelWorldInterface paramChannelWorldInterface)
    throws RemoteException;

  public abstract void deregisterChannelServer(int paramInt)
    throws RemoteException;

  public abstract WorldLoginInterface registerLoginServer(String paramString, LoginWorldInterface paramLoginWorldInterface)
    throws RemoteException;

  public abstract void deregisterLoginServer(LoginWorldInterface paramLoginWorldInterface)
    throws RemoteException;

  public abstract String getStatus()
    throws RemoteException;
}

/* Location:           E:\maoxiandaodanji\dist\cherry.jar
 * Qualified Name:     net.sf.cherry.net.world.remote.WorldRegistry
 * JD-Core Version:    0.6.0
 */