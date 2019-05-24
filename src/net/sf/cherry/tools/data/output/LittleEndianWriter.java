package net.sf.cherry.tools.data.output;

public interface LittleEndianWriter {
  void write(byte[] paramArrayOfByte);

  void write(byte paramByte);

  void write(int paramInt);

  void writeInt(int paramInt);

  void writeShort(int paramInt);

  void writeLong(long paramLong);

  void writeAsciiString(String paramString);

  void writeNullTerminatedAsciiString(String paramString);

  void writeMapleAsciiString(String paramString);
}

/* Location:           E:\maoxiandaodanji\dist\cherry.jar
 * Qualified Name:     net.sf.cherry.tools.data.output.LittleEndianWriter
 * JD-Core Version:    0.6.0
 */