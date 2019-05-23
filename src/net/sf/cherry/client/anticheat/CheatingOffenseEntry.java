 package net.sf.cherry.client.anticheat;
 
 import net.sf.cherry.client.MapleCharacter;
 
 public class CheatingOffenseEntry
 {
   private CheatingOffense offense;
   private int count = 0;
   private MapleCharacter chrfor;
   private long lastOffense;
   private long firstOffense;
   private String param;
   private int dbid = -1;
 
   public CheatingOffenseEntry(CheatingOffense offense, MapleCharacter chrfor)
   {
     this.offense = offense;
     this.chrfor = chrfor;
     this.firstOffense = System.currentTimeMillis();
   }
 
   public CheatingOffense getOffense() {
     return this.offense;
   }
 
   public int getCount() {
     return this.count;
   }
 
   public MapleCharacter getChrfor() {
     return this.chrfor;
   }
 
   public void incrementCount() {
     this.count += 1;
     this.lastOffense = System.currentTimeMillis();
   }
 
   public boolean isExpired()
   {
     return this.lastOffense < System.currentTimeMillis() - this.offense.getValidityDuration();
   }
 
   public int getPoints()
   {
     return this.count * this.offense.getPoints();
   }
 
   public String getParam() {
     return this.param;
   }
 
   public void setParam(String param) {
     this.param = param;
   }
 
   public long getLastOffenseTime() {
     return this.lastOffense;
   }
 
   public int getDbId() {
     return this.dbid;
   }
 
   public void setDbId(int dbid) {
     this.dbid = dbid;
   }
 
   public int hashCode()
   {
     int prime = 31;
     int result = 1;
     result = 31 * result + (this.chrfor == null ? 0 : this.chrfor.getId());
     result = 31 * result + (this.offense == null ? 0 : this.offense.hashCode());
     result = 31 * result + Long.valueOf(this.firstOffense).hashCode();
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
     CheatingOffenseEntry other = (CheatingOffenseEntry)obj;
     if (this.chrfor == null) {
       if (other.chrfor != null)
         return false;
     }
     else if (this.chrfor.getId() != other.chrfor.getId()) {
       return false;
     }
     if (this.offense == null) {
       if (other.offense != null)
         return false;
     }
     else if (!this.offense.equals(other.offense)) {
       return false;
     }
 
     return other.firstOffense == this.firstOffense;
   }
 }

/* Location:           E:\maoxiandaodanji\dist\cherry.jar
 * Qualified Name:     net.sf.cherry.client.anticheat.CheatingOffenseEntry
 * JD-Core Version:    0.6.0
 */