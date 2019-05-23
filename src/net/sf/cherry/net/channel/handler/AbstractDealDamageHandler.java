package net.sf.cherry.net.channel.handler;
import java.awt.Point;
import java.util.ArrayList;
import java.util.Collections;
import java.util.List;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import net.sf.cherry.client.IEquip;
import net.sf.cherry.client.IItem;
import net.sf.cherry.client.ISkill;
import net.sf.cherry.client.MapleBuffStat;
import net.sf.cherry.client.MapleCharacter;
import net.sf.cherry.client.MapleClient;
import net.sf.cherry.client.MapleInventoryType;
import net.sf.cherry.client.MapleJob;
import net.sf.cherry.client.MapleWeaponType;
import net.sf.cherry.client.SkillFactory;
import net.sf.cherry.client.anticheat.CheatingOffense;
import net.sf.cherry.client.status.MonsterStatus;
import net.sf.cherry.client.status.MonsterStatusEffect;
import net.sf.cherry.net.AbstractMaplePacketHandler;
import net.sf.cherry.server.AutobanManager;
import net.sf.cherry.server.MapleItemInformationProvider;
import net.sf.cherry.server.MapleStatEffect;
import net.sf.cherry.server.TimerManager;
import net.sf.cherry.server.life.Element;
import net.sf.cherry.server.life.ElementalEffectiveness;
import net.sf.cherry.server.life.MapleLifeFactory;
import net.sf.cherry.server.life.MapleMonster;
import net.sf.cherry.server.maps.FakeCharacter;
import net.sf.cherry.server.maps.MapleMap;
import net.sf.cherry.server.maps.MapleMapItem;
import net.sf.cherry.server.maps.MapleMapObject;
import net.sf.cherry.server.maps.MapleMapObjectType;
import net.sf.cherry.tools.MaplePacketCreator;
import net.sf.cherry.tools.Pair;
import net.sf.cherry.tools.data.input.LittleEndianAccessor;
import constants.ServerConfig;

public abstract class AbstractDealDamageHandler extends AbstractMaplePacketHandler {

    private static Logger log = LoggerFactory.getLogger(AbstractDealDamageHandler.class);
    private List<FakeCharacter> fakes = new ArrayList<FakeCharacter>();
    public boolean savePacket = true; //是否记录攻击错误包
    private MapleMonster pvpMob;

