package net.sf.cherry.net.world.remote;

import java.rmi.Remote;
import java.rmi.RemoteException;
import java.util.Map;
import java.util.Properties;

import net.sf.cherry.net.world.guild.MapleGuildCharacter;

public abstract interface WorldLoginInterface extends Remote
{
  public abstract Properties getDatabaseProperties()
    throws RemoteException;

  public abstract Properties getWorldProperties()
    throws RemoteException;

  public abstract Map<Integer, Integer> getChannelLoad()
    throws RemoteException;

  public abstract boolean isAvailable()
    throws RemoteException;

  public abstract void deleteGuildCharacter(MapleGuildCharacter paramMapleGuildCharacter)
    throws RemoteException;
}

/* Location:           E:\maoxiandaodanji\dist\cherry.jar
 * Qualified Name:     net.sf.cherry.net.world.remote.WorldLoginInterface
 * JD-Core Version:    0.6.0
 */