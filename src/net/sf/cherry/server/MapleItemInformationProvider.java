package net.sf.cherry.server;

import java.io.File;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.Calendar;
import java.util.HashMap;
import java.util.LinkedHashMap;
import java.util.LinkedList;
import java.util.List;
import java.util.Map;
import java.util.Map.Entry;
import java.util.TimeZone;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import constants.ServerConfig;
import net.sf.cherry.client.Equip;
import net.sf.cherry.client.IItem;
import net.sf.cherry.client.MapleClient;
import net.sf.cherry.client.MapleInventoryType;
import net.sf.cherry.client.MapleWeaponType;
import net.sf.cherry.client.SkillFactory;
import net.sf.cherry.database.DatabaseConnection;
import net.sf.cherry.net.Constants.InventoryConstants;
import net.sf.cherry.provider.MapleData;
import net.sf.cherry.provider.MapleDataDirectoryEntry;
import net.sf.cherry.provider.MapleDataFileEntry;
import net.sf.cherry.provider.MapleDataProvider;
import net.sf.cherry.provider.MapleDataProviderFactory;
import net.sf.cherry.provider.MapleDataTool;
import net.sf.cherry.tools.Pair;

public class MapleItemInformationProvider {

    protected Map<Integer, Pair<Integer, List<RewardItem>>> rewardCache = new HashMap<Integer, Pair<Integer, List<RewardItem>>>();
    static Logger log = LoggerFactory.getLogger(MapleItemInformationProvider.class);
    private static MapleItemInformationProvider instance = null;
    protected MapleDataProvider itemData;
    protected MapleDataProvider equipData;
    protected MapleDataProvider stringData;
    protected MapleData cashStringData;
    protected MapleData consumeStringData;
    protected MapleData eqpStringData;
    protected MapleData etcStringData;
    protected MapleData insStringData;
    protected MapleData petStringData;
    protected Map<Integer, MapleInventoryType> inventoryTypeCache = new HashMap();
    protected Map<Integer, Short> slotMaxCache = new HashMap();
    protected Map<Integer, MapleStatEffect> itemEffects = new HashMap();
    protected Map<Integer, Map<String, Integer>> equipStatsCache = new HashMap();
    protected Map<Integer, Equip> equipCache = new HashMap();
    protected Map<Integer, Double> priceCache = new HashMap();
    protected Map<Integer, Integer> wholePriceCache = new HashMap();
    protected Map<Integer, Integer> projectileWatkCache = new HashMap();
    protected Map<Integer, String> nameCache = new HashMap();
    protected Map<Integer, String> descCache = new HashMap();
    protected Map<Integer, String> msgCache = new HashMap();
    protected Map<Integer, Boolean> dropRestrictionCache = new HashMap();
    protected Map<Integer, Boolean> pickupRestrictionCache = new HashMap();
    protected Map<Integer, Boolean> isQuestItemCache = new HashMap();
    protected Map<Integer, List<SummonEntry>> summonEntryCache = new HashMap();
    protected List<Pair<Integer, String>> itemNameCache = new ArrayList();
    protected Map<Integer, Integer> getMesoCache = new HashMap();
    protected Map<Integer, Integer> getExpCache = new HashMap();
    protected Map<Integer, String> itemTypeCache = new HashMap();
    protected Map<Integer, Map<String, String>> getExpCardTimes = new HashMap();
    protected Map<Integer, Integer> scriptedItemCache = new HashMap();
    protected Map<Integer, Integer> monsterBookID = new HashMap();
    protected List<Integer> getAllCrystalId = new ArrayList<Integer>();
    protected Map<Integer, Boolean> consumeOnPickupCache = new HashMap();
    protected Map<Integer, List<Integer>> scrollRestrictionCache = new HashMap<Integer, List<Integer>>();
    protected Map<Integer, Boolean> karmaCache = new HashMap<Integer, Boolean>();
    protected Map<Integer, Boolean> onEquipUntradableCache = new HashMap<Integer, Boolean>();
    protected Map<Integer, Pair<Integer, Integer>> getCrystalId = new HashMap<Integer, Pair<Integer,Integer>>();
    protected Map<Integer, Integer> getItemLevel = new HashMap<Integer, Integer>();

    public static final class RewardItem {

        public int itemid, period;
        public short prob, quantity;
        public String effect, worldmsg;
    }

    protected MapleItemInformationProvider() {
        loadCardIdData();
        this.itemData = MapleDataProviderFactory.getDataProvider(new File(ServerConfig.WZPath + "/Item.wz"));
        this.equipData = MapleDataProviderFactory.getDataProvider(new File(ServerConfig.WZPath + "/Character.wz"));
        this.stringData = MapleDataProviderFactory.getDataProvider(new File(ServerConfig.WZPath + "/String.wz"));
        this.cashStringData = MapleDataProviderFactory.getDataProvider(new File(ServerConfig.WZPath + "/String.wz")).getData("Cash.img");
        this.consumeStringData = MapleDataProviderFactory.getDataProvider(new File(ServerConfig.WZPath + "/String.wz")).getData("Consume.img");
        this.eqpStringData = MapleDataProviderFactory.getDataProvider(new File(ServerConfig.WZPath + "/String.wz")).getData("Eqp.img");
        this.etcStringData = MapleDataProviderFactory.getDataProvider(new File(ServerConfig.WZPath + "/String.wz")).getData("Etc.img");
        this.insStringData = MapleDataProviderFactory.getDataProvider(new File(ServerConfig.WZPath + "/String.wz")).getData("Ins.img");
        this.petStringData = MapleDataProviderFactory.getDataProvider(new File(ServerConfig.WZPath + "/String.wz")).getData("Pet.img");
    }

    public static MapleItemInformationProvider getInstance() {
        if (instance == null) {
            instance = new MapleItemInformationProvider();
        }
        return instance;
    }

