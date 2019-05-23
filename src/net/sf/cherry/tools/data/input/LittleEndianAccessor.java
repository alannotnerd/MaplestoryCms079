package net.sf.cherry.tools.data.input;

import java.awt.Point;

public abstract interface LittleEndianAccessor
{
  public abstract byte readByte();

  public abstract char readChar();

  public abstract short readShort();

  public abstract int readInt();

  public abstract long readLong();

  public abstract void skip(int paramInt);

  public abstract byte[] read(int paramInt);

  public abstract float readFloat();

  public abstract double readDouble();

  public abstract String readAsciiString(int paramInt);

  public abstract String readNullTerminatedAsciiString();

  public abstract String readMapleAsciiString();

  public abstract long getBytesRead();

  public abstract long available();

  public Point readPos();
}

/* Location:           E:\maoxiandaodanji\dist\cherry.jar
 * Qualified Name:     net.sf.cherry.tools.data.input.LittleEndianAccessor
 * JD-Core Version:    0.6.0
 */