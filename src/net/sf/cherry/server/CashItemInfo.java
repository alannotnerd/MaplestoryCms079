 package net.sf.cherry.server;
 
import net.sf.cherry.client.MapleInventoryType;

 public class CashItemInfo {

    private int SN;
    private int itemId;
    private int count;
    private int price;
    private int period;
    private int gender;
    private boolean onSale;

    public CashItemInfo(int SN, int itemId, int count, int price, int period, int gender, boolean onSale) {
        this.SN = SN;
        this.itemId = itemId;
        this.count = count;
        this.price = price;
        this.period = period;
        this.gender = gender;
        this.onSale = onSale;
    }

    public int getSN() {
        return SN;
    }

    public int getItemId() {
        return itemId;
    }

    public int getCount() {
        return count;
    }

    public int getPrice() {
        return price;
    }

    public int getPeriod() {
        return period;
    }

    public int getGender() {
        return gender;
    }

    public boolean onSale() {
        return onSale;
    }

    public int getItemId(int i) {
        return itemId;
    }

}