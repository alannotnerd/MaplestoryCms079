 package net.sf.cherry.net.channel.handler;
 
 import net.sf.cherry.client.MapleClient;
import net.sf.cherry.client.SkillMacro;
import net.sf.cherry.net.AbstractMaplePacketHandler;
import net.sf.cherry.tools.data.input.SeekableLittleEndianAccessor;
 
 public class SkillMacroHandler extends AbstractMaplePacketHandler
 {
   public void handlePacket(SeekableLittleEndianAccessor slea, MapleClient c)
   {
     c.doneedlog(this, c.getPlayer());
     int num = slea.readByte();
     for (int i = 0; i < num; i++) {
       String name = slea.readMapleAsciiString();
       int shout = slea.readByte(); 
       int skill1 = slea.readInt();
       int skill2 = slea.readInt();
       int skill3 = slea.readInt();
       SkillMacro macro = new SkillMacro(skill1, skill2, skill3, name, shout, i);
     }
   }
 }

