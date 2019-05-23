 package net.sf.cherry.server;
 
 import java.util.ArrayList;
import java.util.List;

import net.sf.cherry.tools.Pair;
 
 public class MapleAchievements
 {
   private List<Pair<Integer, MapleAchievement>> achievements = new ArrayList();
   private static MapleAchievements instance = null;
 
   protected MapleAchievements() {
     this.achievements.add(new Pair(Integer.valueOf(3), new MapleAchievement("等级到达30级", 100, true, false)));
     this.achievements.add(new Pair(Integer.valueOf(4), new MapleAchievement("等级到达70级", 200, true, false)));
     this.achievements.add(new Pair(Integer.valueOf(5), new MapleAchievement("等级到达120级", 200, true, false)));
     this.achievements.add(new Pair(Integer.valueOf(7), new MapleAchievement("首次成功创建家族", 100, true, false)));
     this.achievements.add(new Pair(Integer.valueOf(9), new MapleAchievement("首次人气达到50点", 200, true, false)));
     this.achievements.add(new Pair(Integer.valueOf(12), new MapleAchievement("首次成功砸卷", 200, true, false)));
     this.achievements.add(new Pair(Integer.valueOf(22), new MapleAchievement("到达200级", 300, true, false)));
     this.achievements.add(new Pair(Integer.valueOf(26), new MapleAchievement("首次击败暗黑龙王", 400, true, false)));
   }
 
   public static MapleAchievements getInstance() {
     if (instance == null) {
       instance = new MapleAchievements();
     }
     return instance;
   }
 
   public MapleAchievement getById(int id) {
     for (Pair achievement : this.achievements) {
       if (((Integer)achievement.getLeft()).intValue() == id) {
         return (MapleAchievement)achievement.getRight();
       }
     }
     return null;
   }
 
   public Integer getByMapleAchievement(MapleAchievement ma) {
     for (Pair achievement : this.achievements) {
       if (achievement.getRight() == ma) {
         return (Integer)achievement.getLeft();
       }
     }
     return null;
   }
 }

/* Location:           E:\maoxiandaodanji\dist\cherry.jar
 * Qualified Name:     net.sf.cherry.server.MapleAchievements
 * JD-Core Version:    0.6.0
 */