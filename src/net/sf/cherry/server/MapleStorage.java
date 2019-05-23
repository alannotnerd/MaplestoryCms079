package net.sf.cherry.server;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;
import java.util.ArrayList;
import java.util.Collection;
import java.util.Collections;
import java.util.Comparator;
import java.util.HashMap;
import java.util.LinkedList;
import java.util.List;
import java.util.Map;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import net.sf.cherry.client.Equip;
import net.sf.cherry.client.IEquip;
import net.sf.cherry.client.IItem;
import net.sf.cherry.client.Item;
import net.sf.cherry.client.MapleClient;
import net.sf.cherry.client.MapleInventoryType;
import net.sf.cherry.database.DatabaseConnection;
import net.sf.cherry.database.DatabaseException;
import net.sf.cherry.tools.MaplePacketCreator;

public class MapleStorage {

    private int id;
    private List<IItem> items;
    private int meso;
    private byte slots;
    private Map<MapleInventoryType, List<IItem>> typeItems = new HashMap();
    private static Logger log = LoggerFactory.getLogger(MapleStorage.class);

    private MapleStorage(int id, byte slots, int meso) {
        this.id = id;
        this.slots = slots;
        this.items = new LinkedList();
        this.meso = meso;
    }

    public static MapleStorage create(int id) {
        PreparedStatement ps = null;
        try {
            Connection con = DatabaseConnection.getConnection();
            ps = con.prepareStatement("INSERT INTO storages (accountid, slots, meso) VALUES (?, ?, ?)");
            ps.setInt(1, id);
            ps.setInt(2, 16);
            ps.setInt(3, 0);
            ps.executeUpdate();
            ps.close();
        } catch (SQLException ex) {
            log.error("Error creating storage", ex);
        } finally {
            try {
                if (ps != null) {
                    ps.close();
                }
            } catch (SQLException ex) {
            }
        }
        return loadOrCreateFromDB(id);
    }

    public static MapleStorage loadOrCreateFromDB(int id) {
        MapleStorage ret = null;

        PreparedStatement ps = null;
        ResultSet rs = null;
        try {
            Connection con = DatabaseConnection.getConnection();
            ps = con.prepareStatement("SELECT * FROM storages WHERE accountid = ?");
            ps.setInt(1, id);
            rs = ps.executeQuery();
            if (!rs.next()) {
                rs.close();
                ps.close();
                MapleStorage localMapleStorage1 = create(id);
                return localMapleStorage1;
            }
            int storeId = rs.getInt("storageid");
            ret = new MapleStorage(storeId, (byte) rs.getInt("slots"), rs.getInt("meso"));
            rs.close();
            ps.close();
            String sql = "SELECT * FROM inventoryitems LEFT JOIN inventoryequipment USING (inventoryitemid) WHERE storageid = ?";
            ps = con.prepareStatement(sql);
            ps.setInt(1, storeId);
            rs = ps.executeQuery();
            while (rs.next()) {
                MapleInventoryType type = MapleInventoryType.getByType((byte) rs.getInt("inventorytype"));
                if ((type.equals(MapleInventoryType.EQUIP)) || (type.equals(MapleInventoryType.EQUIPPED))) {
                    int itemid = rs.getInt("itemid");
                    Equip equip = new Equip(itemid, (byte) rs.getInt("position"));
                    equip.setOwner(rs.getString("owner"));
                    equip.setQuantity((short) rs.getInt("quantity"));
                    equip.setAcc((short) rs.getInt("acc"));
                    equip.setAvoid((short) rs.getInt("avoid"));
                    equip.setDex((short) rs.getInt("dex"));
                    equip.setHands((short) rs.getInt("hands"));
                    equip.setHp((short) rs.getInt("hp"));
                    equip.setInt((short) rs.getInt("int"));
                    equip.setJump((short) rs.getInt("jump"));
                    equip.setLuk((short) rs.getInt("luk"));
                    equip.setMatk((short) rs.getInt("matk"));
                    equip.setMdef((short) rs.getInt("mdef"));
                    equip.setMp((short) rs.getInt("mp"));
                    equip.setSpeed((short) rs.getInt("speed"));
                    equip.setStr((short) rs.getInt("str"));
                    equip.setWatk((short) rs.getInt("watk"));
                    equip.setWdef((short) rs.getInt("wdef"));
                    equip.setUpgradeSlots((byte) rs.getInt("upgradeslots"));
                    equip.setLocked((byte) rs.getInt("locked"));
                    equip.setLevel((byte) rs.getInt("level"));
                    equip.setFlag((byte) rs.getInt("flag"));
                    equip.setVicious((short) rs.getInt("vicious"));
                    equip.setItemLevel((byte) rs.getInt("itemlevel"));
                    equip.setItemExp((short) rs.getInt("itemexp"));
                    equip.setxingji((short)rs.getInt("xingji"));
                    ret.items.add(equip);
                } else {
                    Item item = new Item(rs.getInt("itemid"), (byte) rs.getInt("position"), (short) rs.getInt("quantity"));
                    item.setOwner(rs.getString("owner"));
                    ret.items.add(item);
                }
            }
            rs.close();
            ps.close();
        } catch (SQLException ex) {
            log.error("Error loading storage", ex);
        } finally {
            try {
                if (rs != null) {
                    rs.close();
                }
                if (ps != null) {
                    ps.close();
                }
            } catch (SQLException ex) {
            }
        }
        return ret;
    }

