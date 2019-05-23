/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
package net.sf.cherry.net.Constants;

import java.sql.Timestamp;
import java.util.Date;
import java.util.SimpleTimeZone;

import net.sf.cherry.client.ISkill;
import net.sf.cherry.client.MapleInventoryType;
import net.sf.cherry.client.MapleWeaponType;
import net.sf.cherry.client.Skill;


public class GameConstants {

    public final static int LOCK = 0x01;
    public final static int SPIKES = 0x02;
    public final static int COLD = 0x04;
    public final static int UNTRADEABLE = 0x08;
    public final static int KARMA = 0x10;
    public final static int PET_COME = 0x80;
    public final static int UNKNOWN_SKILL = 0x100;
    public final static float ITEM_ARMOR_EXP = 1 / 350000;
    public static final float ITEM_WEAPON_EXP = 1 / 700000;
    public static boolean 封包显示 = true;//true = 开  false = 关
    public final static long FT_UT_OFFSET = 116444592000000000L; // EDT
    public final static long MAX_TIME = 150842304000000000L; //00 80 05 BB 46 E6 17 02
    public static final long FINAL_TIME = 3439785600000L;
    public final static long ZERO_TIME = 94354848000000000L; //00 40 E0 FD 3B 37 4F 01
    public final static long PERMANENT = 150841440000000000L; // 00 C0 9B 90 7D E5 17 02
    public final static long TIME_HOURS_STEP = 60L * 60L * 1000L;
    public static int 单机IP = 1;

    public static long getKoreanTimestamp(final long realTimestamp) {
        return getTime(realTimestamp);
    }

    public static long getTime(long realTimestamp) {
        if (realTimestamp == -1) {
            return MAX_TIME;
        } else if (realTimestamp == -2) {
            return ZERO_TIME;
        } else if (realTimestamp == -3) {
            return PERMANENT;
        }
        return ((realTimestamp * 10000) + FT_UT_OFFSET);
    }

    public static MapleWeaponType getWeaponType(int itemId) {
        int cat = itemId / 10000;
        cat %= 100;
        switch (cat) {
            case 30:
                return MapleWeaponType.SWORD1H;
            case 31:
                return MapleWeaponType.AXE1H;
            case 32:
                return MapleWeaponType.BLUNT1H;
            case 33:
                return MapleWeaponType.DAGGER;
            case 37:
                return MapleWeaponType.WAND;
            case 38:
                return MapleWeaponType.STAFF;
            case 40:
                return MapleWeaponType.SWORD2H;
            case 41:
                return MapleWeaponType.AXE2H;
            case 42:
                return MapleWeaponType.BLUNT2H;
            case 43:
                return MapleWeaponType.SPEAR;
            case 44:
                return MapleWeaponType.POLE_ARM;
            case 45:
                return MapleWeaponType.BOW;
            case 46:
                return MapleWeaponType.CROSSBOW;
            case 47:
                return MapleWeaponType.CLAW;
            case 48:
                return MapleWeaponType.KNUCKLE;
            case 49:
                return MapleWeaponType.GUN;
        }
        return MapleWeaponType.NOT_A_WEAPON;
    }

    public static boolean 结婚戒指(int itemid) {
        switch (itemid) {
            case 1112001:
            case 1112002:
            case 1112003:
                return true;
        }
        return false;
    }

    public static boolean 不检测全屏技能(int SkillID) {
        switch (SkillID) {
            case 1311006:
            case 1221011:
            case 2121007:
            case 12111003:
            case 2221007:
            case 2321008:
            case 21120006:
                return true;
        }
        return false;
    }

    public static boolean 不检测技能(int SkillID) {
        switch (SkillID) {
            case 1321001:
            case 1121001:
            case 1221001:
            case 1111008:
            case 1121006:
            case 1221007:
            case 1321003:
            case 21100002:
            case 21100004:
            case 21110004:
            case 1311006:
            case 1221011:
            case 2121007:
            case 12111003:
            case 2221007:
            case 2321008:
            case 21120006:
                return true;
        }
        return false;
    }

