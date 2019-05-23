package constants;

import java.nio.charset.Charset;
import java.util.Arrays;
import java.util.Collections;
import java.util.List;

import net.sf.cherry.net.RecvPacketOpcode;
import net.sf.cherry.net.SendPacketOpcode;

public class ServerConfig {
	public static Charset STRCHARSET = Charset.forName("GBK");
	
	public static String CONFIG_FILE_NAME = "CherryMS4Love.properties";
	public static String CONFIG_FILE_NAME_DB = "CherryMS4Love.properties";
	public static String CONFIG_FILE_NAME_LOGIN = "CherryMS4Love.properties";
	
	public static String recvops_FILE_NAME = "recvops.properties";
	public static String sendops_FILE_NAME = "sendops.properties";
	
	public static String WZPath = "wz";
	
	public static boolean 异常攻击伤害检测 = false;
	
	
	public static void SetRMIParam() {
		System.setProperty("javax.net.ssl.keyStore", "filename.keystore");
		System.setProperty("javax.net.ssl.keyStorePassword", "passwd");
		System.setProperty("javax.net.ssl.trustStore", "filename.keystore");
		System.setProperty("javax.net.ssl.trustStorePassword", "passwd");
	}
	
	private static List<Integer> ignoreList = (List<Integer>) Collections.unmodifiableList(Arrays.asList(
			RecvPacketOpcode.NPC_ACTION.getValue(), 
			RecvPacketOpcode.MOVE_PLAYER.getValue(), 
			RecvPacketOpcode.CLOSE_RANGE_ATTACK.getValue(), 
			RecvPacketOpcode.STRANGE_DATA.getValue(), 
			RecvPacketOpcode.MOVE_LIFE.getValue(), 
			RecvPacketOpcode.MOVE_PET.getValue(),
			RecvPacketOpcode.PONG.getValue(),
			RecvPacketOpcode.HEAL_OVER_TIME.getValue(),
			RecvPacketOpcode.MOVE_SUMMON.getValue()
            ));
	public static boolean isIgnorePack(Short packetId){
		return ignoreList.contains((int)packetId);
	}
	private static List<Integer> ignoreList_Send = (List<Integer>) Collections.unmodifiableList(Arrays.asList(
			SendPacketOpcode.NPC_ACTION.getValue(), 
			SendPacketOpcode.MOVE_PLAYER.getValue(), 
			SendPacketOpcode.CLOSE_RANGE_ATTACK.getValue(), 
			SendPacketOpcode.MOVE_PET.getValue(),
			SendPacketOpcode.PING.getValue(),
			SendPacketOpcode.MOVE_MONSTER_RESPONSE.getValue(),
			SendPacketOpcode.UPDATE_STATS.getValue(),
			SendPacketOpcode.MOVE_SUMMON.getValue()
            ));
	public static boolean isIgnorePack客户端发送(Short packetId){
		return ignoreList_Send.contains((int)packetId);
	}
}
