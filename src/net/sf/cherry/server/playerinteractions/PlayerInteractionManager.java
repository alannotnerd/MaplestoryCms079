package net.sf.cherry.server.playerinteractions;

import java.sql.PreparedStatement;
import java.sql.SQLException;
import java.util.LinkedList;
import java.util.List;
import java.util.logging.Level;
import java.util.logging.Logger;

import net.sf.cherry.client.Equip;
import net.sf.cherry.client.IItem;
import net.sf.cherry.client.MapleCharacter;
import net.sf.cherry.client.MapleClient;
import net.sf.cherry.database.DatabaseConnection;
import net.sf.cherry.net.MaplePacket;
import net.sf.cherry.server.MapleInventoryManipulator;
import net.sf.cherry.server.maps.AbstractMapleMapObject;
import net.sf.cherry.tools.MaplePacketCreator;

public abstract class PlayerInteractionManager extends AbstractMapleMapObject
        implements IPlayerInteractionManager {

    private String ownerName;
    private int ownerId;
    private byte type;
    private String description = "";
    private short capacity;
    protected MapleCharacter[] visitors = new MapleCharacter[3];
    protected List<MaplePlayerShopItem> items = new LinkedList();

    public PlayerInteractionManager(MapleCharacter owner, int type, String desc, int capacity) {
        setPosition(owner.getPosition());
        this.ownerName = owner.getName();
        this.ownerId = owner.getId();
        this.type = (byte) type;
        this.capacity = (short) capacity;
        this.description = desc;
    }

    public void broadcast(MaplePacket packet, boolean toOwner) {
        for (MapleCharacter visitor : this.visitors) {
            if (visitor != null) {
                visitor.getClient().getSession().write(packet);
            }
        }
        if (toOwner) {
            MapleCharacter pOwner = null;
            if (getShopType() == 2) {
                pOwner = ((MaplePlayerShop) this).getMCOwner();
            }
            if (pOwner != null) {
                pOwner.getClient().getSession().write(packet);
            }
        }
    }

    public void removeVisitor(MapleCharacter visitor) {
        int slot = getVisitorSlot(visitor);
        boolean shouldUpdate = getFreeSlot() == -1;
        if (slot > -1) {
            this.visitors[slot] = null;
            broadcast(MaplePacketCreator.shopVisitorLeave(slot + 1), true);
            if (shouldUpdate) {
                if (getShopType() == 2) {
                    ((HiredMerchant) this).getMap().broadcastMessage(MaplePacketCreator.updateHiredMerchant((HiredMerchant) this));
                } else {
                    ((MaplePlayerShop) this).getMCOwner().getMap().broadcastMessage(MaplePacketCreator.sendInteractionBox(((MaplePlayerShop) this).getMCOwner()));
                }
            }
        }
    }

    public void saveItems()
            throws SQLException {
        PreparedStatement ps = null;
        try {
            for (MaplePlayerShopItem pItems : this.items) {
                if (pItems.getBundles() > 0) {
                    if (pItems.getItem().getType() == 1) {
                        ps = DatabaseConnection.getConnection().prepareStatement("INSERT INTO hiredmerchant (ownerid, itemid, quantity, upgradeslots, level, str, dex, `int`, luk, hp, mp, watk, matk, wdef, mdef, acc, avoid, hands, speed, flag, itemexp, itemlevel,  jump, owner, vicious, xingji, type) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)");
                        Equip eq = (Equip) pItems.getItem();
                        ps.setInt(2, eq.getItemId());
                        ps.setInt(3, 1);
                        ps.setInt(4, eq.getUpgradeSlots());
                        ps.setInt(5, eq.getLevel());
                        ps.setInt(6, eq.getStr());
                        ps.setInt(7, eq.getDex());
                        ps.setInt(8, eq.getInt());
                        ps.setInt(9, eq.getLuk());
                        ps.setInt(10, eq.getHp());
                        ps.setInt(11, eq.getMp());
                        ps.setInt(12, eq.getWatk());
                        ps.setInt(13, eq.getMatk());
                        ps.setInt(14, eq.getWdef());
                        ps.setInt(15, eq.getMdef());
                        ps.setInt(16, eq.getAcc());
                        ps.setInt(17, eq.getAvoid());
                        ps.setInt(18, eq.getHands());
                        ps.setInt(19, eq.getSpeed());
                        ps.setInt(20, eq.getJump());
                        ps.setString(21, eq.getOwner());
                        ps.setInt(22, eq.getFlag());
                        ps.setInt(23, eq.getItemExp());
                        ps.setInt(24, eq.getItemLevel());
                        ps.setInt(25, eq.getVicious());
                        ps.setInt(26, eq.getxingji());
                        ps.setInt(27, 1);
                        
                    } else {
                        ps = DatabaseConnection.getConnection().prepareStatement("INSERT INTO hiredmerchant (ownerid, itemid, quantity, owner, type) VALUES (?, ?, ?, ?, 0)");
                        ps.setInt(2, pItems.getItem().getItemId());
                        ps.setInt(3, pItems.getBundles());
                        ps.setString(4, pItems.getItem().getOwner());
                    }
                    ps.setInt(1, getOwnerId());
                    ps.executeUpdate();
                    ps.close();
                }
            }
        } catch (SQLException ex) {
        } finally {
            try {
                if (ps != null) {
                    ps.close();
                }
            } catch (SQLException ex) {
            }
        }
    }

    public void tempItemsUpdate() {
        try {
            tempItems(true);
            //System.out.println("第二次领取成功");
        } catch (SQLException ex) {
            Logger.getLogger(HiredMerchant.class.getName()).log(Level.SEVERE, "Error Saving " + getOwnerName() + " temporary items.", ex);
        }
    }

    public void tempItems(boolean overwrite) throws SQLException {
        PreparedStatement ps = null;
        try {
            ps = DatabaseConnection.getConnection().prepareStatement("DELETE FROM hiredmerchanttemp WHERE ownerid = ?");
            ps.setInt(1, getOwnerId());
            ps.executeUpdate();
            ps.close();
            if (overwrite) {
                for (MaplePlayerShopItem pItems : this.items) {
                     if (pItems.getBundles() > 0) {
                        if (pItems.getItem().getType() == 1) {
                            ps = DatabaseConnection.getConnection().prepareStatement("INSERT INTO hiredmerchanttemp (ownerid, itemid, quantity, upgradeslots, level, str, dex, `int`, luk, hp, mp, watk, matk, wdef, mdef, acc, avoid, hands, speed, jump, owner, flag,itemexp, itemlevel,vicious, xingji,type) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)");
                            Equip eq = (Equip) pItems.getItem();
                            ps.setInt(2, eq.getItemId());
                            ps.setInt(3, 1);
                            ps.setInt(4, eq.getUpgradeSlots());
                            ps.setInt(5, eq.getLevel());
                            ps.setInt(6, eq.getStr());
                            ps.setInt(7, eq.getDex());
                            ps.setInt(8, eq.getInt());
                            ps.setInt(9, eq.getLuk());
                            ps.setInt(10, eq.getHp());
                            ps.setInt(11, eq.getMp());
                            ps.setInt(12, eq.getWatk());
                            ps.setInt(13, eq.getMatk());
                            ps.setInt(14, eq.getWdef());
                            ps.setInt(15, eq.getMdef());
                            ps.setInt(16, eq.getAcc());
                            ps.setInt(17, eq.getAvoid());
                            ps.setInt(18, eq.getHands());
                            ps.setInt(19, eq.getSpeed());
                            ps.setInt(20, eq.getJump());
                            ps.setString(21, eq.getOwner());
                            ps.setInt(22,eq.getFlag());
                            ps.setInt(23,eq.getItemExp());
                            ps.setInt(24,eq.getItemLevel());
                            ps.setInt(25, eq.getVicious());
                            ps.setInt(26, eq.getxingji());
                            ps.setInt(27, 1);
                        } else {
                            ps = DatabaseConnection.getConnection().prepareStatement("INSERT INTO hiredmerchanttemp (ownerid, itemid, quantity, owner, type) VALUES (?, ?, ?, ?, 0)");
                            ps.setInt(2, pItems.getItem().getItemId());
                            ps.setInt(3, pItems.getBundles());
                            ps.setString(4, pItems.getItem().getOwner());
                        }
                        ps.setInt(1, getOwnerId());
                        ps.executeUpdate();
                        ps.close();
                    }
                }
            }
        } catch (SQLException ex) {
        } finally {
            try {
                if (ps != null) {
                    ps.close();
                }
            } catch (SQLException ex) {
            }
        }
    }

    public void addVisitor(MapleCharacter visitor) {
        int i = getFreeSlot();
        if (i > -1) {
            broadcast(MaplePacketCreator.shopVisitorAdd(visitor, i + 1), true);
            this.visitors[i] = visitor;
            if (getFreeSlot() == -1) {
                if (getShopType() == 1) {
                    ((HiredMerchant) this).getMap().broadcastMessage(MaplePacketCreator.updateHiredMerchant((HiredMerchant) this));
                } else {
                    MapleCharacter pOwner = null;
                    if (getShopType() == 2) {
                        pOwner = ((MaplePlayerShop) this).getMCOwner();
                    }
                    if (pOwner != null) {
                        pOwner.getMap().broadcastMessage(MaplePacketCreator.sendInteractionBox(pOwner));
                    }
                }
            }
        }
    }

    public int getVisitorSlot(MapleCharacter visitor) {
        for (int i = 0; i < this.capacity; i++) {
            if (this.visitors[i] == visitor) {
                return i;
            }
        }
        return -1;
    }

    public void removeAllVisitors(int error, int type) {
        for (int i = 0; i < this.capacity; i++) {
            if (this.visitors[i] != null) {
                if (type != -1) {
                    this.visitors[i].getClient().getSession().write(MaplePacketCreator.shopErrorMessage(error, type));
                }
                this.visitors[i].setInteraction(null);
                this.visitors[i] = null;
            }
        }
    }

    public String getOwnerName() {
        return this.ownerName;
    }

    public int getOwnerId() {
        return this.ownerId;
    }

    public String getDescription() {
        return this.description;
    }

    public MapleCharacter[] getVisitors() {
        return this.visitors;
    }

    public List<MaplePlayerShopItem> getItems() {
        return this.items;
    }

    public void addItem(MaplePlayerShopItem item) {
        this.items.add(item);
        tempItemsUpdate();
    }

    public boolean removeItem(int item) {
        synchronized (this.items) {
            if (this.items.contains(Integer.valueOf(item))) {
                this.items.remove(item);
                tempItemsUpdate();
                return true;
            }
            tempItemsUpdate();
            return false;
        }
    }

    public void removeFromSlot(int slot) {
        this.items.remove(slot);
        tempItemsUpdate();
    }

    public int getFreeSlot() {
        for (int i = 0; i < 3; i++) {
            if (this.visitors[i] == null) {
                return i;
            }
        }
        return -1;
    }

    public byte getItemType() {
        return this.type;
    }

    public boolean isOwner(MapleCharacter chr) {
        return (chr.getId() == this.ownerId) && (chr.getName().equals(this.ownerName));
    }

    public boolean returnItems(MapleClient c) {
        for (MaplePlayerShopItem item : this.items) {
            if (item.getBundles() > 0) {
                IItem nItem = item.getItem();
                nItem.setQuantity(item.getBundles());
                if (MapleInventoryManipulator.addFromDrop(c, nItem)) {
                    item.setBundles((short) 0);
                } else {
                    return true;
                }
            }
        }
        return false;
    }
}

/* Location:           E:\maoxiandaodanji\dist\cherry.jar
 * Qualified Name:     net.sf.cherry.server.playerinteractions.PlayerInteractionManager
 * JD-Core Version:    0.6.0
 */