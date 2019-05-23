 package net.sf.cherry.server.maps;
 
 import net.sf.cherry.net.IntValueHolder;
 
 public enum SummonMovementType
   implements IntValueHolder
 {
   STATIONARY(0), FOLLOW(1), CIRCLE_FOLLOW(3);
   //固定的   遵循   圆跟随
 
   private final int val;
 
   private SummonMovementType(int val) { this.val = val;
   }
 
   public int getValue()
   {
     return this.val;
   }
 }

