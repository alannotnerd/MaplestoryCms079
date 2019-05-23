 package net.sf.cherry.tools.data.input;
 
 import java.io.IOException;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

 public class GenericSeekableLittleEndianAccessor extends GenericLittleEndianAccessor
   implements SeekableLittleEndianAccessor
 {
   private static Logger log = LoggerFactory.getLogger(GenericSeekableLittleEndianAccessor.class);
   private SeekableInputStreamBytestream bs;
 
   public GenericSeekableLittleEndianAccessor(SeekableInputStreamBytestream bs)
   {
     super(bs);
     this.bs = bs;
   }
 
   public void seek(long offset)
   {
     try
     {
       this.bs.seek(offset);
     } catch (IOException e) {
       log.error("Seek failed", e);
     }
   }
 
   public long getPosition()
   {
     try
     {
       return this.bs.getPosition();
     } catch (IOException e) {
       log.error("getPosition failed", e);
     }return -1L;
   }
 
   public void skip(int num)
   {
     seek(getPosition() + num);
   }
 }

/* Location:           E:\maoxiandaodanji\dist\cherry.jar
 * Qualified Name:     net.sf.cherry.tools.data.input.GenericSeekableLittleEndianAccessor
 * JD-Core Version:    0.6.0
 */