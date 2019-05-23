 package net.sf.cherry.net.channel.handler;
 
 import net.sf.cherry.client.MapleClient;
import net.sf.cherry.client.SkillFactory;
import net.sf.cherry.client.anticheat.CheatingOffense;
import net.sf.cherry.net.AbstractMaplePacketHandler;
import net.sf.cherry.tools.data.input.SeekableLittleEndianAccessor;
 
 public class HealOvertimeHandler extends AbstractMaplePacketHandler
 {
   public void handlePacket(SeekableLittleEndianAccessor slea, MapleClient c)
   {
     slea.readByte();
     slea.readShort();
     slea.readByte();
     int healHP = slea.readShort();
     int healMP = slea.readShort();
     if (!c.getPlayer().isAlive()) {
       return;
     }
     if (healHP != 0) {
       if (healHP > 140) {
         c.getPlayer().getCheatTracker().registerOffense(CheatingOffense.REGEN_HIGH_HP, String.valueOf(healHP));
         return;
       }
       c.getPlayer().getCheatTracker().checkHPRegen();
       if (c.getPlayer().getCurrentMaxHp() == c.getPlayer().getHp()) {
         c.getPlayer().getCheatTracker().resetHPRegen();
       }
       c.getPlayer().addHP(healHP);
       c.getPlayer().checkBerserk();
     }
     if (healMP != 0) {
       if (healMP > 1000)
       {
         return;
       }
       float theoreticalRecovery = 0.0F;
       theoreticalRecovery = (float)(theoreticalRecovery + Math.floor(c.getPlayer().getSkillLevel(SkillFactory.getSkill(2000000)) / 10.0F * c.getPlayer().getLevel() + 3.0F));
       if ((healMP > theoreticalRecovery) && 
         (healMP > 300)) {
         c.getPlayer().getCheatTracker().registerOffense(CheatingOffense.REGEN_HIGH_MP, String.valueOf(healMP));
       }
 
       c.getPlayer().getCheatTracker().checkMPRegen();
       c.getPlayer().addMP(healMP);
       if (c.getPlayer().getCurrentMaxMp() == c.getPlayer().getMp())
         c.getPlayer().getCheatTracker().resetMPRegen();
     }
   }
 }
