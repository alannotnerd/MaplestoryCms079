package net.sf.cherry.client;
 
import java.io.File;
import java.util.ArrayList;
import java.util.List;
import java.util.regex.Pattern;

import constants.ServerConfig;
import net.sf.cherry.provider.MapleData;
import net.sf.cherry.provider.MapleDataProviderFactory;
 
 public class MapleCharacterUtil
 {
   private static List<String> bannedNames = new ArrayList();
   private static Pattern namePattern = Pattern.compile("^(?!_)(?!.*?_$)[a-zA-Z0-9_一-龥]+$");
 
   public static boolean canCreateChar(String name, int world)
   {
     if (!isNameLegal(name)) {
       return false;
     }
 
     return MapleCharacter.getIdByName(name, world) == -1;
   }
 
   public static boolean isNameLegal(String name)
   {
     if ((name.getBytes().length < 4) || (name.getBytes().length > 12) || (isBanned(name))) {
       return false;
     }
     return namePattern.matcher(name).matches();
   }
 
   public static boolean isBanned(String name) {
     if (bannedNames.isEmpty()) {
       MapleData bannedName = MapleDataProviderFactory.getDataProvider(new File(ServerConfig.WZPath + "/Etc.wz")).getData("ForbiddenName.img");
       for (MapleData bname : bannedName.getChildren()) {
         bannedNames.add(bname.getData().toString());
       }
     }
     for (String bName : bannedNames) {
       if (name.toLowerCase().contains(bName)) {
         return true;
       }
     }
     return false;
   }
 
   public static String makeMapleReadable(String in) {
     String wui = in.replace('I', 'i');
     wui = wui.replace('l', 'L');
     wui = wui.replace("rn", "Rn");
     wui = wui.replace("vv", "Vv");
     wui = wui.replace("VV", "Vv");
     return wui;
   }
 }

/* Location:           E:\maoxiandaodanji\dist\cherry.jar
 * Qualified Name:     net.sf.cherry.client.MapleCharacterUtil
 * JD-Core Version:    0.6.0
 */