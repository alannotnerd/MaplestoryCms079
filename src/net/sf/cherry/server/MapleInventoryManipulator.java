//读Item.Wz

package net.sf.cherry.server;

import java.awt.Point;
import java.rmi.RemoteException;
import java.sql.Timestamp;
import java.util.Iterator;
import java.util.List;
import java.util.Map;
import java.util.logging.Level;
import java.util.logging.Logger;

import net.sf.cherry.client.Equip;
import net.sf.cherry.client.IItem;
import net.sf.cherry.client.InventoryException;
import net.sf.cherry.client.Item;
import net.sf.cherry.client.MapleBuffStat;
import net.sf.cherry.client.MapleClient;
import net.sf.cherry.client.MapleInventoryType;
import net.sf.cherry.net.Constants.GameConstants;
import net.sf.cherry.net.channel.ChannelServer;
import net.sf.cherry.tools.MaplePacketCreator;

/**
 * 
 * @author Matze
 */
public class MapleInventoryManipulator {

    private static org.slf4j.Logger log = org.slf4j.LoggerFactory.getLogger(MapleInventoryManipulator.class);

    public static boolean addFromDrop(MapleClient c, IItem item, boolean show) {
        return addFromDrop(c, item, show, null);
    }

    public static boolean addFromDrop(MapleClient c, IItem item, boolean show, String owner) {
        MapleItemInformationProvider ii = MapleItemInformationProvider.getInstance();
        MapleInventoryType type = ii.getInventoryType(item.getItemId());
        if (!c.getChannelServer().allowMoreThanOne() && ii.isPickupRestricted(item.getItemId()) && c.getPlayer().haveItem(item.getItemId(), 1, true, false)) {
            c.getSession().write(MaplePacketCreator.getInventoryFull());
            c.getSession().write(MaplePacketCreator.showItemUnavailable());
            return false;
        }
        short quantity = item.getQuantity();
        if (quantity >= 4000 || quantity < 0) {
            AutobanManager.getInstance().autoban(c.getPlayer().getClient(), "XSource| PE Item: " + quantity + "x " + item.getItemId());
            return false;
        }
        if (!type.equals(MapleInventoryType.EQUIP)) {
            short slotMax = ii.getSlotMax(c, item.getItemId());
            List<IItem> existing = c.getPlayer().getInventory(type).listById(item.getItemId());
            if (!ii.isThrowingStar(item.getItemId()) && !ii.isBullet(item.getItemId())) {
                if (existing.size() > 0) { // first update all existing slots to slotMax
                    Iterator<IItem> i = existing.iterator();
                    while (quantity > 0) {
                        if (i.hasNext()) {
                            Item eItem = (Item) i.next();
                            short oldQ = eItem.getQuantity();
                            if (oldQ < slotMax && item.getOwner().equals(eItem.getOwner())) {
                                short newQ = (short) Math.min(oldQ + quantity, slotMax);
                                quantity -= (newQ - oldQ);
                                eItem.setQuantity(newQ);
                                c.getSession().write(MaplePacketCreator.updateInventorySlot(type, eItem, true));
                            }
                        } else {
                            break;
                        }
                    }
                }
                // add new slots if there is still something left
                while (quantity > 0 || ii.isThrowingStar(item.getItemId()) || ii.isBullet(item.getItemId())) {
                    short newQ = (short) Math.min(quantity, slotMax);
                    quantity -= newQ;
                    Item nItem = new Item(item.getItemId(), (byte) 0, newQ);
                    nItem.setOwner(item.getOwner());
                    byte newSlot = c.getPlayer().getInventory(type).addItem(nItem);
                    if (newSlot == -1) {
                        c.getSession().write(MaplePacketCreator.getInventoryFull());
                        c.getSession().write(MaplePacketCreator.getShowInventoryFull());
                        item.setQuantity((short) (quantity + newQ));
                        return false;
                    }
                    c.getSession().write(MaplePacketCreator.addInventorySlot(type, nItem, true));
                }
            } else {
                // Throwing Stars and Bullets - Add all into one slot regardless of quantity.
                Item nItem = new Item(item.getItemId(), (byte) 0, quantity);
                byte newSlot = c.getPlayer().getInventory(type).addItem(nItem);
                if (newSlot == -1) {
                    c.getSession().write(MaplePacketCreator.getInventoryFull());
                    c.getSession().write(MaplePacketCreator.getShowInventoryFull());
                    return false;
                }
                c.getSession().write(MaplePacketCreator.addInventorySlot(type, nItem));
                c.getSession().write(MaplePacketCreator.enableActions());
            }
        } else {
            if (quantity == 1) {
                byte newSlot = c.getPlayer().getInventory(type).addItem(item);

                if (newSlot == -1) {
                    c.getSession().write(MaplePacketCreator.getInventoryFull());
                    c.getSession().write(MaplePacketCreator.getShowInventoryFull());
                    return false;
                }
                c.getSession().write(MaplePacketCreator.addInventorySlot(type, item, true));
            } else {
                throw new RuntimeException("Trying to create equip with non-one quantity");
            }
        }
        if (owner != null) {
            item.setOwner(owner);
        }
        if (show) {
            c.getSession().write(MaplePacketCreator.getShowItemGain(item.getItemId(), item.getQuantity()));
        }
        return true;
    }

    public static void removeAllById(MapleClient c, int itemId, boolean checkEquipped) {
        MapleInventoryType type = MapleItemInformationProvider.getInstance().getInventoryType(itemId);
        for (IItem item : c.getPlayer().getInventory(type).listById(itemId)) {
            if (item != null) {
                removeFromSlot(c, type, item.getPosition(), item.getQuantity(), true, false);
            }
        }
        if (checkEquipped) {
            IItem ii = c.getPlayer().getInventory(type).findById(itemId);
            if (ii != null) {
                c.getPlayer().getInventory(MapleInventoryType.EQUIPPED).removeItem(ii.getPosition());
                c.getPlayer().equipChanged();
            }
        }
    }

    /** Creates a new instance of MapleInventoryManipulator */
    private MapleInventoryManipulator() {
    }

    /* VIP Teleport Rocks method */
    public static boolean addById(MapleClient c, int itemId, short quantity, String logInfo) {
        return addById(c, itemId, quantity, logInfo, null, -1);
    }

