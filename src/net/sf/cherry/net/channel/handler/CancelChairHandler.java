package net.sf.cherry.net.channel.handler;
 
import net.sf.cherry.client.MapleClient;
import net.sf.cherry.net.AbstractMaplePacketHandler;
import net.sf.cherry.server.maps.FakeCharacter;
import net.sf.cherry.tools.MaplePacketCreator;
import net.sf.cherry.tools.data.input.SeekableLittleEndianAccessor;
import net.sf.cherry.client.Fishing;
 
 public class CancelChairHandler extends AbstractMaplePacketHandler
 {
   public void handlePacket(SeekableLittleEndianAccessor slea, MapleClient c)
   {
     c.doneedlog(this, c.getPlayer());
     int id = slea.readShort();
     
     if (Fishing.isFishingChair(c.getPlayer().getChair()))
     {
    	 if (Fishing.isFishingMap(c.getPlayer().getMapId()))
    	 {
    		 //如果在坐的是钓鱼椅子，又在钓鱼地图，取消钓鱼
    		 c.getPlayer().cancelFishing();
    	 }
     }
 
     if (id == -1) {
       c.getPlayer().setChair(0);
       c.getSession().write(MaplePacketCreator.cancelChair());
       c.getPlayer().getMap().broadcastMessage(c.getPlayer(), MaplePacketCreator.showChair(c.getPlayer().getId(), 0), false);
       if (c.getPlayer().hasFakeChar()) {
            for (FakeCharacter ch : c.getPlayer().getFakeChars()) {
                ch.getFakeChar().setChair(0);
                ch.getFakeChar().getMap().broadcastMessage(ch.getFakeChar(), MaplePacketCreator.showChair(ch.getFakeChar().getId(), 0), false);
            }
       }
     } else {
       c.getPlayer().setChair(id);
       c.getSession().write(MaplePacketCreator.cancelChair(id));
       if (c.getPlayer().hasFakeChar()) {
            for (FakeCharacter ch : c.getPlayer().getFakeChars()) {
                ch.getFakeChar().setChair(id);
            }
       }
     }
   }
 }