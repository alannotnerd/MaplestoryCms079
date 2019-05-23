 package net.sf.cherry.server;
 
 import java.util.HashMap;
import java.util.Map;
 
 public class MapleShopFactory
 {
   private Map<Integer, MapleShop> shops = new HashMap();
   private Map<Integer, MapleShop> npcShops = new HashMap();
   private static MapleShopFactory instance = new MapleShopFactory();
 
   public static MapleShopFactory getInstance() {
     return instance;
   }
 
   public void clearShops() {
     this.shops.clear();
   }
   private MapleShop loadShop(int id, boolean isShopId) {
     MapleShop ret = MapleShop.createFromDB(id, isShopId);
     if (ret != null) {
       this.shops.put(Integer.valueOf(ret.getId()), ret);
       this.npcShops.put(Integer.valueOf(ret.getNpcId()), ret);
     } else if (isShopId) {
       this.shops.put(Integer.valueOf(id), null);
     } else {
       this.npcShops.put(Integer.valueOf(id), null);
     }
 
     return ret;
   }
 
   public MapleShop getShop(int shopId) {
     if (this.shops.containsKey(Integer.valueOf(shopId))) {
       return (MapleShop)this.shops.get(Integer.valueOf(shopId));
     }
     return loadShop(shopId, true);
   }
 
   public MapleShop getShopForNPC(int npcId) {
     if (this.npcShops.containsKey(Integer.valueOf(npcId))) {
       this.npcShops.get(Integer.valueOf(npcId));
     }
     return loadShop(npcId, false);
   }
 }

/* Location:           E:\maoxiandaodanji\dist\cherry.jar
 * Qualified Name:     net.sf.cherry.server.MapleShopFactory
 * JD-Core Version:    0.6.0
 */