    public static boolean addById(MapleClient c, int itemId, short quantity, String logInfo, String owner, int petid) {
        if (quantity < 0) {
            return false;
        }
        MapleItemInformationProvider ii = MapleItemInformationProvider.getInstance();
        MapleInventoryType type = ii.getInventoryType(itemId);
        if (!type.equals(MapleInventoryType.EQUIP)) {
            short slotMax = ii.getSlotMax(c, itemId);
            List<IItem> existing = c.getPlayer().getInventory(type).listById(itemId);
            if (!ii.isThrowingStar(itemId) && !ii.isBullet(itemId)) {
                if (existing.size() > 0) { // 第一次更新现有的所有插槽slotmax
                    Iterator<IItem> i = existing.iterator();
                    while (quantity > 0) {
                        if (i.hasNext()) {
                            Item eItem = (Item) i.next();
                            short oldQ = eItem.getQuantity();
                            if (oldQ < slotMax && (eItem.getOwner().equals(owner) || owner == null)) {
                                short newQ = (short) Math.min(oldQ + quantity, slotMax);
                                quantity -= (newQ - oldQ);
                                eItem.setQuantity(newQ);
                                eItem.log("添加的 " + (newQ - oldQ) + " 项目组，新的数量 " + newQ + " (" + logInfo + " )", false);
                                c.getSession().write(MaplePacketCreator.updateInventorySlot(type, eItem));
                            }
                        } else {
                            break;
                        }
                    }
                }
                while (quantity > 0) { // 如果还有剩下的添加新的插槽
                    short newQ = (short) Math.min(quantity, slotMax);
                    if (newQ != 0) {
                        quantity -= newQ;
                        Item nItem = new Item(itemId, (byte) 0, newQ, petid);
                        nItem.log("而添加的数量创造的ID。: " + newQ + " (" + logInfo + ")", false);
                        byte newSlot = c.getPlayer().getInventory(type).addItem(nItem);
                        if (newSlot == -1) { //新的插槽
                            c.getSession().write(MaplePacketCreator.getInventoryFull());
                            c.getSession().write(MaplePacketCreator.getShowInventoryFull());//获取显示库存爆满
                            return false;
                        }
                        if (owner != null) {
                            nItem.setOwner(owner);
                        }
                        
                        if (GameConstants.防止修改wz永久物品(itemId)) {
                        	//设置某些东西的过期时间
                            nItem.setExpiration(GameConstants.getItemDefExpiration(itemId));                            
        				}
                        
                        c.getSession().write(MaplePacketCreator.addInventorySlot(type, nItem));
                        if ((ii.isThrowingStar(itemId) || ii.isBullet(itemId)) && quantity == 0) {
                            break;
                        }
                    } else {
                        c.getSession().write(MaplePacketCreator.enableActions());
                        return false;
                    }
                }
            } else { // 飞镖和子弹-添加到一个插槽，无论数量。
                Item nItem = new Item(itemId, (byte) 0, quantity);
                nItem.log("Created while adding by id. Quantity: " + quantity + " (" + logInfo + " )", false);
                byte newSlot = c.getPlayer().getInventory(type).addItem(nItem);
                if (newSlot == -1) {
                    c.getSession().write(MaplePacketCreator.getInventoryFull());
                    c.getSession().write(MaplePacketCreator.getShowInventoryFull());
                    return false;
                }
                c.getSession().write(MaplePacketCreator.addInventorySlot(type, nItem));
                c.getSession().write(MaplePacketCreator.enableActions());
            }
        } else {
            if (quantity == 1) {
                IItem nEquip = ii.getEquipById(itemId);
                if (ii.isCash(itemId) == true && nEquip.getUniqueId() == 0) {
                    nEquip.setUniqueId(1);
                    //System.out.println("获得现金物品给予值A："+nEquip.getUniqueId());
                }
                nEquip.log("而添加的ID创建. (" + logInfo + " )", false);
                if (owner != null) {
                    nEquip.setOwner(owner);
                }

                byte newSlot = c.getPlayer().getInventory(type).addItem(nEquip);
                if (newSlot == -1) {
                    c.getSession().write(MaplePacketCreator.getInventoryFull());
                    c.getSession().write(MaplePacketCreator.getShowInventoryFull());
                    return false;
                }
                c.getSession().write(MaplePacketCreator.addInventorySlot(type, nEquip));
            } else {
                throw new InventoryException("试图创建配备非一量");
            }
        }
        return true;
    }

    public static boolean addFromDrop(MapleClient c, Equip item, String logInfo) {
        return addFromDrop(c, item.copy(), logInfo, true);
    }

    public static boolean addFromDrop(MapleClient c, IItem item) {
        return addFromDrop(c, item, "", true);
    }

