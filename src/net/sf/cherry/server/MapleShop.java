package net.sf.cherry.server;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.LinkedHashSet;
import java.util.LinkedList;
import java.util.List;
import java.util.Set;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import net.sf.cherry.client.IItem;
import net.sf.cherry.client.Item;
import net.sf.cherry.client.MapleClient;
import net.sf.cherry.client.MapleInventoryType;
import net.sf.cherry.client.MaplePet;
import net.sf.cherry.database.DatabaseConnection;
import net.sf.cherry.net.PacketProcessor;
import net.sf.cherry.tools.MaplePacketCreator;

public class MapleShop {

    private static final Set<Integer> rechargeableItems = new LinkedHashSet();
    private int id;
    private int npcId;
    private List<MapleShopItem> items;
    private static Logger log = LoggerFactory.getLogger(PacketProcessor.class);

    private MapleShop(int id, int npcId) {
        this.id = id;
        this.npcId = npcId;
        this.items = new LinkedList();
    }

    public void addItem(MapleShopItem item) {
        this.items.add(item);
    }

    public void sendShop(MapleClient c) {
        c.getPlayer().setShop(this);
        c.getSession().write(MaplePacketCreator.getNPCShop(c, getNpcId(), this.items));
    }

    public void buy(MapleClient c, int itemId, short quantity) {
        if (quantity <= 0) {
            log.warn(c.getPlayer().getName() + " is buying an invalid amount: " + quantity + " of itemid: " + itemId);
            //c.disconnect();
            return;
        }
        MapleShopItem item = findById(itemId);
        MapleItemInformationProvider ii = MapleItemInformationProvider.getInstance();
        if ((item != null) && (item.getPrice() > 0) && (c.getPlayer().getMeso() >= item.getPrice() * quantity)) {
            if (MapleInventoryManipulator.checkSpace(c, itemId, quantity, "")) {
                if ((itemId >= 5000000) && (itemId <= 5000100)) {
                    if (quantity > 1) {
                        quantity = 1;
                    }
                    int petId = MaplePet.createPet(itemId);
                    MapleInventoryManipulator.addById(c, itemId, quantity, "Pet was purchased.", null, petId);
                } else if (ii.isRechargable(itemId)) {
                    short rechquantity = ii.getSlotMax(c, item.getItemId());
                    MapleInventoryManipulator.addById(c, itemId, rechquantity, "Rechargable item purchased.", null, -1);
                } else {
                    MapleInventoryManipulator.addById(c, itemId, quantity, c.getPlayer().getName() + " bought " + quantity + " for " + item.getPrice() * quantity + " from shop " + this.id, null, -1);
                }
                c.getPlayer().gainMeso(-(item.getPrice() * quantity), false);
                c.getSession().write(MaplePacketCreator.confirmShopTransaction((byte) 0));
            } else {
                c.getSession().write(MaplePacketCreator.confirmShopTransaction((byte) 3));
            }
        }
    }

    public void sell(MapleClient c, MapleInventoryType type, byte slot, short quantity) {
        if ((quantity == 65535) || (quantity == 0)) {
            quantity = 1;
        }
        MapleItemInformationProvider ii = MapleItemInformationProvider.getInstance();
        IItem item = c.getPlayer().getInventory(type).getItem(slot);
        if (ii.isThrowingStar(item.getItemId())) {
            quantity = item.getQuantity();
        }
        if (quantity < 0) {
            AutobanManager.getInstance().addPoints(c, 1000, 0L, "Selling " + quantity + " " + item.getItemId() + " (" + type.name() + "/" + slot + ")");

            return;
        }
        short iQuant = item.getQuantity();
        if (iQuant == 65535) {
            iQuant = 1;
        }
        if ((quantity <= iQuant) && (iQuant > 0)) {
            MapleInventoryManipulator.removeFromSlot(c, type, slot, quantity, false);
            double price;
            if (ii.isThrowingStar(item.getItemId())) {
                price = ii.getWholePrice(item.getItemId()) / ii.getSlotMax(c, item.getItemId());
            } else {
                price = ii.getPrice(item.getItemId());
            }
            int recvMesos = (int) Math.max(Math.ceil(price * quantity), 0.0D);
            if ((price != -1.0D) && (recvMesos > 0)) {
                c.getPlayer().gainMeso(recvMesos, true);
            }
            c.getSession().write(MaplePacketCreator.confirmShopTransaction((byte) 8));
        }
    }

