 package net.sf.cherry.net.world.guild;
 
 import java.io.Serializable;

import net.sf.cherry.client.MapleCharacter;
 
 public class MapleGuildCharacter
   implements Serializable
 {
   public static final long serialVersionUID = 2058609046116597760L;
   private int level;
   private int id;
   private int channel;
   private int jobid;
   private int guildrank;
   private int guildid;
   private int allianceRank;
   private boolean online;
   private String name;
 
   public MapleGuildCharacter(MapleCharacter c)
   {
     this.name = c.getName();
     this.level = c.getLevel();
     this.id = c.getId();
     this.channel = c.getClient().getChannel();
     this.jobid = c.getJob().getId();
     this.guildrank = c.getGuildRank();
     this.guildid = c.getGuildId();
     this.online = true;
     this.allianceRank = c.getAllianceRank();
   }
 
   public MapleGuildCharacter(int id, int lv, String name, int channel, int job, int rank, int gid, boolean on, int allianceRank)
   {
     this.level = lv;
     this.id = id;
     this.name = name;
     if (on) {
       this.channel = channel;
     }
 
     this.jobid = job;
     this.online = on;
     this.guildrank = rank;
     this.guildid = gid;
     this.allianceRank = allianceRank;
   }
 
   public int getLevel() {
     return this.level;
   }
 
   public void setLevel(int l) {
     this.level = l;
   }
 
   public int getId() {
     return this.id;
   }
 
   public void setChannel(int ch) {
     this.channel = ch;
   }
 
   public int getChannel() {
     return this.channel;
   }
 
   public int getJobId() {
     return this.jobid;
   }
 
   public void setJobId(int job) {
     this.jobid = job;
   }
 
   public int getGuildId() {
     return this.guildid;
   }
 
   public void setGuildId(int gid) {
     this.guildid = gid;
   }
 
   public void setGuildRank(int rank) {
     this.guildrank = rank;
   }
 
   public int getGuildRank() {
     return this.guildrank;
   }
 
   public boolean isOnline() {
     return this.online;
   }
 
   public String getName() {
     return this.name;
   }
 
   public void setAllianceRank(int rank) {
     this.allianceRank = rank;
   }
 
   public int getAllianceRank() {
     return this.allianceRank;
   }
 
   public boolean equals(Object other)
   {
     if (!(other instanceof MapleGuildCharacter)) {
       return false;
     }
 
     MapleGuildCharacter o = (MapleGuildCharacter)other;
     return (o.getId() == this.id) && (o.getName().equals(this.name));
   }
 
   public void setOnline(boolean f) {
     this.online = f;
   }
 }

/* Location:           E:\maoxiandaodanji\dist\cherry.jar
 * Qualified Name:     net.sf.cherry.net.world.guild.MapleGuildCharacter
 * JD-Core Version:    0.6.0
 */