    public static boolean addFromDrop(MapleClient c, IItem item, String logInfo, boolean show) {
        MapleItemInformationProvider ii = MapleItemInformationProvider.getInstance();
        MapleInventoryType type = ii.getInventoryType(item.getItemId());

        if (!c.getChannelServer().allowMoreThanOne() && ii.isPickupRestricted(item.getItemId()) && c.getPlayer().haveItem(item.getItemId(), 1, true, true)) {
            c.getSession().write(MaplePacketCreator.getInventoryFull());
            c.getSession().write(MaplePacketCreator.showItemUnavailable());
            return false;
        }

        short quantity = item.getQuantity();
        if (!type.equals(MapleInventoryType.EQUIP)) {
            short slotMax = ii.getSlotMax(c, item.getItemId());
            List<IItem> existing = c.getPlayer().getInventory(type).listById(item.getItemId());
            if (!ii.isThrowingStar(item.getItemId()) && !ii.isBullet(item.getItemId())) {
                if (existing.size() > 0) { // first update all existing slots to slotMax
                    Iterator<IItem> i = existing.iterator();
                    while (quantity > 0) {
                        if (i.hasNext()) {
                            Item eItem = (Item) i.next();
                            short oldQ = eItem.getQuantity();
                            if (oldQ < slotMax && item.getOwner().equals(eItem.getOwner())) {
                                short newQ = (short) Math.min(oldQ + quantity, slotMax);
                                quantity -= (newQ - oldQ);
                                eItem.setQuantity(newQ);
                                eItem.log("Added " + (newQ - oldQ) + " items to stack, new quantity is " + newQ + " (" + logInfo + " )", false);
                                c.getSession().write(MaplePacketCreator.updateInventorySlot(type, eItem, true));
                            }
                        } else {
                            break;
                        }
                    }
                } // add new slots if there is still something left
                while (quantity > 0) {
                    short newQ = (short) Math.min(quantity, slotMax);
                    quantity -= newQ;
                    Item nItem = new Item(item.getItemId(), (byte) 0, newQ);
                    nItem.setOwner(item.getOwner());
                    nItem.log("Created while adding from drop. Quantity: " + newQ + " (" + logInfo + " )", false);
                    byte newSlot = c.getPlayer().getInventory(type).addItem(nItem);
                    if (newSlot == -1) {
                        c.getSession().write(MaplePacketCreator.getInventoryFull());
                        c.getSession().write(MaplePacketCreator.getShowInventoryFull());
                        item.setQuantity((short) (quantity + newQ));
                        return false;
                    }
                    c.getSession().write(MaplePacketCreator.addInventorySlot(type, nItem, true));
                }
            } else {
                // Throwing Stars and Bullets - Add all into one slot regardless of quantity.
                Item nItem = new Item(item.getItemId(), (byte) 0, quantity);
                nItem.log("Created while adding by id. Quantity: " + quantity + " (" + logInfo + " )", false);
                byte newSlot = c.getPlayer().getInventory(type).addItem(nItem);
                if (newSlot == -1) {
                    c.getSession().write(MaplePacketCreator.getInventoryFull());
                    c.getSession().write(MaplePacketCreator.getShowInventoryFull());
                    return false;
                }
                c.getSession().write(MaplePacketCreator.addInventorySlot(type, nItem));
                c.getSession().write(MaplePacketCreator.enableActions());
            }
        } else {
            if (quantity == 1) {
                byte newSlot = c.getPlayer().getInventory(type).addItem(item);
                item.log("Adding from drop. (" + logInfo + " )", false);

                if (newSlot == -1) {
                    c.getSession().write(MaplePacketCreator.getInventoryFull());
                    c.getSession().write(MaplePacketCreator.getShowInventoryFull());
                    return false;
                }
                c.getSession().write(MaplePacketCreator.addInventorySlot(type, item, true));
            } else {
                throw new RuntimeException("Trying to create equip with non-one quantity");
            }
        }
        if (show) {
            c.getSession().write(MaplePacketCreator.getShowItemGain(item.getItemId(), item.getQuantity()));
        }
        return true;
    }

    public static boolean 测试(MapleClient c, IItem item, boolean show) {
        MapleItemInformationProvider ii = MapleItemInformationProvider.getInstance();
        MapleInventoryType type = ii.getInventoryType(item.getItemId());
         
        
        if (!c.getChannelServer().allowMoreThanOne() && ii.isPickupRestricted(item.getItemId()) && c.getPlayer().haveItem(item.getItemId(), 1, true, true)) {
            c.getSession().write(MaplePacketCreator.getInventoryFull());
            c.getSession().write(MaplePacketCreator.showItemUnavailable());
            return false;
        }

        short quantity = item.getQuantity();
        if (!type.equals(MapleInventoryType.EQUIP)) {
            short slotMax = ii.getSlotMax(c, item.getItemId());
            List<IItem> existing = c.getPlayer().getInventory(type).listById(item.getItemId());
            if (!ii.isThrowingStar(item.getItemId()) && !ii.isBullet(item.getItemId())) {
                if (existing.size() > 0) { // 第一次更新现有的所有插槽slotmax
                    Iterator<IItem> i = existing.iterator();
                    while (quantity > 0) {
                        if (i.hasNext()) {
                            Item eItem = (Item) i.next();
                            short oldQ = eItem.getQuantity();
                            if (oldQ < slotMax && item.getOwner().equals(eItem.getOwner())) {//
                                short newQ = (short) Math.min(oldQ + quantity, slotMax);
                                quantity -= (newQ - oldQ);
                                eItem.setQuantity(newQ);
                                c.getSession().write(MaplePacketCreator.updateInventorySlot(type, eItem, true));
                c.getSession().write(MaplePacketCreator.enableActions());
                            }
                        } else {
                            System.out.println("3");
                            break;
                        }
                    }
                } // 如果还有剩下的添加新的插槽
                while (quantity > 0) {
                    short newQ = (short) Math.min(quantity, slotMax);
                    quantity -= newQ;
                    Item nItem = new Item(item.getItemId(), (byte) 0, newQ);
                    nItem.setOwner(item.getOwner());
                    byte newSlot = c.getPlayer().getInventory(type).addItem(nItem);
                    if (newSlot == -1) {
                        c.getSession().write(MaplePacketCreator.getInventoryFull());
                        c.getSession().write(MaplePacketCreator.getShowInventoryFull());
                        item.setQuantity((short) (quantity + newQ));
                        System.out.println("4");
                        return false;
                    }
                    c.getSession().write(MaplePacketCreator.addInventorySlot(type, nItem, true));
                c.getSession().write(MaplePacketCreator.enableActions());
                
                }
            } else {
                //飞镖和子弹-添加到一个插槽，无论数量。
                Item nItem = new Item(item.getItemId(), (byte) 0, quantity);
                byte newSlot = c.getPlayer().getInventory(type).addItem(nItem);
                if (newSlot == -1) {
                    c.getSession().write(MaplePacketCreator.getInventoryFull());
                    c.getSession().write(MaplePacketCreator.getShowInventoryFull());
                    return false;
                }
                c.getSession().write(MaplePacketCreator.addInventorySlot(type, nItem));
                c.getSession().write(MaplePacketCreator.enableActions());
            }
        } else {
            if (quantity == 1) {
                byte newSlot = c.getPlayer().getInventory(type).addItem(item);

                if (newSlot == -1) {
                    c.getSession().write(MaplePacketCreator.getInventoryFull());
                    c.getSession().write(MaplePacketCreator.getShowInventoryFull());
                    return false;
                }
                c.getSession().write(MaplePacketCreator.addInventorySlot(type, item, true));
                c.getSession().write(MaplePacketCreator.enableActions());
            } else {
                throw new RuntimeException("Trying to create equip with non-one quantity");
            }
        }
        if (show) {
            c.getSession().write(MaplePacketCreator.getShowItemGain(item.getItemId(), item.getQuantity()));
        }
        return true;
    }
    
