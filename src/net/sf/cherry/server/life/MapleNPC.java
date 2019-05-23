 package net.sf.cherry.server.life;
 
 import net.sf.cherry.client.MapleClient;
import net.sf.cherry.server.MapleShopFactory;
import net.sf.cherry.server.maps.MapleMapObjectType;
import net.sf.cherry.tools.MaplePacketCreator;
 
 public class MapleNPC extends AbstractLoadedMapleLife
 {
   private MapleNPCStats stats;
   private boolean custom = false;
 
   public MapleNPC(int id, MapleNPCStats stats) {
     super(id);
     this.stats = stats;
   }
 
   public boolean hasShop() {
     return MapleShopFactory.getInstance().getShopForNPC(getId()) != null;
   }
 
   public void sendShop(MapleClient c) {
     MapleShopFactory.getInstance().getShopForNPC(getId()).sendShop(c);
   }
 
   public void sendSpawnData(MapleClient client)
   {
     if (getName().contains("Maple TV")) {
       return;
     }
     if ((getId() >= 9010011) && (getId() <= 9010013)) {
       client.getSession().write(MaplePacketCreator.spawnNPCRequestController(this, false));
     } else {
       client.getSession().write(MaplePacketCreator.spawnNPC(this));
       client.getSession().write(MaplePacketCreator.spawnNPCRequestController(this, true));
     }
   }
 
   public void sendDestroyData(MapleClient client)
   {
     client.getSession().write(MaplePacketCreator.removeNPC(getObjectId()));
   }
 
   public MapleMapObjectType getType()
   {
     return MapleMapObjectType.NPC;
   }
 
   public String getName() {
     return this.stats.getName();
   }
 
   public boolean isCustom() {
     return this.custom;
   }
 
   public void setCustom(boolean custom) {
     this.custom = custom;
   }
 }

/* Location:           E:\maoxiandaodanji\dist\cherry.jar
 * Qualified Name:     net.sf.cherry.server.life.MapleNPC
 * JD-Core Version:    0.6.0
 */