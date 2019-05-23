 package net.sf.cherry.tools.data.input;
 
 import java.awt.Point;

import net.sf.cherry.tools.data.output.LittleEndianWriter;
 
 public class StreamUtil
 {
   public static Point readShortPoint(LittleEndianAccessor lea)
   {
     int x = lea.readShort();
     int y = lea.readShort();
     return new Point(x, y);
   }
 
   public static void writeShortPoint(LittleEndianWriter lew, Point p)
   {
     lew.writeShort(p.x);
     lew.writeShort(p.y);
   }
 }

/* Location:           E:\maoxiandaodanji\dist\cherry.jar
 * Qualified Name:     net.sf.cherry.tools.data.input.StreamUtil
 * JD-Core Version:    0.6.0
 */