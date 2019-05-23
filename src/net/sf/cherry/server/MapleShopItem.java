 package net.sf.cherry.server;
 
 public class MapleShopItem
 {
   private short buyable;
   private int itemId;
   private int price;
   private long refreshTime = 0L;
   private short availible;
 
   public MapleShopItem(short buyable, int itemId, int price)
   {
     this.buyable = buyable;
     this.itemId = itemId;
     this.price = price;
   }
 
   public short getBuyable() {
     return this.buyable;
   }
 
   public short getAvailible() {
     return this.availible;
   }
 
   public void setAvailible(short set) {
     this.availible = set;
   }
 
   public void decAvailible() {
     this.availible = (short)(this.availible - 1);
   }
 
   public void incAvailible() {
     this.availible = (short)(this.availible + 1);
   }
 
   public int getItemId() {
     return this.itemId;
   }
 
   public int getPrice() {
     return this.price;
   }
 
   public long getRefresh() {
     return this.refreshTime;
   }
 }

/* Location:           E:\maoxiandaodanji\dist\cherry.jar
 * Qualified Name:     net.sf.cherry.server.MapleShopItem
 * JD-Core Version:    0.6.0
 */