    public short getPetFlagInfo(int itemId) {
        /*
         * if (this.petFlagInfo.containsKey(Integer.valueOf(itemId))) { return
         * ((Short)this.petFlagInfo.get(Integer.valueOf(itemId))).shortValue();
         }
         */
        short flag = 0;
        if (itemId / 10000 != 500) {
            return flag;
        }
        MapleData item = getItemData(itemId);
        if (item == null) {
            return flag;
        }
        if (MapleDataTool.getIntConvert("info/pickupItem", item, 0) > 0) {
            flag = (short) (flag | 0x1);
        }
        if (MapleDataTool.getIntConvert("info/longRange", item, 0) > 0) {
            flag = (short) (flag | 0x2);
        }
        if (MapleDataTool.getIntConvert("info/pickupAll", item, 0) > 0) {
            flag = (short) (flag | 0x4);
        }
        if (MapleDataTool.getIntConvert("info/sweepForDrop", item, 0) > 0) {
            flag = (short) (flag | 0x10);
        }
        if (MapleDataTool.getIntConvert("info/consumeHP", item, 0) > 0) {
            flag = (short) (flag | 0x20);
        }
        if (MapleDataTool.getIntConvert("info/consumeMP", item, 0) > 0) {
            flag = (short) (flag | 0x40);
        }
        //this.petFlagInfo.put(Integer.valueOf(itemId), Short.valueOf(flag));
        return flag;
    }
 public List<Pair<String, Integer>> getItemLevelupStats(int itemId, int level, boolean timeless) {
        //timeless 永恒
        List<Pair<String, Integer>> list = new LinkedList<Pair<String, Integer>>();
        MapleData data = getItemData(itemId); //获得该物品所有节点
        MapleData data1 = data.getChildByPath("info").getChildByPath("level");
        /*
        if ((timeless && level == 5) || (!timeless && level == 3)) {
            MapleData skilldata = data1.getChildByPath("case").getChildByPath("1").getChildByPath(timeless ? "6" : "4");
            if (skilldata != null) {
                int skillid;
                List<MapleData> skills = skilldata.getChildByPath("Skill").getChildren();
                    for (int i = 0; i < skills.size(); i++) {
                        skillid = MapleDataTool.getInt(skills.get(i).getChildByPath("id"));
                        //System.out.println(skillid);
                        if (Math.random() < 0.1) 
                            list.add(new Pair<String, Integer>("Skill" + i, skillid));
                    }
            }
        }
        */
        if (data1 != null) { //判断装备是否存在level节点
            MapleData data2 = data1.getChildByPath("info").getChildByPath(Integer.toString(level)); //获取与装备的[道具等级]相应的节点
            if (data2 != null) {
                    for (MapleData da : data2.getChildren()) {
                        if (Math.random() < 0.9) {
                            if (da.getName().startsWith("incDEXMin")) {
                                list.add(new Pair<String, Integer>("incDEX", rand(MapleDataTool.getInt(da), MapleDataTool.getInt(data2.getChildByPath("incDEXMax")))));
                            } else if (da.getName().startsWith("incSTRMin")) {
                                list.add(new Pair<String, Integer>("incSTR", rand(MapleDataTool.getInt(da), MapleDataTool.getInt(data2.getChildByPath("incSTRMax")))));
                            } else if (da.getName().startsWith("incINTMin")) {
                                list.add(new Pair<String, Integer>("incINT", rand(MapleDataTool.getInt(da), MapleDataTool.getInt(data2.getChildByPath("incINTMax")))));
                            } else if (da.getName().startsWith("incLUKMin")) {
                                list.add(new Pair<String, Integer>("incLUK", rand(MapleDataTool.getInt(da), MapleDataTool.getInt(data2.getChildByPath("incLUKMax")))));
                            } else if (da.getName().startsWith("incMHPMin")) {
                                list.add(new Pair<String, Integer>("incMHP", rand(MapleDataTool.getInt(da), MapleDataTool.getInt(data2.getChildByPath("incMHPMax")))));
                            } else if (da.getName().startsWith("incMMPMin")) {
                                list.add(new Pair<String, Integer>("incMMP", rand(MapleDataTool.getInt(da), MapleDataTool.getInt(data2.getChildByPath("incMMPMax")))));
                            } else if (da.getName().startsWith("incPADMin")) {
                                list.add(new Pair<String, Integer>("incPAD", rand(MapleDataTool.getInt(da), MapleDataTool.getInt(data2.getChildByPath("incPADMax")))));
                            } else if (da.getName().startsWith("incMADMin")) {
                                list.add(new Pair<String, Integer>("incMAD", rand(MapleDataTool.getInt(da), MapleDataTool.getInt(data2.getChildByPath("incMADMax")))));
                            } else if (da.getName().startsWith("incPDDMin")) {
                                list.add(new Pair<String, Integer>("incPDD", rand(MapleDataTool.getInt(da), MapleDataTool.getInt(data2.getChildByPath("incPDDMax")))));
                            } else if (da.getName().startsWith("incMDDMin")) {
                                list.add(new Pair<String, Integer>("incMDD", rand(MapleDataTool.getInt(da), MapleDataTool.getInt(data2.getChildByPath("incMDDMax")))));
                            } else if (da.getName().startsWith("incACCMin")) {
                                list.add(new Pair<String, Integer>("incACC", rand(MapleDataTool.getInt(da), MapleDataTool.getInt(data2.getChildByPath("incACCMax")))));
                            } else if (da.getName().startsWith("incEVAMin")) {
                                list.add(new Pair<String, Integer>("incEVA", rand(MapleDataTool.getInt(da), MapleDataTool.getInt(data2.getChildByPath("incEVAMax")))));
                            } else if (da.getName().startsWith("incSpeedMin")) {
                                list.add(new Pair<String, Integer>("incSpeed", rand(MapleDataTool.getInt(da), MapleDataTool.getInt(data2.getChildByPath("incSpeedMax")))));
                            } else if (da.getName().startsWith("incJumpMin")) {
                                list.add(new Pair<String, Integer>("incJump", rand(MapleDataTool.getInt(da), MapleDataTool.getInt(data2.getChildByPath("incJumpMax")))));
                            }
                        }
                    }
                }
            }
        return list;
    }
     private static int rand(int lbound, int ubound) {
        return (int) ((Math.random() * (ubound - lbound + 1)) + lbound);
    }
    public MapleInventoryType getInventoryType(int itemId) {
        if (inventoryTypeCache.containsKey(itemId)) {
            return inventoryTypeCache.get(itemId);
        }
        MapleInventoryType ret;
        String idStr = "0" + String.valueOf(itemId);
        MapleDataDirectoryEntry root = itemData.getRoot();
        for (MapleDataDirectoryEntry topDir : root.getSubdirectories()) {
            for (MapleDataFileEntry iFile : topDir.getFiles()) {
                if (iFile.getName().equals(idStr.substring(0, 4) + ".img")) {
                    ret = MapleInventoryType.getByWZName(topDir.getName());
                    inventoryTypeCache.put(itemId, ret);
                    return ret;
                } else if (iFile.getName().equals(idStr.substring(1) + ".img")) {
                    ret = MapleInventoryType.getByWZName(topDir.getName());
                    inventoryTypeCache.put(itemId, ret);
                    return ret;
                }
            }
        }
        root = equipData.getRoot();
        for (MapleDataDirectoryEntry topDir : root.getSubdirectories()) {
            for (MapleDataFileEntry iFile : topDir.getFiles()) {
                if (iFile.getName().equals(idStr + ".img")) {
                    ret = MapleInventoryType.EQUIP;
                    inventoryTypeCache.put(itemId, ret);
                    return ret;
                }
            }
        }
        ret = MapleInventoryType.UNDEFINED;
        inventoryTypeCache.put(itemId, ret);
        return ret;
    }

    public List<Pair<Integer, String>> getAllItems() {
        if (this.itemNameCache.size() != 0) {
            return this.itemNameCache;
        }
        List itemPairs = new ArrayList();

        MapleData itemsData = this.stringData.getData("Cash.img");
        for (MapleData itemFolder : itemsData.getChildren()) {
            int itemId = Integer.parseInt(itemFolder.getName());
            String itemName = MapleDataTool.getString("name", itemFolder, "NO-NAME");
            itemPairs.add(new Pair(Integer.valueOf(itemId), itemName));
        }

        itemsData = this.stringData.getData("Consume.img");
        for (MapleData itemFolder : itemsData.getChildren()) {
            int itemId = Integer.parseInt(itemFolder.getName());
            String itemName = MapleDataTool.getString("name", itemFolder, "NO-NAME");
            itemPairs.add(new Pair(Integer.valueOf(itemId), itemName));
        }

        itemsData = this.stringData.getData("Eqp.img").getChildByPath("Eqp");
        for (MapleData eqpType : itemsData.getChildren()) {
            for (MapleData itemFolder : eqpType.getChildren()) {
                int itemId = Integer.parseInt(itemFolder.getName());
                String itemName = MapleDataTool.getString("name", itemFolder, "NO-NAME");
                itemPairs.add(new Pair(Integer.valueOf(itemId), itemName));
            }
        }

        itemsData = this.stringData.getData("Etc.img").getChildByPath("Etc");
        for (MapleData itemFolder : itemsData.getChildren()) {
            int itemId = Integer.parseInt(itemFolder.getName());
            String itemName = MapleDataTool.getString("name", itemFolder, "NO-NAME");
            itemPairs.add(new Pair(Integer.valueOf(itemId), itemName));
        }

        itemsData = this.stringData.getData("Ins.img");
        for (MapleData itemFolder : itemsData.getChildren()) {
            int itemId = Integer.parseInt(itemFolder.getName());
            String itemName = MapleDataTool.getString("name", itemFolder, "NO-NAME");
            itemPairs.add(new Pair(Integer.valueOf(itemId), itemName));
        }

        itemsData = this.stringData.getData("Pet.img");
        for (MapleData itemFolder : itemsData.getChildren()) {
            int itemId = Integer.parseInt(itemFolder.getName());
            String itemName = MapleDataTool.getString("name", itemFolder, "NO-NAME");
            itemPairs.add(new Pair(Integer.valueOf(itemId), itemName));
        }
        this.itemNameCache.addAll(itemPairs);
        return itemPairs;
    }

