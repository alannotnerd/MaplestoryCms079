package net.sf.cherry.provider;

import java.util.List;

public abstract interface MapleDataDirectoryEntry extends MapleDataEntry
{
  public abstract List<MapleDataDirectoryEntry> getSubdirectories();

  public abstract List<MapleDataFileEntry> getFiles();

  public abstract MapleDataEntry getEntry(String paramString);
}

/* Location:           E:\maoxiandaodanji\dist\cherry.jar
 * Qualified Name:     net.sf.cherry.provider.MapleDataDirectoryEntry
 * JD-Core Version:    0.6.0
 */