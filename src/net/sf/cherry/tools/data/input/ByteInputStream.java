package net.sf.cherry.tools.data.input;

public interface ByteInputStream {
  int readByte();

  long getBytesRead();

  long available();
}