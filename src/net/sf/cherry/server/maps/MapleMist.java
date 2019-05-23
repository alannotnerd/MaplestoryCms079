 package net.sf.cherry.server.maps;
 
 import java.awt.Point;
import java.awt.Rectangle;

import net.sf.cherry.client.ISkill;
import net.sf.cherry.client.MapleCharacter;
import net.sf.cherry.client.MapleClient;
import net.sf.cherry.client.SkillFactory;
import net.sf.cherry.net.MaplePacket;
import net.sf.cherry.server.MapleStatEffect;
import net.sf.cherry.server.life.MapleMonster;
import net.sf.cherry.tools.MaplePacketCreator;
 
 public class MapleMist extends AbstractMapleMapObject
 {
   private Rectangle mistPosition;
   private MapleCharacter owner;
   private MapleMonster mobowner;
   private MapleStatEffect source;
   private boolean isPoison = false;
   private boolean isMobMist = false;
 
   public MapleMist(Rectangle mistPosition, MapleCharacter owner, MapleStatEffect source) {
     this.mistPosition = mistPosition;
     this.owner = owner;
     this.source = source;
     this.isMobMist = false;
     this.isPoison = (source.getSourceId() == 2111003);
   }
 
   public MapleMist(Rectangle mistPosition, MapleMonster owner, MapleStatEffect source) {
     this.mistPosition = mistPosition;
     this.mobowner = owner;
     this.source = source;
     this.isMobMist = true;
     this.isPoison = true;
   }
 
   public MapleMapObjectType getType()
   {
     return MapleMapObjectType.MIST;
   }
 
   public Point getPosition()
   {
     return this.mistPosition.getLocation();
   }
 
   public MapleCharacter getOwner() {
     return this.owner;
   }
 
   public MapleMonster getMobOwner() {
     return this.mobowner;
   }
 
   public ISkill getSourceSkill() {
     return SkillFactory.getSkill(this.source.getSourceId());
   }
 
   public Rectangle getBox() {
     return this.mistPosition;
   }
 
   public boolean isPoison() {
     return this.isPoison;
   }
 
   public void setPoison(boolean poison) {
     this.isPoison = poison;
   }
 
   public boolean isMobMist() {
     return this.isMobMist;
   }
 
   public void setMobMist(boolean tf) {
     this.isMobMist = tf;
   }
 
   public void setPosition(Point position)
   {
     throw new UnsupportedOperationException();
   }
 
   public MaplePacket makeDestroyData() {
     return MaplePacketCreator.removeMist(getObjectId());
   }
 
   public void sendDestroyData(MapleClient client)
   {
     client.getSession().write(makeDestroyData());
   }
 
   public MaplePacket makeSpawnData() {
     if (this.owner != null) {
       return MaplePacketCreator.spawnMist(this);
     }
     return MaplePacketCreator.spawnMist(this);
   }
 
   public MaplePacket makeFakeSpawnData(int level) {
     if (this.owner != null) {
       return MaplePacketCreator.spawnMist(this);
     }
     return MaplePacketCreator.spawnMist(this);
   }
 
   public void sendSpawnData(MapleClient client)
   {
     client.getSession().write(makeSpawnData());
   }
 
   public boolean makeChanceResult() {
     return this.source.makeChanceResult();
   }
 
   public int getSourceId() {
     return this.source.getSourceId();
   }
 }

/* Location:           E:\maoxiandaodanji\dist\cherry.jar
 * Qualified Name:     net.sf.cherry.server.maps.MapleMist
 * JD-Core Version:    0.6.0
 */