    public int getSlots() {
        return this.slots;
    }

    public void gainSlots(byte gain) {
        setSlots((byte) (gain + getSlots()));
    }

    public void setSlots(byte set) {
        this.slots = set;
    }

    public void saveToDB() {
        PreparedStatement ps = null;
        PreparedStatement pse = null;
        ResultSet rs = null;
        try {
            Connection con = DatabaseConnection.getConnection();
            ps = con.prepareStatement("UPDATE storages SET slots = ?, meso = ? WHERE storageid = ?");
            ps.setInt(1, this.slots);
            ps.setInt(2, this.meso);
            ps.setInt(3, this.id);
            ps.executeUpdate();
            ps.close();
            ps = con.prepareStatement("DELETE FROM inventoryitems WHERE storageid = ?");
            ps.setInt(1, this.id);
            ps.executeUpdate();
            ps.close();
            ps = con.prepareStatement("INSERT INTO inventoryitems (storageid, itemid, inventorytype, position, quantity, owner, expiredate, uniqueid, flag,itemexp,itemlevel,xingji) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)", Statement.RETURN_GENERATED_KEYS);

            for (IItem item : this.items) {
                ps.setInt(1, this.id);
                ps.setInt(2, item.getItemId());
                MapleInventoryType type = MapleItemInformationProvider.getInstance().getInventoryType(item.getItemId());
                ps.setInt(3, type.getType());
                ps.setInt(4, item.getPosition());
                ps.setInt(5, item.getQuantity());
                ps.setString(6, item.getOwner());
                 if (item.getExpiration() != null) {
                        ps.setTimestamp(7, item.getExpiration());
                    } else {
                        ps.setTimestamp(7, null);
                    }
                    ps.setInt(8, item.getUniqueId());
                
                    ps.setInt(9, item.getFlag());
                    ps.setInt(10, item.getItemLevel());
                    ps.setInt(11, item.getItemExp());
                    ps.setInt(12, item.getxingji());
                ps.executeUpdate();
                rs = ps.getGeneratedKeys();
                long itemid;
                if (rs.next()) {
                    itemid = rs.getLong(1);
                } else {
                    throw new DatabaseException("Inserting char failed.");
                }
                rs.close();
                
                pse = con.prepareStatement("INSERT INTO inventoryequipment VALUES (DEFAULT, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)");
                if (type.equals(MapleInventoryType.EQUIP)) {
                    pse.setLong(1, itemid);
                    IEquip equip = (IEquip) item;
                    pse.setInt(2, equip.getUpgradeSlots());
                    pse.setInt(3, equip.getLevel());
                    pse.setInt(4, equip.getStr());
                    pse.setInt(5, equip.getDex());
                    pse.setInt(6, equip.getInt());
                    pse.setInt(7, equip.getLuk());
                    pse.setInt(8, equip.getHp());
                    pse.setInt(9, equip.getMp());
                    pse.setInt(10, equip.getWatk());
                    pse.setInt(11, equip.getMatk());
                    pse.setInt(12, equip.getWdef());
                    pse.setInt(13, equip.getMdef());
                    pse.setInt(14, equip.getAcc());
                    pse.setInt(15, equip.getAvoid());
                    pse.setInt(16, equip.getHands());
                    pse.setInt(17, equip.getSpeed());
                    pse.setInt(18, equip.getJump());
                    pse.setInt(19, equip.getLocked());
                    pse.setBoolean(20, equip.isRing());
                    pse.setInt(21, equip.getVicious());
                    pse.executeUpdate();
                }
            }
            pse.close();
            ps.close();
        } catch (SQLException ex) {
            log.error("Error saving storage", ex);
        } finally {
            try {
                if (rs != null) {
                    rs.close();
                }
                if (pse != null) {
                    pse.close();
                }
                if (ps != null) {
                    ps.close();
                }
            } catch (SQLException ex) {
            }
        }
    }

