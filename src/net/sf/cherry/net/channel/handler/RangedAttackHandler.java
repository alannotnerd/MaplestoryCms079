/*
 * 远程伤害处理
 */
package net.sf.cherry.net.channel.handler;

import java.util.concurrent.ScheduledFuture;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import net.sf.cherry.client.IItem;
import net.sf.cherry.client.ISkill;
import net.sf.cherry.client.MapleBuffStat;
import net.sf.cherry.client.MapleCharacter;
import net.sf.cherry.client.MapleClient;
import net.sf.cherry.client.MapleInventory;
import net.sf.cherry.client.MapleInventoryType;
import net.sf.cherry.client.MapleJob;
import net.sf.cherry.client.MapleStat;
import net.sf.cherry.client.MapleWeaponType;
import net.sf.cherry.client.SkillFactory;
import net.sf.cherry.client.anticheat.CheatingOffense;
import net.sf.cherry.net.MaplePacket;
import net.sf.cherry.server.MapleInventoryManipulator;
import net.sf.cherry.server.MapleItemInformationProvider;
import net.sf.cherry.server.MapleStatEffect;
import net.sf.cherry.server.TimerManager;
import net.sf.cherry.server.maps.FakeCharacter;
import net.sf.cherry.tools.MaplePacketCreator;
import net.sf.cherry.tools.data.input.SeekableLittleEndianAccessor;

public class RangedAttackHandler extends AbstractDealDamageHandler {

    private static Logger log = LoggerFactory.getLogger(RangedAttackHandler.class);

