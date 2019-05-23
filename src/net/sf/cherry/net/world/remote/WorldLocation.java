 package net.sf.cherry.net.world.remote;
 
 import java.io.Serializable;
 
 public class WorldLocation
   implements Serializable
 {
   private static final long serialVersionUID = 2226165329466413678L;
   public int map;
   public int channel;
 
   public WorldLocation(int map, int channel)
   {
     this.map = map;
     this.channel = channel;
   }
 }

/* Location:           E:\maoxiandaodanji\dist\cherry.jar
 * Qualified Name:     net.sf.cherry.net.world.remote.WorldLocation
 * JD-Core Version:    0.6.0
 */