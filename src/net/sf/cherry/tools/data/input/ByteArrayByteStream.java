package net.sf.cherry.tools.data.input;

import java.io.IOException;

import net.sf.cherry.tools.HexTool;

public class ByteArrayByteStream
        implements SeekableInputStreamBytestream {

    private int pos = 0;
    private long bytesRead = 0L;
    private byte[] arr;

    public ByteArrayByteStream(byte[] arr) {
        this.arr = arr;
    }

    public long getPosition() {
        return this.pos;
    }

    public void seek(long offset)
            throws IOException {
        this.pos = (int) offset;
    }

    public long getBytesRead() {
        return this.bytesRead;
    }

    public int readByte() {
        this.bytesRead += 1L;
        return this.arr[(this.pos++)] & 0xFF;
    }

    public String toString() {
        String nows = "";
        if (this.arr.length - this.pos > 0) {
            byte[] now = new byte[this.arr.length - this.pos];
            System.arraycopy(this.arr, this.pos, now, 0, this.arr.length - this.pos);
            nows = HexTool.toString(now);
        }
        return "All: " + HexTool.toString(this.arr) + "\nNow: " + nows;
    }

    public long available() {
        return this.arr.length - this.pos;
    }
}

/* Location:           E:\maoxiandaodanji\dist\cherry.jar
 * Qualified Name:     net.sf.cherry.tools.data.input.ByteArrayByteStream
 * JD-Core Version:    0.6.0
 */