 package net.sf.cherry.net.login.handler;
 
 import java.io.IOException;
import java.io.RandomAccessFile;
import java.util.logging.Level;
import java.util.logging.Logger;

import constants.ServerConfig;
import net.sf.cherry.client.MapleClient;
import net.sf.cherry.net.MaplePacketHandler;
import net.sf.cherry.tools.data.input.SeekableLittleEndianAccessor;
 
 public class ErrorLogHandler
   implements MaplePacketHandler
 {
   public boolean validateState(MapleClient c)
   {
     return !c.isLoggedIn();
   }
 
   public void handlePacket(SeekableLittleEndianAccessor slea, MapleClient c)
   {
     String error = slea.readMapleAsciiString();
     try
     {
       RandomAccessFile file = new RandomAccessFile("c:\\error.txt", "rw");
       int num = (int)file.length();
       file.seek(num);
       file.writeBytes("\r\n");
       file.write("错误信息：\r\n".getBytes(ServerConfig.STRCHARSET));
       file.write((error + "\r\n").getBytes(ServerConfig.STRCHARSET));
       file.close();
     } catch (IOException ex) {
       Logger.getLogger(ErrorLogHandler.class.getName()).log(Level.SEVERE, null, ex);
     }
   }
 }

/* Location:           E:\maoxiandaodanji\dist\cherry.jar
 * Qualified Name:     net.sf.cherry.net.login.handler.ErrorLogHandler
 * JD-Core Version:    0.6.0
 */