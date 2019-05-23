 package net.sf.cherry.net.channel.handler;
 
 import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import net.sf.cherry.client.MapleCharacter;
import net.sf.cherry.client.MapleClient;
import net.sf.cherry.net.AbstractMaplePacketHandler;
import net.sf.cherry.scripting.npc.NPCScriptManager;
import net.sf.cherry.tools.MaplePacketCreator;
import net.sf.cherry.tools.data.input.SeekableLittleEndianAccessor;
 
 public class RingActionHandler extends AbstractMaplePacketHandler
 {
   private static Logger log = LoggerFactory.getLogger(RingActionHandler.class);
 
   public void handlePacket(SeekableLittleEndianAccessor slea, MapleClient c)
   {
     c.doneedlog(this, c.getPlayer());
     byte mode = slea.readByte();
     switch (mode) {
     case 0:
       String partnerName = slea.readMapleAsciiString();
       if (partnerName.equalsIgnoreCase(c.getPlayer().getName())) {
         c.getSession().write(MaplePacketCreator.serverNotice(1, "You cannot put your own name in it."));
         return;
       }
       MapleCharacter partner = c.getChannelServer().getPlayerStorage().getCharacterByName(partnerName);
       if (partner == null) {
         c.getSession().write(MaplePacketCreator.serverNotice(1, partnerName + " was not found on this channel. If you are both logged in, please make sure you are in the same channel."));
         return;
       }if (partner.getGender() == c.getPlayer().getGender()) {
         c.getSession().write(MaplePacketCreator.serverNotice(1, "Your partner is the same gender as you are."));
         return;
       }
       NPCScriptManager.getInstance().start(partner.getClient(), 9201002);
 
       break;
     case 1:
       c.getSession().write(MaplePacketCreator.serverNotice(1, "You have cancelled the request."));
       break;
     case 3:
       try
       {
         c.getSession().write(MaplePacketCreator.serverNotice(1, "Your engagement has been broken up."));
       } catch (Exception exc) {
         log.error("Error divorcing engagement", exc);
       }
     case 2:
     }
   }
 }

/* Location:           E:\maoxiandaodanji\dist\cherry.jar
 * Qualified Name:     net.sf.cherry.net.channel.handler.RingActionHandler
 * JD-Core Version:    0.6.0
 */