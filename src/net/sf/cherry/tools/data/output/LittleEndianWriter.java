package net.sf.cherry.tools.data.output;

public abstract interface LittleEndianWriter
{
  public abstract void write(byte[] paramArrayOfByte);

  public abstract void write(byte paramByte);

  public abstract void write(int paramInt);

  public abstract void writeInt(int paramInt);

  public abstract void writeShort(int paramInt);

  public abstract void writeLong(long paramLong);

  public abstract void writeAsciiString(String paramString);

  public abstract void writeNullTerminatedAsciiString(String paramString);

  public abstract void writeMapleAsciiString(String paramString);
}

/* Location:           E:\maoxiandaodanji\dist\cherry.jar
 * Qualified Name:     net.sf.cherry.tools.data.output.LittleEndianWriter
 * JD-Core Version:    0.6.0
 */