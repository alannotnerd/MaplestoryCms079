 package net.sf.cherry.tools.data.input;
 
 import java.io.IOException;
import java.io.RandomAccessFile;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
 
 public class RandomAccessByteStream
   implements SeekableInputStreamBytestream
 {
   private RandomAccessFile raf;
   private long read = 0L;
   private static Logger log = LoggerFactory.getLogger(RandomAccessByteStream.class);
 
   public RandomAccessByteStream(RandomAccessFile raf)
   {
     this.raf = raf;
   }
 
  public int readByte() {
        int temp;
        try {
            temp = raf.read();
            if (temp == -1) {
                throw new RuntimeException("EOF");
            }
            read++;
            return temp;
        } catch (IOException e) {
            throw new RuntimeException(e);
        }
    }
 
   public void seek(long offset)
     throws IOException
   {
     this.raf.seek(offset);
   }
 
   public long getPosition()
     throws IOException
   {
     return this.raf.getFilePointer();
   }
 
   public long getBytesRead()
   {
     return this.read;
   }
 
   public long available()
   {
     try
     {
       return this.raf.length() - this.raf.getFilePointer();
     } catch (IOException e) {
       log.error("ERROR", e);
     }return 0L;
   }
 }




