 package net.sf.cherry.server.movement;
 
 import java.awt.Point;

import net.sf.cherry.tools.data.output.LittleEndianWriter;
 
 public class ArasMovement extends AbstractLifeMovement
 {
   private int unk;
 
   public ArasMovement(int type, Point position, int unk, int newstate)
   {
     super(type, position, unk, newstate);
   }
 
   public int getUnk() {
     return this.unk;
   }
 
   public void setUnk(int unk) {
     this.unk = unk;
   }
 
   public void serialize(LittleEndianWriter lew) {
     lew.write(getType());
     lew.write(getNewstate());
     lew.writeShort(getDuration());
   }
 }

/* Location:           E:\maoxiandaodanji\dist\cherry.jar
 * Qualified Name:     net.sf.cherry.server.movement.ArasMovement
 * JD-Core Version:    0.6.0
 */