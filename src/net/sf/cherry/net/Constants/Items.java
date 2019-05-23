 package net.sf.cherry.net.Constants;
 
 public class Items
 {
   public static enum MegaPhoneType
   {
     MEGAPHONE(2), 
     SUPERMEGAPHONE(3), 
     ITEMMEGAPHONE(8);
 
     private int i;
 
     private MegaPhoneType(int i) { this.i = i; }
 
     public int getValue()
     {
       return this.i;
     }
   }
 
   public static class Cash
   {
     public static final int ViciousHammer = 5570000;
 
     public static boolean isPetFood(int itemId)
     {
       return (itemId >= 5240000) && (itemId <= 5240020);
     }
   }
 }

/* Location:           E:\maoxiandaodanji\dist\cherry.jar
 * Qualified Name:     net.sf.cherry.server.constants.Items
 * JD-Core Version:    0.6.0
 */