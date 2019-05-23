 package net.sf.cherry.server.playerinteractions;
 
 import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;

import net.sf.cherry.client.IItem;
import net.sf.cherry.client.MapleCharacter;
import net.sf.cherry.client.MapleClient;
import net.sf.cherry.server.MapleInventoryManipulator;
import net.sf.cherry.server.maps.MapleMapObjectType;
import net.sf.cherry.tools.MaplePacketCreator;
 
 public class MaplePlayerShop extends PlayerInteractionManager
 {
   private MapleCharacter owner;
   private int boughtnumber = 0;
   private List<String> bannedList = new ArrayList();
 
   public MaplePlayerShop(MapleCharacter owner, int itemId, String desc) {
     super(owner, itemId % 10, desc, 3);
     this.owner = owner;
   }
 
   public void buy(MapleClient c, int item, short quantity)
   {
     MaplePlayerShopItem pItem = (MaplePlayerShopItem)this.items.get(item);
     if (pItem.getBundles() > 0) {
       synchronized (this.items) {
         IItem newItem = pItem.getItem().copy();
         newItem.setQuantity(quantity);
         if (c.getPlayer().getMeso() >= pItem.getPrice() * quantity) {
           if (this.owner.getMeso() + pItem.getPrice() * quantity < 2147483647) {
             if (MapleInventoryManipulator.addFromDrop(c, newItem)) {
               c.getPlayer().gainMeso(-pItem.getPrice() * quantity, false);
               pItem.setBundles((short)(pItem.getBundles() - quantity));
               this.owner.gainMeso(pItem.getPrice() * quantity, false);
               if (pItem.getBundles() == 0) {
                 this.boughtnumber += 1;
                 if (this.boughtnumber == this.items.size()) {
                   removeAllVisitors(10, 1);
                   this.owner.getClient().getSession().write(MaplePacketCreator.shopErrorMessage(10, 1));
                   closeShop(false);
                 }
               }
             } else {
               c.getPlayer().dropMessage(1, "你的背包已满");
             }
           }
           else c.getPlayer().dropMessage(1, "购买后对方金钱总额将超过上限.交易终止");
         }
         else {
           c.getPlayer().dropMessage(1, "金币不足.");
         }
       }
       this.owner.getClient().getSession().write(MaplePacketCreator.shopItemUpdate(this));
     }
   }
 
   public byte getShopType()
   {
     return 2;
   }
 
   public void closeShop(boolean saveItems)
   {
     this.owner.getMap().broadcastMessage(MaplePacketCreator.removeCharBox(this.owner));
     this.owner.getMap().removeMapObject(this);
     try {
       if (saveItems)
         saveItems();
     }
     catch (SQLException se) {
     }
     this.owner.setInteraction(null);
   }
 
   public void banPlayer(String name) {
     if (!this.bannedList.contains(name)) {
       this.bannedList.add(name);
     }
     for (int i = 0; i < 3; i++)
       if (this.visitors[i].getName().equals(name)) {
         this.visitors[i].getClient().getSession().write(MaplePacketCreator.shopErrorMessage(5, 1));
         this.visitors[i].setInteraction(null);
         removeVisitor(this.visitors[i]);
       }
   }
 
   public boolean isBanned(String name)
   {
     return this.bannedList.contains(name);
   }
 
   public MapleCharacter getMCOwner()
   {
     return this.owner;
   }
 
   public void sendDestroyData(MapleClient client)
   {
     throw new UnsupportedOperationException();
   }
 
   public void sendSpawnData(MapleClient client)
   {
     throw new UnsupportedOperationException();
   }
 
   public MapleMapObjectType getType()
   {
     return MapleMapObjectType.SHOP;
   }
 }

/* Location:           E:\maoxiandaodanji\dist\cherry.jar
 * Qualified Name:     net.sf.cherry.server.playerinteractions.MaplePlayerShop
 * JD-Core Version:    0.6.0
 */