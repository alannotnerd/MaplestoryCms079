 package net.sf.cherry.net.world;
 
 import java.io.Serializable;

import net.sf.cherry.server.MapleStatEffect;
 
 public class PlayerBuffValueHolder
   implements Serializable
 {
   static final long serialVersionUID = 9179541993413738569L;
   public long startTime;
   public MapleStatEffect effect;
   private int id;
 
   public PlayerBuffValueHolder(long startTime, MapleStatEffect effect)
   {
     this.startTime = startTime;
     this.effect = effect;
     this.id = (int)(Math.random() * 100.0D);
   }
 
   public int hashCode()
   {
     int prime = 31;
     int result = 1;
     result = 31 * result + this.id;
     return result;
   }
 
   public boolean equals(Object obj)
   {
     if (this == obj) {
       return true;
     }
     if (obj == null) {
       return false;
     }
     if (getClass() != obj.getClass()) {
       return false;
     }
     PlayerBuffValueHolder other = (PlayerBuffValueHolder)obj;
 
     return this.id == other.id;
   }
 }

/* Location:           E:\maoxiandaodanji\dist\cherry.jar
 * Qualified Name:     net.sf.cherry.net.world.PlayerBuffValueHolder
 * JD-Core Version:    0.6.0
 */