    public void recharge(MapleClient c, byte slot) {
        MapleItemInformationProvider ii = MapleItemInformationProvider.getInstance();
        IItem item = c.getPlayer().getInventory(MapleInventoryType.USE).getItem(slot);
        if ((item == null) || ((!ii.isThrowingStar(item.getItemId())) && (!ii.isBullet(item.getItemId())))) {
            if ((item != null) && ((!ii.isThrowingStar(item.getItemId())) || (!ii.isBullet(item.getItemId())))) {
                log.warn(c.getPlayer().getName() + " is trying to recharge " + item.getItemId());
            }
            return;
        }
        short slotMax = ii.getSlotMax(c, item.getItemId());

        if (item.getQuantity() < 0) {
            log.warn(c.getPlayer().getName() + " is trying to recharge " + item.getItemId() + " with quantity " + item.getQuantity());
        }
        if (item.getQuantity() < slotMax) {
            int price = (int) Math.round(ii.getPrice(item.getItemId()) * (slotMax - item.getQuantity()));
            if (c.getPlayer().getMeso() >= price) {
                item.setQuantity(slotMax);
                c.getSession().write(MaplePacketCreator.updateInventorySlot(MapleInventoryType.USE, (Item) item));
                c.getPlayer().gainMeso(-price, false, true, false);
                c.getSession().write(MaplePacketCreator.confirmShopTransaction((byte) 8));
            }
        }
    }

    protected MapleShopItem findById(int itemId) {
        for (MapleShopItem item : this.items) {
            if (item.getItemId() == itemId) {
                return item;
            }
        }
        return null;
    }

    public static MapleShop createFromDB(int id, boolean isShopId) {
        MapleShop ret = null;
        MapleItemInformationProvider ii = MapleItemInformationProvider.getInstance();
        int shopId;
        try {
            Connection con = DatabaseConnection.getConnection();
            PreparedStatement ps;
            if (isShopId) {
                ps = con.prepareStatement("SELECT * FROM shops WHERE shopid = ?");
            } else {
                ps = con.prepareStatement("SELECT * FROM shops WHERE npcid = ?");
            }

            ps.setInt(1, id);
            ResultSet rs = ps.executeQuery();
            if (rs.next()) {
                shopId = rs.getInt("shopid");
                ret = new MapleShop(shopId, rs.getInt("npcid"));
                rs.close();
                ps.close();
            } else {
                rs.close();
                ps.close();
                return null;
            }
            ps = con.prepareStatement("SELECT * FROM shopitems WHERE shopid = ? ORDER BY position ASC");
            ps.setInt(1, shopId);
            rs = ps.executeQuery();
            List<Integer> recharges = new ArrayList<Integer>(rechargeableItems);
            while (rs.next()) {
                if (ii.isThrowingStar(rs.getInt("itemid")) || ii.isBullet(rs.getInt("itemid"))) {
                    MapleShopItem starItem = new MapleShopItem((short) 1, rs.getInt("itemid"), rs.getInt("price"));
                    ret.addItem(starItem);
                    if (rechargeableItems.contains(starItem.getItemId())) {
                        recharges.remove(Integer.valueOf(starItem.getItemId()));
                    }
                } else {
                    ret.addItem(new MapleShopItem((short) 1000, rs.getInt("itemid"), rs.getInt("price")));
                }
            }
            for (Integer recharge : recharges) {
                ret.addItem(new MapleShopItem((short) 1000, recharge.intValue(), 0));
            }
            rs.close();
            ps.close();
        } catch (SQLException e) {
            log.error("Could not load shop", e);
        }

        return ret;
    }

    public int getNpcId() {
        return this.npcId;
    }

    public int getId() {
        return this.id;
    }

    static {
        for (int i = 2070000; i <= 2070018; i++) {
            rechargeableItems.add(Integer.valueOf(i));
        }
        rechargeableItems.remove(Integer.valueOf(2070014));
        rechargeableItems.remove(Integer.valueOf(2070015));
        rechargeableItems.remove(Integer.valueOf(2070016));
        rechargeableItems.remove(Integer.valueOf(2070017));
        rechargeableItems.remove(Integer.valueOf(2070018));

        for (int i = 2330000; i <= 2330006; i++) {
            rechargeableItems.add(Integer.valueOf(i));
        }
        rechargeableItems.add(Integer.valueOf(2331000));
        rechargeableItems.add(Integer.valueOf(2332000));
    }
}