    public int getScriptedItemNpc(int itemId) {
        if (this.scriptedItemCache.containsKey(Integer.valueOf(itemId))) {
            return ((Integer) this.scriptedItemCache.get(Integer.valueOf(itemId))).intValue();
        }
        MapleData data = getItemData(itemId);
        int npcId = MapleDataTool.getInt("spec/npc", data, 0);
        this.scriptedItemCache.put(Integer.valueOf(itemId), Integer.valueOf(npcId));

        return ((Integer) this.scriptedItemCache.get(Integer.valueOf(itemId))).intValue();
    }

    public boolean isExpOrDropCardTime(int itemId) {
        Calendar cal = Calendar.getInstance(TimeZone.getTimeZone("Asia/ShangHai"));
        String day = MapleDayInt.getDayInt(cal.get(Calendar.DAY_OF_WEEK));
        //log.info("" + cal.get(Calendar.HOUR_OF_DAY));
        Map<String, String> times;
        if (getExpCardTimes.containsKey(itemId)) {
            times = getExpCardTimes.get(itemId);
        } else {
            List<MapleData> data = getItemData(itemId).getChildByPath("info").getChildByPath("time").getChildren();
            Map<String, String> hours = new HashMap<String, String>();
            for (MapleData childdata : data) {
                //MON:03-07
                String[] time = MapleDataTool.getString(childdata).split(":");
                hours.put(time[0], time[1]);
            }
            times = hours;
            this.getExpCardTimes.put(Integer.valueOf(itemId), hours);
            cal.get(7);
        }
        if (times.containsKey(day)) {
            String[] hourspan = ((String) times.get(day)).split("-");
            int starthour = Integer.parseInt(hourspan[0]);
            int endhour = Integer.parseInt(hourspan[1]);
            if ((cal.get(11) >= starthour) && (cal.get(11) <= endhour)) {
                return true;
            }
        }
        return false;
    }
  public Equip MakeItem(Equip equip, int scrollId) {
        if (equip instanceof Equip) {
            Equip nEquip = equip;
            Map<String, Integer> stats = this.getEquipStats(scrollId);
                        for (Entry<String, Integer> stat : stats.entrySet()) {
                            if (stat.getKey().equals("STR")) {
                                nEquip.setStr((short) (nEquip.getStr() + stat.getValue().intValue()));
                            } else if (stat.getKey().equals("DEX")) {
                                nEquip.setDex((short) (nEquip.getDex() + stat.getValue().intValue()));
                            } else if (stat.getKey().equals("INT")) {
                                nEquip.setInt((short) (nEquip.getInt() + stat.getValue().intValue()));
                            } else if (stat.getKey().equals("LUK")) {
                                nEquip.setLuk((short) (nEquip.getLuk() + stat.getValue().intValue()));
                            } else if (stat.getKey().equals("PAD")) {
                                nEquip.setWatk((short) (nEquip.getWatk() + stat.getValue().intValue()));
                            } else if (stat.getKey().equals("PDD")) {
                                nEquip.setWdef((short) (nEquip.getWdef() + stat.getValue().intValue()));
                            } else if (stat.getKey().equals("MAD")) {
                                nEquip.setMatk((short) (nEquip.getMatk() + stat.getValue().intValue()));
                            } else if (stat.getKey().equals("MDD")) {
                                nEquip.setMdef((short) (nEquip.getMdef() + stat.getValue().intValue()));
                            } else if (stat.getKey().equals("ACC")) {
                                nEquip.setAcc((short) (nEquip.getAcc() + stat.getValue().intValue()));
                            } else if (stat.getKey().equals("EVA")) {
                                nEquip.setAvoid((short) (nEquip.getAvoid() + stat.getValue().intValue()));
                            } else if (stat.getKey().equals("Speed")) {
                                nEquip.setSpeed((short) (nEquip.getSpeed() + stat.getValue().intValue()));
                            } else if (stat.getKey().equals("Jump")) {
                                nEquip.setJump((short) (nEquip.getJump() + stat.getValue().intValue()));
                            } else if (stat.getKey().equals("MHP")) {
                                nEquip.setHp((short) (nEquip.getHp() + stat.getValue().intValue()));
                            } else if (stat.getKey().equals("MMP")) {
                                nEquip.setMp((short) (nEquip.getMp() + stat.getValue().intValue()));
                            }
                        }
            } else {

            }
        return equip;
    }
   public int getItemLevel(int itemId) { //获取物品对应的等级 锻造怪物结晶用到
        if (getItemLevel.containsKey(itemId)) {
            return getItemLevel.get(itemId);
        }
        MapleData item = getItemData(itemId);
        if (item == null) {
            return -1;
        }
        int pEntry = 0;
        MapleData pData = item.getChildByPath("info/lv");
        if (pData == null) {
            return -1;
        }
        pEntry = MapleDataTool.getInt(pData);
        getItemLevel.put(itemId, pEntry);
        return pEntry;
    }
   public int getCrystalId(int itemid) { //输入扣除的itemid直接获得相应的怪物结晶 锻造用
        int itemid2 = 0; //遍历Item.wz/Etc/0426.img获得的id
        int itemid4 = 0; //要输出的itemid
        int itemlv = getItemLevel(itemid);
        if(itemlv > 0) {
        ////System.out.println("物品等级 :"+itemlv);
        int min = 0;
        int max = 0;
        MapleDataProvider dataProvider = MapleDataProviderFactory.getDataProvider(new File(ServerConfig.WZPath + "/" + "Item.wz"));
        MapleData a = dataProvider.getData("Etc/0426.img");
        for (MapleData b : a.getChildren()) { //getChildren 子项名 04260000
            itemid2 = Integer.parseInt(b.getName()); //获取itemid
            if(!getAllCrystalId.contains(itemid2)) //如果没有储存到静态里 就遍历储存
                getAllCrystalId.add(itemid2); //储存结晶的itemid
            //////System.out.println("遍历0426.img的itemid2: "+itemid2);
            if (!getCrystalId.containsKey(itemid2)) { //如果没有储存到静态里 就遍历储存
                for (MapleData c : b.getChildren()) { //info
                    for (MapleData d : c.getChildren()) { //lvMax lvMin
                        if(d.getName().equals("lvMin"))
                            min = MapleDataTool.getInt(d); //获取lvMin的值
                        else if(d.getName().equals("lvMax"))
                            max = MapleDataTool.getInt(d); //获取lvMax的值
                    }
                }
                getCrystalId.put(itemid2, new Pair<Integer, Integer>(min, max));
            }
        }
        
        for(int itemid3 : getAllCrystalId){ //把在前面遍历获得的itemid 再遍历回去 getAllCrystalId是储存所有结晶itemid的排列
            Pair<Integer, Integer> ret3 = getCrystalId.get(itemid3);//返回ret 即获得上面的List<Pair<Integer, Integer>>
                if(ret3.getLeft() <= itemlv && ret3.getRight() >= itemlv) { //[31,50] 大小2边都可取等号
                    itemid4 = itemid3;
                    break;
                }
        }
        ////System.out.println("获取的结晶ID :"+itemid4);
        }
        return itemid4;
    }
    protected MapleData getStringData(int itemId) {
        String cat = "null";
        MapleData theData;
        if (itemId >= 5010000) {
            theData = cashStringData;
        } else if (itemId >= 2000000 && itemId < 3000000) {
            theData = consumeStringData;
        } else if (itemId >= 1010000 && itemId < 1040000 || itemId > 1122000 && itemId < 1143000 && itemId != 1122007) {
            theData = eqpStringData;
            cat = "Accessory";

        } else if (itemId >= 1000000 && itemId < 1010000) {
            theData = eqpStringData;
            cat = "Cap";
        } else if (itemId >= 1102000 && itemId < 1103000) {
            theData = eqpStringData;
            cat = "Cape";

        } else if (itemId >= 1040000 && itemId < 1050000) {
            theData = eqpStringData;
            cat = "Coat";
        } else if (itemId >= 20000 && itemId < 22000) {
            theData = eqpStringData;
            cat = "Face";
        } else if (itemId >= 1080000 && itemId < 1090000) {
            theData = eqpStringData;
            cat = "Glove";
        } else if (itemId >= 30000 && itemId < 32000) {
            theData = eqpStringData;
            cat = "Hair";
        } else if (itemId >= 1050000 && itemId < 1060000) {
            theData = eqpStringData;
            cat = "Longcoat";
        } else if (itemId >= 1060000 && itemId < 1070000) {
            theData = eqpStringData;
            cat = "Pants";
        } else if (itemId >= 1802000 && itemId < 1803000 || itemId >= 1812000 && itemId < 1813000 || itemId == 1822000 || itemId == 1832000) {
            theData = eqpStringData;
            cat = "PetEquip";
        } else if (itemId >= 1112000 && itemId < 1120000 || itemId == 1122000 || itemId == 1122007) {
            theData = eqpStringData;
            cat = "Ring";
        } else if (itemId >= 1092000 && itemId < 1100000) {
            theData = eqpStringData;
            cat = "Shield";
        } else if (itemId >= 1070000 && itemId < 1080000) {
            theData = eqpStringData;
            cat = "Shoes";
        } else if (itemId >= 1900000 && itemId < 2000000) {
            theData = eqpStringData;
            cat = "Taming";
        } else if (itemId >= 1300000 && itemId < 1800000) {
            theData = eqpStringData;
            cat = "Weapon";
        } else if (itemId >= 4000000 && itemId < 5000000) {
            theData = etcStringData;
        } else if (itemId >= 3000000 && itemId < 4000000) {
            theData = insStringData;
        } else if (itemId >= 5000000 && itemId < 5010000) {
            theData = petStringData;
        } else {
            return null;
        }

        if (cat.matches("null")) {
            if ((theData != this.etcStringData) || (itemId == 4280000) || (itemId == 4280001)) {
                return theData.getChildByPath(String.valueOf(itemId));
            }
            return theData.getChildByPath("Etc/" + String.valueOf(itemId));
        }

        if (theData == this.eqpStringData) {
            return theData.getChildByPath("Eqp/" + cat + "/" + itemId);
        }
        return theData.getChildByPath(cat + "/" + itemId);
    }

