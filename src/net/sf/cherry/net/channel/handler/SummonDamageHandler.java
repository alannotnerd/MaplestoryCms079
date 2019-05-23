package net.sf.cherry.net.channel.handler;

import java.util.ArrayList;
import java.util.List;

import net.sf.cherry.client.ISkill;
import net.sf.cherry.client.MapleCharacter;
import net.sf.cherry.client.MapleClient;
import net.sf.cherry.client.SkillFactory;
import net.sf.cherry.client.anticheat.CheatingOffense;
import net.sf.cherry.client.status.MonsterStatusEffect;
import net.sf.cherry.net.AbstractMaplePacketHandler;
import net.sf.cherry.net.Constants.GameConstants;
import net.sf.cherry.server.MapleStatEffect;
import net.sf.cherry.server.life.MapleMonster;
import net.sf.cherry.server.maps.MapleSummon;
import net.sf.cherry.tools.MaplePacketCreator;
import net.sf.cherry.tools.data.input.SeekableLittleEndianAccessor;

public class SummonDamageHandler extends AbstractMaplePacketHandler {

    @Override
    public void handlePacket(SeekableLittleEndianAccessor slea, MapleClient c) {
        int oid = slea.readInt();
        slea.skip(8);
        slea.readInt();
        slea.skip(8);

        MapleCharacter player = c.getPlayer();
        if (!player.isAlive()) {
            return;
        }
        MapleSummon summon = null;
        for (MapleSummon sum : player.getSummons().values()) {
            if (sum.getObjectId() == oid) {
                summon = sum;
            }
        }
        if (summon == null) {
            return;
        }
        ISkill summonSkill = SkillFactory.getSkill(summon.getSkill());
        MapleStatEffect summonEffect = summonSkill.getEffect(summon.getSkillLevel());
        List<SummonAttackEntry> allDamage = new ArrayList();
        slea.skip(9);
        int numAttacked = slea.readByte();
        player.getCheatTracker().checkSummonAttack(c);
        for (int x = 0; x < numAttacked; x++) {
            int monsterOid = slea.readInt();
            slea.skip(14);
            int damage = slea.readInt();
            if (damage > player.getCurrentMaxBaseDamage() * 6.5 && GameConstants.Summon_Skill_ID_550(summon.getSkill())) {
                player.dropMessage(1, "[召唤兽检测+A]\r\n非法使用外挂或者修改WZ\r\n导致:召唤兽攻击力过高.\r\n召唤兽攻击力无效！");
                return;
            }else if(damage > player.getCurrentMaxBaseDamage() * 5.5 && GameConstants.Summon_Skill_ID_500(summon.getSkill())){
                player.dropMessage(1, "[召唤兽检测+B]\r\n非法使用外挂或者修改WZ\r\n导致:召唤兽攻击力过高.\r\n召唤兽攻击力无效！");
                return;
            }else if(damage > player.getCurrentMaxBaseDamage() * 5 && GameConstants.Summon_Skill_ID_450(summon.getSkill())){
                player.dropMessage(1, "[召唤兽检测+C]\r\n非法使用外挂或者修改WZ\r\n导致:召唤兽攻击力过高.\r\n召唤兽攻击力无效！");
                return;
            }else if(damage > player.getCurrentMaxBaseDamage() * 20 && GameConstants.Summon_Skill_ID_300(summon.getSkill())){
                player.dropMessage(1, "[召唤兽检测+D]\r\n非法使用外挂或者修改WZ\r\n导致:召唤兽攻击力过高.\r\n召唤兽攻击力无效！");
                return;
            }else if(damage > player.getCurrentMaxBaseDamage() * 20 && GameConstants.Summon_Skill_ID_270(summon.getSkill())){
                player.dropMessage(1, "[召唤兽检测+E]\r\n非法使用外挂或者修改WZ\r\n导致:召唤兽攻击力过高.\r\n召唤兽攻击力无效！");
                return;
            }else if(damage > player.getCurrentMaxBaseDamage() * 20 && GameConstants.Summon_Skill_ID_250(summon.getSkill())){
                player.dropMessage(1, "[召唤兽检测+F]\r\n非法使用外挂或者修改WZ\r\n导致:召唤兽攻击力过高.\r\n召唤兽攻击力无效！");
                return;
            }else if(damage > player.getCurrentMaxBaseDamage() * 20 && GameConstants.Summon_Skill_ID_230(summon.getSkill())){
                player.dropMessage(1, "[召唤兽检测+G]\r\n非法使用外挂或者修改WZ\r\n导致:召唤兽攻击力过高.\r\n召唤兽攻击力无效！");
                return;
            }else if(damage > player.getCurrentMaxBaseDamage() * 2.5 && GameConstants.Summon_Skill_ID_200(summon.getSkill())){
                player.dropMessage(1, "[召唤兽检测+H]\r\n非法使用外挂或者修改WZ\r\n导致:召唤兽攻击力过高.\r\n召唤兽攻击力无效！");
                return;
            }else if(damage > player.getCurrentMaxBaseDamage() * 15 && GameConstants.Summon_Skill_ID_150(summon.getSkill())){
                player.dropMessage(1, "[召唤兽检测+I]\r\n非法使用外挂或者修改WZ\r\n导致:召唤兽攻击力过高.\r\n召唤兽攻击力无效！");
                return;
            }else if(damage > player.getCurrentMaxBaseDamage() * 1.5 && GameConstants.Summon_Skill_ID_100(summon.getSkill())){
                player.dropMessage(1, "[召唤兽检测+J]\r\n非法使用外挂或者修改WZ\r\n导致:召唤兽攻击力过高.\r\n召唤兽攻击力无效！");
                return;
            }else if(damage > player.getCurrentMaxBaseDamage() * 6 && GameConstants.Summon_Skill_ID_40(summon.getSkill())){
                player.dropMessage(1, "[召唤兽检测+K]\r\n非法使用外挂或者修改WZ\r\n导致:召唤兽攻击力过高.\r\n召唤兽攻击力无效！");
                return;
            }
            allDamage.add(new SummonAttackEntry(monsterOid, damage));
        }

        if (!player.isAlive()) {
            player.getCheatTracker().registerOffense(CheatingOffense.ATTACKING_WHILE_DEAD);
            return;
        }
        player.getMap().broadcastMessage(player, MaplePacketCreator.summonAttack(player.getId(), summon.getSkill(), 4, allDamage), summon.getPosition());
        for (SummonAttackEntry attackEntry : allDamage) {
            int damage = attackEntry.getDamage();
            MapleMonster target = player.getMap().getMonsterByOid(attackEntry.getMonsterOid());

            if (target != null) {
                if ((damage > 0) && (summonEffect.getMonsterStati().size() > 0) && (summonEffect.makeChanceResult())) {
                    MonsterStatusEffect monsterStatusEffect = new MonsterStatusEffect(summonEffect.getMonsterStati(), summonSkill, false);
                    target.applyStatus(player, monsterStatusEffect, summonEffect.isPoison(), 4000L);
                }

                if (damage < 199999) {
                    player.getMap().damageMonster(player, target, damage);
                    player.checkMonsterAggro(target);
                } else {
                    //c.disconnect();
                    return;
                }
            }
        }
    }

    public class SummonAttackEntry {

        private int monsterOid;
        private int damage;

        public SummonAttackEntry(int paramInt1, int paramInt2) {
            this.monsterOid = paramInt1;
            this.damage = paramInt2;
        }

        public int getMonsterOid() {
            return this.monsterOid;
        }

        public int getDamage() {
            return this.damage;
        }
    }
}