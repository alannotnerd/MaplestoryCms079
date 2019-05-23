 package net.sf.cherry.net.channel.handler;
 
 import java.rmi.RemoteException;

import net.sf.cherry.client.MapleClient;
import net.sf.cherry.net.AbstractMaplePacketHandler;
import net.sf.cherry.net.world.guild.MapleAlliance;
import net.sf.cherry.tools.MaplePacketCreator;
import net.sf.cherry.tools.data.input.SeekableLittleEndianAccessor;
 
 public class AllianceOperationHandler extends AbstractMaplePacketHandler
 {
   public void handlePacket(SeekableLittleEndianAccessor slea, MapleClient c)
   {
     ////System.out.println(slea.toString());
     c.doneedlog(this, c.getPlayer());
     MapleAlliance alliance = null;
     if ((c.getPlayer().getGuild() != null) && (c.getPlayer().getGuild().getAllianceId() > 0)) {
       try {
         alliance = c.getChannelServer().getWorldInterface().getAlliance(c.getPlayer().getGuild().getAllianceId());
       } catch (RemoteException rawr) {
         c.getChannelServer().reconnectWorld();
       }
     }
     if (alliance == null) {
       c.getPlayer().dropMessage("系统错误 !");
       c.getSession().write(MaplePacketCreator.enableActions());
       return;
     }if ((c.getPlayer().getMGC().getAllianceRank() > 2) || (!alliance.getGuilds().contains(Integer.valueOf(c.getPlayer().getGuildId())))) {
       c.getSession().write(MaplePacketCreator.enableActions());
       return;
     }
 
     try
     {
       switch (slea.readByte()) {
       case 10:
         String notice = slea.readMapleAsciiString();
         c.getChannelServer().getWorldInterface().setAllianceNotice(alliance.getId(), notice);
         c.getChannelServer().getWorldInterface().allianceMessage(alliance.getId(), MaplePacketCreator.allianceNotice(alliance.getId(), notice), -1, -1);
         break;
       case 8:
         String[] ranks = new String[5];
         for (int i = 0; i < 5; i++) {
           ranks[i] = slea.readMapleAsciiString();
         }
         c.getChannelServer().getWorldInterface().setAllianceRanks(alliance.getId(), ranks);
         c.getChannelServer().getWorldInterface().allianceMessage(alliance.getId(), MaplePacketCreator.changeAllianceRankTitle(alliance.getId(), ranks), -1, -1);
         break;
       case 3:
       default:
         c.getPlayer().dropMessage("Feature not available");
       }
       alliance.saveToDB();
     } catch (RemoteException rawr) {
       c.getChannelServer().reconnectWorld();
     }
   }
 }

/* Location:           E:\maoxiandaodanji\dist\cherry.jar
 * Qualified Name:     net.sf.cherry.net.channel.handler.AllianceOperationHandler
 * JD-Core Version:    0.6.0
 */