    public static boolean checkSpace(MapleClient c, int itemid, int quantity, String owner) {
        MapleItemInformationProvider ii = MapleItemInformationProvider.getInstance();
        MapleInventoryType type = ii.getInventoryType(itemid);

        if (!type.equals(MapleInventoryType.EQUIP)) {
            short slotMax = ii.getSlotMax(c, itemid);
            List<IItem> existing = c.getPlayer().getInventory(type).listById(itemid);
            if (!ii.isThrowingStar(itemid) && !ii.isBullet(itemid)) {
                if (existing.size() > 0) { // first update all existing slots to slotMax
                    for (IItem eItem : existing) {
                        short oldQ = eItem.getQuantity();
                        if (oldQ < slotMax && owner.equals(eItem.getOwner())) {
                            short newQ = (short) Math.min(oldQ + quantity, slotMax);
                            quantity -= (newQ - oldQ);
                        }
                        if (quantity <= 0) {
                            break;
                        }
                    }
                }
            }
            final int numSlotsNeeded;
            if (slotMax > 0) { // add new slots if there is still something left
                numSlotsNeeded = (int) (Math.ceil(((double) quantity) / slotMax));
            } else if (ii.isThrowingStar(itemid) || ii.isBullet(itemid)) {
                numSlotsNeeded = 1;
            } else {
                numSlotsNeeded = 1;
                log.error("SUCK ERROR - FIX ME! - 0 slotMax");
            }
            return !c.getPlayer().getInventory(type).isFull(numSlotsNeeded - 1);
        } else {
            return !c.getPlayer().getInventory(type).isFull();
        }
    }
public static boolean 商店防止复制1(MapleClient c, IItem item) {
        return 商店防止复制1(c, item, "", true);
    }
public static boolean 商店防止复制1(MapleClient c, IItem item, String logInfo, boolean show) {
        MapleItemInformationProvider ii = MapleItemInformationProvider.getInstance();
        MapleInventoryType type = ii.getInventoryType(item.getItemId());
        //////////System.out.println("-1-");
        if (!c.getChannelServer().allowMoreThanOne() && ii.isPickupRestricted(item.getItemId()) && c.getPlayer().haveItem(item.getItemId(), 1, true, true)) {
            c.getSession().write(MaplePacketCreator.getInventoryFull());
            c.getSession().write(MaplePacketCreator.showItemUnavailable());
        //////////System.out.println("-2-");
            return false;
        }
        if (MapleItemInformationProvider.getInstance().isKarmaAble(item.getItemId())) {
            item.setFlag((byte) GameConstants.UNTRADEABLE);
            /*c.getPlayer().getClient().getSession().write(MaplePacketCreator.getCharInfo(c.getPlayer()));
            c.getPlayer().getMap().removePlayer(c.getPlayer());
            c.getPlayer().getMap().addPlayer(c.getPlayer());*/
        }
        //short quantity = item.getQuantity();
        //////////System.out.println("-3-");
       
      /*  if (type.equals(MapleInventoryType.EQUIP)) {
            if (quantity == 1) {
                byte newSlot = c.getPlayer().getInventory(type).addItem(item);
                item.log("Adding from drop. (" + logInfo + " )", false);
        //////////System.out.println("-17-");

                if (newSlot == -1) {
                    c.getSession().write(MaplePacketCreator.getInventoryFull());
                    c.getSession().write(MaplePacketCreator.getShowInventoryFull());
        //////////System.out.println("-18-");
                    return false;
                }
                c.getSession().write(MaplePacketCreator.addInventorySlot(type, item, true));
        //////////System.out.println("-19-");
            } else {
                throw new RuntimeException("Trying to create equip with non-one quantity");
            }
        }*/
        if (show) {
            c.getSession().write(MaplePacketCreator.getShowItemGain(item.getItemId(), item.getQuantity()));
        //////////System.out.println("-20-");
        }
        return true;
    }
    public static boolean 商店防止复制(MapleClient c, IItem item) {
        return 商店防止复制(c, item, "", true);
    }

