 package net.sf.cherry.tools.data.input;
 
 import java.io.IOException;
import java.io.InputStream;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
 
 public class InputStreamByteStream
   implements ByteInputStream
 {
   private InputStream is;
   private long read = 0L;
   private static Logger log = LoggerFactory.getLogger(InputStreamByteStream.class);
 
   public InputStreamByteStream(InputStream is)
   {
     this.is = is;
   }
 
      public int readByte() {
        int temp;
        try {
            temp = is.read();
            if (temp == -1) {
                throw new RuntimeException("EOF");
            }
            read++;
            return temp;
        } catch (IOException e) {
            throw new RuntimeException(e);
        }
    }
 
   public long getBytesRead()
   {
     return this.read;
   }
 
   public long available()
   {
     try
     {
       return this.is.available();
     } catch (IOException e) {
       log.error("ERROR", e);
     }return 0L;
   }
 }




