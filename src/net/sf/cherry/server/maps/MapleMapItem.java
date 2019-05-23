 package net.sf.cherry.server.maps;
 
 import java.awt.Point;
import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import net.sf.cherry.client.IItem;
import net.sf.cherry.client.MapleCharacter;
import net.sf.cherry.client.MapleClient;
import net.sf.cherry.database.DatabaseConnection;
import net.sf.cherry.tools.MaplePacketCreator;
 
 public class MapleMapItem extends AbstractMapleMapObject
 {
   protected IItem item;
   protected MapleMapObject dropper;
   protected MapleCharacter owner;
   protected int meso;
   protected boolean pickedUp = false;
   private static final Logger log = LoggerFactory.getLogger(MapleMapItem.class);
 
   public MapleMapItem(IItem item, Point position, MapleMapObject dropper, MapleCharacter owner)
   {
     setPosition(position);
     this.item = item;
     this.dropper = dropper;
     this.owner = owner;
     this.meso = 0;
   }
 
   public MapleMapItem(int meso, Point position, MapleMapObject dropper, MapleCharacter owner) {
     setPosition(position);
     this.item = null;
     this.meso = meso;
     this.dropper = dropper;
     this.owner = owner;
   }
   public MapleMapItem(Point position, IItem item) {
       setPosition(position);
       this.item = item;
   }
 
   public IItem getItem() {
     return this.item;
   }
 
   public MapleMapObject getDropper() {
     return this.dropper;
   }
 
   public MapleCharacter getOwner() {
     return this.owner;
   }
 
   public int getMeso() {
     return this.meso;
   }
 
   public boolean isPickedUp() {
     return this.pickedUp;
   }
 
   public void setPickedUp(boolean pickedUp) {
     this.pickedUp = pickedUp;
   }
 
   public void sendDestroyData(MapleClient client)
   {
     client.getSession().write(MaplePacketCreator.removeItemFromMap(getObjectId(), 1, 0));
   }
 
   public MapleMapObjectType getType()
   {
     return MapleMapObjectType.ITEM;
   }
 
   public void sendSpawnData(MapleClient client)
   {
     if (getMeso() > 0) {
       client.getSession().write(MaplePacketCreator.dropMesoFromMapObject(getMeso(), getObjectId(), getDropper().getObjectId(), getOwner().getId(), null, getPosition(),(byte) 2));
     }
     else
       client.getSession().write(MaplePacketCreator.dropItemFromMapObject(getItem().getItemId(), getObjectId(), 0, getOwner().getId(), null, getPosition(),(byte) 2));
   }
 
   public boolean isQuestItem(int itemid)
   {
     int numrow = 0;
     Connection con = DatabaseConnection.getConnection();
     PreparedStatement ps = null;
     ResultSet rs = null;
     try {
       ps = con.prepareStatement("SELECT * FROM monsterquestdrops WHERE itemid = ?");
       ps.setInt(1, itemid);
       rs = ps.executeQuery();
       rs.last();
       numrow = rs.getRow();
       rs.close();
       ps.close();
     } catch (Exception ex) {
       log.error("Exception: " + ex);
     } finally {
       try {
         if (rs != null) {
           rs.close();
         }
         if (ps != null) {
           ps.close();
         }
       }
       catch (SQLException ex)
       {
       }
     }
     return numrow > 0;
   }
 
   public int getItemQuestId(int itemid)
   {
     Connection con = DatabaseConnection.getConnection();
     int questid = -1;
     PreparedStatement ps = null;
     ResultSet rs = null;
     try {
       ps = con.prepareStatement("SELECT * FROM monsterquestdrops WHERE itemid = ?");
       ps.setInt(1, itemid);
       rs = ps.executeQuery();
       questid = rs.getInt("questid");
       rs.close();
       ps.close();
     } catch (SQLException ex) {
       ex.printStackTrace();
     } catch (Exception ex) {
       log.error("Exception: " + ex);
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
     return questid;
   }
 }

/* Location:           E:\maoxiandaodanji\dist\cherry.jar
 * Qualified Name:     net.sf.cherry.server.maps.MapleMapItem
 * JD-Core Version:    0.6.0
 */