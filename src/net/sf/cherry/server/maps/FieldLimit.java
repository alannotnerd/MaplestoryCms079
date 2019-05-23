 package net.sf.cherry.server.maps;
 
 import net.sf.cherry.net.LongValueHolder;
 
 public enum FieldLimit
   implements LongValueHolder
 {
   JUMP(1L), 
   MOVEMENTSKILLS(2L), 
   SUMMON(4L), 
   DOOR(8L), 
   CHANGECHANNEL(16L), 
   CANNOTVIPROCK(64L), 
   CANNOTMINIGAME(128L), 
 
   CANNOTUSEMOUNTS(512L), 
 
   CANNOTUSEPOTION(4096L), 
 
   CANNOTJUMPDOWN(131072L);
 
   private long i;
 
   private FieldLimit(long i) { this.i = i;
   }
 
   public long getValue()
   {
     return this.i;
   }
 
   public boolean check(int fieldlimit) {
     return (fieldlimit & this.i) == this.i;
   }
 }

/* Location:           E:\maoxiandaodanji\dist\cherry.jar
 * Qualified Name:     net.sf.cherry.server.maps.FieldLimit
 * JD-Core Version:    0.6.0
 */