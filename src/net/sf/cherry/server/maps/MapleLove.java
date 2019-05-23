 package net.sf.cherry.server.maps;
 
 import java.awt.Point;

import net.sf.cherry.client.MapleCharacter;
import net.sf.cherry.client.MapleClient;
import net.sf.cherry.net.MaplePacket;
import net.sf.cherry.tools.MaplePacketCreator;
 
 public class MapleLove extends AbstractMapleMapObject
 {
   private Point pos;
   private MapleCharacter owner;
   private String text;
   private int ft;
   private int itemid;
 
   public MapleLove(MapleCharacter owner, Point pos, int ft, String text, int itemid)
   {
     this.owner = owner;
     this.pos = pos;
     this.text = text;
     this.ft = ft;
     this.itemid = itemid;
   }
 
   public MapleMapObjectType getType()
   {
     return MapleMapObjectType.LOVE;
   }
 
   public Point getPosition()
   {
     return this.pos.getLocation();
   }
 
   public MapleCharacter getOwner() {
     return this.owner;
   }
 
   public void setPosition(Point position)
   {
     throw new UnsupportedOperationException();
   }
 
   public void sendDestroyData(MapleClient client)
   {
     client.getSession().write(makeDestroyData());
   }
 
   public void sendSpawnData(MapleClient client)
   {
     client.getSession().write(makeSpawnData());
   }
 
   public MaplePacket makeSpawnData() {
     return MaplePacketCreator.spawnLove(getObjectId(), this.itemid, this.owner.getName(), this.text, this.pos, this.ft);
   }
 
   public MaplePacket makeDestroyData() {
     return MaplePacketCreator.removeLove(getObjectId());
   }
 }

/* Location:           E:\maoxiandaodanji\dist\cherry.jar
 * Qualified Name:     net.sf.cherry.server.maps.MapleLove
 * JD-Core Version:    0.6.0
 */