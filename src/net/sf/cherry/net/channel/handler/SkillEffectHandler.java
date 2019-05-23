 package net.sf.cherry.net.channel.handler;
 
 import net.sf.cherry.client.MapleClient;
import net.sf.cherry.net.AbstractMaplePacketHandler;
import net.sf.cherry.server.maps.FakeCharacter;
import net.sf.cherry.tools.MaplePacketCreator;
import net.sf.cherry.tools.data.input.SeekableLittleEndianAccessor;
 
 public class SkillEffectHandler extends AbstractMaplePacketHandler
 {
   public void handlePacket(SeekableLittleEndianAccessor slea, MapleClient c)
   {
     c.doneedlog(this, c.getPlayer());
     int skillId = slea.readInt();
     int level = slea.readByte();
     byte flags = slea.readByte();
     int speed = slea.readByte();
     int op = slea.readByte();
 
     if (((skillId == 3121004) || (skillId == 5221004) || (skillId == 1121001) || (skillId == 1221001) || (skillId == 1321001) || (skillId == 2121001) || (skillId == 2221001) || (skillId == 2321001) || (skillId == 2111002) || (skillId == 4211001) || (skillId == 3221001) || (skillId == 5101004) || (skillId == 15101003) || (skillId == 5201002) || (skillId == 14111006) || (skillId == 13111002)) && (level >= 1)) {
       c.getPlayer().getMap().broadcastMessage(c.getPlayer(), MaplePacketCreator.skillEffect(c.getPlayer(), skillId, level, flags, speed, op), false);
     for (FakeCharacter ch : c.getPlayer().getFakeChars()) {
                ch.getFakeChar().getMap().broadcastMessage(ch.getFakeChar(), MaplePacketCreator.skillEffect(ch.getFakeChar(), skillId, level, flags, speed, op), false);
            }
     } else {
       c.disconnect();
       return;
     }
   }
 }

/* Location:           E:\maoxiandaodanji\dist\cherry.jar
 * Qualified Name:     net.sf.cherry.net.channel.handler.SkillEffectHandler
 * JD-Core Version:    0.6.0
 */