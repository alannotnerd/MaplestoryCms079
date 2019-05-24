package net.sf.cherry.tools;

import org.apache.mina.common.ByteBuffer;

import java.io.ByteArrayOutputStream;

public class HexTool {
  private static char[] HEX = {'0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'A', 'B', 'C', 'D', 'E', 'F'};

  public static String toString(byte byteValue) {
    int tmp = byteValue << 8;
    char[] retstr = {HEX[(tmp >> 12 & 0xF)], HEX[(tmp >> 8 & 0xF)]};
    return String.valueOf(retstr);
  }

  public static String toString(ByteBuffer buf) {
    buf.flip();
    byte[] arr = new byte[buf.remaining()];
    buf.get(arr);
    String ret = toString(arr);
    buf.flip();
    buf.put(arr);
    return ret;
  }

  public static String toString(int intValue) {
    return Integer.toHexString(intValue);
  }

  public static String toString(byte[] bytes) {
    StringBuilder hexed = new StringBuilder();
    for (int i = 0; i < bytes.length; i++) {
      hexed.append(toString(bytes[i]));
      hexed.append(' ');
    }
    return hexed.substring(0, hexed.length() - 1);
  }

  public static String toStringFromAscii(byte[] bytes) {
    byte[] ret = new byte[bytes.length];
    for (int x = 0; x < bytes.length; x++) {
      if ((bytes[x] < 32) && (bytes[x] >= 0))
        ret[x] = 46;
      else {
        ret[x] = bytes[x];
      }
    }
    String encode = "gbk";
    try {
      String str = new String(ret, encode);
      return str;
    } catch (Exception e) {
    }
    return "";
  }

  public static String toPaddedStringFromAscii(byte[] bytes) {
    String str = toStringFromAscii(bytes);
    StringBuilder ret = new StringBuilder(str.length() * 3);
    for (int i = 0; i < str.length(); i++) {
      ret.append(str.charAt(i));
      ret.append("  ");
    }
    return ret.toString();
  }

  public static byte[] getByteArrayFromHexString1(String hex) {
    ByteArrayOutputStream baos = new ByteArrayOutputStream();
    int nexti = 0;
    int nextb = 0;
    boolean highoc = true;
    outer:
    //boolean highoc = true;
    while (true) {
      int number = -1;
      while (number == -1) {
        if (nexti == hex.length()) {
          break outer;
        }
        char chr = hex.charAt(nexti);
        if ((chr >= '0') && (chr <= '9')) {
          number = chr - '0';
        } else if ((chr >= 'a') && (chr <= 'f')) {
          number = chr - 'a' + 10;
        } else if ((chr >= 'A') && (chr <= 'F')) {
          number = chr - 'A' + 10;
        } else {
          number = -1;
        }
        nexti++;
      }
      if (highoc) {
        nextb = number << 4;
        highoc = false;
      } else {
        nextb |= number;
        highoc = true;
        baos.write(nextb);
      }
    }
    label161:
    return baos.toByteArray();
  }

  public static byte[] getByteArrayFromHexString(String hex) {
    ByteArrayOutputStream baos = new ByteArrayOutputStream();
    int nexti = 0;
    int nextb = 0;
    boolean highoc = true;
    outer:
    for (; ; ) {
      int number = -1;
      while (number == -1) {
        if (nexti == hex.length()) {
          break outer;
        }
        char chr = hex.charAt(nexti);
        if (chr >= '0' && chr <= '9') {
          number = chr - '0';
        } else if (chr >= 'a' && chr <= 'f') {
          number = chr - 'a' + 10;
        } else if (chr >= 'A' && chr <= 'F') {
          number = chr - 'A' + 10;
        } else {
          number = -1;
        }
        nexti++;
      }
      if (highoc) {
        nextb = number << 4;
        highoc = false;
      } else {
        nextb |= number;
        highoc = true;
        baos.write(nextb);
      }
    }
    return baos.toByteArray();
  }
}

/* Location:           E:\maoxiandaodanji\dist\cherry.jar
 * Qualified Name:     net.sf.cherry.tools.HexTool
 * JD-Core Version:    0.6.0
 */