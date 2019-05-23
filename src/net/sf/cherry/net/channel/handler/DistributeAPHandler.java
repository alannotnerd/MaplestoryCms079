 package net.sf.cherry.net.channel.handler;
 
 import java.util.ArrayList;
import java.util.List;

import net.sf.cherry.client.ISkill;
import net.sf.cherry.client.MapleClient;
import net.sf.cherry.client.MapleJob;
import net.sf.cherry.client.MapleStat;
import net.sf.cherry.client.SkillFactory;
import net.sf.cherry.net.AbstractMaplePacketHandler;
import net.sf.cherry.tools.MaplePacketCreator;
import net.sf.cherry.tools.Pair;
import net.sf.cherry.tools.data.input.SeekableLittleEndianAccessor;
 
 public class DistributeAPHandler extends AbstractMaplePacketHandler
 {
   public void handlePacket(SeekableLittleEndianAccessor slea, MapleClient c)
   {
     c.doneedlog(this, c.getPlayer());
     List statupdate = new ArrayList(2);
     c.getSession().write(MaplePacketCreator.updatePlayerStats(statupdate, true));
     int actionId = slea.readInt();
     if (actionId <= c.getLastActionId()) {
       c.getSession().write(MaplePacketCreator.enableActions());
       return;
     }
     c.setLastActionId(actionId);
     int update = slea.readInt();
     if (c.getPlayer().getRemainingAp() > 0) {
       switch (update) {
       case 256:
         if (c.getPlayer().getStr() >= 999) {
           return;
         }
         c.getPlayer().setStr(c.getPlayer().getStr() + 1);
         statupdate.add(new Pair(MapleStat.STR, Integer.valueOf(c.getPlayer().getStr())));
         break;
       case 512:
         if (c.getPlayer().getDex() >= 999) {
           return;
         }
         c.getPlayer().setDex(c.getPlayer().getDex() + 1);
         statupdate.add(new Pair(MapleStat.DEX, Integer.valueOf(c.getPlayer().getDex())));
         break;
       case 1024:
         if (c.getPlayer().getInt() >= 999) {
           return;
         }
         c.getPlayer().setInt(c.getPlayer().getInt() + 1);
         statupdate.add(new Pair(MapleStat.INT, Integer.valueOf(c.getPlayer().getInt())));
         break;
       case 2048:
         if (c.getPlayer().getLuk() >= 999) {
           return;
         }
         c.getPlayer().setLuk(c.getPlayer().getLuk() + 1);
         statupdate.add(new Pair(MapleStat.LUK, Integer.valueOf(c.getPlayer().getLuk())));
         break;
       case 8192:
         int MaxHP = c.getPlayer().getMaxHp();
         if ((c.getPlayer().getHpApUsed() == 10000) || (MaxHP == 30000)) {
           return;
         }
         ISkill improvingMaxHP = null;
         int improvingMaxHPLevel = 0;
         if (c.getPlayer().getJob().isA(MapleJob.BEGINNER)) {
           MaxHP += rand(8, 12);
         } else if (c.getPlayer().getJob().isA(MapleJob.WARRIOR)) {
           improvingMaxHP = SkillFactory.getSkill(1000001);
           improvingMaxHPLevel = c.getPlayer().getSkillLevel(improvingMaxHP);
           if (improvingMaxHPLevel >= 1)
             MaxHP += rand(20, 24) + improvingMaxHP.getEffect(improvingMaxHPLevel).getY();
           else
             MaxHP += rand(20, 24);
         }
         else if (c.getPlayer().getJob().isA(MapleJob.MAGICIAN)) {
           MaxHP += rand(6, 10);
         } else if (c.getPlayer().getJob().isA(MapleJob.BOWMAN)) {
           MaxHP += rand(16, 20);
         } else if (c.getPlayer().getJob().isA(MapleJob.THIEF)) {
           MaxHP += rand(20, 24);
         } else if (c.getPlayer().getJob().isA(MapleJob.PIRATE)) {
           improvingMaxHP = SkillFactory.getSkill(5100000);
           improvingMaxHPLevel = c.getPlayer().getSkillLevel(improvingMaxHP);
           if (improvingMaxHPLevel >= 1)
             MaxHP += rand(16, 20) + improvingMaxHP.getEffect(improvingMaxHPLevel).getY();
           else {
             MaxHP += rand(16, 20);
           }
         }
        else if (c.getPlayer().getJob().isA(MapleJob.THIEF_KNIGHT_2)) {
           improvingMaxHP = SkillFactory.getSkill(15100000);
           improvingMaxHPLevel = c.getPlayer().getSkillLevel(improvingMaxHP);
           if (improvingMaxHPLevel >= 1)
             MaxHP += rand(16, 20) + improvingMaxHP.getEffect(improvingMaxHPLevel).getY();
           else {
             MaxHP += rand(16, 20);
           }
         }
         MaxHP = Math.min(30000, MaxHP);
         int HPSkillAdd = 0;
         c.getPlayer().setMaxHP(c.getPlayer().getMaxHp() + 1 + HPSkillAdd);
         statupdate.add(new Pair(MapleStat.MAXHP, Integer.valueOf(c.getPlayer().getMaxHp())));
         break;
       case 32768:
         int MaxMP = c.getPlayer().getMaxMp();
         if ((c.getPlayer().getMpApUsed() == 10000) || (c.getPlayer().getMaxMp() == 30000)) {
           return;
         }
         if (c.getPlayer().getJob().isA(MapleJob.BEGINNER)) {
           MaxMP += rand(6, 8);
         } else if (c.getPlayer().getJob().isA(MapleJob.WARRIOR)) {
           MaxMP += rand(2, 4);
         } else if (c.getPlayer().getJob().isA(MapleJob.MAGICIAN)) {
           ISkill improvingMaxMP = SkillFactory.getSkill(2000001);
           int improvingMaxMPLevel = c.getPlayer().getSkillLevel(improvingMaxMP);
           if (improvingMaxMPLevel >= 1)
             MaxMP += rand(18, 20) + improvingMaxMP.getEffect(improvingMaxMPLevel).getY();
           else
             MaxMP += rand(18, 20);
         }
         else if (c.getPlayer().getJob().isA(MapleJob.BOWMAN)) {
           MaxMP += rand(10, 12);
         } else if (c.getPlayer().getJob().isA(MapleJob.THIEF)) {
           MaxMP += rand(10, 12);
         } else if (c.getPlayer().getJob().isA(MapleJob.PIRATE)) {
           MaxMP += rand(10, 12);
         }
         MaxMP = Math.min(30000, MaxMP);
         int MPSkillAdd = 0;
         c.getPlayer().setMaxMP(c.getPlayer().getMaxMp() + 1 + MPSkillAdd);
         statupdate.add(new Pair(MapleStat.MAXMP, Integer.valueOf(c.getPlayer().getMaxMp())));
         break;
       default:
         c.getSession().write(MaplePacketCreator.updatePlayerStats(MaplePacketCreator.EMPTY_STATUPDATE, true));
         return;
       }
       c.getPlayer().setRemainingAp(c.getPlayer().getRemainingAp() - 1);
       statupdate.add(new Pair(MapleStat.AVAILABLEAP, Integer.valueOf(c.getPlayer().getRemainingAp())));
       c.getSession().write(MaplePacketCreator.updatePlayerStats(statupdate, true));
     }
   }
 
   private static int rand(int lbound, int ubound) {
     return (int)(Math.random() * (ubound - lbound + 1) + lbound);
   }
 }

/* Location:           E:\maoxiandaodanji\dist\cherry.jar
 * Qualified Name:     net.sf.cherry.net.channel.handler.DistributeAPHandler
 * JD-Core Version:    0.6.0
 */