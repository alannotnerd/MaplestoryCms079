 package net.sf.cherry.tools;
 
 import java.io.File;
import java.io.FileNotFoundException;
import java.io.FileOutputStream;
import java.io.IOException;
import java.rmi.NotBoundException;
import java.util.ArrayList;
import java.util.List;

import javax.management.InstanceAlreadyExistsException;
import javax.management.MBeanRegistrationException;
import javax.management.MalformedObjectNameException;
import javax.management.NotCompliantMBeanException;

import constants.ServerConfig;
import net.sf.cherry.provider.MapleData;
import net.sf.cherry.provider.MapleDataProvider;
import net.sf.cherry.provider.MapleDataProviderFactory;
import net.sf.cherry.provider.MapleDataTool;
 
 public class MonsterDropCreator
 {
   private static boolean includeQuestDrops;
   protected static String monsterQueryData = "monster_dropz";
   protected static List<Pair<Integer, String>> itemNameCache = new ArrayList();
   protected static List<Pair<Integer, MobInfo>> mobCache = new ArrayList();
 
   public static void main(String[] args) throws FileNotFoundException, IOException, NotBoundException, InstanceAlreadyExistsException, MBeanRegistrationException, NotCompliantMBeanException, MalformedObjectNameException {
     MapleData data = MapleDataProviderFactory.getDataProvider(new File(ServerConfig.WZPath + "/String.wz")).getData("MonsterBook.img");
     System.out.println("警告 : 使用此操作会占用很大内存!");
     System.out.println("按任意键继续...");
     System.console().readLine();
     System.out.println("确认成功，按任意键继续操作！");
     System.out.println("20秒后开始执行程序!");
     try {
       for (int i = 20; i >= 1; i--) {
         Thread.sleep(1000L);
         if ((i == 20) || (i == 15) || (i == 10) || (i == 5))
          System.out.println("剩余时间 : " + i + " 秒.");
       }
     }
     catch (InterruptedException e) {
       System.err.println("哦NO~~~系统故障！！！" + e);
       return;
     }
     System.out.println("当你想.\n\n\n\n");
     long currtime = System.currentTimeMillis();
     includeQuestDrops = Boolean.parseBoolean(args[0]);
     System.out.println("加载 : 物品数据.");
     getAllItems();
     System.out.println("加载 : 怪物数据.");
     getAllMobs();
     System.out.println("加载 : 怪物物品掉落数据.");
 
     StringBuilder sb = new StringBuilder();
     FileOutputStream out = new FileOutputStream("mobDrop.sql", true);
 
     for (MapleData dataz : data.getChildren()) {
       int monsterId = Integer.parseInt(dataz.getName());
       int idtoLog = monsterId;
       boolean first = true;
       if (monsterId == 8520000) {
         monsterId = 8510000;
       }
       if (dataz.getChildByPath("reward").getChildren().size() > 0) {
         sb.append("INSERT INTO " + monsterQueryData + " VALUES ");
         for (MapleData drop : dataz.getChildByPath("reward")) {
           int itemid = MapleDataTool.getInt(drop);
           int rate = getChance(itemid);
           for (Pair Pair : mobCache) {
             if (((Integer)Pair.getLeft()).intValue() == monsterId) {
               if ((((MobInfo)Pair.getRight()).getBoss() <= 0) || 
                 (rate <= 10)) break;
               if (((MobInfo)Pair.getRight()).rateItemDropLevel() == 2) {
                 rate /= 5; break;
               }if (((MobInfo)Pair.getRight()).rateItemDropLevel() == 3) {
                 switch (monsterId) {
                 case 8810018:
                   rate /= 13;
                   break;
                 case 8800002:
                   rate /= 9;
                   break;
                 default:
                   rate /= 8;
                   break;
                 }
               }
               rate /= 10;
               break;
             }
 
           }
 
           if (first) {
             sb.append("(DEFAULT, " + idtoLog + ", " + itemid + ", " + rate);
             if (includeQuestDrops)
               sb.append(", DEFAULT)");
             else {
               sb.append(")");
             }
             first = false;
           } else {
             sb.append(", (DEFAULT, " + idtoLog + ", " + itemid + ", " + rate);
             if (includeQuestDrops)
               sb.append(", DEFAULT)");
             else {
               sb.append(")");
             }
           }
           sb.append("\n");
           sb.append("-- Name : ");
           for (Pair Pair : itemNameCache) {
             if (((Integer)Pair.getLeft()).intValue() == itemid) {
               sb.append((String)Pair.getRight());
               break;
             }
           }
           sb.append("\n");
         }
         sb.append(";");
       }
       sb.append("\n");
 
       out.write(sb.toString().getBytes(ServerConfig.STRCHARSET));
       sb.delete(0, 2147483647);
     }
     //System.out.println("加载 : 怪物图签掉落数据.");
     StringBuilder SQL = new StringBuilder();
     StringBuilder bookName = new StringBuilder();
     for (Pair Pair : itemNameCache) {
       if ((((Integer)Pair.getLeft()).intValue() >= 2380000) && (((Integer)Pair.getLeft()).intValue() <= 2388054)) {
         bookName.append((String)Pair.getRight());
         bookName.delete(bookName.length() - 5, bookName.length());
         for (Pair Pair_ : mobCache) {
           if (((MobInfo)Pair_.getRight()).getName().equalsIgnoreCase(bookName.toString())) {
             int rate = 7000;
             if (((MobInfo)Pair_.getRight()).getBoss() > 0) {
               rate /= 10;
             }
             SQL.append("INSERT INTO " + monsterQueryData + " VALUES (DEFAULT, " + Pair_.getLeft() + ", " + Pair.getLeft() + ", " + rate);
             if (includeQuestDrops)
               SQL.append(", DEFAULT);");
             else {
               SQL.append(");");
             }
             SQL.append("\n");
             break;
           }
         }
         bookName.delete(0, 2147483647);
       }
     }
     out.write(SQL.toString().getBytes(ServerConfig.STRCHARSET));
     out.close();
 
     long time = System.currentTimeMillis() - currtime;
     time /= 1000L;
     //////System.out.println("b00~ You've wasted " + time + " seconds of your life... Sucks for ya");
   }
 
   private static int getChance(int id) {
     switch (id / 10000) {
     case 100:
       switch (id) {
       case 1002357:
       case 1002390:
       case 1002430:
       case 1002905:
       case 1002906:
       case 1002926:
       case 1002927:
         return 8;
       }
       return 5000;
     case 105:
     case 109:
       return 5500;
     case 104:
     case 106:
     case 107:
       switch (id) {
       case 1072369:
         return 500;
       }
     case 108:
     case 110:
       return 5000;
     case 112:
       switch (id) {
       case 1122000:
         return 8;
       case 1122011:
       case 1122012:
         return 10;
       }
     case 130:
     case 131:
     case 132:
     case 137:
     case 138:
     case 140:
     case 141:
     case 142:
     case 144:
       return 5500;
     case 133:
     case 143:
     case 145:
     case 146:
       return 6000;
     case 147:
       return 6200;
     case 233:
       return 7000;
     case 204:
       switch (id) {
       case 2049000:
         return 15000;
       }
       return 12000;
     case 206:
       return 200;
     case 228:
       return 600;
     case 229:
       switch (id) {
       case 2290096:
       case 2290125:
         return 5000;
       }
       return 7000;
     case 413:
       return 1000;
     case 400:
       switch (id) {
       case 4001000:
         return 5000;
       case 4000157:
         return 200;
       case 4001023:
       case 4001024:
         return 1;
       case 4000245:
         return 11000;
       case 4000244:
         return 10500;
       case 4001005:
         return 7000;
       case 4001006:
         return 2000;
       case 4000017:
       case 4000082:
         return 1000;
       case 4000446:
       case 4000451:
       case 4000456:
         return 7000;
       case 4000459:
         return 3000;
       case 4007000:
       case 4007001:
       case 4007002:
       case 4007003:
       case 4007004:
       case 4007005:
       case 4007006:
       case 4007007:
         return 1200;
       }
       switch (id / 1000) {
       case 4000:
       case 4001:
         return 7;
       case 4003:
         return 200;
       case 4004:
       case 4006:
         return 1500;
       case 4005:
         return 100;
       case 4002:
       }case 401:
     case 402:
       switch (id) {
       case 4020009:
         return 10000;
       case 4021010:
         return 8;
       }
     case 416:
       return 600;
     case 403:
       return 300;
     }
     switch (id / 1000000) {
     case 1:
       return 5000;
     case 2:
       switch (id) {
       case 2000004:
       case 2000005:
       case 2000006:
         return 400;
       case 2000000:
       case 2000002:
       case 2000003:
       case 2001001:
       case 2002000:
       case 2002001:
       case 2002003:
       case 2002004:
       case 2002006:
       case 2002011:
       case 2010009:
       case 2012001:
       case 2012002:
       case 2020013:
       case 2020014:
       case 2020015:
       case 2022001:
       case 2022142:
       case 2022186:
         return 100;
       case 2060000:
       case 2060001:
       case 2061000:
       case 2061001:
         return 200;
       case 2070000:
       case 2070001:
       case 2070002:
       case 2070003:
       case 2070004:
       case 2070005:
       case 2070006:
       case 2070007:
       case 2070008:
       case 2070009:
       case 2070010:
         return 10000;
       }
       return 400;
     }
 
     return 0;
   }
 
   private static void getAllItems() {
     MapleDataProvider data = MapleDataProviderFactory.getDataProvider(new File(ServerConfig.WZPath + "/String.wz"));
     List itemPairs = new ArrayList();
 
     MapleData itemsData = data.getData("Cash.img");
     for (MapleData itemFolder : itemsData.getChildren()) {
       int itemId = Integer.parseInt(itemFolder.getName());
       String itemName = MapleDataTool.getString("name", itemFolder, "NO-NAME");
       itemPairs.add(new Pair(Integer.valueOf(itemId), itemName));
     }
     itemsData = data.getData("Consume.img");
     for (MapleData itemFolder : itemsData.getChildren()) {
       int itemId = Integer.parseInt(itemFolder.getName());
       String itemName = MapleDataTool.getString("name", itemFolder, "NO-NAME");
       itemPairs.add(new Pair(Integer.valueOf(itemId), itemName));
     }
     itemsData = data.getData("Eqp.img").getChildByPath("Eqp");
     for (MapleData eqpType : itemsData.getChildren()) {
       for (MapleData itemFolder : eqpType.getChildren()) {
         int itemId = Integer.parseInt(itemFolder.getName());
         String itemName = MapleDataTool.getString("name", itemFolder, "NO-NAME");
         itemPairs.add(new Pair(Integer.valueOf(itemId), itemName));
       }
     }
     itemsData = data.getData("Etc.img").getChildByPath("Etc");
     for (MapleData itemFolder : itemsData.getChildren()) {
       int itemId = Integer.parseInt(itemFolder.getName());
       String itemName = MapleDataTool.getString("name", itemFolder, "NO-NAME");
       itemPairs.add(new Pair(Integer.valueOf(itemId), itemName));
     }
     itemsData = data.getData("Ins.img");
     for (MapleData itemFolder : itemsData.getChildren()) {
       int itemId = Integer.parseInt(itemFolder.getName());
       String itemName = MapleDataTool.getString("name", itemFolder, "NO-NAME");
       itemPairs.add(new Pair(Integer.valueOf(itemId), itemName));
     }
     itemsData = data.getData("Pet.img");
     for (MapleData itemFolder : itemsData.getChildren()) {
       int itemId = Integer.parseInt(itemFolder.getName());
       String itemName = MapleDataTool.getString("name", itemFolder, "NO-NAME");
       itemPairs.add(new Pair(Integer.valueOf(itemId), itemName));
     }
     itemNameCache.addAll(itemPairs);
   }
 
   public static void getAllMobs() {
     List itemPairs = new ArrayList();
     MapleDataProvider data = MapleDataProviderFactory.getDataProvider(new File(ServerConfig.WZPath + "/String.wz"));
     MapleDataProvider mobData = MapleDataProviderFactory.getDataProvider(new File(ServerConfig.WZPath + "/Mob.wz"));
     MapleData mob = data.getData("Mob.img");
 
     for (MapleData itemFolder : mob.getChildren()) {
       int id = Integer.parseInt(itemFolder.getName());
       try {
         MapleData monsterData = mobData.getData(StringUtil.getLeftPaddedStr(Integer.toString(id) + ".img", '0', 11));
         MobInfo mobInfo = new MobInfo(id == 8810018 ? 1 : MapleDataTool.getIntConvert("boss", monsterData.getChildByPath("info"), 0), MapleDataTool.getIntConvert("rareItemDropLevel", monsterData.getChildByPath("info"), 0), MapleDataTool.getString("name", itemFolder, "NO-NAME"));
 
         itemPairs.add(new Pair(Integer.valueOf(id), mobInfo));
       } catch (Exception e) {
       }
     }
     mobCache.addAll(itemPairs);
   }
   public static class MobInfo {
     public int boss;
     public int rareItemDropLevel;
     public String name;
 
     public MobInfo(int boss, int rareItemDropLevel, String name) { this.boss = boss;
       this.rareItemDropLevel = rareItemDropLevel;
       this.name = name; }
 
     public int getBoss()
     {
       return this.boss;
     }
 
     public int rateItemDropLevel() {
       return this.rareItemDropLevel;
     }
 
     public String getName() {
       return this.name;
     }
   }
 }

