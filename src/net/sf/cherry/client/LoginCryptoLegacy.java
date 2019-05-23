 package net.sf.cherry.client;
 
 import java.io.UnsupportedEncodingException;
import java.security.MessageDigest;
import java.security.NoSuchAlgorithmException;
import java.util.Random;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
 
 public class LoginCryptoLegacy
 {
   private static Logger log = LoggerFactory.getLogger(LoginCryptoLegacy.class);
 
   private static char[] iota64 = new char[64];
 
   public static String hashPassword(String password)
   {
     byte[] randomBytes = new byte[6];
 
     Random randomGenerator = new Random();
     randomGenerator.nextBytes(randomBytes);
 
     return myCrypt(password, genSalt(randomBytes));
   }
 
   public static boolean checkPassword(String password, String hash)
   {
     return myCrypt(password, hash).equals(hash);
   }
 
   public static boolean isLegacyPassword(String hash) {
     return hash.substring(0, 3).equals("$H$");
   }
 
   private static String myCrypt(String password, String seed)
     throws RuntimeException
   {
     String out = null;
     int count = 8;
 
     if (!seed.substring(0, 3).equals("$H$"))
     {
       byte[] randomBytes = new byte[6];
       Random randomGenerator = new Random();
       randomGenerator.nextBytes(randomBytes);
       seed = genSalt(randomBytes);
     }
 
     String salt = seed.substring(4, 12);
     if (salt.length() != 8) {
       throw new RuntimeException("Error hashing password - Invalid seed.");
     }
 
     byte[] sha1Hash = new byte[40];
     try {
       MessageDigest digester = MessageDigest.getInstance("SHA-1");
 
       digester.update((salt + password).getBytes("iso-8859-1"), 0, (salt + password).length());
       sha1Hash = digester.digest();
       do {
         byte[] CombinedBytes = new byte[sha1Hash.length + password.length()];
         System.arraycopy(sha1Hash, 0, CombinedBytes, 0, sha1Hash.length);
         System.arraycopy(password.getBytes("iso-8859-1"), 0, CombinedBytes, sha1Hash.length, password.getBytes("iso-8859-1").length);
         digester.update(CombinedBytes, 0, CombinedBytes.length);
         sha1Hash = digester.digest();
         count--; } while (count > 0);
       out = seed.substring(0, 12);
       out = out + encode64(sha1Hash);
     } catch (NoSuchAlgorithmException Ex) {
       log.error("Error hashing password.", Ex);
     } catch (UnsupportedEncodingException Ex) {
       log.error("Error hashing password.", Ex);
     }
     if (out == null) {
       throw new RuntimeException("Error hashing password - out = null");
     }
 
     return out;
   }
 
   private static String genSalt(byte[] Random)
   {
     String Salt = "$H$";
     Salt = Salt + iota64[30];
     Salt = Salt + encode64(Random);
     return Salt;
   }
 
   private static String encode64(byte[] Input)
   {
     int iLen = Input.length;
 
     int oDataLen = (iLen * 4 + 2) / 3;
     int oLen = (iLen + 2) / 3 * 4;
 
     char[] out = new char[oLen];
     int ip = 0;
     int op = 0;
     while (ip < iLen) {
       int i0 = Input[(ip++)] & 0xFF;
       int i1 = ip < iLen ? Input[(ip++)] & 0xFF : 0;
       int i2 = ip < iLen ? Input[(ip++)] & 0xFF : 0;
       int o0 = i0 >>> 2;
       int o1 = (i0 & 0x3) << 4 | i1 >>> 4;
       int o2 = (i1 & 0xF) << 2 | i2 >>> 6;
       int o3 = i2 & 0x3F;
       out[(op++)] = iota64[o0];
       out[(op++)] = iota64[o1];
       out[op] = (op < oDataLen ? iota64[o2] : '=');
       op++;
       out[op] = (op < oDataLen ? iota64[o3] : '=');
       op++;
     }
     return new String(out);
   }
 
   static
   {
     int i = 0;
     iota64[(i++)] = '.';
     iota64[(i++)] = '/';
     for (char c = 'A'; c <= 'Z'; c = (char)(c + '\001')) {
       iota64[(i++)] = c;
     }
     for (char c = 'a'; c <= 'z'; c = (char)(c + '\001')) {
       iota64[(i++)] = c;
     }
     for (char c = '0'; c <= '9'; c = (char)(c + '\001'))
       iota64[(i++)] = c;
   }
 }

/* Location:           E:\maoxiandaodanji\dist\cherry.jar
 * Qualified Name:     net.sf.cherry.client.LoginCryptoLegacy
 * JD-Core Version:    0.6.0
 */