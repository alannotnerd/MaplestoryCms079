package net.sf.cherry.client;

public abstract interface IEquip extends IItem {

    public abstract void setUpgradeSlots(int paramInt);

    public abstract void setVicious(int paramInt);

    public abstract byte getUpgradeSlots();

    public abstract byte getLocked();

    public abstract byte getLevel();

    public abstract boolean isRing();

    public abstract short getStr();

    public abstract short getDex();

    public abstract short getInt();

    public abstract short getLuk();

    public abstract short getHp();

    public abstract short getMp();

    public abstract short getWatk();

    public abstract short getMatk();

    public abstract short getWdef();

    public abstract short getMdef();

    public abstract short getAcc();

    public abstract short getAvoid();

    public abstract short getHands();

    public abstract short getSpeed();

    public abstract short getJump();

    public abstract int getPartnerUniqueId();

    public abstract int getPartnerId();

    public abstract String getPartnerName();

    public abstract short getVicious();    

    public static enum ScrollResult {

        SUCCESS, FAIL, CURSE; //成功 失败 诅咒
    }
}