    public static boolean 商店防止复制(MapleClient c, IItem item, String logInfo, boolean show) {
        MapleItemInformationProvider ii = MapleItemInformationProvider.getInstance();
        MapleInventoryType type = ii.getInventoryType(item.getItemId());
        //////////System.out.println("-1-");
        if (!c.getChannelServer().allowMoreThanOne() && ii.isPickupRestricted(item.getItemId()) && c.getPlayer().haveItem(item.getItemId(), 1, true, true)) {
            c.getSession().write(MaplePacketCreator.getInventoryFull());
            c.getSession().write(MaplePacketCreator.showItemUnavailable());
        //////////System.out.println("-2-");
            return false;
        }
        if (MapleItemInformationProvider.getInstance().isKarmaAble(item.getItemId())) {
            item.setFlag((byte) GameConstants.UNTRADEABLE);
            /*c.getPlayer().getClient().getSession().write(MaplePacketCreator.getCharInfo(c.getPlayer()));
            c.getPlayer().getMap().removePlayer(c.getPlayer());
            c.getPlayer().getMap().addPlayer(c.getPlayer());*/
        }
        short quantity = item.getQuantity();
        //////////System.out.println("-3-");
        if (!type.equals(MapleInventoryType.EQUIP)) {
            short slotMax = ii.getSlotMax(c, item.getItemId());
            List<IItem> existing = c.getPlayer().getInventory(type).listById(item.getItemId());
        //////////System.out.println("-4-");
            if (!ii.isThrowingStar(item.getItemId()) && !ii.isBullet(item.getItemId())) {
        //////////System.out.println("-5-");
                if (existing.size() > 0) { // first update all existing slots to slotMax
                    Iterator<IItem> i = existing.iterator();
        //////////System.out.println("-6-");
                    while (quantity > 0) {
        //////////System.out.println("-7-");
                        if (i.hasNext()) {
                            Item eItem = (Item) i.next();
                            short oldQ = eItem.getQuantity();
        //////////System.out.println("-8-");
                            if (oldQ < slotMax && item.getOwner().equals(eItem.getOwner()) && slotMax <= (slotMax - oldQ)) {
                                ////////System.out.println(oldQ +"||"+ slotMax +"||"+ item.getOwner() +"||"+ slotMax +"||"+ (slotMax - oldQ));
                                short newQ = (short) Math.min(oldQ + quantity, slotMax);
                                quantity -= (newQ - oldQ);
                                eItem.setQuantity(newQ);
                                eItem.log("Added " + (newQ - oldQ) + " items to stack, new quantity is " + newQ + " (" + logInfo + " )", false);
                                c.getSession().write(MaplePacketCreator.updateInventorySlot(type, eItem, true));
        //////////System.out.println("-9-");
                        }else{
                        } 
        //////////System.out.println("-10-");
                            break;
                        }
                    }
                } // add new slots if there is still something left
                while (quantity > 0) {
                    short newQ = (short) Math.min(quantity, slotMax);
                    quantity -= newQ;
                    Item nItem = new Item(item.getItemId(), (byte) 0, newQ);
                    nItem.setOwner(item.getOwner());
                    nItem.log("Created while adding from drop. Quantity: " + newQ + " (" + logInfo + " )", false);
                    byte newSlot = c.getPlayer().getInventory(type).addItem(nItem);
        //////////System.out.println("-11-");
                    if (newSlot == -1) {
                        c.getSession().write(MaplePacketCreator.getInventoryFull());
                        c.getSession().write(MaplePacketCreator.getShowInventoryFull());
                        item.setQuantity((short) (quantity + newQ));
        //////////System.out.println("-12-");
                        return false;
                    }
                    c.getSession().write(MaplePacketCreator.addInventorySlot(type, nItem, true));
        //////////System.out.println("-13-");
                }
            } else {
                // Throwing Stars and Bullets - Add all into one slot regardless of quantity.
                Item nItem = new Item(item.getItemId(), (byte) 0, quantity);
                nItem.log("Created while adding by id. Quantity: " + quantity + " (" + logInfo + " )", false);
                byte newSlot = c.getPlayer().getInventory(type).addItem(nItem);
        //////////System.out.println("-14-");
                if (newSlot == -1) {
                    c.getSession().write(MaplePacketCreator.getInventoryFull());
                    c.getSession().write(MaplePacketCreator.getShowInventoryFull());
        //////////System.out.println("-15-");
                    return false;
                }
                c.getSession().write(MaplePacketCreator.addInventorySlot(type, nItem));
                c.getSession().write(MaplePacketCreator.enableActions());
        //////////System.out.println("-16-");
            }
        } else {
            if (quantity == 1) {
                byte newSlot = c.getPlayer().getInventory(type).addItem(item);
                item.log("Adding from drop. (" + logInfo + " )", false);
        //////////System.out.println("-17-");

                if (newSlot == -1) {
                    c.getSession().write(MaplePacketCreator.getInventoryFull());
                    c.getSession().write(MaplePacketCreator.getShowInventoryFull());
        //////////System.out.println("-18-");
                    return false;
                }
                c.getSession().write(MaplePacketCreator.addInventorySlot(type, item, true));
        //////////System.out.println("-19-");
            } else {
                throw new RuntimeException("Trying to create equip with non-one quantity");
            }
        }
        if (show) {
            c.getSession().write(MaplePacketCreator.getShowItemGain(item.getItemId(), item.getQuantity()));
        //////////System.out.println("-20-");
        }
        return true;
    }
    public static void removeFromSlot(MapleClient c, MapleInventoryType type, byte slot, short quantity, boolean fromDrop) {
        removeFromSlot(c, type, slot, quantity, fromDrop, false);
    }

    public static void removeFromSlot(MapleClient c, MapleInventoryType type, byte slot, short quantity, boolean fromDrop, boolean consume) {
        if (quantity < 0) {
            return;
        }
        IItem item = c.getPlayer().getInventory(type).getItem(slot);
        MapleItemInformationProvider ii = MapleItemInformationProvider.getInstance();
        boolean allowZero = consume && (ii.isThrowingStar(item.getItemId()) || ii.isBullet(item.getItemId()));
        c.getPlayer().getInventory(type).removeItem(slot, quantity, allowZero);
        if (item.getQuantity() == 0 && !allowZero) {
            c.getSession().write(MaplePacketCreator.clearInventoryItem(type, item.getPosition(), fromDrop));
        } else {
            if (!consume) {
                item.log(c.getPlayer().getName() + " removed " + quantity + ". " + item.getQuantity() + " left.", false);
            }
            c.getSession().write(MaplePacketCreator.updateInventorySlot(type, (Item) item, fromDrop));
        }
    }

    public static void removeById(MapleClient c, MapleInventoryType type, int itemId, int quantity, boolean fromDrop, boolean consume, boolean v) {
        List<IItem> items = c.getPlayer().getInventory(type).listById(itemId);
        int remremove = quantity;
        for (IItem item : items) {
            if (remremove <= item.getQuantity()) {
                removeFromSlot(c, type, item.getPosition(), (short) remremove, fromDrop, consume);
                remremove = 0;
                break;
            } else {
                remremove -= item.getQuantity();
                removeFromSlot(c, type, item.getPosition(), item.getQuantity(), fromDrop, consume);
            }
        }
        if (remremove > 0) {
            throw new RuntimeException("[h4x] Not enough items available (" + itemId + ", " + (quantity - remremove) + "/" + quantity + ")");
        }
    }
    //    public static boolean addById(MapleClient c, int itemId, short quantity, String logInfo) {
    public static void removeById(MapleClient c, MapleInventoryType type, int itemId, int quantity, boolean fromDrop, boolean consume) { //删除ID 消费类处理
        if (quantity < 0) { //物品小于0
            return;//不处理
        }
        List<IItem> items = c.getPlayer().getInventory(type).listById(itemId);
        int remremove = quantity; //定义物品
        for (IItem item : items) {
            if (remremove <= item.getQuantity()) { //定义物品 小于或者等于 物品数量
                removeFromSlot(c, type, item.getPosition(), (short) remremove, fromDrop, consume);
                remremove = 0;//去除等于0
                break;
            } else {
                remremove -= item.getQuantity();//数量 减少 物品数量
                removeFromSlot(c, type, item.getPosition(), item.getQuantity(), fromDrop, consume);
            }if(remremove > 0){
                remremove -= item.getQuantity();//数量 减少 物品数量
                removeFromSlot(c, type, item.getPosition(), item.getQuantity(), fromDrop, consume);
            }
        }
        //if (remremove > 0) { //去除 大于0
           // throw new InventoryException("可用的物品数量不足。 ( ItemID:" + itemId + ", 去除量:" + (quantity - remremove) + "| 物品数量:" + quantity + ")");
            
       // }
    }

