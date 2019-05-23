package net.sf.cherry.client;

import java.sql.Timestamp;
import java.util.LinkedList;
import java.util.List;

import net.sf.cherry.server.MapleItemInformationProvider;
import net.sf.cherry.tools.MaplePacketCreator;
import net.sf.cherry.tools.Pair;

public class Equip extends Item
        implements IEquip {

    private byte upgradeSlots;
    private byte level;
    private byte flag;
    private byte locked;
    private MapleJob job;
    private short str;
    private short dex;
    private short _int;
    private short luk;
    private short hp;
    private short mp;
    private short watk;
    private short matk;
    private short wdef;
    private short mdef;
    private short acc;
    private short avoid;
    private short hands;
    private short speed;
    private short jump;
    private short vicious;
    private boolean ring;
    private int sn;
    private int uniqueid;
    private Timestamp expiration;
    private int partnerUniqueId;
    private int partnerId;
    private String partnerName;
    private int itemExp;
    private byte itemLevel;
    private int xingji;
    public Equip(int id, byte position) {
        super(id, position, (short) 1);
        this.ring = false;
    }

    public Equip(int id, byte position, boolean ring) {
        super(id, position, (short) 1);
        this.ring = false;
        this.itemExp = 0;
        this.itemLevel = 1;
    }

    public Equip(int id, byte position, boolean ring, int partnerUniqueId, int partnerId, String partnerName) {
        super(id, position, (short) 1);
        this.ring = false;
        this.partnerUniqueId = partnerUniqueId;
        this.partnerId = partnerId;
        this.partnerName = partnerName;
    }

    public IItem copy() {
        Equip ret = new Equip(getItemId(), getPosition(), this.ring);
        ret.str = this.str;
        ret.dex = this.dex;
        ret._int = this._int;
        ret.luk = this.luk;
        ret.hp = this.hp;
        ret.mp = this.mp;
        ret.matk = this.matk;
        ret.mdef = this.mdef;
        ret.watk = this.watk;
        ret.wdef = this.wdef;
        ret.acc = this.acc;
        ret.avoid = this.avoid;
        ret.hands = this.hands;
        ret.speed = this.speed;
        ret.jump = this.jump;
        ret.flag = this.flag;
        ret.locked = this.locked;
        ret.upgradeSlots = this.upgradeSlots;
        ret.level = this.level;
        ret.vicious = this.vicious;
        ret.itemLevel = this.itemLevel;
        ret.itemExp = this.itemExp;
        ret.log = new LinkedList(this.log);
        ret.xingji = this.xingji;
        ret.setOwner(getOwner());//名字
        ret.setQuantity(getQuantity());//数量
        return ret;
    }

    public byte getType() {
        return 1;
    }

    public byte getUpgradeSlots() {
        return this.upgradeSlots;
    }

    public byte getLocked() {
        return this.locked;
    }

    public short getStr() {
        return this.str;
    }

    public short getDex() {
        return this.dex;
    }

    public short getInt() {
        return this._int;
    }

    public short getLuk() {
        return this.luk;
    }

    public short getHp() {
        return this.hp;
    }

    public short getMp() {
        return this.mp;
    }

    public short getWatk() {
        return this.watk;
    }

    public short getMatk() {
        return this.matk;
    }

    public short getWdef() {
        return this.wdef;
    }

    public short getMdef() {
        return this.mdef;
    }

    public short getAcc() {
        return this.acc;
    }

    public short getAvoid() {
        return this.avoid;
    }

    public short getHands() {
        return this.hands;
    }

    public short getSpeed() {
        return this.speed;
    }

    public short getJump() {
        return this.jump;
    }

    public byte getFlag() {
        return this.flag;
    }
    public int getxingji(){
        return this.xingji;
    }
    public void setFlag(byte flag) {
        this.flag = flag;
    }
    public void setxingji(int xingji){
        this.xingji = xingji;
    }
    
    public MapleJob getJob() {
        return this.job;
    }

    public void setStr(short str) {
        this.str = str;
    }

    public void setDex(short dex) {
        this.dex = dex;
    }

    public void setInt(short _int) {
        this._int = _int;
    }

    public void setLuk(short luk) {
        this.luk = luk;
    }

    public void setHp(short hp) {
        this.hp = hp;
    }

    public void setMp(short mp) {
        this.mp = mp;
    }

    public void setWatk(short watk) {
        this.watk = watk;
    }

    public void setMatk(short matk) {
        this.matk = matk;
    }

    public void setWdef(short wdef) {
        this.wdef = wdef;
    }

    public void setMdef(short mdef) {
        this.mdef = mdef;
    }

    public void setAcc(short acc) {
        this.acc = acc;
    }

    public void setAvoid(short avoid) {
        this.avoid = avoid;
    }

    public void setHands(short hands) {
        this.hands = hands;
    }

    public void setSpeed(short speed) {
        this.speed = speed;
    }

    public void setJump(short jump) {
        this.jump = jump;
    }

    public void setLocked(byte locked) {
        this.locked = locked;
    }

    public void setUpgradeSlots(byte upgradeSlots) {
        this.upgradeSlots = upgradeSlots;
    }

    public void setUpgradeSlots(int i) {
        this.upgradeSlots = (byte) i;
    }

    public byte getLevel() {
        return this.level;
    }

    public void setLevel(byte level) {
        this.level = level;
    }

    public short getVicious() {
        return this.vicious;
    }

    public void setVicious(int i) {
        this.vicious = (short) i;
    }

    public void setVicious(short vicious) {
        this.vicious = vicious;
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

    public void gainLevel() {
        this.level = (byte) (this.level + 1);
    }

    @Override
    public int getItemExp() {
        return this.itemExp;
    }
        public void gainItemLevel() {
        this.itemLevel = (byte)(this.itemLevel + 1);
    }
    
    public void gainItemExp(MapleClient c, int gain, boolean timeless) {
        this.itemExp += gain;
        int expNeeded = 0;
        if (timeless) {
            expNeeded = ExpTable.getTimelessItemExpNeededForLevel(this.itemLevel + 1);
        } else {
            expNeeded = ExpTable.getReverseItemExpNeededForLevel(this.itemLevel + 1);
        }
        if (this.itemExp >= expNeeded) {
         // gainItemLevel();
            gainItemLevel(c, timeless);
            //gainLevel();
            c.getSession().write(MaplePacketCreator.showItemLevelup());
        }
    }
//   public void gainItemExp3(MapleClient c, int gain, boolean timeless) {
//        int expneeded = timeless ? (10 * itemLevel + 70) : (5 * itemLevel + 65);
//        float modifier = 364 / expneeded;
//        float exp = (expneeded / (1000000 * modifier * modifier)) * gain;
//        itemExp += exp;
//        
//        if (itemExp >= 364) {
//            itemExp = (itemExp - 364);
//            gainItemLevel(c, timeless);
//        } else
//            c.getPlayer().forceUpdateItem(MapleInventoryType.EQUIPPED, this);
//    }
//    
//    public void gainItemExp2(MapleClient c, int gain, boolean timeless) {
//        itemExp += gain;
//        int expNeeded = 0;
//        if (timeless)
//            expNeeded = ExpTable.getTimelessItemExpNeededForLevel(itemLevel + 1);
//        else
//            expNeeded = ExpTable.getReverseItemExpNeededForLevel(itemLevel + 1);
//        if (itemExp >= expNeeded) {
//            gainItemLevel(c, timeless);
//            c.getSession().write(MaplePacketCreator.showItemLevelup());
//        }
//    }
    
    public void gainItemLevel(MapleClient c, boolean timeless) {
        List<Pair<String, Integer>> stats = MapleItemInformationProvider.getInstance().getItemLevelupStats(getItemId(), itemLevel, timeless);
        for (Pair<String, Integer> stat : stats) {
            if (stat.getLeft().equals("incDEX")) {
                dex += stat.getRight();
            } else if (stat.getLeft().equals("incSTR")) {
                str += stat.getRight();
            } else if (stat.getLeft().equals("incINT")) {
                _int += stat.getRight();
            } else if (stat.getLeft().equals("incLUK")) {
                luk += stat.getRight();
            } else if (stat.getLeft().equals("incMHP")) {
                hp += stat.getRight();
            } else if (stat.getLeft().equals("incMMP")) {
                mp += stat.getRight();
            } else if (stat.getLeft().equals("incPAD")) {
                watk += stat.getRight();
            } else if (stat.getLeft().equals("incMAD")) {
                matk += stat.getRight();
            } else if (stat.getLeft().equals("incPDD")) {
                wdef += stat.getRight();
            } else if (stat.getLeft().equals("incMDD")) {
                mdef += stat.getRight();
            } else if (stat.getLeft().equals("incEVA")) {
                avoid += stat.getRight();
            } else if (stat.getLeft().equals("incACC")) {
                acc += stat.getRight();
            } else if (stat.getLeft().equals("incSpeed")) {
                speed += stat.getRight();
            } else if (stat.getLeft().equals("incJump")) {
                jump += stat.getRight();
            }
        }
        this.itemLevel++;
        c.getPlayer().getClient().getSession().write(MaplePacketCreator.showEquipmentLevelUp());
        c.getPlayer().getClient().getSession().write(MaplePacketCreator.getCharInfo(c.getPlayer()));
        c.getPlayer().getMap().removePlayer(c.getPlayer());
        c.getPlayer().getMap().addPlayer(c.getPlayer());
        //c.getPlayer().getMap().broadcastMessage(c.getPlayer(), MaplePacketCreator.showForeignEffect(c.getPlayer().getId(), 17));
        // c.getPlayer().forceUpdateItem(MapleInventoryType.EQUIPPED, this);
    }
    public void setItemExp(int itemExp) {
        this.itemExp = itemExp;
    }

    public byte getItemLevel() {
        return itemLevel;
    }
    
    public void setItemLevel(byte i) {
        itemLevel = i;
    }

    public void setQuantity(short quantity) {
        if ((quantity < 0) || (quantity > 1)) {
            throw new RuntimeException("Setting the quantity to " + quantity + " on an equip (itemid: " + getItemId() + ")");
        }
        super.setQuantity(quantity);
    }

    public void setJob(MapleJob job) {
        this.job = job;
    }

    public Timestamp getExpiration() {
        return this.expiration;
    }

    public void setExpiration(Timestamp expire) {
        this.expiration = expire;
    }

    public boolean isRing() {
        return this.ring;
    }

    public void setRing(boolean is) {
        this.ring = is;
    }

    public int getPartnerUniqueId() {
        return this.partnerUniqueId;
    }

    public int getPartnerId() {
        return this.partnerId;
    }

    public String getPartnerName() {
        return this.partnerName;
    }

    @Override
    public boolean 友谊戒指() {
        switch (getItemId()) {
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
        switch (getItemId()) {
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
        return getItemId() == 1112804;
    }


}
