package net.sf.cherry.provider;

public abstract interface MapleDataEntry extends MapleDataEntity
{
  public abstract String getName();

  public abstract int getSize();

  public abstract int getChecksum();

  public abstract int getOffset();
}

/* Location:           E:\maoxiandaodanji\dist\cherry.jar
 * Qualified Name:     net.sf.cherry.provider.MapleDataEntry
 * JD-Core Version:    0.6.0
 */