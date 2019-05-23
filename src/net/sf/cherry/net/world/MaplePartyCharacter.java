 package net.sf.cherry.net.world;
 
 import java.awt.Point;
import java.io.Serializable;

import net.sf.cherry.client.MapleCharacter;
import net.sf.cherry.net.channel.ChannelServer;
import net.sf.cherry.server.maps.MapleDoor;
 
 public class MaplePartyCharacter
   implements Serializable
 {
   private static final long serialVersionUID = 6215463252132450750L;
   private String name;
   private int id;
   private int level;
   private int channel;
   private int jobid;
   private int mapid;
   private int gender;
   private int married;
   private int doorTown = 999999999;
   private int doorTarget = 999999999;
   private Point doorPosition = new Point(0, 0);
   private boolean online;
 
   public MaplePartyCharacter(MapleCharacter maplechar)
   {
     this.name = maplechar.getName();
     this.level = maplechar.getLevel();
     this.channel = maplechar.getClient().getChannel();
     this.id = maplechar.getId();
     this.jobid = maplechar.getJob().getId();
     this.mapid = maplechar.getMapId();
     this.online = true;
     this.gender = maplechar.getGender();
     this.married = maplechar.isMarried();
     if (maplechar.getDoors().size() > 0) {
       this.doorTown = ((MapleDoor)maplechar.getDoors().get(0)).getTown().getId();
       this.doorTarget = ((MapleDoor)maplechar.getDoors().get(0)).getTarget().getId();
       this.doorPosition = ((MapleDoor)maplechar.getDoors().get(0)).getTargetPosition();
     }
   }
 
   public MaplePartyCharacter() {
     this.name = "";
   }
 
   public MapleCharacter getPlayer() {
     return ChannelServer.getInstance(this.channel).getPlayerStorage().getCharacterById(this.id);
   }
 
   public int getLevel() {
     return this.level;
   }
 
   public int getChannel() {
     return this.channel;
   }
 
   public boolean isOnline() {
     return this.online;
   }
 
   public void setOnline(boolean online) {
     this.online = online;
   }
 
   public int getMapid() {
     return this.mapid;
   }
 
   public String getName() {
     return this.name;
   }
 
   public int getId() {
     return this.id;
   }
 
   public int getJobId() {
     return this.jobid;
   }
 
   public int getDoorTown() {
     return this.doorTown;
   }
 
   public int getDoorTarget() {
     return this.doorTarget;
   }
 
   public Point getDoorPosition() {
     return this.doorPosition;
   }
 
   public int getGender() {
     return this.gender;
   }
 
   public int isMarried() {
     return this.married;
   }
 
   public int hashCode()
   {
     int prime = 31;
     int result = 1;
     result = 31 * result + (this.name == null ? 0 : this.name.hashCode());
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
     MaplePartyCharacter other = (MaplePartyCharacter)obj;
     if (this.name == null) {
       if (other.name != null)
         return false;
     }
     else if (!this.name.equals(other.name)) {
       return false;
     }
     return true;
   }
 }

/* Location:           E:\maoxiandaodanji\dist\cherry.jar
 * Qualified Name:     net.sf.cherry.net.world.MaplePartyCharacter
 * JD-Core Version:    0.6.0
 */