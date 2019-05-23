 package net.sf.cherry.server;
 
 import java.util.LinkedList;
import java.util.List;

import net.sf.cherry.client.MapleCharacter;
import net.sf.cherry.net.MaplePacket;
import net.sf.cherry.tools.MaplePacketCreator;
 
 public class MapleSquad
 {
   private MapleCharacter leader;
   private List<MapleCharacter> members = new LinkedList();
   private List<MapleCharacter> bannedMembers = new LinkedList();
   private int ch;
   private int status = 0;
 
   public MapleSquad(int ch, MapleCharacter leader) {
     this.leader = leader;
     this.members.add(leader);
     this.ch = ch;
     this.status = 1;
   }
 
   public MapleCharacter getLeader() {
     return this.leader;
   }
 
   public boolean containsMember(MapleCharacter member) {
     for (MapleCharacter mmbr : this.members) {
       if (mmbr.getId() == member.getId()) {
         return true;
       }
     }
     return false;
   }
 
   public boolean isBanned(MapleCharacter member) {
     for (MapleCharacter banned : this.bannedMembers) {
       if (banned.getId() == member.getId()) {
         return true;
       }
     }
     return false;
   }
 
   public List<MapleCharacter> getMembers() {
     return this.members;
   }
 
   public int getSquadSize() {
     return this.members.size();
   }
 
   public boolean addMember(MapleCharacter member) {
     if (isBanned(member)) {
       return false;
     }
     this.members.add(member);
     MaplePacket packet = MaplePacketCreator.serverNotice(5, member.getName() + " has joined the fight!");
     getLeader().getClient().getSession().write(packet);
     return true;
   }
 
   public void banMember(MapleCharacter member, boolean ban)
   {
     int index = -1;
     for (MapleCharacter mmbr : this.members) {
       if (mmbr.getId() == member.getId()) {
         index = this.members.indexOf(mmbr);
       }
     }
     this.members.remove(index);
     if (ban)
       this.bannedMembers.add(member);
   }
 
   public void setStatus(int status)
   {
     this.status = status;
   }
 
   public int getStatus() {
     return this.status;
   }
 
   public void clear() {
     this.members.clear();
     this.bannedMembers.clear();
   }
 
   public boolean equals(MapleSquad other)
   {
     return (other.ch == this.ch) && 
       (other.leader.getId() == this.leader.getId());
   }
 }

/* Location:           E:\maoxiandaodanji\dist\cherry.jar
 * Qualified Name:     net.sf.cherry.server.MapleSquad
 * JD-Core Version:    0.6.0
 */