 package net.sf.cherry.net.login.handler;
 
 import net.sf.cherry.client.MapleClient;
import net.sf.cherry.net.AbstractMaplePacketHandler;
import net.sf.cherry.net.channel.ChannelServer;
import net.sf.cherry.net.login.LoginServer;
import net.sf.cherry.tools.MaplePacketCreator;
import net.sf.cherry.tools.data.input.SeekableLittleEndianAccessor;
 
 public class ServerStatusRequestHandler extends AbstractMaplePacketHandler
 {
   public void handlePacket(SeekableLittleEndianAccessor slea, MapleClient c)
   {
     int load = 0;
     for (ChannelServer cservs : ChannelServer.getAllInstances()) {
       load += ((Integer)LoginServer.getInstance().getLoad().get(Integer.valueOf(cservs.getChannel()))).intValue();
     }
     if (LoginServer.getInstance().getUserLimit() <= load)
       c.getSession().write(MaplePacketCreator.getServerStatus(2));
     else if (LoginServer.getInstance().getUserLimit() * 0.9D <= load)
       c.getSession().write(MaplePacketCreator.getServerStatus(1));
     else
       c.getSession().write(MaplePacketCreator.getServerStatus(0));
   }
 }

/* Location:           E:\maoxiandaodanji\dist\cherry.jar
 * Qualified Name:     net.sf.cherry.net.login.handler.ServerStatusRequestHandler
 * JD-Core Version:    0.6.0
 */