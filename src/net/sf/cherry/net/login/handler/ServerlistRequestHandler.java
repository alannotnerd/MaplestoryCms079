 package net.sf.cherry.net.login.handler;
 
 import net.sf.cherry.client.MapleClient;
import net.sf.cherry.net.AbstractMaplePacketHandler;
import net.sf.cherry.net.login.LoginServer;
import net.sf.cherry.tools.MaplePacketCreator;
import net.sf.cherry.tools.data.input.SeekableLittleEndianAccessor;
 
 public class ServerlistRequestHandler extends AbstractMaplePacketHandler
 {
   public void handlePacket(SeekableLittleEndianAccessor slea, MapleClient c)
   {
     c.getSession().write(MaplePacketCreator.getServerList(0, LoginServer.getInstance().getServerName(), LoginServer.getInstance().getLoad()));
     c.getSession().write(MaplePacketCreator.getEndOfServerList());
   }
 }

/* Location:           E:\maoxiandaodanji\dist\cherry.jar
 * Qualified Name:     net.sf.cherry.net.login.handler.ServerlistRequestHandler
 * JD-Core Version:    0.6.0
 */