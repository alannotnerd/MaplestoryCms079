 package net.sf.cherry.client;
 
 import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.HashMap;
import java.util.Map;

import net.sf.cherry.database.DatabaseConnection;
 
 public class MapleFamily
 {
   private static Map<Integer, MapleFamilyEntry> members = new HashMap();
 
   public static MapleFamilyEntry getMapleFamily(MapleCharacter chr) {
     if (members.containsKey(Integer.valueOf(chr.getId()))) {
       return (MapleFamilyEntry)members.get(Integer.valueOf(chr.getId()));
     }
     MapleFamilyEntry ret = new MapleFamilyEntry();
     ret.setPlayer(chr);
     ret.setFamilyId(ret.getFamilyId());
     PreparedStatement ps = null;
     ResultSet rs = null;
     try {
       ps = DatabaseConnection.getConnection().prepareStatement("SELECT * FROM family_character WHERE cid = ?");
       ps.setInt(1, chr.getId());
       rs = ps.executeQuery();
       if (rs.next()) {
         ret.setRank(rs.getInt("rank"));
         ret.setReputation(rs.getInt("reputation"));
         ret.setTotalJuniors(rs.getInt("totaljuniors"));
         ret.setFamilyName(rs.getString("name"));
         ret.setJuniors(rs.getInt("juniorsadded"));
         ret.setTodaysRep(rs.getInt("todaysrep"));
       }
       rs.close();
       ps.close();
     } catch (SQLException ex) {
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
     return ret;
   }
 }

/* Location:           E:\maoxiandaodanji\dist\cherry.jar
 * Qualified Name:     net.sf.cherry.client.MapleFamily
 * JD-Core Version:    0.6.0
 */