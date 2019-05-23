 package net.sf.cherry.server.consign;
 
 import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;

import net.sf.cherry.client.Equip;
import net.sf.cherry.database.DatabaseConnection;
import net.sf.cherry.tools.Pair;
 
 public class ConsignItemManager
 {
   private static ConsignItemManager instance = null;
 
   public static ConsignItemManager getInstance()
   {
     if (instance == null) {
       instance = new ConsignItemManager();
     }
     return instance;
   }
 
   public void haveFromConsign(int cid, int mesos, int paypaynx)
   {
     PreparedStatement ps = null;
     try {
       ps = DatabaseConnection.getConnection().prepareStatement("UPDATE characters SET ConsignMesos =ConsignMesos + ?, ConsignPaypalNX = ConsignPaypalNX+? WHERE id = ?");
       ps.setInt(1, mesos);
       ps.setInt(2, paypaynx);
       ps.setInt(3, cid);
       ps.executeUpdate();
       ps.close();
     } catch (Exception ex) {
       ex.printStackTrace();
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
 
   public void saveConsignItems(int cid, ConsignItem item) {
     PreparedStatement ps = null;
     try {
       if (item.getItem().getType() == 1) {
         ps = DatabaseConnection.getConnection().prepareStatement("INSERT INTO consignitem (ownerid, itemid, quantity, upgradeslots, level, str, dex, `int`, luk, hp, mp, watk, matk, wdef, mdef, acc, avoid, hands, speed, jump, owner, type,mesos,paypalNX) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)");
         Equip eq = (Equip)item.getItem();
         ps.setInt(2, eq.getItemId());
         ps.setInt(3, 1);
         ps.setInt(4, eq.getUpgradeSlots());
         ps.setInt(5, eq.getLevel());
         ps.setInt(6, eq.getStr());
         ps.setInt(7, eq.getDex());
         ps.setInt(8, eq.getInt());
         ps.setInt(9, eq.getLuk());
         ps.setInt(10, eq.getHp());
         ps.setInt(11, eq.getMp());
         ps.setInt(12, eq.getWatk());
         ps.setInt(13, eq.getMatk());
         ps.setInt(14, eq.getWdef());
         ps.setInt(15, eq.getMdef());
         ps.setInt(16, eq.getAcc());
         ps.setInt(17, eq.getAvoid());
         ps.setInt(18, eq.getHands());
         ps.setInt(19, eq.getSpeed());
         ps.setInt(20, eq.getJump());
         ps.setString(21, eq.getOwner());
         ps.setInt(22, 1);
         ps.setInt(23, item.getMesos());
         ps.setInt(24, item.getPaypalnx());
       } else {
         ps = DatabaseConnection.getConnection().prepareStatement("INSERT INTO consignitem (ownerid, itemid, quantity, owner, type,mesos,paypalNX) VALUES (?, ?, ?, ?, ?, ?, ?)");
         ps.setInt(2, item.getItem().getItemId());
         ps.setInt(3, item.getItem().getQuantity());
         ps.setString(4, item.getItem().getOwner());
         ps.setInt(5, item.getItem().getType());
         ps.setInt(6, item.getMesos());
         ps.setInt(7, item.getPaypalnx());
       }
       ps.setInt(1, cid);
       ps.executeUpdate();
       ps.close();
     } catch (SQLException ex) {
       ex.getStackTrace();
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
 
   public void deleteConsignItemById(int consignItemId) {
     PreparedStatement ps = null;
     try {
       ps = DatabaseConnection.getConnection().prepareStatement("DELETE FROM consignitem WHERE id = ?");
       ps.setInt(1, consignItemId);
       ps.executeUpdate();
       ps.close();
     } catch (SQLException ex) {
       ex.getStackTrace();
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
 
   public List<Pair<Integer, ConsignItem>> getConsignItemsByType(short type) {
     List<Equip> items = new ArrayList();
     PreparedStatement ps = null;
     ResultSet rs = null;
     try {
       ps = DatabaseConnection.getConnection().prepareStatement("SELECT * FROM consignitem WHERE type= ? AND onSale = false");
       ps.setShort(1, type);
       rs = ps.executeQuery();
       if (type == 1) {
         Equip eq = new Equip(rs.getInt("itemid"), (byte)0);
         eq.setUpgradeSlots((byte)rs.getInt("upgradeslots"));
         eq.setLevel((byte)rs.getInt("level"));
         eq.setStr((short)rs.getInt("str"));
         eq.setDex((short)rs.getInt("dex"));
         eq.setInt((short)rs.getInt("int"));
         eq.setLuk((short)rs.getInt("luk"));
         eq.setHp((short)rs.getInt("hp"));
         eq.setMp((short)rs.getInt("mp"));
         eq.setWatk((short)rs.getInt("watk"));
         eq.setMatk((short)rs.getInt("matk"));
         eq.setWdef((short)rs.getInt("wdef"));
         eq.setMdef((short)rs.getInt("mdef"));
         eq.setAcc((short)rs.getInt("acc"));
         eq.setAvoid((short)rs.getInt("avoid"));
         eq.setHands((short)rs.getInt("hands"));
         eq.setSpeed((short)rs.getInt("speed"));
         eq.setJump((short)rs.getInt("jump"));
         eq.setOwner(rs.getString("owner"));
         ConsignItem consignItem = new ConsignItem(eq, rs.getInt("mesos"), rs.getInt("paypalNX"));
         //items.add(new Pair(Integer.valueOf(rs.getInt("id")), consignItem));
       } else {
       //  Item newItem = new Item(rs.getInt("itemid"), 0, (short)rs.getInt("quantity"));
      //   newItem.setOwner(rs.getString("owner"));
       ///  consignItem = new ConsignItem(newItem, rs.getInt("mesos"), rs.getInt("paypalNX"));
       //  items.add(new Pair(Integer.valueOf(rs.getInt("id")), consignItem));
       }
       rs.close();
       ps.close();
     } catch (SQLException se) {
       se.printStackTrace();
       ConsignItem consignItem = null;
      // return consignItem;
     }
     finally
     {
       try
       {
         if (rs != null) {
           rs.close();
         }
         if (ps != null)
           ps.close();
       }
       catch (SQLException ex) {
       }
     }
   //  return items;
return null;
   }
 
   public List<Pair<Integer, ConsignItem>> getConsignItemsByCharId(int cid)
   {
     List items = new ArrayList();
     PreparedStatement ps = null;
     ResultSet rs = null;
     try {
       ps = DatabaseConnection.getConnection().prepareStatement("SELECT * FROM consignitem WHERE ownerid = ? AND onSale = false");
       ps.setInt(1, cid);
       rs = ps.executeQuery();
       if (rs.getInt("type") == 1) {
         Equip eq = new Equip(rs.getInt("itemid"),(byte) 0);
         eq.setUpgradeSlots((byte)rs.getInt("upgradeslots"));
         eq.setLevel((byte)rs.getInt("level"));
         eq.setStr((short)rs.getInt("str"));
         eq.setDex((short)rs.getInt("dex"));
         eq.setInt((short)rs.getInt("int"));
         eq.setLuk((short)rs.getInt("luk"));
         eq.setHp((short)rs.getInt("hp"));
         eq.setMp((short)rs.getInt("mp"));
         eq.setWatk((short)rs.getInt("watk"));
         eq.setMatk((short)rs.getInt("matk"));
         eq.setWdef((short)rs.getInt("wdef"));
         eq.setMdef((short)rs.getInt("mdef"));
         eq.setAcc((short)rs.getInt("acc"));
         eq.setAvoid((short)rs.getInt("avoid"));
         eq.setHands((short)rs.getInt("hands"));
         eq.setSpeed((short)rs.getInt("speed"));
         eq.setJump((short)rs.getInt("jump"));
         eq.setOwner(rs.getString("owner"));
         ConsignItem consignItem = new ConsignItem(eq, rs.getInt("mesos"), rs.getInt("paypalNX"));
         items.add(new Pair(Integer.valueOf(rs.getInt("id")), consignItem));
       } else {
        // Item newItem = new Item(rs.getInt("itemid"), 0, (short)rs.getInt("quantity"));
       // newItem.setOwner(rs.getString("owner"));
        // consignItem = new ConsignItem(newItem, rs.getInt("mesos"), rs.getInt("paypalNX"));
        // items.add(new Pair(Integer.valueOf(rs.getInt("id")), consignItem));
       }
       rs.close();
       ps.close();
     } catch (SQLException se) {
       se.printStackTrace();
       ConsignItem consignItem = null;
     //  return consignItem;
     }
     finally
     {
       try
       {
         if (rs != null) {
           rs.close();
         }
         if (ps != null)
           ps.close();
       }
       catch (SQLException ex) {
       }
     }
     return items;
   }
 
   public int selectCharByConsignItemId(int consignItemId)
   {
     PreparedStatement ps = null;
     ResultSet rs = null;
     int charid = -1;
     try {
       ps = DatabaseConnection.getConnection().prepareStatement("SELECT ownerid FROM consignitem WHERE id = ?");
       ps.setInt(1, consignItemId);
       rs = ps.executeQuery();
       charid = rs.getInt("ownerid");
       rs.close();
       ps.close();
       int i = charid;
       return i;
     }
     catch (SQLException ex)
     {
       ex.getStackTrace();
     //  ex = charid;
      // return ex;
     }
     finally
     {
       try
       {
         if (rs != null) {
           rs.close();
         }
         if (ps != null)
           ps.close(); 
       } catch (SQLException ex) {
       }
     }
     //throw localObject;
return 0;
   }
 
   public boolean hasConsignItem(int consignItemId)
   {
     boolean flage = false;
     PreparedStatement ps = null;
     ResultSet rs = null;
     try {
       ps = DatabaseConnection.getConnection().prepareStatement("SELECT * FROM consignitem WHERE id= ? ");
       ps.setInt(1, consignItemId);
       rs = ps.executeQuery();
       if (rs.next()) {
         flage = true;
       }
       rs.close();
       ps.close();
       boolean bool1 = flage;
       return bool1;
     }
     catch (SQLException se)
     {
       se.printStackTrace();
     //  ex = flage;
     //  return ex;
     }
     finally
     {
       try
       {
         if (rs != null) {
           rs.close();
         }
         if (ps != null)
           ps.close(); 
       } catch (SQLException ex) {
       }
     }
    // throw localObject;
return false;
   }
 }

/* Location:           E:\maoxiandaodanji\dist\cherry.jar
 * Qualified Name:     net.sf.cherry.server.consign.ConsignItemManager
 * JD-Core Version:    0.6.0
 */