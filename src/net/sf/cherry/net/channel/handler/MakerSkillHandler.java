 package net.sf.cherry.net.channel.handler;
 
 import net.sf.cherry.client.Equip;
import net.sf.cherry.client.MapleClient;
import net.sf.cherry.net.AbstractMaplePacketHandler;
import net.sf.cherry.server.MakerItemFactory;
import net.sf.cherry.server.MakerItemFactory.MakerItemCreateEntry;
import net.sf.cherry.server.MapleInventoryManipulator;
import net.sf.cherry.server.MapleItemInformationProvider;
import net.sf.cherry.tools.MaplePacketCreator;
import net.sf.cherry.tools.Pair;
import net.sf.cherry.tools.data.input.SeekableLittleEndianAccessor;
 
 /*public final class MakerSkillHandler extends AbstractMaplePacketHandler
 {
   private MapleItemInformationProvider ii = MapleItemInformationProvider.getInstance();*/
   /*71 00  //什么都没有
    *01 00 00 00 
    *6A 53 14 00 
    *00
    *00 00 00 00*/
   
 /* 71 00   //只有宝石
  * 01 00 00 00 
  * 6A 53 14 00 
  * 00 
  * 01 00 00 00 
  * 90 D9 40 00*/
   
  /*71 00   //一个宝石 一个促
    * 01 00 00 00 
    * 6A 53 14 00 
    * 01 
    * 01 00 00 00 
    * 90 D9 40 00*/
   
   /*71 00   //宝石放满  一个促
    * 01 00 00 00 
    * 6A 53 14 00 
    * 01
    * 03 00 00 00 
    * 90 D9 40 00 
    * 4E DC 40 00 
    * 20 DB 40 00*/
 /*  public final void handlePacket(SeekableLittleEndianAccessor slea, MapleClient c) {
     c.doneedlog(this, c.getPlayer());
     slea.readInt();
     int toCreate = slea.readInt();
     slea.readInt();
     slea.readByte();
     
     MakerItemFactory.MakerItemCreateEntry recipe = MakerItemFactory.getItemCreateEntry(toCreate);
     ////System.out.println("输出1");
     if ((canCreate(c, recipe)) && (!c.getPlayer().getInventory(this.ii.getInventoryType(toCreate)).isFull())) {
         ////System.out.println("输出A");
       for (Pair p : recipe.getReqItems()) {
         int toRemove = ((Integer)p.getLeft()).intValue();
         MapleInventoryManipulator.removeById(c, this.ii.getInventoryType(toRemove), toRemove, ((Integer)p.getRight()).intValue(), false, false);
         ////System.out.println("输出B");
       }
       MapleInventoryManipulator.addById(c, toCreate, (short)recipe.getRewardAmount(), null);
       
       ////System.out.println("输出C");
     }
   }
 
   private boolean canCreate(MapleClient c, MakerItemFactory.MakerItemCreateEntry recipe) {
     return (hasItems(c, recipe)) && (c.getPlayer().getMeso() >= recipe.getCost()) && (c.getPlayer().getLevel() >= recipe.getReqLevel()) && (c.getPlayer().getSkillLevel(c.getPlayer().getJob().getId() / 1000 * 1000 + 1007) >= recipe.getReqSkillLevel());
   }
 
   private boolean hasItems(MapleClient c, MakerItemFactory.MakerItemCreateEntry recipe) {
     for (Pair p : recipe.getReqItems()) {
       int itemId = ((Integer)p.getLeft()).intValue();
       if (c.getPlayer().getInventory(this.ii.getInventoryType(itemId)).countById(itemId) < ((Integer)p.getRight()).intValue()) {
         return false;
       }
     }
     return true;
   }
 }*/
public final class MakerSkillHandler extends AbstractMaplePacketHandler {

    private static org.slf4j.Logger log = org.slf4j.LoggerFactory.getLogger(MakerSkillHandler.class);

