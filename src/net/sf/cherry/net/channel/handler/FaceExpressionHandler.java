 package net.sf.cherry.net.channel.handler;
 
 import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import net.sf.cherry.client.MapleClient;
import net.sf.cherry.net.AbstractMaplePacketHandler;
import net.sf.cherry.server.MapleItemInformationProvider;
import net.sf.cherry.server.maps.FakeCharacter;
import net.sf.cherry.tools.MaplePacketCreator;
import net.sf.cherry.tools.data.input.SeekableLittleEndianAccessor;
 
 public class FaceExpressionHandler extends AbstractMaplePacketHandler
 {
   private static Logger log = LoggerFactory.getLogger(FaceExpressionHandler.class);
 
   public void handlePacket(SeekableLittleEndianAccessor slea, MapleClient c)
   {
     c.doneedlog(this, c.getPlayer());
     int emote = slea.readInt();
     if (emote < 0) {
       return;
     }
     if (emote > 7) {
       int emoteid = 5159992 + emote;
       if (c.getPlayer().getInventory(MapleItemInformationProvider.getInstance().getInventoryType(emoteid)).findById(emoteid) == null) {
         return;
       }
     }
     
        for (FakeCharacter ch : c.getPlayer().getFakeChars()) {
            c.getPlayer().getMap().broadcastMessage(ch.getFakeChar(), MaplePacketCreator.facialExpression(ch.getFakeChar(), emote), false);
        }
     c.getPlayer().getMap().broadcastMessage(c.getPlayer(), MaplePacketCreator.facialExpression(c.getPlayer(), emote), false);
   }
 }

/* Location:           E:\maoxiandaodanji\dist\cherry.jar
 * Qualified Name:     net.sf.cherry.net.channel.handler.FaceExpressionHandler
 * JD-Core Version:    0.6.0
 */