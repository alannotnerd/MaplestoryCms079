 package net.sf.cherry.net.login.handler;
 
 import net.sf.cherry.client.MapleClient;
import net.sf.cherry.net.AbstractMaplePacketHandler;
import net.sf.cherry.tools.MaplePacketCreator;
import net.sf.cherry.tools.data.input.SeekableLittleEndianAccessor;
 
 public class AfterLoginHandler extends AbstractMaplePacketHandler
 {
   public void handlePacket(SeekableLittleEndianAccessor slea, MapleClient c)
   {
     byte action = slea.readByte();
     if (action == 0) {
       c.updateGenderandPin();
       c.updateLoginState(0);
     } else if (((action == 1) || (action == 2)) && (c.getLoginState() == 4)) {
       byte action2 = slea.readByte();
       int accountId = slea.readInt();
       String pin = slea.readMapleAsciiString();
     
       if (accountId == c.getAccID()) {
         if (action == 1) {
           if (action2 == 0) {
             if (Integer.parseInt(pin) == c.getPin()) {
               c.updateLoginState(5);
               c.getSession().write(MaplePacketCreator.pinOperation((byte)0));
             } else {
               c.setPinTries((byte)(c.getPinTries() + 1));
               if (c.getPinTries() == 5) {
                 c.ban();
                 c.disconnect();
               }
               c.getSession().write(MaplePacketCreator.pinOperation((byte)2));
             }
           } else if (action2 == 1) {
             if (c.getPin() == 10000)
               c.getSession().write(MaplePacketCreator.pinOperation((byte)1));
             else
               c.getSession().write(MaplePacketCreator.pinOperation((byte)4));
           }
         }
         else if ((action == 2) && (action2 == 0))
           if (Integer.parseInt(pin) == c.getPin()) {
             c.updateLoginState(5);
             c.getSession().write(MaplePacketCreator.pinOperation((byte)1));
           } else {
             c.setPinTries((byte)(c.getPinTries() + 1));
             if (c.getPinTries() == 5) {
               c.ban();
               c.disconnect();
             }
             c.getSession().write(MaplePacketCreator.pinOperation((byte)2));
           }
       }
       else
         c.getSession().write(MaplePacketCreator.getLoginFailed(4));
     }
     else if (((action == 1) || (action == 2)) && (c.getLoginState() != 4)) {
       c.disconnect();
     }
   }
 }

/* Location:           E:\maoxiandaodanji\dist\cherry.jar
 * Qualified Name:     net.sf.cherry.net.login.handler.AfterLoginHandler
 * JD-Core Version:    0.6.0
 */