 package net.sf.cherry.tools.data.output;
 
 import java.nio.charset.Charset;
 
 public class GenericLittleEndianWriter
   implements LittleEndianWriter
 {
   private static Charset ASCII = Charset.forName("GBK");
   private ByteOutputStream bos;
 
   protected GenericLittleEndianWriter()
   {
   }
 
   protected void setByteOutputStream(ByteOutputStream bos)
   {
     this.bos = bos;
   }
 
   public GenericLittleEndianWriter(ByteOutputStream bos)
   {
     this.bos = bos;
   }
 
   public void write(byte[] b)
   {
     for (int x = 0; x < b.length; x++)
       this.bos.writeByte(b[x]);
   }
 
   public void write(byte b)
   {
     this.bos.writeByte(b);
   }
 
   public void write(int b)
   {
     this.bos.writeByte((byte)b);
   }
 
   public void writeShort(int i)
   {
     this.bos.writeByte((byte)(i & 0xFF));
     this.bos.writeByte((byte)(i >>> 8 & 0xFF));
   }
 
   public void writeInt(int i)
   {
     this.bos.writeByte((byte)(i & 0xFF));
     this.bos.writeByte((byte)(i >>> 8 & 0xFF));
     this.bos.writeByte((byte)(i >>> 16 & 0xFF));
     this.bos.writeByte((byte)(i >>> 24 & 0xFF));
   }
 
   public void writeAsciiString(String s)
   {
     write(s.getBytes(ASCII));
   }
 
   public void writeMapleAsciiString(String s)
   {
     writeShort((short)s.getBytes(ASCII).length);
     writeAsciiString(s);
   }
 
   public void writeMapleNameString(String s) {
     if (s.getBytes(ASCII).length > 12) {
       s = s.substring(0, 12);
     }
     writeAsciiString(s);
     for (int x = s.getBytes(ASCII).length; x < 12; x++)
       write(0);
   }
 
   public void writeNullTerminatedAsciiString(String s)
   {
     writeAsciiString(s);
     write(0);
   }
 
   public void writeLong(long l)
   {
     this.bos.writeByte((byte)(int)(l & 0xFF));
     this.bos.writeByte((byte)(int)(l >>> 8 & 0xFF));
     this.bos.writeByte((byte)(int)(l >>> 16 & 0xFF));
     this.bos.writeByte((byte)(int)(l >>> 24 & 0xFF));
     this.bos.writeByte((byte)(int)(l >>> 32 & 0xFF));
     this.bos.writeByte((byte)(int)(l >>> 40 & 0xFF));
     this.bos.writeByte((byte)(int)(l >>> 48 & 0xFF));
     this.bos.writeByte((byte)(int)(l >>> 56 & 0xFF));
   }
 }

/* Location:           E:\maoxiandaodanji\dist\cherry.jar
 * Qualified Name:     net.sf.cherry.tools.data.output.GenericLittleEndianWriter
 * JD-Core Version:    0.6.0
 */