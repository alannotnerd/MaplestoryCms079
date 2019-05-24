package net.sf.cherry.net.world.remote;

import net.sf.cherry.net.world.guild.MapleGuildCharacter;

import java.rmi.Remote;
import java.rmi.RemoteException;
import java.util.Map;
import java.util.Properties;

public interface WorldLoginInterface extends Remote {
  Properties getDatabaseProperties()
      throws RemoteException;

  Properties getWorldProperties()
      throws RemoteException;

  Map<Integer, Integer> getChannelLoad()
      throws RemoteException;

  boolean isAvailable()
      throws RemoteException;

  void deleteGuildCharacter(MapleGuildCharacter paramMapleGuildCharacter)
      throws RemoteException;
}

/* Location:           E:\maoxiandaodanji\dist\cherry.jar
 * Qualified Name:     net.sf.cherry.net.world.remote.WorldLoginInterface
 * JD-Core Version:    0.6.0
 */