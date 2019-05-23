 package net.sf.cherry.net.channel.handler;
 
 import net.sf.cherry.client.MapleClient;
import net.sf.cherry.net.AbstractMaplePacketHandler;
import net.sf.cherry.server.life.MapleMonster;
import net.sf.cherry.tools.MaplePacketCreator;
import net.sf.cherry.tools.data.input.SeekableLittleEndianAccessor;
 
 public class MonsterBombHandler extends AbstractMaplePacketHandler
 {
   public void handlePacket(SeekableLittleEndianAccessor slea, MapleClient c)
   {
     c.doneedlog(this, c.getPlayer());
     int oid = slea.readInt();
     MapleMonster monster = c.getPlayer().getMap().getMonsterByOid(oid);
		if ((!c.getPlayer().isAlive()) || (monster == null)) {
       return;
     }
     //小黑水雷||大黑水雷
     if ((monster.getId() == 8500003) || (monster.getId() == 8500004)) {
       monster.getMap().broadcastMessage(MaplePacketCreator.killMonster(monster.getObjectId(), 4));
       c.getPlayer().getMap().removeMapObject(oid);
     }else{
    	 System.out.println("=============================MonsterBombHandler============================");
    	 System.out.println("============================="+monster.getId()+"============================");
     }
   }
 }