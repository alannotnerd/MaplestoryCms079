 package net.sf.cherry.net.channel.handler;
 
 import net.sf.cherry.client.MapleClient;
import net.sf.cherry.client.MapleKeyBinding;
import net.sf.cherry.net.AbstractMaplePacketHandler;
import net.sf.cherry.tools.data.input.SeekableLittleEndianAccessor;
 
 public class KeymapChangeHandler extends AbstractMaplePacketHandler
 {
   public void handlePacket(SeekableLittleEndianAccessor slea, MapleClient c)
   {
     c.doneedlog(this, c.getPlayer());
     int mode = slea.readInt();
     if (mode == 0) {
       int numChanges = slea.readInt();
       for (int i = 0; i < numChanges; i++) {
         int key = slea.readInt();
         int type = slea.readByte();
         int action = slea.readInt();
         MapleKeyBinding newbinding = new MapleKeyBinding(type, action);
         c.getPlayer().changeKeybinding(key, newbinding);
       }
     } else if (mode == 1) {
       c.getPlayer().setAutoHpPot(slea.readInt());
     } else if (mode == 2) {
       c.getPlayer().setAutoMpPot(slea.readInt());
     }
   }
 }

/* Location:           E:\maoxiandaodanji\dist\cherry.jar
 * Qualified Name:     net.sf.cherry.net.channel.handler.KeymapChangeHandler
 * JD-Core Version:    0.6.0
 */