    protected MapleData getItemData(int itemId) {
        MapleData ret = null;
        String idStr = "0" + String.valueOf(itemId);
        MapleDataDirectoryEntry root = itemData.getRoot();
        for (MapleDataDirectoryEntry topDir : root.getSubdirectories()) {
            // we should have .img files here beginning with the first 4 IID
            for (MapleDataFileEntry iFile : topDir.getFiles()) {
                if (iFile.getName().equals(idStr.substring(0, 4) + ".img")) {
                    ret = itemData.getData(topDir.getName() + "/" + iFile.getName());
                    if (ret == null) {
                        return null;
                    }
                    ret = ret.getChildByPath(idStr);
                    return ret;
                } else if (iFile.getName().equals(idStr.substring(1) + ".img")) {
                    return itemData.getData(topDir.getName() + "/" + iFile.getName());
                }
            }
        }
        root = equipData.getRoot();
        for (MapleDataDirectoryEntry topDir : root.getSubdirectories()) {
            for (MapleDataFileEntry iFile : topDir.getFiles()) {
                if (iFile.getName().equals(idStr + ".img")) {
                    return equipData.getData(topDir.getName() + "/" + iFile.getName());
                }
            }
        }
        return ret;
    }

    public short getSlotMax(MapleClient c, int itemId) {
        if (this.slotMaxCache.containsKey(Integer.valueOf(itemId))) {
            return ((Short) this.slotMaxCache.get(Integer.valueOf(itemId))).shortValue();
        }
        short ret = 0;
        MapleData item = getItemData(itemId);
        if (item != null) {
            MapleData smEntry = item.getChildByPath("info/slotMax");
            if (smEntry == null) {
                if (getInventoryType(itemId).getType() == MapleInventoryType.EQUIP.getType()) {
                    ret = 1;
                } else {
                    ret = 100;
                }
            } else {
                if ((isThrowingStar(itemId)) || (isBullet(itemId)) || (MapleDataTool.getInt(smEntry) == 0)) {
                    ret = 1;
                }
                ret = (short) MapleDataTool.getInt(smEntry);
                if (isThrowingStar(itemId)) {
                    ret = (short) (ret + c.getPlayer().getSkillLevel(SkillFactory.getSkill(4100000)) * 10);
                } else {
                    ret = (short) (ret + c.getPlayer().getSkillLevel(SkillFactory.getSkill(5200000)) * 10);
                }
            }
        }

        if ((!isThrowingStar(itemId)) && (!isBullet(itemId))) {
            this.slotMaxCache.put(Integer.valueOf(itemId), Short.valueOf(ret));
        }

        return ret;
    }

    public boolean isThrowingStar(int itemId) {
        return (itemId >= 2070000) && (itemId < 2080000);
    }

    public int getMeso(int itemId) {
        if (this.getMesoCache.containsKey(Integer.valueOf(itemId))) {
            return ((Integer) this.getMesoCache.get(Integer.valueOf(itemId))).intValue();
        }
        MapleData item = getItemData(itemId);
        if (item == null) {
            return -1;
        }
        int pEntry = 0;
        MapleData pData = item.getChildByPath("info/meso");
        if (pData == null) {
            return -1;
        }
        pEntry = MapleDataTool.getInt(pData);

        this.getMesoCache.put(Integer.valueOf(itemId), Integer.valueOf(pEntry));
        return pEntry;
    }

    public int getWholePrice(int itemId) {
        if (this.wholePriceCache.containsKey(Integer.valueOf(itemId))) {
            return ((Integer) this.wholePriceCache.get(Integer.valueOf(itemId))).intValue();
        }
        MapleData item = getItemData(itemId);
        if (item == null) {
            return -1;
        }
        int pEntry = 0;
        MapleData pData = item.getChildByPath("info/price");
        if (pData == null) {
            return -1;
        }
        pEntry = MapleDataTool.getInt(pData);

        this.wholePriceCache.put(Integer.valueOf(itemId), Integer.valueOf(pEntry));
        return pEntry;
    }

    public String getType(int itemId) {
        if (this.itemTypeCache.containsKey(Integer.valueOf(itemId))) {
            return (String) this.itemTypeCache.get(Integer.valueOf(itemId));
        }
        MapleData item = getItemData(itemId);
        if (item == null) {
            return "";
        }

        MapleData pData = item.getChildByPath("info/islot");
        if (pData == null) {
            return "";
        }
        String pEntry = MapleDataTool.getString(pData);

        this.itemTypeCache.put(Integer.valueOf(itemId), pEntry);
        return pEntry;
    }

    public double getPrice(int itemId) {
        if (this.priceCache.containsKey(Integer.valueOf(itemId))) {
            return ((Double) this.priceCache.get(Integer.valueOf(itemId))).doubleValue();
        }
        MapleData item = getItemData(itemId);
        if (item == null) {
            return -1.0D;
        }
        double pEntry = 0.0D;
        MapleData pData = item.getChildByPath("info/unitPrice");
        if (pData != null) {
            try {
                pEntry = MapleDataTool.getDouble(pData);
            } catch (Exception e) {
                pEntry = MapleDataTool.getInt(pData);
            }
        } else {
            pData = item.getChildByPath("info/price");
            if (pData == null) {
                return -1.0D;
            }
            pEntry = MapleDataTool.getInt(pData);
        }

        this.priceCache.put(Integer.valueOf(itemId), Double.valueOf(pEntry));
        return pEntry;
    }

