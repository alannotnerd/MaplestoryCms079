 package net.sf.cherry.client;
 
 import net.sf.cherry.net.LongValueHolder;

 public enum MapleDisease
   implements LongValueHolder
 {
   //这里是怪给人物的buff
   NULL(0L), 
   SLOW(1L), //缓慢
   SEDUCE(128L), //诱惑
   FISHABLE(256L), //钓鱼
   CURSE(512L), // 诅咒
   CONFUSE(524288L), //诱惑
   STUN(562949953421312L), //眩晕
   POISON(1125899906842624L), //中毒
   SEAL(2251799813685248L), //封印
   DARKNESS(4503599627370496L), //黑暗
   WEAKEN(4611686018427387904L);//虚弱[不能跳]
 
   private long i;
 
   private MapleDisease(long i) { this.i = i;
   }
 
   public long getValue()
   {
     return this.i;
   }
 }
