 package net.sf.cherry.net.channel.handler;
 
 import net.sf.cherry.client.MapleClient;
import net.sf.cherry.net.AbstractMaplePacketHandler;
import net.sf.cherry.tools.MaplePacketCreator;
import net.sf.cherry.tools.data.input.SeekableLittleEndianAccessor;
 
 public class CloseChalkboardHandler extends AbstractMaplePacketHandler
 {
   public void handlePacket(SeekableLittleEndianAccessor slea, MapleClient c)
   {
     c.doneedlog(this, c.getPlayer());
     c.getPlayer().setChalkboard(null);
     c.getPlayer().getMap().broadcastMessage(MaplePacketCreator.useChalkboard(c.getPlayer(), true));
   }
 }

/* Location:           E:\maoxiandaodanji\dist\cherry.jar
 * Qualified Name:     net.sf.cherry.net.channel.handler.CloseChalkboardHandler
 * JD-Core Version:    0.6.0
 */