 package net.sf.cherry.net.world;
 
 import java.io.Serializable;

import net.sf.cherry.client.MapleCharacter;
 
 public class MapleMessengerCharacter
   implements Serializable
 {
   private static final long serialVersionUID = 6215463252132450750L;
   private String name;
   private int id;
   private int channel;
   private boolean online;
   private int position;
 
   public MapleMessengerCharacter(MapleCharacter maplechar)
   {
     this.name = maplechar.getName();
     this.channel = maplechar.getClient().getChannel();
     this.id = maplechar.getId();
     this.online = true;
     this.position = 0;
   }
 
   public MapleMessengerCharacter(MapleCharacter maplechar, int position) {
     this.name = maplechar.getName();
     this.channel = maplechar.getClient().getChannel();
     this.id = maplechar.getId();
     this.online = true;
     this.position = position;
   }
 
   public MapleMessengerCharacter() {
     this.name = "";
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
 
   public String getName() {
     return this.name;
   }
 
   public int getId() {
     return this.id;
   }
 
   public int getPosition() {
     return this.position;
   }
 
   public void setPosition(int position) {
     this.position = position;
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
     MapleMessengerCharacter other = (MapleMessengerCharacter)obj;
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
 * Qualified Name:     net.sf.cherry.net.world.MapleMessengerCharacter
 * JD-Core Version:    0.6.0
 */