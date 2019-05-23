 package net.sf.cherry.tools.data.output;
 
 import org.apache.mina.common.ByteBuffer;
 
 public class ByteBufferOutputstream
   implements ByteOutputStream
 {
   private ByteBuffer bb;
 
   public ByteBufferOutputstream(ByteBuffer bb)
   {
     this.bb = bb;
   }
 
   public void writeByte(byte b)
   {
     this.bb.put(b);
   }
 }

/* Location:           E:\maoxiandaodanji\dist\cherry.jar
 * Qualified Name:     net.sf.cherry.tools.data.output.ByteBufferOutputstream
 * JD-Core Version:    0.6.0
 */