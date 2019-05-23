 package net.sf.cherry.net.login.handler;
 
 import net.sf.cherry.client.MapleClient;
import net.sf.cherry.net.AbstractMaplePacketHandler;
import net.sf.cherry.tools.data.input.SeekableLittleEndianAccessor;
 
 public class ToWorldListHandler extends AbstractMaplePacketHandler
 {
   public void handlePacket(SeekableLittleEndianAccessor slea, MapleClient c)
   {
     c.updateLoginState(5);
   }
 }

/* Location:           E:\maoxiandaodanji\dist\cherry.jar
 * Qualified Name:     net.sf.cherry.net.login.handler.ToWorldListHandler
 * JD-Core Version:    0.6.0
 */