    protected void applyAttack(AttackInfo attack, MapleCharacter player, int maxDamagePerMonster, int attackCount, MapleClient c) { //应用攻击

        player.getCheatTracker().resetHPRegen();
        player.resetAfkTimer();
        player.getCheatTracker().checkAttack(attack.skill, player, c);

        ISkill theSkill = null;
        MapleStatEffect attackEffect = null;
        if (attack.skill != 0) {
            theSkill = SkillFactory.getSkill(attack.skill);
            attackEffect = attack.getAttackEffect(player, theSkill);
            if (attackEffect == null) {
                AutobanManager.getInstance().autoban(player.getClient(), "使用了没有的技能- 技能ID: (" + attack.skill + ")");
            }
            if (attack.skill != 2301002) {
                if (player.isAlive()) {
                    attackEffect.applyTo(player);
                } else {
                    player.getClient().getSession().write(MaplePacketCreator.enableActions());
                }
            }
        }
        if (!player.isAlive()) {
            player.getCheatTracker().registerOffense(CheatingOffense.ATTACKING_WHILE_DEAD);
            return;
        }
        // meso explosion has a variable bullet count
        if (attackCount != attack.numDamage && attack.skill != 4211006 && attack.numDamage != attackCount * 2 && attack.skill != 21120006 && attack.skill != 14101006 && attack.skill != 13111007&& attack.skill != 14111005&& attack.skill != 4121007) {
            //////System.out.println("钻石停止");
            player.getCheatTracker().registerOffense(CheatingOffense.MISMATCHING_BULLETCOUNT, attack.numDamage + "/" + attackCount);
            return;
        }
        int totDamage = 0;
        final MapleMap map = player.getMap();
        int delay;
        if (attack.skill == 4211006) {
            delay = 0;
            for (Pair oned : attack.allDamage) {
                MapleMapObject mapobject = map.getMapObject(((Integer) oned.getLeft()).intValue());
                if ((mapobject != null) && (mapobject.getType() == MapleMapObjectType.ITEM)) {
                    final MapleMapItem mapitem = (MapleMapItem) mapobject;
                    if (mapitem.getMeso() > 0) {
                        synchronized (mapitem) {
                            if (mapitem.isPickedUp()) {
                                return;
                            }
                            TimerManager.getInstance().schedule(new Runnable() {
                                public void run() {
                                    map.removeMapObject(mapitem);
                                    map.broadcastMessage(MaplePacketCreator.removeItemFromMap(mapitem.getObjectId(), 4, 0), mapitem.getPosition());
                                    mapitem.setPickedUp(true);
                                }
                            }, delay);

                            delay += 100;
                        }
                    } else if (mapitem.getMeso() == 0) {
                        player.getCheatTracker().registerOffense(CheatingOffense.ETC_EXPLOSION);
                        return;
                    }
                } else if ((mapobject != null) && (mapobject.getType() != MapleMapObjectType.MONSTER)) {
                    player.getCheatTracker().registerOffense(CheatingOffense.EXPLODING_NONEXISTANT);
                    return;
                }
            }
        }

        for (Pair<Integer, List<Integer>> oned : attack.allDamage) {
            MapleMonster monster = map.getMonsterByOid(((Integer) oned.getLeft()).intValue());

            if (monster != null) {
                int totDamageToOneMonster = 0;
                for (Integer eachd : oned.getRight()) {
                    totDamageToOneMonster += eachd.intValue();
               }
                totDamage += totDamageToOneMonster;

                player.checkMonsterAggro(monster);
                if (totDamageToOneMonster > attack.numDamage + 1) {
                    int dmgCheck = player.getCheatTracker().checkDamage(totDamageToOneMonster);
                    if ((dmgCheck > 5) && (totDamageToOneMonster < 99999) && (monster.getId() < 9500317) && (monster.getId() > 9500319) || (!player.isGM())) {
                        player.getCheatTracker().registerOffense(CheatingOffense.SAME_DAMAGE, dmgCheck + " times: " + totDamageToOneMonster);
                   }
                }
				if ((!((player.getJob() == MapleJob.Ares) && (player.getLevel() == 1))) && ServerConfig.异常攻击伤害检测) {
					// 战神1级有英雄剧情，攻击会很高。
					if ((player.getLevel() < 30) && (totDamageToOneMonster > 3000)) {
						player.ban(player.getName() + " 被系统封号.(异常攻击伤害值: " + totDamageToOneMonster + " 当前等级 "
								+ player.getLevel() + " (IP: "
								+ player.getClient().getSession().getRemoteAddress().toString().split(":")[0] + ")");
						return;

					} else if ((player.getLevel() < 70) && (attack.skill != 4211006)
							&& (totDamageToOneMonster > 40000)) {
						player.ban(player.getName() + " 被系统封号.(异常攻击伤害值: " + totDamageToOneMonster + " 当前等级 "
								+ player.getLevel() + " (IP: "
								+ player.getClient().getSession().getRemoteAddress().toString().split(":")[0] + ")");
						return;

					} else if ((player.getLevel() < 100) && (attack.skill != 4211006)
							&& (totDamageToOneMonster > 159999)) {
						player.ban(player.getName() + " 被系统封号.(异常攻击伤害值: " + totDamageToOneMonster + " 当前等级 "
								+ player.getLevel() + " (IP: "
								+ player.getClient().getSession().getRemoteAddress().toString().split(":")[0] + ")");
						return;

					} else if ((player.getLevel() < 120) && (attack.skill != 4211006)
							&& (totDamageToOneMonster > 299999)) {
						player.ban(player.getName() + " 被系统封号.(异常攻击伤害值: " + totDamageToOneMonster + " 当前等级 "
								+ player.getLevel() + " (IP: "
								+ player.getClient().getSession().getRemoteAddress().toString().split(":")[0] + ")");
						return;

					} else if ((player.getLevel() < 180) && (attack.skill != 4211006)
							&& (totDamageToOneMonster > 2599999)) {
						player.ban(player.getName() + " 被系统封号.(异常攻击伤害值: " + totDamageToOneMonster + " 当前等级 "
								+ player.getLevel() + " (IP: "
								+ player.getClient().getSession().getRemoteAddress().toString().split(":")[0] + ")");
						return;
					} else if ((player.getLevel() < 200) && (attack.skill != 4211006)
							&& (totDamageToOneMonster > 3500000)) {
						player.ban(player.getName() + " 被系统封号.(异常攻击伤害值: " + totDamageToOneMonster + " 当前等级 "
								+ player.getLevel() + " (IP: "
								+ player.getClient().getSession().getRemoteAddress().toString().split(":")[0] + ")");
						return;
					} else if ((player.getLevel() < 255) && (attack.skill != 4211006)
							&& (totDamageToOneMonster > 4000000)) {
						player.ban(player.getName() + " 被系统封号.(异常攻击伤害值: " + totDamageToOneMonster + " 当前等级 "
								+ player.getLevel() + " (IP: "
								+ player.getClient().getSession().getRemoteAddress().toString().split(":")[0] + ")");
						return;
					}
				}
				
                checkHighDamage(player, monster, attack, theSkill, attackEffect, totDamageToOneMonster, maxDamagePerMonster);
                double distance = player.getPosition().distanceSq(monster.getPosition());
                if (distance > 400000.0D) {
                    player.getCheatTracker().registerOffense(CheatingOffense.ATTACK_FARAWAY_MONSTER, Double.toString(Math.sqrt(distance)));
                }

                if (attack.skill == 5111004) {
                    ISkill edrain = SkillFactory.getSkill(5111004);

                    int gainhp = (int) (totDamage * edrain.getEffect(player.getSkillLevel(edrain)).getX() / 100.0D);
                    gainhp = Math.min(monster.getMaxHp(), Math.min(gainhp, player.getMaxHp() / 2));
                    player.addHP(gainhp);
                } else if (attack.skill == 15100004) {
                    ISkill edrain = SkillFactory.getSkill(15100004);

                    int gainhp = (int) (totDamage * edrain.getEffect(player.getSkillLevel(edrain)).getX() / 100.0D);
                    gainhp = Math.min(monster.getMaxHp(), Math.min(gainhp, player.getMaxHp() / 2));
                    player.addHP(gainhp);
                }

                if (!monster.isControllerHasAggro()) {
                    if (monster.getController() == player) {
                        monster.setControllerHasAggro(true);
                    } else {
                        monster.switchController(player, true);
                    }
                }
                if ((attack.skill == 2301002) && (!monster.getUndead())) { //如果当前技能是【群体治愈术】 并且等于不死系怪物
                    player.getCheatTracker().registerOffense(CheatingOffense.HEAL_ATTACKING_UNDEAD); //攻击不死系怪物
                    return;
                }
                if (player.getBuffedValue(MapleBuffStat.抗压) != null) { //抗压
                    ISkill blind = SkillFactory.getSkill(21101003);
                    if (blind.getEffect(player.getSkillLevel(blind)).makeChanceResult()) {
                        MonsterStatusEffect monsterStatusEffect = new MonsterStatusEffect(Collections.singletonMap(MonsterStatus.抗压, blind.getEffect(player.getSkillLevel(blind)).getX()), blind, false);
                        monster.applyStatus(player, monsterStatusEffect, false, blind.getEffect(player.getSkillLevel(blind)).getY() * 1000);
                    }
                }
                if (((attack.skill == 4001334) || (attack.skill == 4201005) || (attack.skill == 0) || (attack.skill == 4211002) || (attack.skill == 4211004)) && (player.getBuffedValue(MapleBuffStat.PICKPOCKET) != null)) {
                    handlePickPocket(player, monster, oned);
                }

                if (attack.skill == 4101005) {
                    ISkill drain = SkillFactory.getSkill(attack.skill);
                    int gainhp = (int) (totDamageToOneMonster * drain.getEffect(player.getSkillLevel(drain)).getX() / 100.0D);
                    gainhp = Math.min(monster.getMaxHp(), Math.min(gainhp, player.getMaxHp() / 2));
                    player.addHP(gainhp);
                }
                if (player.getBuffedValue(MapleBuffStat.连环吸血) != null) {
                    ISkill edrain = SkillFactory.getSkill(21100005);
                    int gainhp = (int) ((double) totDamage * (double) edrain.getEffect(player.getSkillLevel(edrain)).getX() / 100.0D);
                    player.addHP(gainhp);
                }
                  if (attack.skill == 14101006) { //骑士团吸血
                      ISkill 吸血 = SkillFactory.getSkill(14101006);
                        int gainhp = (int) ((double) totDamage * (double) 吸血.getEffect(player.getSkillLevel(吸血)).getX() / 100.0D);
                    player.addHP(gainhp);
                  }
                if (player.getBuffedValue(MapleBuffStat.HAMSTRING) != null) {
                    ISkill hamstring = SkillFactory.getSkill(3121007);
                    if (hamstring.getEffect(player.getSkillLevel(hamstring)).makeChanceResult()) {
                        MonsterStatusEffect monsterStatusEffect = new MonsterStatusEffect(Collections.singletonMap(MonsterStatus.SPEED, Integer.valueOf(hamstring.getEffect(player.getSkillLevel(hamstring)).getX())), hamstring, false);
                        monster.applyStatus(player, monsterStatusEffect, false, hamstring.getEffect(player.getSkillLevel(hamstring)).getY() * 1000);
                    }
                }

                if (player.getBuffedValue(MapleBuffStat.BLIND) != null) {
                    ISkill blind = SkillFactory.getSkill(3221006);
                    if (blind.getEffect(player.getSkillLevel(blind)).makeChanceResult()) {
                        MonsterStatusEffect monsterStatusEffect = new MonsterStatusEffect(Collections.singletonMap(MonsterStatus.ACC, Integer.valueOf(blind.getEffect(player.getSkillLevel(blind)).getX())), blind, false);
                        monster.applyStatus(player, monsterStatusEffect, false, blind.getEffect(player.getSkillLevel(blind)).getY() * 1000);
                    }
                }

                if (player.getJob().isA(MapleJob.WHITEKNIGHT)) {
                    int[] charges = {1211005, 1211006, 15101006, 11101002};
                    for (int charge : charges) {
                        ISkill chargeSkill = SkillFactory.getSkill(charge);

                        if (player.isBuffFrom(MapleBuffStat.WK_CHARGE, chargeSkill)) {
                            ElementalEffectiveness iceEffectiveness = monster.getEffectiveness(Element.ICE);
                            if (((totDamageToOneMonster <= 0) || (iceEffectiveness != ElementalEffectiveness.NORMAL)) && (iceEffectiveness != ElementalEffectiveness.WEAK)) {
                                break;
                            }
                            MapleStatEffect chargeEffect = chargeSkill.getEffect(player.getSkillLevel(chargeSkill));
                            MonsterStatusEffect monsterStatusEffect = new MonsterStatusEffect(Collections.singletonMap(MonsterStatus.FREEZE, Integer.valueOf(1)), chargeSkill, false);
                            monster.applyStatus(player, monsterStatusEffect, false, chargeEffect.getY() * 2000);
                            break;
                        }
                    }
                }
                if (player.getJob().isA(MapleJob.Ares_3)) {
                    int[] charges = new int[]{21111005};//寒冰钝器
                    for (int charge : charges) {
                        ISkill chargeSkill = SkillFactory.getSkill(charge);

                        if (player.isBuffFrom(MapleBuffStat.WK_CHARGE, chargeSkill)) {
                            final ElementalEffectiveness iceEffectiveness = monster.getEffectiveness(Element.ICE);
                            if (totDamageToOneMonster > 0 && iceEffectiveness == ElementalEffectiveness.NORMAL || iceEffectiveness == ElementalEffectiveness.WEAK) {
                                MapleStatEffect chargeEffect = chargeSkill.getEffect(player.getSkillLevel(chargeSkill));
                                MonsterStatusEffect monsterStatusEffect = new MonsterStatusEffect(Collections.singletonMap(MonsterStatus.FREEZE, 1), chargeSkill, false);
                                monster.applyStatus(player, monsterStatusEffect, false, chargeEffect.getY() * 2);
                            }
                            break;
                        }
                    }
                }
                ISkill venomNL = SkillFactory.getSkill(4120005);
                SkillFactory.getSkill(14110004);
                if (player.getSkillLevel(venomNL) <= 0) {
                    venomNL = SkillFactory.getSkill(14110004);
                }
                ISkill venomShadower = SkillFactory.getSkill(4220005); //14110004
                if (player.getSkillLevel(venomNL) > 0) {
                    MapleStatEffect venomEffect = venomNL.getEffect(player.getSkillLevel(venomNL));
                    for (int i = 0; i < attackCount; i++) {
                        if ((venomEffect.makeChanceResult() != true)
                                || (monster.getVenomMulti() >= 3)) {
                            continue;
                        }
                        monster.setVenomMulti(monster.getVenomMulti() + 1);
                        MonsterStatusEffect monsterStatusEffect = new MonsterStatusEffect(Collections.singletonMap(MonsterStatus.POISON, Integer.valueOf(1)), venomNL, false);
                        monster.applyStatus(player, monsterStatusEffect, false, venomEffect.getDuration(), true);
                    }

                } else if (player.getSkillLevel(venomShadower) > 0) {
                    MapleStatEffect venomEffect = venomShadower.getEffect(player.getSkillLevel(venomShadower));
                    for (int i = 0; i < attackCount; i++) {
                        if ((venomEffect.makeChanceResult() != true)
                                || (monster.getVenomMulti() >= 3)) {
                            continue;
                        }
                        monster.setVenomMulti(monster.getVenomMulti() + 1);
                        MonsterStatusEffect monsterStatusEffect = new MonsterStatusEffect(Collections.singletonMap(MonsterStatus.POISON, Integer.valueOf(1)), venomShadower, false);
                        monster.applyStatus(player, monsterStatusEffect, false, venomEffect.getDuration(), true);
                    }

                }

                if ((totDamageToOneMonster > 0) && (attackEffect != null) && (attackEffect.getMonsterStati().size() > 0)
                        && (attackEffect.makeChanceResult())) {
                    MonsterStatusEffect monsterStatusEffect = new MonsterStatusEffect(attackEffect.getMonsterStati(), theSkill, false);
                    monster.applyStatus(player, monsterStatusEffect, attackEffect.isPoison(), attackEffect.getDuration());
                }

                if ((attack.isHH) && (!monster.isBoss())) {
                    map.damageMonster(player, monster, monster.getHp() - 1);
                } else if ((attack.isHH) && (monster.isBoss())) {
                        IItem weapon_item = player.getInventory(MapleInventoryType.EQUIPPED).getItem((byte) -11);//装备
                        @SuppressWarnings("unused")
                        MapleWeaponType weapon = MapleItemInformationProvider.getInstance().getWeaponType(weapon_item.getItemId());
                } else {
                        map.damageMonster(player, monster, totDamageToOneMonster);
                }
            }
        }
        if (totDamage > 1) {
            player.getCheatTracker().setAttacksWithoutHit(player.getCheatTracker().getAttacksWithoutHit() + 1);
            int offenseLimit;
            if (attack.skill != 3121004) {
                offenseLimit = 100;
            } else {
                offenseLimit = 300;
            }
            if (player.getCheatTracker().getAttacksWithoutHit() > offenseLimit) {
                player.getCheatTracker().registerOffense(CheatingOffense.ATTACK_WITHOUT_GETTING_HIT, Integer.toString(player.getCheatTracker().getAttacksWithoutHit()));
            }

            Integer 能量 = player.getBuffedValue(MapleBuffStat.能量);
            if(能量 == null && player.getEnergyPoint() == 10000){
                player.setEnergyPoint(0);
            }
            if (player.hasEnergyCharge() && player.getEnergyPoint() < 10000) {
                player.increaseEnergyCharge(attack.numAttacked);
            }
        }
    }

