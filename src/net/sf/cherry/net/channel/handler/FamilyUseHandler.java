 package net.sf.cherry.net.channel.handler;
 
 import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import net.sf.cherry.client.MapleCharacter;
import net.sf.cherry.client.MapleClient;
import net.sf.cherry.net.AbstractMaplePacketHandler;
import net.sf.cherry.tools.data.input.SeekableLittleEndianAccessor;
 
 public final class FamilyUseHandler extends AbstractMaplePacketHandler
 {
   private static final Logger log = LoggerFactory.getLogger(FamilyUseHandler.class);
 
   public final void handlePacket(SeekableLittleEndianAccessor slea, MapleClient c) {
     c.doneedlog(this, c.getPlayer());
     int type = slea.readInt();
     int cost = 0;
     boolean success = true;
     MapleCharacter victim = null;
     switch (type) {
     case 0:
       victim = c.getChannelServer().getPlayerStorage().getCharacterByName(slea.readMapleAsciiString());
       cost = -300;
       if (victim != null)
         c.getPlayer().changeMap(victim.getMap(), victim.getMap().getPortal(0));
       else {
         success = false;
       }
       break;
     case 1:
       cost = -500;
       victim = c.getChannelServer().getPlayerStorage().getCharacterByName(slea.readMapleAsciiString());
       if (victim != null)
         victim.changeMap(c.getPlayer().getMap(), c.getPlayer().getMap().getPortal(0));
       else {
         success = false;
       }
 
     }
 
     if (success)
       c.getPlayer().getFamily().gainReputation(cost);
     else
       c.getPlayer().dropMessage("Either you are not on the correct channel, or an error occured.");
   }
 }

/* Location:           E:\maoxiandaodanji\dist\cherry.jar
 * Qualified Name:     net.sf.cherry.net.channel.handler.FamilyUseHandler
 * JD-Core Version:    0.6.0
 */