    public static long getFileTimestamp(long timeStampinMillis, boolean roundToMinutes) {
        if (SimpleTimeZone.getDefault().inDaylightTime(new Date())) {
            timeStampinMillis -= 3600000L;
        }
        long time;
        if (roundToMinutes) {
            time = (timeStampinMillis / 1000 / 60) * 600000000;
        } else {
            time = timeStampinMillis * 10000;
        }
        return time + FT_UT_OFFSET;
    }

    public static boolean is豆豆装备(int itemId) {
        switch (itemId) {
            //帽子
            case 1002695://幽灵帽
            case 1002609://兔耳魔法帽
            case 1002665://西红柿帽
            case 1002985://豆箱帽子
            case 1002986://蝙蝠怪面具
            case 1002761://枫叶面具
            case 1002760://地球帽
            case 1002583://蝙蝠客头套
            case 1002543://板栗帽
            case 1002448://紫色头巾

            //衣服
            case 1052137://西红柿外套

            //盾牌
            case 1092051://啤酒杯盾牌

            //武器
            case 1702232://我的朋友金猎犬
            case 1702138://大火腿

            //坐骑
            case 1902031:
            case 1902032:
            case 1902033:
            case 1902034:
            case 1902035:
            case 1902036:
            case 1902037:
            //鞍子
            case 1912024:
            case 1912025:
            case 1912026:
            case 1912027:
            case 1912028:
            case 1912029:
            case 1912030:
                return true;
        }
        return false;
    }

    public static boolean 等级奖励(int quest) {
        switch (quest) {
            case 4760:
            case 4761:
            case 4762:
            case 4763:
            case 4764:
            case 4765:
            case 4766:
            case 4767:
            case 4768:
            case 4769:
            case 4770:
            case 4771:
                return true;
        }
        return false;
    }
    public static boolean 屏蔽吸怪检测地图(int mapid) {
        switch (mapid) {
            case 925100500:
                return true;
        }
        return false;
    }
    

    public static boolean is宠物技能道具(int itemId) {
        switch (itemId) {
            case 5190000://捡道具技能
            case 5190001://自动服用HP药水技能
            case 5190002://扩大移动范围技能
            case 5190003://范围自动捡起功能
            case 5190004://捡起无所有权道具&amp;金币技能
            case 5190005://不拣取特定道具技能
            case 5190006://自动服用MP药水技能
            case 5190007://宠物召唤技能
            case 5190008://宠物自言自语技能
                return true;
        }
        return false;
    }

    public static boolean is屏蔽未开放商城宠物(int itemId) {
        switch (itemId) {
          /*  case 5000017:
            case 5000014:
            case 5000015:
            case 5000013:
            case 5000022:
            case 5000029:
            case 5000030:
            case 5000031:
            case 5000032:
            case 5000033:
            case 5000035:
            case 5000048:
            case 5000049:
            case 5000050:
            case 5000051:
            case 5000052:
            case 5000055:
            case 5000053:
            case 5000028:
            case 5000047:
            case 5000060:
            case 5000066:
                return true;*/
        }
        return false;
    }

    public static boolean is屏蔽商场物品(int itemId) {
        switch (itemId) {
            case 5210005://七天晚
            case 5210004:
            case 1102225:
            case 1112012://红玫瑰戒指
            case 1902045:
            case 1912038:
            case 1012131:
            case 5500000:
            case 5500001:
            case 5500002:
            case 5500003:
            case 5500004:
            case 5490000:
            case 5490001:
            case 5470000:
            case 5480000:
            case 5480001:
            case 5480002:
            case 5480003:
            case 5480004:
            case 5480005:
            case 5480006:
            case 5480007:
            case 5480008:
            case 5480009:
            case 5480010:
            case 5480011:
            case 1112916:
            case 5320000:
            case 5430000:
            case 5230000:
            case 5221000:
            case 5140000:
            case 5140001:
            case 5140002:
            case 5140003:
            case 5140004:
            case 5140005:
            case 5580000:
            case 5201000:
            case 5201001:
            case 5201002:
            case 5201004:
            case 5201005:
                return true;
        }
        return false;
    }

