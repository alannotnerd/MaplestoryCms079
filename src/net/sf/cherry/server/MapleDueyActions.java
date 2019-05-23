 package net.sf.cherry.server;
 
 import java.util.Calendar;

import net.sf.cherry.client.IItem;
 
 public class MapleDueyActions
 {
   private String sender = null;
   private IItem item = null;
   private int mesos = 0;
   private int quantity = 1;
   private int packageId = 0;
   private int year;
   private int month;
   private int day;
   private int hour;
   private int minute;
 
   public MapleDueyActions(int pId, IItem item)
   {
     this.item = item;
     this.quantity = item.getQuantity();
     this.packageId = pId;
   }
 
   public MapleDueyActions(int pId) {
     this.packageId = pId;
   }
 
   public String getSender() {
     return this.sender;
   }
 
   public void setSender(String name) {
     this.sender = name;
   }
 
   public IItem getItem() {
     return this.item;
   }
 
   public int getMesos() {
     return this.mesos;
   }
 
   public void setMesos(int set) {
     this.mesos = set;
   }
 
   public int getQuantity() {
     return this.quantity;
   }
 
   public int getPackageId() {
     return this.packageId;
   }
 
   public long sentTimeInMilliseconds() {
     Calendar cal = Calendar.getInstance();
     cal.set(this.year, this.month, this.day, this.hour, this.minute);
     return cal.getTimeInMillis();
   }
 
   public void setSentTime(String sentTime) {
     this.year = Integer.parseInt(sentTime.substring(0, 4));
     this.month = Integer.parseInt(sentTime.substring(5, 7));
     this.day = Integer.parseInt(sentTime.substring(8, 10));
     this.hour = Integer.parseInt(sentTime.substring(11, 13));
     this.minute = Integer.parseInt(sentTime.substring(14, 16));
   }
 }

/* Location:           E:\maoxiandaodanji\dist\cherry.jar
 * Qualified Name:     net.sf.cherry.server.MapleDueyActions
 * JD-Core Version:    0.6.0
 */