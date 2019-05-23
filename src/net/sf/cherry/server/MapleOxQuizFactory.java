 package net.sf.cherry.server;
 
 import java.io.File;
import java.util.HashMap;
import java.util.Map;

import constants.ServerConfig;
import net.sf.cherry.provider.MapleData;
import net.sf.cherry.provider.MapleDataProvider;
import net.sf.cherry.provider.MapleDataProviderFactory;
import net.sf.cherry.provider.MapleDataTool;
import net.sf.cherry.tools.Pair;
 
 public class MapleOxQuizFactory
 {
   private static MapleDataProvider stringData = MapleDataProviderFactory.getDataProvider(new File(ServerConfig.WZPath + "/Etc.wz"));
   private static Map<Pair<Integer, Integer>, String[]> questions = new HashMap();
 
   public static String getOXQuestion(int imgdir, int id) {
     String ret = ((String[])questions.get(new Pair(Integer.valueOf(imgdir), Integer.valueOf(id))))[0];
     if (ret == null) {
       synchronized (questions) {
         MapleData itemsData = stringData.getData("OXQuiz.img").getChildByPath(String.valueOf(imgdir));
         MapleData itemFolder = itemsData.getChildByPath(String.valueOf(id));
         String itemName = MapleDataTool.getString("q", itemFolder, "NO-NAME");
         questions.put(new Pair(Integer.valueOf(imgdir), Integer.valueOf(id)), new String[] { itemName, String.valueOf(MapleDataTool.getInt(itemFolder.getChildByPath("a"))), MapleDataTool.getString("d", itemFolder, "NO-NAME") });
         ret = id + " " + itemName;
       }
     }
     return ret;
   }
 
   public static int getOXAnswer(int imgdir, int id) {
     return Integer.parseInt(((String[])questions.get(new Pair(Integer.valueOf(imgdir), Integer.valueOf(id))))[1]);
   }
 
   public static String getOXExplain(int imgdir, int id) {
     return ((String[])questions.get(new Pair(Integer.valueOf(imgdir), Integer.valueOf(id))))[2];
   }
 }

/* Location:           E:\maoxiandaodanji\dist\cherry.jar
 * Qualified Name:     net.sf.cherry.server.MapleOxQuizFactory
 * JD-Core Version:    0.6.0
 */