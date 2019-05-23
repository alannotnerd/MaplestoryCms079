 package net.sf.cherry.net;
 
 import net.sf.cherry.tools.HexTool;
 
 public class ByteArrayMaplePacket
   implements MaplePacket
 {
   public static final long serialVersionUID = -7997681658570958848L;
   private byte[] data;
   private Runnable onSend;
 
   public ByteArrayMaplePacket(byte[] data)
   {
     this.data = data;
   }
 
   public byte[] getBytes()
   {
     return this.data;
   }
 
   public String toString()
   {
     return HexTool.toString(this.data);
   }
 
   public Runnable getOnSend() {
     return this.onSend;
   }
 
   public void setOnSend(Runnable onSend) {
     this.onSend = onSend;
   }
 }

/* Location:           E:\maoxiandaodanji\dist\cherry.jar
 * Qualified Name:     net.sf.cherry.net.ByteArrayMaplePacket
 * JD-Core Version:    0.6.0
 */