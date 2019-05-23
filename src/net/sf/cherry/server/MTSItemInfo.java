 package net.sf.cherry.server;
 
 import java.util.Calendar;

import net.sf.cherry.client.IItem;
 
 public class MTSItemInfo
 {
   private int price;
   private IItem item;
   private String seller;
   private int id;
   private int cid;
   private int year;
   private int month;
   private int day = 1;
 
   public MTSItemInfo(IItem item, int price, int id, int cid, String seller, String date) {
     this.item = item;
     this.price = price;
     this.seller = seller;
     this.id = id;
     this.cid = cid;
     this.year = Integer.parseInt(date.substring(0, 4));
     this.month = Integer.parseInt(date.substring(5, 7));
     this.day = Integer.parseInt(date.substring(8, 10));
   }
 
   public IItem getItem() {
     return this.item;
   }
 
   public int getPrice() {
     return this.price;
   }
 
   public int getRealPrice() {
     return this.price + getTaxes();
   }
 
   public int getTaxes() {
     return 100 + (int)(this.price * 0.1D);
   }
 
   public int getID() {
     return this.id;
   }
 
   public int getCID() {
     return this.cid;
   }
 
   public long getEndingDate() {
     Calendar now = Calendar.getInstance();
     now.set(this.year, this.month - 1, this.day);
     return now.getTimeInMillis();
   }
 
   public String getSeller() {
     return this.seller;
   }
 }

/* Location:           E:\maoxiandaodanji\dist\cherry.jar
 * Qualified Name:     net.sf.cherry.server.MTSItemInfo
 * JD-Core Version:    0.6.0
 */