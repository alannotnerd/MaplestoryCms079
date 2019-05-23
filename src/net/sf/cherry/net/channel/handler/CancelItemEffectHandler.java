 package net.sf.cherry.net.channel.handler;
 
 import net.sf.cherry.client.MapleClient;
import net.sf.cherry.net.AbstractMaplePacketHandler;
import net.sf.cherry.server.MapleItemInformationProvider;
import net.sf.cherry.server.maps.FakeCharacter;
import net.sf.cherry.tools.data.input.SeekableLittleEndianAccessor;
 
 public final class CancelItemEffectHandler extends AbstractMaplePacketHandler
 {
   public final void handlePacket(SeekableLittleEndianAccessor slea, MapleClient c)
   {
     c.doneedlog(this, c.getPlayer());
     c.getPlayer().cancelEffect(MapleItemInformationProvider.getInstance().getItemEffect(-slea.readInt()), false, -1L);
        if (c.getPlayer().hasFakeChar()) {
            for (FakeCharacter ch : c.getPlayer().getFakeChars()) {
     ch.getFakeChar().cancelEffect(MapleItemInformationProvider.getInstance().getItemEffect(-slea.readInt()), false, -1L);
            }
        }
   }
 }

/* Location:           E:\maoxiandaodanji\dist\cherry.jar
 * Qualified Name:     net.sf.cherry.net.channel.handler.CancelItemEffectHandler
 * JD-Core Version:    0.6.0
 */