package net.sf.cherry.client;

import java.sql.Timestamp;

import net.sf.cherry.server.MapleItemInformationProvider;

public class MapleCSInventoryItem {

    private int uniqueid;
    private int itemid;
    private int sn;
    private short quantity;
    private Timestamp expire = null;
    private boolean gift;
    private boolean isRing = false;
    private String sender = "";
    private String message = "";

    public MapleCSInventoryItem(int uniqueid, int itemid, int sn, short quantity, boolean gift) {
        this.uniqueid = uniqueid;
        this.itemid = itemid;
        this.sn = sn;
        this.quantity = quantity;
        this.gift = gift;
    }

    public boolean isGift() {
        return this.gift;
    }

    public int getItemId() {
        return this.itemid;
    }

    public boolean isRing() {
        return this.isRing;
    }

    public void setRing(boolean is) {
        this.isRing = is;
    }

    public int getSn() {
        return this.sn;
    }

    public short getQuantity() {
        return this.quantity;
    }

    public Timestamp getExpire() {
        return this.expire;
    }

    public void setExpire(Timestamp expire) {
        this.expire = expire;
    }

    public int getUniqueId() {
        return this.uniqueid;
    }

    public void setSender(String sendername) {
        this.sender = sendername;
    }

    public void setMessage(String msg) {
        this.message = msg;
    }

    public String getSender() {
        return this.sender;
    }

    public String getMessage() {
        return this.message;
    }

    public IItem toItem() {
        MapleInventoryType type = MapleItemInformationProvider.getInstance().getInventoryType(this.itemid);
        IItem newitem;
        if (type.equals(MapleInventoryType.EQUIP)) {
            newitem = new Equip(itemid, (byte) -1);
            newitem.setExpiration(this.expire);
            newitem.setUniqueId(this.uniqueid);
            ((Equip) newitem).setRing(this.isRing);
        } else {
            newitem = new Item(this.itemid, (byte) -1, this.quantity);
            newitem.setExpiration(this.expire);
            newitem.setUniqueId(this.uniqueid);
        }
        return newitem;
    }


}