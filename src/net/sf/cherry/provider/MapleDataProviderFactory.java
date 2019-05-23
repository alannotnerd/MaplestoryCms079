 package net.sf.cherry.provider;
 
 import java.io.File;
import java.io.IOException;

import com.mysql.fabric.Server;

import constants.ServerConfig;
import net.sf.cherry.provider.wz.WZFile;
import net.sf.cherry.provider.wz.XMLWZFile;
 
 public class MapleDataProviderFactory
 {
   private static final String wzPath = ServerConfig.WZPath;
 
   private static MapleDataProvider getWZ(Object in, boolean provideImages) {
     if ((in instanceof File)) {
       File fileIn = (File)in;
       if ((fileIn.getName().endsWith("wz")) && (!fileIn.isDirectory())) {
         try {
           return new WZFile(fileIn, provideImages);
         } catch (IOException e) {
           throw new RuntimeException("加载WZ数据文件失败", e);
         }
       }
       return new XMLWZFile(fileIn);
     }
 
     throw new IllegalArgumentException("无法创建数据输入input " + in);
   }
 
   public static MapleDataProvider getDataProvider(Object in) {
     return getWZ(in, false);
   }
 
   public static MapleDataProvider getImageProvidingDataProvider(Object in) {
     return getWZ(in, true);
   }
 
   public static File fileInWZPath(String filename) {
     return new File(wzPath, filename);
   }
 }
