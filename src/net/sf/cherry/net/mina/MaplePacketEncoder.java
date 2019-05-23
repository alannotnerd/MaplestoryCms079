 package net.sf.cherry.net.mina;
 
 import org.apache.mina.common.ByteBuffer;
import org.apache.mina.common.IoSession;
import org.apache.mina.filter.codec.ProtocolEncoder;
import org.apache.mina.filter.codec.ProtocolEncoderOutput;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import constants.ServerConfig;
import net.sf.cherry.client.MapleClient;
import net.sf.cherry.net.MaplePacket;
import net.sf.cherry.net.SendPacketOpcode;
import net.sf.cherry.net.Constants.GameConstants;
import net.sf.cherry.tools.HexTool;
import net.sf.cherry.tools.MapleCustomEncryption;
import net.sf.cherry.tools.data.input.ByteArrayByteStream;
import net.sf.cherry.tools.data.input.GenericLittleEndianAccessor;
 
 public class MaplePacketEncoder
   implements ProtocolEncoder
 {
   private static Logger log = LoggerFactory.getLogger(MaplePacketEncoder.class);
 
   public synchronized void encode(IoSession session, Object message, ProtocolEncoderOutput out) throws Exception {
     MapleClient client = (MapleClient)session.getAttribute("CLIENT");
     if (client != null)
       synchronized (client.getSendCrypto()) {
         byte[] input = ((MaplePacket)message).getBytes();
         if(GameConstants.封包显示){
            int packetLen = input.length;
            short pHeader = readFirstShort(input);
            if (!ServerConfig.isIgnorePack客户端发送(pHeader)) {
	            String pHeaderStr = Integer.toHexString(pHeader).toUpperCase();
	            String op = lookupRecv(pHeader);
	            String Recv = "【服务端发送】 " + op + " [" + pHeaderStr + "] (" + packetLen + ")\r\n";
	            if (packetLen <= 50000) {
	                 String RecvTo = Recv + HexTool.toString(input) + "\r\n" + HexTool.toStringFromAscii(input);
	                 FileoutputUtil.packetLog("log\\服务端封包.log", RecvTo);
	                 //System.out.println(RecvTo);
	                 log.info(Recv+"\r\n"+HexTool.toString(input));
	            } else {
	                log.info(HexTool.toString(new byte[]{input[0],input[1]})+" ...");
	            }
            }
         }
         byte[] unencrypted = new byte[input.length];
         System.arraycopy(input, 0, unencrypted, 0, input.length);
         byte[] ret = new byte[unencrypted.length + 4];
         byte[] header = client.getSendCrypto().getPacketHeader(unencrypted.length);
         MapleCustomEncryption.encryptData(unencrypted);
         client.getSendCrypto().crypt(unencrypted);
         System.arraycopy(header, 0, ret, 0, 4);
         System.arraycopy(unencrypted, 0, ret, 4, unencrypted.length);
         ByteBuffer out_buffer = ByteBuffer.wrap(ret);
         out.write(out_buffer);
       }
     else
       out.write(ByteBuffer.wrap(((MaplePacket)message).getBytes()));
   }
 
   public void dispose(IoSession session)
     throws Exception{
   }
    private String lookupRecv(int val) {
     for (SendPacketOpcode op : SendPacketOpcode.values()) {
       if (op.getValue() == val) {
         return op.name();
       }
     }
     return "UNKNOWN";
   }
    private short readFirstShort(byte[] arr) {
         return new GenericLittleEndianAccessor(new ByteArrayByteStream(arr)).readShort();
   }
 }

