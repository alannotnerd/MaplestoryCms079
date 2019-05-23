 package net.sf.cherry.provider.wz;
 
 import java.security.InvalidKeyException;
import java.security.NoSuchAlgorithmException;

import javax.crypto.BadPaddingException;
import javax.crypto.Cipher;
import javax.crypto.IllegalBlockSizeException;
import javax.crypto.NoSuchPaddingException;
import javax.crypto.spec.SecretKeySpec;

import net.sf.cherry.tools.data.input.LittleEndianAccessor;
import net.sf.cherry.tools.data.input.SeekableLittleEndianAccessor;
 
 public class WZTool
 {
   private static byte[] encKey;
 
   public static byte[] readListString(byte[] str)
   {
     for (int i = 0; i < str.length; i++) {
       str[i] = (byte)(str[i] ^ encKey[i]);
     }
     return str;
   }
 
   public static String readDecodedString(LittleEndianAccessor llea)
   {
     byte b = llea.readByte();
     if (b == 0) {
       return "";
     }
     if (b >= 0)
     {
       int strLength;
      
       if (b == 127)
         strLength = llea.readInt();
       else {
         strLength = b;
       }
       if (strLength < 0) {
         return "";
       }
       byte[] str = new byte[strLength * 2];
       for (int i = 0; i < strLength * 2; i++) {
         str[i] = llea.readByte();
       }
       return DecryptUnicodeStr(str);
     }
     int strLength;
     
     if (b == -128)
       strLength = llea.readInt();
     else {
       strLength = -b;
     }
     if (strLength < 0) {
       return "";
     }
     byte[] str = new byte[strLength];
     for (int i = 0; i < strLength; i++) {
       str[i] = llea.readByte();
     }
     return DecryptAsciiStr(str);
   }
 
   public static String DecryptAsciiStr(byte[] str)
   {
     byte xorByte = -86;
     for (int i = 0; i < str.length; i++) {
       str[i] = (byte)(str[i] ^ xorByte ^ encKey[i]);
       xorByte = (byte)(xorByte + 1);
     }
     return new String(str);
   }
 
   public static String DecryptUnicodeStr(byte[] str) {
     int xorByte = 43690;
     char[] charRet = new char[str.length / 2];
     for (int i = 0; i < str.length; i++) {
       str[i] = (byte)(str[i] ^ encKey[i]);
     }
     for (int i = 0; i < str.length / 2; i++) {
       char toXor = (char)(str[i] << 8 | str[(i + 1)]);
       charRet[i] = (char)(toXor ^ xorByte);
       xorByte++;
     }
     return String.valueOf(charRet);
   }
 
   public static String readDecodedStringAtOffset(SeekableLittleEndianAccessor slea, int offset) {
     slea.seek(offset);
     return readDecodedString(slea);
   }
 
   public static String readDecodedStringAtOffsetAndReset(SeekableLittleEndianAccessor slea, int offset) {
     long pos = 0L;
     pos = slea.getPosition();
     slea.seek(offset);
     String ret = readDecodedString(slea);
     slea.seek(pos);
     return ret;
   }
 
   public static int readValue(LittleEndianAccessor lea) {
     byte b = lea.readByte();
     if (b == -128) {
       return lea.readInt();
     }
     return b;
   }
 
   public static float readFloatValue(LittleEndianAccessor lea)
   {
     byte b = lea.readByte();
     if (b == -128) {
       return lea.readFloat();
     }
     return 0.0F;
   }
 
   static
   {
     byte[] iv = { 77, 35, -57, 43, 77, 35, -57, 43, 77, 35, -57, 43, 77, 35, -57, 43 };
 
     byte[] key = { 19, 0, 0, 0, 8, 0, 0, 0, 6, 0, 0, 0, -76, 0, 0, 0, 27, 0, 0, 0, 15, 0, 0, 0, 51, 0, 0, 0, 82, 0, 0, 0 };
 
     Cipher cipher = null;
     SecretKeySpec skeySpec = new SecretKeySpec(key, "AES");
     try {
       cipher = Cipher.getInstance("AES");
     } catch (NoSuchAlgorithmException e) {
     } catch (NoSuchPaddingException e) {
     }
     try {
       cipher.init(1, skeySpec);
     } catch (InvalidKeyException e) {
     }
     encKey = new byte[65535];
     for (int i = 0; i < 4095; i++) {
       try {
         iv = cipher.doFinal(iv);
       } catch (IllegalBlockSizeException e) {
         e.printStackTrace();
       } catch (BadPaddingException e) {
         e.printStackTrace();
       }
       System.arraycopy(iv, 0, encKey, i * 16, 16);
     }
     try {
       iv = cipher.doFinal(iv);
     } catch (IllegalBlockSizeException e) {
       e.printStackTrace();
     } catch (BadPaddingException e) {
       e.printStackTrace();
     }
     System.arraycopy(iv, 0, encKey, 65520, 15);
   }
 }

/* Location:           E:\maoxiandaodanji\dist\cherry.jar
 * Qualified Name:     net.sf.cherry.provider.wz.WZTool
 * JD-Core Version:    0.6.0
 */