    public void handlePacket(SeekableLittleEndianAccessor slea, MapleClient c) {
        c.doneedlog(this, c.getPlayer());
        if (c.getPlayer().getCherryBan()) {
            c.getPlayer().getCherryBanMessage();
            c.getSession().write(MaplePacketCreator.enableActions());
            return;
        }
        AbstractDealDamageHandler.AttackInfo attack = parseDamage(c.getPlayer(), slea, true);
        MapleCharacter player = c.getPlayer();
        Integer 隐身 = player.getBuffedValue(MapleBuffStat.DARKSIGHT);
        Integer 夜行者隐身 = player.getBuffedValue(MapleBuffStat.DARKSIGHT);
        int beforeMp = player.getMp();
        //slea.skip(4);//人物坐标
        Short chr_x = Short.valueOf(slea.readShort());
        Short chr_y = Short.valueOf(slea.readShort());
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
        if ((attack.skill == 5121002) || (attack.skill == 21110006) || (attack.skill == 21110003) || (attack.skill == 21120002) || attack.skill == 21100004 || attack.skill == 21110004 || attack.skill == 21120006) {
            player.getMap().broadcastMessage(player, MaplePacketCreator.rangedAttack(player.getId(), attack.skill, attack.stance, attack.numAttackedAndDamage, attack.allDamage, attack.speed, x, y, attack.pos), false);
            applyAttack(attack, player, 9999999, 1, c);
            //////System.out.println("1");
       /* } else if (attack.skill == 21100004 || attack.skill == 21110004 || attack.skill == 21120006) {
             //player.getMap().broadcastMessage(player, MaplePacketCreator.rangedAttack(player, attack.skill, attack.skilllevel, attack.stance, attack.numAttackedAndDamage, 0, attack.allDamage, attack.speed, attack.direction, attack.display), false);
             player.getMap().broadcastMessage(player, MaplePacketCreator.rangedAttack(player.getId(), attack.skill, attack.stance, attack.numAttackedAndDamage, attack.allDamage, attack.speed, x, y, attack.pos), false);
             //////System.out.println("2");*/
            if (attack.skill == 21100004) {
                applyAttack(attack, player, 9999999, 1, c);
                //////System.out.println("3");
            } else if (attack.skill == 21110004) {
                applyAttack(attack, player, 9999999, 2, c);
                //////System.out.println("4");
            } else if (attack.skill == 21120006) {
                applyAttack(attack, player, 9999999, 4, c);
                //////System.out.println("5");
            }
        } else {
            MapleInventory equip = player.getInventory(MapleInventoryType.EQUIPPED);
            IItem weapon = equip.getItem((byte) -11);
            MapleItemInformationProvider mii = MapleItemInformationProvider.getInstance();
            MapleWeaponType type = mii.getWeaponType(weapon.getItemId());
            if (type == MapleWeaponType.NOT_A_WEAPON) {
                //hrow new RuntimeException("[h4x] Player " + player.getName() + " is attacking with something that's not a weapon");
                return;
            }
            int projectile = 0;
            int bulletCount = 1;
            MapleStatEffect effect = null;
            if (attack.skill != 0) {
                effect = attack.getAttackEffect(c.getPlayer());
                bulletCount = effect.getBulletCount();
                if (effect.getCooldown() > 0) {
                    c.getSession().write(MaplePacketCreator.skillCooldown(attack.skill, effect.getCooldown()));
                }
            }
            boolean hasShadowPartner = player.getBuffedValue(MapleBuffStat.SHADOWPARTNER) != null;
            int damageBulletCount = bulletCount;
            if (hasShadowPartner) {
                bulletCount *= 2;
            }
            MapleInventory inv = player.getInventory(MapleInventoryType.USE);
            for (int i = 0; i < inv.getSlots(); i++) {
                IItem item = inv.getItem((byte) i);
                if (item != null) {
                    /*int id = item.getItemId();
                     boolean clawCondition = (type == MapleWeaponType.CLAW) && (mii.isThrowingStar(item.getItemId())) && (weapon.getItemId() != 1472063);
                     boolean bowCondition = (type == MapleWeaponType.BOW) && (mii.isArrowForBow(item.getItemId()));
                     boolean crossbowCondition = (type == MapleWeaponType.CROSSBOW) && (mii.isArrowForCrossBow(item.getItemId()));
                     boolean gunCondition = (type == MapleWeaponType.GUN) && (mii.isBullet(item.getItemId()));
                     boolean mittenCondition = (weapon.getItemId() == 1472063) && ((mii.isArrowForBow(item.getItemId())) || (mii.isArrowForCrossBow(item.getItemId())));
                     if (((clawCondition) || (bowCondition) || (crossbowCondition) || (mittenCondition) || (gunCondition)) && (item.getQuantity() >= bulletCount)) {
                     projectile = item.getItemId();
                     break;
                     }*/
                    int id = item.getItemId();
                    boolean bow = mii.isArrowForBow(id);
                    boolean cbow = mii.isArrowForCrossBow(id);
                    if (item.getQuantity() > (bulletCount == 1 ? 0 : bulletCount)) { //Fixes the bug where you can't use your last arrow.
                        if (type == MapleWeaponType.CLAW && mii.isThrowingStar(id) && weapon.getItemId() != 1472063) {
                            if (((id == 2070007 || id == 2070018) && player.getLevel() < 70) || (id == 2070016 && player.getLevel() < 50)) {
                            } else {
                                projectile = id;
                                break;
                            }
                        } else if ((type == MapleWeaponType.GUN && mii.isBullet(id))) {
                            if (id == 2331000 && id == 2332000) {
                                if (player.getLevel() > 69) {
                                    projectile = id;
                                    break;
                                }
                            } else if (player.getLevel() > (id % 10) * 20 + 9) {
                                projectile = id;
                                break;
                            }
                        } else if ((type == MapleWeaponType.BOW && bow) || (type == MapleWeaponType.CROSSBOW && cbow) || (weapon.getItemId() == 1472063 && (bow || cbow))) {
                            projectile = id;
                            break;
                        }
                    }
                }
            }
            /*boolean soulArrow = (player.getBuffedValue(MapleBuffStat.SOULARROW) != null) || (attack.skill == 5121002);
             boolean shadowClaw = player.getBuffedValue(MapleBuffStat.SHADOW_CLAW) != null;
             if ((attack != null) && (!soulArrow) && (!shadowClaw) && (attack.skill != 11101004) && (attack.skill != 15111007) && (attack.skill != 14101006) && (effect != null) && (!effect.isComboMove())) {
             int bulletConsume = bulletCount;
             if ((effect != null) && (effect.getBulletConsume() != 0)) {
             bulletConsume = effect.getBulletConsume() * (hasShadowPartner ? 2 : 1);
             }
             // if ((player.getJob().isA(MapleJob.Ares_1)) || (player.getJob().isA(MapleJob.Ares_2)) || (player.getJob().isA(MapleJob.Ares_3)) || (player.getJob().isA(MapleJob.Ares_4))) {
             MapleInventoryManipulator.removeById(c, MapleInventoryType.USE, projectile, bulletConsume, false, true);
             //  }
             }*/
            boolean soulArrow = player.getBuffedValue(MapleBuffStat.SOULARROW) != null;
            boolean shadowClaw = player.getBuffedValue(MapleBuffStat.SHADOW_CLAW) != null;
            if (!soulArrow && !shadowClaw && attack.skill != 11101004 && attack.skill != 15111007 && attack.skill != 14101006) {
                int bulletConsume = bulletCount;
                if (effect != null && effect.getBulletConsume() != 0) {
                    bulletConsume = (byte) (effect.getBulletConsume() * (hasShadowPartner ? 2 : 1));
                }
                MapleInventoryManipulator.removeById(c, MapleInventoryType.USE, projectile, bulletConsume, false, true);
            }
            if ((projectile != 0) || (soulArrow) || (attack.skill == 4121003) || (attack.skill == 4221003) || (attack.skill == 11101004) || (attack.skill == 15111007) || (attack.skill == 14101006)) {
                int visProjectile = projectile;
                if (mii.isThrowingStar(projectile)) {
                    MapleInventory cash = player.getInventory(MapleInventoryType.CASH);
                    for (int i = 0; i < 96; i++) {
                        IItem item = cash.getItem((byte) i);
                        if (item != null) {
                            if (item.getItemId() / 1000 == 5021) {
                                visProjectile = item.getItemId();
                                break;
                            }
                        }
                    }

                } else if ((soulArrow) || (attack.skill == 3111004) || (attack.skill == 3211004) || (attack.skill == 11101004) || (attack.skill == 15111007) || (attack.skill == 14101006)) {
                    visProjectile = 0;
                }
                try {
                    MaplePacket packet;
                    switch (attack.skill) {
                        case 3121004:
                        case 3221001:
                        case 5221004:
                        case 13111002:
                            packet = MaplePacketCreator.rangedAttack1(player.getId(), attack.skill, attack.direction, attack.numAttackedAndDamage, visProjectile, attack.allDamage, attack.speed, x, y, attack.pos);
                            break;
                        default:
                            packet = MaplePacketCreator.rangedAttack1(player.getId(), attack.skill, attack.stance, attack.numAttackedAndDamage, visProjectile, attack.allDamage, attack.speed, x, y, attack.pos);
                    }

                    player.getMap().broadcastMessage(player, packet, false, true);
                } catch (Exception e) {
                    log.warn("Failed to handle ranged attack..", e);
                }

                int projectileWatk = 0;
                if (projectile != 0) {
                    projectileWatk = mii.getWatkForProjectile(projectile);
                }
                int basedamage;
                if ((attack.skill != 4001344) && (attack.skill != 14001004)) {
                    // int basedamage;
                    if (projectileWatk != 0) {
                        basedamage = c.getPlayer().calculateMaxBaseDamage(c.getPlayer().getTotalWatk() + projectileWatk);
                    } else {
                        basedamage = c.getPlayer().getCurrentMaxBaseDamage();
                    }
                } else {
                    basedamage = (int) (c.getPlayer().getTotalLuk() * 5.0D / 100.0D * (c.getPlayer().getTotalWatk() + projectileWatk));
                }
                if (attack.skill == 3101005) {
                    basedamage = (int) (basedamage * (effect.getX() / 100.0D));
                }
                int maxdamage = basedamage;
                double critdamagerate = 0.0D;
                if (player.getJob().isA(MapleJob.ASSASSIN)) {
                    ISkill criticalthrow = SkillFactory.getSkill(4100001);
                    int critlevel = player.getSkillLevel(criticalthrow);
                    if (critlevel > 0) {
                        critdamagerate = criticalthrow.getEffect(player.getSkillLevel(criticalthrow)).getDamage() / 100.0D;
                    }
                } else if (player.getJob().isA(MapleJob.BOWMAN)) {
                    ISkill criticalshot = SkillFactory.getSkill(3000001);
                    int critlevel = player.getSkillLevel(criticalshot);
                    if (critlevel > 0) {
                        critdamagerate = criticalshot.getEffect(critlevel).getDamage() / 100.0D - 1.0D;
                    }
                }
                int critdamage = (int) (basedamage * critdamagerate);
                if (effect != null) {
                    maxdamage = (int) (maxdamage * (attack.skill == 14101006 ? effect.getDamage() : effect.getDamage() / 100.0D));
                }
                maxdamage += critdamage;
                maxdamage *= damageBulletCount;
                if (hasShadowPartner) {
                    ISkill shadowPartner = SkillFactory.getSkill(4111002);
                    int shadowPartnerLevel = player.getSkillLevel(shadowPartner);
                    if (0 >= shadowPartnerLevel) {
                        shadowPartner = SkillFactory.getSkill(14111000);
                        shadowPartnerLevel = player.getSkillLevel(shadowPartner);
                    }
                    MapleStatEffect shadowPartnerEffect = shadowPartner.getEffect(shadowPartnerLevel);
                    if (attack.skill != 0) {
                        maxdamage = (int) (maxdamage * (1.0D + shadowPartnerEffect.getY() / 100.0D));
                    } else {
                        maxdamage = (int) (maxdamage * (1.0D + shadowPartnerEffect.getX() / 100.0D));
                    }
                }
                if (attack.skill == 4111004) {
                    maxdamage = 35000;
                }
                if (effect != null) {
                    int money = effect.getMoneyCon();
                    if (money != 0) {
                        double moneyMod = money * 0.5D;
                        money = (int) (money + Math.random() * moneyMod);
                        if (money > player.getMeso()) {
                            money = player.getMeso();
                        }
                        player.gainMeso(-money, false);
                    }
                }
                if (attack.skill != 0) {
                    ISkill skill = SkillFactory.getSkill(attack.skill);
                    int skillLevel = c.getPlayer().getSkillLevel(skill);
                    MapleStatEffect effect_ = skill.getEffect(skillLevel);
                    if (effect_.getCooldown() > 0) {
                        if (player.skillisCooling(attack.skill)) {
                            player.getCheatTracker().registerOffense(CheatingOffense.COOLDOWN_HACK);
                            return;
                        }
                        c.getSession().write(MaplePacketCreator.skillCooldown(attack.skill, effect_.getCooldown()));
                        ScheduledFuture timer = TimerManager.getInstance().schedule(new MapleCharacter.CancelCooldownAction(c.getPlayer(), attack.skill), effect_.getCooldown() * 1000);
                        player.addCooldown(attack.skill, System.currentTimeMillis(), effect_.getCooldown() * 1000, timer);
                    }
                }

                if ((player.getSkillLevel(SkillFactory.getSkill(14100005)) > 0) && (player.getBuffedValue(MapleBuffStat.DARKSIGHT) != null) && (attack.numAttacked > 0)) {
                    player.cancelEffectFromBuffStat(MapleBuffStat.DARKSIGHT);
                    player.cancelBuffStats(MapleBuffStat.DARKSIGHT);
                }
                applyAttack(attack, player, maxdamage, bulletCount, c);
                if (c.getPlayer().hasFakeChar()) {
                    for (FakeCharacter ch : c.getPlayer().getFakeChars()) { //分身远程伤害
                        player.getMap().broadcastMessage(ch.getFakeChar(), MaplePacketCreator.rangedAttack(ch.getFakeChar().getId(), attack.skill, attack.stance, attack.numAttackedAndDamage, attack.allDamage, attack.speed, x, y, attack.pos), false);
                        //applyAttack(attack, ch.getFakeChar(), maxdamage, attackCount);
                        applyAttack(attack, player, maxdamage, bulletCount, c);
                    }
                }
                if ((effect != null) && (effect.getMpCon() != 0)
                        && (player.getMp() - beforeMp < effect.getMpCon())) {
                    int remainingMp = beforeMp - effect.getMpCon();
                    c.getPlayer().setMp(remainingMp);
                 //   System.out.println("我要输出这句");
                    c.getPlayer().updateSingleStat(MapleStat.MP, remainingMp);
                }
            }
        }
    }
}