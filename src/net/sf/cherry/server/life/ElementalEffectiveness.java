 package net.sf.cherry.server.life;
 
 public enum ElementalEffectiveness
 {
   NORMAL, IMMUNE, STRONG, WEAK, NEUTRAL;
 
   public static ElementalEffectiveness getByNumber(int num) {
     switch (num) {
     case 1:
       return IMMUNE;
     case 2:
       return STRONG;
     case 3:
       return WEAK;
     case 4:
       return NEUTRAL;
     }
     throw new IllegalArgumentException("Unkown effectiveness: " + num);
   }
 }

/* Location:           E:\maoxiandaodanji\dist\cherry.jar
 * Qualified Name:     net.sf.cherry.server.life.ElementalEffectiveness
 * JD-Core Version:    0.6.0
 */