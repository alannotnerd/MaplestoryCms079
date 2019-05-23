 package net.sf.cherry.server;
 
 import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.List;

import net.sf.cherry.client.MapleCharacter;
import net.sf.cherry.client.MapleInventoryType;
import net.sf.cherry.database.DatabaseConnection;
 
 public class MaplePlayerNPC
 {
   MapleCharacter player;
   public static boolean autoPlayerNPCCreation = true;
   private int skip = 0;
 
   public MaplePlayerNPC(MapleCharacter player) {
     this.player = player;
   }
 
   public int getCharId() {
     return this.player.getId();
   }
 
   public String toString()
   {
     return "Hello, I am #b" + getPlayerNPCName() + "#k, and I am #rLEVEL 200!#k";
   }
 
   private String getPlayerNPCName() {
     PreparedStatement ps = null;
     ResultSet rs = null;
     try {
       Connection con = DatabaseConnection.getConnection();
       ps = con.prepareStatement("SELECT name FROM playernpcs WHERE charid = ?");
       ps.setInt(1, getCharId());
       rs = ps.executeQuery();
       if (rs.next()) {
         String name = rs.getString("name");
         rs.close();
         ps.close();
         String str1 = name;
         return str1;
       }
       rs.close();
       ps.close();
     } catch (Exception ex) {
       ex.printStackTrace();
     } finally {
       try {
         if (rs != null) {
           rs.close();
         }
         if (ps != null)
           ps.close();
       }
       catch (SQLException ex) {
       }
     }
     return "#kbugged. Please report this on the DestinyMS forums. Oh, #b";
   }
 
   public int getNextNpcID() {
     int npcid = 9900000 + getJobNpcId();
     int count = 0;
     if (getNPCIdByCharId() == -1) {
       PreparedStatement ps = null;
       ResultSet rs = null;
       try {
         Connection con = DatabaseConnection.getConnection();
         ps = con.prepareStatement("SELECT COUNT(*) AS c FROM playernpcs WHERE town = ?");
         ps.setString(1, getTownName());
         rs = ps.executeQuery();
         if (rs.next()) {
           count = rs.getInt("c");
         }
         rs.close();
         ps.close();
       } catch (Exception ex) {
         ex.printStackTrace();
       } finally {
         try {
           if (rs != null) {
             rs.close();
           }
           if (ps != null)
             ps.close();
         }
         catch (SQLException ex) {
         }
       }
       return npcid + count;
     }
     return getNPCIdByCharId();
   }
 
   public String getTownName()
   {
     int jobId = this.player.getJob().getId();
     if ((jobId >= 100) && (jobId <= 132))
       return "Perion"; //战士
     if ((jobId >= 200) && (jobId <= 232))
       return "Ellinia";//魔法师
     if ((jobId >= 300) && (jobId <= 322))
       return "Henesys";//弓箭手
     if ((jobId >= 400) && (jobId <= 422))
       return "Kerning City";//飞侠
     if ((jobId >= 500) && (jobId <= 522))
       return "Nautilus Harbor";//海盗
     if (jobId == 900) {
       return "Free Market";//管理员
     }
     return "Lith Harbor";//新手
   }
 
   public int getJobNpcId()
   {
     int mapid = this.player.getPlayerNPCMapId();
     int id = 0;
     if (mapid / 1000000 == 100)
       id = 1200;
     else if (mapid / 1000000 == 101)
       id = 1100;
     else if (mapid / 1000000 == 102)
       id = 1000;
     else if (mapid / 1000000 == 103)
       id = 1300;
     else if (mapid / 100000 == 260)
       id = 1400;
     else {
       id = 1800;
     }
     return id;
   }
 
   public void createPlayerNPC(MapleCharacter player, int map) {
     PreparedStatement ps = null;
     try {
       Connection con = DatabaseConnection.getConnection();
       ps = con.prepareStatement("INSERT INTO playernpcs (id, name, hair, face, skin, dir, map, town, charid) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)");
       ps.setInt(1, getNextNpcID());
       ps.setString(2, player.getName());
       ps.setInt(3, player.getHair());
       ps.setInt(4, player.getFace());
       ps.setInt(5, player.getSkinColor().getId());
       ps.setInt(6, 1);
       ps.setInt(7, map);
       ps.setString(8, getTownName());
       ps.setInt(9, getCharId());
       ps.executeUpdate();
       ps.close();
     } catch (Exception ex) {
       ex.printStackTrace();
     } finally {
       try {
         if (ps != null)
           ps.close();
       }
       catch (SQLException ex) {
       }
     }
   }
 
   public void insertEquips(int equipid, byte equippos, int type) {
     if (equipid == -1) {
       return;
     }
     PreparedStatement ps = null;
     try {
       Connection con = DatabaseConnection.getConnection();
       ps = con.prepareStatement("INSERT INTO playernpcs_equip (npcid, equipid, equippos, type, charid) VALUES (?, ?, ?, ?, ?)");
       ps.setInt(1, getNextNpcID());
       ps.setInt(2, equipid);
       ps.setInt(3, equippos);
       ps.setInt(4, type);
       ps.setInt(5, getCharId());
       ps.executeUpdate();
       ps.close();
     } catch (Exception ex) {
       ex.printStackTrace();
     } finally {
       try {
         if (ps != null)
           ps.close();
       }
       catch (SQLException ex) {
       }
     }
   }
 
   public void updateEquips(int equipid, byte equippos) {
     if (equipid == -1) {
       return;
     }
     PreparedStatement ps = null;
     try {
       Connection con = DatabaseConnection.getConnection();
       ps = con.prepareStatement("update playernpcs_equip set equipid = ? where equippos = ?");
       ps.setInt(1, equipid);
       ps.setByte(2, equippos);
       ps.executeUpdate();
       ps.close();
     } catch (Exception ex) {
       ex.printStackTrace();
     } finally {
       try {
         if (ps != null)
           ps.close();
       }
       catch (SQLException ex) {
       }
     }
   }
 
   public void removeAllEquips() {
     PreparedStatement ps = null;
     try {
       Connection con = DatabaseConnection.getConnection();
       ps = con.prepareStatement("delete from playernpcs_equip where npcid = ?");
       ps.setInt(1, getNPCIdByName(getPlayerNPCName()));
       ps.executeUpdate();
       ps.close();
     } catch (Exception ex) {
       ex.printStackTrace();
     } finally {
       try {
         if (ps != null)
           ps.close();
       }
       catch (SQLException ex) {
       }
     }
   }
 
   public int getItem(int type) {
     if (this.skip < this.player.getInventory(MapleInventoryType.EQUIPPED).countItemType(getCharId(), MapleInventoryType.EQUIPPED)) {
       Connection con = DatabaseConnection.getConnection();
       PreparedStatement ps = null;
       ResultSet rs = null;
       try {
         ps = con.prepareStatement("SELECT * FROM inventoryitems WHERE characterid = ? AND inventorytype = -1 ORDER BY itemid LIMIT ?, 1");
         ps.setInt(1, getCharId());
         ps.setInt(2, this.skip);
         rs = ps.executeQuery();
         if (rs.next()) {
           int item = rs.getInt("itemid");
           if (item / 10000 == type) {
             this.skip = 0;
            return item;
           }
           this.skip += 1;
           int i = getItem(type);
           return i;
         }
         rs.close();
         ps.close();
       } catch (Exception ex) {
         ex.printStackTrace();
       } finally {
         try {
           if (rs != null) {
             rs.close();
           }
           if (ps != null)
             ps.close();
         }
         catch (SQLException ex) {
         }
       }
     }
     this.skip = 0;
     return -1;
   }
 
   public int getItem(int type, int skip) {
     int item = -1;
     PreparedStatement ps = null;
     ResultSet rs = null;
     try {
       Connection con = DatabaseConnection.getConnection();
       ps = con.prepareStatement("SELECT * FROM inventoryitems WHERE characterid = ? AND inventorytype = -1 ORDER BY itemid LIMIT ?, 1");
       ps.setInt(1, getCharId());
       ps.setInt(2, skip);
       rs = ps.executeQuery();
       while (rs.next()) {
         int curitem = rs.getInt("itemid");
         if (curitem / 10000 == type) {
           item = curitem;
         }
       }
       rs.close();
       ps.close();
     } catch (Exception ex) {
       ex.printStackTrace();
     } finally {
       try {
         if (rs != null) {
           rs.close();
         }
         if (ps != null)
           ps.close();
       }
       catch (SQLException ex) {
       }
     }
     return item;
   }
 
   public int getNPCIdByName(String name) {
     PreparedStatement ps = null;
     ResultSet rs = null;
     try {
       Connection con = DatabaseConnection.getConnection();
       ps = con.prepareStatement("SELECT * FROM playernpcs WHERE name = ?");
       ps.setString(1, name);
       rs = ps.executeQuery();
       if (rs.next()) {
         int i = rs.getInt("id");
         return i;
       }
       rs.close();
       ps.close();
     } catch (Exception ex) {
       ex.printStackTrace();
     } finally {
       try {
         if (rs != null) {
           rs.close();
         }
         if (ps != null)
           ps.close();
       }
       catch (SQLException ex) {
       }
     }
     return -1;
   }
 
   public int countPlayerNPCEquips() {
     PreparedStatement ps = null;
     ResultSet rs = null;
     try {
       Connection con = DatabaseConnection.getConnection();
       ps = con.prepareStatement("SELECT COUNT(*) AS c FROM playernpcs_equip WHERE charid = ?");
       ps.setInt(1, getCharId());
       rs = ps.executeQuery();
       if (rs.next()) {
         int c = Integer.parseInt(rs.getString("c"));
         rs.close();
         ps.close();
         int i = c;
         return i;
       }
       rs.close();
       ps.close();
     } catch (Exception ex) {
       ex.printStackTrace();
     } finally {
       try {
         if (rs != null) {
           rs.close();
         }
         if (ps != null)
           ps.close();
       }
       catch (SQLException ex) {
       }
     }
     return 0;
   }
 
   public int getNPCIdByCharId() {
     PreparedStatement ps = null;
     ResultSet rs = null;
     try {
       Connection con = DatabaseConnection.getConnection();
       ps = con.prepareStatement("SELECT * FROM playernpcs WHERE charid = ?");
       ps.setInt(1, getCharId());
       rs = ps.executeQuery();
       if (rs.next()) {
         int id = rs.getInt("id");
         rs.close();
         ps.close();
         int i = id;
         return i;
       }
       rs.close();
       ps.close();
     } catch (Exception ex) {
       ex.printStackTrace();
     } finally {
       try {
         if (rs != null) {
           rs.close();
         }
         if (ps != null)
           ps.close();
       }
       catch (SQLException ex) {
       }
     }
     return -1;
   }
 
     public void createPNE() {
        this.insertEquips(getItem(100), (byte) 1, 0);
        this.insertEquips(getItem(102), (byte) 3, 0);
        this.insertEquips(getItem(103), (byte) 4, 0);
        this.insertEquips(getItem(104), (byte) 5, 0);
        this.insertEquips(getItem(106), (byte) 6, 0);
        this.insertEquips(getItem(107), (byte) 7, 0);
        this.insertEquips(getItem(108), (byte) 8, 0);
        int cape = getItem(110);
        if (cape == 0) {
      cape = getItem(109);
        }
        this.insertEquips(cape, (byte) 9, 0);
        int weapon = 0;
        for (int i = 1; i < 10; i++) {
            if (weapon == 0) {
                weapon = getItem(110 + i * 10);
            } else {
                break;
            }
        }
        this.insertEquips(weapon, (byte) -1, 1);
    }
 
   public void updatePNE(List<MapleCharacter> players) {
     for (MapleCharacter thisplayer : players) {
       int charid = thisplayer.getId();
       if (thisplayer.getInventory(MapleInventoryType.EQUIPPED).countItemType(charid, MapleInventoryType.EQUIPPED) != countPlayerNPCEquips()) {
         removeAllEquips();
         createPNE();
         return;
       }
       for (int i = 0; i < 2; i++) {
                    this.updateEquips(getItem(100, i), (byte) 1);
                    this.updateEquips(getItem(102, i), (byte) 3);
                    this.updateEquips(getItem(103, i), (byte) 4);
                    this.updateEquips(getItem(104, i), (byte) 5);
                    this.updateEquips(getItem(106, i), (byte) 6);
                    this.updateEquips(getItem(107, i), (byte) 7);
                    this.updateEquips(getItem(108, i), (byte) 8);
                    int cape = getItem(110, i);
                    if (cape == 0) {
                        cape = getItem(109, i);
                    }
                    this.updateEquips(cape, (byte) 9);
                    int weapon = 0;
                    for (int x = 1; x < 10; x++) {
                        if (weapon == 0) {
                            weapon = getItem(110 + x * 10, i);
                        } else {
                            break;
                        }
                    }
                    this.updateEquips(weapon, (byte) -1);
       }
     }
   }
 }




