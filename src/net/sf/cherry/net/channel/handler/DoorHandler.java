 package net.sf.cherry.net.channel.handler;
 
 import net.sf.cherry.client.MapleClient;
import net.sf.cherry.net.AbstractMaplePacketHandler;
import net.sf.cherry.server.maps.MapleDoor;
import net.sf.cherry.server.maps.MapleMapObject;
import net.sf.cherry.tools.data.input.SeekableLittleEndianAccessor;
 
 public class DoorHandler extends AbstractMaplePacketHandler
 {
   public void handlePacket(SeekableLittleEndianAccessor slea, MapleClient c)
   {
     c.doneedlog(this, c.getPlayer());
     int oid = slea.readInt();
     boolean mode = slea.readByte() == 0;
     for (MapleMapObject obj : c.getPlayer().getMap().getMapObjects())
       if ((obj instanceof MapleDoor)) {
         MapleDoor door = (MapleDoor)obj;
         if (door.getOwner().getId() == oid) {
           door.warp(c.getPlayer(), mode);
           return;
         }
       }
   }
 }

/* Location:           E:\maoxiandaodanji\dist\cherry.jar
 * Qualified Name:     net.sf.cherry.net.channel.handler.DoorHandler
 * JD-Core Version:    0.6.0
 */