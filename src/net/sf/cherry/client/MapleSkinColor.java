 package net.sf.cherry.client;
 
 public enum MapleSkinColor
 {
   NORMAL(0), 
   DARK(1), 
   BLACK(2), 
   PALE(3), 
   BLUE(4), 
   PINK(5), 
   YELLOW(6), 
   GRAY(7), 
   YELLOWBROWN(8), 
   WHITE(9), 
   GREEN(10), 
   ARAN(11);
 
   final int id;
 
   private MapleSkinColor(int id) { this.id = id; }
 
   public int getId()
   {
     return this.id;
   }
 
   public static MapleSkinColor getById(int id) {
     for (MapleSkinColor l : values()) {
       if (l.getId() == id) {
         return l;
       }
     }
     return null;
   }
 }

