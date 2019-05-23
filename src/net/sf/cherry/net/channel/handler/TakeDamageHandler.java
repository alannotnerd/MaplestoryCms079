package net.sf.cherry.net.channel.handler;

import java.util.Collections;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import net.sf.cherry.client.ISkill;
import net.sf.cherry.client.MapleBuffStat;
import net.sf.cherry.client.MapleCharacter;
import net.sf.cherry.client.MapleClient;
import net.sf.cherry.client.MapleInventoryType;
import net.sf.cherry.client.SkillFactory;
import net.sf.cherry.client.anticheat.CheatingOffense;
import net.sf.cherry.client.status.MonsterStatus;
import net.sf.cherry.client.status.MonsterStatusEffect;
import net.sf.cherry.net.AbstractMaplePacketHandler;
import net.sf.cherry.server.life.MapleMonster;
import net.sf.cherry.server.life.MobAttackInfo;
import net.sf.cherry.server.life.MobAttackInfoFactory;
import net.sf.cherry.server.life.MobSkill;
import net.sf.cherry.server.life.MobSkillFactory;
import net.sf.cherry.server.maps.MapleMapObjectType;
import net.sf.cherry.tools.MaplePacketCreator;
import net.sf.cherry.tools.data.input.SeekableLittleEndianAccessor;

public class TakeDamageHandler extends AbstractMaplePacketHandler {

    private static Logger log = LoggerFactory.getLogger(TakeDamageHandler.class);

