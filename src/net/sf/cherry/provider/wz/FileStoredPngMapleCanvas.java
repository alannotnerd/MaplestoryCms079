 package net.sf.cherry.provider.wz;
 
 import java.awt.image.BufferedImage;
import java.io.File;
import java.io.IOException;

import javax.imageio.ImageIO;

import net.sf.cherry.provider.MapleCanvas;
 
 public class FileStoredPngMapleCanvas
   implements MapleCanvas
 {
   private File file;
   private int width;
   private int height;
   private BufferedImage image;
 
   public FileStoredPngMapleCanvas(int width, int height, File fileIn)
   {
     this.width = width;
     this.height = height;
     this.file = fileIn;
   }
 
   public int getHeight()
   {
     return this.height;
   }
 
   public int getWidth()
   {
     return this.width;
   }
 
   public BufferedImage getImage()
   {
     loadImageIfNecessary();
     return this.image;
   }
 
   private void loadImageIfNecessary() {
     if (this.image == null)
       try {
         this.image = ImageIO.read(this.file);
 
         this.width = this.image.getWidth();
         this.height = this.image.getHeight();
       } catch (IOException e) {
         throw new RuntimeException(e);
       }
   }
 }

/* Location:           E:\maoxiandaodanji\dist\cherry.jar
 * Qualified Name:     net.sf.cherry.provider.wz.FileStoredPngMapleCanvas
 * JD-Core Version:    0.6.0
 */