 package net.sf.cherry.client;
 
 public class PetCommand
 {
   private int petId;
   private int skillId;
   private int prob;
   private int inc;
 
   public PetCommand(int petId, int skillId, int prob, int inc)
   {
     this.petId = petId;
     this.skillId = skillId;
     this.prob = prob;
     this.inc = inc;
   }
 
   public int getPetId() {
     return this.petId;
   }
 
   public int getSkillId() {
     return this.skillId;
   }
 
   public int getProbability() {
     return this.prob;
   }
 
   public int getIncrease() {
     return this.inc;
   }
 }

/* Location:           E:\maoxiandaodanji\dist\cherry.jar
 * Qualified Name:     net.sf.cherry.client.PetCommand
 * JD-Core Version:    0.6.0
 */