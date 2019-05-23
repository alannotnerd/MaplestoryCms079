package net.sf.cherry.net.channel.handler;
import java.rmi.RemoteException;
import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.Collection;
import java.util.List;
import java.util.logging.Level;

import org.slf4j.LoggerFactory;

import net.sf.cherry.client.BuddylistEntry;
import net.sf.cherry.client.MapleCharacter;
import net.sf.cherry.client.MapleClient;
import net.sf.cherry.client.MapleQuestStatus;
import net.sf.cherry.client.SkillFactory;
import net.sf.cherry.database.DatabaseConnection;
import net.sf.cherry.net.AbstractMaplePacketHandler;
import net.sf.cherry.net.channel.ChannelServer;
import net.sf.cherry.net.world.CharacterIdChannelPair;
import net.sf.cherry.net.world.MaplePartyCharacter;
import net.sf.cherry.net.world.PartyOperation;
import net.sf.cherry.net.world.guild.MapleAlliance;
import net.sf.cherry.net.world.remote.WorldChannelInterface;
import net.sf.cherry.server.quest.MapleQuest;
import net.sf.cherry.tools.MaplePacketCreator;
import net.sf.cherry.tools.data.input.SeekableLittleEndianAccessor;

public class PlayerLoggedinHandler extends AbstractMaplePacketHandler {

    private static final org.slf4j.Logger log = LoggerFactory.getLogger(PlayerLoggedinHandler.class);

    public boolean validateState(MapleClient c) {
        return !c.isLoggedIn();
    }