    public static boolean No_Mob(int MobID) {
        switch (MobID) {
            case 9300028: //艾里葛斯
            case 8510000: //皮亚奴斯
            case 8510100: //嗜血单眼怪 
            case 8520000: //皮亚奴斯
            case 8800000: //扎昆1
            case 8800001: //扎昆2
            case 8800002: //扎昆 
            case 8800003: //扎昆手臂1 
            case 8800004: //扎昆手臂2 
            case 8800005: //扎昆手臂3 
            case 8800006: //扎昆手臂4 
            case 8800007: //扎昆手臂5 
            case 8800008: //扎昆手臂6 
            case 8800009: //扎昆手臂7 
            case 8800010: //扎昆手臂8 
            case 8810000: //暗黑龙王的左侧头颅 
            case 8810001: //暗黑龙王的右侧头颅 
            case 8810002: //暗黑龙王的头A 
            case 8810003: //暗黑龙王的头B 
            case 8810004: //暗黑龙王的头C 
            case 8810005: //暗黑龙王的左手 
            case 8810006: //暗黑龙王的右手 
            case 8810007: //暗黑龙王的翅膀 
            case 8810008: //暗黑龙王的腿 
            case 8810009: //暗黑龙王的尾巴 
            case 8810010: //死亡暗黑龙王的头A 
            case 8810011: //死亡暗黑龙王的头B 
            case 8810012: //死亡暗黑龙王的头C 
            case 8810013: //死亡暗黑龙王的左手 
            case 8810014: //死亡暗黑龙王的右手 
            case 8810015: //死亡暗黑龙王的翅膀 
            case 8810016: //死亡暗黑龙王的腿 
            case 8810017: //死亡暗黑龙王的尾巴 
            case 8810018: //暗黑龙王的灵魂 
            case 8500001: //帕普拉图斯的座钟 
            case 8500002: //帕普拉图斯 
            case 8220003: //大海兽  
            case 8220004: // 
            case 8220005: //玄冰独角兽 
            case 8220006: //雷卡 
            case 8820000: //的宠儿－品克缤 
            case 8820001: //的宠儿－品克缤 
            case 8820002: //神雕像 
            case 8820003: //贤者所罗门 
            case 8820004: //贤者莱克斯 
            case 8820005: //火鹰雕像 
            case 8820006: //冰鹰雕像 
            case 8820007: //比恩宝宝 
            case 8820008: //宝宝BOSS召唤用透明怪物 
            case 8820009: //t0透明怪物 
            case 8820010: //的宠儿－品克缤 
            case 8820011: //的宠儿－品克缤 
            case 8820012: //的宠儿－品克缤 
            case 8820013: //的宠儿－品克缤 
            case 8820014: //的宠儿－品克缤 
            case 8820015: //贤者所罗门 
            case 8820016: //贤者莱克斯 
            case 8820017: //火鹰雕像 
            case 8820018: //冰鹰雕像 
            case 8820019: //神雕像 
            case 8820020: //贤者所罗门 
            case 8820021: //贤者莱克斯
            case 9420520: //克雷塞尔 [1851574]
            case 9420521: //克雷塞尔 [1851613]
            case 9420522: //克雷塞尔 
            case 9420541:
            case 9420542:
            case 9420543:
            case 9420544:
            case 9420545:
            case 9420546:
            case 9420547:
            case 9420548:
            case 9420549:
            case 9420550:

                return true;
        }
        return false;
    }

    public static boolean 混沌系列(int itemid) {
        switch (itemid) {
            case 2049100:
            case 2049101:
            case 2049102:
            case 2049103:
            case 2049104:

                return true;
        }
        return false;
    }
    
