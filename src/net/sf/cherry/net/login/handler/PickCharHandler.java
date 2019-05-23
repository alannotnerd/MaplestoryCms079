 package net.sf.cherry.net.login.handler;
 
 import java.net.InetAddress;
import java.net.UnknownHostException;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import net.sf.cherry.client.MapleClient;
import net.sf.cherry.net.AbstractMaplePacketHandler;
import net.sf.cherry.net.channel.ChannelServer;
import net.sf.cherry.net.login.LoginServer;
import net.sf.cherry.tools.MaplePacketCreator;
import net.sf.cherry.tools.data.input.SeekableLittleEndianAccessor;
 
 public class PickCharHandler extends AbstractMaplePacketHandler
 {
   private static Logger log = LoggerFactory.getLogger(PickCharHandler.class);
 
   public void handlePacket(SeekableLittleEndianAccessor slea, MapleClient c)
   {
     int charId = slea.readInt();
     int world = slea.readInt();
     c.setWorld(world);
     try {
       c.setChannel((int)(Math.random() * ChannelServer.getAllInstances().size()));
     } catch (Exception e) {
       c.setChannel(1);
     }
     try {
       if (c.getIdleTask() != null) {
         c.getIdleTask().cancel(true);
       }
       c.updateLoginState(1);
 
       String channelServerIP = MapleClient.getChannelServerIPFromSubnet(c.getSession().getRemoteAddress().toString().replace("/", "").split(":")[0], c.getChannel());
       if (channelServerIP.equals("0.0.0.0")) {
         String[] socket = LoginServer.getInstance().getIP(c.getChannel()).split(":");
         c.getSession().write(MaplePacketCreator.getServerIP(InetAddress.getByName(socket[0]), Integer.parseInt(socket[1]), charId));
       } else {
         String[] socket = LoginServer.getInstance().getIP(c.getChannel()).split(":");
         c.getSession().write(MaplePacketCreator.getServerIP(InetAddress.getByName(channelServerIP), Integer.parseInt(socket[1]), charId));
       }
     } catch (UnknownHostException e) {
       log.error("Host not found", e);
     }
   }
 }
