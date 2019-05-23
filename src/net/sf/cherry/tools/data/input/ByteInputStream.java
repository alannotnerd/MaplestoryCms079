package net.sf.cherry.tools.data.input;

public abstract interface ByteInputStream
{
  public abstract int readByte();

  public abstract long getBytesRead();

  public abstract long available();
}