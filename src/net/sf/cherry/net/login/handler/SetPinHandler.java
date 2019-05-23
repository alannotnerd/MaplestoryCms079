 package net.sf.cherry.net.login.handler;
 
 import net.sf.cherry.client.MapleClient;
import net.sf.cherry.net.AbstractMaplePacketHandler;
import net.sf.cherry.tools.MaplePacketCreator;
import net.sf.cherry.tools.data.input.SeekableLittleEndianAccessor;
 
 public class SetPinHandler extends AbstractMaplePacketHandler
 {
   public void handlePacket(SeekableLittleEndianAccessor slea, MapleClient c)
   {
     if ((c.getLoginState() == 5) || (c.getPin() == 10000)) {
       byte action = slea.readByte();
       if (action == 1) {
         String pin = slea.readMapleAsciiString();
         if (pin.length() == 4) {
           c.setPin(Integer.parseInt(pin));
           c.getSession().write(MaplePacketCreator.pinAssigned());
         }
       }
       c.updateGenderandPin();
       c.updateLoginState(0);
     }
   }
 }

/* Location:           E:\maoxiandaodanji\dist\cherry.jar
 * Qualified Name:     net.sf.cherry.net.login.handler.SetPinHandler
 * JD-Core Version:    0.6.0
 */