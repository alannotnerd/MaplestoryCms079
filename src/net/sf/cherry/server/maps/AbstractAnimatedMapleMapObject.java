 package net.sf.cherry.server.maps;
 
 public abstract class AbstractAnimatedMapleMapObject extends AbstractMapleMapObject
   implements AnimatedMapleMapObject
 {
   private int stance;
 
   public int getStance()
   {
     return this.stance;
   }
 
   public void setStance(int stance) {
     this.stance = stance;
   }
 
   public boolean isFacingLeft() {
     return Math.abs(this.stance) % 2 == 1;
   }
 }

/* Location:           E:\maoxiandaodanji\dist\cherry.jar
 * Qualified Name:     net.sf.cherry.server.maps.AbstractAnimatedMapleMapObject
 * JD-Core Version:    0.6.0
 */