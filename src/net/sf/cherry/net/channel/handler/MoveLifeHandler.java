 package net.sf.cherry.net.channel.handler;
 
 import java.awt.Point;
import java.util.List;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import net.sf.cherry.client.MapleCharacter;
import net.sf.cherry.client.MapleClient;
import net.sf.cherry.net.MaplePacket;
import net.sf.cherry.net.Constants.GameConstants;
import net.sf.cherry.server.life.MapleMonster;
import net.sf.cherry.server.life.MobSkill;
import net.sf.cherry.server.life.MobSkillFactory;
import net.sf.cherry.server.maps.MapleMapObject;
import net.sf.cherry.server.maps.MapleMapObjectType;
import net.sf.cherry.tools.MaplePacketCreator;
import net.sf.cherry.tools.Pair;
import net.sf.cherry.tools.data.input.SeekableLittleEndianAccessor;
 
 public class MoveLifeHandler extends AbstractMovementPacketHandler
 {
   private static Logger log = LoggerFactory.getLogger(MoveLifeHandler.class);
 
   public void handlePacket(SeekableLittleEndianAccessor slea, MapleClient c)
   {
     MapleCharacter player = c.getPlayer();
     int objectid = slea.readInt();
     
     short moveid = slea.readShort();
 
     MapleMapObject mmo = c.getPlayer().getMap().getMapObject(objectid);
     if ((mmo == null) || (mmo.getType() != MapleMapObjectType.MONSTER)) {
       return;
     }
     MapleMonster monster = (MapleMonster)mmo;
  
     boolean noPacket = monster.isMoveLocked();
 
     List res = null;
     int skillByte = slea.readByte();
     int skill = slea.readByte();
     int skill_1 = slea.readByte() & 0xFF;
     int skill_2 = slea.readByte();
     int skill_3 = slea.readByte();
     slea.readByte();
 
     MobSkill toUse = null;
 
     if ((skillByte == 1) && (monster.getNoSkills() > 0)) {
       int random = (int)(Math.random() * monster.getNoSkills());
       Pair skillToUse = (Pair)monster.getSkills().get(random);
       toUse = MobSkillFactory.getMobSkill(((Integer)skillToUse.getLeft()).intValue(), ((Integer)skillToUse.getRight()).intValue());
       if (!monster.canUseSkill(toUse)) {
         toUse = null;
       }
     }
 
     if ((skill_1 >= 100) && (skill_1 <= 200) && (monster.hasSkill(skill_1, skill_2))) {
       MobSkill skillData = MobSkillFactory.getMobSkill(skill_1, skill_2);
       if ((skillData != null) && (monster.canUseSkill(skillData))) {
         skillData.applyEffect(c.getPlayer(), monster, true);
       }
     }
 
     slea.readByte();
     slea.readInt();
     slea.readLong();
     int start_x = slea.readShort();
     int start_y = slea.readShort();
     Point startPos = new Point(start_x, start_y);
     res = parseMovement(slea);
     
       if (monster.getController() != c.getPlayer()) {
           if (monster.isAttackedBy(c.getPlayer())) {
               monster.switchController(c.getPlayer(), true);
           } else {
               return;
           }
       } else {
           if ((skill == -1) && (monster.isControllerKnowsAboutAggro()) && (!monster.isMobile())) {
               monster.setControllerHasAggro(false);
               monster.setControllerKnowsAboutAggro(false);
           }
           if (!monster.isFirstAttack()) {
               monster.setControllerHasAggro(true);
               monster.setControllerKnowsAboutAggro(true);
           }
       }
     boolean aggro = monster.isControllerHasAggro();
     if (toUse != null) {
       if (!noPacket) {
         c.getSession().write(MaplePacketCreator.moveMonsterResponse(objectid, moveid, monster.getMp(), aggro, toUse.getSkillId(), toUse.getSkillLevel()));
       }
     }
     else if (!noPacket) {
       c.getSession().write(MaplePacketCreator.moveMonsterResponse(objectid, moveid, monster.getMp(), aggro));
     }
 
     if (aggro) {
       monster.setControllerKnowsAboutAggro(true);
     }
       if (res != null) {
           MaplePacket packet = MaplePacketCreator.moveMonster(skillByte, skill, skill_1, skill_2, skill_3, objectid, startPos, res);
           c.getPlayer().getMap().broadcastMessage(c.getPlayer(), packet, monster.getPosition());
           updatePosition(res, monster, -1);
           c.getPlayer().getMap().moveMonster(monster, monster.getPosition());
           if (!GameConstants.No_Mob(monster.getId()) && (c.getPlayer().getMapId() < 925020000 || c.getPlayer().getMapId() > 925033804) && c.getPlayer().getMapId() != 108000501 && c.getPlayer().getMapId() != 108000502 && c.getPlayer().getMapId() != 108000503 && c.getPlayer().getMapId() != 230000000 && c.getPlayer().getMapId() != 220080001 && !GameConstants.屏蔽吸怪检测地图(c.getPlayer().getMapId())) {
               c.getPlayer().getCheatTracker().checkMoveMonster(monster.getPosition(), player, c);
           } else if (!GameConstants.No_Mob(monster.getId()) && (c.getPlayer().getMapId() < 925020000 || c.getPlayer().getMapId() > 925033804) && c.getPlayer().getMapId() != 108000501 && c.getPlayer().getMapId() != 108000502 && c.getPlayer().getMapId() != 108000503 && c.getPlayer().getMapId() != 230000000 && c.getPlayer().getMapId() != 220080001 && !GameConstants.屏蔽吸怪检测地图(c.getPlayer().getMapId())) {
               c.getPlayer().getCheatTracker().checkMoveMonsterY(monster.getPosition(), player, c);
           }

        }
    //①   初始伤害:   随机数 (0.8~0.85)*怪物攻击力^2/100
     //monster.getMap().getMonsterByOid(objectid).damage(player, 0, false);
     
     /* if ((startPos.x - c.getPlayer().getPosition().x <= 5 && startPos.x - c.getPlayer().getPosition().x >= -5)
                 || (c.getPlayer().getPosition().x - startPos.x <= 5 && c.getPlayer().getPosition().x - startPos.x >= -5)) { //判断人物与怪物坐标*/
     /*
      * 上下 y
      * 左右 x 左小  右大
      */
 
    /* if((c.getPlayer().getPosition().x - startPos.x <= 3 && c.getPlayer().getPosition().x - startPos.x >= -3)){
         if(c.getPlayer().getPosition().x - startPos.x >= -2 &&c.getPlayer().getPosition().x - startPos.x <=2){
             ////System.out.println("||同一位置||不处理||");
         }else{*/
    /* if((c.getPlayer().getMapId() != 40000) && c.getPlayer().getHp() > 0){
           if(c.getPlayer().getBuffedValue(MapleBuffStat.DARKSIGHT) == null){
     if((startPos.x - c.getPlayer().getPosition().x == -1 ||startPos.x - c.getPlayer().getPosition().x == -2 ||startPos.x - c.getPlayer().getPosition().x == -3 ||startPos.x - c.getPlayer().getPosition().x == -4 ||startPos.x - c.getPlayer().getPosition().x == -5||startPos.x - c.getPlayer().getPosition().x == -6||startPos.x - c.getPlayer().getPosition().x == -7||startPos.x - c.getPlayer().getPosition().x == -8||startPos.x - c.getPlayer().getPosition().x == -9||startPos.x - c.getPlayer().getPosition().x == -10||startPos.x - c.getPlayer().getPosition().x == -11||startPos.x - c.getPlayer().getPosition().x == -12||startPos.x - c.getPlayer().getPosition().x == -13||startPos.x - c.getPlayer().getPosition().x == -14||startPos.x - c.getPlayer().getPosition().x == -15||startPos.x - c.getPlayer().getPosition().x == -16||startPos.x - c.getPlayer().getPosition().x == -17||startPos.x - c.getPlayer().getPosition().x == -18||startPos.x - c.getPlayer().getPosition().x == -19||startPos.x - c.getPlayer().getPosition().x == -20)||
        (startPos.x - c.getPlayer().getPosition().x == 1  ||startPos.x - c.getPlayer().getPosition().x == 2||startPos.x - c.getPlayer().getPosition().x == 3||startPos.x - c.getPlayer().getPosition().x == 4||startPos.x - c.getPlayer().getPosition().x == 5||startPos.x - c.getPlayer().getPosition().x == 6||startPos.x - c.getPlayer().getPosition().x == 7||startPos.x - c.getPlayer().getPosition().x == 8||startPos.x - c.getPlayer().getPosition().x == 9||startPos.x - c.getPlayer().getPosition().x == 10||startPos.x - c.getPlayer().getPosition().x == 11||startPos.x - c.getPlayer().getPosition().x == 12||startPos.x - c.getPlayer().getPosition().x == 13||startPos.x - c.getPlayer().getPosition().x == 14||startPos.x - c.getPlayer().getPosition().x == 15||startPos.x - c.getPlayer().getPosition().x == 16||startPos.x - c.getPlayer().getPosition().x == 17||startPos.x - c.getPlayer().getPosition().x == 18||startPos.x - c.getPlayer().getPosition().x == 19||startPos.x - c.getPlayer().getPosition().x == 20)){//左边  右边
         if(startPos.y - c.getPlayer().getPosition().y == 0){
                   // ////System.out.println("X通过。");
               if (c.getPlayer().get怪物伤害() >= 5) {//默认是5
                   //////System.out.println("====================正常【" + c.getPlayer().get怪物伤害() + "】====================");
                   c.getPlayer().gain怪物伤害(-1);
                   if (c.getPlayer().get怪物伤害() >= 30) {
                       c.getPlayer().set怪物伤害(30);
                   }
               } else {
                    c.getPlayer().setHp(0);
            //   }
             //  }
           //    }
           }}
     }
     }
           /* int 怪物坐标x = c.getPlayer().getPosition().x;
            int 人物坐标x = c.getPlayer().getPosition().x;
            int 人物坐标x1 = c.getPlayer().getPosition().x+5;
            int 人物坐标x2 = c.getPlayer().getPosition().x-5;
            if((怪物坐标x - 人物坐标x >= 0 && 怪物坐标x - 人物坐标x <= 2)&&(怪物坐标x - 人物坐标x <= 0 && 怪物坐标x - 人物坐标x >= -2)){
                if(monster != null){
                   ////System.out.println("-----------开始第一段-------------");
           }
            }*/

            /*if((怪物坐标x - 人物坐标x <= 5 && 怪物坐标x - 人物坐标x2 >= 5)){ //     -148 >= -277&& -148 >= -267
               if(monster != null){
                   ////System.out.println("怪物出现在视野内。"+monster+"");
           }}*/
    // }
     }
}