package net.sf.cherry.net.mina;

import org.apache.mina.common.ByteBuffer;
import org.apache.mina.common.IoSession;
import org.apache.mina.filter.codec.CumulativeProtocolDecoder;
import org.apache.mina.filter.codec.ProtocolDecoderOutput;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import constants.ServerConfig;
import net.sf.cherry.client.MapleClient;
import net.sf.cherry.net.RecvPacketOpcode;
import net.sf.cherry.net.Constants.GameConstants;
import net.sf.cherry.tools.HexTool;
import net.sf.cherry.tools.MapleAESOFB;
import net.sf.cherry.tools.MapleCustomEncryption;
import net.sf.cherry.tools.data.input.ByteArrayByteStream;
import net.sf.cherry.tools.data.input.GenericLittleEndianAccessor;

public class MaplePacketDecoder extends CumulativeProtocolDecoder {

    private static final String DECODER_STATE_KEY = MaplePacketDecoder.class.getName() + ".STATE";
    private static Logger log = LoggerFactory.getLogger(MaplePacketDecoder.class);

    protected boolean doDecode(IoSession session, ByteBuffer in, ProtocolDecoderOutput out)
            throws Exception {
        MapleClient client = (MapleClient) session.getAttribute("CLIENT");
        DecoderState decoderState = (DecoderState) session.getAttribute(DECODER_STATE_KEY);

        if (decoderState == null) {
            decoderState = new DecoderState();
            session.setAttribute(DECODER_STATE_KEY, decoderState);
        }

        if ((in.remaining() >= 4) && (decoderState.packetlength == -1)) {
            int packetHeader = in.getInt();
           /* if (!client.getReceiveCrypto().checkPacket(packetHeader)) {
                log.warn(MapleClient.getLogMessage(client, "数据报错误 - Client failed packet check -> disconnecting"));
               session.close();
                return false;
            }*/
            decoderState.packetlength = MapleAESOFB.getPacketLength(packetHeader);
        } else if ((in.remaining() < 4) && (decoderState.packetlength == -1)) {
            log.trace("解码…没有足够的数据/就是所谓的包不完整");
            return false;
        }

        if (in.remaining() >= decoderState.packetlength) {
            byte[] decryptedPacket = new byte[decoderState.packetlength];
            in.get(decryptedPacket, 0, decoderState.packetlength);
            decoderState.packetlength = -1;

            client.getReceiveCrypto().crypt(decryptedPacket);
            MapleCustomEncryption.decryptData(decryptedPacket);
            out.write(decryptedPacket);
            if(GameConstants.封包显示){
	            int packetLen = decryptedPacket.length;
	            short pHeader = readFirstShort(decryptedPacket);
	            if (!ServerConfig.isIgnorePack(pHeader)) {
		            String pHeaderStr = Integer.toHexString(pHeader).toUpperCase();
		            String op = lookupSend(pHeader);
		            String Send = "【客户端发送】 " + op + " [" + pHeaderStr + "] (" + packetLen + ")\r\n";
		            if (packetLen <= 3000) {
		                String SendTo = Send + HexTool.toString(decryptedPacket) + "\r\n" + HexTool.toString(decryptedPacket);
		                log.info(Send);
		                FileoutputUtil.packetLog("log\\客户端封包.log", SendTo);
		                //System.out.println(SendTo);
		                String SendTos = "\r\n时间：" + FileoutputUtil.CurrentReadable_Time() + "  ";
		                if (op.equals("UNKNOWN")){
		                	FileoutputUtil.packetLog("log\\未知客服端封包.log", SendTos + SendTo);
		                }
		            } else {
		                log.info(HexTool.toString(new byte[]{decryptedPacket[0], decryptedPacket[1]}) + "...");
		            }
	            }
            }
            return true;
        }
        log.trace("decode... not enough data to decode (need {})", Integer.valueOf(decoderState.packetlength));
        return false;
    }

    private static class DecoderState {

        public int packetlength = -1;
    }

    private String lookupSend(int val) {
        for (RecvPacketOpcode op : RecvPacketOpcode.values()) {
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

