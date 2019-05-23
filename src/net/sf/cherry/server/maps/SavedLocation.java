 package net.sf.cherry.server.maps;
 
 public class SavedLocation
 {
   private int mapid = 100000000;
   private int portal;
 
   public SavedLocation(int mapid, int portal)
   {
     this.mapid = mapid;
     this.portal = portal;
   }
 
   public int getMapId() {
     return this.mapid;
   }
 
   public int getPortal() {
     return this.portal;
   }
 }

/* Location:           E:\maoxiandaodanji\dist\cherry.jar
 * Qualified Name:     net.sf.cherry.server.maps.SavedLocation
 * JD-Core Version:    0.6.0
 */