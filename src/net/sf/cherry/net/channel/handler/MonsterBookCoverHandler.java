 package net.sf.cherry.net.channel.handler;
 
 import net.sf.cherry.client.MapleClient;
import net.sf.cherry.net.AbstractMaplePacketHandler;
import net.sf.cherry.tools.MaplePacketCreator;
import net.sf.cherry.tools.data.input.SeekableLittleEndianAccessor;
 
 public final class MonsterBookCoverHandler extends AbstractMaplePacketHandler
 {
   public final void handlePacket(SeekableLittleEndianAccessor slea, MapleClient c)
   {
     c.doneedlog(this, c.getPlayer());
     int id = slea.readInt();
     if ((id == 0) || (id / 10000 == 238)) {
       c.getPlayer().setMonsterBookCover(id);
       c.getSession().write(MaplePacketCreator.changeCover(id));
     }
   }
 }

/* Location:           E:\maoxiandaodanji\dist\cherry.jar
 * Qualified Name:     net.sf.cherry.net.channel.handler.MonsterBookCoverHandler
 * JD-Core Version:    0.6.0
 */