 package net.sf.cherry.server.movement;
 
 import java.awt.Point;

import net.sf.cherry.tools.data.output.LittleEndianWriter;
 
 public class TeleportMovement extends AbsoluteLifeMovement
 {
   public TeleportMovement(int type, Point position, int newstate)
   {
     super(type, position, 0, newstate);
   }
 
   public void serialize(LittleEndianWriter lew)
   {
     lew.write(getType());
     lew.writeShort(getPosition().x);
     lew.writeShort(getPosition().y);
     lew.writeShort(getPixelsPerSecond().x);
     lew.writeShort(getPixelsPerSecond().y);
     lew.write(getNewstate());
   }
 }

/* Location:           E:\maoxiandaodanji\dist\cherry.jar
 * Qualified Name:     net.sf.cherry.server.movement.TeleportMovement
 * JD-Core Version:    0.6.0
 */