    public static void move(MapleClient c, MapleInventoryType type, byte src, byte dst) {
        if (src < 0 || dst < 0 || src > c.getPlayer().getInventory(type).getSlots() || dst > c.getPlayer().getInventory(type).getSlots()) {
            return;
        }
        MapleItemInformationProvider ii = MapleItemInformationProvider.getInstance();
        IItem source = c.getPlayer().getInventory(type).getItem(src);
        IItem initialTarget = c.getPlayer().getInventory(type).getItem(dst);
        if (source == null) {
            return;
        }
        short olddstQ = -1;
        if (initialTarget != null) {
            olddstQ = initialTarget.getQuantity();
        }
        short oldsrcQ = source.getQuantity();
        short slotMax = ii.getSlotMax(c, source.getItemId());
        boolean op = c.getPlayer().getInventory(type).move(src, dst, slotMax);
        if (!op) {
            c.getSession().write(MaplePacketCreator.enableActions());
            return;
        }
        if (!type.equals(MapleInventoryType.EQUIP) && initialTarget != null &&
                initialTarget.getItemId() == source.getItemId() && !ii.isThrowingStar(source.getItemId()) &&
                !ii.isBullet(source.getItemId())) {
            if ((olddstQ + oldsrcQ) > slotMax) {
                c.getSession().write(MaplePacketCreator.moveAndMergeWithRestInventoryItem(type, src, dst, (short) ((olddstQ + oldsrcQ) - slotMax), slotMax));
            } else {
                c.getSession().write(MaplePacketCreator.moveAndMergeInventoryItem(type, src, dst, ((Item) c.getPlayer().getInventory(type).getItem(dst)).getQuantity()));
            }
        } else {
            c.getSession().write(MaplePacketCreator.moveInventoryItem(type, src, dst));
        }
    }

