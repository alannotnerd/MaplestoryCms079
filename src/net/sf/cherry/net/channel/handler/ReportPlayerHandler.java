 package net.sf.cherry.net.channel.handler;
 
 import java.rmi.RemoteException;
import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import net.sf.cherry.client.MapleClient;
import net.sf.cherry.database.DatabaseConnection;
import net.sf.cherry.net.AbstractMaplePacketHandler;
import net.sf.cherry.net.world.remote.WorldChannelInterface;
import net.sf.cherry.tools.MaplePacketCreator;
import net.sf.cherry.tools.data.input.SeekableLittleEndianAccessor;
 
 public class ReportPlayerHandler extends AbstractMaplePacketHandler
 {
   public static final String[] reasons = { "Hacking", "Botting", "Scamming", "Fake GM", "Harassment", "Advertising" };
   private static Logger log = LoggerFactory.getLogger(ReportPlayerHandler.class);
 
   public static String getNameById(int id) {
     Connection con = null;
     PreparedStatement ps = null;
     ResultSet rs = null;
     try {
       con = DatabaseConnection.getConnection();
       ps = con.prepareStatement("SELECT * FROM characters where id = ?");
       ps.setInt(1, id);
       rs = ps.executeQuery();
       if (rs.next()) {
         String str = rs.getString("name");
         return str;
       }
       rs.close();
       ps.close();
     } catch (SQLException ex) {
       log.error("Report SQL Error", ex);
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
     return "<Couldn't retreive name, player id is " + id + ">";
   }
 
   public void handlePacket(SeekableLittleEndianAccessor slea, MapleClient c)
   {
     c.doneedlog(this, c.getPlayer());
     int reportedCharId = slea.readInt();
     byte reason = slea.readByte();
     String chatlog = "No chatlog.";
     short clogLen = slea.readShort();
     if (clogLen > 0) {
       chatlog = slea.readAsciiString(clogLen);
     }
 
     boolean reported = addReportEntry(c.getPlayer().getId(), reportedCharId, reason, chatlog);
     StringBuilder sb = new StringBuilder();
     sb.append(c.getPlayer().getName());
     sb.append(" reported character ");
     sb.append(getNameById(reportedCharId));
     sb.append(" for ");
     sb.append(reasons[reason]);
     sb.append(".");
     if (reported)
       c.getSession().write(MaplePacketCreator.reportReply((byte)0));
     else {
       c.getSession().write(MaplePacketCreator.reportReply((byte)4));
     }
     WorldChannelInterface wci = c.getChannelServer().getWorldInterface();
     try {
       wci.broadcastGMMessage(null, MaplePacketCreator.serverNotice(5, sb.toString()).getBytes());
     } catch (RemoteException e) {
       c.getChannelServer().reconnectWorld();
     }
   }
 
    public boolean addReportEntry(int reporterId, int victimId, byte reason, String chatlog) {
        try {
            Connection con = DatabaseConnection.getConnection();
            PreparedStatement ps = con.prepareStatement("INSERT INTO reports VALUES (NULL, CURRENT_TIMESTAMP, ?, ?, ?, ?, 'UNHANDLED')");
            ps.setInt(1, reporterId);
            ps.setInt(2, victimId);
            ps.setInt(3, reason);
            ps.setString(4, chatlog);
            ps.executeUpdate();
            ps.close();
        } catch (Exception ex) {
            return false;
        }

        return true;
    }
 }

/* Location:           E:\maoxiandaodanji\dist\cherry.jar
 * Qualified Name:     net.sf.cherry.net.channel.handler.ReportPlayerHandler
 * JD-Core Version:    0.6.0
 */