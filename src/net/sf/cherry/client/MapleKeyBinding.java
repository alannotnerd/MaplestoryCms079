 package net.sf.cherry.client;
 
 public class MapleKeyBinding
 {
   private int type;
   private int action;
 
   public MapleKeyBinding(int type, int action)
   {
     this.type = type;
     this.action = action;
   }
 
   public int getType() {
     return this.type;
   }
 
   public int getAction() {
     return this.action;
   }
 }

/* Location:           E:\maoxiandaodanji\dist\cherry.jar
 * Qualified Name:     net.sf.cherry.client.MapleKeyBinding
 * JD-Core Version:    0.6.0
 */