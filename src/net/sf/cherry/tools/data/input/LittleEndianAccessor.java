package net.sf.cherry.tools.data.input;

import java.awt.*;

public interface LittleEndianAccessor {
  byte readByte();

  char readChar();

  short readShort();

  int readInt();

  long readLong();

  void skip(int paramInt);

  byte[] read(int paramInt);

  float readFloat();

  double readDouble();

  String readAsciiString(int paramInt);

  String readNullTerminatedAsciiString();

  String readMapleAsciiString();

  long getBytesRead();

  long available();

  Point readPos();
}

/* Location:           E:\maoxiandaodanji\dist\cherry.jar
 * Qualified Name:     net.sf.cherry.tools.data.input.LittleEndianAccessor
 * JD-Core Version:    0.6.0
 */