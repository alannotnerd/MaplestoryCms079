 package net.sf.cherry.net.channel.handler;
 
 import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import net.sf.cherry.client.MapleClient;
import net.sf.cherry.net.AbstractMaplePacketHandler;
import net.sf.cherry.tools.data.input.SeekableLittleEndianAccessor;
 
 public class MobDamageMobHandler extends AbstractMaplePacketHandler
 {
   private static Logger log = LoggerFactory.getLogger(MobDamageMobHandler.class);
 
   public void handlePacket(SeekableLittleEndianAccessor slea, MapleClient c)
   {
     c.doneedlog(this, c.getPlayer());
   }
 }