 package net.sf.cherry.net.world;
 
 import java.io.Serializable;
import java.util.Collection;
import java.util.Collections;
import java.util.LinkedList;
import java.util.List;

import net.sf.cherry.client.MapleCharacter;
import net.sf.cherry.net.channel.ChannelServer;
 
 public class MapleParty
   implements Serializable
 {
   private static final long serialVersionUID = 9179541993413738569L;
   private MaplePartyCharacter leader;
   private List<MaplePartyCharacter> members = new LinkedList();
   private int id;
   private int CP;
   private int team;
   private int totalCP;
   private MapleParty CPQEnemy = null;
 
   public MapleParty(int id, MaplePartyCharacter chrfor) {
     this.leader = chrfor;
     this.members.add(this.leader);
     this.id = id;
   }
 
   public boolean containsMember(MaplePartyCharacter member) {
     return this.members.contains(member);
   }
 
   public void addMember(MaplePartyCharacter member) {
     this.members.add(member);
   }
 
   public void removeMember(MaplePartyCharacter member) {
     this.members.remove(member);
   }
 
   public void updateMember(MaplePartyCharacter member) {
     for (int i = 0; i < this.members.size(); i++) {
       MaplePartyCharacter chr = (MaplePartyCharacter)this.members.get(i);
       if (chr.equals(member))
         this.members.set(i, member);
     }
   }
 
   public MaplePartyCharacter getMemberById(int id)
   {
     for (MaplePartyCharacter chr : this.members) {
       if (chr.getId() == id) {
         return chr;
       }
     }
     return null;
   }
 
   public Collection<MaplePartyCharacter> getMembers() {
     return Collections.unmodifiableList(this.members);
   }
 
   public List<MapleCharacter> getPartyMembers(MapleParty party) {
     if (party == null) {
       return null;
     }
     List chars = new LinkedList();
     for (ChannelServer channel : ChannelServer.getAllInstances()) {
       for (MapleCharacter chrs : channel.getPartyMembers(party)) {
         if (chrs != null) {
           chars.add(chrs);
         }
       }
     }
     return chars;
   }
 
   public List<MapleCharacter> getPartyMembers() {
     return getPartyMembers(this);
   }
 
   public int getId() {
     return this.id;
   }
 
   public void setId(int id) {
     this.id = id;
   }
 
   public int getCP() {
     return this.CP;
   }
 
   public int getTeam() {
     return this.team;
   }
 
   public int getTotalCP() {
     return this.totalCP;
   }
 
   public void setCP(int cp) {
     this.CP = cp;
   }
 
   public void setTeam(int team) {
     this.team = team;
   }
 
   public void setTotalCP(int totalcp) {
     this.totalCP = totalcp;
   }
 
   public void setEnemy(MapleParty CPQEnemy) {
     this.CPQEnemy = CPQEnemy;
   }
 
   public MaplePartyCharacter getLeader() {
     return this.leader;
   }

   public void setLeader(MaplePartyCharacter nLeader) {
     this.leader = nLeader;
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
     MapleParty other = (MapleParty)obj;
 
     return this.id == other.id;
   }
 }