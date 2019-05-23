 package net.sf.cherry.net.login.handler;
 
import java.net.SocketAddress;

import net.sf.cherry.client.MapleCharacter;
import net.sf.cherry.client.MapleClient;
import net.sf.cherry.net.MaplePacketHandler;
import net.sf.cherry.net.login.LoginServer;
import net.sf.cherry.net.login.LoginWorker;
import net.sf.cherry.tools.MaplePacketCreator;
import net.sf.cherry.tools.data.input.SeekableLittleEndianAccessor;
 
 public class LoginPasswordHandler
   implements MaplePacketHandler
 {
   public boolean validateState(MapleClient c)
   {
     return !c.isLoggedIn();
   }
 
   public void handlePacket(SeekableLittleEndianAccessor slea, MapleClient c)
   {
     String login = slea.readMapleAsciiString();
     String pwd = slea.readMapleAsciiString();
     SocketAddress ip = c.getSession().getRemoteAddress(); //远程地址
    // String skillMD5 = "75775165a809a3d6af181ffdca6f14d8";
     c.setAccountName(login);
  /*  if(c.getPlayer().getskillmd5() != skillMD5){
         c.getSession().write(MaplePacketCreator.serverNotice(1, "系统无法让你登陆!\r\n请确保你没有：擅自修改数据文件，使用其他登录器。"));
         System.out.println("读取的MD5表为A："+c.getPlayer().getskillmd5()+"");
         return;
        }*/
     int loginok = 0;
     boolean ipBan = c.hasBannedIP();
     boolean macBan = c.hasBannedMac();

     loginok = c.login(login, pwd, (ipBan) || (macBan));
     ipBan = c.hasBannedIP();
     macBan = c.hasBannedMac();
 
     if ((loginok == 0) && ((ipBan) || (macBan))) {
       loginok = 3;
       if (macBan) {
         String[] ipSplit = c.getSession().getRemoteAddress().toString().split(":");
         MapleCharacter.ban(ipSplit[0], "Enforcing account ban, account " + login, false);
       }
 
     }
/*if(!c.getskillmd5().equals(c.getskillmd5S())){
                         c.getSession().write(MaplePacketCreator.serverNotice(1,"禁止登陆：错误代码：0\r\n参数不正确\r\n【登陆IP："+ip+"】\r\n如果掉线请重新运行冒险岛"));
             System.out.println("你的MD5读取："+c.getskillmd5()+".需要验证的为："+c.getskillmd5S()+"");
            System.out.println("你的IP为："+ip);
             return;
         }else if(c.getskillmd5().equals(c.getskillmd5SS())){
             c.getSession().write(MaplePacketCreator.serverNotice(1,"禁止登陆：错误代码：WZ\r\n请重新运行游戏\r\n【登陆IP："+ip+"】"));
             return;
         }*/
     if (loginok != 0) {
       c.getSession().write(MaplePacketCreator.getLoginFailed(loginok));
       return;
     }
     if (c.getGender() == -1) {
       c.updateLoginState(MapleClient.ENTERING_PIN);
       c.getSession().write(MaplePacketCreator.genderNeeded(c));
     } else {
       c.getSession().write(MaplePacketCreator.getAuthSuccess(c));
       c.updateLoginState(MapleClient.LOGIN_LOGGEDIN);
       c.getSession().write(MaplePacketCreator.getServerList(0, LoginServer.getInstance().getServerName(), LoginServer.getInstance().getLoad()));
       c.getSession().write(MaplePacketCreator.getEndOfServerList());
       LoginWorker.getInstance().updateLoad();
     }
     
   }
 }