    public boolean isUntradeableOnEquip(int itemId) {
        if (onEquipUntradableCache.containsKey(itemId)) {
            return onEquipUntradableCache.get(itemId);
        }
        boolean untradableOnEquip = MapleDataTool.getIntConvert("info/equipTradeBlock", getItemData(itemId), 0) > 0;
        onEquipUntradableCache.put(itemId, untradableOnEquip);
        return untradableOnEquip;
    }

    protected Map<String, Integer> getEquipStats(int itemId) {
        if (this.equipStatsCache.containsKey(Integer.valueOf(itemId))) {
            return (Map) this.equipStatsCache.get(Integer.valueOf(itemId));
        }
        Map ret = new LinkedHashMap();
        MapleData item = getItemData(itemId);
        if (item == null) {
            return null;
        }
        MapleData info = item.getChildByPath("info");
        if (info == null) {
            return null;
        }
        for (MapleData data : info.getChildren()) {
            if (data.getName().startsWith("inc")) {
                ret.put(data.getName().substring(3), Integer.valueOf(MapleDataTool.getIntConvert(data)));
            }
        }
        ret.put("tuc", Integer.valueOf(MapleDataTool.getInt("tuc", info, 0)));
        ret.put("reqLevel", Integer.valueOf(MapleDataTool.getInt("reqLevel", info, 0)));
        ret.put("reqJob", Integer.valueOf(MapleDataTool.getInt("reqJob", info, 0)));
        ret.put("reqSTR", Integer.valueOf(MapleDataTool.getInt("reqSTR", info, 0)));
        ret.put("reqDEX", Integer.valueOf(MapleDataTool.getInt("reqDEX", info, 0)));
        ret.put("reqINT", Integer.valueOf(MapleDataTool.getInt("reqINT", info, 0)));
        ret.put("reqLUK", Integer.valueOf(MapleDataTool.getInt("reqLUK", info, 0)));
        ret.put("cash", Integer.valueOf(MapleDataTool.getInt("cash", info, 0)));
        ret.put("cursed", Integer.valueOf(MapleDataTool.getInt("cursed", info, 0)));
        ret.put("success", Integer.valueOf(MapleDataTool.getInt("success", info, 0)));
        this.equipStatsCache.put(Integer.valueOf(itemId), ret);
        return ret;
    }

    public int getReqLevel(int itemId) {
        Integer req = (Integer) getEquipStats(itemId).get("reqLevel");
        return req == null ? 0 : req.intValue();
    }

    public int getReqJob(int itemId) {
        Integer req = (Integer) getEquipStats(itemId).get("reqJob");
        return req == null ? 0 : req.intValue();
    }

    public int getReqStr(int itemId) {
        Integer req = (Integer) getEquipStats(itemId).get("reqSTR");
        return req == null ? 0 : req.intValue();
    }

    public int getReqDex(int itemId) {
        Integer req = (Integer) getEquipStats(itemId).get("reqDEX");
        return req == null ? 0 : req.intValue();
    }

    public int getReqInt(int itemId) {
        Integer req = (Integer) getEquipStats(itemId).get("reqINT");
        return req == null ? 0 : req.intValue();
    }

    public int getReqLuk(int itemId) {
        Integer req = (Integer) getEquipStats(itemId).get("reqLUK");
        return req == null ? 0 : req.intValue();
    }

    public boolean isCash(int itemId) {
        Integer req = (Integer) getEquipStats(itemId).get("cash");

        return (req != null) && (req.intValue() != 0);
    }
    public boolean 不可交易A(int itemId) {
        Integer req = (Integer) getEquipStats(itemId).get("tradeBlock");
        return (req != null) && (req.intValue() != 0);
    }
    public boolean 不可交易B(int itemId) {
        Integer req = (Integer) getEquipStats(itemId).get("notSale");
        return (req != null) && (req.intValue() != 0);
    }
    public boolean 固有道具(int itemId) {
        Integer req = (Integer) getEquipStats(itemId).get("only");
        return (req != null) && (req.intValue() != 0);
    }
    public List<Integer> getScrollReqs(int itemId) {
        if (this.scrollRestrictionCache.containsKey(Integer.valueOf(itemId))) {
            return (List) this.scrollRestrictionCache.get(Integer.valueOf(itemId));
        }
        List ret = new ArrayList();
        MapleData data = getItemData(itemId);
        data = data.getChildByPath("req");
        if (data == null) {
            return ret;
        }
        for (MapleData req : data.getChildren()) {
            ret.add(Integer.valueOf(MapleDataTool.getInt(req)));
        }
        return ret;
    }

    public List<SummonEntry> getSummonMobs(int itemId) {
        if (this.summonEntryCache.containsKey(Integer.valueOf(itemId))) {
            return (List) this.summonEntryCache.get(Integer.valueOf(itemId));
        }
        MapleData data = getItemData(itemId);
        int mobSize = data.getChildByPath("mob").getChildren().size();
        List ret = new LinkedList();
        for (int x = 0; x < mobSize; x++) {
            ret.add(new SummonEntry(MapleDataTool.getIntConvert("mob/" + x + "/id", data), MapleDataTool.getIntConvert("mob/" + x + "/prob", data)));
        }
        if (ret.size() == 0) {
            log.warn("Empty summon bag, itemID: {}", Integer.valueOf(itemId));
        }
        this.summonEntryCache.put(Integer.valueOf(itemId), ret);
        return ret;
    }

    public boolean isWeapon(int itemId) {
        return (itemId >= 1302000) && (itemId < 1492024);
    }

    public MapleWeaponType getWeaponType(int itemId) {
        int cat = itemId / 10000;
        cat %= 100;
        switch (cat) {
            case 30:
                return MapleWeaponType.SWORD1H;
            case 31:
                return MapleWeaponType.AXE1H;
            case 32:
                return MapleWeaponType.BLUNT1H;
            case 33:
                return MapleWeaponType.DAGGER;
            case 37:
                return MapleWeaponType.WAND;
            case 38:
                return MapleWeaponType.STAFF;
            case 40:
                return MapleWeaponType.SWORD2H;
            case 41:
                return MapleWeaponType.AXE2H;
            case 42:
                return MapleWeaponType.BLUNT2H;
            case 43:
                return MapleWeaponType.SPEAR;
            case 44:
                return MapleWeaponType.POLE_ARM;
            case 45:
                return MapleWeaponType.BOW;
            case 46:
                return MapleWeaponType.CROSSBOW;
            case 47:
                return MapleWeaponType.CLAW;
            case 39:
            case 48:
                return MapleWeaponType.KNUCKLE;
            case 49:
                return MapleWeaponType.GUN;
            case 34:
            case 35:
            case 36:
        }
        return MapleWeaponType.NOT_A_WEAPON;
    }

    public boolean isShield(int itemId) {
        int cat = itemId / 10000;
        cat %= 100;
        return cat == 9;
    }

    public boolean isEquip(int itemId) {
        return itemId / 1000000 == 1;
    }

    public boolean isCleanSlate(int scrollId) {
        switch (scrollId) {
            case 2049000:
            case 2049001:
            case 2049002:
            case 2049003:
                return true;
        }
        return false;
    }

