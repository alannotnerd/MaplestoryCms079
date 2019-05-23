 package net.sf.cherry.net.login.handler;
 
 import net.sf.cherry.client.MapleClient;
import net.sf.cherry.net.AbstractMaplePacketHandler;
import net.sf.cherry.tools.MaplePacketCreator;
import net.sf.cherry.tools.data.input.SeekableLittleEndianAccessor;
 
 public class SetGenderHandler extends AbstractMaplePacketHandler
 {
   public void handlePacket(SeekableLittleEndianAccessor slea, MapleClient c)
   {
     byte gender = slea.readByte();
     String username = slea.readMapleAsciiString();
     if (c.getAccountName().equals(username)) {
       c.setGender(gender);
       c.updateGenderandPin();
       c.getSession().write(MaplePacketCreator.genderChanged(c));
       c.getSession().write(MaplePacketCreator.licenseRequest());
     } else {
       c.disconnect();
     }
   }
 }

/* Location:           E:\maoxiandaodanji\dist\cherry.jar
 * Qualified Name:     net.sf.cherry.net.login.handler.SetGenderHandler
 * JD-Core Version:    0.6.0
 */