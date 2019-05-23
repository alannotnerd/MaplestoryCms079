 package net.sf.cherry.net.channel.handler;
 
 import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import net.sf.cherry.client.MapleCharacter;
import net.sf.cherry.client.MapleClient;
import net.sf.cherry.net.AbstractMaplePacketHandler;
import net.sf.cherry.tools.MaplePacketCreator;
import net.sf.cherry.tools.data.input.SeekableLittleEndianAccessor;
 
 public final class FamilyAddHandler extends AbstractMaplePacketHandler
 {
   private static final Logger log = LoggerFactory.getLogger(FamilyAddHandler.class);
 
   public final void handlePacket(SeekableLittleEndianAccessor slea, MapleClient c) {
     c.doneedlog(this, c.getPlayer());
     ////System.out.println(slea.toString());
     String toAdd = slea.readMapleAsciiString();
     MapleCharacter addChr = c.getChannelServer().getPlayerStorage().getCharacterByName(toAdd);
     if (addChr != null) {
       addChr.getClient().getSession().write(MaplePacketCreator.sendFamilyInvite(c.getPlayer().getId(), toAdd));
       c.getPlayer().dropMessage("邀请已发送。");
     } else {
       c.getPlayer().dropMessage("找不到此玩家。");
     }
     c.getSession().write(MaplePacketCreator.enableActions());
   }
 }

/* Location:           E:\maoxiandaodanji\dist\cherry.jar
 * Qualified Name:     net.sf.cherry.net.channel.handler.FamilyAddHandler
 * JD-Core Version:    0.6.0
 */