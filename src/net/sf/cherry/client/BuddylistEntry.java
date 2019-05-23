 package net.sf.cherry.client;
 
 public class BuddylistEntry
 {
   private String name;
   private String group;
   private int cid;
   private int channel;
   private boolean visible;
 
   public BuddylistEntry(String name, int characterId, int channel, boolean visible)
   {
     this.name = name;
     this.group = "群未定";
     this.cid = characterId;
     this.channel = channel;
     this.visible = visible;
   }
 
   public BuddylistEntry(String name, String group, int characterId, int channel, boolean visible)
   {
     this.name = name;
     this.group = group;
     this.cid = characterId;
     this.channel = channel;
     this.visible = visible;
   }
 
   public int getChannel()
   {
     return this.channel;
   }
 
   public void setChannel(int channel) {
     this.channel = channel;
   }
 
   public boolean isOnline() {
     return this.channel >= 0;
   }
 
   public void setOffline() {
     this.channel = -1;
   }
 
   public String getName() {
     return this.name;
   }
 
   public int getCharacterId() {
     return this.cid;
   }
 
   public String getGroup() {
     return this.group;
   }
 
   public void setGroup(String group) {
     this.group = group;
   }
 
   public void setVisible(boolean visible) {
     this.visible = visible;
   }
 
   public boolean isVisible() {
     return this.visible;
   }
 
   public int hashCode()
   {
     int prime = 31;
     int result = 1;
     result = 31 * result + this.cid;
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
     BuddylistEntry other = (BuddylistEntry)obj;
 
     return this.cid == other.cid;
   }
 }

/* Location:           E:\maoxiandaodanji\dist\cherry.jar
 * Qualified Name:     net.sf.cherry.client.BuddylistEntry
 * JD-Core Version:    0.6.0
 */