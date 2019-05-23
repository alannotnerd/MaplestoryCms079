 package net.sf.cherry.server;
 
 import java.io.CharArrayWriter;
import java.io.OutputStream;
import java.io.PrintWriter;
import java.util.LinkedList;

import javax.swing.JTextArea;
 
 class TextAreaOutputStream extends OutputStream
 {
   private JTextArea textArea;
   private int maxLines;
   private LinkedList lineLengths;
   private int curLength;
   private byte[] oneByte;
   private static byte[] LINE_SEP = System.getProperty("line.separator", "\n").getBytes();
 
   public TextAreaOutputStream(JTextArea ta)
   {
     this(ta, 1000);
   }
 
   public TextAreaOutputStream(JTextArea ta, int ml) {
     if (ml < 1) {
       ml = 50;
     }
     this.textArea = ta;
     this.maxLines = ml;
     this.lineLengths = new LinkedList();
     this.curLength = 0;
     this.oneByte = new byte[1];
   }
 
   public synchronized void clear() {
     this.lineLengths = new LinkedList();
     this.curLength = 0;
     this.textArea.setText("");
   }
 
   public synchronized int getMaximumLines() {
     return this.maxLines;
   }
 
   public synchronized void setMaximumLines(int val) {
     this.maxLines = val;
   }
 
   public void close()
   {
     if (this.textArea != null) {
       this.textArea = null;
       this.lineLengths = null;
       this.oneByte = null;
     }
   }
 
   public void flush()
   {
   }
 
   public void write(int val) {
     this.oneByte[0] = (byte)val;
     write(this.oneByte, 0, 1);
   }
 
   public void write(byte[] ba)
   {
     write(ba, 0, ba.length);
   }
 
   public synchronized void write(byte[] ba, int str, int len)
   {
     try {
       this.curLength += len;
       if (bytesEndWith(ba, str, len, LINE_SEP)) {
         this.lineLengths.addLast(new Integer(this.curLength));
         this.curLength = 0;
         if (this.lineLengths.size() > this.maxLines) {
           this.textArea.replaceRange(null, 0, ((Integer)this.lineLengths.removeFirst()).intValue());
         }
       }
       for (int xa = 0; xa < 10; xa++)
         try {
           this.textArea.append(new String(ba, str, len));
         }
         catch (Throwable thr) {
           if (xa == 9)
             thr.printStackTrace();
           else
             Thread.sleep(200L);
         }
     }
     catch (Throwable thr)
     {
       CharArrayWriter caw = new CharArrayWriter();
       thr.printStackTrace(new PrintWriter(caw, true));
       this.textArea.append(System.getProperty("line.separator", "\n"));
       this.textArea.append(caw.toString());
     }
   }
 
   private boolean bytesEndWith(byte[] ba, int str, int len, byte[] ew) {
     if (len < LINE_SEP.length) {
       return false;
     }
     int xa = 0; for (int xb = str + len - LINE_SEP.length; xa < LINE_SEP.length; xb++) {
       if (LINE_SEP[xa] != ba[xb])
         return false;
       xa++;
     }
 
     return true;
   }
 }

/* Location:           E:\maoxiandaodanji\dist\cherry.jar
 * Qualified Name:     net.sf.cherry.server.TextAreaOutputStream
 * JD-Core Version:    0.6.0
 */