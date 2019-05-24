package net.sf.cherry.provider;

import java.util.List;

public interface MapleDataDirectoryEntry extends MapleDataEntry {
  List<MapleDataDirectoryEntry> getSubdirectories();

  List<MapleDataFileEntry> getFiles();

  MapleDataEntry getEntry(String paramString);
}

/* Location:           E:\maoxiandaodanji\dist\cherry.jar
 * Qualified Name:     net.sf.cherry.provider.MapleDataDirectoryEntry
 * JD-Core Version:    0.6.0
 */