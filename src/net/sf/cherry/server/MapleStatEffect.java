package net.sf.cherry.server;

import java.awt.Point;
import java.awt.Rectangle;
import java.io.Serializable;
import java.lang.ref.WeakReference;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.Collections;
import java.util.List;
import java.util.Map;
import java.util.concurrent.ScheduledFuture;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import net.sf.cherry.client.IItem;
import net.sf.cherry.client.ISkill;
import net.sf.cherry.client.MapleBuffStat;
import net.sf.cherry.client.MapleCharacter;
import net.sf.cherry.client.MapleDisease;
import net.sf.cherry.client.MapleInventory;
import net.sf.cherry.client.MapleInventoryType;
import net.sf.cherry.client.MapleJob;
import net.sf.cherry.client.MaplePet;
import net.sf.cherry.client.MapleStat;
import net.sf.cherry.client.SkillFactory;
import net.sf.cherry.client.status.MonsterStatus;
import net.sf.cherry.client.status.MonsterStatusEffect;
import net.sf.cherry.net.channel.ChannelServer;
import net.sf.cherry.net.world.PlayerCoolDownValueHolder;
import net.sf.cherry.provider.MapleData;
import net.sf.cherry.provider.MapleDataTool;
import net.sf.cherry.server.life.MapleMonster;
import net.sf.cherry.server.maps.MapleDoor;
import net.sf.cherry.server.maps.MapleMap;
import net.sf.cherry.server.maps.MapleMapObject;
import net.sf.cherry.server.maps.MapleMapObjectType;
import net.sf.cherry.server.maps.MapleMist;
import net.sf.cherry.server.maps.MapleSummon;
import net.sf.cherry.server.maps.SummonMovementType;
import net.sf.cherry.tools.ArrayMap;
import net.sf.cherry.tools.MaplePacketCreator;
import net.sf.cherry.tools.Pair;