    public IItem scrollEquipWithId(IItem equip, int scrollId, boolean usingWhiteScroll, boolean checkIfGM) {
        if (equip instanceof Equip) {
            Equip nEquip = (Equip) equip;
            Map<String, Integer> stats = this.getEquipStats(scrollId);
            Map<String, Integer> eqstats = this.getEquipStats(equip.getItemId());
            if ((nEquip.getUpgradeSlots() > 0 || isCleanSlate(scrollId)) && Math.ceil(Math.random() * 100.0) <= stats.get("success") || (checkIfGM == true)) {
                short flag = nEquip.getFlag();
                switch (scrollId) {
                    case 2040727:
                        flag |= InventoryConstants.Items.Flags.SPIKES;
                        nEquip.setFlag((byte) flag);
                        return equip;
                    case 2041058:
                        flag |= InventoryConstants.Items.Flags.COLD;
                        nEquip.setFlag((byte) flag);
                        return equip;
                    case 2049000:
                    case 2049001:
                    case 2049002:
                    case 2049003:
                        if (nEquip.getLevel() + nEquip.getUpgradeSlots() < eqstats.get("tuc")) {
                            byte newSlots = (byte) (nEquip.getUpgradeSlots() + 1);
                            nEquip.setUpgradeSlots(newSlots);
                        }
                        break;
                    case 2049100:
                    case 2049104:
                    case 2049101:
                    case 2049102:
                        int increase = 1;
                        if (Math.ceil(Math.random() * 100.0) <= 50) {
                            increase = increase * -1;
                        }
                        if (nEquip.getStr() > 0) {
                            short newStat = (short) (nEquip.getStr() + Math.ceil(Math.random() * 5.0) * increase);
                            nEquip.setStr(newStat);
                        }
                        if (nEquip.getDex() > 0) {
                            short newStat = (short) (nEquip.getDex() + Math.ceil(Math.random() * 5.0) * increase);
                            nEquip.setDex(newStat);
                        }
                        if (nEquip.getInt() > 0) {
                            short newStat = (short) (nEquip.getInt() + Math.ceil(Math.random() * 5.0) * increase);
                            nEquip.setInt(newStat);
                        }
                        if (nEquip.getLuk() > 0) {
                            short newStat = (short) (nEquip.getLuk() + Math.ceil(Math.random() * 5.0) * increase);
                            nEquip.setLuk(newStat);
                        }
                        if (nEquip.getWatk() > 0) {
                            short newStat = (short) (nEquip.getWatk() + Math.ceil(Math.random() * 5.0) * increase);
                            nEquip.setWatk(newStat);
                        }
                        if (nEquip.getWdef() > 0) {
                            short newStat = (short) (nEquip.getWdef() + Math.ceil(Math.random() * 5.0) * increase);
                            nEquip.setWdef(newStat);
                        }
                        if (nEquip.getMatk() > 0) {
                            short newStat = (short) (nEquip.getMatk() + Math.ceil(Math.random() * 5.0) * increase);
                            nEquip.setMatk(newStat);
                        }
                        if (nEquip.getMdef() > 0) {
                            short newStat = (short) (nEquip.getMdef() + Math.ceil(Math.random() * 5.0) * increase);
                            nEquip.setMdef(newStat);
                        }
                        if (nEquip.getAcc() > 0) {
                            short newStat = (short) (nEquip.getAcc() + Math.ceil(Math.random() * 5.0) * increase);
                            nEquip.setAcc(newStat);
                        }
                        if (nEquip.getAvoid() > 0) {
                            short newStat = (short) (nEquip.getAvoid() + Math.ceil(Math.random() * 5.0) * increase);
                            nEquip.setAvoid(newStat);
                        }
                        if (nEquip.getSpeed() > 0) {
                            short newStat = (short) (nEquip.getSpeed() + Math.ceil(Math.random() * 5.0) * increase);
                            nEquip.setSpeed(newStat);
                        }
                        if (nEquip.getJump() > 0) {
                            short newStat = (short) (nEquip.getJump() + Math.ceil(Math.random() * 5.0) * increase);
                            nEquip.setJump(newStat);
                        }
                        if (nEquip.getHp() > 0) {
                            short newStat = (short) (nEquip.getHp() + Math.ceil(Math.random() * 5.0) * increase);
                            nEquip.setHp(newStat);
                        }
                        if (nEquip.getMp() > 0) {
                            short newStat = (short) (nEquip.getMp() + Math.ceil(Math.random() * 5.0) * increase);
                            nEquip.setMp(newStat);
                        }
                        break;
                    default:
                        for (Entry<String, Integer> stat : stats.entrySet()) {
                            if (stat.getKey().equals("STR")) {
                                nEquip.setStr((short) (nEquip.getStr() + stat.getValue().intValue()));
                            } else if (stat.getKey().equals("DEX")) {
                                nEquip.setDex((short) (nEquip.getDex() + stat.getValue().intValue()));
                            } else if (stat.getKey().equals("INT")) {
                                nEquip.setInt((short) (nEquip.getInt() + stat.getValue().intValue()));
                            } else if (stat.getKey().equals("LUK")) {
                                nEquip.setLuk((short) (nEquip.getLuk() + stat.getValue().intValue()));
                            } else if (stat.getKey().equals("PAD")) {
                                nEquip.setWatk((short) (nEquip.getWatk() + stat.getValue().intValue()));
                            } else if (stat.getKey().equals("PDD")) {
                                nEquip.setWdef((short) (nEquip.getWdef() + stat.getValue().intValue()));
                            } else if (stat.getKey().equals("MAD")) {
                                nEquip.setMatk((short) (nEquip.getMatk() + stat.getValue().intValue()));
                            } else if (stat.getKey().equals("MDD")) {
                                nEquip.setMdef((short) (nEquip.getMdef() + stat.getValue().intValue()));
                            } else if (stat.getKey().equals("ACC")) {
                                nEquip.setAcc((short) (nEquip.getAcc() + stat.getValue().intValue()));
                            } else if (stat.getKey().equals("EVA")) {
                                nEquip.setAvoid((short) (nEquip.getAvoid() + stat.getValue().intValue()));
                            } else if (stat.getKey().equals("Speed")) {
                                nEquip.setSpeed((short) (nEquip.getSpeed() + stat.getValue().intValue()));
                            } else if (stat.getKey().equals("Jump")) {
                                nEquip.setJump((short) (nEquip.getJump() + stat.getValue().intValue()));
                            } else if (stat.getKey().equals("MHP")) {
                                nEquip.setHp((short) (nEquip.getHp() + stat.getValue().intValue()));
                            } else if (stat.getKey().equals("MMP")) {
                                nEquip.setMp((short) (nEquip.getMp() + stat.getValue().intValue()));
                            } else if (stat.getKey().equals("afterImage")) {
                            }
                        }
                        break;
                }
                if (!isCleanSlate(scrollId)) {
                    nEquip.setUpgradeSlots((byte) (nEquip.getUpgradeSlots() - 1));
                    nEquip.setLevel((byte) (nEquip.getLevel() + 1));
                }
            } else {
                if (!usingWhiteScroll && !isCleanSlate(scrollId)) {
                    nEquip.setUpgradeSlots((byte) (nEquip.getUpgradeSlots() - 1));
                }
                if (Math.ceil(1.0 + Math.random() * 100.0) < stats.get("cursed")) {
                    return null;
                }
            }
        }
        return equip;
    }

