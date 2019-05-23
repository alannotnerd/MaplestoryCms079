 package net.sf.cherry.net.channel.handler;
 
 import java.awt.Point;
import java.util.Collection;
import java.util.List;

import net.sf.cherry.client.MapleCharacter;
import net.sf.cherry.client.MapleClient;
import net.sf.cherry.server.maps.MapleSummon;
import net.sf.cherry.tools.MaplePacketCreator;
import net.sf.cherry.tools.data.input.SeekableLittleEndianAccessor;
import net.sf.cherry.tools.data.input.StreamUtil;
 
 public class MoveSummonHandler extends AbstractMovementPacketHandler
 {
   public void handlePacket(SeekableLittleEndianAccessor slea, MapleClient c)
   {
     c.doneedlog(this, c.getPlayer());
     int oid = slea.readInt();
     Point startPos = StreamUtil.readShortPoint(slea);
     List res = parseMovement(slea);
 
     MapleCharacter player = c.getPlayer();
     Collection<MapleSummon> summons = player.getSummons().values();
     MapleSummon summon = null;
     for (MapleSummon sum : summons) {
       if (sum.getObjectId() == oid) {
         summon = sum;
       }
     }
     if (summon != null) {
       updatePosition(res, summon, 0);
 
       player.getMap().broadcastMessage(player, MaplePacketCreator.moveSummon(player.getId(), oid, startPos, res), summon.getPosition());
     }
   }
 }

/* Location:           E:\maoxiandaodanji\dist\cherry.jar
 * Qualified Name:     net.sf.cherry.net.channel.handler.MoveSummonHandler
 * JD-Core Version:    0.6.0
 */