    public static int 副本地图ID(int MapID) {
        switch (MapID) {
            case 920010400:
            case 920010600:
            case 920010200:
            case 920010800:
            case 920011200:
            case 926100000:
            case 926100001:
            case 926100200:
            case 926100500:
            case 926100600:
            case 926100400:
            case 925100200:
            case 925100400:
            case 925100600:
            case 925100500:
            case 925100700:
           return MapID;
        }
        return 0;
    }
    public static boolean 副本地图(int MapID) {
        switch (MapID) {
            case 920010400:
            case 920010600:
            case 920010200:
            case 920010800:
            case 920011200:
            case 926100000:
            case 926100001:
            case 926100200:
            case 926100500:
            case 926100600:
            case 926100400:
            case 925100200:
            case 925100400:
            case 925100600:
            case 925100500:
            case 925100700:

                return true;
        }
        return false;
    }
    public static boolean 罗密欧副本地图ID(int MapID) {
        switch (MapID) {
            case 926100000:
            case 926100001:
            case 926100200:
            case 926100500:
            case 926100600:
            case 926100700:

                return true;
        }
        return false;
    }

    public static boolean 战神不检测地图(int MapID) {
        switch (MapID) {
            case 914000000:
            case 914000100:
            case 914000200:
            case 914000210:
            case 914000220:
            case 914000300:
            case 914000400:
            case 914000410:
            case 914000420:
            case 914000500:
                return true;
        }
        return false;
    }

    public static boolean No_Skill(int skill) {
        switch (skill) {
            case 2111003://致命毒雾
            case 2121007://天降落星
            case 2221007://落霜冰破
            case 2321008://圣光普照
            case 1311006://龙咆哮
            case 5220002://超级章鱼炮台
            case 5221003://地毯式空袭

                return true;
        }
        return false;
    }

    public static boolean is不检测技能(int skill) {
        switch (skill) {
            case 4211006://金钱炸弹
            case 3221007://回旋斩
            case 21120002://战神之舞
            case 21110002://全力挥击
            case 21120006:
            case 2111003://致命毒雾
            case 2121007://天降落星
            case 2221007://落霜冰破
            case 2321008://圣光普照
            case 1311006://龙咆哮
            case 5220002://超级章鱼炮台
            case 5221003://地毯式空袭

                return true;
        }
        return false;
    }

    public static boolean is不检测职业(int job) {
        switch (job) {
            case 400:
            case 410:
            case 411:
            case 412:
            case 420:
            case 421:
            case 422:
            case 2000:
            case 2100:
            case 2110:
            case 2112:
            case 900:

                return true;
        }
        return false;
    }

    public static boolean is屏蔽大擂台(int map) {
        switch (map) {
            case 701000200:
            case 701000201:
            case 701000202:
            case 701000203:
            case 701000210:
                return true;
        }
        return false;
    }

    public static boolean is屏蔽地图(int map) {
        switch (map) {
            case 910000002:
            case 910000003:
            case 910000004:
            case 910000005:
            case 910000006:
                return true;
        }
        return false;
    }

    public static boolean is宠物取消技能道具(int itemId) {
        switch (itemId) {
            case 5191000://取消捡道具功能
            case 5191001://取消自动服用药水功能
            case 5191002://取消扩大移动范围技能
            case 5191003://取消范围自动捡起功能
            case 5191004://取消捡起无所有权道具&amp;金币功能
                return true;
        }
        return false;
    }

    public static boolean isAran(final int job) {
        return job == 2000 || (job >= 2100 && job <= 2112);
    }

    public static MapleInventoryType getInventoryType(int itemId) {
        byte type = (byte) (itemId / 1000000);
        if ((type < 1) || (type > 5)) {
            return MapleInventoryType.UNDEFINED;
        }
        return MapleInventoryType.getByType(type);
    }

