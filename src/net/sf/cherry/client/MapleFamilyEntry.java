 package net.sf.cherry.client;
 
 public class MapleFamilyEntry
 {
   private int familyId;
   private MapleCharacter chr;
   private int rank;
   private int reputation;
   private int totalReputation;
   private int todaysRep;
   private int totalJuniors;
   private int juniors;
   private String familyName;
 
   public int getId()
   {
     return this.familyId;
   }
 
   public void setFamilyId(int familyId) {
     this.familyId = familyId;
   }
 
   public int getRank() {
     return this.rank;
   }
 
   public void setRank(int rank) {
     this.rank = rank;
   }
 
   public MapleCharacter getPlayer() {
     return this.chr;
   }
 
   public void setPlayer(MapleCharacter chr) {
     this.chr = chr;
   }
 
   public int getReputation() {
     return this.reputation;
   }
 
   public int getTodaysRep() {
     return this.todaysRep;
   }
 
   public void setReputation(int reputation) {
     this.reputation = reputation;
   }
 
   public void setTodaysRep(int today) {
     this.todaysRep = today;
   }
 
   public void gainReputation(int gain) {
     this.reputation += gain;
     this.totalReputation += gain;
   }
 
   public int getTotalJuniors() {
     return this.totalJuniors;
   }
 
   public void setTotalJuniors(int totalJuniors) {
     this.totalJuniors = totalJuniors;
   }
 
   public int getJuniors() {
     return this.juniors;
   }
 
   public void setJuniors(int juniors) {
     this.juniors = juniors;
   }
 
   public int getFamilyId() {
     return this.familyId;
   }
 
   public void setFamilyName(String familyName) {
     this.familyName = familyName;
   }
 
   public String getFamilyName() {
     return this.familyName;
   }
 
   public int getTotalReputation() {
     return this.totalReputation;
   }
 
   public void setTotalReputation(int totalReputation) {
     this.totalReputation = totalReputation;
   }
 }

/* Location:           E:\maoxiandaodanji\dist\cherry.jar
 * Qualified Name:     net.sf.cherry.client.MapleFamilyEntry
 * JD-Core Version:    0.6.0
 */