    private void handlePickPocket(MapleCharacter player, MapleMonster monster, Pair<Integer, List<Integer>> oned) {
        ISkill pickpocket = SkillFactory.getSkill(4211003);
        int delay = 0;
        int maxmeso = player.getBuffedValue(MapleBuffStat.PICKPOCKET).intValue();
        int reqdamage = 20000;
        Point monsterPosition = monster.getPosition();

        for (Integer eachd : oned.getRight()) {
            if (pickpocket.getEffect(player.getSkillLevel(pickpocket)).makeChanceResult()) {
                final double perc = eachd.intValue() / reqdamage;
                final int todrop = Math.min((int) Math.max(perc * maxmeso, 1.0D), maxmeso);
                final MapleMap tdmap = player.getMap();
                final Point tdpos = new Point((int) (monsterPosition.getX() + Math.random() * 100.0D - 50.0D), (int) monsterPosition.getY());
                final MapleMonster tdmob = monster;
                final MapleCharacter tdchar = player;
                TimerManager.getInstance().schedule(new Runnable() {
                    public void run() {
                        tdmap.spawnMesoDrop(todrop, tdpos, tdmob, tdchar, false);
                    }
                }, delay);
                delay += 200;
            }
        }
    }

    private void checkHighDamage(MapleCharacter player, MapleMonster monster, AttackInfo attack, ISkill theSkill, MapleStatEffect attackEffect, int damageToMonster, int maximumDamageToMonster) {
        Element element = Element.NEUTRAL;
        if (theSkill != null) {
            element = theSkill.getElement();
            int skillId = theSkill.getId();
            if (skillId == 3221007) {
                maximumDamageToMonster = 99999;
            } else if (skillId == 4221001) {
                maximumDamageToMonster = 400000;
            }
        }
        if (player.getBuffedValue(MapleBuffStat.WK_CHARGE) != null) {
            int chargeSkillId = player.getBuffSource(MapleBuffStat.WK_CHARGE);
            switch (chargeSkillId) {
                case 1211003:
                case 1211004:
                    element = Element.FIRE;
                    break;
                case 1211005:
                case 1211006:
                    element = Element.ICE;
                    break;
                case 1211007:
                case 1211008:
                    element = Element.LIGHTING;
                    break;
                case 1221003:
                case 15111006:
                case 1221004:
                    element = Element.HOLY;
            }

            ISkill chargeSkill = SkillFactory.getSkill(chargeSkillId);
            if (player.getSkillLevel(chargeSkill) > 0) {
                maximumDamageToMonster = (int) (maximumDamageToMonster * (chargeSkill.getEffect(player.getSkillLevel(chargeSkill)).getDamage() / 100.0D));
            } else {
                //////System.out.println("checkHighDamage player.getSkillLevel(chargeSkill)<0 chargeSkillId=" + chargeSkillId);
            }
        }
        int elementalMaxDamagePerMonster;
        if (element != Element.NEUTRAL) {

            double elementalEffect;
            if ((attack.skill == 3211003) || (attack.skill == 3111003)) {
                elementalEffect = attackEffect.getX() / 200.0D;
            } else {
                elementalEffect = 0.5D;
            }
            //int elementalMaxDamagePerMonster;
            //switch (SwitchMapnetsfcherryserver$life$ElementalEffectiveness[monster.getEffectiveness(element).ordinal()]) {
            switch (monster.getEffectiveness(element)) {
                case IMMUNE:
                    elementalMaxDamagePerMonster = 1;
                    break;
                case NORMAL:
                    elementalMaxDamagePerMonster = maximumDamageToMonster;
                    break;
                case WEAK:
                    elementalMaxDamagePerMonster = (int) (maximumDamageToMonster * (1.0 + elementalEffect));
                    break;
                case STRONG:
                    elementalMaxDamagePerMonster = (int) (maximumDamageToMonster * (1.0 - elementalEffect));
                    break;
                default:
                    throw new RuntimeException("Unknown enum constant");
            }
        } else {
            elementalMaxDamagePerMonster = maximumDamageToMonster;
        }
        if (damageToMonster > elementalMaxDamagePerMonster) {
            player.getCheatTracker().registerOffense(CheatingOffense.HIGH_DAMAGE);
            if ((attack.skill != 1009) && (attack.skill != 10001009)) {
                if (damageToMonster > elementalMaxDamagePerMonster * 4) {
                    if ((!player.isGM()) && (!player.getJob().isA(MapleJob.Ares))) {
                        if (player.getLevel() < 0) {
                            //AutobanManager.getInstance().broadcastMessage(player.getClient(), player.getName() + " 被系统封号.(异常攻击伤害值: " + damageToMonster + " 当前等级 " + player.getLevel() + ")");
                            //player.ban(player.getName() + " 被系统封号.(异常攻击伤害值: " + damageToMonster + " 当前等级 " + player.getLevel() + " ElementalMaxDamage: " + elementalMaxDamagePerMonster * 4 + " (IP: " + player.getClient().getSession().getRemoteAddress().toString().split(":")[0] + ")");
                        }
                    }
                    return;
                }
            } else {
                int maxDamage = (int) Math.floor(monster.getMaxHp() * 0.3D);

                // AutobanManager.getInstance().autoban(player.getClient(), damageToMonster + " 异常伤害值 (等级: " + player.getLevel() + " 攻击: " + player.getTotalWatk() + " 技能: " + attack.skill + ", 怪物: " + monster.getId() + " 造成最大伤害值: " + maxDamage + ")");
            }
        }
    }

    public AttackInfo parseRanged(MapleCharacter chr, LittleEndianAccessor lea) {
        AttackInfo ret = new AttackInfo();
        lea.readByte();
        ret.numAttackedAndDamage = lea.readByte();
        ret.numAttacked = (ret.numAttackedAndDamage >>> 4 & 0xF);
        ret.numDamage = (ret.numAttackedAndDamage & 0xF);
        ret.allDamage = new ArrayList();
        ret.skill = lea.readInt();
        lea.readInt();
        lea.readInt();
        switch (ret.skill) {
            case 3121004:
            case 3221001:
            case 5221004:
            case 13111002:
                lea.readInt();
        }

        lea.readByte();
        ret.stance = lea.readByte();
        lea.readByte();
        ret.speed = lea.readByte();
        lea.readInt();
        lea.readShort();
        lea.readShort();
        lea.readByte();
        for (int i = 0; i < ret.numAttacked; i++) {
            int mobId = lea.readInt();
            lea.skip(14);
            List allDamageNumbers = new ArrayList();
            for (int j = 0; j < ret.numDamage; j++) {
                allDamageNumbers.add(Integer.valueOf(lea.readInt()));
            }
            ret.allDamage.add(new Pair(Integer.valueOf(mobId), allDamageNumbers));
            lea.readInt();
        }
        lea.readInt();
        ret.pos = lea.readInt();
        return ret;
    }

