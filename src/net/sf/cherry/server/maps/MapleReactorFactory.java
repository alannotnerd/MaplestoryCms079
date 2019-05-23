 package net.sf.cherry.server.maps;
 
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
 
 public class MapleReactorFactory
 {
   private static MapleDataProvider data = MapleDataProviderFactory.getDataProvider(new File(ServerConfig.WZPath + "/Reactor.wz"));
   private static Map<Integer, MapleReactorStats> reactorStats = new HashMap();
 
   public static MapleReactorStats getReactor(int rid) {
     MapleReactorStats stats = (MapleReactorStats)reactorStats.get(Integer.valueOf(rid));
     if (stats == null) {
       int infoId = rid;
       MapleData reactorData = data.getData(StringUtil.getLeftPaddedStr(Integer.toString(infoId) + ".img", '0', 11));
       MapleData link = reactorData.getChildByPath("info/link");
       if (link != null) {
         infoId = MapleDataTool.getIntConvert("info/link", reactorData);
         stats = (MapleReactorStats)reactorStats.get(Integer.valueOf(infoId));
       }
       MapleData activateOnTouch = reactorData.getChildByPath("info/activateByTouch");
       boolean loadArea = false;
       if (activateOnTouch != null)
         loadArea = MapleDataTool.getInt("info/activateByTouch", reactorData, 0) != 0;
       if (stats == null) {
         reactorData = data.getData(StringUtil.getLeftPaddedStr(Integer.toString(infoId) + ".img", '0', 11));
         MapleData reactorInfoData = reactorData.getChildByPath("0/event/0");
         stats = new MapleReactorStats();
         if (reactorInfoData != null) {
           boolean areaSet = false;
           int i = 0;
           while (reactorInfoData != null) {
             Pair reactItem = null;
             int type = MapleDataTool.getIntConvert("type", reactorInfoData);
             if (type == 100) {
               reactItem = new Pair(Integer.valueOf(MapleDataTool.getIntConvert("0", reactorInfoData)), Integer.valueOf(MapleDataTool.getIntConvert("1", reactorInfoData)));
               if ((!areaSet) || (loadArea)) {
                 stats.setTL(MapleDataTool.getPoint("lt", reactorInfoData));
                 stats.setBR(MapleDataTool.getPoint("rb", reactorInfoData));
                 areaSet = true;
               }
             }
             byte nextState = (byte)MapleDataTool.getIntConvert("state", reactorInfoData);
             stats.addState((byte)i, type, reactItem, nextState);
             i++;
             reactorInfoData = reactorData.getChildByPath(i + "/event/0");
           }
         } else {
          stats.addState((byte) 0, 999, null, (byte) 0);
         }
 
         reactorStats.put(Integer.valueOf(infoId), stats);
         if (rid != infoId)
           reactorStats.put(Integer.valueOf(rid), stats);
       }
       else {
         reactorStats.put(Integer.valueOf(rid), stats);
       }
     }
     return stats;
   }
 }

/* Location:           E:\maoxiandaodanji\dist\cherry.jar
 * Qualified Name:     net.sf.cherry.server.maps.MapleReactorFactory
 * JD-Core Version:    0.6.0
 */