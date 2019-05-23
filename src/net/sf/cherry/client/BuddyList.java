 package net.sf.cherry.client;
 
 import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.Collection;
import java.util.Deque;
import java.util.LinkedHashMap;
import java.util.LinkedList;
import java.util.Map;

import net.sf.cherry.database.DatabaseConnection;
import net.sf.cherry.tools.MaplePacketCreator;
 
 public class BuddyList
 {
   private Map<Integer, BuddylistEntry> buddies = new LinkedHashMap();
   private int capacity;
   private Deque<CharacterNameAndId> pendingRequests = new LinkedList();
 
   public BuddyList(int capacity)
   {
     this.capacity = capacity;
   }
 
   public boolean contains(int characterId) {
     return this.buddies.containsKey(Integer.valueOf(characterId));
   }
 
   public boolean containsVisible(int characterId) {
     BuddylistEntry ble = (BuddylistEntry)this.buddies.get(Integer.valueOf(characterId));
     if (ble == null) {
       return false;
     }
     return ble.isVisible();
   }
 
   public int getCapacity() {
     return this.capacity;
   }
 
   public void setCapacity(int capacity) {
     this.capacity = capacity;
   }
 
   public BuddylistEntry get(int characterId) {
     return (BuddylistEntry)this.buddies.get(Integer.valueOf(characterId));
   }
 
   public BuddylistEntry get(String characterName) {
     String lowerCaseName = characterName.toLowerCase();
     for (BuddylistEntry ble : this.buddies.values()) {
       if (ble.getName().toLowerCase().equals(lowerCaseName)) {
         return ble;
       }
     }
     return null;
   }
 
   public void put(BuddylistEntry entry) {
     this.buddies.put(Integer.valueOf(entry.getCharacterId()), entry);
   }
 
   public void remove(int characterId) {
     this.buddies.remove(Integer.valueOf(characterId));
   }
 
   public Collection<BuddylistEntry> getBuddies() {
     return this.buddies.values();
   }
 
   public boolean isFull() {
     return this.buddies.size() >= this.capacity;
   }
 
   public int[] getBuddyIds() {
     int[] buddyIds = new int[this.buddies.size()];
     int i = 0;
     for (BuddylistEntry ble : this.buddies.values()) {
       buddyIds[(i++)] = ble.getCharacterId();
     }
     return buddyIds;
   }
 
   public void loadFromDb(int characterId) throws SQLException {
     PreparedStatement ps = null;
     ResultSet rs = null;
     try {
       ps = DatabaseConnection.getConnection().prepareStatement("SELECT b.buddyid, b.group, b.pending, c.name as buddyname FROM buddies as b, characters as c WHERE c.id = b.buddyid AND b.characterid = ?");
       ps.setInt(1, characterId);
       rs = ps.executeQuery();
       while (rs.next()) {
         if (rs.getInt("pending") == 1) {
           this.pendingRequests.push(new CharacterNameAndId(rs.getInt("buddyid"), rs.getString("buddyname"))); continue;
         }
         put(new BuddylistEntry(rs.getString("buddyname"), rs.getString("group"), rs.getInt("buddyid"), -1, true));
       }
 
       rs.close();
       ps.close();
 
       ps = DatabaseConnection.getConnection().prepareStatement("DELETE FROM buddies WHERE pending = 1 AND characterid = ?");
       ps.setInt(1, characterId);
       ps.executeUpdate();
       ps.close();
     } catch (Exception ex) {
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
 
   public CharacterNameAndId pollPendingRequest() {
     return (CharacterNameAndId)this.pendingRequests.pollLast();
   }
 
   public boolean hasPendingRequestFrom(String name) {
     for (CharacterNameAndId cnai : this.pendingRequests) {
       if (cnai.getName().equals(name)) {
         return true;
       }
     }
     return false;
   }
 
   public void addBuddyRequest(MapleClient c, int cidFrom, String nameFrom, int channelFrom) {
     put(new BuddylistEntry(nameFrom, cidFrom, channelFrom, false));
     if (this.pendingRequests.isEmpty())
       c.getSession().write(MaplePacketCreator.requestBuddylistAdd(cidFrom, nameFrom));
     else
       this.pendingRequests.push(new CharacterNameAndId(cidFrom, nameFrom));
   }
 
   public static enum BuddyAddResult
   {
     BUDDYLIST_FULL, ALREADY_ON_LIST, OK;
   }
 
   public static enum BuddyOperation
   {
     ADDED, DELETED;
   }
 }

/* Location:           E:\maoxiandaodanji\dist\cherry.jar
 * Qualified Name:     net.sf.cherry.client.BuddyList
 * JD-Core Version:    0.6.0
 */