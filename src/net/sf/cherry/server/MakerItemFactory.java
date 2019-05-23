 package net.sf.cherry.server;
 
 import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import net.sf.cherry.database.DatabaseConnection;
import net.sf.cherry.tools.Pair;
 
 public class MakerItemFactory
 {
   private static Map<Integer, MakerItemCreateEntry> createCache = new HashMap();
   private static org.slf4j.Logger log = org.slf4j.LoggerFactory.getLogger(MakerItemFactory.class);
public static MakerItemCreateEntry getItemCreateEntry(int toCreate, boolean UseCatalyst) {
    
        if (createCache.get(toCreate) != null) {
            return createCache.get(toCreate);
        } else {
            try {
                //先获取制造该物品需要的 人物等级 锻造技能等级 金钱 锻造出来的物品的数量
                Connection con = DatabaseConnection.getConnection();
                PreparedStatement ps = con.prepareStatement("SELECT * FROM makercreatedata WHERE itemid = ?");
                ps.setInt(1, toCreate);
                ResultSet rs = ps.executeQuery();
                int reqLevel = 0;
                int reqMakerLevel = 0;
                int cost = 0;
                int toGive = 0; //获得的item数量
                int catalyst = 0;//促进剂
                if (rs.next()) {
                    reqLevel = rs.getInt("req_level");
                    reqMakerLevel = rs.getInt("req_maker_level");
                    cost = rs.getInt("req_meso");
                    toGive = rs.getInt("quantity");
                    catalyst = rs.getInt("catalyst");
                    ////System.out.println("获得的item数量："+toGive);
                } else {
                    ////System.out.println("makercreatedata表中没有此物品 请添加："+toCreate);
                }
                ps.close();
                rs.close();

                MakerItemCreateEntry ret = new MakerItemCreateEntry(cost, reqLevel, reqMakerLevel, toGive);
                ps = con.prepareStatement("SELECT * FROM makerrecipedata WHERE itemid = ?");
                ps.setInt(1, toCreate);
                rs = ps.executeQuery();

                while (rs.next()) {
                    ret.addReqItem(rs.getInt("req_item"), rs.getInt("count"));//添加进集合里 这里是需要的魔法粉末 怪物结晶
                }
                rs.close();
                ps.close();
                if(catalyst > 0 && UseCatalyst) {
                    ret.addReqItem(catalyst, 1);//添加进集合里 额外加促进剂
                    ////System.out.println("获得的促进剂itemid："+catalyst);
                }
                createCache.put(toCreate, ret);
            } catch (SQLException sqle) {
                log.error("锻造出错", sqle);
            }
        } //else完结
        return createCache.get(toCreate);
    }
   public static class MakerItemCreateEntry { private int reqLevel;
     private int reqMakerLevel;
     private int cost;
     private List<Pair<Integer, Integer>> reqItems = new ArrayList();
     private List<Integer> reqEquips = new ArrayList();
     private int toGive;
 
     public MakerItemCreateEntry(int cost, int reqLevel, int reqMakerLevel, int toGive) { this.cost = cost;
       this.reqLevel = reqLevel;
       this.reqMakerLevel = reqMakerLevel;
       this.toGive = toGive; }
 
     public int getRewardAmount()
     {
       return this.toGive;
     }
 
     public List<Pair<Integer, Integer>> getReqItems() {
       return this.reqItems;
     }
 
     public List<Integer> getReqEquips() {
       return this.reqEquips;
     }
 
     public int getReqLevel() {
       return this.reqLevel;
     }
 
     public int getReqSkillLevel() {
       return this.reqMakerLevel;
     }
 
     public int getCost() {
       return this.cost;
     }
 
     protected void addReqItem(int itemId, int amount) {
       this.reqItems.add(new Pair(Integer.valueOf(itemId), Integer.valueOf(amount)));
     }
   }
 }

/* Location:           E:\maoxiandaodanji\dist\cherry.jar
 * Qualified Name:     net.sf.cherry.server.MakerItemFactory
 * JD-Core Version:    0.6.0
 */