    public static short getSlotMax(int itemId) {
        switch (itemId) {
            case 4030003:
            case 4030004:
            case 4030005:
                return 1;
            case 4001168:
            case 4031306:
            case 4031307:
            case 3993000:
            case 3993002:
            case 3993003:
                return 100;
            case 5220010:
            case 5220013:
                return 1000;
            case 5220020:
                return 2000;
        }
        return 0;
    }

    public static int getAttackDelay(int skillId, Skill skill) {
        switch (skillId) {
            case 3121004:
            case 5901006:
            case 5921004:
            case 13111002:
            case 23121000:
            case 33121009:
            case 35111004:
            case 35121005:
            case 35121013:
                return 40;
            case 4111010:
            case 5921007:
                return 99;
            case 2221012:
            case 32121003:
                return 180;
            case 0:
                return 570;
        }
        if ((skill != null) && (skill.getSkillType() == 3)) {
            return 0;
        }
        if ((skill != null) && (skill.getDelay() > 0) && (!isNoDelaySkill(skillId))) {
            return skill.getDelay();
        }

        return 330;
    }

    public static boolean isNoDelaySkill(int skillId) {
        return (skillId == 5810001) || (skillId == 21101003) || (skillId == 15100004) || (skillId == 33101004) || (skillId == 32111010) || (skillId == 2111007) || (skillId == 2211007) || (skillId == 2311007) || (skillId == 22161005) || (skillId == 12111007) || (skillId == 32121003) || (skillId == 35121005) || (skillId == 35111004) || (skillId == 35121013) || (skillId == 35121003) || (skillId == 22150004) || (skillId == 22181004) || (skillId == 11101002) || (skillId == 13101002) || (skillId == 24100003) || (skillId == 24120002) || (skillId == 24121000);
    }

    public static int getAttackDelay(int skillId, ISkill iSkill) {
        Skill skill = null;
        switch (skillId) {
            case 3121004:
            case 5901006:
            case 5921004:
            case 13111002:
            case 23121000:
            case 33121009:
            case 35111004:
            case 35121005:
            case 35121013:
                return 40;
            case 4111010:
            case 5921007:
                return 99;
            case 2221012:
            case 32121003:
                return 180;
            case 0:
                return 570;
        }
        if ((skill != null) && (skill.getSkillType() == 3)) {
            return 0;
        }
        if ((skill != null) && (skill.getDelay() > 0) && (!isNoDelaySkill(skillId))) {
            return skill.getDelay();
        }

        return 330;
    }

    public static boolean Summon_Skill_ID_550(int SkillID) {
        switch (SkillID) {
            case 3121006:// 火凤凰     550
                return true;
        }
        return false;
    }

    public static boolean Summon_Skill_ID_500(int SkillID) {
        switch (SkillID) {
            case 3221005:// 冰凤凰     500
            case 5220002:// 超级章鱼炮台     500
                return true;
        }
        return false;
    }

    public static boolean Summon_Skill_ID_450(int SkillID) {
        switch (SkillID) {
            case 5211002:// 海鸥空袭     450
                return true;
        }
        return false;
    }

    public static boolean Summon_Skill_ID_300(int SkillID) {
        switch (SkillID) {
            case 2221005:// 火魔兽       300
                return true;
        }
        return false;
    }

    public static boolean Summon_Skill_ID_270(int SkillID) {
        switch (SkillID) {
            case 2121005:// 冰破魔兽     270
                return true;
        }
        return false;
    }

    public static boolean Summon_Skill_ID_250(int SkillID) {
        switch (SkillID) {
            case 12111004:// 火魔兽	 250
                return true;
        }
        return false;
    }

    public static boolean Summon_Skill_ID_230(int SkillID) {
        switch (SkillID) {
            case 2321003:// 强化圣龙     230
                return true;
        }
        return false;
    }

    public static boolean Summon_Skill_ID_200(int SkillID) {
        switch (SkillID) {
            case 5211001:// 章鱼炮台     200
                return true;
        }
        return false;
    }