    public void handlePacket(SeekableLittleEndianAccessor slea, MapleClient c) {
        c.doneedlog(this, c.getPlayer());
        MapleCharacter player = c.getPlayer();
        slea.readInt();
        int damagefrom = slea.readByte();
        slea.readByte();
        int damage = slea.readInt();
        int oid = 0;
        int monsteridfrom = 0;
        int pgmr = 0;
        int direction = 0;
        int pos_x = 0;
        int pos_y = 0;
        int fake = 0;
        boolean is_pgmr = false;
        boolean is_pg = true;
        int mpattack = 0;
        MapleMonster attacker = null;
         /*player.setCurrenttime(System.currentTimeMillis());//开始计时
         if(c.getPlayer().get闪烁时间() ==0){
             player.set闪烁时间(1);//检测
         }*/
            /* if (player.getCurrenttime() - player.getLasttime() < player.get开始闪烁()) {//闪烁中
                 player.set闪烁时间(1);
                 ////System.out.println("开始闪烁了！！");
             }else{
                 player.set闪烁时间(0);//大于闪烁时间
                 //player.set怪物伤害(0);//检测
                 ////System.out.println("闪烁完毕了！！");
             }*/
       /* if (player.get怪物伤害() == 1) {
            player.set怪物伤害(0);//检测
             ////System.out.println("怪物伤害没有了！！");
        }*/
            /*  player.setCurrenttime(System.currentTimeMillis());//开始计时
             if (player.getCurrenttime() - player.getLasttime() < player.get开始闪烁()) {//闪烁中
                 player.set怪物伤害(0);
                 ////System.out.println("怪物伤害0！！");
             }else{
                 player.set闪烁时间(0);//大于闪烁时间
                 player.set怪物伤害(1);
                 ////System.out.println("怪物伤害1！！");
             }*/
            //  player.set怪物伤害(0);
            //////System.out.println("表为：" + player.get怪物伤害() + "");
           // ////System.out.println("伤害为"+damage);
        if (damagefrom != -2) {
            monsteridfrom = slea.readInt();
            oid = slea.readInt();
            if ((c.getPlayer().getMap().getMapObject(oid) == null) || (!c.getPlayer().getMap().getMapObject(oid).getType().equals(MapleMapObjectType.MONSTER))) {
                c.getSession().write(MaplePacketCreator.enableActions());
                return;
            }
            attacker = (MapleMonster) player.getMap().getMapObject(oid);
            direction = slea.readByte();
        }
        try {
            if ((damagefrom != -1) && (damagefrom != -2) && (attacker != null)) {
                MobAttackInfo attackInfo = MobAttackInfoFactory.getMobAttackInfo(attacker, damagefrom);
                if (damage != -1) {
                    if (attackInfo.isDeadlyAttack()) {
                        mpattack = player.getMp() - 1;
                    } else {
                        mpattack += attackInfo.getMpBurn();
                    }
                }

                MobSkill skill = MobSkillFactory.getMobSkill(attackInfo.getDiseaseSkill(), attackInfo.getDiseaseLevel());
                if ((skill != null) && (damage > 0) && (attacker != null)) {
                    skill.applyEffect(player, attacker, false);
                }
                if (attacker != null) {
                    attacker.setMp(attacker.getMp() - attackInfo.getMpCon());
                }
            }
        } catch (NullPointerException npe) {
        }
        if (damage == -1) {
            int job = player.getJob().getId() / 10 - 40;
            fake = 4020002 + job * 100000;
            if (damagefrom == -1 && damagefrom != -2 && player.getInventory(MapleInventoryType.EQUIPPED).getItem((byte) -10) != null) {
                int[] guardianSkillId = {1120005, 1220006};
                for (int guardian : guardianSkillId) {
                    ISkill guardianSkill = SkillFactory.getSkill(guardian);
                    if ((player.getSkillLevel(guardianSkill) > 0) && (attacker != null)) {
                        MonsterStatusEffect monsterStatusEffect = new MonsterStatusEffect(Collections.singletonMap(MonsterStatus.STUN, Integer.valueOf(1)), guardianSkill, false);
                        attacker.applyStatus(player, monsterStatusEffect, false, 2000L);
                    }
                }
            }
        }

        if (((damage < -1) || (damage > 60000)) && (!player.isGM())) { //伤害异常
            log.warn(player.getName() + " 接收到异常的怪物攻击数值 " + monsteridfrom + ": " + damage);
            //c.disconnect();
            return;
        }

       player.getCheatTracker().checkTakeDamage(c);

        if (damage >= 0) { //正常获取伤害
            
           //////System.out.println("收到伤害为 "+damage+" .");
            player.getCheatTracker().setAttacksWithoutHit(0);//攻击没有命中
            player.getCheatTracker().resetHPRegen();//复位HP再生
            player.getCheatTracker().resetMPRegen();//复位MP再生
            player.resetAfkTimer();//开始复位受损
        }
        if (damage == 1) {
            player.getCheatTracker().registerOffense(CheatingOffense.ALWAYS_ONE_HIT);
        }

        if ((!player.isHidden()) && (player.isAlive()) && (!player.hasGodmode())) {
            if ((player.getBuffedValue(MapleBuffStat.MORPH) != null) && (damage > 0)) {
                player.cancelMorphs();
            }
            if (player.hasBattleShip()) {
                player.handleBattleShipHpLoss(damage);
                player.getMap().broadcastMessage(player, MaplePacketCreator.damagePlayer(damagefrom, monsteridfrom, player.getId(), damage, fake, direction, is_pgmr, pgmr, is_pg, oid, pos_x, pos_y), false);
                player.checkBerserk();
            }
            if (damagefrom == -1) {
                Integer pguard = player.getBuffedValue(MapleBuffStat.POWERGUARD);//伤害反击
                if (pguard != null) {
                    attacker = (MapleMonster) player.getMap().getMapObject(oid);
                    if (attacker != null) {//攻击者
                        int bouncedamage = (int) (damage * (pguard.doubleValue() / 100.0D));
                        bouncedamage = Math.min(bouncedamage, attacker.getMaxHp() / 10);
                        player.getMap().damageMonster(player, attacker, bouncedamage);
                        damage -= bouncedamage;
                        player.getMap().broadcastMessage(player, MaplePacketCreator.damageMonster(oid, bouncedamage), false, true);
                        player.checkMonsterAggro(attacker);
                        c.getPlayer().setHp(c.getPlayer().getHp() - damage / 2);
                    }
                }
            }
                if ((player.getBuffedValue(MapleBuffStat.抗压) != null) && (damage > 0)) { //抗压的wz为 x = 5<怪物变弱几率>  damage为伤害正常值
                    attacker = (MapleMonster) player.getMap().getMapObject(oid);
                    if (attacker != null) { //攻击者
                        ISkill 抗压 = SkillFactory.getSkill(21101003); //抗压
                        int 抗压伤害 = (int) ((抗压.getEffect(player.getSkillLevel(21101003)).getDamage() / 100.0) * damage);
                        player.getMap().damageMonster(player, attacker, 抗压伤害);
                        damage -= 抗压伤害; //damage = 伤害 - 抗压伤害
                        player.getMap().broadcastMessage(player, MaplePacketCreator.damageMonster(oid, 抗压伤害), false, true);
                        player.checkMonsterAggro(attacker);
                        c.getPlayer().setHp(c.getPlayer().getHp()-damage);
                    }
                }
               Integer 能量 = player.getBuffedValue(MapleBuffStat.能量);
                  if ((player.getBuffedValue(MapleBuffStat.能量) != null) && (damage > 0)) {
                    attacker = (MapleMonster) player.getMap().getMapObject(oid);
                    if (attacker != null) {//攻击者
                        int bouncedamage = (int) (damage * (能量.doubleValue() / 100.0D));
                        bouncedamage = Math.min(bouncedamage, attacker.getMaxHp() / 10);
                        player.getMap().damageMonster(player, attacker, bouncedamage);
                        damage -= bouncedamage;
                        player.getMap().broadcastMessage(player, MaplePacketCreator.damageMonster(oid, bouncedamage), false, true);
                        player.checkMonsterAggro(attacker);
                         c.getPlayer().setHp(c.getPlayer().getHp()-damage);
                    }
                }
            if ((player.getBuffedValue(MapleBuffStat.战神之盾) != null) && (damage > 0)) { //判断是否有战神之盾BUFF&&是否获得了伤害
                ////////System.out.println("没触发前伤害效果减少的伤害为：  "+damage+" .");
                ISkill 战神之盾 = SkillFactory.getSkill(21120007);
                damage = (int) ((战神之盾.getEffect(player.getSkillLevel(21120007)).getX() / 1000.0) * damage);
                //ISkill 战神之盾 = SkillFactory.getSkill(21120007);
                //double multiplier = 战神之盾.getEffect(player.getSkillLevel(21120007)).getX() / 1000.0 * damage ;
                //  int 战神之盾伤害 = (int) (multiplier);
                //damage = 战神之盾伤害;
                ////////System.out.println("2战神之盾发动效果收到伤害为 "+战神之盾伤害+" .");
                c.getPlayer().dropMessage("战神之盾激活.受到的伤害为:" + damage + ".");
            }
            if ((damagefrom == 0) && (attacker != null)) {
                Integer manaReflection = player.getBuffedValue(MapleBuffStat.MANA_REFLECTION);
                if (manaReflection != null) {
                    int skillId = player.getBuffSource(MapleBuffStat.MANA_REFLECTION);
                    ISkill manaReflectSkill = SkillFactory.getSkill(skillId);
                    if (manaReflectSkill.getEffect(player.getSkillLevel(manaReflectSkill)).makeChanceResult()) {
                        int bouncedamage = (int) (damage * (manaReflection.doubleValue() / 100.0D));
                        if (bouncedamage > attacker.getMaxHp() * 0.2D) {
                            bouncedamage = (int) (attacker.getMaxHp() * 0.2D);
                        }
                        player.getMap().damageMonster(player, attacker, bouncedamage);
                        player.getMap().broadcastMessage(player, MaplePacketCreator.damageMonster(oid, bouncedamage), false, true);
                        player.getClient().getSession().write(MaplePacketCreator.showOwnBuffEffect(skillId, 5));
                        player.getMap().broadcastMessage(player, MaplePacketCreator.showBuffeffect(player.getId(), skillId, 5, (byte) 3), false);
                    }
                }
            }
            if (damagefrom == -1) {
                try {
                    int[] achillesSkillId = {1120004, 1220005, 1320005};//永久增加防御力的被动buff
                    for (int achilles : achillesSkillId) {
                        ISkill achillesSkill = SkillFactory.getSkill(achilles);
                        if (player.getSkillLevel(achillesSkill) > 0) {
                            double multiplier = achillesSkill.getEffect(player.getSkillLevel(achillesSkill)).getX() / 1000.0D;
                            int newdamage = (int) (multiplier * damage);
                            damage = newdamage;
                            break;
                        }
                    }
                } catch (Exception e) {
                    log.warn("Failed to handle achilles..", e);
                }
            }
            if ((player.getBuffedValue(MapleBuffStat.MAGIC_GUARD) != null) && (mpattack == 0)) {
                int mploss = (int) (damage * (player.getBuffedValue(MapleBuffStat.MAGIC_GUARD).doubleValue() / 100.0D));
                int hploss = damage - mploss;
                if (mploss > player.getMp()) {
                    hploss += mploss - player.getMp();
                    mploss = player.getMp();
                }
                player.addMPHP(-hploss, -mploss);
            } else if (player.getBuffedValue(MapleBuffStat.MESOGUARD) != null) {
                damage = damage % 2 == 0 ? damage / 2 : damage / 2 + 1;
                int mesoloss = (int) (damage * (player.getBuffedValue(MapleBuffStat.MESOGUARD).doubleValue() / 100.0D));
                if (player.getMeso() < mesoloss) {
                    player.gainMeso(-player.getMeso(), false);
                    player.cancelBuffStats(MapleBuffStat.MESOGUARD);
                } else {
                    player.gainMeso(-mesoloss, false);
                }
                player.addMPHP(-damage, -mpattack);
            } else {
                player.addMPHP(-damage, -mpattack);
            }
            if (damagefrom == -2) {
                player.getMap().broadcastMessage(player, MaplePacketCreator.damagePlayer(-1, 9400711, player.getId(), damage, 0, 0, false, 0, false, 0, 0, 0), false);
            } else {
                player.getMap().broadcastMessage(player, MaplePacketCreator.damagePlayer(damagefrom, monsteridfrom, player.getId(), damage, fake, direction, is_pgmr, pgmr, is_pg, oid, pos_x, pos_y), false);  
            }
            player.checkBerserk();
        }
        if ((player.getMap().getId() >= 925020000) && (player.getMap().getId() < 925030000)) {
            player.setDojoEnergy(player.getDojoEnergy() < 300 ? player.getDojoEnergy() + 1 : player.isGM() ? 300 : 0);
            player.getClient().getSession().write(MaplePacketCreator.getEnergy(player.getDojoEnergy()));
        }
    }
}
