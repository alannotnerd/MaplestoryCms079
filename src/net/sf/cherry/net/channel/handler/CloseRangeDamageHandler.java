package net.sf.cherry.net.channel.handler;

import java.util.List;
import java.util.concurrent.ScheduledFuture;

import net.sf.cherry.client.ISkill;
import net.sf.cherry.client.MapleBuffStat;
import net.sf.cherry.client.MapleCharacter;
import net.sf.cherry.client.MapleClient;
import net.sf.cherry.client.MapleStat;
import net.sf.cherry.client.SkillFactory;
import net.sf.cherry.net.MaplePacket;
import net.sf.cherry.server.MapleStatEffect;
import net.sf.cherry.server.TimerManager;
import net.sf.cherry.server.maps.FakeCharacter;
import net.sf.cherry.tools.MaplePacketCreator;
import net.sf.cherry.tools.Pair;
import net.sf.cherry.tools.data.input.SeekableLittleEndianAccessor;

public class CloseRangeDamageHandler extends AbstractDealDamageHandler {

    private boolean isFinisher(int skillId) {
        return ((skillId >= 1111003) && (skillId <= 1111006)) || ((skillId >= 11111002) && (skillId <= 11111003));
    }

    public void handlePacket(SeekableLittleEndianAccessor slea, MapleClient c) {
        c.doneedlog(this, c.getPlayer());
        if (c.getPlayer().getCherryBan()) {
            c.getPlayer().getCherryBanMessage();
            c.getSession().write(MaplePacketCreator.enableActions());
            return;
        }
        AbstractDealDamageHandler.AttackInfo attack = parseDamage(c.getPlayer(), slea, false);

        MapleCharacter player = c.getPlayer();
        Short x = null;
        Short y = null;
        if (attack.skill != 4211006) {
            x = Short.valueOf(slea.readShort());
            y = Short.valueOf(slea.readShort());
        }
        MaplePacket packet = MaplePacketCreator.closeRangeAttack(player.getId(), attack.skill, attack.stance, attack.numAttackedAndDamage, attack.allDamage, attack.speed, attack.pos, x, y);
        player.getMap().broadcastMessage(player, packet, false, true);

        int numFinisherOrbs = 0;
        Integer comboBuff = player.getBuffedValue(MapleBuffStat.COMBO);
            Integer 隐身 = player.getBuffedValue(MapleBuffStat.DARKSIGHT);
        Integer 夜行者隐身 = player.getBuffedValue(MapleBuffStat.DARKSIGHT);
        ISkill energycharge = SkillFactory.getSkill(5110001);
        int energyChargeSkillLevel = player.getSkillLevel(energycharge);
        ISkill energycharge1 = SkillFactory.getSkill(15100004);
        int energyChargeSkillLevel1 = player.getSkillLevel(energycharge1);
        if(c.getPlayer().getGMLevel() == 0){
        if(隐身 != null){ 
            if (attack.skill != 4221001) {
                player.dropMessage("隐身状态除非使用暗杀技能。其他技能均无效！");
                return;
            }
        }
        if(夜行者隐身 != null){ 
            if (attack.skill != 14100005) {
                player.dropMessage("夜行者隐身状态除非使用驱逐技能。其他技能均无效！");
                return;
            }
        }
        }
        if (isFinisher(attack.skill)) {
            if (comboBuff != null) {
                numFinisherOrbs = comboBuff.intValue() - 1;
            }
            player.handleOrbconsume();
        } else if ((attack.numAttacked > 0)) {
            if (attack.skill != 1111008 && (comboBuff != null)) {
                player.handleOrbgain();
            } /*else if (energyChargeSkillLevel > 0) {
                for (int i = 0; i < attack.numAttacked; i++) {
                    player.海盗能量();
                }
            } else if (energyChargeSkillLevel1 > 0) {
                for (int i = 0; i < attack.numAttacked; i++) {
                    player.骑士团海盗能量();
                }
            }*/
            }

        if ((attack.numAttacked > 0) && (attack.skill == 1311005)) {
                int totDamageToOneMonster = ((Integer) ((List) ((Pair) attack.allDamage.get(0)).getRight()).get(0)).intValue();
            if (player.getHp() > player.getHp() - totDamageToOneMonster * attack.getAttackEffect(player).getX() / 100) {
              //  player.setHp(player.getHp() - totDamageToOneMonster * attack.getAttackEffect(player).getX() / 100);
                player.setHp(player.getHp() - totDamageToOneMonster * attack.getAttackEffect(player).getX() / 100);
                player.updateSingleStat(MapleStat.HP, player.getHp());
            } else {
                player.dropMessage("血量不足无法使用！");
                return;
            }
        }

        if ((attack.numAttacked > 0) && (attack.skill == 1211002)) { //15101006
            boolean advcharge_prob = false;
            int advcharge_level = player.getSkillLevel(SkillFactory.getSkill(1220010));
            if (advcharge_level > 0) {
                MapleStatEffect advcharge_effect = SkillFactory.getSkill(1220010).getEffect(advcharge_level);
                advcharge_prob = advcharge_effect.makeChanceResult();
            } else {
                advcharge_prob = false;
            }
            if (!advcharge_prob) {
                player.cancelEffectFromBuffStat(MapleBuffStat.WK_CHARGE);
            }
        }

        int maxdamage = c.getPlayer().getCurrentMaxBaseDamage();
        int attackCount = 1;
        if (attack.skill != 0) {
            MapleStatEffect effect = attack.getAttackEffect(c.getPlayer());
            if (effect != null) {
                attackCount = effect.getAttackCount();
                maxdamage = (int) (maxdamage * (effect.getDamage() / 100.0D));
                maxdamage *= attackCount;
            }
        }
        maxdamage = Math.min(maxdamage, 199999);
        if (attack.skill == 4211006) { //
            maxdamage = 700000;
        } else if (numFinisherOrbs > 0) {
            maxdamage *= numFinisherOrbs;
        } else if (comboBuff != null) {
            ISkill combo = SkillFactory.getSkill(1111002);
            int comboLevel = player.getSkillLevel(combo);
            if (comboLevel == 0) {
                combo = SkillFactory.getSkill(11111001);
                comboLevel = player.getSkillLevel(combo);
            }
            MapleStatEffect comboEffect = combo.getEffect(comboLevel);
            double comboMod = 1.0D + (comboEffect.getDamage() / 100.0D - 1.0D) * (comboBuff.intValue() - 1);
            maxdamage = (int) (maxdamage * comboMod);
        }
        if ((numFinisherOrbs == 0) && (isFinisher(attack.skill))) {
            return;
        }
        if (isFinisher(attack.skill)) {
            maxdamage = 199999;
        }
        if (attack.skill > 0) {
            ISkill skill = SkillFactory.getSkill(attack.skill);
            int skillLevel = c.getPlayer().getSkillLevel(skill);
            MapleStatEffect effect_ = skill.getEffect(skillLevel);
            if (effect_.getCooldown() > 0) {
                c.getSession().write(MaplePacketCreator.skillCooldown(attack.skill, effect_.getCooldown()));
                ScheduledFuture timer = TimerManager.getInstance().schedule(new MapleCharacter.CancelCooldownAction(c.getPlayer(), attack.skill), effect_.getCooldown() * 1000);
                c.getPlayer().addCooldown(attack.skill, System.currentTimeMillis(), effect_.getCooldown() * 1000, timer);
            }
        }
        applyAttack(attack, player, maxdamage, attackCount, c);
        if (c.getPlayer().hasFakeChar()) {
            for (FakeCharacter ch : c.getPlayer().getFakeChars()) { //鍒嗚韩杩戣窛绂绘敾鍑?
                player.getMap().broadcastMessage(ch.getFakeChar(), MaplePacketCreator.closeRangeAttack(ch.getFakeChar().getId(), attack.skill, attack.stance, attack.numAttackedAndDamage, attack.allDamage, attack.speed, attack.pos, x, y));
                applyAttack(attack, player, maxdamage * 10, attackCount, c);
            }
        }
    }
}