    public static boolean Summon_Skill_ID_150(int SkillID) {
        switch (SkillID) {
            case 2311006:// 圣龙召唤     150
                return true;
        }
        return false;
    }

    public static boolean Summon_Skill_ID_100(int SkillID) {
        switch (SkillID) {
            case 3111005://银鹰召唤     100
            case 3211005://金鹰召唤     100
                return true;
        }
        return false;
    }

    public static boolean Summon_Skill_ID_40(int SkillID) {
        switch (SkillID) {
            case 11001004:// 魂精灵  	 40
            case 12001004:// 炎精灵	 20
            case 13001004:// 风精灵	 40
            case 14001005:// 夜精灵	 40
            case 15001004:// 雷精灵	 40
                return true;
        }
        return false;
    }

    public static boolean Novice_Skill(int skill) {
        switch (skill) {
            case 1000://新手 蜗牛壳
            case 10001000://新手 蜗牛壳
            case 20001000://战神  蜗牛壳

                return true;
        }
        return false;
    }

    public static boolean Ares_Skill_140(int skill) {//战神技能
        switch (skill) {
            case 21100002:
            case 21111005:
            case 21110006:
            case 21000002:

                return true;
        }
        return false;
    }

    public static boolean Ares_Skill_350(int skill) {//战神技能
        switch (skill) {
            case 21110003:
            case 21120002:
            case 21100001:
            case 21110002:

                return true;
        }
        return false;
    }

    public static boolean Ares_Skill_800(int skill) {//战神技能
        switch (skill) {
            case 21120005:
            case 21110004:
            case 21100004:

                return true;
        }
        return false;
    }

    public static boolean Ares_Skill_1500(int skill) {//战神技能
        switch (skill) {
            case 21120006:

                return true;
        }
        return false;
    }

    public static boolean Thief_Skill_270(int skill) {//奇袭者技能
        switch (skill) {
            case 15001001:
            case 15001002:
            case 15101006:
            case 15110000:
            case 15111004:
            case 15111006:
                return true;
        }
        return false;
    }

    public static boolean Thief_Skill_420(int skill) {//奇袭者技能
        switch (skill) {
            case 15111001:
            case 15101003:
            case 15111007:
                return true;
        }
        return false;
    }

    public static boolean Thief_Skill_650(int skill) {//奇袭者技能
        switch (skill) {
            case 15111003:
                return true;
        }
        return false;
    }

    public static boolean Night_Knight_Skill_220(int skill) {//夜行者技能
        switch (skill) {
            case 14001004:
            case 14100005:
            case 14101006:
            case 14111002:
            case 14111005:
            case 14111006:
                return true;
        }
        return false;
    }

    public static boolean Wind_Knight_Skill_160(int skill) {//风灵使者技能
        switch (skill) {
            case 13001003:
            case 13101005:
            case 13111000:
            case 13111001:
            case 13111002:
                return true;
        }
        return false;
    }

    public static boolean Wind_Knight_Skill_550(int skill) {//风灵使者技能
        switch (skill) {
            case 13111006:
            case 13111007:
                return true;
        }
        return false;
    }

    public static boolean Fire_Knight_Skill_140(int skill) {//魂骑士技能
        switch (skill) {
            case 12001003:
            case 12101002:
            case 12101006:
            case 12111005:
            case 12111006:
                return true;
        }
        return false;
    }

    public static boolean Fire_Knight_Skill_500(int skill) {//魂骑士技能
        switch (skill) {
            case 12111003:
                return true;
        }
        return false;
    }

    public static boolean Ghost_Knight_Skill_320(int skill) {//魂骑士技能
        switch (skill) {
            case 11001002:
            case 11001003:
            case 11101004:
            case 11111002:
            case 11111003:
            case 11111004:
            case 11111006:
                return true;
        }
        return false;
    }