    public IItem getEquipById(int equipId) {
        Equip nEquip;
        nEquip = new Equip(equipId, (byte) 0);
        nEquip.setQuantity((short) 1);
        Map<String, Integer> stats = this.getEquipStats(equipId);
        if (stats != null) {
            for (Entry<String, Integer> stat : stats.entrySet()) {
                if (stat.getKey().equals("STR")) {
                    nEquip.setStr((short) stat.getValue().intValue());
                } else if (stat.getKey().equals("DEX")) {
                    nEquip.setDex((short) stat.getValue().intValue());
                } else if (stat.getKey().equals("INT")) {
                    nEquip.setInt((short) stat.getValue().intValue());
                } else if (stat.getKey().equals("LUK")) {
                    nEquip.setLuk((short) stat.getValue().intValue());
                } else if (stat.getKey().equals("PAD")) {
                    nEquip.setWatk((short) stat.getValue().intValue());
                } else if (stat.getKey().equals("PDD")) {
                    nEquip.setWdef((short) stat.getValue().intValue());
                } else if (stat.getKey().equals("MAD")) {
                    nEquip.setMatk((short) stat.getValue().intValue());
                } else if (stat.getKey().equals("MDD")) {
                    nEquip.setMdef((short) stat.getValue().intValue());
                } else if (stat.getKey().equals("ACC")) {
                    nEquip.setAcc((short) stat.getValue().intValue());
                } else if (stat.getKey().equals("EVA")) {
                    nEquip.setAvoid((short) stat.getValue().intValue());
                } else if (stat.getKey().equals("Speed")) {
                    nEquip.setSpeed((short) stat.getValue().intValue());
                } else if (stat.getKey().equals("Jump")) {
                    nEquip.setJump((short) stat.getValue().intValue());
                } else if (stat.getKey().equals("MHP")) {
                    nEquip.setHp((short) stat.getValue().intValue());
                } else if (stat.getKey().equals("MMP")) {
                    nEquip.setMp((short) stat.getValue().intValue());
                } else if (stat.getKey().equals("tuc")) {
                    nEquip.setUpgradeSlots((byte) stat.getValue().intValue());
                } else if (isDropRestricted(equipId)) {
                    byte flag = nEquip.getFlag();
                    flag |= InventoryConstants.Items.Flags.UNTRADEABLE;
                    nEquip.setFlag(flag);
                } else if (stat.getKey().equals("afterImage")) {
                }
            }
        }
        equipCache.put(equipId, nEquip);
        return nEquip.copy();
    }

    private short getRandStat(short defaultValue, int maxRange) {
        if (defaultValue == 0) {
            return 0;
        }

        int lMaxRange = (int) Math.min(Math.ceil(defaultValue * 0.1D), maxRange);
        return (short) (int) (defaultValue - lMaxRange + Math.floor(Math.random() * (lMaxRange * 2 + 1)));
    }

    public Equip randomizeStats(Equip equip) {
        equip.setStr(getRandStat(equip.getStr(), 5));
        equip.setDex(getRandStat(equip.getDex(), 5));
        equip.setInt(getRandStat(equip.getInt(), 5));
        equip.setLuk(getRandStat(equip.getLuk(), 5));
        equip.setMatk(getRandStat(equip.getMatk(), 5));
        equip.setWatk(getRandStat(equip.getWatk(), 5));
        equip.setAcc(getRandStat(equip.getAcc(), 5));
        equip.setAvoid(getRandStat(equip.getAvoid(), 5));
        equip.setJump(getRandStat(equip.getJump(), 5));
        equip.setSpeed(getRandStat(equip.getSpeed(), 5));
        equip.setWdef(getRandStat(equip.getWdef(), 10));
        equip.setMdef(getRandStat(equip.getMdef(), 10));
        equip.setHp(getRandStat(equip.getHp(), 10));
        equip.setMp(getRandStat(equip.getMp(), 10));
        return equip;
    }

    public MapleStatEffect getItemEffect(int itemId) {
        MapleStatEffect ret = (MapleStatEffect) this.itemEffects.get(Integer.valueOf(itemId));
        if (ret == null) {
            MapleData item = getItemData(itemId);
            if (item == null) {
                return null;
            }
            MapleData spec = item.getChildByPath("spec");
            ret = MapleStatEffect.loadItemEffectFromData(spec, itemId);
            this.itemEffects.put(Integer.valueOf(itemId), ret);
        }
        return ret;
    }

    public boolean isBullet(int itemId) {
        int id = itemId / 10000;

        return id == 233;
    }

    public boolean isRechargable(int itemId) {
        int id = itemId / 10000;

        return (id == 233) || (id == 207);
    }

    public boolean isOverall(int itemId) {
        return (itemId >= 1050000) && (itemId < 1060000);
    }

    public boolean isPet(int itemId) {
        return (itemId >= 5000000) && (itemId <= 5000100);
    }

    public boolean isArrowForCrossBow(int itemId) {
        return (itemId >= 2061000) && (itemId < 2062000);
    }

    public boolean isArrowForBow(int itemId) {
        return (itemId >= 2060000) && (itemId < 2061000);
    }

    public boolean isTwoHanded(int itemId) { //双手武器
        switch (getWeaponType(itemId)) {
            case AXE2H:
            case BLUNT2H:
            case BOW:
            case CLAW:
            case CROSSBOW:
            case POLE_ARM:
            case SPEAR:
            case SWORD2H:
            case GUN:
            case KNUCKLE:
                return true;
            default:
                return false;
        }
    }

    public boolean isTownScroll(int itemId) {
        return (itemId >= 2030000) && (itemId < 2030020);
    }

    public boolean isGun(int itemId) {
        return (itemId >= 1492000) && (itemId <= 1492024);
    }

    public boolean isWritOfSolomon(int itemId) {
        return (itemId >= 2370000) && (itemId <= 2370012);
    }

    public int getExpCache(int itemId) {
        if (this.getExpCache.containsKey(Integer.valueOf(itemId))) {
            return ((Integer) this.getExpCache.get(Integer.valueOf(itemId))).intValue();
        }
        MapleData item = getItemData(itemId);
        if (item == null) {
            return 0;
        }
        int pEntry = 0;
        MapleData pData = item.getChildByPath("spec/exp");
        if (pData == null) {
            return 0;
        }
        pEntry = MapleDataTool.getInt(pData);

        this.getExpCache.put(Integer.valueOf(itemId), Integer.valueOf(pEntry));
        return pEntry;
    }

    public int getWatkForProjectile(int itemId) {
        Integer atk = (Integer) this.projectileWatkCache.get(Integer.valueOf(itemId));
        if (atk != null) {
            return atk.intValue();
        }
        MapleData data = getItemData(itemId);
        atk = Integer.valueOf(MapleDataTool.getInt("info/incPAD", data, 0));
        this.projectileWatkCache.put(Integer.valueOf(itemId), atk);
        return atk.intValue();
    }

    public boolean canScroll(int scrollid, int itemid) {
        int scrollCategoryQualifier = scrollid / 100 % 100;
        int itemCategoryQualifier = itemid / 10000 % 100;
        return scrollCategoryQualifier == itemCategoryQualifier;
    }

    public String getName(int itemId) {
        if (this.nameCache.containsKey(Integer.valueOf(itemId))) {
            return (String) this.nameCache.get(Integer.valueOf(itemId));
        }
        MapleData strings = getStringData(itemId);
        if (strings == null) {
            return null;
        }
        String ret = MapleDataTool.getString("name", strings, null);
        this.nameCache.put(Integer.valueOf(itemId), ret);
        return ret;
    }

    public String getDesc(int itemId) {
        if (this.descCache.containsKey(Integer.valueOf(itemId))) {
            return (String) this.descCache.get(Integer.valueOf(itemId));
        }
        MapleData strings = getStringData(itemId);
        if (strings == null) {
            return null;
        }
        String ret = MapleDataTool.getString("desc", strings, null);
        this.descCache.put(Integer.valueOf(itemId), ret);
        return ret;
    }

    public String getMsg(int itemId) {
        if (this.msgCache.containsKey(Integer.valueOf(itemId))) {
            return (String) this.msgCache.get(Integer.valueOf(itemId));
        }
        MapleData strings = getStringData(itemId);
        if (strings == null) {
            return null;
        }
        String ret = MapleDataTool.getString("msg", strings, null);
        this.msgCache.put(Integer.valueOf(itemId), ret);
        return ret;
    }

