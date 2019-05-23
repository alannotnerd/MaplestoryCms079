package net.sf.cherry.client;

import java.sql.Timestamp;
import java.util.List;

public abstract interface IItem extends Comparable<IItem> {

    public static final int PET = 3;
    public static final int ITEM = 2;
    public static final int EQUIP = 1;

    public abstract void setFlag(byte paramByte);

    public abstract byte getFlag();
    
    public abstract int getxingji(); //星级
    
    public abstract byte getItemLevel();
    
    public abstract int getItemExp();
    
    public abstract byte getType();

    public abstract byte getPosition();

    public abstract void setPosition(byte paramByte);

    public abstract int getItemId();

    public abstract short getQuantity();

    public abstract String getOwner();

    public abstract int getPetId();

    public abstract IItem copy();

    public abstract void setOwner(String paramString);

    public abstract void setQuantity(short paramShort);
    
    public abstract void setxingji(int paramShort);

    public abstract void log(String paramString, boolean paramBoolean);

    public abstract List<String> getLog();

    public abstract Timestamp getExpiration();

    public abstract void setExpiration(Timestamp paramTimestamp);

    public abstract int getSN();

    public abstract int getUniqueId();

    public abstract void setUniqueId(int paramInt);

    public abstract void setSN(int paramInt);

    public MaplePet getPet();

    boolean 友谊戒指();

    boolean 恋人戒指();

    boolean 结婚戒指();
}
