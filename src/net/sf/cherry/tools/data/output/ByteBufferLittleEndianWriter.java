 package net.sf.cherry.tools.data.output;
 
 import org.apache.mina.common.ByteBuffer;
 
 public class ByteBufferLittleEndianWriter extends GenericLittleEndianWriter
 {
   private ByteBuffer bb;
 
   public ByteBufferLittleEndianWriter()
   {
     this(200, true);
   }
 
   public ByteBufferLittleEndianWriter(int size)
   {
     this(size, false);
   }
 
   public ByteBufferLittleEndianWriter(int initialSize, boolean autoExpand)
   {
     this.bb = ByteBuffer.allocate(initialSize);
     this.bb.setAutoExpand(autoExpand);
     setByteOutputStream(new ByteBufferOutputstream(this.bb));
   }
 
   public ByteBuffer getFlippedBB()
   {
     return this.bb.flip();
   }
 
   public ByteBuffer getByteBuffer()
   {
     return this.bb;
   }
 }

/* Location:           E:\maoxiandaodanji\dist\cherry.jar
 * Qualified Name:     net.sf.cherry.tools.data.output.ByteBufferLittleEndianWriter
 * JD-Core Version:    0.6.0
 */