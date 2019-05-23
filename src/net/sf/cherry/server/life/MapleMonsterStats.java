 package net.sf.cherry.server.life;
 
 import java.util.ArrayList;
import java.util.Collections;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import net.sf.cherry.tools.Pair;
 
 public class MapleMonsterStats
 {
   private int exp;
   private int hp;
   private int mp;
   private int level;
   private int removeAfter;
   private boolean boss;
   private boolean undead;
   private boolean ffaLoot;
   private String name;
   private Map<String, Integer> animationTimes = new HashMap();
   private Map<Element, ElementalEffectiveness> resistance = new HashMap();
   private List<Integer> revives = Collections.emptyList();
   private byte tagColor;
   private byte tagBgColor;
   private List<Pair<Integer, Integer>> skills = new ArrayList();
   private boolean firstAttack;
   private int buffToGive;
   private boolean explosive;
   private boolean friendly;
   private int dropItemPeriod;
   private MapleLifeFactory.BanishInfo banish;
   private byte selfDestruction_action;
   private int selfDestruction_hp;
 
   public int getExp()
   {
     return this.exp;
   }
 
   public void setExp(int exp) {
     this.exp = exp;
   }
 
   public int getHp() {
     return this.hp;
   }
 
   public void setHp(int hp) {
     this.hp = hp;
   }
 
   public int getMp() {
     return this.mp;
   }
 
   public void setMp(int mp) {
     this.mp = mp;
   }
 
   public int getLevel() {
     return this.level;
   }
 
   public void setLevel(int level) {
     this.level = level;
   }
 
   public int getRemoveAfter() {
     return this.removeAfter;
   }
 
   public void setRemoveAfter(int removeAfter) {
     this.removeAfter = removeAfter;
   }
 
   public void setBoss(boolean boss) {
     this.boss = boss;
   }
 
   public boolean isBoss() {
     return this.boss;
   }
 
   public void setFfaLoot(boolean ffaLoot) {
     this.ffaLoot = ffaLoot;
   }
 
   public boolean isFfaLoot() {
     return this.ffaLoot;
   }
 
   public void setAnimationTime(String name, int delay) {
     this.animationTimes.put(name, Integer.valueOf(delay));
   }
 
   public int getAnimationTime(String name) {
     Integer ret = (Integer)this.animationTimes.get(name);
     if (ret == null) {
       return 500;
     }
     return ret.intValue();
   }
 
   public MapleLifeFactory.BanishInfo getBanishInfo() {
     return this.banish;
   }
 
   public void setBanishInfo(MapleLifeFactory.BanishInfo banish) {
     this.banish = banish;
   }
 
   public boolean isMobile() {
     return (this.animationTimes.containsKey("move")) || (this.animationTimes.containsKey("fly"));
   }
 
   public List<Integer> getRevives() {
     return this.revives;
   }
 
   public void setRevives(List<Integer> revives) {
     this.revives = revives;
   }
 
   public void setUndead(boolean undead) {
     this.undead = undead;
   }
 
   public boolean getUndead() {
     return this.undead;
   }
 
   public void setEffectiveness(Element e, ElementalEffectiveness ee) {
     this.resistance.put(e, ee);
   }
 
   public void removeEffectiveness(Element e) {
     this.resistance.remove(e);
   }
 
   public ElementalEffectiveness getEffectiveness(Element e) {
     ElementalEffectiveness elementalEffectiveness = (ElementalEffectiveness)this.resistance.get(e);
     if (elementalEffectiveness == null) {
       return ElementalEffectiveness.NORMAL;
     }
     return elementalEffectiveness;
   }
 
   public String getName()
   {
     return this.name;
   }
 
   public void setName(String name) {
     this.name = name;
   }
 
   public byte getTagColor() {
     return this.tagColor;
   }
 
   public void setTagColor(int tagColor) {
     this.tagColor = (byte)tagColor;
   }
 
   public byte getTagBgColor() {
     return this.tagBgColor;
   }
 
   public void setTagBgColor(int tagBgColor) {
     this.tagBgColor = (byte)tagBgColor;
   }
 
   public void setSkills(List<Pair<Integer, Integer>> skills) {
     for (Pair skill : skills)
       this.skills.add(skill);
   }
 
   public List<Pair<Integer, Integer>> getSkills()
   {
     return Collections.unmodifiableList(this.skills);
   }
 
   public int getNoSkills() {
     return this.skills.size();
   }
 
   public boolean hasSkill(int skillId, int level) {
     for (Pair skill : this.skills) {
       if ((((Integer)skill.getLeft()).intValue() == skillId) && (((Integer)skill.getRight()).intValue() == level)) {
         return true;
       }
     }
     return false;
   }
 
   public void setFirstAttack(boolean firstAttack) {
     this.firstAttack = firstAttack;
   }
 
   public boolean isFirstAttack() {
     return this.firstAttack;
   }
 
   public void setBuffToGive(int buff) {
     this.buffToGive = buff;
   }
 
   public int getBuffToGive() {
     return this.buffToGive;
   }
 
   public void setExplosive(boolean set) {
     this.explosive = set;
   }
 
   public boolean isExplosive() {
     return this.explosive;
   }
   
   public int getDropItemPeriod() {
       return this.dropItemPeriod;
   }

   public void setDropItemPeriod(int d) {
       this.dropItemPeriod = d;
   }
   public void setFriendly(boolean set) {
	     this.friendly = set;
   }
 
   public boolean isFriendly() {
     return this.friendly;
   }
   
   public void setSelfD(byte selfDestruction_action) {
       this.selfDestruction_action = selfDestruction_action;
   }

   public byte getSelfD() {
       return this.selfDestruction_action;
   }

   public void setSelfDHP(int selfDestruction_hp) {
       this.selfDestruction_hp = selfDestruction_hp;
   }

   public int getSelfDHp() {
       return this.selfDestruction_hp;
   }
 }