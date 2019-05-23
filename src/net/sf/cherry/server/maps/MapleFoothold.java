 package net.sf.cherry.server.maps;
 
 import java.awt.Point;
 
 public class MapleFoothold
   implements Comparable<MapleFoothold>
 {
   private Point p1;
   private Point p2;
   private int id;
   private int next;
   private int prev;
 
   public MapleFoothold(Point p1, Point p2, int id)
   {
     this.p1 = p1;
     this.p2 = p2;
     this.id = id;
   }
 
   public boolean isWall() {
     return this.p1.x == this.p2.x;
   }
 
   public int getX1() {
     return this.p1.x;
   }
 
   public int getX2() {
     return this.p2.x;
   }
 
   public int getY1() {
     return this.p1.y;
   }
 
   public int getY2() {
     return this.p2.y;
   }
 
   public int compareTo(MapleFoothold o) {
     MapleFoothold other = o;
     if (this.p2.y < other.getY1())
       return -1;
     if (this.p1.y > other.getY2()) {
       return 1;
     }
     return 0;
   }
 
   public int getId()
   {
     return this.id;
   }
 
   public int getNext() {
     return this.next;
   }
 
   public void setNext(int next) {
     this.next = next;
   }
 
   public int getPrev() {
     return this.prev;
   }
 
   public void setPrev(int prev) {
     this.prev = prev;
   }
 }

/* Location:           E:\maoxiandaodanji\dist\cherry.jar
 * Qualified Name:     net.sf.cherry.server.maps.MapleFoothold
 * JD-Core Version:    0.6.0
 */