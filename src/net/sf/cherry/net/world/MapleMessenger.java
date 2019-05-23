 package net.sf.cherry.net.world;
 
 import java.io.Serializable;
import java.util.Collection;
import java.util.Collections;
import java.util.LinkedList;
import java.util.List;
 
 public class MapleMessenger
   implements Serializable
 {
   private static final long serialVersionUID = 9179541993413738569L;
   private List<MapleMessengerCharacter> members = new LinkedList();
   private int id;
   private boolean pos0 = false;
   private boolean pos1 = false;
   private boolean pos2 = false;
 
   public MapleMessenger(int id, MapleMessengerCharacter chrfor)
   {
     this.members.add(chrfor);
     int position = getLowestPosition();
     chrfor.setPosition(position);
     this.id = id;
   }
 
   public boolean containsMembers(MapleMessengerCharacter member) {
     return this.members.contains(member);
   }
 
   public void addMember(MapleMessengerCharacter member) {
     this.members.add(member);
     int position = getLowestPosition();
     member.setPosition(position);
   }
 
   public void removeMember(MapleMessengerCharacter member) {
     int position = member.getPosition();
     if (position == 0)
       this.pos0 = false;
     else if (position == 1)
       this.pos1 = false;
     else if (position == 2) {
       this.pos2 = false;
     }
     this.members.remove(member);
   }
 
   public void silentRemoveMember(MapleMessengerCharacter member) {
     this.members.remove(member);
   }
 
   public void silentAddMember(MapleMessengerCharacter member, int position) {
     this.members.add(member);
     member.setPosition(position);
   }
 
   public void updateMember(MapleMessengerCharacter member) {
     for (int i = 0; i < this.members.size(); i++) {
       MapleMessengerCharacter chr = (MapleMessengerCharacter)this.members.get(i);
       if (chr.equals(member))
         this.members.set(i, member);
     }
   }
 
   public Collection<MapleMessengerCharacter> getMembers()
   {
     return Collections.unmodifiableList(this.members);
   }
 
   public int getLowestPosition()
   {
     int position;
     if (this.pos0)
     {
      // int position;
       if (this.pos1) {
         this.pos2 = true;
         position = 2;
       } else {
         this.pos1 = true;
         position = 1;
       }
     } else {
       this.pos0 = true;
       position = 0;
     }
     return position;
   }
 
   public int getPositionByName(String name) {
     for (MapleMessengerCharacter messengerchar : this.members) {
       if (messengerchar.getName().equals(name)) {
         return messengerchar.getPosition();
       }
     }
     return 4;
   }
 
   public int getId() {
     return this.id;
   }
 
   public void setId(int id) {
     this.id = id;
   }
 
   public int hashCode()
   {
     int prime = 31;
     int result = 1;
     result = 31 * result + this.id;
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
     MapleMessenger other = (MapleMessenger)obj;
 
     return this.id == other.id;
   }
 }

/* Location:           E:\maoxiandaodanji\dist\cherry.jar
 * Qualified Name:     net.sf.cherry.net.world.MapleMessenger
 * JD-Core Version:    0.6.0
 */