 package net.sf.cherry.server.life;
 
 import java.io.File;
import java.util.HashMap;
import java.util.Map;

import constants.ServerConfig;
import net.sf.cherry.provider.MapleData;
import net.sf.cherry.provider.MapleDataProvider;
import net.sf.cherry.provider.MapleDataProviderFactory;
import net.sf.cherry.provider.MapleDataTool;
import net.sf.cherry.tools.Pair;
import net.sf.cherry.tools.StringUtil;
 
 public class MobAttackInfoFactory
 {
   private static Map<Pair<Integer, Integer>, MobAttackInfo> mobAttacks = new HashMap();
   private static MapleDataProvider dataSource = MapleDataProviderFactory.getDataProvider(new File(ServerConfig.WZPath + "/Mob.wz"));
 
   public static MobAttackInfo getMobAttackInfo(MapleMonster mob, int attack) {
     MobAttackInfo ret = (MobAttackInfo)mobAttacks.get(new Pair(Integer.valueOf(mob.getId()), Integer.valueOf(attack)));
     if (ret != null) {
       return ret;
     }
     synchronized (mobAttacks) {
       ret = (MobAttackInfo)mobAttacks.get(new Pair(Integer.valueOf(mob.getId()), Integer.valueOf(attack)));
       if (ret == null) {
         MapleData mobData = dataSource.getData(StringUtil.getLeftPaddedStr(Integer.toString(mob.getId()) + ".img", '0', 11));
         if (mobData != null)
         {
           String linkedmob = MapleDataTool.getString("link", mobData, "");
           if (!linkedmob.equals("")) {
             mobData = dataSource.getData(StringUtil.getLeftPaddedStr(linkedmob + ".img", '0', 11));
           }
           MapleData attackData = mobData.getChildByPath("attack" + (attack + 1) + "/info");
           if (attackData != null) {
             MapleData deadlyAttack = attackData.getChildByPath("deadlyAttack");
             int mpBurn = MapleDataTool.getInt("mpBurn", attackData, 0);
             int disease = MapleDataTool.getInt("disease", attackData, 0);
             int level = MapleDataTool.getInt("level", attackData, 0);
             int mpCon = MapleDataTool.getInt("conMP", attackData, 0);
             ret = new MobAttackInfo(mob.getId(), attack);
             ret.setDeadlyAttack(deadlyAttack != null);
             ret.setMpBurn(mpBurn);
             ret.setDiseaseSkill(disease);
             ret.setDiseaseLevel(level);
             ret.setMpCon(mpCon);
           }
         }
         mobAttacks.put(new Pair(Integer.valueOf(mob.getId()), Integer.valueOf(attack)), ret);
       }
       return ret;
     }
   }
 }

/* Location:           E:\maoxiandaodanji\dist\cherry.jar
 * Qualified Name:     net.sf.cherry.server.life.MobAttackInfoFactory
 * JD-Core Version:    0.6.0
 */