    @Override
    public void handlePacket(SeekableLittleEndianAccessor slea, MapleClient c) {
        c.doneedlog(this, c.getPlayer());
        int cid = slea.readInt();
        MapleCharacter player = null;
        try {
            player = MapleCharacter.loadCharFromDB(cid, c, true);
            c.setPlayer(player);
        } catch (SQLException e) {
            log.error("Loading the char failed", e);
        }
        c.setAccID(player.getAccountID());
        int state = c.getLoginState();
        boolean allowLogin = true;
        ChannelServer channelServer = c.getChannelServer();
        synchronized (this) {
            try {
                WorldChannelInterface worldInterface = channelServer.getWorldInterface();
                if (state == 1) {
                    for (String charName : c.loadCharacterNames(c.getWorld())) {
                        if (worldInterface.isConnected(charName)) {
                            allowLogin = false;
                            break;
                        }
                    }
                }
            } catch (RemoteException e) {
                channelServer.reconnectWorld();
                allowLogin = false;
            }
            if ((state == 2) || (!allowLogin)) {
                c.setPlayer(null);
                c.disconnect();
                return;
            }
            c.updateLoginState(2);
        }
        ChannelServer cserv = ChannelServer.getInstance(c.getChannel());
        if (player.getCherryBan()) {
            player.setMap(c.getChannelServer().getMapFactory().getMap(910000002));
        }
        cserv.addPlayer(player);
        try {
            List buffs = ChannelServer.getInstance(c.getChannel()).getWorldInterface().getBuffsFromStorage(cid);
            if (buffs != null) {
                c.getPlayer().silentGiveBuffs(buffs);
            }
        } catch (RemoteException e) {
            c.getChannelServer().reconnectWorld();
        }
        Connection con = DatabaseConnection.getConnection();
        PreparedStatement ps = null;
        ResultSet rs = null;
        try {
            ps = con.prepareStatement("SELECT skillid, starttime,length FROM cooldowns WHERE characterid = ?");
            ps.setInt(1, c.getPlayer().getId());
            rs = ps.executeQuery();
            while (rs.next()) {
                if (rs.getLong("length") + rs.getLong("starttime") - System.currentTimeMillis() <= 0L) {
                    continue;
                }
                c.getPlayer().giveCoolDowns(rs.getInt("skillid"), rs.getLong("starttime"), rs.getLong("length"));
            }
            rs.close();
            ps.close();
            ps = con.prepareStatement("DELETE FROM cooldowns WHERE characterid = ?");
            ps.setInt(1, c.getPlayer().getId());
            ps.executeUpdate();
            ps.close();
        } catch (SQLException ex) {
            ex.printStackTrace();
        } finally {
            try {
                if (rs != null) {
                    rs.close();
                }
                if (ps != null) {
                    ps.close();
                }
            } catch (SQLException ex) {
            }
        }
        c.getSession().write(MaplePacketCreator.getCharInfo(player));
        System.out.println("当前玩家【"+ c.getPlayer().getName() + "】连接进入"+c.getChannel()+"频道！");  
        
        if (player.gmLevel() > 0) {
            int[] skills = {
            		9001001,  //轻功 [最高等级 : 1]\n15分内增加周边角色的移动速度和跳跃力。
            		//9001002,  //圣化之力  [最高等级 : 1]\n15分内周边角色打怪时，取得更多经验值。
            		9001003,  //祝福 [最高等级 : 1]\n15分内周边角色的各种能力值大幅增加。
            		//9001004,  //隐藏术  [最高等级 : 1]\n隐藏自己，其他角色看不见。使用技能会被解除。
            		9001008,  //神圣之火[最高等级:1]15分钟内,强化肉体全体最大HP和最大MP提升60%
            		}; 
            for (int i : skills) {
                SkillFactory.getSkill(i).getEffect(SkillFactory.getSkill(i).getMaxLevel()).applyTo(player);
            }

        }
   /*
        if (player.gmLevel() > 0) {
        int[] skills = { 5110001 };
        for (int i : skills) {
        SkillFactory.getSkill(i).getEffect(SkillFactory.getSkill(i).getMaxLevel()).applyTo(player);
        }
   }

        if(c.getChannel() == 2){
        System.out.println("当前连接进了"+c.getChannel()+"频道！");
        c.getPlayer().getMap().removePlayer(c.getPlayer());
        return;
        }
        System.out.println("连接进了"+c.getChannel()+"线。");
       if (!c.getPlayer().getmd5data().equals(c.getPlayer().getskillmd5S())) {//验证失败
        c.getPlayer().dropMessage(1, "验证失败！");
        c.disconnect();
        return;
        } else if(!c.getPlayer().getmd5data().equals(c.getskillmd5S())){
        c.getPlayer().dropMessage(1, "验证失败！");
        c.disconnect();
         }else{
          c.getPlayer().dropMessage("客户端数据验证成功....欢迎来到冒险岛!");}
        if(c.getPlayer().getPresent() < 1){
        NPCScriptManager.getInstance().start(c, 9900007, 101);
        c.getSession().write(MaplePacketCreator.enableActions());
        }*/
        if (c.getPlayer().getJob().getId() >= 2000 && c.getPlayer().getJob().getId() <= 2112) {//如果是战神
            c.getPlayer().changeSkillLevel(SkillFactory.getSkill(20000012), c.getPlayer().getjinglingskill(), 20);
        }
        if (c.getPlayer().getJob().getId() >= 1000 && c.getPlayer().getJob().getId() <= 1411) {//如果是骑士团
            c.getPlayer().changeSkillLevel(SkillFactory.getSkill(10000012), c.getPlayer().getjinglingskill(), 20);
        }
        if (c.getPlayer().getJob().getId() >= 100 && c.getPlayer().getJob().getId() <= 522) {//如果是冒险家
            c.getPlayer().changeSkillLevel(SkillFactory.getSkill(12), c.getPlayer().getjinglingskill(), 20);
        }
        if (c.getPlayer().isGM()) {
            c.getPlayer().dropMessage("[欢迎] 尊敬的管理员 " + c.getPlayer().getName() + " ,当前在线人数为: " + c.getPlayer().Lianjie());
            System.out.println("当前管理员【"+ c.getPlayer().getName() + "】连接进入"+c.getChannel()+"频道！");
        }

        if (player.getCherryBan()) {
            player.getClient().getSession().write(MaplePacketCreator.serverNotice(1, player.getCherryBanTimestamp().getYear() + 1900 + "年" + (player.getCherryBanTimestamp().getMonth() + 1) + "月" + player.getCherryBanTimestamp().getDate() + "日以后起\r\n恢复正常游戏状态。"));
        }
        
        
//		if ((c.getPlayer().getvip() == 8) && (!player.isGM()))
//			try {
//				c.getChannelServer().getWorldInterface().broadcastMessage(null,MaplePacketCreator.serverNotice(11, c.getChannel(),new StringBuilder().append("[全服公告] : ").append("VIP⑤玩家").append(":").toString() + c.getPlayer().getName() + " 来到我们的游戏世界！大家欢迎！",true).getBytes());
//			} catch (RemoteException ex) {
//				java.util.logging.Logger.getLogger(PlayerLoggedinHandler.class.getName()).log(Level.SEVERE, null, ex);
//			}

                 /*       if (c.getPlayer().getvip() >= 1 && c.getPlayer().getvip() <= 3){
AutobanManager.getInstance().broadcastMessage(player.getClient(),  "热烈欢迎破功玩家 ["+ c.getPlayer().getName() + "]进入游戏,大家赶快搜刮Ta吧!!!");
        
                        if (c.getPlayer().getvip() == 4){
AutobanManager.getInstance().broadcastMessage(player.getClient(),  "热烈欢迎VIP① ["+ c.getPlayer().getName() + "]进入游戏,大家赶快搜刮Ta吧!!!");
        
                       } else if (c.getPlayer().getvip() == 5){
AutobanManager.getInstance().broadcastMessage(player.getClient(),  "热烈欢迎VIP② ["+ c.getPlayer().getName() + "]进入游戏,大家赶快搜刮Ta吧!!!");
        
                       } else if (c.getPlayer().getvip() == 6){
AutobanManager.getInstance().broadcastMessage(player.getClient(),  "热烈欢迎VIP③ ["+ c.getPlayer().getName() + "]进入游戏,大家赶快搜刮Ta吧!!");
        
                       } else if (c.getPlayer().getvip() == 7){
AutobanManager.getInstance().broadcastMessage(player.getClient(),  "热烈欢迎VIP④ ["+ c.getPlayer().getName() + "]进入游戏,大家赶快搜刮Ta吧!!!连接进入["+c.getChannel()+"]频道");
*/





        //c.getPlayer().在线时间(60000);//在线时间读取/生效
        player.sendKeymap();//地图数据
        c.getSession().write(MaplePacketCreator.sendAutoHpPot(c.getPlayer().getAutoHpPot()));//宠物吃药
        c.getSession().write(MaplePacketCreator.sendAutoMpPot(c.getPlayer().getAutoMpPot()));//宠物吃药
        player.getMap().addPlayer(player);//加入地图
        try {

            Collection buddies = player.getBuddylist().getBuddies();
            int[] buddyIds = player.getBuddylist().getBuddyIds();
            cserv.getWorldInterface().loggedOn(player.getName(), player.getId(), c.getChannel(), buddyIds);
            if (player.getParty() != null) {
                channelServer.getWorldInterface().updateParty(player.getParty().getId(), PartyOperation.LOG_ONOFF, new MaplePartyCharacter(player));
            }
            CharacterIdChannelPair[] onlineBuddies = cserv.getWorldInterface().multiBuddyFind(player.getId(), buddyIds);
            for (CharacterIdChannelPair onlineBuddy : onlineBuddies) {
                BuddylistEntry ble = player.getBuddylist().get(onlineBuddy.getCharacterId());
                ble.setChannel(onlineBuddy.getChannel());
                player.getBuddylist().put(ble);
            }
            //c.getSession().write(MaplePacketCreator.updateBuddylist(buddies));//重载好友
            c.getSession().write(MaplePacketCreator.loadFamily(player));//重载学院 updateQuest
            // c.getSession().write(MaplePacketCreator.updateQuest(status);                                                                                                                                                c.getSession().write(MaplePacketCreator.updateQuestInfo(player))
            if (player.getFamilyId() > 0) {//家族ID
                c.getSession().write(MaplePacketCreator.getFamilyInfo(player));
            }
            // c.getPlayer().clearMacros();
            //  c.getPlayer().reloadQuest(null);
            c.getPlayer().sendMacros();//重载技能宏
            //c.getPlayer().updateQuest(null);
            if (player.getGuildId() > 0) { //家族类
                c.getChannelServer().getWorldInterface().setGuildMemberOnline(player.getMGC(), true, c.getChannel());
                c.getSession().write(MaplePacketCreator.showGuildInfo(player));
                int allianceId = player.getGuild().getAllianceId();
                if (allianceId > 0) {//联盟
                    MapleAlliance newAlliance = channelServer.getWorldInterface().getAlliance(allianceId);
                    if (newAlliance == null) {
                        newAlliance = MapleAlliance.loadAlliance(allianceId);
                        channelServer.getWorldInterface().addAlliance(allianceId, newAlliance);
                    }//联盟结束
                    c.getSession().write(MaplePacketCreator.getAllianceInfo(newAlliance));//家族联盟
                    c.getSession().write(MaplePacketCreator.getGuildAlliances(newAlliance, c));//家族
                    c.getChannelServer().getWorldInterface().allianceMessage(allianceId, MaplePacketCreator.allianceMemberOnline(player, true), player.getId(), -1);
                }
            }
        } catch (RemoteException e) {
            log.info("REMOTE THROW", e);
            channelServer.reconnectWorld();
        }
        player.updatePartyMemberHP();
        for (MapleQuestStatus status : player.getStartedQuests()) {
            if (status.hasMobKills()) {
                c.getSession().write(MaplePacketCreator.updateQuestMobKills(status));//重载任务杀怪
            }
        }
        // CharacterNameAndId pendingBuddyRequest = player.getBuddylist().pollPendingRequest();
       /* if (pendingBuddyRequest != null) {
        player.getBuddylist().put(new BuddylistEntry(pendingBuddyRequest.getName(), pendingBuddyRequest.getId(), -1, false));
        c.getSession().write(MaplePacketCreator.requestBuddylistAdd(pendingBuddyRequest.getId(), pendingBuddyRequest.getName()));
        }*/
        try {
            player.showNote();
        } catch (SQLException ex) {
            java.util.logging.Logger.getLogger(PlayerLoggedinHandler.class.getName()).log(Level.SEVERE, null, ex);
        }
        player.checkMessenger();
        player.showMapleTips();
        player.checkBerserk();
        player.checkDuey();

        c.getSession().write(MaplePacketCreator.showCharCash(c.getPlayer()));
        c.getSession().write(MaplePacketCreator.weirdStatUpdate());
    }
 }



    
  
