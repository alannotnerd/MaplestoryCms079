 package net.sf.cherry.provider.wz;
 
 import java.io.File;
import java.io.FileInputStream;
import java.io.FileNotFoundException;
import java.io.IOException;

import net.sf.cherry.provider.MapleData;
import net.sf.cherry.provider.MapleDataDirectoryEntry;
import net.sf.cherry.provider.MapleDataProvider;
 
 public class XMLWZFile
   implements MapleDataProvider
 {
   private File root;
   private WZDirectoryEntry rootForNavigation;
 
   public XMLWZFile(File fileIn)
   {
     this.root = fileIn;
     this.rootForNavigation = new WZDirectoryEntry(fileIn.getName(), 0, 0, null);
     fillMapleDataEntitys(this.root, this.rootForNavigation);
   }
 
   private void fillMapleDataEntitys(File lroot, WZDirectoryEntry wzdir) {
     for (File file : lroot.listFiles()) {
       String fileName = file.getName();
       if ((file.isDirectory()) && (!fileName.endsWith(".img"))) {
         WZDirectoryEntry newDir = new WZDirectoryEntry(fileName, 0, 0, wzdir);
         wzdir.addDirectory(newDir);
         fillMapleDataEntitys(file, newDir);
       } else if (fileName.endsWith(".xml")) {
         wzdir.addFile(new WZFileEntry(fileName.substring(0, fileName.length() - 4), 0, 0, wzdir));
       }
     }
   }
 
   public MapleData getData(String path)
   {
     File dataFile = new File(this.root, path + ".xml");
     File imageDataDir = new File(this.root, path);
     if (!dataFile.exists())
       throw new RuntimeException("Datafile " + path + " does not exist in ");
     FileInputStream fis;
     try {
       fis = new FileInputStream(dataFile);
     } catch (FileNotFoundException e) {
       throw new RuntimeException("Datafile " + path + " does not exist in ");
     }XMLDomMapleData domMapleData;
     try {
       domMapleData = new XMLDomMapleData(fis, imageDataDir.getParentFile());
     } finally {
       try {
         fis.close();
       } catch (IOException e) {
         throw new RuntimeException(e);
       }
     }
     return domMapleData;
   }
 
   public MapleDataDirectoryEntry getRoot()
   {
     return this.rootForNavigation;
   }
 }

/* Location:           E:\maoxiandaodanji\dist\cherry.jar
 * Qualified Name:     net.sf.cherry.provider.wz.XMLWZFile
 * JD-Core Version:    0.6.0
 */