    public static void equip(MapleClient c, byte src, byte dst) {
        MapleItemInformationProvider ii = MapleItemInformationProvider.getInstance();
        Equip source = (Equip) c.getPlayer().getInventory(MapleInventoryType.EQUIP).getItem(src);
        Equip target = (Equip) c.getPlayer().getInventory(MapleInventoryType.EQUIPPED).getItem(dst);

        if (source == null) {
            return;
        }
        if (!c.getPlayer().isGM()) {
            switch (source.getItemId()) {
                //case 1002140: // Wizet Invincible Hat
                case 1042003: // Wizet Plain Suit
                case 1062007: // Wizet Plain Suit Pants
                case 1322013: // Wizet Secret Agent Suitcase
                    removeAllById(c, source.getItemId(), false);
                    c.getPlayer().dropMessage(1, "无法佩带此物品");
                    return;
            }
        }
        int reqLevel = ii.getReqLevel(source.getItemId());
        int reqStr = ii.getReqStr(source.getItemId());
        int reqDex = ii.getReqDex(source.getItemId());
        int reqInt = ii.getReqInt(source.getItemId());
        int reqLuk = ii.getReqLuk(source.getItemId());
        boolean cashSlot = false;
        if (source.getItemId() == 1812006) {
            removeAllById(c, source.getItemId(), false);
            c.getPlayer().dropMessage(1, "物品已被封印");
            return;
        }
        if (ii.isCash(source.getItemId()) == true && source.getUniqueId() == 0) {
            source.setUniqueId(1);
           // System.out.println("获得现金物品给予值B：" + source.getUniqueId());
        }
        if (dst < -99) {
            cashSlot = true;
        }
        if (!ii.isCash(source.getItemId())) {
            String type = ii.getType(source.getItemId());
            if ((type.equalsIgnoreCase("Cp") && dst != -1) ||
                    (type.equalsIgnoreCase("Af") && dst != -2) ||
                    (type.equalsIgnoreCase("Ay") && dst != -3) ||
                    (type.equalsIgnoreCase("Ae") && dst != -4) ||
                    ((type.equalsIgnoreCase("Ma") || type.equalsIgnoreCase("MaPn")) && dst != -5) ||
                    (type.equalsIgnoreCase("Pn") && dst != -6) ||
                    (type.equalsIgnoreCase("So") && dst != -7) ||
                    (type.equalsIgnoreCase("Gv") && dst != -8) ||
                    (type.equalsIgnoreCase("Sr") && dst != -9) ||
                    (type.equalsIgnoreCase("Si") && dst != -10) ||
                    ((type.equalsIgnoreCase("Wp") || type.equalsIgnoreCase("WpSi")) && dst != -11) ||
                    (type.equalsIgnoreCase("Pe") && dst != -17)) {
                c.getSession().write(MaplePacketCreator.enableActions());
               // return;
            }
        }
        if ((ii.getName(source.getItemId()).contains("(Male)") && c.getPlayer().getGender() != 0) ||
                (ii.getName(source.getItemId()).contains("(Female)") && c.getPlayer().getGender() != 1) ||
                reqLevel > c.getPlayer().getLevel() ||
                reqStr > c.getPlayer().getTotalStr() ||
                reqDex > c.getPlayer().getTotalDex() ||
                reqInt > c.getPlayer().getTotalInt() ||
                reqLuk > c.getPlayer().getTotalLuk() ||
                (cashSlot && !ii.isCash(source.getItemId()))) {
            c.getSession().write(MaplePacketCreator.enableActions());
            //return;
        }
        Map stats = ii.getEquipStats(source.getItemId());
        if (MapleItemInformationProvider.getInstance().isKarmaAble(source.getItemId()) && source.getFlag() != GameConstants.UNTRADEABLE) { //装备交易属性
            source.setFlag((byte) GameConstants.UNTRADEABLE);
            c.getSession().write(MaplePacketCreator.getCharInfo(c.getPlayer()));
            c.getPlayer().getMap().removePlayer(c.getPlayer());
            c.getPlayer().getMap().addPlayer(c.getPlayer());
        }
        if (MapleItemInformationProvider.getInstance().isUntradeableOnEquip(source.getItemId()) && source.getFlag() != GameConstants.UNTRADEABLE) {
            source.setFlag((byte) GameConstants.UNTRADEABLE);
            c.getSession().write(MaplePacketCreator.getCharInfo(c.getPlayer()));
            c.getPlayer().getMap().removePlayer(c.getPlayer());
            c.getPlayer().getMap().addPlayer(c.getPlayer());
        }
        byte flag = source.getFlag();
        boolean upgrade = false;
        boolean charm = false;
        if (((stats.get("equipTradeBlock") != null) || (source.getItemId() / 10000 == 167)) && (!ItemFlag.UNTRADEABLE.check(flag))) {
            flag = (byte) (flag | ItemFlag.UNTRADEABLE.getValue());
            source.setFlag(flag);
            upgrade = true;
        }
        if (dst == -6) { // unequip the overall
            IItem top = c.getPlayer().getInventory(MapleInventoryType.EQUIPPED).getItem((byte) -5);
            if (top != null && ii.isOverall(top.getItemId())) {
                if (c.getPlayer().getInventory(MapleInventoryType.EQUIP).isFull()) {
                    c.getSession().write(MaplePacketCreator.getInventoryFull());
                    c.getSession().write(MaplePacketCreator.getShowInventoryFull());
                    return;
                }
                unequip(c, (byte) -5, c.getPlayer().getInventory(MapleInventoryType.EQUIP).getNextFreeSlot());
            }
        } else if (dst == -5) { // unequip the bottom and top
            IItem top = c.getPlayer().getInventory(MapleInventoryType.EQUIPPED).getItem((byte) -5);
            IItem bottom = c.getPlayer().getInventory(MapleInventoryType.EQUIPPED).getItem((byte) -6);
            if (top != null && ii.isOverall(source.getItemId())) {
                if (c.getPlayer().getInventory(MapleInventoryType.EQUIP).isFull(bottom != null && ii.isOverall(source.getItemId()) ? 1 : 0)) {
                    c.getSession().write(MaplePacketCreator.getInventoryFull());
                    c.getSession().write(MaplePacketCreator.getShowInventoryFull());
                    return;
                }
                unequip(c, (byte) -5, c.getPlayer().getInventory(MapleInventoryType.EQUIP).getNextFreeSlot());
            }
            if (bottom != null && ii.isOverall(source.getItemId())) {
                if (c.getPlayer().getInventory(MapleInventoryType.EQUIP).isFull()) {
                    c.getSession().write(MaplePacketCreator.getInventoryFull());
                    c.getSession().write(MaplePacketCreator.getShowInventoryFull());
                    return;
                }
                unequip(c, (byte) -6, c.getPlayer().getInventory(MapleInventoryType.EQUIP).getNextFreeSlot());
            }
        } else if (dst == -10) { // check if weapon is two-handed
            IItem weapon = c.getPlayer().getInventory(MapleInventoryType.EQUIPPED).getItem((byte) -11);
            if (weapon != null && ii.isTwoHanded(weapon.getItemId())) {
                if (c.getPlayer().getInventory(MapleInventoryType.EQUIP).isFull()) {
                    c.getSession().write(MaplePacketCreator.getInventoryFull());
                    c.getSession().write(MaplePacketCreator.getShowInventoryFull());
                    return;
                }
                unequip(c, (byte) -11, c.getPlayer().getInventory(MapleInventoryType.EQUIP).getNextFreeSlot());
            }
        } else if (dst == -11) {
            IItem shield = c.getPlayer().getInventory(MapleInventoryType.EQUIPPED).getItem((byte) -10);
            if (shield != null && ii.isTwoHanded(source.getItemId())) {
                if (c.getPlayer().getInventory(MapleInventoryType.EQUIP).isFull()) {
                    c.getSession().write(MaplePacketCreator.getInventoryFull());
                    c.getSession().write(MaplePacketCreator.getShowInventoryFull());
                    return;
                }
                unequip(c, (byte) -10, c.getPlayer().getInventory(MapleInventoryType.EQUIP).getNextFreeSlot());
            }
        } else if (dst == -18) {
            if (c.getPlayer().getMount() != null) {
                c.getPlayer().getMount().setItemId(source.getItemId());
            }
        }
        source = (Equip) c.getPlayer().getInventory(MapleInventoryType.EQUIP).getItem(src);
        target = (Equip) c.getPlayer().getInventory(MapleInventoryType.EQUIPPED).getItem(dst);
        c.getPlayer().getInventory(MapleInventoryType.EQUIP).removeSlot(src);
        if (target != null) {
            c.getPlayer().getInventory(MapleInventoryType.EQUIPPED).removeSlot(dst);
        }
        source.setPosition(dst);
        c.getPlayer().getInventory(MapleInventoryType.EQUIPPED).addFromDB(source);
        if (target != null) {
            target.setPosition(src);
            c.getPlayer().getInventory(MapleInventoryType.EQUIP).addFromDB(target);
        }
        if (c.getPlayer().getBuffedValue(MapleBuffStat.BOOSTER) != null && ii.isWeapon(source.getItemId())) {
            c.getPlayer().cancelBuffStats(MapleBuffStat.BOOSTER);
        }
        c.getSession().write(MaplePacketCreator.moveInventoryItem(MapleInventoryType.EQUIP, src, dst, (byte) 2));
        c.getPlayer().equipChanged();
        //c.getSession().write(MaplePacketCreator.upChrLook());
    }
    public boolean isWritOfSolomon(int itemId) {
        return (itemId >= 2370000 && itemId <= 2370012);
    }
    public static void unequip(MapleClient c, byte src, byte dst) {
        Equip source = (Equip) c.getPlayer().getInventory(MapleInventoryType.EQUIPPED).getItem(src);
        Equip target = (Equip) c.getPlayer().getInventory(MapleInventoryType.EQUIP).getItem(dst);
        //if (dst < 0) {
            //log.warn("Unequipping to negative slot. ({}: {}->{})", new Object[]{c.getPlayer().getName(), src, dst});
        //}
        if (source == null) {
            return;
        }
        if (target != null && src <= 0) { // do not allow switching with equip
            c.getSession().write(MaplePacketCreator.getInventoryFull());
            return;
        }
        c.getPlayer().getInventory(MapleInventoryType.EQUIPPED).removeSlot(src);
        if (target != null) {
            c.getPlayer().getInventory(MapleInventoryType.EQUIP).removeSlot(dst);
        }
        source.setPosition(dst);
        c.getPlayer().getInventory(MapleInventoryType.EQUIP).addFromDB(source);
        if (target != null) {
            target.setPosition(src);
            c.getPlayer().getInventory(MapleInventoryType.EQUIPPED).addFromDB(target);
        }
        c.getSession().write(MaplePacketCreator.moveInventoryItem(MapleInventoryType.EQUIP, src, dst, (byte) 1));
        c.getPlayer().equipChanged();
    }

