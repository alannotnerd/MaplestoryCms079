 package net.sf.cherry.provider.wz;
 
 import java.util.ArrayList;
import java.util.Collections;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import net.sf.cherry.provider.MapleDataDirectoryEntry;
import net.sf.cherry.provider.MapleDataEntity;
import net.sf.cherry.provider.MapleDataEntry;
import net.sf.cherry.provider.MapleDataFileEntry;
 
 public class WZDirectoryEntry extends WZEntry
   implements MapleDataDirectoryEntry
 {
   private List<MapleDataDirectoryEntry> subdirs = new ArrayList();
   private List<MapleDataFileEntry> files = new ArrayList();
   private Map<String, MapleDataEntry> entries = new HashMap();
 
   public WZDirectoryEntry(String name, int size, int checksum, MapleDataEntity parent) {
     super(name, size, checksum, parent);
   }
 
   public WZDirectoryEntry() {
     super(null, 0, 0, null);
   }
 
   public void addDirectory(MapleDataDirectoryEntry dir) {
     this.subdirs.add(dir);
     this.entries.put(dir.getName(), dir);
   }
 
   public void addFile(MapleDataFileEntry fileEntry) {
     this.files.add(fileEntry);
     this.entries.put(fileEntry.getName(), fileEntry);
   }
 
   public List<MapleDataDirectoryEntry> getSubdirectories() {
     return Collections.unmodifiableList(this.subdirs);
   }
 
   public List<MapleDataFileEntry> getFiles() {
     return Collections.unmodifiableList(this.files);
   }
 
   public MapleDataEntry getEntry(String name) {
     return (MapleDataEntry)this.entries.get(name);
   }
 }

/* Location:           E:\maoxiandaodanji\dist\cherry.jar
 * Qualified Name:     net.sf.cherry.provider.wz.WZDirectoryEntry
 * JD-Core Version:    0.6.0
 */