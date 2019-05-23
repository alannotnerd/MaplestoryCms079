 package net.sf.cherry.net.world;
 
 import java.rmi.RemoteException;
import java.rmi.server.UnicastRemoteObject;
import java.util.HashMap;
import java.util.Map;
import java.util.Properties;

import javax.rmi.ssl.SslRMIClientSocketFactory;
import javax.rmi.ssl.SslRMIServerSocketFactory;

import net.sf.cherry.net.channel.remote.ChannelWorldInterface;
import net.sf.cherry.net.world.guild.MapleGuildCharacter;
import net.sf.cherry.net.world.remote.WorldLoginInterface;
 
 public class WorldLoginInterfaceImpl extends UnicastRemoteObject
   implements WorldLoginInterface
 {
   private static final long serialVersionUID = -4965323089596332908L;
 
   public WorldLoginInterfaceImpl()
     throws RemoteException
   {
     super(0, new SslRMIClientSocketFactory(), new SslRMIServerSocketFactory());
   }
 
   public Properties getDatabaseProperties() throws RemoteException {
     return WorldServer.getInstance().getDbProp();
   }
 
   public Properties getWorldProperties() throws RemoteException {
     return WorldServer.getInstance().getWorldProp();
   }
 
   public boolean isAvailable() throws RemoteException {
     return true;
   }
 
   public Map<Integer, Integer> getChannelLoad() throws RemoteException {
     Map ret = new HashMap();
     for (ChannelWorldInterface cwi : WorldRegistryImpl.getInstance().getAllChannelServers()) {
       ret.put(Integer.valueOf(cwi.getChannelId()), Integer.valueOf(cwi.getConnected()));
     }
     return ret;
   }
 
   public void deleteGuildCharacter(MapleGuildCharacter mgc) throws RemoteException
   {
     WorldRegistryImpl wr = WorldRegistryImpl.getInstance();
 
     wr.setGuildMemberOnline(mgc, false, -1);
 
     if (mgc.getGuildRank() > 1)
     {
       wr.leaveGuild(mgc);
     }
     else wr.disbandGuild(mgc.getGuildId());
   }
 }

/* Location:           E:\maoxiandaodanji\dist\cherry.jar
 * Qualified Name:     net.sf.cherry.net.world.WorldLoginInterfaceImpl
 * JD-Core Version:    0.6.0
 */