 package net.sf.cherry.server.maps;
 
 import net.sf.cherry.client.MapleClient;
import net.sf.cherry.net.MaplePacket;
import net.sf.cherry.tools.MaplePacketCreator;
 
 public class MapleMapEffect
 {
   private String msg;
   private int itemId;
   private boolean active = true;
 
   public MapleMapEffect(String msg, int itemId) {
     this.msg = msg;
     this.itemId = itemId;
   }
 
   public MaplePacket makeDestroyData() {
     return MaplePacketCreator.removeMapEffect();
   }
 
   public MaplePacket makeStartData() {
     return MaplePacketCreator.startMapEffect(this.msg, this.itemId, this.active);
   }
 
   public void sendStartData(MapleClient client) {
     client.getSession().write(makeStartData());
   }
 }

/* Location:           E:\maoxiandaodanji\dist\cherry.jar
 * Qualified Name:     net.sf.cherry.server.maps.MapleMapEffect
 * JD-Core Version:    0.6.0
 */