    public static boolean Pirate_Skill_290(int skill) {//海盗技能
        switch (skill) {
            case 5001001:
            case 5001002:
            case 5001003:
            case 5101002:
            case 5101003:
            case 5201001:
            case 5201002:
            case 5201004:
            case 5201006:
            case 5210000:
            case 5211004:
            case 5211005:
            case 5121007:
            case 5221004:
                return true;
        }
        return false;
    }

    public static boolean Pirate_Skill_420(int skill) {//海盗技能
        switch (skill) {
            case 5221007:
            case 5211006:
            case 5121004:
            case 5101004:
                return true;
        }
        return false;
    }

    public static boolean Pirate_Skill_700(int skill) {//海盗技能
        switch (skill) {
            case 5111006:
            case 5220011:
            case 5121005:
                return true;
        }
        return false;
    }

    public static boolean Pirate_Skill_810(int skill) {//海盗技能
        switch (skill) {
            case 5221008:
            case 5121001:
                return true;
        }
        return false;
    }

    public static boolean Pirate_Skill_1200(int skill) {//海盗技能
        switch (skill) {
            case 5221003:
                return true;
        }
        return false;
    }

    public static boolean Thief_Skill_180(int skill) {//飞侠技能
        switch (skill) {
            case 4001334:
            case 4001344:
            case 4101005:
            case 4111004:
            case 4111005:
            case 4121007:
            case 4201004:
            case 4201005:
                return true;
        }
        return false;
    }

    public static boolean Thief_Skill_250(int skill) {//飞侠技能
        switch (skill) {
            case 4211004:
            case 4221001:
                return true;
        }
        return false;
    }

    public static boolean Thief_Skill_500(int skill) {//飞侠技能
        switch (skill) {
            case 4211002:
            case 4221007:
                return true;
        }
        return false;
    }

    public static boolean Bowman_Skill_180(int skill) {//弓箭手技能
        switch (skill) {
            case 3001005:
            case 3101005:
            case 3111003:
            case 3111004:
            case 3111006:
            case 3121003:
            case 3121004:
            case 3221003:
            case 3201005:
            case 3211003:
            case 3211004:
            case 3211006:
                return true;
        }
        return false;
    }

    public static boolean Bowman_Skill_260(int skill) {//弓箭手技能
        switch (skill) {
            case 3201003:
            case 3101003:
            case 3000001:
            case 3001004:
                return true;
        }
        return false;
    }

    public static boolean Bowman_Skill_850(int skill) {//弓箭手技能
        switch (skill) {
            case 3221001:
                return true;
        }
        return false;
    }

    public static boolean Magician_Skill_90(int skill) {//魔法师技能
        switch (skill) {
            case 2001004:
            case 2001005:
            case 2201005:
            case 2301005:
                return true;
        }
        return false;
    }

    public static boolean Magician_Skill_180(int skill) {//魔法师技能
        switch (skill) {
            case 2101004:
            case 2111002:
            case 2111006:
            case 2121003:
            case 2201004:
            case 2211003:
            case 2211006:
            case 2221003:
            case 2221006:
            case 2311004:
            case 2211002:
                return true;
        }
        return false;
    }

    public static boolean Magician_Skill_240(int skill) {//魔法师技能
        switch (skill) {
            case 2121006:
            case 2321007:
            case 2301002:
                return true;
        }
        return false;
    }

    public static boolean Magician_Skill_670(int skill) {//魔法师技能
        switch (skill) {
            case 2121001:
            case 2221001:
            case 2321001:
            case 2121007:
            case 2221007:
            case 2321008:
                return true;
        }
        return false;
    }

    public static boolean Warrior_Skill_900(int skill) {//战士技能
        switch (skill) {
            case 1221011:

                return true;
        }
        return false;
    }

    public static boolean Warrior_Skill_550(int skill) {//战士技能
        switch (skill) {
            case 1221009:

                return true;
        }
        return false;
    }

