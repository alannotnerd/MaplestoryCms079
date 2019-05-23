 package net.sf.cherry.server.consign;
 
 import net.sf.cherry.client.IItem;
 
 public class ConsignItem
 {
   private IItem item;
   private int id;
   private int mesos;
   private int paypalnx;
 
   public ConsignItem(IItem item, int mesos, int paypalnx)
   {
     this.item = item;
     this.mesos = mesos;
     this.paypalnx = paypalnx;
   }
 
   public int getId() {
     return this.id;
   }
 
   public void setId(int id) {
     this.id = id;
   }
 
   public IItem getItem() {
     return this.item;
   }
 
   public int getMesos() {
     return this.mesos;
   }
 
   public void setMesos(int mesos) {
     this.mesos = mesos;
   }
 
   public int getPaypalnx() {
     return this.paypalnx;
   }
 
   public void setPaypalnx(int paypalnx) {
     this.paypalnx = paypalnx;
   }
 }

/* Location:           E:\maoxiandaodanji\dist\cherry.jar
 * Qualified Name:     net.sf.cherry.server.consign.ConsignItem
 * JD-Core Version:    0.6.0
 */