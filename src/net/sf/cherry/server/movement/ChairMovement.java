 package net.sf.cherry.server.movement;
 
 import java.awt.Point;

import net.sf.cherry.tools.data.output.LittleEndianWriter;
 
 public class ChairMovement extends AbstractLifeMovement
 {
   private int unk;
 
   public ChairMovement(int type, Point position, int duration, int newstate)
   {
     super(type, position, duration, newstate);
   }
 
   public int getUnk() {
     return this.unk;
   }
 
   public void setUnk(int unk) {
     this.unk = unk;
   }
 
   public void serialize(LittleEndianWriter lew)
   {
     lew.write(getType());
     lew.writeShort(getPosition().x);
     lew.writeShort(getPosition().y);
     lew.writeShort(this.unk);
     lew.write(getNewstate());
     lew.writeShort(getDuration());
   }
 }

/* Location:           E:\maoxiandaodanji\dist\cherry.jar
 * Qualified Name:     net.sf.cherry.server.movement.ChairMovement
 * JD-Core Version:    0.6.0
 */