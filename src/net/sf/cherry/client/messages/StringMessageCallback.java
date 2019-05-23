 package net.sf.cherry.client.messages;
 
 public class StringMessageCallback
   implements MessageCallback
 {
   StringBuilder ret = new StringBuilder();
 
   public void dropMessage(String message)
   {
     this.ret.append(message);
     this.ret.append("\n");
   }
 
   public String toString()
   {
     return this.ret.toString();
   }
 }

/* Location:           E:\maoxiandaodanji\dist\cherry.jar
 * Qualified Name:     net.sf.cherry.client.messages.StringMessageCallback
 * JD-Core Version:    0.6.0
 */