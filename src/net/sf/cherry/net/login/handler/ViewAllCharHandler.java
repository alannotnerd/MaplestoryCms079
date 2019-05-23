 package net.sf.cherry.net.login.handler;
 
 import net.sf.cherry.client.MapleClient;
import net.sf.cherry.net.AbstractMaplePacketHandler;
import net.sf.cherry.tools.data.input.SeekableLittleEndianAccessor;
 
 public class ViewAllCharHandler extends AbstractMaplePacketHandler
 {
   public void handlePacket(SeekableLittleEndianAccessor slea, MapleClient c)
   {
     byte mode = slea.readByte();
     if (mode == 0)
       c.updateLoginState(2);
     else if (mode == 1)
       c.updateLoginState(6);
   }
 }

/* Location:           E:\maoxiandaodanji\dist\cherry.jar
 * Qualified Name:     net.sf.cherry.net.login.handler.ViewAllCharHandler
 * JD-Core Version:    0.6.0
 */