 package net.sf.cherry.net.channel.handler;
 
 import net.sf.cherry.client.ISkill;
import net.sf.cherry.client.MapleClient;
import net.sf.cherry.client.SkillFactory;
import net.sf.cherry.net.AbstractMaplePacketHandler;
import net.sf.cherry.net.MaplePacketHandler;
import net.sf.cherry.server.MapleStatEffect;
import net.sf.cherry.tools.MaplePacketCreator;
import net.sf.cherry.tools.data.input.SeekableLittleEndianAccessor;
 
 public class CancelBuffHandler extends AbstractMaplePacketHandler
   implements MaplePacketHandler
 {
   public void handlePacket(SeekableLittleEndianAccessor slea, MapleClient c)
   {
     c.doneedlog(this, c.getPlayer());
     int sourceid = slea.readInt();
 
     ISkill skill = SkillFactory.getSkill(sourceid);
 
     if ((sourceid == 3121004) || (sourceid == 3221001) || (sourceid == 2121001) || (sourceid == 2221001) || (sourceid == 2321001) || (sourceid == 13111002) || (sourceid == 5221004)) {
       c.getPlayer().getMap().broadcastMessage(c.getPlayer(), MaplePacketCreator.skillCancel(c.getPlayer(), sourceid), false);
     }
     MapleStatEffect effect = skill.getEffect(1);
     c.getPlayer().cancelEffect(effect, false, -1L);
   }
 }

/* Location:           E:\maoxiandaodanji\dist\cherry.jar
 * Qualified Name:     net.sf.cherry.net.channel.handler.CancelBuffHandler
 * JD-Core Version:    0.6.0
 */