    public final void handlePacket(SeekableLittleEndianAccessor slea, MapleClient c) {
        MapleItemInformationProvider ii = MapleItemInformationProvider.getInstance();
        int Meso = 0;
        slea.readInt();
        int toCreate = slea.readInt();//要制造的itemid
        if (slea.available() >= 5 && slea.available() <= 17) {
        ////System.out.println("普通类 强化宝石 装备");
        boolean UseCatalyst = false; //是否使用促进剂
        boolean UseCrystal = false; //是否使用强化宝石
        if(slea.readByte() == 1)
            UseCatalyst = true;
        ////System.out.println("获得的itemid："+toCreate);
        //通过此语句获取需要的条件 具体跳转声明去看
        MakerItemCreateEntry recipe = MakerItemFactory.getItemCreateEntry(toCreate, UseCatalyst);
        if (canCreate(c, recipe) //判断是否可以制造 具体看下面的函数
                && !c.getPlayer().getInventory(ii.getInventoryType(toCreate)).isFull() //锻造获得的物品所在的栏是否满了
                ) {
            int a = recipe.getCost();
            Meso += a * 1.1; //盛大加了10%的税
            for (Pair<Integer, Integer> p : recipe.getReqItems()) {
                //Left是itemid  Right是数量
                int toRemove = p.getLeft();
                ////System.out.println("扣除的itemid: "+toRemove);
                ////System.out.println("扣除的item数量: "+p.getRight());
                MapleInventoryManipulator.removeById(c, ii.getInventoryType(toRemove), toRemove, p.getRight(), false, false);
            }

            Equip toDrop = (Equip) ii.getEquipById(toCreate);

            if(slea.available() > 4){ //使用了强化宝石
                int UseAmount = slea.readInt();//使用强化宝石的数量
                Meso += UseAmount * a * 0.9; //每增加一颗强化宝石 金钱数量增加所需金钱节点值的90%
                if(UseAmount >= 1) {
                    UseCrystal = true;//不知道用来干什么好
                    int UseCrystal1 = slea.readInt();//强化宝石1
                    toDrop = (Equip) ii.MakeItem(toDrop, UseCrystal1);
                    MapleInventoryManipulator.removeById(c, ii.getInventoryType(UseCrystal1), UseCrystal1, 1, false, false);
                    ////System.out.println("使用了1个强化宝石");
                }
                if(UseAmount >= 2) {
                    int UseCrystal2 = slea.readInt();//强化宝石2
                    toDrop = (Equip) ii.MakeItem(toDrop, UseCrystal2);
                    MapleInventoryManipulator.removeById(c, ii.getInventoryType(UseCrystal2), UseCrystal2, 1, false, false);
                    ////System.out.println("使用了2个强化宝石");
                }
                if(UseAmount == 3) {
                    int UseCrystal3 = slea.readInt();//强化宝石3
                    toDrop = (Equip) ii.MakeItem(toDrop, UseCrystal3);
                    MapleInventoryManipulator.removeById(c, ii.getInventoryType(UseCrystal3), UseCrystal3, 1, false, false);
                    ////System.out.println("使用了3个强化宝石");
                }
            }

            if(c.getPlayer().getMeso() >= Meso)
                c.getPlayer().gainMeso(-Meso, false);
            else
                c.getPlayer().dropMessage(1, "您的金钱不足 需要" + Meso + "金币才可以锻造此物品。");

            if(UseCatalyst && UseCrystal){
                toDrop = ii.randomizeStats(toDrop);
                MapleInventoryManipulator.addFromDrop(c, toDrop, null);
                ////System.out.println("使用了促进剂+强化宝石");
                
            //} else if(UseCrystal){
            //    MapleInventoryManipulator.addFromDrop(c, toDrop, null);
            //    ////System.out.println("使用了强化宝石");
            } else {
                MapleInventoryManipulator.addFromDrop(c, toDrop, null);
                ////System.out.println("什么都没有使用");
            }
        } else {
            c.getPlayer().dropMessage(1, "该物品尚未添加进数据库，请告知Gm。");
            ////System.out.println("数据库缺少相应物品");
        }
        } else if (slea.available() == 0) {
            ////System.out.println("怪物结晶类");
            //int itemid = getCrystalId(toCreate);
            int itemid = ii.getCrystalId(toCreate);
            if(itemid <0)
                c.getPlayer().dropMessage(1, "获取的itemid有错 值为： "+itemid);
            ////System.out.println("扣除的itemid: "+toCreate);
            ////System.out.println("得到的itemid: "+itemid);
            MapleInventoryManipulator.removeById(c, ii.getInventoryType(toCreate), toCreate, 100, false, false);
            MapleInventoryManipulator.addById(c, itemid, (short) 1, null);
            c.getSession().write(MaplePacketCreator.getShowItemGain(itemid, (short) 1, false));
        } else {
            ////System.out.println("未知类");
        }
        c.getSession().write(MaplePacketCreator.enableActions());
    }

    private boolean canCreate(MapleClient c, MakerItemCreateEntry recipe) {
       
        return hasItems(c, recipe) //需要扣除的物品
                && c.getPlayer().getMeso() >= recipe.getCost() //金钱
                && c.getPlayer().getLevel() >= recipe.getReqLevel() //人物等级
                && recipe.getRewardAmount() > 0
                //龙神比较特殊
                && (c.getPlayer().getSkillLevel(c.getPlayer().getJob().getId() / 1000 * 10000000 + 1007)) >= recipe.getReqSkillLevel();
    }

    private boolean hasItems(MapleClient c, MakerItemCreateEntry recipe) {
        MapleItemInformationProvider ii = MapleItemInformationProvider.getInstance();
        for (Pair<Integer, Integer> p : recipe.getReqItems()) {
            //Left是itemid  Right是数量
            int itemId = p.getLeft();
                if (c.getPlayer().getInventory(ii.getInventoryType(itemId)).countById(itemId) < p.getRight()) {
                    return false;
                }
        }
        return true;
    }

}