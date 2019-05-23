 package net.sf.cherry.net.channel.handler;
 
 import net.sf.cherry.client.MapleClient;
import net.sf.cherry.net.AbstractMaplePacketHandler;
import net.sf.cherry.tools.data.input.SeekableLittleEndianAccessor;
 
 public final class PetExcludeItemsHandler extends AbstractMaplePacketHandler
 {
   public final void handlePacket(SeekableLittleEndianAccessor slea, MapleClient c)
   {
     c.doneedlog(this, c.getPlayer());
     slea.readLong();
     byte amount = slea.readByte();
     for (int i = 0; i < amount; i++)
       c.getPlayer().addExcluded(slea.readInt());
   }
 }

/* Location:           E:\maoxiandaodanji\dist\cherry.jar
 * Qualified Name:     net.sf.cherry.net.channel.handler.PetExcludeItemsHandler
 * JD-Core Version:    0.6.0
 */