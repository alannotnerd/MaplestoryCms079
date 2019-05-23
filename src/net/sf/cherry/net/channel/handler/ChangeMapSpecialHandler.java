 package net.sf.cherry.net.channel.handler;
 
 import net.sf.cherry.client.MapleClient;
import net.sf.cherry.net.AbstractMaplePacketHandler;
import net.sf.cherry.server.MaplePortal;
import net.sf.cherry.tools.MaplePacketCreator;
import net.sf.cherry.tools.data.input.SeekableLittleEndianAccessor;
 
 public final class ChangeMapSpecialHandler extends AbstractMaplePacketHandler
 {
   public final void handlePacket(SeekableLittleEndianAccessor slea, MapleClient c)
   {
     c.doneedlog(this, c.getPlayer());
     slea.readByte();
     String startwp = slea.readMapleAsciiString();
     slea.readShort();
     MaplePortal portal = c.getPlayer().getMap().getPortal(startwp);
     if (portal != null)
       portal.enterPortal(c);
     else
       c.getSession().write(MaplePacketCreator.enableActions());
   }
 }

/* Location:           E:\maoxiandaodanji\dist\cherry.jar
 * Qualified Name:     net.sf.cherry.net.channel.handler.ChangeMapSpecialHandler
 * JD-Core Version:    0.6.0
 */