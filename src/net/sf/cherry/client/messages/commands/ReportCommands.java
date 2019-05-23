 package net.sf.cherry.client.messages.commands;
 
 import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import net.sf.cherry.client.MapleClient;
import net.sf.cherry.client.messages.Command;
import net.sf.cherry.client.messages.CommandDefinition;
import net.sf.cherry.client.messages.CommandProcessor;
import net.sf.cherry.client.messages.IllegalCommandSyntaxException;
import net.sf.cherry.client.messages.MessageCallback;
import net.sf.cherry.database.DatabaseConnection;
import net.sf.cherry.net.channel.handler.ReportPlayerHandler;
 
 public class ReportCommands
   implements Command
 {
   private static Logger log = LoggerFactory.getLogger(ReportCommands.class);
 
   public void execute(MapleClient c, MessageCallback mc, String[] splitted) throws Exception
   {
     if (splitted[0].equals("!listreports")) {
       int page = CommandProcessor.getOptionalIntArg(splitted, 1, 0);
       mc.dropMessage("== Reports page: " + page + " ==");
       PreparedStatement ps = null;
       ResultSet rs = null;
       try {
         Connection con = DatabaseConnection.getConnection();
         ps = con.prepareStatement("SELECT * FROM reports ORDER BY id DESC LIMIT ?, 15");
         ps.setInt(1, page * 15);
         rs = ps.executeQuery();
         mc.dropMessage("Report ID | Reason | Reporter | Victim | Status");
         while (rs.next()) {
           mc.dropMessage(rs.getInt("id") + " | " + ReportPlayerHandler.reasons[rs.getInt("reason")] + " | " + ReportPlayerHandler.getNameById(rs.getInt("reporterid")) + " | " + ReportPlayerHandler.getNameById(rs.getInt("victimid")) + " | " + rs.getString("status"));
         }
 
       }
       catch (SQLException ex)
       {
         log.error("Report SQL Error", ex);
       } finally {
         try {
           if (rs != null) {
             rs.close();
           }
           if (ps != null)
             ps.close();
         } catch (SQLException ex) {
         }
       }
     }
     else if (splitted[0].equals("!getreport")) {
       if (splitted.length < 2) {
         throw new IllegalCommandSyntaxException(2);
       }
       int reportid = Integer.parseInt(splitted[1]);
       PreparedStatement ps = null;
       ResultSet rs = null;
       try {
         Connection con = DatabaseConnection.getConnection();
         ps = con.prepareStatement("SELECT * FROM reports WHERE id = ?");
         ps.setInt(1, reportid);
         rs = ps.executeQuery();
 
         if (rs.next()) {
           mc.dropMessage(ReportPlayerHandler.reasons[rs.getInt("reason")] + " | " + ReportPlayerHandler.getNameById(rs.getInt("reporterid")) + " | " + ReportPlayerHandler.getNameById(rs.getInt("victimid")) + " | " + rs.getString("status"));
 
           String[] chatlog = rs.getString("chatlog").split("\r\n");
 
           mc.dropMessage("== Chatlog start:");
           for (String x : chatlog) {
             mc.dropMessage(x.trim());
           }
           mc.dropMessage("== Chatlog end");
         }
       } catch (SQLException ex) {
         log.error("Report SQL Error", ex);
       } finally {
         try {
           if (rs != null) {
             rs.close();
           }
           if (ps != null)
             ps.close();
         } catch (SQLException ex) {
         }
       }
     }
     else if (splitted[0].equals("!editreportstatus")) {
       if (splitted.length < 3) {
         throw new IllegalCommandSyntaxException(3);
       }
       int reportid = Integer.parseInt(splitted[1]);
       String status = splitted[2];
       PreparedStatement ps = null;
       try {
         Connection con = DatabaseConnection.getConnection();
         ps = con.prepareStatement("UPDATE reports SET status = ? WHERE id = ?");
         ps.setString(1, status);
         ps.setInt(2, reportid);
         ps.executeUpdate();
         mc.dropMessage("Updated report.");
       } catch (SQLException ex) {
         log.error("Report SQL Error", ex);
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
   }
 
   public CommandDefinition[] getDefinition() {
     return new CommandDefinition[] { 
         //new CommandDefinition("listreports", "<page>", "Lists reports", 50),
         //new CommandDefinition("getreport", "id", "Gets the report from the specified id", 50),
         //new CommandDefinition("editreportstatus", "id status", "Edits the status of a report", 50) };
         };
   }
 }

/* Location:           E:\maoxiandaodanji\dist\cherry.jar
 * Qualified Name:     net.sf.cherry.client.messages.commands.ReportCommands
 * JD-Core Version:    0.6.0
 */