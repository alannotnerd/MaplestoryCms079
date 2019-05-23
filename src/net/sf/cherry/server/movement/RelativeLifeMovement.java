 package net.sf.cherry.server.movement;
 
 import java.awt.Point;

import net.sf.cherry.tools.data.output.LittleEndianWriter;
 
 public class RelativeLifeMovement extends AbstractLifeMovement
 {
   public RelativeLifeMovement(int type, Point position, int duration, int newstate)
   {
     super(type, position, duration, newstate);
   }
 
   public void serialize(LittleEndianWriter lew)
   {
     lew.write(getType());
     lew.writeShort(getPosition().x);
     lew.writeShort(getPosition().y);
     lew.write(getNewstate());
     lew.writeShort(getDuration());
   }
 }

/* Location:           E:\maoxiandaodanji\dist\cherry.jar
 * Qualified Name:     net.sf.cherry.server.movement.RelativeLifeMovement
 * JD-Core Version:    0.6.0
 */