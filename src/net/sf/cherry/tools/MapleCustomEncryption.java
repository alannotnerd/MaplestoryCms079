 package net.sf.cherry.tools;
 
 public class MapleCustomEncryption
 {
   public static byte[] encryptData(byte[] data)
   {
     for (int j = 0; j < 6; j++) {
       byte remember = 0;
       byte dataLength = (byte)(data.length & 0xFF);
 
       if (j % 2 == 0)
         for (int i = 0; i < data.length; i++) {
           byte cur = data[i];
           cur = BitTools.rollLeft(cur, 3);
           cur = (byte)(cur + dataLength);
           cur = (byte)(cur ^ remember);
           remember = cur;
           cur = BitTools.rollRight(cur, dataLength & 0xFF);
           cur = (byte)((cur ^ 0xFFFFFFFF) & 0xFF);
           cur = (byte)(cur + 72);
           dataLength = (byte)(dataLength - 1);
           data[i] = cur;
         }
       else {
         for (int i = data.length - 1; i >= 0; i--) {
           byte cur = data[i];
           cur = BitTools.rollLeft(cur, 4);
           cur = (byte)(cur + dataLength);
           cur = (byte)(cur ^ remember);
           remember = cur;
           cur = (byte)(cur ^ 0x13);
           cur = BitTools.rollRight(cur, 3);
           dataLength = (byte)(dataLength - 1);
           data[i] = cur;
         }
       }
     }
 
     return data;
   }
 
   public static byte[] decryptData(byte[] data)
   {
     for (int j = 1; j <= 6; j++) {
       byte remember = 0;
       byte dataLength = (byte)(data.length & 0xFF);
       byte nextRemember = 0;
 
       if (j % 2 == 0)
         for (int i = 0; i < data.length; i++) {
           byte cur = data[i];
           cur = (byte)(cur - 72);
           cur = (byte)((cur ^ 0xFFFFFFFF) & 0xFF);
           cur = BitTools.rollLeft(cur, dataLength & 0xFF);
           nextRemember = cur;
           cur = (byte)(cur ^ remember);
           remember = nextRemember;
           cur = (byte)(cur - dataLength);
           cur = BitTools.rollRight(cur, 3);
           data[i] = cur;
           dataLength = (byte)(dataLength - 1);
         }
       else {
         for (int i = data.length - 1; i >= 0; i--) {
           byte cur = data[i];
           cur = BitTools.rollLeft(cur, 3);
           cur = (byte)(cur ^ 0x13);
           nextRemember = cur;
           cur = (byte)(cur ^ remember);
           remember = nextRemember;
           cur = (byte)(cur - dataLength);
           cur = BitTools.rollRight(cur, 4);
           data[i] = cur;
           dataLength = (byte)(dataLength - 1);
         }
       }
     }
 
     return data;
   }
 }

/* Location:           E:\maoxiandaodanji\dist\cherry.jar
 * Qualified Name:     net.sf.cherry.tools.MapleCustomEncryption
 * JD-Core Version:    0.6.0
 */