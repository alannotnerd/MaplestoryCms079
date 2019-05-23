package net.sf.cherry.tools.data.input;

public abstract interface SeekableLittleEndianAccessor extends LittleEndianAccessor
{
  public abstract void seek(long paramLong);

  public abstract long getPosition();
}

/* Location:           E:\maoxiandaodanji\dist\cherry.jar
 * Qualified Name:     net.sf.cherry.tools.data.input.SeekableLittleEndianAccessor
 * JD-Core Version:    0.6.0
 */