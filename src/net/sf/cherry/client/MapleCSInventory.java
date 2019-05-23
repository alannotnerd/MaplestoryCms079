 package net.sf.cherry.client;
 
 import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.LinkedHashMap;
import java.util.Map;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import net.sf.cherry.database.DatabaseConnection;
 
 public class MapleCSInventory
 {
   private static Logger log = LoggerFactory.getLogger(MapleCSInventory.class);
   private int accountid;
   private int characterid;
   private MapleCharacter chr;
   private Map<Integer, MapleCSInventoryItem> csitems = new LinkedHashMap();
   private Map<Integer, MapleCSInventoryItem> csgifts = new LinkedHashMap();
 
   public MapleCSInventory(MapleCharacter chr) {
     this.accountid = chr.getAccountID();
     this.characterid = chr.getId();
     this.chr = chr;
     loadFromDB(this.accountid);
   }
 
   public void loadFromDB(int id) {
     PreparedStatement ps = null;
     ResultSet rs = null;
     try {
       Connection con = DatabaseConnection.getConnection();
       ps = con.prepareStatement("SELECT * FROM csinventory WHERE accountid = ?");
       ps.setInt(1, id);
       rs = ps.executeQuery();
       while (rs.next()) {
         MapleCSInventoryItem citem = new MapleCSInventoryItem(rs.getInt("uniqueid"), rs.getInt("itemid"), rs.getInt("sn"), (short)rs.getInt("quantity"), rs.getBoolean("gift"));
         citem.setExpire(rs.getTimestamp("expiredate"));
         citem.setSender(rs.getString("sender"));
         this.csitems.put(Integer.valueOf(citem.getUniqueId()), citem);
       }
       rs.close();
       ps.close();
 
       ps = con.prepareStatement("SELECT * FROM csgifts WHERE accountid = ?");
       ps.setInt(1, this.accountid);
       rs = ps.executeQuery();
       while (rs.next())
       {
         MapleCSInventoryItem gift;
         if ((rs.getInt("itemid") >= 5000000) && (rs.getInt("itemid") <= 5000100)) {
           int petId = MaplePet.createPet(rs.getInt("itemid"), this.chr);
           gift = new MapleCSInventoryItem(petId, rs.getInt("itemid"), rs.getInt("sn"),(short) 1, true);
         }
         else if (rs.getInt("isRing") > 0) {
          gift = new MapleCSInventoryItem(rs.getInt("isRing"), rs.getInt("itemid"), rs.getInt("sn"), rs.getShort("quantity"), true);
           gift.setRing(true);
         } else {
           gift = new MapleCSInventoryItem(MapleCharacter.getNextUniqueId(), rs.getInt("itemid"), rs.getInt("sn"), rs.getShort("quantity"), true);
         }
 
         gift.setExpire(rs.getTimestamp("expiredate"));
         gift.setSender(rs.getString("sender"));
         gift.setMessage(rs.getString("message"));
         this.csgifts.put(Integer.valueOf(gift.getUniqueId()), gift);
         this.csitems.put(Integer.valueOf(gift.getUniqueId()), gift);
         saveToDB();
       }
       rs.close();
       ps.close();
       ps = con.prepareStatement("DELETE FROM csgifts WHERE accountid = ?");
       ps.setInt(1, this.accountid);
       ps.executeUpdate();
       ps.close();
     }
     catch (SQLException ex) {
       log.info("Error loading cs inventory from the database", ex);
     } finally {
       try {
         if (rs != null) {
           rs.close();
         }
         if (ps != null)
           ps.close();
       }
       catch (SQLException ex)
       {
       }
     }
   }
 
   public void saveToDB() {
     PreparedStatement ps = null;
     try {
       Connection con = DatabaseConnection.getConnection();
       ps = con.prepareStatement("DELETE FROM csinventory WHERE accountid = ?");
       ps.setInt(1, this.accountid);
       ps.executeUpdate();
       ps.close();
 
       ps = con.prepareStatement("INSERT INTO csinventory (accountid, uniqueid, itemid, sn, quantity, sender, message, expiredate, gift, isRing) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)");
       for (MapleCSInventoryItem citem : this.csitems.values()) {
         ps.setInt(1, this.accountid);
         ps.setInt(2, citem.getUniqueId());
         ps.setInt(3, citem.getItemId());
         ps.setInt(4, citem.getSn());
         ps.setInt(5, citem.getQuantity());
         ps.setString(6, citem.getSender());
         ps.setString(7, citem.getMessage());
         ps.setTimestamp(8, citem.getExpire());
         ps.setBoolean(9, citem.isGift());
         ps.setBoolean(10, citem.isRing());
         ps.executeUpdate();
       }
       ps.close();
     }
     catch (SQLException ex) {
       log.info("Error saving cs inventory to the database", ex);
     } finally {
       try {
         if (ps != null)
           ps.close();
       }
       catch (SQLException ex)
       {
       }
     }
   }
 
   public Map<Integer, MapleCSInventoryItem> getCSGifts() {
     return this.csgifts;
   }
 
   public Map<Integer, MapleCSInventoryItem> getCSItems() { //读取现金道具
     return this.csitems;
   }
 
   public void addItem(MapleCSInventoryItem citem) { //添加项目
     this.csitems.put(Integer.valueOf(citem.getUniqueId()), citem);
   }
   public void removeItem(int uniqueid) { //删除物品  数量
     this.csitems.remove(Integer.valueOf(uniqueid));
   }
 
   public MapleCSInventoryItem getItem(int uniqueid) {
     return (MapleCSInventoryItem)this.csitems.get(Integer.valueOf(uniqueid));
   }
 }

/* Location:           E:\maoxiandaodanji\dist\cherry.jar
 * Qualified Name:     net.sf.cherry.client.MapleCSInventory
 * JD-Core Version:    0.6.0
 */