public class MapleStatEffect
        implements Serializable {

    static final long serialVersionUID = 9179541993413738569L;
    private static Logger log = LoggerFactory.getLogger(MapleStatEffect.class);
    private short watk;
    private short matk;
    private short wdef;
    private short mdef;
    private short acc;
    private short avoid;
    private short hands;
    private short speed;
    private short jump;
    private short hp;
    private short mp;
    private double hpR;
    private double mpR;
    private short mpCon;
    private short hpCon;
    private int duration;
    private boolean overTime;
    private int sourceid;
    private int moveTo;
    private boolean skill;
    private List<Pair<MapleBuffStat, Integer>> statups;
    private Map<MonsterStatus, Integer> monsterStatus;
    private int x;
    private int y;
    private int z;
    private double prop;
    private int itemCon;
    private int itemConNo;
    private int fixDamage;
    private int damage;
    private int attackCount;
    private int bulletCount;
    private int bulletConsume;
    private Point lt;
    private Point rb;
    private int mobCount;
    private int moneyCon;
    private int cooldown;
    private boolean isMorph = false;
    private int morphId = 0;
    private List<MapleDisease> cureDebuffs;
    private int mastery;
    private int range;
    private String remark;
    public MapleStatEffect effect;
    /**
     * ***********<战神之盾>*************
     */
    private int time;

    public String getRemark() {
        return this.remark;
    }

    public static MapleStatEffect loadSkillEffectFromData(MapleData source, int skillid, boolean overtime, String lvl) {
        return loadFromData(source, skillid, true, overtime, "Level " + lvl);
    }

    public static MapleStatEffect loadItemEffectFromData(MapleData source, int itemid) {
        return loadFromData(source, itemid, false, false, "");
    }

    private static void addBuffStatPairToListIfNotZero(List<Pair<MapleBuffStat, Integer>> list, MapleBuffStat buffstat, Integer val) {
        if (val.intValue() != 0) {
            list.add(new Pair(buffstat, val));
        }
    }

    private static MapleStatEffect loadFromData(MapleData source, int sourceid, boolean skill, boolean overTime, String remarrk) {
        MapleStatEffect ret = new MapleStatEffect();
        ret.duration = MapleDataTool.getIntConvert("time", source, -1);
        ret.hp = (short) MapleDataTool.getInt("hp", source, 0);
        ret.hpR = (MapleDataTool.getInt("hpR", source, 0) / 100.0D);
        ret.mp = (short) MapleDataTool.getInt("mp", source, 0);
        ret.mpR = (MapleDataTool.getInt("mpR", source, 0) / 100.0D);
        ret.mpCon = (short) MapleDataTool.getInt("mpCon", source, 0);
        ret.hpCon = (short) MapleDataTool.getInt("hpCon", source, 0);
        int iprop = MapleDataTool.getInt("prop", source, 100);
        ret.prop = (iprop / 100.0D);
        ret.attackCount = MapleDataTool.getInt("attackCount", source, 1);
        ret.mobCount = MapleDataTool.getInt("mobCount", source, 1);
        ret.cooldown = MapleDataTool.getInt("cooltime", source, 0);
        ret.morphId = MapleDataTool.getInt("morph", source, 0);
        ret.isMorph = (ret.morphId > 0);
        ret.remark = remarrk;
        ret.sourceid = sourceid;
        ret.skill = skill;

        if ((!ret.skill) && (ret.duration > -1)) {
            ret.overTime = true;
        } else {
            ret.duration *= 1000;
            ret.overTime = overTime;
        }
        ArrayList statups = new ArrayList();

        ret.watk = (short) MapleDataTool.getInt("pad", source, 0);
        ret.wdef = (short) MapleDataTool.getInt("pdd", source, 0);
        ret.matk = (short) MapleDataTool.getInt("mad", source, 0);
        ret.mdef = (short) MapleDataTool.getInt("mdd", source, 0);
        ret.acc = (short) MapleDataTool.getIntConvert("acc", source, 0);
        ret.hands = (short) MapleDataTool.getInt("hands", source, 0);
        ret.avoid = (short) MapleDataTool.getInt("eva", source, 0);
        ret.speed = (short) MapleDataTool.getInt("speed", source, 0);
        ret.jump = (short) MapleDataTool.getInt("jump", source, 0);
        if ((ret.overTime) && (ret.getSummonMovementType() == null)) {
            addBuffStatPairToListIfNotZero(statups, MapleBuffStat.WATK, Integer.valueOf(ret.watk));
            addBuffStatPairToListIfNotZero(statups, MapleBuffStat.WDEF, Integer.valueOf(ret.wdef));
            addBuffStatPairToListIfNotZero(statups, MapleBuffStat.MATK, Integer.valueOf(ret.matk));
            addBuffStatPairToListIfNotZero(statups, MapleBuffStat.MDEF, Integer.valueOf(ret.mdef));
            addBuffStatPairToListIfNotZero(statups, MapleBuffStat.ACC, Integer.valueOf(ret.acc));
            addBuffStatPairToListIfNotZero(statups, MapleBuffStat.HANDS, Integer.valueOf(ret.hands));
            addBuffStatPairToListIfNotZero(statups, MapleBuffStat.AVOID, Integer.valueOf(ret.avoid));
            addBuffStatPairToListIfNotZero(statups, MapleBuffStat.SPEED, Integer.valueOf(ret.speed));
            addBuffStatPairToListIfNotZero(statups, MapleBuffStat.JUMP, Integer.valueOf(ret.jump));
            addBuffStatPairToListIfNotZero(statups, MapleBuffStat.MORPH, Integer.valueOf(ret.morphId));
        }

        MapleData ltd = source.getChildByPath("lt");
        if (ltd != null) {
            ret.lt = ((Point) ltd.getData());
            ret.rb = ((Point) source.getChildByPath("rb").getData());
        }

        int x = MapleDataTool.getInt("x", source, 0);
        ret.x = x;
        ret.y = MapleDataTool.getInt("y", source, 0);
        ret.z = MapleDataTool.getInt("z", source, 0);
        ret.damage = MapleDataTool.getIntConvert("damage", source, 100);
        ret.bulletCount = MapleDataTool.getIntConvert("bulletCount", source, 1);
        ret.bulletConsume = MapleDataTool.getIntConvert("bulletConsume", source, 0);
        ret.moneyCon = MapleDataTool.getIntConvert("moneyCon", source, 0);

        ret.itemCon = MapleDataTool.getInt("itemCon", source, 0);
        ret.itemConNo = MapleDataTool.getInt("itemConNo", source, 0);
        ret.fixDamage = MapleDataTool.getInt("fixdamage", source, 0);

        ret.moveTo = MapleDataTool.getInt("moveTo", source, -1);

        ret.mastery = MapleDataTool.getIntConvert("mastery", source, 0);
        ret.range = MapleDataTool.getIntConvert("range", source, 0);
        List localCureDebuffs = new ArrayList();
        if (MapleDataTool.getInt("poison", source, 0) > 0) {
            localCureDebuffs.add(MapleDisease.POISON);
        }
        if (MapleDataTool.getInt("seal", source, 0) > 0) {
            localCureDebuffs.add(MapleDisease.SEAL);
        }
        if (MapleDataTool.getInt("darkness", source, 0) > 0) {
            localCureDebuffs.add(MapleDisease.DARKNESS);
        }
        if (MapleDataTool.getInt("weakness", source, 0) > 0) {
            localCureDebuffs.add(MapleDisease.WEAKEN);
        }
        if (MapleDataTool.getInt("curse", source, 0) > 0) {
            localCureDebuffs.add(MapleDisease.CURSE);
        }
        ret.cureDebuffs = localCureDebuffs;

        Map monsterStatus = new ArrayMap();

        if (skill) {
            switch (sourceid) {
                case 2001002:
                case 12001001:
                    statups.add(new Pair(MapleBuffStat.MAGIC_GUARD, Integer.valueOf(x)));
                    break;
                case 2301003: //神之保护
                    statups.add(new Pair(MapleBuffStat.INVINCIBLE, Integer.valueOf(x)));
                    break;
                case 9001004://管理员隐身
                    ret.duration = 7200000;//永久延迟
                    ret.overTime = true; //使用限制
                case 4001003://冒险家隐身
                case 14001003://骑士团隐身
                    statups.add(new Pair(MapleBuffStat.DARKSIGHT, Integer.valueOf(x)));
                    break;
                case 4211003:
                    statups.add(new Pair(MapleBuffStat.PICKPOCKET, Integer.valueOf(x)));
                    break;
                case 4211005:
                    statups.add(new Pair(MapleBuffStat.MESOGUARD, Integer.valueOf(x)));
                    break;
                case 4111001:
                    statups.add(new Pair(MapleBuffStat.MESOUP, Integer.valueOf(x)));
                    break;
                case 4111002:
                case 14111000:
                    statups.add(new Pair(MapleBuffStat.SHADOWPARTNER, Integer.valueOf(x)));
                    break;
                case 3101004:
                case 3201004:
                case 2311002:
                case 13101003:
                    statups.add(new Pair(MapleBuffStat.SOULARROW, Integer.valueOf(x)));
                    break;
                case 1211003:
                case 1211004:
                case 1211005:
                case 1211006:
                case 1211007:
                case 1211008:
                case 1221003:
                case 15111006:
                case 1221004:

                case 15101006://闪光击
                case 21111005:
                    statups.add(new Pair(MapleBuffStat.WK_CHARGE, Integer.valueOf(x)));
                    break;
                //statups.add(new Pair<MapleBuffStat, Integer>(MapleBuffStat.矛连击强化, 100));
                case 21000000: //矛连击强化
                    statups.add(new Pair<MapleBuffStat, Integer>(MapleBuffStat.矛连击强化, 100));
                    statups.add(new Pair<MapleBuffStat, Integer>(MapleBuffStat.矛连击强化防御, 100));
                    statups.add(new Pair<MapleBuffStat, Integer>(MapleBuffStat.矛连击强化魔法防御, 100));
                    break;
                case 21110000: //爆击强化
                    statups.add(new Pair<MapleBuffStat, Integer>(MapleBuffStat.矛连击强化, 100));
                    statups.add(new Pair(MapleBuffStat.暴击, Integer.valueOf(ret.x << 8 | ret.y)));
                    break;
                case 21100005: //连环吸血
                    statups.add(new Pair(MapleBuffStat.连环吸血, Integer.valueOf(x)));
                    break;
                case 21111001: //灵巧击退
                    statups.add(new Pair<MapleBuffStat, Integer>(MapleBuffStat.灵巧击退, Integer.valueOf(ret.x)));
                    break;
                case 21120007://战神之盾/ 1000.0) * damage
                    statups.add(new Pair<MapleBuffStat, Integer>(MapleBuffStat.战神之盾, Integer.valueOf(1)));
                    break;
                case 21101003://抗压
                    statups.add(new Pair<MapleBuffStat, Integer>(MapleBuffStat.抗压, Integer.valueOf(ret.x)));
                    break;
                case 21110005:
                    statups.add(new Pair(MapleBuffStat.WK_CHARGE, Integer.valueOf(x)));
                    monsterStatus.put(MonsterStatus.SPEED, Integer.valueOf(ret.x));
                    break;
                case 1101004:
                case 1101005:
                case 1201004:
                case 1201005:
                case 1301004:
                case 1301005:
                case 2111005:
                case 2211005:
                case 3101002:
                case 3201002:
                case 4101003:
                case 4201002:
                case 5101006:
                case 5201003:
                case 11101001:
                case 12101004:
                case 13101001:
                case 14101002:
                case 15101002:
                case 21001003:
                    statups.add(new Pair(MapleBuffStat.BOOSTER, Integer.valueOf(x)));
                    break;
                case 5121009:
                case 15111005:
                    statups.add(new Pair(MapleBuffStat.SPEED_INFUSION, Integer.valueOf(x)));
                    break;
                case 1101006:
                case 11101003:
                    statups.add(new Pair(MapleBuffStat.WDEF, Integer.valueOf(ret.wdef)));
                case 1121010:
                    statups.add(new Pair(MapleBuffStat.WATK, Integer.valueOf(ret.watk)));
                    break;
                case 1301006:
                    statups.add(new Pair(MapleBuffStat.MDEF, Integer.valueOf(ret.mdef)));
                case 1001003:
                    statups.add(new Pair(MapleBuffStat.WDEF, Integer.valueOf(ret.wdef)));
                    break;
                case 2001003:
                    statups.add(new Pair(MapleBuffStat.WDEF, Integer.valueOf(ret.wdef)));
                    break;
                case 2101001:
                case 2201001:
                    statups.add(new Pair(MapleBuffStat.MATK, Integer.valueOf(ret.matk)));
                    break;
                case 4101004:
                case 4201003:
                case 9001001:
                    statups.add(new Pair(MapleBuffStat.SPEED, Integer.valueOf(ret.speed)));
                    statups.add(new Pair(MapleBuffStat.JUMP, Integer.valueOf(ret.jump)));
                    break;
                case 2301004://祝福
                    statups.add(new Pair(MapleBuffStat.避免冲突mask, Integer.valueOf(ret.x/2)));
                    //statups.add(new Pair(MapleBuffStat.WDEF, Integer.valueOf(ret.wdef)));
                    //statups.add(new Pair(MapleBuffStat.MDEF, Integer.valueOf(ret.mdef)));
                case 3001003:
                    statups.add(new Pair(MapleBuffStat.ACC, Integer.valueOf(ret.acc)));
                    statups.add(new Pair(MapleBuffStat.AVOID, Integer.valueOf(ret.avoid)));
                    break;
                case 9001003:
                    statups.add(new Pair(MapleBuffStat.MATK, Integer.valueOf(ret.matk)));
                case 3121008:
                    statups.add(new Pair(MapleBuffStat.WATK, Integer.valueOf(ret.watk)));
                    break;
                case 5001005:
                case 15001003:
                    statups.add(new Pair(MapleBuffStat.疾驰移动, Integer.valueOf(ret.x *2)));//初始值3
                    statups.add(new Pair(MapleBuffStat.疾驰跳跃, Integer.valueOf(ret.y *2)));//初始值4
                    //statups.add(new Pair(MapleBuffStat.JUMP, Integer.valueOf(ret.y)));
                    break;
                case 11101002:
                case 3100001:
                    statups.add(new Pair(MapleBuffStat.终极剑_弓, Integer.valueOf(x)));
                    break;
                case 5110001: //能量获得
                case 15100004:
                    //statups.add(new Pair<MapleBuffStat, Integer>(MapleBuffStat.能量, Integer.valueOf(10000))); //满能量时才能发动
                    // statups.add(new Pair(MapleBuffStat.疾驰移动, Integer.valueOf(ret.x * 3)));//初始值3
                    // statups.add(new Pair(MapleBuffStat.疾驰移动, Integer.valueOf(x)));//初始值3
                    statups.add(new Pair<MapleBuffStat, Integer>(MapleBuffStat.能量, Integer.valueOf(15000)));
                    //statups.add(new Pair(MapleBuffStat.能量, Integer.valueOf(ret.x)));//初始值4
                    break;
                case 1101007:
                case 1201007:
                case 21100003:
                    statups.add(new Pair(MapleBuffStat.POWERGUARD, Integer.valueOf(x)));
                    break;
                case 1301007:
                case 9001008:
                    statups.add(new Pair(MapleBuffStat.HYPERBODYHP, Integer.valueOf(x)));
                    statups.add(new Pair(MapleBuffStat.HYPERBODYMP, Integer.valueOf(ret.y)));
                    break;
                case 1001:
                case 10001001:
                case 20001001:
                    statups.add(new Pair(MapleBuffStat.RECOVERY, Integer.valueOf(x)));
                    break;
                case 1111002:
                case 11111001:
                    statups.add(new Pair(MapleBuffStat.COMBO, Integer.valueOf(1)));
                    break;
                case 1011:
                case 20001011:
                    statups.add(new Pair(MapleBuffStat.BERSERK_FURY, Integer.valueOf(1)));
                    break;
                case 1004:
                case 5221008:
                case 10001004:
                case 20001004:
                    statups.add(new Pair(MapleBuffStat.骑宠技能, Integer.valueOf(1)));
                    break;
                case 5221006://武装
                    statups.add(new Pair(MapleBuffStat.骑宠技能, Integer.valueOf(1)));
                    break;
                case 1311006:
                    ret.hpR = (-x / 100.0D);
                    break;
                case 1311008:
                    statups.add(new Pair(MapleBuffStat.DRAGONBLOOD, Integer.valueOf(ret.x)));
                    break;
                case 1121000:
                case 1221000:
                case 1321000:
                case 2121000:
                case 2221000://冒险岛勇士
                case 2321000:
                case 3121000:
                case 3221000:
                case 4121000:
                case 4221000:
                case 5121000:
                case 5221000:
                case 21121000:
                    statups.add(new Pair(MapleBuffStat.MAPLE_WARRIOR, Integer.valueOf(ret.x)));
                    break;
                case 3121002:
                case 3221002:
                    statups.add(new Pair(MapleBuffStat.SHARP_EYES, Integer.valueOf(ret.x << 8 | ret.y)));
                    break;
                case 1321007:
                case 2221005:
                case 2311006:
                case 2321003:
                case 3121006:
                case 5211001:
                case 5211002:
                case 5220002:
                case 11001004:
                case 12001004:
                case 12111004:
                case 13001004:
                case 14001005:
                case 15001004:
                    statups.add(new Pair(MapleBuffStat.SUMMON, Integer.valueOf(1)));
                    break;
                case 2311003:
                case 9001002:
                    statups.add(new Pair(MapleBuffStat.HOLY_SYMBOL, Integer.valueOf(x)));
                    break;
                case 4121006:
                    statups.add(new Pair(MapleBuffStat.SHADOW_CLAW, Integer.valueOf(0)));
                    break;
                case 2121004:
                case 2221004:
                case 2321004:
                    statups.add(new Pair(MapleBuffStat.INFINITY, Integer.valueOf(x)));
                    break;
                case 1121002:
                case 1221002:
                case 1321002:
                case 21121003:
                    statups.add(new Pair(MapleBuffStat.STANCE, Integer.valueOf(iprop)));
                    break;
                case 1005:
                    statups.add(new Pair(MapleBuffStat.ECHO_OF_HERO, Integer.valueOf(ret.x)));
                    break;
                case 2121002:
                case 2221002:
                case 2321002:
                    statups.add(new Pair(MapleBuffStat.MANA_REFLECTION, Integer.valueOf(1)));
                    break;
                case 2321005:
                    statups.add(new Pair(MapleBuffStat.HOLY_SHIELD, Integer.valueOf(x)));
                    break;
                case 3111002:
                case 3211002:
                    statups.add(new Pair(MapleBuffStat.PUPPET, Integer.valueOf(1)));
                    break;
                case 4001002:
                    monsterStatus.put(MonsterStatus.WATK, Integer.valueOf(ret.x));
                    monsterStatus.put(MonsterStatus.WDEF, Integer.valueOf(ret.y));
                    break;
                case 1201006:
                    monsterStatus.put(MonsterStatus.WATK, Integer.valueOf(ret.x));
                    monsterStatus.put(MonsterStatus.WDEF, Integer.valueOf(ret.y));
                    break;
                case 1111005:
                case 1111006:
                case 1111008:
                case 1211002:
                case 3101005:
                case 4211002:
                case 4221007:
                case 5101002:
                case 5101003:
                case 5121004:
                case 5121005:
                case 5121007:
                case 5201004:
                case 11111003:
                    monsterStatus.put(MonsterStatus.STUN, Integer.valueOf(1));
                    break;
                case 4121003:
                case 4221003:
                    monsterStatus.put(MonsterStatus.TAUNT, Integer.valueOf(ret.x));
                    monsterStatus.put(MonsterStatus.MDEF, Integer.valueOf(ret.x));
                    monsterStatus.put(MonsterStatus.WDEF, Integer.valueOf(ret.x));
                    break;
                case 4121004:
                case 4221004:
                    monsterStatus.put(MonsterStatus.NINJA_AMBUSH, Integer.valueOf(1));
                    break;
                case 2121006:
                case 2201004:
                case 2211002:
                case 2211006:
                case 2221007:
                case 3211003:
                case 5211005:
                case 21120006:
                    monsterStatus.put(MonsterStatus.FREEZE, Integer.valueOf(1));
                    ret.duration *= 2; //持续时间
                    break;
                case 2121003:
                case 2221003:
                    monsterStatus.put(MonsterStatus.POISON, Integer.valueOf(1));
                    monsterStatus.put(MonsterStatus.FREEZE, Integer.valueOf(1));
                    break;
                case 2101003:
                case 2201003:
                    monsterStatus.put(MonsterStatus.SPEED, Integer.valueOf(ret.x));
                    break;
                case 2101005:
                case 2111006: //火毒
                case 14111006://毒炸弹
                    monsterStatus.put(MonsterStatus.POISON, Integer.valueOf(1));
                    break;
                case 2311005:
                    monsterStatus.put(MonsterStatus.DOOM, Integer.valueOf(1));
                    break;
                case 3111005:
                case 3211005:
                case 13111004:
                    statups.add(new Pair(MapleBuffStat.SUMMON, Integer.valueOf(1)));
                    monsterStatus.put(MonsterStatus.STUN, Integer.valueOf(1));
                    break;
                case 2121005:
                case 3221005:
                    statups.add(new Pair(MapleBuffStat.SUMMON, Integer.valueOf(1)));
                    monsterStatus.put(MonsterStatus.FREEZE, Integer.valueOf(1));
                    break;
                case 2111004:
                case 2211004:
                case 12111002:
                    monsterStatus.put(MonsterStatus.SEAL, Integer.valueOf(1));
                    break;
                case 4111003:
                case 14111001:
                    monsterStatus.put(MonsterStatus.SHADOW_WEB, Integer.valueOf(1));
                    break;
                case 3121007:
                    statups.add(new Pair(MapleBuffStat.HAMSTRING, Integer.valueOf(x)));
                    monsterStatus.put(MonsterStatus.SPEED, Integer.valueOf(x));
                    break;
                case 3221006:
                    statups.add(new Pair(MapleBuffStat.BLIND, Integer.valueOf(x)));
                    monsterStatus.put(MonsterStatus.ACC, Integer.valueOf(x));
                    break;
                case 5221009:
                    monsterStatus.put(MonsterStatus.HYPNOTIZED, Integer.valueOf(1));
                    break;
            }

        }

        if ((ret.isMorph()) && (!ret.isPirateMorph())) {
            statups.add(new Pair(MapleBuffStat.MORPH, Integer.valueOf(ret.getMorph())));
        }

        ret.monsterStatus = monsterStatus;

        statups.trimToSize();
        ret.statups = statups;

        return ret;
    }

    public void applyPassive(MapleCharacter applyto, MapleMapObject obj, int attack) {
        if (makeChanceResult()) {
            switch (this.sourceid) {
                case 2100000:
                case 2200000:
                case 2300000:
                    if ((obj == null) || (obj.getType() != MapleMapObjectType.MONSTER)) {
                        return;
                    }
                    MapleMonster mob = (MapleMonster) obj;

                    if (mob.isBoss()) {
                        break;
                    }
                    int absorbMp = Math.min((int) (mob.getMaxMp() * (getX() / 100.0D)), mob.getMp());
                    if (absorbMp <= 0) {
                        break;
                    }
                    mob.setMp(mob.getMp() - absorbMp);
                    applyto.addMP(absorbMp);
                    applyto.getClient().getSession().write(MaplePacketCreator.showOwnBuffEffect(this.sourceid, 1));
                    applyto.getMap().broadcastMessage(applyto, MaplePacketCreator.showBuffeffect(applyto.getId(), sourceid, 1, (byte) 3), false);
            }
        }
    }

    public boolean applyTo(MapleCharacter chr) {
        return applyTo(chr, chr, true, null);
    }

    public boolean applyTo(MapleCharacter chr, Point pos) {
        return applyTo(chr, chr, true, pos);
    }

    private boolean applyTo(MapleCharacter applyfrom, MapleCharacter applyto, boolean primary, Point pos) {
        int hpchange = calcHPChange(applyfrom, primary);
        int mpchange = calcMPChange(applyfrom, primary);

        if ((primary)
                && (this.itemConNo != 0)) {
            MapleInventoryType type = MapleItemInformationProvider.getInstance().getInventoryType(this.itemCon);
            MapleInventoryManipulator.removeById(applyto.getClient(), type, this.itemCon, this.itemConNo, false, true);
            //System.out.println("1");
        }

        if (this.cureDebuffs.size() > 0) {
            for (MapleDisease debuff : this.cureDebuffs) {
                applyfrom.dispelDebuff(debuff);
            }//System.out.println("2");
        }
        List hpmpupdate = new ArrayList(2);
        if ((!primary) && (isResurrection())) {
            hpchange = applyto.getMaxHp();
            applyto.setStance(0);
            //System.out.println("3");
        }
        if ((isDispel()) && (makeChanceResult())) {
            applyto.dispelDebuffs();
            //System.out.println("4");
        }
        if (isHeroWill()) {
            applyto.cancelAllDebuffs();
            //System.out.println("5");
        }
        if (hpchange != 0) {
            if ((hpchange < 0) && (-hpchange > applyto.getHp())) {
                return false;
            }
            int newHp = applyto.getHp() + hpchange;
            if (newHp < 1) {
                newHp = 1;
            }
            applyto.setHp(newHp);
            hpmpupdate.add(new Pair(MapleStat.HP, Integer.valueOf(applyto.getHp())));
            //System.out.println("6");
        }
        if (mpchange != 0) {
            if ((mpchange < 0) && (-mpchange > applyto.getMp())) {
                return false;
            }
            applyto.setMp(applyto.getMp() + mpchange);
            hpmpupdate.add(new Pair(MapleStat.MP, Integer.valueOf(applyto.getMp())));
            //System.out.println("7");
        }
        applyto.getClient().getSession().write(MaplePacketCreator.updatePlayerStats(hpmpupdate, true));
        if (this.moveTo != -1) {
            MapleMap target = null;
            boolean nearest = false;
            if (this.moveTo == 999999999) {
                nearest = true;
                if (applyto.getMap().getReturnMapId() != 999999999) {
                    target = applyto.getMap().getReturnMap();
                }
            } else {
                target = ChannelServer.getInstance(applyto.getClient().getChannel()).getMapFactory().getMap(this.moveTo);
                int targetMapId = target.getId() / 10000000;
                int charMapId = applyto.getMapId() / 10000000;
                if ((targetMapId != 60) && (charMapId != 61)
                        && (targetMapId != 21) && (charMapId != 20)
                        && (targetMapId != 12) && (charMapId != 10)
                        && (targetMapId != 10) && (charMapId != 12)
                        && (targetMapId != charMapId)) {
                    log.info("人物 {} 尝试回到一个非法的位置 ({}->{})", new Object[]{applyto.getName(), Integer.valueOf(applyto.getMapId()), Integer.valueOf(target.getId())});
                    //applyto.getClient().disconnect();
                    return false;
                }

            }

            if ((target == applyto.getMap()) || ((nearest) && (applyto.getMap().isTown()))) {
                return false;
            }
        }
        if (isComboRecharge()) {
            applyto.setCombo((short) Math.min(30000, applyto.getCombo() + y));
            //SkillFactory.getSkill(21000000).getEffect(10).applyComboBuff(applyto, applyto.getCombo());
        }
        if (isShadowClaw()) {
            MapleInventory use = applyto.getInventory(MapleInventoryType.USE);
            MapleItemInformationProvider mii = MapleItemInformationProvider.getInstance();
            int projectile = 0;
            for (int i = 0; i < 255; i++) {
                IItem item = use.getItem((byte) i);
                if (item != null) {
                    boolean isStar = mii.isThrowingStar(item.getItemId());
                    if ((isStar) && (item.getQuantity() >= 200)) {
                        projectile = item.getItemId();
                        break;
                    }
                }
            }
            if (projectile == 0) {
                return false;
            }
            MapleInventoryManipulator.removeById(applyto.getClient(), MapleInventoryType.USE, projectile, 200, false, true);
        }

        if (this.overTime) {
            applyBuffEffect(applyfrom, applyto, primary);
            //System.out.println("8");
        }
        if ((primary) && ((this.overTime) || (isHeal()))) {
            applyBuff(applyfrom);
            //System.out.println("9");
        }
        if ((primary) && (isMonsterBuff())) {
            applyMonsterBuff(applyfrom);
            //System.out.println("10");
        }

        SummonMovementType summonMovementType = getSummonMovementType();
        if ((summonMovementType != null) && (pos != null)) {
            MapleSummon tosummon = new MapleSummon(applyfrom, this.sourceid, pos, summonMovementType);
            if (!tosummon.isPuppet()) {
                applyfrom.getCheatTracker().resetSummonAttack();
            }
            applyfrom.getMap().spawnSummon(tosummon);
            applyfrom.getSummons().put(Integer.valueOf(this.sourceid), tosummon);
            tosummon.addHP(this.x);
            if (isBeholder()) {
                tosummon.addHP(1);
            }
        }
        /*if (overTime || isCygnusFA()) {
         applyBuffEffect(applyfrom, applyto, primary);
         }*/
        if (isMagicDoor()) {
            Point doorPosition = new Point(applyto.getPosition());
            MapleDoor door = new MapleDoor(applyto, doorPosition);
            applyto.getMap().spawnDoor(door);
            applyto.addDoor(door);
            door = new MapleDoor(door);
            applyto.addDoor(door);
            door.getTown().spawnDoor(door);
            if (applyto.getParty() != null) {
                applyto.silentPartyUpdate();
            }
            applyto.disableDoor();
        } else if (isMist()) { //雾
            Rectangle bounds = calculateBoundingBox(applyfrom.getPosition(), applyfrom.isFacingLeft());
            MapleMist mist = new MapleMist(bounds, applyfrom, this);
            applyfrom.getMap().spawnMist(mist, getDuration(), false);
        }
        if (isTimeLeap()) { //时间跳跃
            for (PlayerCoolDownValueHolder i : applyto.getAllCooldowns()) {
                if (i.skillId != 5121010) {
                    applyto.removeCooldown(i.skillId);
                }
            }
        }
        if (isHide()) {
            if (applyto.isHidden()) {
                applyto.getMap().broadcastMessage(applyto, MaplePacketCreator.removePlayerFromMap(applyto.getId()), false);
                applyto.getClient().getSession().write(MaplePacketCreator.giveGmHide(true));
            } else {
                applyto.getClient().getSession().write(MaplePacketCreator.giveGmHide(false));
                applyto.getMap().broadcastMessage(applyto, MaplePacketCreator.spawnPlayerMapobject(applyto), false);
                for (MaplePet pet : applyto.getPets()) {
                    if (pet != null) {
                        applyto.getMap().broadcastMessage(applyto, MaplePacketCreator.showPet(applyto, pet, false, false), false);
                    }
                }
            }
        }
        return true;
    }

    public boolean applyReturnScroll(MapleCharacter applyto) {
        if ((this.moveTo != -1)
                && (applyto.getMap().getReturnMapId() != applyto.getMapId())) {
            MapleMap target;
            if (this.moveTo == 999999999) {
                target = applyto.getMap().getReturnMap();
            } else {
                target = ChannelServer.getInstance(applyto.getClient().getChannel()).getMapFactory().getMap(this.moveTo);
                if ((target.getId() / 10000000 != 60) && (applyto.getMapId() / 10000000 != 61)
                        && (target.getId() / 10000000 != 21) && (applyto.getMapId() / 10000000 != 20)
                        && (target.getId() / 10000000 != applyto.getMapId() / 10000000)) {
                    return false;
                }

            }

            applyto.changeMap(target, target.getPortal(0));
            return true;
        }

        return false;
    }

    private void applyBuff(MapleCharacter applyfrom) {
        if ((isPartyBuff()) && ((applyfrom.getParty() != null) || (isGMBuff()))) {
            Rectangle bounds = calculateBoundingBox(applyfrom.getPosition(), applyfrom.isFacingLeft());
            List<MapleMapObject> affecteds = applyfrom.getMap().getMapObjectsInRect(bounds, Arrays.asList(MapleMapObjectType.PLAYER));
            List<MapleCharacter> affectedp = new ArrayList<MapleCharacter>(affecteds.size());
            for (MapleMapObject affectedmo : affecteds) {
                MapleCharacter affected = (MapleCharacter) affectedmo;

                if ((affected != null) && (isHeal()) && (affected != applyfrom) && (affected.getParty() == applyfrom.getParty()) && (affected.isAlive())) {
                    int expadd = (int) (calcHPChange(applyfrom, true) / 10 * (applyfrom.getClient().getChannelServer().getExpRate() + (Math.random() * 10.0D + 30.0D)) * (Math.floor(Math.random() * applyfrom.getSkillLevel(SkillFactory.getSkill(2301002)) / 100.0D) * (applyfrom.getLevel() / 30)));
                    if (affected.getHp() < affected.getMaxHp() - affected.getMaxHp() / 20) {
                        applyfrom.gainExp(expadd, true, false, false);
                    }
                }
                if ((affected != applyfrom) && ((isGMBuff()) || (applyfrom.getParty().equals(affected.getParty())))) {
                    boolean isRessurection = isResurrection();
                    if (((isRessurection) && (!affected.isAlive())) || ((!isRessurection) && (affected.isAlive()))) {
                        affectedp.add(affected);
                    }
                    if (isTimeLeap()) {
                        for (PlayerCoolDownValueHolder i : affected.getAllCooldowns()) {
                            if (i.skillId != 5121010) {
                                affected.removeCooldown(i.skillId);
                            }
                        }
                    }
                }
            }
            for (MapleCharacter affected : affectedp) {
                // TODO actually heal (and others) shouldn't recalculate everything
                // for heal this is an actual bug since heal hp is decreased with the number
                // of affected players
                applyTo(applyfrom, affected, false, null);
                affected.getClient().getSession().write(MaplePacketCreator.showOwnBuffEffect(sourceid, 2));
                affected.getMap().broadcastMessage(affected, MaplePacketCreator.showBuffeffect(affected.getId(), sourceid, 2, (byte) 3), false);
            }
        }
    }

    private void applyMonsterBuff(MapleCharacter applyfrom) {
        Rectangle bounds = calculateBoundingBox(applyfrom.getPosition(), applyfrom.isFacingLeft());
        List<MapleMapObject> affected = applyfrom.getMap().getMapObjectsInRect(bounds, Arrays.asList(MapleMapObjectType.MONSTER));
        ISkill skill_ = SkillFactory.getSkill(this.sourceid);
        int i = 0;
        for (MapleMapObject mo : affected) {
            MapleMonster monster = (MapleMonster) mo;
            if (makeChanceResult()) {
                monster.applyStatus(applyfrom, new MonsterStatusEffect(getMonsterStati(), skill_, false), isPoison(), getDuration());
            }
            i++;
            if (i >= this.mobCount) {
                break;
            }
        }
    }

    public boolean is能量() {
        return skill && (sourceid == 5110001 || sourceid == 15100004);
    }

    private Rectangle calculateBoundingBox(Point posFrom, boolean facingLeft) {
        Point mylt;
        Point myrb;
        if (facingLeft) {
            mylt = new Point(lt.x + posFrom.x, lt.y + posFrom.y);
            myrb = new Point(rb.x + posFrom.x, rb.y + posFrom.y);
        } else {
            myrb = new Point(lt.x * -1 + posFrom.x, rb.y + posFrom.y);
            mylt = new Point(rb.x * -1 + posFrom.x, lt.y + posFrom.y);
        }
        Rectangle bounds = new Rectangle(mylt.x, mylt.y, myrb.x - mylt.x, myrb.y - mylt.y);
        return bounds;
    }

    public void silentApplyBuff(MapleCharacter chr, long starttime) {
        int localDuration = this.duration;
        localDuration = alchemistModifyVal(chr, localDuration, false);
        CancelEffectAction cancelAction = new CancelEffectAction(chr, this, starttime);
        ScheduledFuture schedule = TimerManager.getInstance().schedule(cancelAction, starttime + localDuration - System.currentTimeMillis());
        chr.registerEffect(this, starttime, schedule);
        SummonMovementType summonMovementType = getSummonMovementType();
        if (summonMovementType != null) { //召唤的移动类型
            MapleSummon tosummon = new MapleSummon(chr, this.sourceid, chr.getPosition(), summonMovementType);
            if (!tosummon.isPuppet()) {
                chr.getCheatTracker().resetSummonAttack();
                chr.getSummons().put(Integer.valueOf(this.sourceid), tosummon);
                tosummon.addHP(x);
            }
        }
    }

    private void applyBuffEffect(MapleCharacter applyfrom, MapleCharacter applyto, boolean primary) {
        if (!isMonsterRiding()) {
            applyto.cancelEffect(this, true, -1L);
        }
        List localstatups = this.statups;
        int localDuration = this.duration;
        int localsourceid = this.sourceid;
        if (isMonsterRiding()) {
            int ridingLevel = 0;
            IItem mount = applyfrom.getInventory(MapleInventoryType.EQUIPPED).getItem((byte) -18);
            if (mount != null) {
                ridingLevel = mount.getItemId();
            }
            localDuration = this.sourceid;
            localsourceid = ridingLevel;
            localstatups = Collections.singletonList(new Pair(MapleBuffStat.骑宠技能, Integer.valueOf(0)));
        }
        if (isBattleShip()) {
            int ridingLevel = 1932000;
            localDuration = this.sourceid;
            localsourceid = ridingLevel;
            localstatups = Collections.singletonList(new Pair(MapleBuffStat.骑宠技能, Integer.valueOf(0)));
        }
        if (primary) {
            localDuration = alchemistModifyVal(applyfrom, localDuration, false);
        }
        if (localstatups.size() > 0) {
            if (isDash()) {
                applyto.getClient().getSession().write(MaplePacketCreator.giveDash(statups, localDuration / 1000)); //????????????????
                //System.out.println("C1+A");
                //} else if (isInfusion()) {
                //applyto.getClient().getSession().write(MaplePacketCreator.giveInfusion(localDuration / 1000, this.x));
            }
            if (isDash2()) {
                applyto.getClient().getSession().write(MaplePacketCreator.giveDash2(statups, localDuration / 1000));
                //System.out.println("C2+A");
                //} else if (isInfusion()) {
                //applyto.getClient().getSession().write(MaplePacketCreator.giveInfusion(localDuration / 1000, this.x));
            } else {

                applyto.getClient().getSession().write(MaplePacketCreator.giveBuff(applyto, this.skill ? localsourceid : -localsourceid, localDuration, localstatups));
                //System.out.println("C3+A");
            }
        }
        if (sourceid == 5221006) {//hp
            if (applyto.getBattleshipHp() == 0) {
                applyto.resetBattleshipHp();
            }
        }
        if (isMonsterRiding()) {
            int ridingLevel = 0;
            IItem mount = applyfrom.getInventory(MapleInventoryType.EQUIPPED).getItem((byte) -18);
            if (mount != null) {
                ridingLevel = mount.getItemId();
                //System.out.println("--------1");
            }
            List stat = Collections.singletonList(new Pair(MapleBuffStat.骑宠技能, Integer.valueOf(1)));
            applyto.getMap().broadcastMessage(applyto, MaplePacketCreator.showMonsterRiding(applyto.getId(), stat, ridingLevel, this.sourceid), false);
            localDuration = this.duration;
            //System.out.println("--------1B");
        }
       
        if (isBattleShip()) {
            int ridingLevel = 1932000;
            List stat = Collections.singletonList(new Pair(MapleBuffStat.骑宠技能, Integer.valueOf(1)));
            applyto.getMap().broadcastMessage(applyto, MaplePacketCreator.showMonsterRiding(applyto.getId(), stat, ridingLevel, this.sourceid), false);
            localDuration = this.duration;
            //System.out.println("--------2");
        }
        if (isDs()) {
            List dsstat = Collections.singletonList(new Pair(MapleBuffStat.DARKSIGHT, Integer.valueOf(0)));
            applyto.getMap().broadcastMessage(applyto, MaplePacketCreator.giveForeignBuff(applyto, dsstat, this), false);
            //System.out.println("--------3");
        }
        if (isCombo()) {
            List stat = Collections.singletonList(new Pair(MapleBuffStat.COMBO, Integer.valueOf(1)));
            applyto.getMap().broadcastMessage(applyto, MaplePacketCreator.giveForeignBuff(applyto, stat, this), false);
            //System.out.println("--------4");
        }
        if (isShadowPartner()) {
            List stat = Collections.singletonList(new Pair(MapleBuffStat.SHADOWPARTNER, Integer.valueOf(0)));
            applyto.getMap().broadcastMessage(applyto, MaplePacketCreator.giveForeignBuff(applyto, stat, this), false);
            //System.out.println("--------5");
        }
        if (isSoulArrow()) {
            List stat = Collections.singletonList(new Pair(MapleBuffStat.SOULARROW, Integer.valueOf(0)));
            applyto.getMap().broadcastMessage(applyto, MaplePacketCreator.giveForeignBuff(applyto, stat, this), false);
            //System.out.println("--------6");
        }
        if (isEnrage()) {
            applyto.handleOrbconsume();
            //System.out.println("--------7");
        }
        if (isMorph()) {
            List stat = Collections.singletonList(new Pair(MapleBuffStat.MORPH, Integer.valueOf(this.morphId)));
            applyto.getMap().broadcastMessage(applyto, MaplePacketCreator.giveForeignBuff(applyto, stat, this), false);
            //System.out.println("--------8");
        }
        if (isPirateMorph()) {
            List stat = new ArrayList();
            stat.add(new Pair(MapleBuffStat.SPEED, Integer.valueOf(this.speed)));
            stat.add(new Pair(MapleBuffStat.MORPH, Integer.valueOf(this.morphId)));
            applyto.getMap().broadcastMessage(applyto, MaplePacketCreator.giveForeignBuff(applyto, stat, this), false);
            //System.out.println("--------8A");
        }
        if (isTimeLeap()) {
            for (PlayerCoolDownValueHolder i : applyto.getAllCooldowns()) {
                if (i.skillId != 5121010) {
                    applyto.removeCooldown(i.skillId);
                    //System.out.println("--------9");
                }
            }
        }
        if (localstatups.size() > 0) {
            long starttime = System.currentTimeMillis();
            CancelEffectAction cancelAction = new CancelEffectAction(applyto, this, starttime);
            ScheduledFuture schedule = TimerManager.getInstance().schedule(cancelAction, localDuration);
            applyto.registerEffect(this, starttime, schedule);
            //System.out.println("--------10");
        }
        if ((primary) && (!isHide())) {
            if (isDash()) {
               applyto.getMap().broadcastMessage(applyto, MaplePacketCreator.showDashEffecttoOthers(applyto.getId(), localstatups, localDuration / 1000), false);
                //System.out.println("--------11A+");
            }
            if (isDash2()) {
                applyto.getMap().broadcastMessage(applyto, MaplePacketCreator.showDashEffecttoOthers(applyto.getId(), localstatups, localDuration / 1000), false);
                //System.out.println("--------11B+");
            } else if (isInfusion()) {
                applyto.getMap().broadcastMessage(applyto, MaplePacketCreator.giveForeignInfusion(applyto.getId(), this.x, localDuration / 1000), false);
                //System.out.println("--------12");
            } else {
                 applyto.getMap().broadcastMessage(applyto, MaplePacketCreator.showBuffeffect(applyto.getId(), sourceid, 1, (byte) 3), false);
                //System.out.println("--------13+");
            }
        }
    }

    public final void applyComboBuff(MapleCharacter applyto, int combo) {
        ArrayList statups = new ArrayList();
        //statups.add(new Pair<MapleBuffStat, Integer>(MapleBuffStat.矛连击强化, watk));
        statups.add(new Pair<MapleBuffStat, Integer>(MapleBuffStat.矛连击强化, Integer.valueOf(combo / 50)));
        statups.add(new Pair<MapleBuffStat, Integer>(MapleBuffStat.矛连击强化防御, Integer.valueOf(combo / 2)));
        statups.add(new Pair<MapleBuffStat, Integer>(MapleBuffStat.矛连击强化魔法防御, Integer.valueOf(combo / 2)));
        applyto.getClient().getSession().write(MaplePacketCreator.giveBuff(applyto, this.sourceid, 99999, statups));
        final long starttime = System.currentTimeMillis();
        CancelEffectAction cancelAction = new CancelEffectAction(applyto, this, starttime);
        ScheduledFuture schedule = TimerManager.getInstance().schedule(cancelAction, 99999);
        applyto.registerEffect(this, starttime, schedule);
    }
    public final void 爆击强化(MapleCharacter applyto, int combo) {
        ArrayList statups = new ArrayList();
      //  statups.add(new Pair<MapleBuffStat, Integer>(MapleBuffStat.矛连击强化, watk));
        statups.add(new Pair<MapleBuffStat, Integer>(MapleBuffStat.矛连击强化, Integer.valueOf(combo / 10)));
      //  statups.add(new Pair(MapleBuffStat.暴击, Integer.valueOf(ret.x << 8 | ret.y)));
        statups.add(new Pair<MapleBuffStat, Integer>(MapleBuffStat.暴击, Integer.valueOf(combo / 10)));
        applyto.getClient().getSession().write(MaplePacketCreator.giveBuff(applyto, this.sourceid, 99999, statups));
        final long starttime = System.currentTimeMillis();
        CancelEffectAction cancelAction = new CancelEffectAction(applyto, this, starttime);
        ScheduledFuture schedule = TimerManager.getInstance().schedule(cancelAction, 99999);
        applyto.registerEffect(this, starttime, schedule);
    }
    public final void 检测buff(MapleCharacter applyto, int 类型) {
		ArrayList statups = new ArrayList();
		if (类型 == 1) {
			statups.add(new Pair<MapleBuffStat, Integer>(MapleBuffStat.命中率检测, Integer.valueOf(getAcc())));
			applyto.getClient().getSession().write(MaplePacketCreator.giveBuff(applyto, 9001009, 99999, statups)); // 祝福
		}
		if (类型 == 2) {
			// statups.add(new Pair<MapleBuffStat, Integer>(MapleBuffStat.攻击力检测,
			// Integer.valueOf(20)));
			statups.add(new Pair<MapleBuffStat, Integer>(MapleBuffStat.魔法力检测, Integer.valueOf(0)));
			statups.add(new Pair<MapleBuffStat, Integer>(MapleBuffStat.防御力检测, Integer.valueOf(80)));
			statups.add(new Pair<MapleBuffStat, Integer>(MapleBuffStat.魔法防御力检测, Integer.valueOf(80)));
			statups.add(new Pair<MapleBuffStat, Integer>(MapleBuffStat.手技检测, Integer.valueOf(0)));
			statups.add(new Pair<MapleBuffStat, Integer>(MapleBuffStat.命中率检测, Integer.valueOf(0)));
			statups.add(new Pair<MapleBuffStat, Integer>(MapleBuffStat.回避率检测, Integer.valueOf(50)));
			applyto.getClient().getSession().write(MaplePacketCreator.giveBuff(applyto, 1320009, 99999, statups)); // 灵魂祝福
			final long starttime = System.currentTimeMillis();
			CancelEffectAction cancelAction = new CancelEffectAction(applyto, this, starttime);
			ScheduledFuture schedule = TimerManager.getInstance().schedule(cancelAction, 99999);
			applyto.registerEffect(this, starttime, schedule);
		}
		if (类型 == 3) {
			statups.add(new Pair<MapleBuffStat, Integer>(MapleBuffStat.手技检测, Integer.valueOf(0)));
			statups.add(new Pair<MapleBuffStat, Integer>(MapleBuffStat.命中率检测, Integer.valueOf(0)));
			statups.add(new Pair<MapleBuffStat, Integer>(MapleBuffStat.回避率检测, Integer.valueOf(0)));
			applyto.getClient().getSession().write(MaplePacketCreator.giveBuff(applyto, 1002, 99999, statups));
			final long starttime = System.currentTimeMillis();
			CancelEffectAction cancelAction = new CancelEffectAction(applyto, this, starttime);
			ScheduledFuture schedule = TimerManager.getInstance().schedule(cancelAction, 99999);
			applyto.registerEffect(this, starttime, schedule);
		}

    }
    private int calcHPChange(MapleCharacter applyfrom, boolean primary) {
        int hpchange = 0;
        if (this.hp != 0) {
            if (!this.skill) {
                if (primary) {
                    hpchange += alchemistModifyVal(applyfrom, this.hp, true);
                } else {
                    hpchange += this.hp;
                }
            } else {
                hpchange += makeHealHP(this.hp / 100.0D, applyfrom.getTotalMagic(), 3.0D, 5.0D);
            }
        }
        if (this.hpR != 0.0D) {
            hpchange += (int) (applyfrom.getCurrentMaxHp() * this.hpR);
            applyfrom.checkBerserk();
        }
        if ((primary)
                && (this.hpCon != 0)) {
            hpchange -= this.hpCon;
        }

        if (isChakra()) {
            hpchange += makeHealHP(getY() / 100.0D, applyfrom.getTotalLuk(), 2.3D, 3.5D);
        }
        if (isPirateMpRecovery()) {
            hpchange = (int) (hpchange - getX() / 100.0D * applyfrom.getCurrentMaxHp());
        }
        return hpchange;
    }

    private int makeHealHP(double rate, double stat, double lowerfactor, double upperfactor) {
        int maxHeal = (int) (stat * upperfactor * rate);
        int minHeal = (int) (stat * lowerfactor * rate);
        return (int) (Math.random() * (maxHeal - minHeal + 1) + minHeal);
    }

    private int calcMPChange(MapleCharacter applyfrom, boolean primary) {
        int mpchange = 0;
        if (this.mp != 0) {
            if (primary) {
                mpchange += alchemistModifyVal(applyfrom, this.mp, true);
            } else {
                mpchange += this.mp;
            }
        }
        if (this.mpR != 0.0D) {
            mpchange += (int) (applyfrom.getCurrentMaxMp() * this.mpR);
        }
        if ((primary)
                && (this.mpCon != 0)) {
            double mod = 1.0D;
            boolean isAFpMage = applyfrom.getJob().isA(MapleJob.FP_MAGE);//如果是火毒
            if ((isAFpMage) || (applyfrom.getJob().isA(MapleJob.IL_MAGE))) {//如果是冰雷
                ISkill amp;
                if (isAFpMage) {//如果是火毒
                    amp = SkillFactory.getSkill(2110001);
                } else { //如果是冰雷
                    amp = SkillFactory.getSkill(2210001);
                }
                int ampLevel = applyfrom.getSkillLevel(amp);
                if (ampLevel > 0) {
                    MapleStatEffect ampStat = amp.getEffect(ampLevel);
                    mod = ampStat.getX() / 100.0D;
                }
            }
            mpchange = (int) (mpchange - this.mpCon * mod);
            if (applyfrom.getBuffedValue(MapleBuffStat.INFINITY) != null) {
                mpchange = 0;
            }
        }

        if (isPirateMpRecovery()) {
            mpchange = (int) (mpchange + getY() * getX() / 10000.0D * applyfrom.getCurrentMaxHp());
        }
        return mpchange;
    }

    private int alchemistModifyVal(MapleCharacter chr, int val, boolean withX) {
        if ((!this.skill) && ((chr.getJob().isA(MapleJob.HERMIT)) || (chr.getJob().isA(MapleJob.NIGHTLORD)))) {
            MapleStatEffect alchemistEffect = getAlchemistEffect(chr);
            if (alchemistEffect != null) {
                return (int) (val * ((withX ? alchemistEffect.getX() : alchemistEffect.getY()) / 100.0D));
            }
        }
        return val;
    }

    private MapleStatEffect getAlchemistEffect(MapleCharacter chr) {
        ISkill alchemist = SkillFactory.getSkill(4110000);
        int alchemistLevel = chr.getSkillLevel(alchemist);
        if (alchemistLevel == 0) {
            return null;
        }
        return alchemist.getEffect(alchemistLevel);
    }

    public void setSourceId(int newid) {
        this.sourceid = newid;
    }

    private boolean isGMBuff() {
        switch (this.sourceid) {
            case 1005:
            case 9001000:
            case 9001001:
            case 9001002:
            case 9001003:
            case 9001005:
            case 9001008:
                return true;
        }
        return false;
    }

    private boolean isMonsterBuff() {
        if (!this.skill) {
            return false;
        }
        switch (this.sourceid) {
            case 1201006:
            case 2101003:
            case 2111004:
            case 2201003:
            case 2211004:
            case 2311005:
            case 4111003:
            case 4121004:
            case 4421004:
                return true;
        }
        return false;
    }

    private boolean isPartyBuff() {
        if ((this.lt == null) || (this.rb == null)) {
            return false;
        }

        return ((this.sourceid < 1211003) || (this.sourceid > 1211008)) && (this.sourceid != 1221003) && (this.sourceid != 1221004);
    }

    public boolean isHeal() {
        return (this.sourceid == 2301002) || (this.sourceid == 9001000);
    }

    private boolean isCygnusFA() {
        return skill && (sourceid == 11101002 || sourceid == 3100001);
    }

    public boolean isResurrection() {
        return (this.sourceid == 9001005) || (this.sourceid == 2321006);
    }

    public boolean isTimeLeap() {
        return this.sourceid == 5121010;
    }

    public boolean isInfusion() {
        return false;
    }

    public short getHp() {
        return this.hp;
    }

    public short getMp() {
        return this.mp;
    }

    public int getMpCon() {
        return this.mpCon;
    }

    public short getWatk() {
        return this.watk;
    }

    public short getMatk() {
        return this.matk;
    }

    public short getWdef() {
        return this.wdef;
    }

    public short getMdef() {
        return this.mdef;
    }

    public short getAcc() {
        return this.acc;
    }

    public short getAvoid() {
        return this.avoid;
    }

    public short getHands() {
        return this.hands;
    }

    public short getSpeed() {
        return this.speed;
    }

    public short getJump() {
        return this.jump;
    }

    public int getDuration() {
        return this.duration;
    }

    public boolean isOverTime() {
        return this.overTime;
    }

    public List<Pair<MapleBuffStat, Integer>> getStatups() {
        return this.statups;
    }

    public boolean sameSource(MapleStatEffect effect) {
        return (this.sourceid == effect.sourceid) && (this.skill == effect.skill);
    }

    public int getX() {
        return this.x;
    }

    public int getY() {
        return this.y;
    }

    public int getZ() {
        return this.z;
    }

    public int getDamage() {
        return this.damage;
    }

    public int getAttackCount() {
        return this.attackCount;
    }

    public int getMobCount() {
        return this.mobCount;
    }

    public int getBulletCount() {
        return this.bulletCount;
    }

    public int getBulletConsume() {
        return this.bulletConsume;
    }

    public int getMoneyCon() {
        return this.moneyCon;
    }

    public int getCooldown() {
        return this.cooldown;
    }

    public Map<MonsterStatus, Integer> getMonsterStati() {
        return this.monsterStatus;
    }

    public boolean isHide() {
        return (this.skill) && (this.sourceid == 9001004);
    }

    public boolean isDragonBlood() {
        return (this.skill) && (this.sourceid == 1311008);
    }

    public boolean isBerserk() {
        return (this.skill) && (this.sourceid == 1320006);
    }

    private boolean isDs() {
        return (this.skill) && (this.sourceid == 4001003);
    }

    private boolean isCombo() {
        return ((this.skill) && (this.sourceid == 1111002)) || ((this.skill) && (this.sourceid == 11111001));
    }

    private boolean isEnrage() {
        return (this.skill) && (this.sourceid == 1121010);
    }

    public boolean isBeholder() {
        return (this.skill) && (this.sourceid == 1321007);
    }

    private boolean isShadowPartner() {
        return (this.skill) && (this.sourceid == 4111002);
    }

    private boolean isChakra() {
        return (this.skill) && (this.sourceid == 4211001);
    }

    private boolean isPirateMpRecovery() {
        return (this.skill) && (this.sourceid == 5101005);
    }

    public boolean isMonsterRiding() {
        return (this.skill) && ((this.sourceid % 20000000 == 1004) || (this.sourceid == 5221006));
    }

    private boolean isBattleShip() {
        return (this.skill) && (this.sourceid == 5221006);
    }

    public boolean isMagicDoor() { //时空门
        return (this.skill) && (this.sourceid == 2311002);
    }

    public boolean isMesoGuard() {
        return (this.skill) && (this.sourceid == 4211005);
    }

    public boolean isCharge() {
        return (this.skill) && (this.sourceid >= 1211003) && (this.sourceid <= 1211008);
    }

    public boolean isPoison() {
        return (this.skill) && ((this.sourceid == 2111003) || (this.sourceid == 2101005) || (this.sourceid == 2111006) || (this.sourceid == 14111006));
    }

    private boolean isMist() {
        return (this.skill) && ((this.sourceid == 2111003) || (this.sourceid == 4221006));
    }

    private boolean isSoulArrow() {
        return (this.skill) && ((this.sourceid == 3101004) || (this.sourceid == 3201004) || (this.sourceid == 13101003));
    }

    private boolean isShadowClaw() {
        return (this.skill) && (this.sourceid == 4121006);
    }

    private boolean isDispel() {
        return (this.skill) && ((this.sourceid == 2311001) || (this.sourceid == 9001000));
    }

    private boolean isHeroWill() {
        return (this.skill) && ((this.sourceid == 1121011) || (this.sourceid == 1221012) || (this.sourceid == 1321010) || (this.sourceid == 2121008) || (this.sourceid == 2221008) || (this.sourceid == 2321009) || (this.sourceid == 3121009) || (this.sourceid == 3221008) || (this.sourceid == 4121009) || (this.sourceid == 4221008) || (this.sourceid == 5121008) || (this.sourceid == 5221010));
    }

    public boolean isComboMove() {
        return (this.skill) && ((this.sourceid == 21100004) || (this.sourceid == 21100005) || (this.sourceid == 21110003) || (this.sourceid == 21110004) || (this.sourceid == 21120006) || (this.sourceid == 21120007));
    }

    /*  private boolean isDash() {
     return (this.skill) && (this.sourceid == 5001005);
     }*/
    public boolean isPirateMorph() {
        return (this.skill) && ((this.sourceid == 5111005) || (this.sourceid == 5121003));
    }

    public boolean isMorph() {
        return this.morphId > 0;
    }

    public int getMorph() {
        return this.morphId;
    }

    public SummonMovementType getSummonMovementType() {
        if (!this.skill) {
            return null;
        }
        switch (this.sourceid) {
            case 3111002:
            case 3211002:
            case 5211001:
            case 5220002:
                return SummonMovementType.STATIONARY;
            case 2311006:
            case 3111005:
            case 3121006:
            case 3211005:
            case 3221005:
            case 5211002:
                return SummonMovementType.CIRCLE_FOLLOW;
            case 1321007:
            case 2121005:
            case 2221005:
            case 2321003:
            case 11001004:
            case 12001004:
            case 12111004:
            case 13001004:
            case 14001005:
            case 15001004:
                return SummonMovementType.FOLLOW;
        }
        return null;
    }

    public boolean isSkill() {
        return this.skill;
    }

    public int getSourceId() {
        return this.sourceid;
    }

    public double getIProp() {
        return this.prop * 100.0D;
    }

    public int getMastery() {
        return this.mastery;
    }

    public int getRange() {
        return this.range;
    }

    public int getFixedDamage() {
        return this.fixDamage;
    }

    public String getBuffString() {
        StringBuilder sb = new StringBuilder();
        sb.append("WATK: ");
        sb.append(this.watk);
        sb.append(", ");
        sb.append("WDEF: ");
        sb.append(this.wdef);
        sb.append(", ");
        sb.append("MATK: ");
        sb.append(this.matk);
        sb.append(", ");
        sb.append("MDEF: ");
        sb.append(this.mdef);
        sb.append(", ");
        sb.append("ACC: ");
        sb.append(this.acc);
        sb.append(", ");
        sb.append("HANDS: ");
        sb.append(this.hands);
        sb.append(", ");
        sb.append("AVOID: ");
        sb.append(this.avoid);
        sb.append(", ");
        sb.append("SPEED: ");
        sb.append(this.speed);
        sb.append(", ");
        sb.append("JUMP: ");
        sb.append(this.jump);
        sb.append(".");

        return sb.toString();
    }

    public boolean makeChanceResult() {
        return (this.prop == 1.0D) || (Math.random() < this.prop);
    }

    public boolean is武装() {
        return this.sourceid == 5221006;
    }

    public boolean is矛连击强化() {
        return this.sourceid == 21000000;
    }

    public boolean is矛连击强化防御() {
        return this.sourceid == 21000000;
    }

    public boolean is矛连击强化魔法防御() {
        return this.sourceid == 21000000;
    }

    public boolean isDash() {
        return this.sourceid == 5001005 || sourceid == 5110001;
    }

    public final boolean isComboRecharge() {
        return skill && sourceid == 21111009;
    }

    private boolean isDash2() {
        return this.sourceid == 15100003; //To change body of generated methods, choose Tools | Templates.
    }

    public static class CancelEffectAction implements Runnable {

        private MapleStatEffect effect;
        private WeakReference<MapleCharacter> target;
        private long startTime;

        public CancelEffectAction(MapleCharacter target, MapleStatEffect effect, long startTime) {
            this.effect = effect;
            this.target = new WeakReference(target);
            this.startTime = startTime;
        }

        public void run() {
            MapleCharacter realTarget = (MapleCharacter) this.target.get();
            if (realTarget != null) {
                if ((realTarget.inCS()) || (realTarget.inMTS())) {
                    realTarget.addToCancelBuffPackets(this.effect, this.startTime);
                    return;
                }
                realTarget.cancelEffect(this.effect, false, this.startTime);
            }
        }
    }
}
