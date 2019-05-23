 package net.sf.cherry.server.life;
 
 import java.awt.Point;
import java.io.File;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import constants.ServerConfig;
import net.sf.cherry.provider.MapleData;
import net.sf.cherry.provider.MapleDataProvider;
import net.sf.cherry.provider.MapleDataProviderFactory;
import net.sf.cherry.provider.MapleDataTool;
import net.sf.cherry.tools.Pair;
 
 public class MobSkillFactory
 {
   private static Map<Pair<Integer, Integer>, MobSkill> mobSkills = new HashMap();
   private static MapleDataProvider dataSource = MapleDataProviderFactory.getDataProvider(new File(ServerConfig.WZPath + "/Skill.wz"));
   private static MapleData skillRoot = dataSource.getData("MobSkill.img");
 
   public static MobSkill getMobSkill(int skillId, int level) {
     MobSkill ret = (MobSkill)mobSkills.get(new Pair(Integer.valueOf(skillId), Integer.valueOf(level)));
     if (ret != null) {
       return ret;
     }
     synchronized (mobSkills) {
       ret = (MobSkill)mobSkills.get(new Pair(Integer.valueOf(skillId), Integer.valueOf(level)));
       if (ret == null) {
         MapleData skillData = skillRoot.getChildByPath(skillId + "/level/" + level);
         if (skillData != null) {
           int mpCon = MapleDataTool.getInt(skillData.getChildByPath("mpCon"), 0);
           List toSummon = new ArrayList();
           for (int i = 0; (i > -1) && 
             (skillData.getChildByPath(String.valueOf(i)) != null); i++)
           {
             toSummon.add(Integer.valueOf(MapleDataTool.getInt(skillData.getChildByPath(String.valueOf(i)), 0)));
           }
           int effect = MapleDataTool.getInt("summonEffect", skillData, 0);
           int hp = MapleDataTool.getInt("hp", skillData, 100);
           int x = MapleDataTool.getInt("x", skillData, 1);
           int y = MapleDataTool.getInt("y", skillData, 1);
           long duration = MapleDataTool.getInt("time", skillData, 0) * 1000;
           long cooltime = MapleDataTool.getInt("interval", skillData, 0) * 1000;
           int iprop = MapleDataTool.getInt("prop", skillData, 100);
           float prop = iprop / 100;
           int limit = MapleDataTool.getInt("limit", skillData, 0);
           int count = MapleDataTool.getInt("count", skillData, 1);
           MapleData ltd = skillData.getChildByPath("lt");
           MapleData rtd = skillData.getChildByPath("rb");
           Point lt = null;
           Point rb = null;
           if ((ltd != null) && (rtd != null)) {
             lt = (Point)ltd.getData();
             rb = (Point)rtd.getData();
           }
           ret = new MobSkill(skillId, level);
           ret.addSummons(toSummon);
           ret.setCoolTime(cooltime);
           ret.setDuration(duration);
           ret.setHp(hp);
           ret.setMpCon(mpCon);
           ret.setSpawnEffect(effect);
           ret.setX(x);
           ret.setY(y);
           ret.setProp(prop);
           ret.setLimit(limit);
           ret.setLtRb(lt, rb);
           ret.setCount(count);
         }
         mobSkills.put(new Pair(Integer.valueOf(skillId), Integer.valueOf(level)), ret);
       }
       return ret;
     }
   }
 }

/* Location:           E:\maoxiandaodanji\dist\cherry.jar
 * Qualified Name:     net.sf.cherry.server.life.MobSkillFactory
 * JD-Core Version:    0.6.0
 */