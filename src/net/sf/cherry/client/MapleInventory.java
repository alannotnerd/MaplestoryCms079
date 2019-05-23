 package net.sf.cherry.client;
 
 import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.Collection;
import java.util.Collections;
import java.util.Iterator;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;

import net.sf.cherry.database.DatabaseConnection;
import net.sf.cherry.server.MapleItemInformationProvider;
 
 public class MapleInventory
   implements Iterable<IItem>, InventoryContainer
 {
   private Map<Byte, IItem> inventory;
   private byte slotLimit;
   private MapleInventoryType type;
 
   public MapleInventory(MapleInventoryType type, byte slotLimit)
   {
     this.inventory = new LinkedHashMap();
     this.slotLimit = slotLimit;
     this.type = type;
   }
 
   public IItem findById(int itemId)
   {
     for (IItem item : this.inventory.values()) {
       if (item.getItemId() == itemId) {
         return item;
       }
     }
     return null;
   }
 
   public IItem findByUniqueId(int uniqueid) {
     for (IItem item : this.inventory.values()) {
       if (item.getUniqueId() == uniqueid) {
         return item;
       }
     }
     return null;
   }
 
   public int countById(int itemId) {
     int possesed = 0;
     for (IItem item : this.inventory.values()) {
       if (item.getItemId() == itemId) {
         possesed += item.getQuantity();
       }
     }
     return possesed;
   }
 
   public List<IItem> listById(int itemId) {
     List ret = new ArrayList();
     for (IItem item : this.inventory.values()) {
       if (item.getItemId() == itemId) {
         ret.add(item);
       }
 
     }
 
     if (ret.size() > 1) {
       Collections.sort(ret);
     }
     return ret;
   }
 
   public Collection<IItem> list() {
     return this.inventory.values();
   }
 
   public byte addItem(IItem item)
   {
     byte slotId = getNextFreeSlot();
     if (slotId < 0) {
       return -1;
     }
     this.inventory.put(Byte.valueOf(slotId), item);
     item.setPosition(slotId);
     return slotId;
   }
 
   public void addFromDB(IItem item) {
     if ((item.getPosition() < 0) && (!this.type.equals(MapleInventoryType.EQUIPPED))) {
       throw new RuntimeException("Item with negative position in non-equipped IV wtf?");
     }
     if ((item.getPosition() < 0) && (item.getPosition() != -111) && (item.getPosition() != -11) && (item.getItemId() >= 1300000) && (item.getItemId() < 1800000)){
       //////System.out.println("禁止载入武器到非武器栏。物品ID:" + item.getItemId());
         }else {
       this.inventory.put(Byte.valueOf(item.getPosition()), item);
     }
     this.inventory.put(Byte.valueOf(item.getPosition()), item);
   }
 
   public boolean move(byte sSlot, byte dSlot, short slotMax) {
     MapleItemInformationProvider ii = MapleItemInformationProvider.getInstance();
     Item source = (Item)this.inventory.get(Byte.valueOf(sSlot));
     Item target = (Item)this.inventory.get(Byte.valueOf(dSlot));
     if (source == null) {
       throw new InventoryException("Trying to move empty slot");
     }
     if (target == null) {
       source.setPosition(dSlot);
       this.inventory.put(Byte.valueOf(dSlot), source);
       this.inventory.remove(Byte.valueOf(sSlot));
     } else if ((target.getItemId() == source.getItemId()) && (!ii.isThrowingStar(source.getItemId())) && (!ii.isBullet(source.getItemId()))) {
       if (this.type.getType() == MapleInventoryType.EQUIP.getType()) {
         swap(target, source);
       }
       if (source.getQuantity() + target.getQuantity() > slotMax) {
         short rest = (short)(source.getQuantity() + target.getQuantity() - slotMax);
         if (rest + slotMax != source.getQuantity() + target.getQuantity()) {
           return false;
         }
         source.setQuantity(rest);
         target.setQuantity(slotMax);
       } else {
         target.setQuantity((short)(source.getQuantity() + target.getQuantity()));
         this.inventory.remove(Byte.valueOf(sSlot));
       }
     } else {
       swap(target, source);
     }
     return true;
   }
 
   public byte getSlots() {
     return this.slotLimit;
   }
 
   public void setSlotLimit(byte num) {
     this.slotLimit = num;
   }
 
   private void swap(IItem source, IItem target) {
     this.inventory.remove(Byte.valueOf(source.getPosition()));
     this.inventory.remove(Byte.valueOf(target.getPosition()));
     byte swapPos = source.getPosition();
     source.setPosition(target.getPosition());
     target.setPosition(swapPos);
     this.inventory.put(Byte.valueOf(source.getPosition()), source);
     this.inventory.put(Byte.valueOf(target.getPosition()), target);
   }
 
   public IItem getItem(byte slot) {
     return (IItem)this.inventory.get(Byte.valueOf(slot));
   }
 
   public void removeItem(byte slot) {
     removeItem(slot, (short)1, false);
   }
 
   public void removeItem(byte slot, short quantity, boolean allowZero) {
     IItem item = (IItem)this.inventory.get(Byte.valueOf(slot));
     if (item == null) {
       return;
     }
     item.setQuantity((short)(item.getQuantity() - quantity));
     if (item.getQuantity() < 0) {
       item.setQuantity((short)0);
     }
     if ((item.getQuantity() == 0) && (!allowZero))
       removeSlot(slot);
   }
 
   public void removeSlot(byte slot)
   {
     this.inventory.remove(Byte.valueOf(slot));
   }
 
   public boolean isFull() {
     return this.inventory.size() >= this.slotLimit;
   }
 
   public boolean isFull(int margin) {
     return this.inventory.size() + margin >= this.slotLimit;
   }
 
   public byte getNextFreeSlot(){
     if (isFull()) {
       return -1;
     }
     for (byte i = 1; i <= this.slotLimit; i = (byte)(i + 1)) {
       if (!this.inventory.keySet().contains(Byte.valueOf(i))) {
         return i;
       }
     }
     return -1;
   }
 
   public MapleInventoryType getType() {
     return this.type;
   }
 
   public int countItemType(int charid, MapleInventoryType itemtype) {
     int it = itemtype.getType();
     PreparedStatement ps = null;
     ResultSet rs = null;
     try {
       Connection con = DatabaseConnection.getConnection();
       ps = con.prepareStatement("SELECT COUNT(*) AS c FROM inventoryitems WHERE characterid = ? AND inventorytype = ?");
       ps.setInt(1, charid);
       ps.setInt(2, it);
       rs = ps.executeQuery();
       if (rs.next()) {
         int i = Integer.parseInt(rs.getString("c"));
         return i;
       }
       rs.close();
       ps.close();
     } catch (Exception ex) {
       ex.printStackTrace();
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
     return 0;
   }
 
   public Iterator<IItem> iterator()
   {
     return Collections.unmodifiableCollection(this.inventory.values()).iterator();
   }
 
   public Collection<MapleInventory> allInventories()
   {
     return Collections.singletonList(this);
   }
 
   public List<Byte> findAllById(int itemId) {
     List slots = new ArrayList();
     for (IItem item : this.inventory.values()) {
       if (item.getItemId() == itemId) {
         slots.add(Byte.valueOf(item.getPosition()));
       }
     }
     return slots;
   }
 }

/* Location:           E:\maoxiandaodanji\dist\cherry.jar
 * Qualified Name:     net.sf.cherry.client.MapleInventory
 * JD-Core Version:    0.6.0
 */