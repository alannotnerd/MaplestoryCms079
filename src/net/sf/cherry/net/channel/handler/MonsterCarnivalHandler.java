 package net.sf.cherry.net.channel.handler;
 
 import java.awt.Point;

import net.sf.cherry.client.MapleClient;
import net.sf.cherry.net.AbstractMaplePacketHandler;
import net.sf.cherry.server.life.MapleLifeFactory;
import net.sf.cherry.server.life.MapleMonster;
import net.sf.cherry.tools.MaplePacketCreator;
import net.sf.cherry.tools.data.input.SeekableLittleEndianAccessor;
 
 public class MonsterCarnivalHandler extends AbstractMaplePacketHandler
 {
   public void handlePacket(SeekableLittleEndianAccessor slea, MapleClient c)
   {
     c.doneedlog(this, c.getPlayer());
     int tab = slea.readByte();
     int num = slea.readByte();
     c.getPlayer().getMap().broadcastMessage(MaplePacketCreator.playerSummoned(c.getPlayer().getName(), tab, num));
     if (tab == 0) {
       MapleMonster mob = MapleLifeFactory.getMonster(getMonsterIdByNum(num));
       c.getPlayer().getMap().spawnMonsterOnGroundBelow(mob, randomizePosition(c.getPlayer().getMapId(), 1));
     }
   }
 
   public Point randomizePosition(int mapid, int team) {
     int posx = 0;
     int posy = 0;
     if (mapid == 980000301) {
       posy = 162;
       if (team == 0)
         posx = rand(-1554, -151);
       else {
         posx = rand(148, 1571);
       }
     }
     return new Point(posx, posy);
   }
 
   public int getMonsterIdByNum(int num)
   {
     int mid = 0;
     num++;
 
     switch (num) {
     case 1:
       mid = 3000005;
       break;
     case 2:
       mid = 3230302;
       break;
     case 3:
       mid = 3110102;
       break;
     case 4:
       mid = 3230306;
       break;
     case 5:
       mid = 3230305;
       break;
     case 6:
       mid = 4230113;
       break;
     case 7:
       mid = 4230111;
       break;
     case 8:
       mid = 3230103;
       break;
     case 9:
       mid = 4230115;
       break;
     case 10:
       mid = 4130103;
       break;
     default:
       mid = 210100;
     }
 
     return mid;
   }
 
   private static int rand(int lbound, int ubound) {
     return (int)(Math.random() * (ubound - lbound + 1) + lbound);
   }
 }

/* Location:           E:\maoxiandaodanji\dist\cherry.jar
 * Qualified Name:     net.sf.cherry.net.channel.handler.MonsterCarnivalHandler
 * JD-Core Version:    0.6.0
 */