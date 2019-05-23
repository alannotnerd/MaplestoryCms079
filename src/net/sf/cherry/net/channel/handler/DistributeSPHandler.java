 package net.sf.cherry.net.channel.handler;
 
 import net.sf.cherry.client.ISkill;
import net.sf.cherry.client.MapleCharacter;
import net.sf.cherry.client.MapleClient;
import net.sf.cherry.client.MapleQuestStatus;
import net.sf.cherry.client.MapleStat;
import net.sf.cherry.client.SkillFactory;
import net.sf.cherry.net.AbstractMaplePacketHandler;
import net.sf.cherry.server.quest.MapleQuest;
import net.sf.cherry.tools.MaplePacketCreator;
import net.sf.cherry.tools.data.input.SeekableLittleEndianAccessor;
 
 public class DistributeSPHandler extends AbstractMaplePacketHandler
 {
   public void handlePacket(SeekableLittleEndianAccessor slea, MapleClient c)
   {
     c.doneedlog(this, c.getPlayer());
     int actionId = slea.readInt();
     if (actionId <= c.getLastActionId()) {
       c.getSession().write(MaplePacketCreator.enableActions());
       return;
     }
     c.setLastActionId(actionId);
     int skillid = slea.readInt();
     boolean isBegginnerSkill = false;
 
     MapleCharacter player = c.getPlayer();
     int remainingSp = player.getRemainingSp();
     if ((skillid == 1000) || (skillid == 1001) || (skillid == 1002)) {
       int snailsLevel = player.getSkillLevel(SkillFactory.getSkill(1000));
       int recoveryLevel = player.getSkillLevel(SkillFactory.getSkill(1001));
       int nimbleFeetLevel = player.getSkillLevel(SkillFactory.getSkill(1002));
       remainingSp = Math.min(player.getLevel() - 1, 6) - snailsLevel - recoveryLevel - nimbleFeetLevel;
       isBegginnerSkill = true;
     }
     if ((skillid == 1005) || (skillid == 1006) || (skillid == 1003) || (skillid == 1004) || (skillid == 10001004) || (skillid == 20001004)) {
       return;
     }
     if (((skillid == 1121011) || (skillid == 1221012) || (skillid == 1321010) || (skillid == 2121008) || (skillid == 2221008) || (skillid == 2321009) || (skillid == 3121009) || (skillid == 3221008) || (skillid == 4121009) || (skillid == 4221008)) && (!player.getQuest(MapleQuest.getInstance(6304)).getStatus().equals(MapleQuestStatus.Status.COMPLETED))) {
       return;
     }
     ISkill skill = SkillFactory.getSkill(skillid);
     int maxlevel = skill.isFourthJob() ? player.getMasterLevel(skill) : skill.getMaxLevel();
     int curLevel = player.getSkillLevel(skill);
     if ((remainingSp > 0) && (curLevel + 1 <= maxlevel) && (skill.canBeLearnedBy(player.getJob()))) {
       if (!isBegginnerSkill) {
         player.setRemainingSp(player.getRemainingSp() - 1);
       }
       player.updateSingleStat(MapleStat.AVAILABLESP, player.getRemainingSp());
       player.changeSkillLevel(skill, curLevel + 1, player.getMasterLevel(skill)); } else {
       if (!skill.canBeLearnedBy(player.getJob()))
         return;
       if (((remainingSp <= 0) || (curLevel + 1 > maxlevel)) && (!player.isGM()))
         return;
     }
   }
 }

/* Location:           E:\maoxiandaodanji\dist\cherry.jar
 * Qualified Name:     net.sf.cherry.net.channel.handler.DistributeSPHandler
 * JD-Core Version:    0.6.0
 */