    public IItem takeOut(byte slot) {
        IItem ret = (IItem) this.items.remove(slot);
        MapleInventoryType type = MapleItemInformationProvider.getInstance().getInventoryType(ret.getItemId());
        this.typeItems.put(type, new ArrayList(filterItems(type)));
        return ret;
    }

    public void store(IItem item) {
        this.items.add(item);
        MapleInventoryType type = MapleItemInformationProvider.getInstance().getInventoryType(item.getItemId());
        this.typeItems.put(type, new ArrayList(filterItems(type)));
    }

    public List<IItem> getItems() {
        return Collections.unmodifiableList(this.items);
    }

    private List<IItem> filterItems(MapleInventoryType type) {
        List ret = new LinkedList();
        MapleItemInformationProvider ii = MapleItemInformationProvider.getInstance();
        for (IItem item : this.items) {
            if (ii.getInventoryType(item.getItemId()) == type) {
                ret.add(item);
            }
        }
        return ret;
    }

    public byte getSlot(MapleInventoryType type, byte slot) {
        byte ret = 0;
        for (IItem item : this.items) {
            if (item == ((List) this.typeItems.get(type)).get(slot)) {
                return ret;
            }
            ret = (byte) (ret + 1);
        }
        return -1;
    }

    public void sendStorage(MapleClient c, int npcId) {
        final MapleItemInformationProvider ii = MapleItemInformationProvider.getInstance();
        // sort by inventorytype to avoid confusion
        Collections.sort(items, new Comparator<IItem>() {
            public int compare(IItem o1, IItem o2) {
                if (ii.getInventoryType(o1.getItemId()).getType() < ii.getInventoryType(o2.getItemId()).getType()) {
                    return -1;
                } else if (ii.getInventoryType(o1.getItemId()) == ii.getInventoryType(o2.getItemId())) {
                    return 0;
                } else {
                    return 1;
                }
            }
        });
        for (MapleInventoryType type : MapleInventoryType.values()) {
            typeItems.put(type, new ArrayList<IItem>(items));
        }
        c.getSession().write(MaplePacketCreator.getStorage(npcId, slots, items, meso));
    }
    
    public void arrange() {
        Collections.sort(items, new Comparator<IItem>(){
            @Override
            public int compare(IItem o1, IItem o2) {
                if (o1.getItemId() < o2.getItemId()) {
                    return -1;
                }
                if (o1.getItemId() == o2.getItemId()) {
                    return 0;
                }
                return 1;
            }
        });
        for (MapleInventoryType type : MapleInventoryType.values()) {
            this.typeItems.put(type, this.items);
        }
    }
    
    public void update(MapleClient c) {
        c.getSession().write(MaplePacketCreator.arrangeStorage(this.slots, items));
    }

    public void sendStored(MapleClient c, MapleInventoryType type) {
        c.getSession().write(MaplePacketCreator.storeStorage(this.slots, type, (Collection) this.typeItems.get(type)));
    }

    public void sendTakenOut(MapleClient c, MapleInventoryType type) {
        c.getSession().write(MaplePacketCreator.takeOutStorage(this.slots, type, (Collection) this.typeItems.get(type)));
    }

    public int getMeso() {
        return this.meso;
    }

    public void setMeso(int meso) {
        if (meso < 0) {
            throw new RuntimeException();
        }
        this.meso = meso;
    }

    public void sendMeso(MapleClient c) {
        c.getSession().write(MaplePacketCreator.mesoStorage(this.slots, this.meso));
    }

    public boolean isFull() {
        return this.items.size() >= this.slots;
    }

    public void close() {
        this.typeItems.clear();
    }
}

/* Location:           E:\maoxiandaodanji\dist\cherry.jar
 * Qualified Name:     net.sf.cherry.server.MapleStorage
 * JD-Core Version:    0.6.0
 */