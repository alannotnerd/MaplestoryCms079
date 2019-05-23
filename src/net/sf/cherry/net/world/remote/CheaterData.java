 package net.sf.cherry.net.world.remote;
 
 import java.io.Serializable;
 
 public class CheaterData
   implements Serializable, Comparable<CheaterData>
 {
   private static final long serialVersionUID = -8733673311051249885L;
   private int points;
   private String info;
 
   public CheaterData(int points, String info)
   {
     this.points = points;
     this.info = info;
   }
 
   public String getInfo() {
     return this.info;
   }
 
   public int getPoints() {
     return this.points;
   }
 
   public int compareTo(CheaterData o) {
     int thisVal = getPoints();
     int anotherVal = o.getPoints();
     return thisVal == anotherVal ? 0 : thisVal < anotherVal ? 1 : -1;
   }
 }

/* Location:           E:\maoxiandaodanji\dist\cherry.jar
 * Qualified Name:     net.sf.cherry.net.world.remote.CheaterData
 * JD-Core Version:    0.6.0
 */