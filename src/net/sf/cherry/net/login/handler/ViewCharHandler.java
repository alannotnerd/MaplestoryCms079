 package net.sf.cherry.net.login.handler;
 
 import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.Iterator;
import java.util.List;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import net.sf.cherry.client.MapleCharacter;
import net.sf.cherry.client.MapleClient;
import net.sf.cherry.database.DatabaseConnection;
import net.sf.cherry.net.AbstractMaplePacketHandler;
import net.sf.cherry.tools.MaplePacketCreator;
import net.sf.cherry.tools.data.input.SeekableLittleEndianAccessor;
 
 public class ViewCharHandler extends AbstractMaplePacketHandler
 {
   private static Logger log = LoggerFactory.getLogger(ViewCharHandler.class);
 
   public void handlePacket(SeekableLittleEndianAccessor slea, MapleClient c)
   {
     Connection con = DatabaseConnection.getConnection();
     PreparedStatement ps = null;
     ResultSet rs = null;
     try {
       ps = con.prepareStatement("SELECT * FROM characters WHERE accountid = ?");
       ps.setInt(1, c.getAccID());
       int charsNum = 0;
        List<Integer> worlds = new ArrayList<Integer>();
            List<MapleCharacter> chars = new ArrayList<MapleCharacter>();
       rs = ps.executeQuery();
       while (rs.next()) {
         int cworld = rs.getInt("world");
         boolean inside = false;
         for (Iterator i$ = worlds.iterator(); i$.hasNext(); ) { int w = ((Integer)i$.next()).intValue();
           if (w == cworld) {
             inside = true;
           }
         }
         if (!inside) {
           worlds.add(Integer.valueOf(cworld));
         }
         MapleCharacter chr = MapleCharacter.loadCharFromDB(rs.getInt("id"), c, false);
         chars.add(chr);
         charsNum++;
       }
       int unk = charsNum + (3 - charsNum % 3);
       c.getSession().write(MaplePacketCreator.showAllCharacter(charsNum, unk));
       for (Iterator i$ = worlds.iterator(); i$.hasNext(); ) { int w = ((Integer)i$.next()).intValue();
        List<MapleCharacter> chrsinworld = new ArrayList<MapleCharacter>();
          for (MapleCharacter chr : chars) {
           if (chr.getWorld() == w) {
             chrsinworld.add(chr);
           }
         }
         c.getSession().write(MaplePacketCreator.showAllCharacterInfo(w, chrsinworld));
       }
       rs.close();
       ps.close();
     } catch (Exception ex) {
       log.error("Viewing all chars failed", ex);
     }
     finally {
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
