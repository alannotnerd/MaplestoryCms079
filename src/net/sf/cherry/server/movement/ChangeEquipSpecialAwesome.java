 package net.sf.cherry.server.movement;
 
 import java.awt.Point;

import net.sf.cherry.tools.data.output.LittleEndianWriter;
 
 public class ChangeEquipSpecialAwesome
   implements LifeMovementFragment
 {
   private int wui;
 
   public ChangeEquipSpecialAwesome(int wui)
   {
     this.wui = wui;
   }
 
   public void serialize(LittleEndianWriter lew)
   {
     lew.write(10);
     lew.write(this.wui);
   }
 
   public Point getPosition()
   {
     return new Point(0, 0);
   }
 }

/* Location:           E:\maoxiandaodanji\dist\cherry.jar
 * Qualified Name:     net.sf.cherry.server.movement.ChangeEquipSpecialAwesome
 * JD-Core Version:    0.6.0
 */