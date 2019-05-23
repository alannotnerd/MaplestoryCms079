 package net.sf.cherry.net.channel.handler;
 
 import java.awt.Point;

import net.sf.cherry.client.MapleClient;
import net.sf.cherry.net.AbstractMaplePacketHandler;
import net.sf.cherry.tools.data.input.SeekableLittleEndianAccessor;
 
 public class ReviveItemHandler extends AbstractMaplePacketHandler
 {
   private static int item;
   private static Point position;
 
   public void handlePacket(SeekableLittleEndianAccessor slea, MapleClient c)
   {
     c.doneedlog(this, c.getPlayer());
     item = slea.readInt();
     int x = slea.readInt();
     int y = slea.readInt();
 
     position = new Point(x, y);
   }
 
   public static int getItemId() {
     return item;
   }
 
   public static Point getPosition() {
     return position;
   }
 }

/* Location:           E:\maoxiandaodanji\dist\cherry.jar
 * Qualified Name:     net.sf.cherry.net.channel.handler.ReviveItemHandler
 * JD-Core Version:    0.6.0
 */