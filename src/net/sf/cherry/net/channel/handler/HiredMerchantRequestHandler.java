 package net.sf.cherry.net.channel.handler;
 
 import java.util.Arrays;

import net.sf.cherry.client.MapleClient;
import net.sf.cherry.net.AbstractMaplePacketHandler;
import net.sf.cherry.server.maps.MapleMapObjectType;
import net.sf.cherry.tools.MaplePacketCreator;
import net.sf.cherry.tools.data.input.SeekableLittleEndianAccessor;
 
 public class HiredMerchantRequestHandler extends AbstractMaplePacketHandler
 {
   public void handlePacket(SeekableLittleEndianAccessor slea, MapleClient c)
   {
     c.doneedlog(this, c.getPlayer());
     if (c.getPlayer().getCherryBan()) {
       c.getPlayer().getCherryBanMessage();
       c.getSession().write(MaplePacketCreator.enableActions());
       return;
     }
     if (c.getPlayer().getMap().getMapObjectsInRange(c.getPlayer().getPosition(), 23000.0D, Arrays.asList(new MapleMapObjectType[] { MapleMapObjectType.HIRED_MERCHANT, MapleMapObjectType.SHOP })).size() == 0) {
       if (!c.getPlayer().hasMerchant())
         c.getSession().write(MaplePacketCreator.hiredMerchantBox(c.getPlayer()));
       else
         c.getPlayer().dropMessage(1, "你已经开启了一个商店,请关闭后再试");
     }
     else
       c.getPlayer().dropMessage(1, "你不能在这里开设商店");
   }
 }

/* Location:           E:\maoxiandaodanji\dist\cherry.jar
 * Qualified Name:     net.sf.cherry.net.channel.handler.HiredMerchantRequestHandler
 * JD-Core Version:    0.6.0
 */