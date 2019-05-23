 package net.sf.cherry.net.login.handler;
 
 import net.sf.cherry.client.MapleClient;
import net.sf.cherry.net.AbstractMaplePacketHandler;
import net.sf.cherry.tools.MaplePacketCreator;
import net.sf.cherry.tools.data.input.SeekableLittleEndianAccessor;
 
 public class RelogRequestHandler extends AbstractMaplePacketHandler
 {
   public boolean validateState(MapleClient c)
   {
     return !c.isLoggedIn();
   }
 
   public void handlePacket(SeekableLittleEndianAccessor slea, MapleClient c)
   {
     c.getSession().write(MaplePacketCreator.getRelogResponse());
   }
 }

/* Location:           E:\maoxiandaodanji\dist\cherry.jar
 * Qualified Name:     net.sf.cherry.net.login.handler.RelogRequestHandler
 * JD-Core Version:    0.6.0
 */