    public boolean isDropRestricted(int itemId) {
        if (this.dropRestrictionCache.containsKey(Integer.valueOf(itemId))) {
            return ((Boolean) this.dropRestrictionCache.get(Integer.valueOf(itemId))).booleanValue();
        }
        MapleData data = getItemData(itemId);

        boolean bRestricted = MapleDataTool.getIntConvert("info/tradeBlock", data, 0) == 1;
        if (!bRestricted) {
            bRestricted = MapleDataTool.getIntConvert("info/quest", data, 0) == 1;
        }
        this.dropRestrictionCache.put(Integer.valueOf(itemId), Boolean.valueOf(bRestricted));

        return bRestricted;
    }

    public boolean isPickupRestricted(int itemId) {
        if (this.pickupRestrictionCache.containsKey(Integer.valueOf(itemId))) {
            return ((Boolean) this.pickupRestrictionCache.get(Integer.valueOf(itemId))).booleanValue();
        }
        MapleData data = getItemData(itemId);
        boolean bRestricted = MapleDataTool.getIntConvert("info/only", data, 0) == 1;

        this.pickupRestrictionCache.put(Integer.valueOf(itemId), Boolean.valueOf(bRestricted));
        return bRestricted;
    }

    public Map<String, Integer> getSkillStats(int itemId, double playerJob) {
        Map ret = new LinkedHashMap();
        MapleData item = getItemData(itemId);
        if (item == null) {
            return null;
        }
        MapleData info = item.getChildByPath("info");
        if (info == null) {
            return null;
        }
        for (MapleData data : info.getChildren()) {
            if (data.getName().startsWith("inc")) {
                ret.put(data.getName().substring(3), Integer.valueOf(MapleDataTool.getIntConvert(data)));
            }
        }
        ret.put("masterLevel", Integer.valueOf(MapleDataTool.getInt("masterLevel", info, 0)));
        ret.put("reqSkillLevel", Integer.valueOf(MapleDataTool.getInt("reqSkillLevel", info, 0)));
        ret.put("success", Integer.valueOf(MapleDataTool.getInt("success", info, 0)));

        MapleData skill = info.getChildByPath("skill");
        int curskill = 1;
        int size = skill.getChildren().size();
        for (int i = 0; i < size; i++) {
            curskill = MapleDataTool.getInt(Integer.toString(i), skill, 0);
            if (curskill == 0) {
                break;
            }
            double skillJob = Math.floor(curskill / 10000);
            if (skillJob == playerJob) {
                ret.put("skillid", Integer.valueOf(curskill));
                break;
            }
        }

        if (ret.get("skillid") == null) {
            ret.put("skillid", Integer.valueOf(0));
        }
        return ret;
    }

    public List<Integer> petsCanConsume(int itemId) {
        List ret = new ArrayList();
        MapleData data = getItemData(itemId);
        int curPetId = 0;
        int size = data.getChildren().size();
        for (int i = 0; i < size; i++) {
            curPetId = MapleDataTool.getInt("spec/" + Integer.toString(i), data, 0);
            if (curPetId == 0) {
                break;
            }
            ret.add(Integer.valueOf(curPetId));
        }
        return ret;
    }

    public boolean isQuestItem(int itemId) {
        if (this.isQuestItemCache.containsKey(Integer.valueOf(itemId))) {
            return ((Boolean) this.isQuestItemCache.get(Integer.valueOf(itemId))).booleanValue();
        }
        MapleData data = getItemData(itemId);
        boolean questItem = MapleDataTool.getIntConvert("info/quest", data, 0) == 1;
        this.isQuestItemCache.put(Integer.valueOf(itemId), Boolean.valueOf(questItem));
        return questItem;
    }

    public boolean isMiniDungeonMap(int mapId) {
        switch (mapId) {
            case 100020000:
            case 105040304:
            case 105050100:
            case 221023400:
                return true;
        }
        return false;
    }

    public boolean isDragonItem(int itemId) {
        switch (itemId) {
            case 1302059:
            case 1312031:
            case 1322052:
            case 1332049:
            case 1332050:
            case 1372032:
            case 1382036:
            case 1402036:
            case 1412026:
            case 1422028:
            case 1432038:
            case 1442045:
            case 1452044:
            case 1462039:
            case 1472051:
            case 1472052:
                return true;
        }
        return false;
    }

    public boolean isKarmaAble(int itemId) {
        if (this.karmaCache.containsKey(Integer.valueOf(itemId))) {
            return ((Boolean) this.karmaCache.get(Integer.valueOf(itemId))).booleanValue();
        }
        MapleData data = getItemData(itemId);
        boolean bRestricted = MapleDataTool.getIntConvert("info/tradeAvailable", data, 0) > 0; //可以交易
        this.karmaCache.put(Integer.valueOf(itemId), Boolean.valueOf(bRestricted));
        return bRestricted;
    }
    public boolean isConsumeOnPickup(int itemId) {
    	//捡起物品后自动使用
        if (this.consumeOnPickupCache.containsKey(Integer.valueOf(itemId))) {
            return ((Boolean) this.consumeOnPickupCache.get(Integer.valueOf(itemId))).booleanValue();
        }

        MapleData data = getItemData(itemId);

        boolean consume = (MapleDataTool.getIntConvert("spec/consumeOnPickup", data, 0) == 1) || (MapleDataTool.getIntConvert("specEx/consumeOnPickup", data, 0) == 1);

        this.consumeOnPickupCache.put(Integer.valueOf(itemId), Boolean.valueOf(consume));
        return consume;
    }

    private void loadCardIdData() {
        PreparedStatement ps = null;
        ResultSet rs = null;
        try {
            ps = DatabaseConnection.getConnection().prepareStatement("SELECT cardid, mobid FROM monstercarddata");
            rs = ps.executeQuery();
            while (rs.next()) {
                this.monsterBookID.put(Integer.valueOf(rs.getInt(1)), Integer.valueOf(rs.getInt(2)));
            }
            rs.close();
            ps.close();
        } catch (SQLException e) {
        } finally {
            try {
                if (rs != null) {
                    rs.close();
                }
                if (ps != null) {
                    ps.close();
                }
            } catch (SQLException e) {
            }
        }
    }

    public int getCardMobId(int id) {
        return ((Integer) this.monsterBookID.get(Integer.valueOf(id))).intValue();
    }

    public static class SummonEntry {

        private int chance;
        private int mobId;

        public SummonEntry(int a, int b) {
            this.mobId = a;
            this.chance = b;
        }

        public int getChance() {
            return this.chance;
        }

        public int getMobId() {
            return this.mobId;
        }
    }

    public Pair<Integer, List<RewardItem>> getItemReward(int itemId) {//Thanks Celino, used some stuffs :)
        if (rewardCache.containsKey(itemId)) {
            return rewardCache.get(itemId);
        }
        int totalprob = 0;
        List<RewardItem> rewards = new ArrayList();
        for (MapleData child : getItemData(itemId).getChildByPath("reward").getChildren()) {
            RewardItem reward = new RewardItem();
            reward.itemid = MapleDataTool.getInt("item", child, 0);
            reward.prob = (byte) MapleDataTool.getInt("prob", child, 0);
            reward.quantity = (short) MapleDataTool.getInt("count", child, 0);
            reward.effect = MapleDataTool.getString("Effect", child, "");
            reward.worldmsg = MapleDataTool.getString("worldMsg", child, null);
            reward.period = MapleDataTool.getInt("period", child, -1);

            totalprob += reward.prob;

            rewards.add(reward);
        }
        Pair<Integer, List<RewardItem>> hmm = new Pair(totalprob, rewards);
        rewardCache.put(itemId, hmm);
        return hmm;
    }

    public static class MapleDayInt {

        public static String getDayInt(int day) {
            if (day == 1) {
                return "SUN";
            }
            if (day == 2) {
                return "MON";
            }
            if (day == 3) {
                return "TUE";
            }
            if (day == 4) {
                return "WED";
            }
            if (day == 5) {
                return "THU";
            }
            if (day == 6) {
                return "FRI";
            }
            if (day == 7) {
                return "SAT";
            }
            return null;
        }
    }
}