    public static void drop(MapleClient c, MapleInventoryType type, byte src, short quantity) {
        MapleItemInformationProvider ii = MapleItemInformationProvider.getInstance();
        if (src < 0) {
            type = MapleInventoryType.EQUIPPED;
        }
        IItem source = c.getPlayer().getInventory(type).getItem(src);
        if (type == MapleInventoryType.EQUIP) {
            Equip nEquip = (Equip) source;
            String itemName = ii.getName(nEquip.getItemId());
            if (ii.不可交易A(source.getItemId()) == true || ii.固有道具(source.getItemId()) == true && !itemName.contains("永恒") && !itemName.contains("重生")) {
                c.getPlayer().dropMessage(1, "不可交易/固有道具的物品你也想丢？");
                return;
            }
        }
        if(type != MapleInventoryType.EQUIP){
            if (ii.不可交易A(source.getItemId()) == true || ii.固有道具(source.getItemId()) == true) {
                c.getPlayer().dropMessage(1, "不可交易/固有道具的物品你也想丢？！");
                return;
            }
        }
        if(ii.isCash(source.getItemId()) == true){
            ChannelServer cserv = c.getChannelServer();
            if(!c.getPlayer().isGM()){
            cserv.getPlayerStorage().getCharacterByName(c.getPlayer().getName()).gainWarning(true, 1);
            }
            try {
                cserv.getWorldInterface().broadcastMessage(null, MaplePacketCreator.serverNotice(6, "[封号公告]" + c.getPlayer().getName() + " 由于使用非法程序修改WZ丢弃现金物品被永久封停处理。").getBytes());
            } catch (RemoteException ex) {
                Logger.getLogger(MapleInventoryManipulator.class.getName()).log(Level.SEVERE, null, ex);
            }
            return;
        }
        if (quantity > ii.getSlotMax(c, source.getItemId())) {
            try {
                c.getChannelServer().getWorldInterface().broadcastGMMessage(c.getPlayer().getName(), MaplePacketCreator.serverNotice(0, c.getPlayer().getName() + " is dropping more than slotMax.").getBytes());
            } catch (Throwable u) {
            }
        }
        if (quantity < 0 || source == null || quantity == 0 && !ii.isThrowingStar(source.getItemId()) && !ii.isBullet(source.getItemId())) {
            String message = "Dropping " + quantity + " " + (source == null ? "?" : source.getItemId()) + " (" +
                    type.name() + "/" + src + ")";
            log.info(MapleClient.getLogMessage(c, message));
            c.disconnect();
            return;
        }
        Point dropPos = new Point(c.getPlayer().getPosition());
        if (quantity < source.getQuantity() && !ii.isThrowingStar(source.getItemId()) && !ii.isBullet(source.getItemId())) {
            IItem target = source.copy();
            target.setQuantity(quantity);
            target.log(c.getPlayer().getName() + " dropped part of a stack at " + dropPos.toString() + " on map " + c.getPlayer().getMapId() + ". Quantity of this (new) instance is now " + quantity, false);
            source.setQuantity((short) (source.getQuantity() - quantity));
            source.log(c.getPlayer().getName() + " dropped part of a stack at " + dropPos.toString() + " on map " + c.getPlayer().getMapId() + ". Quantity of this (leftover) instance is now " + source.getQuantity(), false);
            c.getSession().write(MaplePacketCreator.dropInventoryItemUpdate(type, source));
            boolean weddingRing = source.getItemId() == 1112804;
            boolean LiRing = source.getItemId() == 1112405;
            if (weddingRing) {
                c.getPlayer().getMap().disappearingItemDrop(c.getPlayer(), c.getPlayer(), target, dropPos);
            } else if (LiRing) {
                c.getPlayer().getMap().disappearingItemDrop(c.getPlayer(), c.getPlayer(), target, dropPos);
            } else if (c.getPlayer().getMap().getEverlast()) {
                if (!c.getChannelServer().allowUndroppablesDrop() && (ii.isDropRestricted(target.getItemId()))) {
                    c.getPlayer().getMap().disappearingItemDrop(c.getPlayer(), c.getPlayer(), target, dropPos);
                } else {
                    if (LiRing) {
                        c.getPlayer().getMap().disappearingItemDrop(c.getPlayer(), c.getPlayer(), target, dropPos);
                    } else {
                        c.getPlayer().getMap().spawnItemDrop(c.getPlayer(), c.getPlayer(), target, dropPos, true, false);
                    }
                }
            } else {
                if (!c.getChannelServer().allowUndroppablesDrop() && (ii.isDropRestricted(target.getItemId()))) {
                    c.getPlayer().getMap().disappearingItemDrop(c.getPlayer(), c.getPlayer(), target, dropPos);
                } else {
                    if (LiRing) {
                        c.getPlayer().getMap().disappearingItemDrop(c.getPlayer(), c.getPlayer(), target, dropPos);
                    } else {
                        c.getPlayer().getMap().spawnItemDrop(c.getPlayer(), c.getPlayer(), target, dropPos, true, false);
                    }
                }
            }
        } else {
            source.log(c.getPlayer().getName() + " dropped this (with full quantity) at " + dropPos.toString() + " on map " + c.getPlayer().getMapId(), false);
            c.getPlayer().getInventory(type).removeSlot(src);
            c.getSession().write(MaplePacketCreator.dropInventoryItem((src < 0 ? MapleInventoryType.EQUIP : type), src));
            boolean LiRing = source.getItemId() == 1112405;
            if (src < 0) {
                c.getPlayer().equipChanged();
            }
            if (c.getPlayer().getMap().getEverlast()) {
                if (!c.getChannelServer().allowUndroppablesDrop() && ii.isDropRestricted(source.getItemId())) {
                    c.getPlayer().getMap().disappearingItemDrop(c.getPlayer(), c.getPlayer(), source, dropPos);
                } else {
                    c.getPlayer().getMap().spawnItemDrop(c.getPlayer(), c.getPlayer(), source, dropPos, true, false);
                    if (LiRing) {
                        c.getPlayer().getMap().disappearingItemDrop(c.getPlayer(), c.getPlayer(), source, dropPos);
                    } else {
                        c.getPlayer().getMap().spawnItemDrop(c.getPlayer(), c.getPlayer(), source, dropPos, true, true);
                    }
                }
            } else {
                if (!c.getChannelServer().allowUndroppablesDrop() && ii.isDropRestricted(source.getItemId())) {
                    c.getPlayer().getMap().disappearingItemDrop(c.getPlayer(), c.getPlayer(), source, dropPos);
                } else {
                    if (LiRing) {
                        c.getPlayer().getMap().disappearingItemDrop(c.getPlayer(), c.getPlayer(), source, dropPos);
                    } else {
                        c.getPlayer().getMap().spawnItemDrop(c.getPlayer(), c.getPlayer(), source, dropPos, true, true);
                    }
                }
            }
        }
    }
}