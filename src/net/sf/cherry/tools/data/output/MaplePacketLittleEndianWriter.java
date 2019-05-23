 package net.sf.cherry.tools.data.output;
 
 import java.io.ByteArrayOutputStream;

import net.sf.cherry.net.ByteArrayMaplePacket;
import net.sf.cherry.net.MaplePacket;
import net.sf.cherry.tools.HexTool;
 
 public class MaplePacketLittleEndianWriter extends GenericLittleEndianWriter
 {
   private ByteArrayOutputStream baos;
 
   public MaplePacketLittleEndianWriter()
   {
     this(32);
   }
 
   public MaplePacketLittleEndianWriter(int size)
   {
     this.baos = new ByteArrayOutputStream(size);
     setByteOutputStream(new BAOSByteOutputStream(this.baos));
   }
 
   public MaplePacket getPacket()
   {
     return new ByteArrayMaplePacket(this.baos.toByteArray());
   }
 
   public String toString()
   {
     return HexTool.toString(this.baos.toByteArray());
   }
 }

/* Location:           E:\maoxiandaodanji\dist\cherry.jar
 * Qualified Name:     net.sf.cherry.tools.data.output.MaplePacketLittleEndianWriter
 * JD-Core Version:    0.6.0
 */