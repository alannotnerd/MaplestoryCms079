 package net.sf.cherry.server.maps;
 
 import java.awt.Point;

import net.sf.cherry.client.MapleCharacter;
import net.sf.cherry.client.MapleClient;
import net.sf.cherry.client.SkillFactory;
import net.sf.cherry.tools.MaplePacketCreator;
 
 public class MapleSummon extends AbstractAnimatedMapleMapObject
 {
   private MapleCharacter owner;
   private int skillLevel;
   private int skill;
   private int hp;
   private SummonMovementType movementType;
 
   public MapleSummon(MapleCharacter owner, int skill, Point pos, SummonMovementType movementType)
   {
     this.owner = owner;
     this.skill = skill;
     this.skillLevel = owner.getSkillLevel(SkillFactory.getSkill(skill));
     if (this.skillLevel == 0) {
       throw new RuntimeException("Trying to create a summon for a char without the skill");
     }
     this.movementType = movementType;
     setPosition(pos);
   }
 
   public void sendSpawnData(MapleClient client) {
     client.getSession().write(MaplePacketCreator.spawnSpecialMapObject(this, this.skillLevel, false));
   }
 
   public void sendDestroyData(MapleClient client) {
     client.getSession().write(MaplePacketCreator.removeSpecialMapObject(this, true));
   }
 
   public MapleCharacter getOwner() {
     return this.owner;
   }
 
   public int getSkill() {
     return this.skill;
   }
 
   public int getHP() {
     return this.hp;
   }
 
   public void addHP(int delta) {
     this.hp += delta;
   }
 
   public SummonMovementType getMovementType() {
     return this.movementType;
   }
 
   public boolean isPuppet() {
     return (this.skill == 3111002) || (this.skill == 3211002) || (this.skill == 5211001) || (this.skill == 13111004);
   }
 
   public boolean isSummon() {
     return (this.skill == 2311006) || (this.skill == 2321003) || (this.skill == 2121005) || (this.skill == 2221005) || (this.skill == 5211002);
   }
 
   public int getSkillLevel() {
     return this.skillLevel;
   }
 
   public MapleMapObjectType getType()
   {
     return MapleMapObjectType.SUMMON;
   }
 }

/* Location:           E:\maoxiandaodanji\dist\cherry.jar
 * Qualified Name:     net.sf.cherry.server.maps.MapleSummon
 * JD-Core Version:    0.6.0
 */