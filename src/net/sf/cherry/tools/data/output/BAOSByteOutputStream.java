 package net.sf.cherry.tools.data.output;
 
 import java.io.ByteArrayOutputStream;
 
 public class BAOSByteOutputStream
   implements ByteOutputStream
 {
   private ByteArrayOutputStream baos;
 
   public BAOSByteOutputStream(ByteArrayOutputStream baos)
   {
     this.baos = baos;
   }
 
   public void writeByte(byte b)
   {
     this.baos.write(b);
   }
 }

/* Location:           E:\maoxiandaodanji\dist\cherry.jar
 * Qualified Name:     net.sf.cherry.tools.data.output.BAOSByteOutputStream
 * JD-Core Version:    0.6.0
 */