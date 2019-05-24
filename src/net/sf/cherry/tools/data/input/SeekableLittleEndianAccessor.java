package net.sf.cherry.tools.data.input;

public interface SeekableLittleEndianAccessor extends LittleEndianAccessor {
  void seek(long paramLong);

  long getPosition();
}

/* Location:           E:\maoxiandaodanji\dist\cherry.jar
 * Qualified Name:     net.sf.cherry.tools.data.input.SeekableLittleEndianAccessor
 * JD-Core Version:    0.6.0
 */