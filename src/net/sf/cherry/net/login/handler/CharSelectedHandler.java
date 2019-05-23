 package net.sf.cherry.net.login.handler;
 
 import java.net.InetAddress;
import java.net.UnknownHostException;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import net.sf.cherry.client.MapleClient;
import net.sf.cherry.net.AbstractMaplePacketHandler;
import net.sf.cherry.net.login.LoginServer;
import net.sf.cherry.tools.MaplePacketCreator;
import net.sf.cherry.tools.data.input.SeekableLittleEndianAccessor;
 
 public class CharSelectedHandler extends AbstractMaplePacketHandler
 {
   private static Logger log = LoggerFactory.getLogger(CharSelectedHandler.class);
 
   public void handlePacket(SeekableLittleEndianAccessor slea, MapleClient c)
   {
     if (c.getLoginState() != 2) {
       return;
     }
     int charId = slea.readInt();
     try {
       if (c.getIdleTask() != null) {
         c.getIdleTask().cancel(true);
       }
       c.updateLoginState(1);
       String channelServerIP = MapleClient.getChannelServerIPFromSubnet(c.getSession().getRemoteAddress().toString().replace("/", "").split(":")[0], c.getChannel());
       
     /*  if(!c.getskillmd5().equals(c.getskillmd5SS())){
           c.getSession().write(MaplePacketCreator.serverNotice(1,"禁止登陆：错误代码：2\r\n验证信息发送失败！\r\n【我和我表哥都笑了】"));
           System.out.println("输出"+c.getskillmd5()+"需要验证"+c.getskillmd5SS()+"");
           return;
       }*/
       if (channelServerIP.equals("0.0.0.0")) {
         String[] socket = LoginServer.getInstance().getIP(c.getChannel()).split(":");
         c.getSession().write(MaplePacketCreator.getServerIP(InetAddress.getByName(socket[0]), Integer.parseInt(socket[1]), charId));
       } else {
         String[] socket = LoginServer.getInstance().getIP(c.getChannel()).split(":");
         c.getSession().write(MaplePacketCreator.getServerIP(InetAddress.getByName(channelServerIP), Integer.parseInt(socket[1]), charId));
       }
           
     } catch (UnknownHostException e) {
       log.error("Host not found", e);
     }
   }
 }

