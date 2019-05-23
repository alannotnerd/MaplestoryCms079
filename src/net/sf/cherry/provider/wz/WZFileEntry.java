 package net.sf.cherry.provider.wz;
 
 import net.sf.cherry.provider.MapleDataEntity;
import net.sf.cherry.provider.MapleDataFileEntry;
 
 public class WZFileEntry extends WZEntry
   implements MapleDataFileEntry
 {
   private int offset;
 
   public WZFileEntry(String name, int size, int checksum, MapleDataEntity parent)
   {
     super(name, size, checksum, parent);
   }
 
   public int getOffset()
   {
     return this.offset;
   }
 
   public void setOffset(int offset) {
     this.offset = offset;
   }
 }

/* Location:           E:\maoxiandaodanji\dist\cherry.jar
 * Qualified Name:     net.sf.cherry.provider.wz.WZFileEntry
 * JD-Core Version:    0.6.0
 */