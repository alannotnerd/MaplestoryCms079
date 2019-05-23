 package net.sf.cherry.net.world;
 
 import java.io.Serializable;
 
 public class PlayerCoolDownValueHolder
   implements Serializable
 {
   static final long serialVersionUID = 9179541993413738569L;
   public int skillId;
   public long startTime;
   public long length;
   private int id;
 
   public PlayerCoolDownValueHolder(int skillId, long startTime, long length)
   {
     this.skillId = skillId;
     this.startTime = startTime;
     this.length = length;
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
     PlayerCoolDownValueHolder other = (PlayerCoolDownValueHolder)obj;
 
     return this.id == other.id;
   }
 }

/* Location:           E:\maoxiandaodanji\dist\cherry.jar
 * Qualified Name:     net.sf.cherry.net.world.PlayerCoolDownValueHolder
 * JD-Core Version:    0.6.0
 */