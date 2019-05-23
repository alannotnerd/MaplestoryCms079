 package net.sf.cherry.net.channel.handler;
 
 import net.sf.cherry.client.MapleCharacter;
import net.sf.cherry.client.MapleClient;
import net.sf.cherry.net.AbstractMaplePacketHandler;
import net.sf.cherry.tools.MaplePacketCreator;
import net.sf.cherry.tools.data.input.SeekableLittleEndianAccessor;
 
 public class DenyGuildRequestHandler extends AbstractMaplePacketHandler
 {
   public void handlePacket(SeekableLittleEndianAccessor slea, MapleClient c)
   {
     c.doneedlog(this, c.getPlayer());
 
     slea.readByte();
     MapleCharacter cfrom = c.getChannelServer().getPlayerStorage().getCharacterByName(slea.readMapleAsciiString());
     if (cfrom != null)
       cfrom.getClient().getSession().write(MaplePacketCreator.denyGuildInvitation(c.getPlayer().getName()));
   }
 }

/* Location:           E:\maoxiandaodanji\dist\cherry.jar
 * Qualified Name:     net.sf.cherry.net.channel.handler.DenyGuildRequestHandler
 * JD-Core Version:    0.6.0
 */