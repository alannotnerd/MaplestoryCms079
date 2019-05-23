 package net.sf.cherry.net.login.handler;
 
 import net.sf.cherry.client.MapleCharacterUtil;
import net.sf.cherry.client.MapleClient;
import net.sf.cherry.net.AbstractMaplePacketHandler;
import net.sf.cherry.tools.MaplePacketCreator;
import net.sf.cherry.tools.data.input.SeekableLittleEndianAccessor;
 
 public class CheckCharNameHandler extends AbstractMaplePacketHandler
 {
   public void handlePacket(SeekableLittleEndianAccessor slea, MapleClient c)
   {
     String name = slea.readMapleAsciiString();
 
     c.getSession().write(MaplePacketCreator.charNameResponse(name, !MapleCharacterUtil.canCreateChar(name, c.getWorld())));
   }
 }

/* Location:           E:\maoxiandaodanji\dist\cherry.jar
 * Qualified Name:     net.sf.cherry.net.login.handler.CheckCharNameHandler
 * JD-Core Version:    0.6.0
 */