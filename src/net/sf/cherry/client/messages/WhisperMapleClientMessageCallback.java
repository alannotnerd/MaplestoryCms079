 package net.sf.cherry.client.messages;
 
 import net.sf.cherry.client.MapleClient;
import net.sf.cherry.tools.MaplePacketCreator;
 
 public class WhisperMapleClientMessageCallback
   implements MessageCallback
 {
   private MapleClient client;
   private String whisperfrom;
 
   public WhisperMapleClientMessageCallback(String whisperfrom, MapleClient client)
   {
     this.whisperfrom = whisperfrom;
     this.client = client;
   }
 
   public void dropMessage(String message)
   {
     this.client.getSession().write(MaplePacketCreator.getWhisper(this.whisperfrom, this.client.getChannel(), message));
   }
 }

/* Location:           E:\maoxiandaodanji\dist\cherry.jar
 * Qualified Name:     net.sf.cherry.client.messages.WhisperMapleClientMessageCallback
 * JD-Core Version:    0.6.0
 */