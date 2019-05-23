 package net.sf.cherry.client.anticheat;
 
 public enum CheatingOffense
 {
   FASTATTACK(1, 60000L, 300), 
   MOVE_MONSTERS, 
   ALWAYS_ONE_HIT, 
   TUBI, 
   FAST_HP_REGEN, 
   FAST_MP_REGEN(1, 60000L, 500), 
   SAME_DAMAGE(10, 300000L, 20), 
   ATTACK_WITHOUT_GETTING_HIT, 
   HIGH_DAMAGE(10, 300000L), 
   ATTACK_FARAWAY_MONSTER(5), 
   REGEN_HIGH_HP(50), 
   REGEN_HIGH_MP(50), 
   ITEMVAC(5), 
   SHORT_ITEMVAC(2),  //捡取物品范围超标
   USING_FARAWAY_PORTAL(30, 300000L), 
   FAST_TAKE_DAMAGE(1), 
   FAST_MOVE(1, 60000L), 
   HIGH_JUMP(1, 60000L), 
   MISMATCHING_BULLETCOUNT(50), 
   ETC_EXPLOSION(50, 300000L), 
   FAST_SUMMON_ATTACK, 
   ATTACKING_WHILE_DEAD(10, 300000L), 
   USING_UNAVAILABLE_ITEM(10, 300000L), 
   FAMING_SELF(10, 300000L), 
   FAMING_UNDER_15(10, 300000L), 
   EXPLODING_NONEXISTANT, 
   SUMMON_HACK, 
   HEAL_ATTACKING_UNDEAD(1, 60000L, 5), 
   COOLDOWN_HACK(10, 300000L, 10), 
   MOB_INSTANT_DEATH_HACK(10, 300000L, 5);
 
   private final int points;
   private final long validityDuration;
   private final int autobancount;
   private boolean enabled = true;
 
   public int getPoints() {
     return this.points;
   }
 
   public long getValidityDuration() {
     return this.validityDuration;
   }
 
   public boolean shouldAutoban(int count) {
     if (this.autobancount == -1) {
       return false;
     }
     return count > this.autobancount;
   }
 
   public void setEnabled(boolean enabled) {
     this.enabled = enabled;
   }
 
   public boolean isEnabled() {
     return this.enabled;
   }
 
   private CheatingOffense() {
     this(1);
   }
 
   private CheatingOffense(int points) {
     this(points, 60000L);
   }
 
   private CheatingOffense(int points, long validityDuration) {
     this(points, validityDuration, -1);
   }
 
   private CheatingOffense(int points, long validityDuration, int autobancount) {
     this(points, validityDuration, autobancount, true);
   }
 
   private CheatingOffense(int points, long validityDuration, int autobancount, boolean enabled) {
     this.points = points;
     this.validityDuration = validityDuration;
     this.autobancount = autobancount;
     this.enabled = enabled;
   }
 }

/* Location:           E:\maoxiandaodanji\dist\cherry.jar
 * Qualified Name:     net.sf.cherry.client.anticheat.CheatingOffense
 * JD-Core Version:    0.6.0
 */