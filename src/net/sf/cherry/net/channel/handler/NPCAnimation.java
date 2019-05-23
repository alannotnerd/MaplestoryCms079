 package net.sf.cherry.net.channel.handler;
 
 import net.sf.cherry.client.MapleClient;
import net.sf.cherry.net.AbstractMaplePacketHandler;
import net.sf.cherry.net.SendPacketOpcode;
import net.sf.cherry.tools.data.input.SeekableLittleEndianAccessor;
import net.sf.cherry.tools.data.output.MaplePacketLittleEndianWriter;
 
 public class NPCAnimation extends AbstractMaplePacketHandler
 {
   public void handlePacket(SeekableLittleEndianAccessor slea, MapleClient c)
   {
     MaplePacketLittleEndianWriter mplew = new MaplePacketLittleEndianWriter();
     int length = (int)slea.available();
 
     if (length == 6) {
       mplew.writeShort(SendPacketOpcode.NPC_ACTION.getValue());
       mplew.writeInt(slea.readInt());
       mplew.writeShort(slea.readShort());
       c.getSession().write(mplew.getPacket());
     } else if (length > 6) {
       byte[] bytes = slea.read(length - 9);
       mplew.writeShort(SendPacketOpcode.NPC_ACTION.getValue());
       mplew.write(bytes);
       c.getSession().write(mplew.getPacket());
     }
   }
 }
