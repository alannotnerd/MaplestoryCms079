package net.sf.cherry.net.channel.handler;

import java.awt.Point;
import java.util.concurrent.ScheduledFuture;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import net.sf.cherry.client.ISkill;
import net.sf.cherry.client.MapleCharacter;
import net.sf.cherry.client.MapleClient;
import net.sf.cherry.client.MapleStat;
import net.sf.cherry.client.SkillFactory;
import net.sf.cherry.client.messages.ServernoticeMapleClientMessageCallback;
import net.sf.cherry.net.AbstractMaplePacketHandler;
import net.sf.cherry.server.MapleStatEffect;
import net.sf.cherry.server.TimerManager;
import net.sf.cherry.server.life.MapleMonster;
import net.sf.cherry.server.maps.FakeCharacter;
import net.sf.cherry.server.maps.FieldLimit;
import net.sf.cherry.tools.MaplePacketCreator;
import net.sf.cherry.tools.data.input.SeekableLittleEndianAccessor;

public class SpecialMoveHandler extends AbstractMaplePacketHandler {

    private static Logger log = LoggerFactory.getLogger(SpecialMoveHandler.class);

    public void handlePacket(SeekableLittleEndianAccessor slea, MapleClient c) {
        MapleCharacter chr = c.getPlayer();
        slea.readShort();
        slea.readShort();
        // chr.getAutobanManager().setTimestamp(4, slea.readInt());
        int skillid = slea.readInt();
        if (((skillid == 4001003) || (skillid == 4221006) || (skillid == 5101007)) && (!c.getPlayer().isGM()) && (c.getPlayer().getMap().cannotInvincible())) {
            c.getSession().write(MaplePacketCreator.enableActions());
            return;
        }
        Point pos = null;
        int __skillLevel = slea.readByte();
        ISkill skill = SkillFactory.getSkill(skillid);
        int skillLevel = chr.getSkillLevel(skill);
        //int skillLevel = c.getPlayer().getSkillLevel(skill);
        MapleStatEffect effect = skill.getEffect(skillLevel);
        c.getPlayer().resetAfkTimer();
        int beforeMp = c.getPlayer().getMp();
        if ((skillid % 10000000 == 1010) || (skillid % 10000000 == 1011)) {
            skillLevel = 1;
            c.getPlayer().setDojoEnergy(0);
            c.getSession().write(MaplePacketCreator.getEnergy(0));
        }

        if ((skillLevel == 0) || (skillLevel != __skillLevel)) {
            //c.disconnect();
            return;
        }

        if (effect.getCooldown() > 0) {
            if (c.getPlayer().skillisCooling(skillid)) {
                return;
            } else if (skillid != 5221006) {
                c.getSession().write(MaplePacketCreator.skillCooldown(skillid, effect.getCooldown()));
                ScheduledFuture timer = TimerManager.getInstance().schedule(new MapleCharacter.CancelCooldownAction(c.getPlayer(), skillid), effect.getCooldown() * 1000);
                c.getPlayer().addCooldown(skillid, System.currentTimeMillis(), effect.getCooldown() * 1000, timer);
            }
        }

        //   try
        //   {
        if (skillid == 1121001 || skillid == 1221001 || skillid == 1321001) {
            int num = slea.readInt();

            for (int i = 0; i < num; i++) {
                int mobId = slea.readInt();
                byte success = slea.readByte();
                c.getPlayer().getMap().broadcastMessage(c.getPlayer(), MaplePacketCreator.showMagnet(mobId, success), false);
                MapleMonster monster = c.getPlayer().getMap().getMonsterByOid(mobId);
                if (monster != null) {
                    monster.switchController(c.getPlayer(), monster.isControllerHasAggro());
                }
            }
            byte direction = slea.readByte();
            c.getPlayer().getMap().broadcastMessage(c.getPlayer(), MaplePacketCreator.showBuffeffect(c.getPlayer().getId(), skillid, 1, direction), false);
            for (FakeCharacter ch : c.getPlayer().getFakeChars()) {
                ch.getFakeChar().getMap().broadcastMessage(ch.getFakeChar(), MaplePacketCreator.showBuffeffect(ch.getFakeChar().getId(), skillid, 1, direction), false);
            }
            c.getSession().write(MaplePacketCreator.enableActions());
        } else if (skillid == 5101005) {//生命分流
            ISkill s = SkillFactory.getSkill(skillid);
            MapleStatEffect ef = s.getEffect(chr.getSkillLevel(s));
            int lose = chr.getMaxHp() / ef.getX();
            chr.setHp(chr.getHp() - lose);
            chr.updateSingleStat(MapleStat.HP, chr.getHp());
            int gain = lose * (ef.getY() / 100);
            chr.setMp(chr.getMp() + gain);
            chr.updateSingleStat(MapleStat.MP, chr.getMp());
        } else if (skillid % 20000000 == 1004) {
            slea.readShort();
        }
        if (slea.available() == 5L || skill.getId() == 2311002) {
            pos = new Point(slea.readShort(), slea.readShort());
            //log.info("新位置,X-Y");
        }
        if (c.getPlayer().isAlive()) {
//       if ((skillid == 9001004) && (c.getPlayer().isGM())) {
//         c.getPlayer().setHidden(!c.getPlayer().isHidden());
//       }
            if (effect.isMagicDoor()) { // Mystic Door
                if (!FieldLimit.DOOR.check(chr.getMap().getFieldLimit())) {
                    effect.applyTo(c.getPlayer(), pos);
                    // ////System.out.println("输出这句");
                } else {
                    c.getSession().write(MaplePacketCreator.enableActions());
                }
            }
            if ((skill.getId() != 2311002) || (chr.canDoor())) { //时空门
                //effect.applyTo(chr, pos); //给buff
                skill.getEffect(skillLevel).applyTo(c.getPlayer(), pos);
                //skill.getEffect(skillLevel).applyTo(c.getPlayer(), pos);
                /*if ((skill.getId() != 2301003) && (effect != null) && (effect.getMpCon() != 0) && (c.getPlayer().getMp() - beforeMp < skill.getEffect(skillLevel).getMpCon())) {
                 int remainingMp = beforeMp - skill.getEffect(skillLevel).getMpCon();
                 //System.out.println("remainingMp为：【" + remainingMp + "】&& beforeMp:【" + beforeMp + "】");
                 c.getPlayer().setMp(remainingMp);
                 c.getPlayer().updateSingleStat(MapleStat.MP, remainingMp); //单属性更新
                 }*/
                //校验技能消耗MP复位
                if ((c.getPlayer().getJob().getId() >= 200 && c.getPlayer().getJob().getId() < 300)) {
                    //    && (effect != null) && (effect.getMpCon() != 0)&& (c.getPlayer().getMp() - beforeMp < skill.getEffect(skillLevel).getMpCon())) {
                    //当前职业是魔法师所有职业 && 技能消耗不等于0 && 当前MP - 当前MP 小于 技能消耗
                    int SKILLMP = skill.getEffect(skillLevel).getMpCon();
                    int 更新MP = beforeMp - SKILLMP;
                   /* System.out.println("BeforeMP = 【" + beforeMp + "】");//当前MP
                    System.out.println("技能消耗MP = 【" + SKILLMP + "】");//技能消耗
                    System.out.println("综合MP为 = 【" + 更新MP + "】"); //综合消耗*/
                    //System.out.println("remainingMp为：【" + remainingMp + "】&& beforeMp:【" + beforeMp + "】");
                    c.getPlayer().setMp(更新MP);
                    c.getPlayer().updateSingleStat(MapleStat.MP, 更新MP); //单属性更新"
                }
            } else if (!chr.canDoor()) {
                new ServernoticeMapleClientMessageCallback(5, c).dropMessage("请等候5秒再使用时空门!");
                c.getSession().write(MaplePacketCreator.enableActions());
            }
        } else {
            c.getSession().write(MaplePacketCreator.enableActions());
        }

        // c.getSession().write(MaplePacketCreator.enableActions());
    }
}
