package net.sf.cherry.net.world.remote;

import net.sf.cherry.net.channel.remote.ChannelWorldInterface;
import net.sf.cherry.net.login.remote.LoginWorldInterface;

import java.rmi.Remote;
import java.rmi.RemoteException;

public interface WorldRegistry extends Remote {
  WorldChannelInterface registerChannelServer(String paramString, ChannelWorldInterface paramChannelWorldInterface)
      throws RemoteException;

  void deregisterChannelServer(int paramInt)
      throws RemoteException;

  WorldLoginInterface registerLoginServer(String paramString, LoginWorldInterface paramLoginWorldInterface)
      throws RemoteException;

  void deregisterLoginServer(LoginWorldInterface paramLoginWorldInterface)
      throws RemoteException;

  String getStatus()
      throws RemoteException;
}

/* Location:           E:\maoxiandaodanji\dist\cherry.jar
 * Qualified Name:     net.sf.cherry.net.world.remote.WorldRegistry
 * JD-Core Version:    0.6.0
 */