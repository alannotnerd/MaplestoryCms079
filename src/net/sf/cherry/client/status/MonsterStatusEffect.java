 package net.sf.cherry.client.status;
 
 import java.util.Map;
import java.util.concurrent.ScheduledFuture;

import net.sf.cherry.client.ISkill;
import net.sf.cherry.tools.ArrayMap;
 
 public class MonsterStatusEffect
 {
   private Map<MonsterStatus, Integer> stati;
   private ISkill skill;
   private boolean monsterSkill;
   private ScheduledFuture<?> cancelTask;
   private ScheduledFuture<?> poisonSchedule;
 
   public MonsterStatusEffect(Map<MonsterStatus, Integer> stati, ISkill skillId, boolean monsterSkill)
   {
     this.stati = new ArrayMap(stati);
     this.skill = skillId;
     this.monsterSkill = monsterSkill;
   }
 
   public Map<MonsterStatus, Integer> getStati() {
     return this.stati;
   }
 
   public Integer setValue(MonsterStatus status, Integer newVal) {
     return (Integer)this.stati.put(status, newVal);
   }
 
   public ISkill getSkill() {
     return this.skill;
   }
 
   public boolean isMonsterSkill() {
     return this.monsterSkill;
   }
 
   public ScheduledFuture<?> getCancelTask() {
     return this.cancelTask;
   }
 
   public void setCancelTask(ScheduledFuture<?> cancelTask) {
     this.cancelTask = cancelTask;
   }
 
   public void removeActiveStatus(MonsterStatus stat) {
     this.stati.remove(stat);
   }
 
   public void setPoisonSchedule(ScheduledFuture<?> poisonSchedule) {
     this.poisonSchedule = poisonSchedule;
   }
 
   public void cancelPoisonSchedule() {
     if (this.poisonSchedule != null)
       this.poisonSchedule.cancel(false);
   }
 }

/* Location:           E:\maoxiandaodanji\dist\cherry.jar
 * Qualified Name:     net.sf.cherry.client.status.MonsterStatusEffect
 * JD-Core Version:    0.6.0
 */