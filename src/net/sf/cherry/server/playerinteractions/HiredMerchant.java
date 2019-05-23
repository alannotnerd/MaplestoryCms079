package net.sf.cherry.server.playerinteractions;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.SQLException;
import java.util.concurrent.ScheduledFuture;

import net.sf.cherry.client.IItem;
import net.sf.cherry.client.MapleCharacter;
import net.sf.cherry.client.MapleClient;
import net.sf.cherry.database.DatabaseConnection;
import net.sf.cherry.server.AutobanManager;
import net.sf.cherry.server.MapleInventoryManipulator;
import net.sf.cherry.server.TimerManager;
import net.sf.cherry.server.maps.MapleMap;
import net.sf.cherry.server.maps.MapleMapObjectType;
import net.sf.cherry.tools.MaplePacketCreator;

public class HiredMerchant extends PlayerInteractionManager {

    private boolean open;
    public ScheduledFuture<?> schedule = null;
    private MapleMap map;
    private int itemId;

    public HiredMerchant(MapleCharacter owner, int itemId, String desc) {
        super(owner, itemId % 10, desc, 3);
        this.itemId = itemId;
        this.map = owner.getMap();
        this.schedule = TimerManager.getInstance().schedule(new Runnable() {

            public void run() {
                HiredMerchant.this.closeShop(true);
            }
        }, 1000 * 60 * 60 * 1000);//设置开店时间
        // }, 1000 * 10 * 1 * 1);//设置开店时间
    }

    public byte getShopType() {
        return 1;
    }

    public void buy(MapleClient c, int item, short quantity) {
        MaplePlayerShopItem pItem = (MaplePlayerShopItem) this.items.get(item);
        if (pItem.getBundles() > 0) {
            synchronized (this.items) {
                IItem newItem = pItem.getItem().copy();
                newItem.setQuantity(quantity);
                if (c.getPlayer().getMeso() >= pItem.getPrice() * quantity) {
                    if ((quantity > 0) && (pItem.getBundles() >= quantity) && (pItem.getBundles() > 0)) {
                        if (MapleInventoryManipulator.商店防止复制(c, newItem)) {
                            Connection con = DatabaseConnection.getConnection();
                            PreparedStatement ps = null;
                            try {
                                ps = con.prepareStatement("UPDATE characters SET MerchantMesos = MerchantMesos + " + pItem.getPrice() * quantity + " WHERE id = ?");
                                ps.setInt(1, getOwnerId());
                                ps.executeUpdate();
                                ps.close();
                            } catch (SQLException se) {
                                se.printStackTrace();
                            } finally {
                                try {
                                    if (ps != null) {
                                        ps.close();
                                    }
                                } catch (SQLException ex) {
                                }
                            }
                            c.getPlayer().gainMeso(-pItem.getPrice() * quantity, false);
                            pItem.setBundles((short) (pItem.getBundles() - quantity));
                            tempItemsUpdate();
                        } else {
                            c.getPlayer().dropMessage(1, "背包已满" + "\r\n" + "请留1格以上位置" + "\r\n" + "在进行购买物品" + "\r\n" + "防止非法复制");
                            c.getSession().write(MaplePacketCreator.enableActions());
                        }
                    } else {
                        AutobanManager.getInstance().autoban(c.getPlayer().getClient(), "XSource| Attempted to Merchant dupe.");
                    }
                } else {
                    c.getPlayer().dropMessage(1, "金币不足");
                    c.getSession().write(MaplePacketCreator.enableActions());
                }
            }
        }
    }

    @Override
    public void closeShop(boolean saveItems) {
        map.removeMapObject(this);
        map.broadcastMessage(MaplePacketCreator.destroyHiredMerchant(getOwnerId()));
        try {
            PreparedStatement ps = DatabaseConnection.getConnection().prepareStatement("UPDATE characters SET HasMerchant = 0 WHERE id = ?");
            ps.setInt(1, getOwnerId());
            ps.executeUpdate();
            ps.close();
            // tempItems(false);
            if (saveItems) {
                saveItems();
              //  System.out.println("成功复制");
            }
        } catch (SQLException se) {
        }
        schedule.cancel(false);
    }

    public boolean isOpen() {
        return this.open;
    }

    public void setOpen(boolean set) {
        this.open = set;
    }

    public MapleMap getMap() {
        return this.map;
    }

    public int getItemId() {
        return this.itemId;
    }

    public void sendDestroyData(MapleClient client) {
        throw new UnsupportedOperationException();
    }

    public MapleMapObjectType getType() {
        return MapleMapObjectType.HIRED_MERCHANT;
    }

    public void sendSpawnData(MapleClient client) {
        client.getSession().write(MaplePacketCreator.spawnHiredMerchant(this));
    }
}