    public AttackInfo parseDamage(MapleCharacter c, LittleEndianAccessor lea, boolean ranged) {
        AttackInfo ret = new AttackInfo();
        lea.readByte();
        lea.skip(8);
        ret.numAttackedAndDamage = lea.readByte();
        lea.skip(8);
        ret.numAttacked = (ret.numAttackedAndDamage >>> 4 & 0xF);
        ret.numDamage = (ret.numAttackedAndDamage & 0xF);
        ret.allDamage = new ArrayList();
        ret.skill = lea.readInt();
        lea.skip(8);
        if ((ret.skill == 2121001) || (ret.skill == 2221001) || (ret.skill == 2321001) || (ret.skill == 5201002) || (ret.skill == 14111006) || (ret.skill == 5101004) || (ret.skill == 15101003)) {
            ret.charge = lea.readInt();
        } else {
            ret.charge = 0;
        }

        if (ret.skill == 1221011) {
            ret.isHH = true;
        }
        lea.readInt();
        ret.aresCombo = lea.readByte();
        int sourceid = ret.skill;
        if ((sourceid == 21100004) || (sourceid == 21100005) || (sourceid == 21110003) || (sourceid == 21110004) || (sourceid == 21120006) || (sourceid == 21120007)) {
            c.setCombo(1);
        }
        ret.pos = lea.readByte();
        ret.stance = lea.readByte();

        if (ret.skill == 4211006) {
            return parseMesoExplosion(lea, ret);
        }

        if (ranged) {
            lea.readByte();
            ret.speed = lea.readByte();
            lea.readByte();
            ret.direction = lea.readByte();
            lea.skip(7);
            if ((ret.skill == 3121004) || (ret.skill == 3221001) || (ret.skill == 5221004) || (ret.skill == 13111002)) {
                lea.skip(4);
            }
        } else {
            lea.readByte();
            ret.speed = lea.readByte();
            lea.skip(4);
        }

        for (int i = 0; i < ret.numAttacked; i++) {
            int oid = lea.readInt();

            lea.skip(14);

            List allDamageNumbers = new ArrayList();
            for (int j = 0; j < ret.numDamage; j++) {
                int damage = lea.readInt();







      //破功
        IItem e1 = c.getInventory(MapleInventoryType.EQUIPPED).getItem((byte)-1);
        IItem e2 = c.getInventory(MapleInventoryType.EQUIPPED).getItem((byte)-2);
        IItem e3 = c.getInventory(MapleInventoryType.EQUIPPED).getItem((byte)-3);
        IItem e4 = c.getInventory(MapleInventoryType.EQUIPPED).getItem((byte)-4);
        IItem e5 = c.getInventory(MapleInventoryType.EQUIPPED).getItem((byte)-5);
        IItem e6 = c.getInventory(MapleInventoryType.EQUIPPED).getItem((byte)-6);
        IItem e7 = c.getInventory(MapleInventoryType.EQUIPPED).getItem((byte)-7);
        IItem e8 = c.getInventory(MapleInventoryType.EQUIPPED).getItem((byte)-8);
        IItem e9 = c.getInventory(MapleInventoryType.EQUIPPED).getItem((byte)-9);
        IItem e10 = c.getInventory(MapleInventoryType.EQUIPPED).getItem((byte)-10);
        IItem e11 = c.getInventory(MapleInventoryType.EQUIPPED).getItem((byte)-11);
        IItem e13 = c.getInventory(MapleInventoryType.EQUIPPED).getItem((byte)-13);
        IItem e14 = c.getInventory(MapleInventoryType.EQUIPPED).getItem((byte)-14);
        IItem e15 = c.getInventory(MapleInventoryType.EQUIPPED).getItem((byte)-15);
        IItem e16 = c.getInventory(MapleInventoryType.EQUIPPED).getItem((byte)-16);
        IItem e17 = c.getInventory(MapleInventoryType.EQUIPPED).getItem((byte)-17);
        IItem e18 = c.getInventory(MapleInventoryType.EQUIPPED).getItem((byte)-26);//敏捷
        IItem e19 = c.getInventory(MapleInventoryType.EQUIPPED).getItem((byte)-1);//攻击力
        IItem e20 = c.getInventory(MapleInventoryType.EQUIPPED).getItem((byte)-2);
        IItem e21 = c.getInventory(MapleInventoryType.EQUIPPED).getItem((byte)-3);
        IItem e22 = c.getInventory(MapleInventoryType.EQUIPPED).getItem((byte)-4);
        IItem e23 = c.getInventory(MapleInventoryType.EQUIPPED).getItem((byte)-5);
        IItem e24 = c.getInventory(MapleInventoryType.EQUIPPED).getItem((byte)-6);
        IItem e25 = c.getInventory(MapleInventoryType.EQUIPPED).getItem((byte)-7);
        IItem e26 = c.getInventory(MapleInventoryType.EQUIPPED).getItem((byte)-8);
        IItem e27 = c.getInventory(MapleInventoryType.EQUIPPED).getItem((byte)-9);
        IItem e28 = c.getInventory(MapleInventoryType.EQUIPPED).getItem((byte)-10);
        IItem e29 = c.getInventory(MapleInventoryType.EQUIPPED).getItem((byte)-11);
        IItem e31 = c.getInventory(MapleInventoryType.EQUIPPED).getItem((byte)-13);
        IItem e32 = c.getInventory(MapleInventoryType.EQUIPPED).getItem((byte)-14);
        IItem e33 = c.getInventory(MapleInventoryType.EQUIPPED).getItem((byte)-15);
        IItem e34 = c.getInventory(MapleInventoryType.EQUIPPED).getItem((byte)-16);
        IItem e35 = c.getInventory(MapleInventoryType.EQUIPPED).getItem((byte)-17);
        IItem e36 = c.getInventory(MapleInventoryType.EQUIPPED).getItem((byte)-26);
         //敏捷计算
        IItem t1 = c.getInventory(MapleInventoryType.EQUIPPED).getItem((byte)-1);
        IItem t2 = c.getInventory(MapleInventoryType.EQUIPPED).getItem((byte)-2);
        IItem t3 = c.getInventory(MapleInventoryType.EQUIPPED).getItem((byte)-3);
        IItem t4 = c.getInventory(MapleInventoryType.EQUIPPED).getItem((byte)-4);
        IItem t5 = c.getInventory(MapleInventoryType.EQUIPPED).getItem((byte)-5);
        IItem t6 = c.getInventory(MapleInventoryType.EQUIPPED).getItem((byte)-6);
        IItem t7 = c.getInventory(MapleInventoryType.EQUIPPED).getItem((byte)-7);
        IItem t8 = c.getInventory(MapleInventoryType.EQUIPPED).getItem((byte)-8);
        IItem t9 = c.getInventory(MapleInventoryType.EQUIPPED).getItem((byte)-9);
        IItem t10 = c.getInventory(MapleInventoryType.EQUIPPED).getItem((byte)-10);
        IItem t11 = c.getInventory(MapleInventoryType.EQUIPPED).getItem((byte)-11);
        IItem t13 = c.getInventory(MapleInventoryType.EQUIPPED).getItem((byte)-13);
        IItem t14 = c.getInventory(MapleInventoryType.EQUIPPED).getItem((byte)-14);
        IItem t15 = c.getInventory(MapleInventoryType.EQUIPPED).getItem((byte)-15);
        IItem t16 = c.getInventory(MapleInventoryType.EQUIPPED).getItem((byte)-16);
        IItem t17 = c.getInventory(MapleInventoryType.EQUIPPED).getItem((byte)-17);
        IItem t18 = c.getInventory(MapleInventoryType.EQUIPPED).getItem((byte)-26);
         //运气计算
        IItem q1 = c.getInventory(MapleInventoryType.EQUIPPED).getItem((byte)-1);
        IItem q2 = c.getInventory(MapleInventoryType.EQUIPPED).getItem((byte)-2);
        IItem q3 = c.getInventory(MapleInventoryType.EQUIPPED).getItem((byte)-3);
        IItem q4 = c.getInventory(MapleInventoryType.EQUIPPED).getItem((byte)-4);
        IItem q5 = c.getInventory(MapleInventoryType.EQUIPPED).getItem((byte)-5);
        IItem q6 = c.getInventory(MapleInventoryType.EQUIPPED).getItem((byte)-6);
        IItem q7 = c.getInventory(MapleInventoryType.EQUIPPED).getItem((byte)-7);
        IItem q8 = c.getInventory(MapleInventoryType.EQUIPPED).getItem((byte)-8);
        IItem q9 = c.getInventory(MapleInventoryType.EQUIPPED).getItem((byte)-9);
        IItem q10 = c.getInventory(MapleInventoryType.EQUIPPED).getItem((byte)-10);
        IItem q11 = c.getInventory(MapleInventoryType.EQUIPPED).getItem((byte)-11);
        IItem q13 = c.getInventory(MapleInventoryType.EQUIPPED).getItem((byte)-13);
        IItem q14 = c.getInventory(MapleInventoryType.EQUIPPED).getItem((byte)-14);
        IItem q15 = c.getInventory(MapleInventoryType.EQUIPPED).getItem((byte)-15);
        IItem q16 = c.getInventory(MapleInventoryType.EQUIPPED).getItem((byte)-16);
        IItem q17 = c.getInventory(MapleInventoryType.EQUIPPED).getItem((byte)-17);
        IItem q18 = c.getInventory(MapleInventoryType.EQUIPPED).getItem((byte)-26);
        //智力计算
        IItem w1 = c.getInventory(MapleInventoryType.EQUIPPED).getItem((byte)-1);
        IItem w2 = c.getInventory(MapleInventoryType.EQUIPPED).getItem((byte)-2);
        IItem w3 = c.getInventory(MapleInventoryType.EQUIPPED).getItem((byte)-3);
        IItem w4 = c.getInventory(MapleInventoryType.EQUIPPED).getItem((byte)-4);
        IItem w5 = c.getInventory(MapleInventoryType.EQUIPPED).getItem((byte)-5);
        IItem w6 = c.getInventory(MapleInventoryType.EQUIPPED).getItem((byte)-6);
        IItem w7 = c.getInventory(MapleInventoryType.EQUIPPED).getItem((byte)-7);
        IItem w8 = c.getInventory(MapleInventoryType.EQUIPPED).getItem((byte)-8);
        IItem w9 = c.getInventory(MapleInventoryType.EQUIPPED).getItem((byte)-9);
        IItem w10 = c.getInventory(MapleInventoryType.EQUIPPED).getItem((byte)-10);
        IItem w11 = c.getInventory(MapleInventoryType.EQUIPPED).getItem((byte)-11);//武器
        IItem w13 = c.getInventory(MapleInventoryType.EQUIPPED).getItem((byte)-13);
        IItem w14 = c.getInventory(MapleInventoryType.EQUIPPED).getItem((byte)-14);
        IItem w15 = c.getInventory(MapleInventoryType.EQUIPPED).getItem((byte)-15);
        IItem w16 = c.getInventory(MapleInventoryType.EQUIPPED).getItem((byte)-16);
        IItem w17 = c.getInventory(MapleInventoryType.EQUIPPED).getItem((byte)-17);
        IItem w18 = c.getInventory(MapleInventoryType.EQUIPPED).getItem((byte)-26);//勋章



         int ak = 0;//敏捷
         int ak1 = 0;//攻击魔法
         int ak3 = 0;//力量
         int ak4 = 0;//运气
         int ak5 = 0;//智力

        //敏捷
       if (e1 != null)
       {
           IEquip eqp1 = (IEquip)c.getInventory(MapleInventoryType.EQUIPPED).getItem((byte)-1);
           ak = ak + eqp1.getDex();
       }
       if (e2 != null)
       {
          IEquip eqp2 = (IEquip)c.getInventory(MapleInventoryType.EQUIPPED).getItem((byte)-2);
          ak = ak + eqp2.getDex();
       }
       if (e3 != null)
       {
           IEquip eqp3 = (IEquip)c.getInventory(MapleInventoryType.EQUIPPED).getItem((byte)-3);
           ak = ak + eqp3.getDex();
       }
       if (e4 != null)
       {
           IEquip eqp4 = (IEquip)c.getInventory(MapleInventoryType.EQUIPPED).getItem((byte)-4);
           ak = ak + eqp4.getDex();
       }
       if (e5 != null)
       {
           IEquip eqp5 = (IEquip)c.getInventory(MapleInventoryType.EQUIPPED).getItem((byte)-5);
           ak = ak + eqp5.getDex();
       }
       if (e6 != null)
       {
           IEquip eqp6 = (IEquip)c.getInventory(MapleInventoryType.EQUIPPED).getItem((byte)-6);
           ak = ak + eqp6.getDex();
       }
       if (e7 != null)
       {
           IEquip eqp7 = (IEquip)c.getInventory(MapleInventoryType.EQUIPPED).getItem((byte)-7);
           ak = ak + eqp7.getDex();
       }
       if (e8 != null)
       {
           IEquip eqp8 = (IEquip)c.getInventory(MapleInventoryType.EQUIPPED).getItem((byte)-8);
           ak = ak + eqp8.getDex();
       }
       if (e9 != null)
       {
           IEquip eqp9 = (IEquip)c.getInventory(MapleInventoryType.EQUIPPED).getItem((byte)-9);
           ak = ak + eqp9.getDex();
       }
       if (e10 != null)
       {
           IEquip eqp10 = (IEquip)c.getInventory(MapleInventoryType.EQUIPPED).getItem((byte)-10);
           ak = ak + eqp10.getDex();
       }
       if (e11 != null)
       {
       IEquip eqp11 = (IEquip)c.getInventory(MapleInventoryType.EQUIPPED).getItem((byte)-11);
      ak = ak + eqp11.getDex();
       }
       if (e13 != null)
       {
           IEquip eqp13 = (IEquip)c.getInventory(MapleInventoryType.EQUIPPED).getItem((byte)-13);
           ak = ak + eqp13.getDex();
       }
       if (e14 != null)
       {
           IEquip eqp14 = (IEquip)c.getInventory(MapleInventoryType.EQUIPPED).getItem((byte)-14);
           ak = ak + eqp14.getDex();
       }
       if (e15 != null)
       {
           IEquip eqp15 = (IEquip)c.getInventory(MapleInventoryType.EQUIPPED).getItem((byte)-15);
           ak = ak + eqp15.getDex();
       }
       if (e16 != null)
       {
           IEquip eqp16 = (IEquip)c.getInventory(MapleInventoryType.EQUIPPED).getItem((byte)-16);
           ak = ak + eqp16.getDex();
       }
        if (e17 != null)
       {
           IEquip eqp17 = (IEquip)c.getInventory(MapleInventoryType.EQUIPPED).getItem((byte)-17);
           ak = ak + eqp17.getDex();
       }
         if (e18 != null)
       {
           IEquip eqp18 = (IEquip)c.getInventory(MapleInventoryType.EQUIPPED).getItem((byte)-26);
           ak = ak + eqp18.getDex();
       }


        //攻击力
        if (e19 != null)
        {
          IEquip eqp19 = (IEquip)c.getInventory(MapleInventoryType.EQUIPPED).getItem((byte)-1);
          ak1 = ak1 + eqp19.getWatk() + eqp19.getMatk();
        }
        if (e20 != null)
        {
          IEquip eqp20 = (IEquip)c.getInventory(MapleInventoryType.EQUIPPED).getItem((byte)-2);
          ak1 = ak1 + eqp20.getWatk() + eqp20.getMatk();
        }
        if (e21 != null)
        {
          IEquip eqp21 = (IEquip)c.getInventory(MapleInventoryType.EQUIPPED).getItem((byte)-3);
          ak1 = ak1 + eqp21.getWatk() + eqp21.getMatk();
        }
        if (e22 != null)
        {
          IEquip eqp22 = (IEquip)c.getInventory(MapleInventoryType.EQUIPPED).getItem((byte)-4);
          ak1 = ak1 + eqp22.getWatk() + eqp22.getMatk();
        }
        if (e23 != null)
        {
          IEquip eqp23 = (IEquip)c.getInventory(MapleInventoryType.EQUIPPED).getItem((byte)-5);
          ak1 = ak1 + eqp23.getWatk() + eqp23.getMatk();
        }
        if (e24 != null)
        {
          IEquip eqp24 = (IEquip)c.getInventory(MapleInventoryType.EQUIPPED).getItem((byte)-6);
          ak1 = ak1 + eqp24.getWatk() + eqp24.getMatk();
        }
        if (e25 != null)
        {
          IEquip eqp25 = (IEquip)c.getInventory(MapleInventoryType.EQUIPPED).getItem((byte)-7);
          ak1 = ak1 + eqp25.getWatk() + eqp25.getMatk();
        }
        if (e26 != null)
        {
          IEquip eqp26 = (IEquip)c.getInventory(MapleInventoryType.EQUIPPED).getItem((byte)-8);
          ak1 = ak1 + eqp26.getWatk() + eqp26.getMatk();
        }
        if (e27 != null)
        {
          IEquip eqp27 = (IEquip)c.getInventory(MapleInventoryType.EQUIPPED).getItem((byte)-9);
          ak1 = ak1 + eqp27.getWatk() + eqp27.getMatk();
        }
        if (e28 != null)
        {
          IEquip eqp28 = (IEquip)c.getInventory(MapleInventoryType.EQUIPPED).getItem((byte)-10);
          ak1 = ak1 + eqp28.getWatk() + eqp28.getMatk();
        }
        if (e29 != null)
        {
          IEquip eqp29 = (IEquip)c.getInventory(MapleInventoryType.EQUIPPED).getItem((byte)-11);
          ak1 = ak1 + eqp29.getWatk() + eqp29.getMatk();
        }
        if (e31 != null)
        {
          IEquip eqp31 = (IEquip)c.getInventory(MapleInventoryType.EQUIPPED).getItem((byte)-13);
          ak1 = ak1 + eqp31.getWatk() + eqp31.getMatk();
        }
        if (e32 != null)
        {
          IEquip eqp32 = (IEquip)c.getInventory(MapleInventoryType.EQUIPPED).getItem((byte)-14);
          ak1 = ak1 + eqp32.getWatk() + eqp32.getMatk();
        }
        if (e33 != null)
        {
          IEquip eqp33 = (IEquip)c.getInventory(MapleInventoryType.EQUIPPED).getItem((byte)-15);
          ak1 = ak1 + eqp33.getWatk() + eqp33.getMatk();
        }
        if (e34 != null)
        {
          IEquip eqp34 = (IEquip)c.getInventory(MapleInventoryType.EQUIPPED).getItem((byte)-16);
          ak1 = ak1 + eqp34.getWatk() + eqp34.getMatk();
        }
        if (e35 != null)
        {
          IEquip eqp35 = (IEquip)c.getInventory(MapleInventoryType.EQUIPPED).getItem((byte)-17);
          ak1 = ak1 + eqp35.getWatk() + eqp35.getMatk();
        }
        if (e36 != null)
        {
          IEquip eqp36 = (IEquip)c.getInventory(MapleInventoryType.EQUIPPED).getItem((byte)-26);
          ak1 = ak1 + eqp36.getWatk() + eqp36.getMatk();
        }
           //计算战士职业力量
                 if (t1 != null)
                {
                    IEquip eqp1 = (IEquip)c.getInventory(MapleInventoryType.EQUIPPED).getItem((byte)-1);
                    ak3 = ak3 + eqp1.getStr();
                }
                if (t2 != null)
                {
                    IEquip eqp2 = (IEquip)c.getInventory(MapleInventoryType.EQUIPPED).getItem((byte)-2);
                   ak3 = ak3 + eqp2.getStr();
                 }
                if (t3 != null)
                {
                    IEquip eqp3 = (IEquip)c.getInventory(MapleInventoryType.EQUIPPED).getItem((byte)-3);
                    ak3 = ak3 + eqp3.getStr();
                }
                if (t4 != null)
                {
                    IEquip eqp4 = (IEquip)c.getInventory(MapleInventoryType.EQUIPPED).getItem((byte)-4);
                    ak3 = ak3 + eqp4.getStr();
                }
                if (t5 != null)
                {
                    IEquip eqp5 = (IEquip)c.getInventory(MapleInventoryType.EQUIPPED).getItem((byte)-5);
                    ak3 = ak3 + eqp5.getStr();
                }
                if (t6 != null)
                {
                    IEquip eqp6 = (IEquip)c.getInventory(MapleInventoryType.EQUIPPED).getItem((byte)-6);
                    ak3 = ak3 + eqp6.getStr();
                }
                if (t7 != null)
                {
                    IEquip eqp7 = (IEquip)c.getInventory(MapleInventoryType.EQUIPPED).getItem((byte)-7);
                    ak3 = ak3 + eqp7.getStr();
                }
                if (t8 != null)
                {
                    IEquip eqp8 = (IEquip)c.getInventory(MapleInventoryType.EQUIPPED).getItem((byte)-8);
                    ak3 = ak3 + eqp8.getStr();
                }
                if (t9 != null)
                {
                    IEquip eqp9 = (IEquip)c.getInventory(MapleInventoryType.EQUIPPED).getItem((byte)-9);
                    ak3 = ak3 + eqp9.getStr();
                }
                if (t10 != null)
                {
                    IEquip eqp10 = (IEquip)c.getInventory(MapleInventoryType.EQUIPPED).getItem((byte)-10);
                    ak3 = ak3 + eqp10.getStr();
                }
                if (t11 != null)
                {
                    IEquip eqp11 = (IEquip)c.getInventory(MapleInventoryType.EQUIPPED).getItem((byte)-11);
                    ak3 = ak3 + eqp11.getStr();
                }
                if (t13 != null)
                {
                    IEquip eqp13 = (IEquip)c.getInventory(MapleInventoryType.EQUIPPED).getItem((byte)-13);
                    ak3 = ak3 + eqp13.getStr();
                }
                if (t14 != null)
                {
                    IEquip eqp14 = (IEquip)c.getInventory(MapleInventoryType.EQUIPPED).getItem((byte)-14);
                    ak3 = ak3 + eqp14.getStr();
                }
                if (t15 != null)
                {
                    IEquip eqp15 = (IEquip)c.getInventory(MapleInventoryType.EQUIPPED).getItem((byte)-15);
                    ak3 = ak3 + eqp15.getStr();
                }
                if (t16 != null)
                {
                    IEquip eqp16 = (IEquip)c.getInventory(MapleInventoryType.EQUIPPED).getItem((byte)-16);
                    ak3 = ak3 + eqp16.getStr();
                }
                 if (t17 != null)
                {
                    IEquip eqp17 = (IEquip)c.getInventory(MapleInventoryType.EQUIPPED).getItem((byte)-17);
                    ak3 = ak3 + eqp17.getStr();
                }
                  if (t18 != null)
                {
                    IEquip eqp18 = (IEquip)c.getInventory(MapleInventoryType.EQUIPPED).getItem((byte)-26);
                    ak3 = ak3 + eqp18.getStr();
                }
  //计算运气
                 if (q1 != null)
                {
                    IEquip eqp1 = (IEquip)c.getInventory(MapleInventoryType.EQUIPPED).getItem((byte)-1);
                    ak4 = ak4 + eqp1.getLuk();
                }
                if (q2 != null)
                {
                    IEquip eqp2 = (IEquip)c.getInventory(MapleInventoryType.EQUIPPED).getItem((byte)-2);
                   ak4 = ak4 + eqp2.getLuk();
                 }
                if (q3 != null)
                {
                    IEquip eqp3 = (IEquip)c.getInventory(MapleInventoryType.EQUIPPED).getItem((byte)-3);
                    ak4 = ak4 + eqp3.getLuk();
                }
                if (q4 != null)
                {
                    IEquip eqp4 = (IEquip)c.getInventory(MapleInventoryType.EQUIPPED).getItem((byte)-4);
                    ak4 = ak4 + eqp4.getLuk();
                }
                if (q5 != null)
                {
                    IEquip eqp5 = (IEquip)c.getInventory(MapleInventoryType.EQUIPPED).getItem((byte)-5);
                    ak4 = ak4 + eqp5.getLuk();
                }
                if (q6 != null)
                {
                    IEquip eqp6 = (IEquip)c.getInventory(MapleInventoryType.EQUIPPED).getItem((byte)-6);
                    ak4 = ak4 + eqp6.getLuk();
                }
                if (q7 != null)
                {
                    IEquip eqp7 = (IEquip)c.getInventory(MapleInventoryType.EQUIPPED).getItem((byte)-7);
                    ak4 = ak4 + eqp7.getLuk();
                }
                if (q8 != null)
                {
                    IEquip eqp8 = (IEquip)c.getInventory(MapleInventoryType.EQUIPPED).getItem((byte)-8);
                    ak4 = ak4 + eqp8.getLuk();
                }
                if (q9 != null)
                {
                    IEquip eqp9 = (IEquip)c.getInventory(MapleInventoryType.EQUIPPED).getItem((byte)-9);
                    ak4 = ak4 + eqp9.getLuk();
                }
                if (q10 != null)
                {
                    IEquip eqp10 = (IEquip)c.getInventory(MapleInventoryType.EQUIPPED).getItem((byte)-10);
                    ak4 = ak4 + eqp10.getLuk();
                }
                if (q11 != null)
                {
                    IEquip eqp11 = (IEquip)c.getInventory(MapleInventoryType.EQUIPPED).getItem((byte)-11);
                    ak4 = ak4 + eqp11.getLuk();
                }
                if (q13 != null)
                {
                    IEquip eqp13 = (IEquip)c.getInventory(MapleInventoryType.EQUIPPED).getItem((byte)-13);
                    ak4 = ak4 + eqp13.getLuk();
                }
                if (q14 != null)
                {
                    IEquip eqp14 = (IEquip)c.getInventory(MapleInventoryType.EQUIPPED).getItem((byte)-14);
                    ak4 = ak4 + eqp14.getLuk();
                }
                if (q15 != null)
                {
                    IEquip eqp15 = (IEquip)c.getInventory(MapleInventoryType.EQUIPPED).getItem((byte)-15);
                    ak4 = ak4 + eqp15.getLuk();
                }
                if (q16 != null)
                {
                    IEquip eqp16 = (IEquip)c.getInventory(MapleInventoryType.EQUIPPED).getItem((byte)-16);
                    ak4 = ak4 + eqp16.getLuk();
                }
                 if (q17 != null)
                {
                    IEquip eqp17 = (IEquip)c.getInventory(MapleInventoryType.EQUIPPED).getItem((byte)-17);
                    ak4 = ak4 + eqp17.getLuk();
                }
                  if (q18 != null)
                {
                    IEquip eqp20 = (IEquip)c.getInventory(MapleInventoryType.EQUIPPED).getItem((byte)-26);
                    ak4 = ak4 + eqp20.getLuk();
                }
                //计算智力
                 if (w1 != null)
                {
                    IEquip eqp1 = (IEquip)c.getInventory(MapleInventoryType.EQUIPPED).getItem((byte)-1);
                    ak5 = ak5 + eqp1.getInt();
                }
                if (w2 != null)
                {
                    IEquip eqp2 = (IEquip)c.getInventory(MapleInventoryType.EQUIPPED).getItem((byte)-2);
                   ak5 = ak5 + eqp2.getInt();
                 }
                if (w3 != null)
                {
                    IEquip eqp3 = (IEquip)c.getInventory(MapleInventoryType.EQUIPPED).getItem((byte)-3);
                    ak5 = ak5 + eqp3.getInt();
                }
                if (w4 != null)
                {
                    IEquip eqp4 = (IEquip)c.getInventory(MapleInventoryType.EQUIPPED).getItem((byte)-4);
                    ak5 = ak5 + eqp4.getInt();
                }
                if (w5 != null)
                {
                    IEquip eqp5 = (IEquip)c.getInventory(MapleInventoryType.EQUIPPED).getItem((byte)-5);
                    ak5 = ak5 + eqp5.getInt();
                }
                if (w6 != null)
                {
                    IEquip eqp6 = (IEquip)c.getInventory(MapleInventoryType.EQUIPPED).getItem((byte)-6);
                    ak5 = ak5 + eqp6.getInt();
                }
                if (w7 != null)
                {
                    IEquip eqp7 = (IEquip)c.getInventory(MapleInventoryType.EQUIPPED).getItem((byte)-7);
                    ak5 = ak5 + eqp7.getInt();
                }
                if (w8 != null)
                {
                    IEquip eqp8 = (IEquip)c.getInventory(MapleInventoryType.EQUIPPED).getItem((byte)-8);
                    ak5 = ak5 + eqp8.getInt();
                }
                if (w9 != null)
                {
                    IEquip eqp9 = (IEquip)c.getInventory(MapleInventoryType.EQUIPPED).getItem((byte)-9);
                    ak5 = ak5 + eqp9.getInt();
                }
                if (w10 != null)
                {
                    IEquip eqp10 = (IEquip)c.getInventory(MapleInventoryType.EQUIPPED).getItem((byte)-10);
                    ak5 = ak5 + eqp10.getInt();
                }
                if (w11 != null)
                {
                    IEquip eqp11 = (IEquip)c.getInventory(MapleInventoryType.EQUIPPED).getItem((byte)-11);
                    ak5 = ak5 + eqp11.getInt();
                }
                if (w13 != null)
                {
                    IEquip eqp13 = (IEquip)c.getInventory(MapleInventoryType.EQUIPPED).getItem((byte)-13);
                    ak5 = ak5 + eqp13.getInt();
                }
                if (w14 != null)
                {
                    IEquip eqp14 = (IEquip)c.getInventory(MapleInventoryType.EQUIPPED).getItem((byte)-14);
                    ak5 = ak5 + eqp14.getInt();
                }
                if (w15 != null)
                {
                    IEquip eqp15 = (IEquip)c.getInventory(MapleInventoryType.EQUIPPED).getItem((byte)-15);
                    ak5 = ak5 + eqp15.getInt();
                }
                if (w16 != null)
                {
                    IEquip eqp16 = (IEquip)c.getInventory(MapleInventoryType.EQUIPPED).getItem((byte)-16);
                    ak5 = ak5 + eqp16.getInt();
                }
                 if (w17 != null)
                {
                    IEquip eqp17 = (IEquip)c.getInventory(MapleInventoryType.EQUIPPED).getItem((byte)-17);
                    ak5 = ak5 + eqp17.getInt();
                }
                  if (w18 != null)
                {
                    IEquip eqp18 = (IEquip)c.getInventory(MapleInventoryType.EQUIPPED).getItem((byte)-26);//勋章
                    ak5 = ak5 + eqp18.getInt();
                }
           //戒指全属性
                 IItem a12 = c.getInventory(MapleInventoryType.EQUIPPED).getItem((byte)-12); //戒指
                 IItem a13 = c.getInventory(MapleInventoryType.EQUIPPED).getItem((byte)-13);
                 IItem a15 = c.getInventory(MapleInventoryType.EQUIPPED).getItem((byte)-15);
                 IItem a16 = c.getInventory(MapleInventoryType.EQUIPPED).getItem((byte)-16);
                 IItem a27 = c.getInventory(MapleInventoryType.EQUIPPED).getItem((byte)-27);
                 IItem a28 = c.getInventory(MapleInventoryType.EQUIPPED).getItem((byte)-28);

         //戒指攻击魔法
                 IItem 戒指 = c.getInventory(MapleInventoryType.EQUIPPED).getItem((byte)-12);
                 IItem 戒指1 = c.getInventory(MapleInventoryType.EQUIPPED).getItem((byte)-13);
                 IItem 戒指2 = c.getInventory(MapleInventoryType.EQUIPPED).getItem((byte)-15);
                 IItem 戒指3 = c.getInventory(MapleInventoryType.EQUIPPED).getItem((byte)-16);
                 IItem 戒指4 = c.getInventory(MapleInventoryType.EQUIPPED).getItem((byte)-27);
                 IItem 戒指5 = c.getInventory(MapleInventoryType.EQUIPPED).getItem((byte)-28);
                  int ak6 = 0;//戒指全属性
                  int ak7 = 0;//戒指全属性
                 //戒指全属性
                if (戒指 != null){
                    IEquip eqp12 = (IEquip)c.getInventory(MapleInventoryType.EQUIPPED).getItem((byte)-12);//戒指
                    ak6 = ak6 + eqp12.getDex() + eqp12.getInt() + eqp12.getLuk() + eqp12.getStr();
                    ak7 = ak7 + eqp12.getWatk() + eqp12.getMatk();
                }
                if (戒指1 != null){
                    IEquip eqp13 = (IEquip)c.getInventory(MapleInventoryType.EQUIPPED).getItem((byte)-13);//戒指
                    ak6 = ak6 + eqp13.getDex() + eqp13.getInt() + eqp13.getLuk() + eqp13.getStr();
                    ak7 = ak7 + eqp13.getWatk() + eqp13.getMatk();
                }
                if (戒指2 != null){
                    IEquip eqp13 = (IEquip)c.getInventory(MapleInventoryType.EQUIPPED).getItem((byte)-15);//戒指
                    ak6 = ak6 + eqp13.getDex() + eqp13.getInt() + eqp13.getLuk() + eqp13.getStr();
                    ak7 = ak7 + eqp13.getWatk() + eqp13.getMatk();
                }
                if (戒指3 != null){
                    IEquip eqp13 = (IEquip)c.getInventory(MapleInventoryType.EQUIPPED).getItem((byte)-16);//戒指
                    ak6 = ak6 + eqp13.getDex() + eqp13.getInt() + eqp13.getLuk() + eqp13.getStr();
                    ak7 = ak7 + eqp13.getWatk() + eqp13.getMatk();
                }
                if (戒指4 != null){
                    IEquip eqp13 = (IEquip)c.getInventory(MapleInventoryType.EQUIPPED).getItem((byte)-27);//戒指
                    ak6 = ak6 + eqp13.getDex() + eqp13.getInt() + eqp13.getLuk() + eqp13.getStr();
                    ak7 = ak7 + eqp13.getWatk() + eqp13.getMatk();
                }
                if (戒指5 != null){
                    IEquip eqp13 = (IEquip)c.getInventory(MapleInventoryType.EQUIPPED).getItem((byte)-28);//戒指
                    ak6 = ak6 + eqp13.getDex() + eqp13.getInt() + eqp13.getLuk() + eqp13.getStr();
                    ak7 = ak7 + eqp13.getWatk() + eqp13.getMatk();
                }
                 IItem 披风 = c.getInventory(MapleInventoryType.EQUIPPED).getItem((byte)-109);
                  if (披风 != null){
                    IEquip eqp30 = (IEquip)c.getInventory(MapleInventoryType.EQUIPPED).getItem((byte)-109);//时装披风
                    ak7 = ak7 + eqp30.getWatk() + eqp30.getMatk();
                }
                IItem 腰带 = c.getInventory(MapleInventoryType.EQUIPPED).getItem((byte)-29);//腰带
                if (腰带 != null){
                    IEquip eqp30 = (IEquip)c.getInventory(MapleInventoryType.EQUIPPED).getItem((byte)-29);//腰带
                    ak7 = ak7 + eqp30.getWatk() + eqp30.getMatk();
                    ak6 = ak6 + eqp30.getDex() + eqp30.getInt() + eqp30.getLuk() + eqp30.getStr();
                }
                IItem 头盔 = c.getInventory(MapleInventoryType.EQUIPPED).getItem((byte)-101);//时装头盔
                if (头盔 != null){
                    IEquip eqp = (IEquip)c.getInventory(MapleInventoryType.EQUIPPED).getItem((byte)-101);//时装头盔
                    ak7 = ak7 + eqp.getWatk() + eqp.getMatk();
                    ak6 = ak6 + eqp.getDex() + eqp.getInt() + eqp.getLuk() + eqp.getStr();
                }

         int 敏捷 = ak;  //计算敏捷
         int 攻击力 = ak1;  //计算攻击力
         int 力量 = ak3;  //计算力量
         int 运气 = ak4;  //计算运气
         int 智力 = ak5;  //计算智力
         int 戒指全属性 = ak6;  //计算戒指全属性
         int 戒指攻击力 = ak7;  //计算戒指攻击力
         Integer 火眼晶晶 = c.getBuffedValue(MapleBuffStat.SHARP_EYES);
         Integer 冒险岛勇士 = c.getBuffedValue(MapleBuffStat.MAPLE_WARRIOR);
         Integer 斗气集中 = c.getBuffedValue(MapleBuffStat.COMBO);
         Integer 英雄之回声 = c.getBuffedValue(MapleBuffStat.ECHO_OF_HERO);
         int 属性 = 15;

        if ((ret.skill != 14101006)&&(damage == 199999)){

          if ((c.getJob().getId() >= 0 && c.getJob().getId() <= 132) && (damage > 199998)) {//战士
           damage = (int)((double)c.getStr() + c.getLevel() * 30 + (double)(c.getDex() / (2+(0.5D) ))) * 15 + (力量 * 30) + (敏捷 * 10) + (运气 * 10) + (智力 * 10) + (攻击力 * 85) + (戒指全属性 * 20)+ (戒指攻击力 * 10) + (int)(Math.random() * 10000.0D);
          }
           if ((c.getJob().getId() >= 200 && c.getJob().getId() <= 232) && (damage > 199998)) {//法师
           damage = (int)((double)c.getInt() + c.getLevel() * 50 + (double)(c.getInt() / (2+(0.5D) ))) * 15 + (力量 * 10) + (敏捷 * 10) + (运气 * 10) + (智力 * 50) + (攻击力 * 100) + (戒指全属性 * 50)+ (戒指攻击力 * 30) + (int)(Math.random() * 10000.0D);
           }
          if ((c.getJob().getId() >= 300 && c.getJob().getId() <= 322) && (damage > 199998)) {//弓
           damage = (int)((double)c.getDex() + c.getLevel() * 30 + (double)(c.getStr() / (2+(0.5D) ))) * 15 + (力量 * 10) + (敏捷 * 25) + (运气 * 10) + (智力 * 10) + (攻击力 * 70) + (戒指全属性 * 10)+ (戒指攻击力 * 20)+ (int)(Math.random() * 10000.0D);//
          }
           if ((c.getJob().getId() >= 400 && c.getJob().getId() <= 422) && (damage > 199998)) {//飞侠
           damage = (int)((double)c.getLuk() + c.getLevel() * 30 + (double)(c.getDex() / (2+(0.5D) ))) * 15 + (力量 * 10) + (敏捷 * 10) + (运气 * 30) + (智力 * 10) + (攻击力 * 70) + (戒指全属性 * 10)+ (戒指攻击力 * 20)+ (int)(Math.random() * 10000.0D);//
          }
           if ((c.getJob().getId() >= 510 && c.getJob().getId() <= 512) && (damage > 199998)) {//海盗
           damage = (int)((double)c.getStr() + c.getLevel() * 30 + (double)(c.getDex() / (2+(0.5D) ))) * 15 + (力量 * 30) + (敏捷 * 10) + (运气 * 10) + (智力 * 10) + (攻击力 * 60) + (戒指全属性 * 10)+ (戒指攻击力 * 10) + (int)(Math.random() * 10000.0D);
          }
           if ((c.getJob().getId() >= 520 && c.getJob().getId() <= 522) && (damage > 199998)) {//海盗/射手
           damage = (int)((double)c.getStr() + c.getLevel() * 30 + (double)(c.getDex() / (2+(0.5D) ))) * 15 + (力量 * 10) + (敏捷 * 25) + (运气 * 10) + (智力 * 10) + (攻击力 * 60) + (戒指全属性 * 10)+ (戒指攻击力 * 15) + (int)(Math.random() * 10000.0D);
          }
         //  if ((c.getJob().getId() >= 2000 && c.getJob().getId() <= 2112) && (damage > 199998)) { //战神
         // damage = (int)((double)c.getStr() + c.getLevel() * 30 + (double)(c.getDex() / (2+(0.5D) ))) * 15 + (力量 * 10) + (敏捷 * 20) + (运气 * 10) + (智力 * 10) + (攻击力 * 100) + (戒指全属性 * 20)+ (戒指攻击力 * 60) / 5;
         // }
           if (冒险岛勇士 != null) {
           damage = damage +(c.getTotalLuk() + c.getTotalDex() + c.getTotalStr() + c.getTotalInt()) * 属性 / 100 * 5;
          }
           if (火眼晶晶 != null) {
           damage += damage / 100 * 3;
          }
          if (斗气集中 != null) {
           damage += damage / 100 * 5;
          }
          if (英雄之回声 != null) {
           damage += damage / 100 * 1.5;
          }
           if (c.getvip() == 0)
             damage = Math.min(damage, 259999);//平民
           else if (c.getvip() == 1)
             damage = Math.min(damage, 299999);//老V1
           else if (c.getvip() == 2)
             damage = Math.min(damage, 359999);//点卷破功 1
           else if (c.getvip() == 3)
             damage = Math.min(damage, 399999);//点卷破功 2
           else if (c.getvip() == 4)
             damage = Math.min(damage, 459999); //V1  50
           else if (c.getvip() == 5)
             damage = Math.min(damage, 499999); //V2  100
           else if (c.getvip() == 6)
             damage = Math.min(damage, 559999); //V3  150
           else if (c.getvip() == 7)
             damage = Math.min(damage, 599999); //V4  200
           else if (c.getvip() >= 8) {
             damage = Math.min(damage, 2100000000); //V5  300
           }
          this.pvpMob = MapleLifeFactory.getMonster(9400711);
          c.getClient().getSession().write(MaplePacketCreator.damagePlayer(ret.numDamage, this.pvpMob.getId(), c.getId(), damage));

          c.getClient().getSession().write(MaplePacketCreator.sendHint("#r[实      际      伤      害]:#k"+ damage, 220, 5));
        }


        MapleStatEffect effect = null;
        if (ret.skill != 0) {
          effect = SkillFactory.getSkill(ret.skill).getEffect(c.getSkillLevel(SkillFactory.getSkill(ret.skill)));
        }
        if ((damage != 0) && (effect != null) && (effect.getFixedDamage() != 0)) {
          damage = effect.getFixedDamage();
        }
        allDamageNumbers.add(damage);
      }
      if (ret.skill != 5221004) {
        lea.skip(4);
      }
      ret.allDamage.add(new Pair(oid, allDamageNumbers));
    }
    return ret;
  }
   public List<FakeCharacter> getFakeChars() {
        return fakes;
    }

