 package net.sf.cherry.net.login.handler;
 
 import net.sf.cherry.client.MapleClient;
import net.sf.cherry.net.AbstractMaplePacketHandler;
import net.sf.cherry.tools.data.input.SeekableLittleEndianAccessor;
 
 public class CharlistRequestHandler extends AbstractMaplePacketHandler
 {
   public void handlePacket(SeekableLittleEndianAccessor slea, MapleClient c)
   {
     if (c.getLoginState() == 2) {
       int server = slea.readByte();
       int channel = slea.readByte() + 1;
       c.setWorld(server);
       c.setChannel(channel);
       c.sendCharList(server);
     }
   }
 }

/* Location:           E:\maoxiandaodanji\dist\cherry.jar
 * Qualified Name:     net.sf.cherry.net.login.handler.CharlistRequestHandler
 * JD-Core Version:    0.6.0
 */