    public static boolean Warrior_Skill_450(int skill) {//战士技能
        switch (skill) {
            case 1001004:
            case 1001005:
            case 1100002:
            case 1100003:
            case 1111002:
            case 1111008:
            case 1121006:
            case 1121008:
            case 1121009:
            case 1211002:
            case 1221007:
            case 1311001:
            case 1311002:
            case 1311003:
            case 1311004:
            case 1311005:
            case 1311006:
            case 1321003:
                return true;
        }
        return false;
    }

    public static boolean Warrior_Skill_2000(int skill) {//战士技能
        switch (skill) {
            case 1111003:
            case 1111004:
            case 1111005:
            case 1111006:
                return true;
        }
        return false;
    }

    public static boolean 防止修改wz永久物品(int itemid) {
        switch (itemid) {
            case 1112404://极光戒指
            case 5211047://双倍经验卡
            case 5581002://房间皮肤
            case 5211060:
            case 5210000:
            case 5210001:
            case 5210002:
            case 5210003:
            case 5210004:
            case 5210005:
            case 5210006:
            case 5360000:
            case 5360014:  //双倍爆率卡，三小时
            case 5360015:
            case 5360016:
            case 5370000:
            case 5370001:
            case 5340000:
            case 5340001:
            case 1122017://精灵吊坠
            case 9030100:
                return true;
        }
        return false;
    }
    
    public static Timestamp getItemDefExpiration(int itemid){
    	long Result = System.currentTimeMillis();
    	switch (itemid) {
	        case 1112404://极光戒指
	        	Result += 365 * 24 * TIME_HOURS_STEP;
	        	break;
	        case 5211047://双倍经验卡，三小时
	        	Result += 3 * TIME_HOURS_STEP;
	        	break;
	        case 5581002://房间皮肤
	        case 5211060://三倍经验卡(2小时)
	        	Result += 2 * TIME_HOURS_STEP;
	        	break;
	        case 5210000://双倍经验值卡一天权
	        	Result += 24 * TIME_HOURS_STEP;
	        	break;
	        case 5210001:  //双倍经验值卡七天权
	        	Result += 7 * 24 * TIME_HOURS_STEP;
	        	break;
	        case 5210002://双倍经验值卡一天权(白)
	        	Result += 24 * TIME_HOURS_STEP;
	        	break;
	        case 5210003://双倍经验值卡七天权(白)
	        	Result += 7 * 24 * TIME_HOURS_STEP;
	        	break;
	        case 5210004://双倍经验值卡一天(晚)
	        	Result += 24 * TIME_HOURS_STEP;
	        	break;
	        case 5210005://双倍经验值卡七天(晚)
	        	Result += 7 * 24 * TIME_HOURS_STEP;
	        	break;
	        case 5210006://双倍经验值一七天(特价)
	        	Result += 7 * 24 * TIME_HOURS_STEP;
	        	break;
	        case 5360000://双倍爆率卡一天权
	        	Result += 24 * TIME_HOURS_STEP;
	        	break;
	        case 5360014://双倍爆率卡，三小时
	        	Result += 3 * TIME_HOURS_STEP;
	        	break;
	        case 5360015://双倍爆率卡一天权
	        	Result += 24 * TIME_HOURS_STEP;
	        	break;
	        case 5360016://双倍爆率卡一周权
	        	Result += 7 * 24 * TIME_HOURS_STEP;
	        	break;
	        case 5370000://黑板（7天权）
	        	Result += 7 * 24 * TIME_HOURS_STEP;
	        	break;
	        case 5370001://黑板（1天权）
	        	Result += 24 * TIME_HOURS_STEP;
	        	break;
	        case 5340000://钓竿
	        	Result += 365 * 24 * TIME_HOURS_STEP;
	        	break;
	        case 5340001://高级鱼竿
	        	Result += 365 * 24 * TIME_HOURS_STEP;
	        	break;
	        case 1122017://精灵吊坠
	        	Result += 365 * 24 * TIME_HOURS_STEP;
	        	break;
	        case 9030100:
	             break;
	    }
    	return new Timestamp(Result);
    }
    
    
}
