 package net.sf.cherry.server.movement;
 
 import java.awt.Point;
 
 public abstract class AbstractLifeMovement
   implements LifeMovement
 {
   private Point position;
   private int duration;
   private int newstate;
   private int type;
 
   public AbstractLifeMovement(int type, Point position, int duration, int newstate)
   {
     this.type = type;
     this.position = position;
     this.duration = duration;
     this.newstate = newstate;
   }
 
   public int getType()
   {
     return this.type;
   }
 
   public int getDuration()
   {
     return this.duration;
   }
 
   public int getNewstate()
   {
     return this.newstate;
   }
 
   public Point getPosition()
   {
     return this.position;
   }
 }

/* Location:           E:\maoxiandaodanji\dist\cherry.jar
 * Qualified Name:     net.sf.cherry.server.movement.AbstractLifeMovement
 * JD-Core Version:    0.6.0
 */