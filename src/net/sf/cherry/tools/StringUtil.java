 package net.sf.cherry.tools;
 
 import java.io.PrintWriter;
import java.io.StringWriter;

import constants.ServerConfig;
 
 public class StringUtil
 {
   public static String getLeftPaddedStr(String in, char padchar, int length)
   {
     StringBuilder builder = new StringBuilder(length);
     for (int x = in.getBytes(ServerConfig.STRCHARSET).length; x < length; x++) {
       builder.append(padchar);
     }
     builder.append(in);
     return builder.toString();
   }
 
   public static String getRightPaddedStr(String in, char padchar, int length)
   {
     StringBuilder builder = new StringBuilder(in);
     for (int x = in.getBytes(ServerConfig.STRCHARSET).length; x < length; x++) {
       builder.append(padchar);
     }
     return builder.toString();
   }
 
   public static String joinStringFrom(String[] arr, int start)
   {
     return joinStringFrom(arr, start, " ");
   }
 
   public static String joinStringFrom(String[] arr, int start, String sep)
   {
     StringBuilder builder = new StringBuilder();
     for (int i = start; i < arr.length; i++) {
       builder.append(arr[i]);
       if (i != arr.length - 1) {
         builder.append(sep);
       }
     }
     return builder.toString();
   }
 
   public static String makeEnumHumanReadable(String enumName)
   {
     StringBuilder builder = new StringBuilder(enumName.length() + 1);
     String[] words = enumName.split("_");
     for (String word : words) {
       if (word.length() <= 2) {
         builder.append(word);
       } else {
         builder.append(word.charAt(0));
         builder.append(word.substring(1).toLowerCase());
       }
       builder.append(' ');
     }
     return builder.substring(0, enumName.length());
   }
 
   public static int countCharacters(String str, char chr)
   {
     int ret = 0;
     for (int i = 0; i < str.length(); i++) {
       if (str.charAt(i) == chr) {
         ret++;
       }
     }
     return ret;
   }
 
   public static String getStackTrace(Throwable t) {
     StringWriter sw = new StringWriter();
     PrintWriter ps = new PrintWriter(sw);
     t.printStackTrace(ps);
     return sw.toString();
   }
 }

/* Location:           E:\maoxiandaodanji\dist\cherry.jar
 * Qualified Name:     net.sf.cherry.tools.StringUtil
 * JD-Core Version:    0.6.0
 */