    protected class AttackInfo {

        public int numAttacked;
        public int numDamage;
        public int numAttackedAndDamage;
        public int skill;
        public int stance;
        public int direction;
        public int skillLevel;
        public int charge;
        public int pos;
        public int aresCombo;
        public List<Pair<Integer, List<Integer>>> allDamage;
        public boolean isHH = false;
        public int speed = 4;
        public Point position;

        protected AttackInfo() {
        }

        private MapleStatEffect getAttackEffect(MapleCharacter chr, ISkill theSkill) {
            ISkill mySkill = theSkill;
            if (mySkill == null) {
                mySkill = SkillFactory.getSkill(this.skill);
            }
            int skillLevel = chr.getSkillLevel(mySkill);
            if ((mySkill.getId() == 1009) || (mySkill.getId() == 10001009)) {
                skillLevel = 1;
            }
            if (skillLevel == 0) {
                return null;
            }
            return mySkill.getEffect(skillLevel);
        }

        public MapleStatEffect getAttackEffect(MapleCharacter chr) {
            return getAttackEffect(chr, null);
        }
    }
  public AttackInfo parseMesoExplosion(LittleEndianAccessor lea, AttackInfo ret)
  {

    if (ret.numAttackedAndDamage == 0)
    {

      lea.skip(10);
      int bullets = lea.readByte();
      for (int j = 0; j < bullets; j++)
      {
        int mesoid = lea.readInt();
        lea.skip(1);
        ret.allDamage.add(new Pair(mesoid, null));
      }
      return ret;
    }
    lea.skip(6);
    for (int i = 0; i < ret.numAttacked + 1; i++)
    {
      int oid = lea.readInt();
      if (i < ret.numAttacked)
      {
        lea.skip(12);
        int bullets = lea.readByte();

        List<Integer> allDamageNumbers = new ArrayList();
        for (int j = 0; j < bullets; j++)
        {
          int damage = lea.readInt();
          allDamageNumbers.add(damage);
        }
        ret.allDamage.add(new Pair(oid, allDamageNumbers));

        lea.skip(4);
      }
      else
      {
        int bullets = lea.readByte();
        for (int j = 0; j < bullets; j++)
        {
          int mesoid = lea.readInt();
          lea.skip(1);
          ret.allDamage.add(new Pair(mesoid, null));
        }
      }
    }
    return ret;
     }
  }