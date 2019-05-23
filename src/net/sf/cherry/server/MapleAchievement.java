 package net.sf.cherry.server;
 
 import java.rmi.RemoteException;

import net.sf.cherry.client.MapleCharacter;
import net.sf.cherry.net.channel.ChannelServer;
import net.sf.cherry.tools.MaplePacketCreator;
 
 public class MapleAchievement
 {
   private String name;
   private int reward;
   private boolean notice;
   private boolean repeatable = false;
 
   public MapleAchievement(String name, int reward) {
     this.name = name;
     this.reward = reward;
     this.notice = true;
   }
 
   public MapleAchievement(String name, int reward, boolean notice) {
     this.name = name;
     this.reward = reward;
     this.notice = notice;
   }
 
   public MapleAchievement(String name, int reward, boolean notice, boolean repeatable) {
     this.name = name;
     this.reward = reward;
     this.notice = notice;
     this.repeatable = repeatable;
   }
 
   public String getName() {
     return this.name;
   }
 
   public boolean isRepeatable() {
     return this.repeatable;
   }
 
   public void setName(String name) {
     this.name = name;
   }
 
   public int getReward() {
     return this.reward;
   }
 
   public void setReward(int reward) {
     this.reward = reward;
   }
 
   public void finishAchievement(MapleCharacter player) {
     if (player.isGM())
       return;
     try
     {
       player.modifyCSPoints(1, this.reward);
       player.setAchievementFinished(MapleAchievements.getInstance().getByMapleAchievement(this).intValue());
       player.getClient().getSession().write(MaplePacketCreator.serverNotice(5, "[冒险成绩] 你完成了 " + this.name + ".获得了" + this.reward + " 点卷."));
       if ((this.notice) && (!player.isBanned()))
         ChannelServer.getInstance(player.getClient().getChannel()).getWorldInterface().broadcastMessage(player.getName(), MaplePacketCreator.serverNotice(6, "[冒险成绩] 恭喜" + player.getName() + "第一次" + this.name + "!").getBytes());
     }
     catch (RemoteException e) {
       player.getClient().getChannelServer().reconnectWorld();
     }
   }
 }

/* Location:           E:\maoxiandaodanji\dist\cherry.jar
 * Qualified Name:     net.sf.cherry.server.MapleAchievement
 * JD-Core Version:    0.6.0
 */