 package net.sf.cherry.net.channel.handler;

 import net.sf.cherry.client.MapleCharacter;
import net.sf.cherry.client.MapleClient;
import net.sf.cherry.client.MaplePet;
import net.sf.cherry.client.anticheat.CheatingOffense;
import net.sf.cherry.net.AbstractMaplePacketHandler;
import net.sf.cherry.net.channel.ChannelServer;
import net.sf.cherry.net.world.MaplePartyCharacter;
import net.sf.cherry.server.AutobanManager;
import net.sf.cherry.server.MapleInventoryManipulator;
import net.sf.cherry.server.MapleItemInformationProvider;
import net.sf.cherry.server.maps.MapleMapItem;
import net.sf.cherry.server.maps.MapleMapObject;
import net.sf.cherry.tools.MaplePacketCreator;
import net.sf.cherry.tools.data.input.SeekableLittleEndianAccessor;

 public class ItemPickupHandler extends AbstractMaplePacketHandler
 {
   public void handlePacket(SeekableLittleEndianAccessor slea, MapleClient c)
   {
     slea.readByte();
     slea.readLong();
     int oid = slea.readInt();
     MapleMapObject ob = c.getPlayer().getMap().getMapObject(oid);
     if ((!c.getPlayer().getMap().isLootable()) && (!c.getPlayer().isGM())) {
       c.getSession().write(MaplePacketCreator.enableActions());
       return;
     }
     if (ob == null) {
       c.getSession().write(MaplePacketCreator.getInventoryFull());
       c.getSession().write(MaplePacketCreator.getShowInventoryFull());
       return;
     }
     if (ob instanceof MapleMapItem) {
       MapleMapItem mapitem = (MapleMapItem)ob;
       MapleCharacter player = c.getPlayer();
       synchronized (mapitem) {
         if (mapitem.isPickedUp()) {
           c.getSession().write(MaplePacketCreator.getInventoryFull());
           c.getSession().write(MaplePacketCreator.getShowInventoryFull());
           player.dropMessage("捡取失败！禁止多次重复丢装备！" +
                   "否则刷新地图清空装备" +
                   "否则刷新地图清空装备" +
                   "否则刷新地图清空装备");
           c.getSession().write(MaplePacketCreator.enableActions());
           return;
         }
         double distance = c.getPlayer().getPosition().distanceSq(mapitem.getPosition());
         c.getPlayer().getCheatTracker().checkPickupAgain(c);
         if (distance > 90000.0D) {
           AutobanManager.getInstance().addPoints(c, 100, 300000L, "Itemvac");
           c.getPlayer().getCheatTracker().registerOffense(CheatingOffense.ITEMVAC);
         } else if (distance > 30000.0D) {
           c.getPlayer().getCheatTracker().registerOffense(CheatingOffense.SHORT_ITEMVAC);
         }
         if (mapitem.getMeso() > 0)
         {          
           if ((c.getPlayer().getParty() != null)) {
        	  //如果有组队，捡起金币要平分
             int mesosamm = mapitem.getMeso();
             int partynum = 0;
             for (MaplePartyCharacter partymem : c.getPlayer().getParty().getMembers()) {
               if ((partymem.isOnline()) && (partymem.getMapid() == c.getPlayer().getMap().getId()) && (partymem.getChannel() == c.getChannel())) {
                 partynum++;
               }
             }
             int mesosgain = mesosamm / partynum;
             for (MaplePartyCharacter partymem : c.getPlayer().getParty().getMembers())
               if ((partymem.isOnline()) && (partymem.getMapid() == c.getPlayer().getMap().getId()) && (partymem.getChannel() == c.getChannel())) {
            	 MapleCharacter somecharacter = partymem.getPlayer();
                 if (somecharacter != null)
                   somecharacter.gainMeso(mesosgain, true, true);
               }
           }
           else
           {
             c.getPlayer().gainMeso(mapitem.getMeso(), true, true);
           }
           c.getPlayer().getMap().broadcastMessage(MaplePacketCreator.removeItemFromMap(mapitem.getObjectId(), 2, c.getPlayer().getId()), mapitem.getPosition());
           c.getPlayer().getCheatTracker().pickupComplete();
           c.getPlayer().getMap().removeMapObject(ob);
         } else if (useItem(c, mapitem.getItem().getItemId())) {
        	//捡起物品后自动使用的玩意儿，比如buf药水，怪物卡等
           if (mapitem.getItem().getItemId() / 10000 == 238) {
        	   //怪物卡片
             c.getPlayer().getMonsterBook().addCard(c, mapitem.getItem().getItemId());
           }
           c.getPlayer().getMap().broadcastMessage(MaplePacketCreator.removeItemFromMap(mapitem.getObjectId(), 2, c.getPlayer().getId()), mapitem.getPosition());
           c.getPlayer().getCheatTracker().pickupComplete();
           c.getPlayer().getMap().removeMapObject(ob);           
         }
         else if ((mapitem.getItem().getItemId() >= 5000000) && (mapitem.getItem().getItemId() <= 5000100)) {
          //宠物
           int petId = MaplePet.createPet(mapitem.getItem().getItemId());
           if (petId == -1) {
             return;
           }
           MapleInventoryManipulator.addById(c, mapitem.getItem().getItemId(), mapitem.getItem().getQuantity(), "Cash Item was purchased.", null, petId);
           c.getPlayer().getMap().broadcastMessage(MaplePacketCreator.removeItemFromMap(mapitem.getObjectId(), 2, c.getPlayer().getId()), mapitem.getPosition());
           c.getPlayer().getCheatTracker().pickupComplete();
           c.getPlayer().getMap().removeMapObject(ob);
         }
         else if (MapleInventoryManipulator.addFromDrop(c, mapitem.getItem(), "Picked up by " + c.getPlayer().getName(), true)) {
           c.getPlayer().getMap().broadcastMessage(MaplePacketCreator.removeItemFromMap(mapitem.getObjectId(), 2, c.getPlayer().getId()), mapitem.getPosition());
           c.getPlayer().getCheatTracker().pickupComplete();
           c.getPlayer().getMap().removeMapObject(ob);
         }
         else {
           c.getPlayer().getCheatTracker().pickupComplete();
           return;
         }

         mapitem.setPickedUp(true);
       }
     }
     c.getSession().write(MaplePacketCreator.enableActions());
   }

   static final boolean useItem(MapleClient c, int id) {
     if (id / 1000000 == 2) {
       MapleItemInformationProvider ii = MapleItemInformationProvider.getInstance();
       if (ii.isConsumeOnPickup(id)) {
         ii.getItemEffect(id).applyTo(c.getPlayer());
         return true;
       }
     }
     return false;
   }
 }