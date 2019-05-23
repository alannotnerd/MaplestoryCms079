 package net.sf.cherry.provider.wz;
 
 import java.io.BufferedInputStream;
import java.io.File;
import java.io.FileInputStream;
import java.io.FileNotFoundException;
import java.util.ArrayList;
import java.util.Collection;
import java.util.Collections;
import java.util.HashSet;
import java.util.List;

import net.sf.cherry.provider.MapleDataProviderFactory;
import net.sf.cherry.tools.data.input.GenericLittleEndianAccessor;
import net.sf.cherry.tools.data.input.InputStreamByteStream;
import net.sf.cherry.tools.data.input.LittleEndianAccessor;
 
 public class ListWZFile
 {
   private LittleEndianAccessor lea;
   private List<String> entries = new ArrayList();
   private static Collection<String> modernImgs = new HashSet();
 
   public static byte[] xorBytes(byte[] a, byte[] b) {
     byte[] wusched = new byte[a.length];
     for (int i = 0; i < a.length; i++) {
       wusched[i] = (byte)(a[i] ^ b[i]);
     }
     return wusched;
   }
 
   public ListWZFile(File listwz) throws FileNotFoundException {
     this.lea = new GenericLittleEndianAccessor(new InputStreamByteStream(new BufferedInputStream(new FileInputStream(listwz))));
     while (this.lea.available() > 0L) {
       int l = this.lea.readInt() * 2;
       byte[] chunk = new byte[l];
       for (int i = 0; i < chunk.length; i++) {
         chunk[i] = this.lea.readByte();
       }
       this.lea.readChar();
       String value = String.valueOf(WZTool.readListString(chunk));
       this.entries.add(value);
     }
     this.entries = Collections.unmodifiableList(this.entries);
   }
 
   public List<String> getEntries() {
     return this.entries;
   }
 
   public static void init() {
     String listWz = System.getProperty("listwz");
     if (listWz != null)
       try
       {
         ListWZFile listwz = new ListWZFile(MapleDataProviderFactory.fileInWZPath("List.wz"));
         modernImgs = new HashSet(listwz.getEntries());
       }
       catch (FileNotFoundException e) {
       }
   }
 
   public static boolean isModernImgFile(String path) {
     return modernImgs.contains(path);
   }
 }
