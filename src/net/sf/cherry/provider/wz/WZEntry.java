 package net.sf.cherry.provider.wz;
 
 import net.sf.cherry.provider.MapleDataEntity;
import net.sf.cherry.provider.MapleDataEntry;
 
 public class WZEntry
   implements MapleDataEntry
 {
   private String name;
   private int size;
   private int checksum;
   private int offset;
   private MapleDataEntity parent;
 
   public WZEntry(String name, int size, int checksum, MapleDataEntity parent)
   {
     this.name = name;
     this.size = size;
     this.checksum = checksum;
     this.parent = parent;
   }
 
   public String getName() {
     return this.name;
   }
 
   public int getSize() {
     return this.size;
   }
 
   public int getChecksum() {
     return this.checksum;
   }
 
   public int getOffset() {
     return this.offset;
   }
 
   public MapleDataEntity getParent() {
     return this.parent;
   }
 }

/* Location:           E:\maoxiandaodanji\dist\cherry.jar
 * Qualified Name:     net.sf.cherry.provider.wz.WZEntry
 * JD-Core Version:    0.6.0
 */