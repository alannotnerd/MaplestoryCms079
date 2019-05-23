 package net.sf.cherry.server;
 
 import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.LinkedHashMap;
import java.util.Map;

import net.sf.cherry.database.DatabaseConnection;
 
 public class SpeedRankings
 {
   private static String[] zTeamNames = new String[10];
   private static long[] zRankTime = new long[10];
   private static String[] pTeamNames = new String[10];
   private static long[] pRankTime = new long[10];
   private static Map<Integer, Long> zStartTime = new LinkedHashMap();
   private static Map<Integer, Long> pStartTime = new LinkedHashMap();
   private static Map<Integer, Long> zEndTime = new LinkedHashMap();
   private static Map<Integer, Long> pEndTime = new LinkedHashMap();
 
   public static void loadFromDB()
   {
     for (int type = 0; type <= 1; type++) {
       Connection con = DatabaseConnection.getConnection();
       PreparedStatement ps = null;
       ResultSet rs = null;
       try {
         ps = con.prepareStatement("SELECT * FROM speedrankings where type = ? ORDER BY time ASC LIMIT 10");
         ps.setInt(1, type);
         rs = ps.executeQuery();
         int i = 0;
         while ((rs.next()) && (i < zRankTime.length)) {
           if (type == 0) {
             zTeamNames[i] = rs.getString("names");
             zRankTime[i] = rs.getLong("time");
           } else if (type == 1) {
             pTeamNames[i] = rs.getString("names");
             pRankTime[i] = rs.getLong("time");
           }
           i++;
         }
         rs.close();
         ps.close(); } catch (SQLException se) { se.printStackTrace();
         return;
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
   }
 
   public static void insertRankingToSQL(int type, String names, long time) {
     PreparedStatement ps = null;
     try {
       Connection con = DatabaseConnection.getConnection();
       ps = con.prepareStatement("INSERT into speedrankings (type, names, time) VALUES (?, ?, ?)");
       ps.setInt(1, type);
       ps.setString(2, names);
       ps.setLong(3, time);
       ps.execute();
       if ((type == 0) && (time < zRankTime[9]))
         loadFromDB();
       else if ((type == 1) && (time < pRankTime[9])) {
         loadFromDB();
       }
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
 
   public static long getTime(int rank, int type) {
     if (type == 0)
       return zRankTime[rank];
     if (type == 1) {
       return pRankTime[rank];
     }
     return 0L;
   }
 
   public static String getTeamMembers(int rank, int type) {
     if (type == 0)
       return zTeamNames[rank];
     if (type == 1) {
       return pTeamNames[rank];
     }
     return null;
   }

     public static void setStartTime(int type, int oid, long time) {
         if ((type == 0) && (!zStartTime.containsKey(Integer.valueOf(oid)))) {
             zStartTime.put(Integer.valueOf(oid), Long.valueOf(time));
         } else if ((type == 1) && (!pStartTime.containsKey(Integer.valueOf(oid)))) {
             pStartTime.put(Integer.valueOf(oid), Long.valueOf(time));
         }
     }
 
   public static void setEndTime(int type, int oid, long time)
   {
     if ((type == 0) && (!zEndTime.containsKey(Integer.valueOf(oid))))
       zEndTime.put(Integer.valueOf(oid), Long.valueOf(time));
     else if ((type == 1) && (!pEndTime.containsKey(Integer.valueOf(oid))))
       pEndTime.put(Integer.valueOf(oid), Long.valueOf(time));
   }
 
    public static long calcTime(int type, int oid) {
        long time = 9223372036854775807L;
        try {
            if (type == 0) {
                time = ((Long) zEndTime.get(Integer.valueOf(oid))).longValue() - ((Long) zStartTime.get(Integer.valueOf(oid))).longValue();
            } else if (type == 1) {
                time = ((Long) pEndTime.get(Integer.valueOf(oid))).longValue() - ((Long) pStartTime.get(Integer.valueOf(oid))).longValue();
            }
        } catch (Exception e) {
            //e.printStackTrace();
        }
        return time;
    }
}

