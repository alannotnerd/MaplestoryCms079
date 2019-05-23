package net.sf.cherry.client;

import java.sql.Timestamp;
import java.util.ArrayList;
import java.util.Collections;
import java.util.LinkedList;
import java.util.List;

public class Item
        implements IItem {

    private int id;
    private byte position;
    private short quantity;
    private int petid;
    private String owner = "";
    private int idfrom;
    private String sender = "";
    private String message = "";
    protected List<String> log;
    private byte flag;
    private Timestamp expiration;
    private int uniqueid;
    private List<Integer> petsCanConsume = new ArrayList();
    private int sn;
    private long expirationnew = -1;
    private MaplePet pet = null;
    private byte itemlevel;
    private int itemexp;
    private int xingji;

    public Item(int id, byte position, short quantity) {
        this.id = id;
        this.position = position;
        this.quantity = quantity;
        this.flag = 0;
        this.petid = -1;
        this.log = new LinkedList();
    }

    public Item(int id, byte position, short quantity, int petid) {
        this.id = id;
        this.position = position;
        this.quantity = quantity;
        this.flag = 0;
        this.petid = petid;
        this.log = new LinkedList();
    }

    public IItem copy() {
        Item ret = new Item(this.id, this.position, this.quantity, this.petid);
        ret.owner = this.owner;
        ret.log = new LinkedList(this.log);
        return ret;
    }

    public void setPosition(byte position) {
        this.position = position;
    }

    public void setQuantity(short quantity) {
        this.quantity = quantity;
    }

    public int getItemId() {
        return this.id;
    }

    public byte getItemLevel() {
        return this.itemlevel;
    }

    public int getItemExp() {
        return this.itemexp;
    }

    public byte getPosition() {
        return this.position;
    }

    public short getQuantity() {
        return this.quantity;
    }

    public byte getType() {
        return 2;
    }

    public String getOwner() {
      
        return this.owner;
    }

    public void setOwner(String owner) {
        this.owner = owner;
    }
    public void setxingji(int xingji) {
        this.xingji = xingji;
    }
    public int getPetId() {
        return this.petid;
    }

    public byte getFlag() {
        return this.flag;
    }

    public int getxingji() {
        return this.xingji;
    }

    public void setFlag(byte b) {
        this.flag = b;
    }

    public int compareTo(IItem other) {
        if (Math.abs(this.position) < Math.abs(other.getPosition())) {
            return -1;
        }
        if (Math.abs(this.position) == Math.abs(other.getPosition())) {
            return 0;
        }
        return 1;
    }

    public String toString() {
        return "Item: " + this.id + " quantity: " + this.quantity;
    }

    public void log(String msg, boolean fromDB) {
    }

    public List<String> getLog() {
        return Collections.unmodifiableList(this.log);
    }

    public Timestamp getExpiration() {
        return this.expiration;
    }

    public void setExpiration(Timestamp expire) {
        this.expiration = expire;
    }

    public void setSender(String sender) {
        this.sender = sender;
    }

    public String getSender() {
        return this.sender;
    }

    public int getSN() {
        return this.sn;
    }

    public void setSN(int sn) {
        this.sn = sn;
    }

    public int getUniqueId() {
        return this.uniqueid;
    }

    public void setUniqueId(int id) {
        this.uniqueid = id;
    }

    public void setMessage(String msg) {
        this.message = msg;
    }

    public String getMessage() {
        return this.message;
    }

    public void setPetsCanConsume(List<Integer> pets) {
        this.petsCanConsume = pets;
    }

    public List<Integer> getPetsCanConsume() {
        return Collections.unmodifiableList(this.petsCanConsume);
    }

    public MaplePet getPet() {
        return pet;

    }

    public void setExpiration(long expire) {
        this.expirationnew = expire;
    }

    @Override
    public boolean 友谊戒指() {
        switch (id) {
            case 1112800: //四叶挚友戒指
            case 1112801: //雏菊挚友戒指
            case 1112802: //闪星挚友戒指
            case 1112803: //海滩聊天戒指
            case 1112804: //结婚戒指
            case 1112810: //圣诞夜响叮当
            case 1112811: //圣诞华丽派对
            case 1112812: //我的麻吉好友
                return true;
        }
        return false;
    }

    @Override
    public boolean 恋人戒指() {
        switch (id) {
            case 1112000: //闪光戒指
            case 1112001: //恋人戒指
            case 1112002: //纯爱恋人戒指
            case 1112003: //丘比特戒指
            case 1112005: //维纳斯戒指
            case 1112006: //圣十字架戒指
            case 1112007: //许愿情侣戒指
            case 1112012: //红玫瑰戒指
            case 1112013: //爱情红线戒指
            case 1112015: //白金戒指
            case 1112820: //龙凤呈祥戒指
            case 1112816: //雪晶球戒指
                return true;
        }
        return false;
    }

    @Override
    public boolean 结婚戒指() {
        return id == 1112804;
    }
}
