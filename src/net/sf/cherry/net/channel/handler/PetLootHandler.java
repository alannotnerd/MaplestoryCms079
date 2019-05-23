package net.sf.cherry.net.channel.handler;

import net.sf.cherry.client.MapleClient;
import net.sf.cherry.client.MaplePet;
import net.sf.cherry.client.anticheat.CheatingOffense;
import net.sf.cherry.net.AbstractMaplePacketHandler;
import net.sf.cherry.net.channel.ChannelServer;
import net.sf.cherry.net.world.MaplePartyCharacter;
import net.sf.cherry.server.MapleInventoryManipulator;
import net.sf.cherry.server.MapleItemInformationProvider;
import net.sf.cherry.server.maps.MapleMapItem;
import net.sf.cherry.server.maps.MapleMapObject;
import net.sf.cherry.tools.MaplePacketCreator;
import net.sf.cherry.tools.data.input.SeekableLittleEndianAccessor;

public class PetLootHandler extends AbstractMaplePacketHandler {

    public void handlePacket(SeekableLittleEndianAccessor slea, MapleClient c) {
        c.doneedlog(this, c.getPlayer());
        MapleItemInformationProvider ii = MapleItemInformationProvider.getInstance();

        if ((c.getPlayer().getNoPets() == 0) || (!c.getPlayer().getMap().isLootable())) {
            c.getSession().write(MaplePacketCreator.enableActions());
            return;
        }
        MaplePet pet = c.getPlayer().getPet(c.getPlayer().getPetByUniqueId(slea.readInt()));
        slea.skip(13);
        int oid = slea.readInt();
        MapleMapObject ob = c.getPlayer().getMap().getMapObject(oid);
        if ((ob == null) || (pet == null)) {
            c.getSession().write(MaplePacketCreator.getInventoryFull()); //背包满了
            return;
        }
        if ((ob instanceof MapleMapItem)) {
            MapleMapItem mapitem = (MapleMapItem) ob;
            synchronized (mapitem) {
                boolean remove = false;
                if (mapitem.isPickedUp()) { //拾取
                    c.getSession().write(MaplePacketCreator.getInventoryFull());
                    return;
                }
                double distance = pet.getPos().distanceSq(mapitem.getPosition());
                c.getPlayer().getCheatTracker().checkPickupAgain(c);
                if (distance > 90000.0D) {//距离
                    c.getPlayer().getCheatTracker().registerOffense(CheatingOffense.ITEMVAC);
                }
                if (distance > 22500.0D) { //距离
                    c.getPlayer().getCheatTracker().registerOffense(CheatingOffense.SHORT_ITEMVAC);
                }
                if (mapitem.getDropper() != c.getPlayer()) { //如果不是自己丢的东西
                    if (mapitem.getMeso() > 0) {
                        if (c.getPlayer().getParty() != null) { //如果有组队
                            ChannelServer cserv = c.getChannelServer();
                            int pMembers = 0; //默认
                            for (MaplePartyCharacter partymem : c.getPlayer().getParty().getMembers()) { //成员 队员
                                if ((partymem != null) && (cserv.getPlayerStorage().getCharacterById(partymem.getId()) != null)
                                        && (cserv.getPlayerStorage().getCharacterById(partymem.getId()).getMapId() == c.getPlayer().getMapId())) {
                                    pMembers++;
                                }
                            }

                            if (pMembers > 1) {
                                for (MaplePartyCharacter partymem : c.getPlayer().getParty().getMembers()) {  //队员一名以上
                                    if ((partymem != null) && (cserv.getPlayerStorage().getCharacterById(partymem.getId()) != null)
                                            && (cserv.getPlayerStorage().getCharacterById(partymem.getId()).getMapId() == c.getPlayer().getMapId())) {
                                        cserv.getPlayerStorage().getCharacterById(partymem.getId()).gainMeso(mapitem.getMeso() / pMembers, true, true); //冒险币分红
                                    }
                                }
                            } else {
                                c.getPlayer().gainMeso(mapitem.getMeso(), true, true);
                            }
                            remove = true;
                        } else {
                            if (c.getPlayer().getMeso() == 2147483647) {//满金币
                                remove = false; //不捡 不删
                            } else {
                                c.getPlayer().gainMeso(mapitem.getMeso(), true, true);
                            }
                            remove = true; //删除
                        }
                        if (remove) { //如果删除
                            c.getPlayer().getMap().broadcastMessage(MaplePacketCreator.removeItemFromMap(mapitem.getObjectId(), 5, c.getPlayer().getId(), true, c.getPlayer().getPetSlot(pet)), mapitem.getPosition());
                            c.getPlayer().getCheatTracker().pickupComplete(); //拾取完整
                            c.getPlayer().getMap().removeMapObject(ob);
                            return;
                        }
                    } else if (mapitem.getItem() != null) { //如果物品不等于没有
                        if (ii.isPet(mapitem.getItem().getItemId())) {
                            int petId = MaplePet.createPet(mapitem.getItem().getItemId()); //产生的宠物
                            if (petId == -1) {
                                return;
                            }
                            MapleInventoryManipulator.addById(c, mapitem.getItem().getItemId(), mapitem.getItem().getQuantity(), "宠物是捡来的", null, petId);
                            c.getPlayer().getMap().broadcastMessage(MaplePacketCreator.removeItemFromMap(mapitem.getObjectId(), 5, c.getPlayer().getId()), mapitem.getPosition());
                            c.getPlayer().getCheatTracker().pickupComplete();
                            c.getPlayer().getMap().removeMapObject(ob);//删除地图对象ID
                            remove = true; //删除
                            return;
                        } else if (MapleInventoryManipulator.addFromDrop(c, mapitem.getItem(), "拾起 " + c.getPlayer().getName(), true)) {  //这里是宠物捡物品
                            c.getPlayer().getMap().broadcastMessage(MaplePacketCreator.removeItemFromMap(mapitem.getObjectId(), 5, c.getPlayer().getId(), true, c.getPlayer().getPetSlot(pet)), mapitem.getPosition());
                            c.getPlayer().getCheatTracker().pickupComplete();
                            c.getPlayer().getMap().removeMapObject(ob);
                            remove = true; //删除
                            return;
                        } else {
                            c.getPlayer().getCheatTracker().pickupComplete();
                            remove = false;
                        }
                    }
                }

                if (remove) {
                    mapitem.setPickedUp(true);
                }
            }
        }
        c.getSession().write(MaplePacketCreator.enableActions()); //状态更新
    }
}
