 package net.sf.cherry.net.channel.handler;
 
 import net.sf.cherry.client.MapleCharacter;
import net.sf.cherry.client.MapleClient;
import net.sf.cherry.net.AbstractMaplePacketHandler;
import net.sf.cherry.server.life.MapleMonster;
import net.sf.cherry.tools.MaplePacketCreator;
import net.sf.cherry.tools.data.input.SeekableLittleEndianAccessor;
 
 public class UseCatchItemHandler extends AbstractMaplePacketHandler
 {
   public void handlePacket(SeekableLittleEndianAccessor slea, MapleClient c)
   {
     c.doneedlog(this, c.getPlayer());
 
     slea.readInt();
     slea.readShort();
     int itemid = slea.readInt();
     int monsterid = slea.readInt();
 
     MapleMonster mob = c.getPlayer().getMap().getMonsterByOid(monsterid);
     if (mob != null)
       if (mob.getHp() <= mob.getMaxHp() / 2) {
         if (itemid == 2270002) {
           c.getPlayer().getMap().broadcastMessage(MaplePacketCreator.catchMonster(monsterid, itemid, (byte) 1));
         }
         mob.getMap().killMonster(mob, (MapleCharacter)mob.getMap().getAllPlayers().get(0), false, false, 0);
         c.getPlayer().setAPQScore(c.getPlayer().getAPQScore() + 1);
         c.getPlayer().getMap().broadcastMessage(MaplePacketCreator.updateAriantPQRanking(c.getPlayer().getName(), c.getPlayer().getAPQScore(), false));
       } else {
         c.getSession().write(MaplePacketCreator.serverNotice(5, "你不能扑捉这个怪物,因为它实在太强了."));
       }
   }
 }
