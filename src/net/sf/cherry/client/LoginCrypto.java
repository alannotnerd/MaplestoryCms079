package net.sf.cherry.client;

import net.sf.cherry.tools.HexTool;

import java.nio.charset.StandardCharsets;
import java.security.MessageDigest;
import java.security.NoSuchAlgorithmException;
import java.util.Random;

public class LoginCrypto {

  private static String toSimpleHexString(byte[] bytes) {
    return HexTool.toString(bytes).replace(" ", "").toLowerCase();
  }

  private static String hashWithDigest(String in, String digest) {
    try {
      MessageDigest Digester = MessageDigest.getInstance(digest);
      Digester.update(in.getBytes(StandardCharsets.UTF_8), 0, in.length());
      byte[] sha1Hash = Digester.digest();
      return toSimpleHexString(sha1Hash);
    } catch (NoSuchAlgorithmException ex) {
      throw new RuntimeException("Hashing the password failed", ex);
    }
  }

  public static String hexSha1(String in) {
    return hashWithDigest(in, "SHA-1");
  }

  private static String hexSha512(String in) {
    return hashWithDigest(in, "SHA-512");
  }

  public static boolean checkSha1Hash(String hash, String password) {
    return hash.equals(hexSha1(password));
  }

  public static boolean checkSaltedSha512Hash(String hash, String password, String salt) {
    return hash.equals(makeSaltedSha512Hash(password, salt));
  }

  public static String makeSaltedSha512Hash(String password, String salt) {
    return hexSha512(password + salt);
  }

  public static String makeSalt() {
    byte[] salt = new byte[16];
    new Random().nextBytes(salt);
    return toSimpleHexString(salt);
  }
}
