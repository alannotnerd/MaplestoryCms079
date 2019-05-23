 package net.sf.cherry.net.login;
 
 import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import net.sf.cherry.client.MapleJob;
import net.sf.cherry.database.DatabaseConnection;
 
 public class RankingWorker
   implements Runnable
 {
   private long lastUpdate = System.currentTimeMillis();
   private static Logger log = LoggerFactory.getLogger(RankingWorker.class);
 
   public void run() {
     Connection con = DatabaseConnection.getConnection();
     try {
       con.setAutoCommit(false);
       updateRanking(null);
       updateRanking(MapleJob.BEGINNER);
       updateRanking(MapleJob.WARRIOR);
       updateRanking(MapleJob.MAGICIAN);
       updateRanking(MapleJob.BOWMAN);
       updateRanking(MapleJob.THIEF);
       updateRanking(MapleJob.PIRATE);
       con.commit();
       con.setAutoCommit(true);
       this.lastUpdate = System.currentTimeMillis();
     } catch (SQLException ex) {
       try {
         con.rollback();
         con.setAutoCommit(true);
       }
       catch (SQLException ex2)
       {
       }
     }
   }
 
   private void updateRanking(MapleJob job) {
     Connection con = DatabaseConnection.getConnection();
     PreparedStatement charSelect = null;
     ResultSet rs = null;
     PreparedStatement ps = null;
     String sqlCharSelect = "SELECT c.id, " + (job != null ? "c.jobRank, c.jobRankMove" : "c.rank, c.rankMove") + ", a.lastlogin AS lastlogin, a.loggedin FROM characters AS c LEFT JOIN accounts AS a ON c.accountid = a.id WHERE c.gm = 0 ";
     if (job != null) {
       sqlCharSelect = sqlCharSelect + "AND c.job DIV 100 = ? ";
     }
     sqlCharSelect = sqlCharSelect + "ORDER BY c.level DESC , c.exp DESC , c.fame DESC , c.meso DESC";
     try {
       charSelect = con.prepareStatement(sqlCharSelect);
       if (job != null) {
         charSelect.setInt(1, job.getId() / 100);
       }
       rs = charSelect.executeQuery();
       ps = con.prepareStatement("UPDATE characters SET " + (job != null ? "jobRank = ?, jobRankMove = ? " : "rank = ?, rankMove = ? ") + "WHERE id = ?");
       int rank = 0;
       while (rs.next()) {
         int rankMove = 0;
         rank++;
         if ((rs.getLong("lastlogin") < this.lastUpdate) || (rs.getInt("loggedin") > 0)) {
           rankMove = rs.getInt(job != null ? "jobRankMove" : "rankMove");
         }
         rankMove += rs.getInt(job != null ? "jobRank" : "rank") - rank;
         ps.setInt(1, rank);
         ps.setInt(2, rankMove);
         ps.setInt(3, rs.getInt("id"));
         ps.executeUpdate();
       }
       ps.close();
       rs.close();
       charSelect.close();
     } catch (SQLException ex) {
     }
     finally {
       try {
         if (rs != null) {
           rs.close();
         }
         if (ps != null) {
           ps.close();
         }
         if (charSelect != null)
           charSelect.close();
       }
       catch (SQLException ex)
       {
       }
     }
   }
 }

/* Location:           E:\maoxiandaodanji\dist\cherry.jar
 * Qualified Name:     net.sf.cherry.net.login.RankingWorker
 * JD-Core Version:    0.6.0
 */