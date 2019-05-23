 package net.sf.cherry.client;
 
 import java.io.Serializable;

import net.sf.cherry.net.LongValueHolder;
 
 public enum MapleBuffStat
   implements LongValueHolder, Serializable
 {
   MORPH(2L), 
   RECOVERY(4L), 
   MAPLE_WARRIOR(8L), 
   避免冲突mask(8L), 
   避免冲突mask2(8589934592L),
   STANCE(16L), 
   SHARP_EYES(32L), 
   MANA_REFLECTION(64L), 
   SHADOW_CLAW(256L), 
   INFINITY(9007199254740992L), 
   HOLY_SHIELD(1024L), 
   HAMSTRING(2048L), 
   BLIND(4096L), 
   CONCENTRATE(8192L), 
   ECHO_OF_HERO(32768L), 
   终极剑_弓(0x80000000L),
   GHOST_MORPH(131072L), 
   DASH(1610612736L), 
   疾驰移动(549755813888L),
   疾驰跳跃(0x4000000000L),
      DASH2(1610612736L), 
   BERSERK_FURY(134217728L), 
   ENERGY_CHARGE(34359738368L), 
   能量(0x2000000000L),
   能量获取(0x2000000000L),
   骑宠技能(1099511627776L), 
   武装(1099511627776L), 
   WATK(4294967296L), //攻击力
   WDEF(8589934592L),  //魔法攻击力
   MATK(17179869184L), //防御力
   MDEF(34359738368L), //魔法防御力
   终极剑(0x80000000L),
   ACC(68719476736L), //命中
   AVOID(137438953472L), //回避
   HANDS(274877906944L), //手机
   SPEED(549755813888L), //速度
   JUMP(1099511627776L), //跳跃
   MAGIC_GUARD(2199023255552L),  //魔法盾 
   DARKSIGHT(4398046511104L),  //隐身
   BOOSTER(8796093022208L),   //攻击速度提升
   SPEED_INFUSION(140737488355328L), 
   POWERGUARD(17592186044416L), 
   HYPERBODYHP(35184372088832L), 
   HYPERBODYMP(70368744177664L), 
   INVINCIBLE(140737488355328L), 
   SOULARROW(281474976710656L), 
   STUN(562949953421312L), 
   POISON(1125899906842624L), 
   SEAL(2251799813685248L), 
   DARKNESS(4503599627370496L), 
   COMBO(9007199254740992L), 
   SUMMON(9007199254740992L), 
   WK_CHARGE(18014398509481984L), 
   DRAGONBLOOD(36028797018963968L), 
   HOLY_SYMBOL(72057594037927936L), 
   MESOUP(144115188075855872L), 
   SHADOWPARTNER(288230376151711744L), 
    /****<检测BUFF>*********/
   攻击力检测(4294967296L), //攻击力
   魔法力检测(8589934592L),  //魔法攻击力
   防御力检测(17179869184L), //防御力
   魔法防御力检测(34359738368L), //魔法防御力
   命中率检测(68719476736L), //命中
   回避率检测(137438953472L), //回避
   手技检测(274877906944L), //手机
   /*****<战神技能mask>*****/
   
   暴击(32L), 
   矛连击强化(4294967296L,3),//攻击力的mask
   矛连击强化防御(8589934592L),//防御的mask
   矛连击强化魔法防御(34359738368L),//魔法防御的mask
   //抗压(17592186044416L),//伤害反击的mask 17592186044416
   连环吸血(18014398509481984L),//吸血技能的mask
   灵巧击退(140737488355328L), //减少怪物碰撞伤害百分比的mask
   战神之盾(140737488355328L),//减少怪物碰撞伤害百分比的mask
   /*****<无法识别的技能>******/
   //矛连击强化(0x40, 3),
   抗压(17592186044416L),
   /****************************/
   
   PICKPOCKET(576460752303423488L), //0x0800000000000000 //掉落金币
       PUPPET(576460752303423488L), 
   MESOGUARD(1152921504606846976L), //0x1000000000000000  //金钱护盾
   WEAKEN(4611686018427387904L);    //0x4000000000000000  //虚弱
 
   static final long serialVersionUID = 0L;
    private final long mask;
    private final long maskPos;



    private MapleBuffStat(long mask) {
        this.mask = mask;
        this.maskPos = 4L;
    }


    private MapleBuffStat(long mask, long maskPos) {
        this.mask = mask;
        this.maskPos = maskPos;
    }

    public long getMaskPos() {
        return this.maskPos;
    }

    @Override
    public long getValue() {
        return mask;
    }

}
