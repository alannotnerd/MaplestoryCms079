package net.sf.cherry.client;

import java.util.ArrayList;
import java.util.List;

import net.sf.cherry.provider.MapleData;
import net.sf.cherry.provider.MapleDataTool;
import net.sf.cherry.server.MapleStatEffect;
import net.sf.cherry.server.life.Element;

public class Skill
        implements ISkill {

    private int id;
    private List<MapleStatEffect> effects = new ArrayList();
    private Element element;
    private int animationTime;
    private boolean charge;
    private int skillType = 0;
    private int delay = 0;

    private Skill(int id) {
        this.id = id;
    }

    public int getId() {
        return this.id;
    }

    public static Skill loadFromData(int id, MapleData data) {
        Skill ret = new Skill(id);
        boolean isBuff = false;
        int skillType = MapleDataTool.getInt("skillType", data, -1);
        String elem = MapleDataTool.getString("elemAttr", data, null);
        if (elem != null) {
            ret.element = Element.getFromChar(elem.charAt(0));
        } else {
            ret.element = Element.NEUTRAL;
        }

        MapleData effect = data.getChildByPath("effect");
        if (skillType != -1) {
            if (skillType == 2) {
                isBuff = true;
            }
        } else {
            MapleData action = data.getChildByPath("action");
            MapleData hit = data.getChildByPath("hit");
            MapleData ball = data.getChildByPath("ball");
            isBuff = (effect != null) && (hit == null) && (ball == null);
            isBuff |= ((action != null) && (MapleDataTool.getString("0", action, "").equals("alert2")));
            switch (id) {
                case 1121001:  //磁石
                case 1121006:  //突进
                case 1221001:  //磁石
                case 1221007:  //突进
                case 1311005:  //龙之献祭
                case 1321001:
                case 1321003:
                case 2111002:
                case 2111003:
                case 2301002:
                case 3110001:
                case 3210001:
                case 4101005:
                case 4111003:
                case 4201004:
                case 4221006:
                case 5111004:
                case 5201006:
                case 9101000:
                case 14111001:
                case 20001006:
                case 20001007:
                case 21000000:
                case 21000002:
                case 21001001:
                case 21100000:
                case 21100001:
                case 21100002:
                case 21100004:
                case 21110000:
                case 21110002:
                case 21110003:
                case 21110004:
                case 21110006:
                case 21120001:
                case 21120002:
                case 21120004:
                case 21120005:
                case 21120006:
                case 21121008:
                    isBuff = false;
                    break;
                case 1001:
                case 1002:
                case 1004:
                case 1005:
                case 1001003:
                case 11101002://终极剑
                case 1101004:
                case 1101005:
                case 1101006:
                case 1101007:
                case 1111002:
                case 1111007:
                case 1121000:
                case 1121002:
                case 1121010:
                case 1121011:
                case 1201004:
                case 1201005:
                case 1201006:
                case 1201007:
                case 1211003:
                case 1211004:
                case 1211005:
                case 1211006:
                case 1211007:
                case 1211008:
                case 1211009:
                case 1221000:
                case 1221002:
                case 1221003:
                case 1221004:
                case 1221012:
                case 1301004:
                case 1301005:
                case 1301006:
                case 1301007:
                case 1311007:
                case 1311008:
                case 1320008:
                case 1320009:
                case 1321000:
                case 1321002:
                case 1321007:
                case 1321010:
                case 2001002:
                case 2001003:
                case 2101001:
                case 2101003:
                case 2111004:
                case 2111005:
                case 2121000:
                case 2121002:
                case 2121004:
                case 2121005:
                case 2121008:
                case 2201001:
                case 2201003:
                case 2211004:
                case 2211005:
                case 2221000:
                case 2221002:
                case 2221004:
                case 2221005:
                case 2221008:
                case 2301003:
                case 2301004:
                case 2311001:
                case 2311003:
                case 2311005:
                case 2311006:
                case 2321000:
                case 2321002:
                case 2321003:
                case 2321004:
                case 2321005:
                case 2321009:
                case 3001003:
                case 3101002:
                case 3101004:
                case 3111002:
                case 3111005:
                case 3121000:
                case 3121002:
                case 3121006:
                case 3121008:
                case 3121009:
                case 3201002:
                case 3201004:
                case 3211002:
                case 3211005:
                case 3221000:
                case 3221002:
                case 3221005:
                case 3221006:
                case 3221008:
                case 4001003:
                case 4101003:
                case 4101004:
                case 4111001:
                case 4111002:
                case 4121000:
                case 4121004:
                case 4121006:
                case 4121009:
                case 4201002:
                case 4201003:
                case 4211003:
                case 4211005:
                case 4221000:
                case 4221004:
                case 4221008:
                case 5111005:
                case 5121003:
                case 5211001:
                case 5211002:
                case 5220002:
                case 5221006:
                case 9001000:
                case 9001004:
                case 9101001:
                case 9101002:
                case 9101003:
                case 9101004:
                case 9101008:
                case 10000012:
                case 10001000:
                case 10001001:
                case 10001002:
                case 10001003:
                case 10001004:
                case 10001005:
                case 11001001:
                case 11001004:
                case 11101001:
                case 11101003:
                case 11101004:
                case 11101005:
                case 11111001:
                case 11111007:
                case 12001001:
                case 12001002:
                case 12001004:
                case 12101000:
                case 12101001:
                case 12101004:
                case 12101005:
                case 12111002:
                case 12111004:
                case 13001002:
                case 13001004:
                case 13101001:
                case 13101003:
                case 13101005:
                case 13101006:
                case 13111004:
                case 13111005:
                case 14001003:
                case 14001005:
                case 14100005:
                case 14101002:
                case 14101003:
                case 14111000:
                case 15000000:
                case 15001003:
                case 15001004:
                case 15100004:
                case 15101002:
                case 15101006:
                case 15111001:
                case 15111002:
                case 15111005:
                case 15111006:
                case 15111007:
                case 20001001:
                case 20001002:
                case 20001004:
                case 20001005:
                case 20001010:
                case 20001011:
                case 21001003:
                case 21100005:
                case 21101003:
                case 21111001:
                case 21111005:
                case 21120007:
                case 21121000:
                case 21121003:
                case 5001005://疾驰
                case 5110001:
                    isBuff = true;
            }
        }

        MapleData keydown = data.getChildByPath("keydown");
        if (keydown != null) {
            ret.charge = true;
        }
        for (MapleData level : data.getChildByPath("level")) {
            MapleStatEffect statEffect = MapleStatEffect.loadSkillEffectFromData(level, id, isBuff, level.getName());
            ret.effects.add(statEffect);
        }
        ret.animationTime = 0;
        if (effect != null) {
            for (MapleData effectEntry : effect) {
                ret.animationTime += MapleDataTool.getIntConvert("delay", effectEntry, 0);
            }
        }
        return ret;
    }

    @Override
    public MapleStatEffect getEffect(int level) {
        return (MapleStatEffect) this.effects.get(level - 1);
    }

    public int getMaxLevel() {
        return this.effects.size();
    }

    public boolean canBeLearnedBy(MapleJob job) {
        int jid = job.getId();
        int skillForJob = this.id / 10000;
        if ((jid / 100 != skillForJob / 100) && (skillForJob / 100 != 0)) {
            return false;
        }
        if (skillForJob / 10 % 10 > jid / 10 % 10) {
            return false;
        }

        return skillForJob % 10 <= jid % 10;
    }

    public boolean isFourthJob() {
        return this.id / 10000 % 10 == 2;
    }

    public Element getElement() {
        return this.element;
    }

    public int getAnimationTime() {
        return this.animationTime;
    }
public int getSkillType() {
        return this.skillType;
    }
public int getDelay() {
        return this.delay;
    }
    public boolean isBeginnerSkill() {
        boolean output = false;
        String idString = String.valueOf(this.id);
        if ((idString.length() == 4) || (idString.length() == 1)) {
            output = true;
        }
        return output;
    }

    public boolean hasCharge() {
        return this.charge;
    }
}