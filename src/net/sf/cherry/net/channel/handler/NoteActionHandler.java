 package net.sf.cherry.net.channel.handler;
 
 import java.sql.SQLException;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import net.sf.cherry.client.MapleClient;
import net.sf.cherry.net.AbstractMaplePacketHandler;
import net.sf.cherry.tools.data.input.SeekableLittleEndianAccessor;
 
 public class NoteActionHandler extends AbstractMaplePacketHandler
 {
   private static final Logger log = LoggerFactory.getLogger(NoteActionHandler.class);
 
   public void handlePacket(SeekableLittleEndianAccessor slea, MapleClient c)
   {
     c.doneedlog(this, c.getPlayer());
     int action = slea.readByte();
 
     if (action == 0) {
       String name = slea.readMapleAsciiString();
       String msg = slea.readMapleAsciiString();
       int gift = slea.readByte();
       try {
         c.getPlayer().sendNote(name, msg);
       } catch (Exception e) {
         log.error("SAVING NOTE", e);
       }
     } else if (action == 1) {
       int num = slea.readByte();
       slea.readByte();
       slea.readByte();
       for (int i = 0; i < num; i++) {
         int id = slea.readInt();
         try {
           c.getPlayer().deleteNote(id);
         } catch (SQLException e) {
           log.error("Unable to delete note", e);
         }
       }
     }
   }
 }

/* Location:           E:\maoxiandaodanji\dist\cherry.jar
 * Qualified Name:     net.sf.cherry.net.channel.handler.NoteActionHandler
 * JD-Core Version:    0.6.0
 */