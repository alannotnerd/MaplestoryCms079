package net.sf.cherry.tools.data.input;

import java.io.IOException;

public interface SeekableInputStreamBytestream extends ByteInputStream {
  void seek(long paramLong)
      throws IOException;

  long getPosition()
      throws IOException;
}

/* Location:           E:\maoxiandaodanji\dist\cherry.jar
 * Qualified Name:     net.sf.cherry.tools.data.input.SeekableInputStreamBytestream
 * JD-Core Version:    0.6.0
 */