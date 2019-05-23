 package net.sf.cherry.net.channel.handler;
 
 import java.awt.Point;
import java.util.List;

import net.sf.cherry.client.MapleCharacter;
import net.sf.cherry.client.MapleClient;
import net.sf.cherry.tools.MaplePacketCreator;
import net.sf.cherry.tools.data.input.SeekableLittleEndianAccessor;
import net.sf.cherry.tools.data.input.StreamUtil;
 
 public class MovePetHandler extends AbstractMovementPacketHandler
 {
   public void handlePacket(SeekableLittleEndianAccessor slea, MapleClient c)
   {
     c.doneedlog(this, c.getPlayer());
     int petId = slea.readInt();
     slea.readInt();
     Point startPos = StreamUtil.readShortPoint(slea);
     List res = parseMovement(slea);
     if (res.size() == 0) {
       return;
     }
     MapleCharacter player = c.getPlayer();
     int slot = player.getPetByUniqueId(petId);
     if ((player.inCS()) || (slot == -1)) {
       return;
     }
     player.getPet(slot).updatePosition(res);
     player.getMap().broadcastMessage(player, MaplePacketCreator.movePet(player.getId(), petId, slot, res), false);
   }
 }

/* Location:           E:\maoxiandaodanji\dist\cherry.jar
 * Qualified Name:     net.sf.cherry.net.channel.handler.MovePetHandler
 * JD-Core Version:    0.6.0
 */