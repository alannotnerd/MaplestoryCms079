/*
 * 魔法攻击处理
 */
package net.sf.cherry.net.channel.handler;

import java.util.concurrent.ScheduledFuture;

import net.sf.cherry.client.ISkill;
import net.sf.cherry.client.MapleBuffStat;
import net.sf.cherry.client.MapleCharacter;
import net.sf.cherry.client.MapleClient;
import net.sf.cherry.client.MapleStat;
import net.sf.cherry.client.SkillFactory;
import net.sf.cherry.client.anticheat.CheatingOffense;
import net.sf.cherry.net.MaplePacket;
import net.sf.cherry.server.MapleStatEffect;
import net.sf.cherry.server.TimerManager;
import net.sf.cherry.server.maps.FakeCharacter;
import net.sf.cherry.tools.MaplePacketCreator;
import net.sf.cherry.tools.Pair;
import net.sf.cherry.tools.data.input.SeekableLittleEndianAccessor;

public class MagicDamageHandler extends AbstractDealDamageHandler {

    public void handlePacket(SeekableLittleEndianAccessor slea, MapleClient c) {
        c.doneedlog(this, c.getPlayer());
        if (c.getPlayer().getCherryBan()) {
            c.getPlayer().getCherryBanMessage();
            c.getSession().write(MaplePacketCreator.enableActions());
            return;
        }
        AbstractDealDamageHandler.AttackInfo attack = parseDamage(c.getPlayer(), slea, false);
        MapleCharacter player = c.getPlayer();
        Integer 隐身 = player.getBuffedValue(MapleBuffStat.DARKSIGHT);
        Integer 夜行者隐身 = player.getBuffedValue(MapleBuffStat.DARKSIGHT);
        int beforeMp = player.getMp();
        Short x = Short.valueOf(slea.readShort());
        Short y = Short.valueOf(slea.readShort());
        if (隐身 != null) {
            if (attack.skill != 4221001) {
                player.dropMessage("隐身状态除非使用暗杀技能。其他技能均无效！");
                return;
            }
        }
        if (夜行者隐身 != null) {
            if (attack.skill != 14100005) {
                player.dropMessage("夜行者隐身状态除非使用驱逐技能。其他技能均无效！");
                return;
            }
        }

        MaplePacket packet = MaplePacketCreator.magicAttack(player.getId(), attack.skill, attack.stance, attack.numAttackedAndDamage, attack.allDamage, x, y, attack.speed, attack.pos);
        if ((attack.skill == 2121001) || (attack.skill == 2221001) || (attack.skill == 2321001)) {
            packet = MaplePacketCreator.magicAttack(player.getId(), attack.skill, attack.stance, attack.numAttackedAndDamage, attack.allDamage, x, y, attack.speed, attack.pos);
        }
        player.getMap().broadcastMessage(player, packet, false, true);
        MapleStatEffect effect = attack.getAttackEffect(player);

        int maxdamage = 99999;
        ISkill skill = SkillFactory.getSkill(attack.skill);
        int skillLevel = player.getSkillLevel(skill);
        MapleStatEffect effect_ = skill.getEffect(skillLevel);
        if (effect_.getCooldown() > 0) {
            if (player.skillisCooling(attack.skill)) {
                player.getCheatTracker().registerOffense(CheatingOffense.COOLDOWN_HACK);
                return;
            }
            c.getSession().write(MaplePacketCreator.skillCooldown(attack.skill, effect_.getCooldown()));
            ScheduledFuture timer = TimerManager.getInstance().schedule(new MapleCharacter.CancelCooldownAction(player, attack.skill), effect_.getCooldown() * 1000);
            player.addCooldown(attack.skill, System.currentTimeMillis(), effect_.getCooldown() * 1000, timer);
        }

        //applyAttack(attack, player, maxdamage, effect.getAttackCount());
        applyAttack(attack, player, maxdamage, effect.getAttackCount(), c);
        //当前MP - 在MP < 效果.MP反对 
        if ((player.getMp() - beforeMp < effect.getMpCon()) && (c.getPlayer().getBuffedValue(MapleBuffStat.INFINITY) == null)) { //魔法攻击MP消耗处理类
            int remainingMp = beforeMp - effect.getMpCon();
            c.getPlayer().setMp(remainingMp);
            c.getPlayer().updateSingleStat(MapleStat.MP, remainingMp);
        }
        /*冰雷 消耗类处理*/
        if (c.getPlayer().getJob().getId() >= 220 && c.getPlayer().getJob().getId() <= 222) {
            int remainingMp = beforeMp - effect.getMpCon();
            c.getPlayer().setMp(remainingMp);
            c.getPlayer().updateSingleStat(MapleStat.MP, remainingMp);
        }
       // System.out.println("条件之外输出");
        for (int i = 1; i <= 3; i++) {
            ISkill eaterSkill = SkillFactory.getSkill(2000000 + i * 100000);
            int eaterLevel = player.getSkillLevel(eaterSkill);
            if (eaterLevel > 0) {
                for (Pair singleDamage : attack.allDamage) {
                    eaterSkill.getEffect(eaterLevel).applyPassive(player, player.getMap().getMapObject(((Integer) singleDamage.getLeft()).intValue()), 0);
                }
                break;
            }
        }

        if (c.getPlayer().hasFakeChar()) {
            for (FakeCharacter ch : c.getPlayer().getFakeChars()) { //分身魔法攻击
                player.getMap().broadcastMessage(ch.getFakeChar(), MaplePacketCreator.magicAttack(ch.getFakeChar().getId(), attack.skill, attack.stance, attack.numAttackedAndDamage, attack.allDamage, x, y, attack.speed, attack.pos));
                //applyAttack(attack, ch.getFakeChar(), maxdamage, attackCount);
                applyAttack(attack, player, maxdamage, effect.getAttackCount(), c);
            }
        }
    }
}

/* Location:           E:\maoxiandaodanji\dist\cherry.jar
 * Qualified Name:     net.sf.cherry.net.channel.handler.MagicDamageHandler
 * JD-Core Version:    0.6.0
 */