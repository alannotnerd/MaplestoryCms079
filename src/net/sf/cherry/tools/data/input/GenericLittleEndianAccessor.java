package net.sf.cherry.tools.data.input;

import java.awt.Point;
import java.io.ByteArrayOutputStream;

public class GenericLittleEndianAccessor
        implements LittleEndianAccessor {

    private ByteInputStream bs;

    public GenericLittleEndianAccessor(ByteInputStream bs) {
        this.bs = bs;
    }

    public byte readByte() {
        return (byte) this.bs.readByte();
    }

    public int readInt() {
        int byte1 = this.bs.readByte();
        int byte2 = this.bs.readByte();
        int byte3 = this.bs.readByte();
        int byte4 = this.bs.readByte();
        return (byte4 << 24) + (byte3 << 16) + (byte2 << 8) + byte1;
    }

    public short readShort() {
        int byte1 = this.bs.readByte();
        int byte2 = this.bs.readByte();
        return (short) ((byte2 << 8) + byte1);
    }

    public char readChar() {
        return (char) readShort();
    }

    public long readLong() {
        long byte1 = this.bs.readByte();
        long byte2 = this.bs.readByte();
        long byte3 = this.bs.readByte();
        long byte4 = this.bs.readByte();
        long byte5 = this.bs.readByte();
        long byte6 = this.bs.readByte();
        long byte7 = this.bs.readByte();
        long byte8 = this.bs.readByte();

        return (byte8 << 56) + (byte7 << 48) + (byte6 << 40) + (byte5 << 32) + (byte4 << 24) + (byte3 << 16) + (byte2 << 8) + byte1;
    }

    public float readFloat() {
        return Float.intBitsToFloat(readInt());
    }

    public double readDouble() {
        return Double.longBitsToDouble(readLong());
    }

    public final String readAsciiString(int n) {
        byte[] ret = new byte[n];
        for (int x = 0; x < n; x++) {
            ret[x] = readByte();
        }
        try {
            String str = new String(ret, "gbk");
            return str;
        } catch (Exception e) {
            System.err.println(e);
        }
        return "";
    }

    public final String readNullTerminatedAsciiString() {
        ByteArrayOutputStream baos = new ByteArrayOutputStream();
        byte b = 1;
        while (b != 0) {
            b = readByte();
            baos.write(b);
        }
        byte[] buf = baos.toByteArray();
        char[] chrBuf = new char[buf.length];
        for (int x = 0; x < buf.length; x++) {
            chrBuf[x] = (char) buf[x];
        }
        return String.valueOf(chrBuf);
    }

    public long getBytesRead() {
        return this.bs.getBytesRead();
    }


    public Point readPos() {
        int x = readShort();
        int y = readShort();
        return new Point(x, y);
    }

    public String readMapleAsciiString() {
        return readAsciiString(readShort());
    }

    public byte[] read(int num) {
        byte[] ret = new byte[num];
        for (int x = 0; x < num; x++) {
            ret[x] = readByte();
        }
        return ret;
    }

    public void skip(int num) {
        for (int x = 0; x < num; x++) {
            readByte();
        }
    }

    public long available() {
        return this.bs.available();
    }

    public String toString() {
        return this.bs.toString();
    }
}

/* Location:           E:\maoxiandaodanji\dist\cherry.jar
 * Qualified Name:     net.sf.cherry.tools.data.input.GenericLittleEndianAccessor
 * JD-Core Version:    0.6.0
 */