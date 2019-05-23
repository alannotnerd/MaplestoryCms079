 package net.sf.cherry.client;
 
 public enum MapleWeaponType
 {
  NOT_A_WEAPON(0.0D), //没武器
   BOW(3.4D), //弓
   CLAW(3.6D), //爪
   DAGGER(4.0D), //匕首
   CROSSBOW(3.6D), //弩
   AXE1H(4.4D), //单手斧
   SWORD1H(4.0D), //单手剑
   BLUNT1H(4.4D), //单手钝器
   AXE2H(4.8D), //双手斧
   SWORD2H(4.6D), //双手剑
   BLUNT2H(4.8D), //双手钝器
   POLE_ARM(5.0D), //枪
   SPEAR(5.0D), //矛
   STAFF(3.6D), //长杖
   WAND(3.6D), //短杖
   KNUCKLE(4.8D), //拳甲
   GUN(3.6D);//手枪

 
   private double damageMultiplier;
 
   private MapleWeaponType(double maxDamageMultiplier) { 
       this.damageMultiplier = maxDamageMultiplier; 
   }
 
   public double getMaxDamageMultiplier()
   {
     return this.damageMultiplier;
   }
 }