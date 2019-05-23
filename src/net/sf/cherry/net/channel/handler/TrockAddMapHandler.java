 package net.sf.cherry.net.channel.handler;
 
 import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.SQLException;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import net.sf.cherry.client.MapleClient;
import net.sf.cherry.database.DatabaseConnection;
import net.sf.cherry.net.AbstractMaplePacketHandler;
import net.sf.cherry.tools.MaplePacketCreator;
import net.sf.cherry.tools.data.input.SeekableLittleEndianAccessor;
 
 public class TrockAddMapHandler extends AbstractMaplePacketHandler
 {
   private static Logger log = LoggerFactory.getLogger(TrockAddMapHandler.class);
 
   public void handlePacket(SeekableLittleEndianAccessor slea, MapleClient c) {
     c.doneedlog(this, c.getPlayer());
     if (c.getPlayer().getCherryBan()) {
       c.getPlayer().getCherryBanMessage();
       c.getSession().write(MaplePacketCreator.enableActions());
       return;
     }
     Connection con = DatabaseConnection.getConnection();
     byte addrem = slea.readByte();
     byte rocktype = slea.readByte();
 
     if (addrem == 0) {
       int mapId = slea.readInt();
       PreparedStatement ps = null;
       try {
         ps = con.prepareStatement("DELETE FROM trocklocations WHERE characterid = ? AND mapid = ? AND type = ?");
         ps.setInt(1, c.getPlayer().getId());
         ps.setInt(2, mapId);
         ps.setInt(3, rocktype);
         ps.executeUpdate();
         ps.close();
       } catch (SQLException ex) {
         log.error("SQL error: " + ex.getLocalizedMessage(), ex);
       } finally {
         try {
           if (ps != null)
             ps.close();
         } catch (SQLException ex) {
         }
       }
     }
     else if (addrem == 1) {
       int mapid = c.getPlayer().getMapId();
       PreparedStatement ps = null;
       try {
         ps = con.prepareStatement("DELETE FROM trocklocations WHERE characterid = ? AND mapid = ? AND type = ?");
         ps.setInt(1, c.getPlayer().getId());
         ps.setInt(2, mapid);
         ps.setInt(3, rocktype);
         ps.executeUpdate();
         ps.close();
       } catch (SQLException ex) {
         log.error("SQL error: " + ex.getLocalizedMessage(), ex);
       } finally {
         try {
           if (ps != null)
             ps.close();
         }
         catch (SQLException ex) {
         }
       }
       if (((mapid < 240050000) || (mapid > 240060200)) && (mapid >= 100000000) && ((mapid < 280010010) || (mapid > 280030000)) && ((mapid < 670000100) || (mapid > 670011000)) && (mapid < 809020000) && ((mapid < 101000100) || (mapid > 101000104)) && (mapid != 101000301) && ((mapid < 105040310) || (mapid > 105040316)) && ((mapid < 108000100) || (mapid > 109080003)) && ((mapid < 190000000) || (mapid > 197010000)) && ((mapid < 200090000) || (mapid > 209080000)) && (mapid != 240000110) && (mapid != 240000111) && (mapid != 260000110))
       {
         PreparedStatement ps1 = null;
         try {
           ps1 = con.prepareStatement("INSERT INTO trocklocations (characterid, mapid, type) VALUES (?, ?, ?)");
           ps1.setInt(1, c.getPlayer().getId());
           ps1.setInt(2, c.getPlayer().getMapId());
           ps1.setInt(3, rocktype);
           ps1.executeUpdate();
           ps1.close();
         } catch (SQLException ex) {
           log.error("SQL error: " + ex.getLocalizedMessage(), ex);
         } finally {
           try {
             if (ps1 != null)
               ps1.close();
           } catch (SQLException ex) {
           }
         }
       }
       else {
         c.getPlayer().dropMessage("You may not save this map.");
       }
     }
     c.getSession().write(MaplePacketCreator.TrockRefreshMapList(c.getPlayer(), rocktype));
   }
 }

