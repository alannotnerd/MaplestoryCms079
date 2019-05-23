 package net.sf.cherry.client.anticheat;
 
 import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Timestamp;
import java.util.LinkedHashSet;
import java.util.Set;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import com.mysql.jdbc.Statement;

import net.sf.cherry.database.DatabaseConnection;
import net.sf.cherry.server.TimerManager;
 
 public class CheatingOffensePersister
 {
   private static Logger log = LoggerFactory.getLogger(CheatingOffensePersister.class);
   private static final CheatingOffensePersister INSTANCE = new CheatingOffensePersister();
   private Set<CheatingOffenseEntry> toPersist = new LinkedHashSet();
 
   private CheatingOffensePersister() {
     TimerManager.getInstance().register(new PersistingTask(), 61000L);
   }
 
   public static CheatingOffensePersister getInstance() {
     return INSTANCE;
   }
 
   public void persistEntry(CheatingOffenseEntry coe) {
     synchronized (this.toPersist) {
       this.toPersist.remove(coe);
       this.toPersist.add(coe);
     }
   }
 
   public class PersistingTask
     implements Runnable
   {
     public PersistingTask()
     {
     }
 
     public void run()
     {
       CheatingOffenseEntry[] offenses;
       synchronized (CheatingOffensePersister.this.toPersist) {
         offenses = (CheatingOffenseEntry[])CheatingOffensePersister.this.toPersist.toArray(new CheatingOffenseEntry[CheatingOffensePersister.this.toPersist.size()]);
         CheatingOffensePersister.this.toPersist.clear();
       }
 
       Connection con = DatabaseConnection.getConnection();
       PreparedStatement insertps = null;
       PreparedStatement updateps = null;
       try {
         insertps = con.prepareStatement("INSERT INTO cheatlog (cid, offense, count, lastoffensetime, param) VALUES (?, ?, ?, ?, ?)", Statement.RETURN_GENERATED_KEYS);
         updateps = con.prepareStatement("UPDATE cheatlog SET count = ?, lastoffensetime = ?, param = ? WHERE id = ?");
         for (CheatingOffenseEntry offense : offenses) {
           String parm = offense.getParam() == null ? "" : offense.getParam();
           if (offense.getDbId() == -1) {
             insertps.setInt(1, offense.getChrfor().getId());
             insertps.setString(2, offense.getOffense().name());
             insertps.setInt(3, offense.getCount());
             insertps.setTimestamp(4, new Timestamp(offense.getLastOffenseTime()));
             insertps.setString(5, parm);
             insertps.executeUpdate();
             ResultSet rs = insertps.getGeneratedKeys();
             if (rs.next()) {
               offense.setDbId(rs.getInt(1));
             }
             rs.close();
           } else {
             updateps.setInt(1, offense.getCount());
             updateps.setTimestamp(2, new Timestamp(offense.getLastOffenseTime()));
             updateps.setString(3, parm);
             updateps.setInt(4, offense.getDbId());
             updateps.executeUpdate();
           }
         }
         insertps.close();
         updateps.close();
       } catch (SQLException ex) {
         CheatingOffensePersister.log.error("error persisting cheatlog", ex);
       } finally {
         try {
           if (insertps != null) {
             insertps.close();
           }
           if (updateps != null)
             updateps.close();
         }
         catch (SQLException ex)
         {
         }
       }
     }
   }
 }