 package net.sf.cherry.server.maps;
 
 import java.awt.Point;
import java.util.ArrayList;
import java.util.Collections;
import java.util.Comparator;
import java.util.List;

import net.sf.cherry.client.MapleCharacter;
import net.sf.cherry.client.MapleClient;
import net.sf.cherry.net.world.MaplePartyCharacter;
import net.sf.cherry.server.MaplePortal;
import net.sf.cherry.tools.MaplePacketCreator;
 
 public class MapleDoor extends AbstractMapleMapObject
 {
   private MapleCharacter owner;
   private MapleMap town;
   private MaplePortal townPortal;
   private MapleMap target;
   private Point targetPosition;
 
   public MapleDoor(MapleCharacter owner, Point targetPosition)
   {
     this.owner = owner; //任务
     this.target = owner.getMap(); //人物地图
     this.targetPosition = targetPosition; //目标位置
     setPosition(this.targetPosition);//定义位置
     this.town = this.target.getReturnMap(); //小镇
     this.townPortal = getFreePortal();//小镇以外
   }
 
   public MapleDoor(MapleDoor origDoor)
   {
     this.owner = origDoor.owner;//人物
     this.town = origDoor.town; //任务地图
     this.townPortal = origDoor.townPortal; //城市门户
     this.target = origDoor.target;//目标
     this.targetPosition = origDoor.targetPosition; //关闭的门
     this.townPortal = origDoor.townPortal;//城市门户
     setPosition(this.townPortal.getPosition());
   }
 
   private MaplePortal getFreePortal() {
     List<MaplePortal> freePortals = new ArrayList();
 
     for (MaplePortal port : this.town.getPortals()) {
       if (port.getType() == 6) {
         freePortals.add(port);
       }
     }
      Collections.sort(freePortals, new Comparator<MaplePortal>() {

            public int compare(MaplePortal o1, MaplePortal o2) {
                if (o1.getId() < o2.getId()) {
                    return -1;
                } else if (o1.getId() == o2.getId()) {
                    return 0;
                } else {
                    return 1;
                }
            }
     });
     for (MapleMapObject obj : this.town.getMapObjects()) {
       if ((obj instanceof MapleDoor)) {
         MapleDoor door = (MapleDoor)obj;
         if ((door.getOwner().getParty() != null) && (this.owner.getParty().containsMember(new MaplePartyCharacter(door.getOwner()))))
         {
           freePortals.remove(door.getTownPortal());
         }
       }
     }
     return (MaplePortal)freePortals.iterator().next();
   }
 
   public void sendSpawnData(MapleClient client) {
     if ((this.target.getId() == client.getPlayer().getMapId()) || ((this.owner == client.getPlayer()) && (this.owner.getParty() == null))) {
     //  client.getSession().write(MaplePacketCreator.spawnDoor(this.owner.getId(), this.target.getId() == client.getPlayer().getMapId() ? this.townPortal.getPosition() : this.targetPosition, true));
     client.getSession().write(MaplePacketCreator.spawnDoor(this.owner.getId(), this.target.getId() == client.getPlayer().getMapId() ? this.targetPosition : this.townPortal.getPosition(), true));
       if ((this.owner.getParty() != null) && ((this.owner == client.getPlayer()) || (this.owner.getParty().containsMember(new MaplePartyCharacter(client.getPlayer()))))) {
         client.getSession().write(MaplePacketCreator.partyPortal(this.town.getId(), this.target.getId(), this.targetPosition));//town

       }
       client.getSession().write(MaplePacketCreator.spawnPortal(this.town.getId(), this.target.getId(), this.targetPosition));
     }
   }
 
   public void sendDestroyData(MapleClient client) {
     if ((this.target.getId() == client.getPlayer().getMapId()) || (this.owner == client.getPlayer()) || ((this.owner.getParty() != null) && (this.owner.getParty().containsMember(new MaplePartyCharacter(client.getPlayer()))))) {
       if ((this.owner.getParty() != null) && ((this.owner == client.getPlayer()) || (this.owner.getParty().containsMember(new MaplePartyCharacter(client.getPlayer()))))) {
         client.getSession().write(MaplePacketCreator.partyPortal(999999999, 999999999, new Point(-1, -1)));
       }
       client.getSession().write(MaplePacketCreator.removeDoor1(this.owner.getId(), false));
       client.getSession().write(MaplePacketCreator.removeDoor(this.owner.getId(), true));
     }
   }
 
   public void warp(MapleCharacter chr, boolean toTown) {
     if ((chr == this.owner) || ((this.owner.getParty() != null) && (this.owner.getParty().containsMember(new MaplePartyCharacter(chr))))) {
       if (!toTown) {
         if ((!chr.getMap().canExit()) && (!chr.isGM())) {
           chr.getClient().getSession().write(MaplePacketCreator.serverNotice(5, "You are not allowed to exit this map."));
           chr.getClient().getSession().write(MaplePacketCreator.enableActions());
           return;
         }
         if ((!this.target.canEnter()) && (!chr.isGM())) {
           chr.getClient().getSession().write(MaplePacketCreator.serverNotice(5, "你不被允许进入 " + this.target.getStreetName() + " : " + this.target.getMapName()));
           chr.getClient().getSession().write(MaplePacketCreator.enableActions());
           return;
         }
         chr.changeMap(this.target, this.targetPosition); //目标位置
       } else {
         if ((!chr.getMap().canExit()) && (!chr.isGM())) {
           chr.getClient().getSession().write(MaplePacketCreator.serverNotice(5, "你不能退出这地图."));
           chr.getClient().getSession().write(MaplePacketCreator.enableActions());
           return;
         }
         if ((!this.town.canEnter()) && (!chr.isGM())) {
           chr.getClient().getSession().write(MaplePacketCreator.serverNotice(5, "你不被允许进入 " + this.town.getStreetName() + " : " + this.town.getMapName()));
           chr.getClient().getSession().write(MaplePacketCreator.enableActions());
           return;
         }
         chr.changeMap(this.town, this.townPortal);
       }
     }
     else chr.getClient().getSession().write(MaplePacketCreator.enableActions());
   }
 
   public MapleCharacter getOwner() //门主
   {
     return this.owner;
   }
 
   public MapleMap getTown() { //城市
     return this.town;
   }
 
   public MaplePortal getTownPortal() {//得到回城
     return this.townPortal;
   }
 
   public MapleMap getTarget() { //目标
     return this.target;
   }
 
   public Point getTargetPosition() { //获取目标的位置
     return this.targetPosition;
   }
 
   public MapleMapObjectType getType()
   {
     return MapleMapObjectType.DOOR;
   }
 }

/* Location:           E:\maoxiandaodanji\dist\cherry.jar
 * Qualified Name:     net.sf.cherry.server.maps.MapleDoor
 * JD-Core Version:    0.6.0
 */