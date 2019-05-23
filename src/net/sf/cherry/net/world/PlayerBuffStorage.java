 package net.sf.cherry.net.world;
 
 import java.io.Serializable;
import java.util.ArrayList;
import java.util.List;

import net.sf.cherry.tools.Pair;
 
 public class PlayerBuffStorage
   implements Serializable
 {
   private List<Pair<Integer, List<PlayerBuffValueHolder>>> buffs = new ArrayList();
   private int id = (int)(Math.random() * 100.0D);
 
   public void addBuffsToStorage(int chrid, List<PlayerBuffValueHolder> toStore) {
     for (Pair stored : this.buffs) {
       if (stored.getLeft() == Integer.valueOf(chrid)) {
         this.buffs.remove(stored);
       }
     }
     this.buffs.add(new Pair(Integer.valueOf(chrid), toStore));
   }
 
   public List<PlayerBuffValueHolder> getBuffsFromStorage(int chrid) {
     List ret = null;
 
     for (int i = 0; i < this.buffs.size(); i++) {
       Pair stored = (Pair)this.buffs.get(i);
       if (((Integer)stored.getLeft()).equals(Integer.valueOf(chrid))) {
         ret = (List)stored.getRight();
         this.buffs.remove(stored);
       }
     }
     return ret;
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
     PlayerBuffStorage other = (PlayerBuffStorage)obj;
 
     return this.id == other.id;
   }
 }

/* Location:           E:\maoxiandaodanji\dist\cherry.jar
 * Qualified Name:     net.sf.cherry.net.world.PlayerBuffStorage
 * JD-Core Version:    0.6.0
 */