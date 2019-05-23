package net.sf.cherry.client.messages.commands;

import java.rmi.RemoteException;
import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.text.DateFormat;
import java.util.Calendar;
import java.util.Collection;

import net.sf.cherry.client.MapleCharacter;
import net.sf.cherry.client.MapleCharacterUtil;
import net.sf.cherry.client.MapleClient;
import net.sf.cherry.client.messages.Command;
import net.sf.cherry.client.messages.CommandDefinition;
import net.sf.cherry.client.messages.CommandProcessor;
import net.sf.cherry.client.messages.IllegalCommandSyntaxException;
import net.sf.cherry.client.messages.MessageCallback;
import net.sf.cherry.database.DatabaseConnection;
import net.sf.cherry.net.channel.ChannelServer;
import net.sf.cherry.server.MaplePortal;
import net.sf.cherry.server.maps.MapleMap;
import net.sf.cherry.tools.MaplePacketCreator;
import net.sf.cherry.tools.StringUtil;

public class BanningCommands
        implements Command {

    @Override
    public void execute(MapleClient c, MessageCallback mc, String[] splitted)
            throws Exception {
        ChannelServer cserv = c.getChannelServer();
        if (splitted[0].equals("!封号处理")) {
            String playerid = splitted[1];
            String playerName = "";
            if (splitted.length < 3) {
                throw new IllegalCommandSyntaxException(3);
            }
            MapleCharacter target = null;
            Collection<ChannelServer> cservs = ChannelServer.getAllInstances();
            for (ChannelServer cserver : cservs) {
                target = cserver.getPlayerStorage().getCharacterById(Integer.parseInt(playerid));
                if (target != null) {
                    playerName = target.getName();
                    break;
                }
            }
            String originalReason = StringUtil.joinStringFrom(splitted, 2);
            String reason = c.getPlayer().getName() + " 使用权限封停 " + playerName + "理由: " + originalReason;
            if (target != null) {
                if (target.getGMLevel() <= c.getPlayer().getGMLevel()) {
                    String readableTargetName = MapleCharacterUtil.makeMapleReadable(target.getName());
                    String ip = target.getClient().getSession().getRemoteAddress().toString().split(":")[0];
                    reason = reason + " (IP: " + ip + ")";
                    target.ban(reason);
                    try {
                        cserv.getWorldInterface().broadcastMessage(null, MaplePacketCreator.serverNotice(6, "[公告事项]" + readableTargetName + " 由于使用非法程序被永久封停处理。").getBytes());
                    } catch (RemoteException e) {
                        cserv.reconnectWorld();
                    }
                    mc.dropMessage(readableTargetName + "'连接IP： " + ip + ".");
                } else {
                    mc.dropMessage("不可封停的管理员");
                }
            } else {
                int status = 0;
                PreparedStatement ps = null;
                ResultSet rs = null;
                PreparedStatement psb = null;
                ResultSet rsb = null;
                try {
                    Connection con = DatabaseConnection.getConnection();
                    ps = con.prepareStatement("SELECT accountid, name FROM characters WHERE name = ?");
                    ps.setString(1, playerName);
                    rs = ps.executeQuery();
                    if (rs.next()) {
                        int accountid = rs.getInt("accountid");
                        playerName = rs.getString("name");
                        psb = con.prepareStatement("SELECT banned FROM accounts WHERE id = ?");
                        psb.setInt(1, accountid);
                        rsb = psb.executeQuery();
                        rsb.next();
                        if (rsb.getInt("banned") == 1) {
                            status = 1;
                        }
                        rsb.close();
                        psb.close();
                    } else {
                        status = -1;
                    }
                    rs.close();
                    ps.close();
                } catch (SQLException ex) {
                } finally {
                    try {
                        if (rsb != null) {
                            rsb.close();
                        }
                        if (psb != null) {
                            psb.close();
                        }
                        if (rs != null) {
                            rs.close();
                        }
                        if (ps != null) {
                            ps.close();
                        }
                    } catch (SQLException ex) {
                    }
                }
                if (status != 0) {
                    if (status == 1) {
                        mc.dropMessage(playerName + "'帐号已成功封停。");
                    } else if (status == -1) {
                        mc.dropMessage("玩家： '" + playerName + "' 不存在。");
                    }
                    return;
                }
                if (MapleCharacter.ban(playerName, reason, false)) {
                    mc.dropMessage(playerName + "'帐号已成功离线封停。");
                    try {
                        cserv.getWorldInterface().broadcastMessage(c.getPlayer().getName(), MaplePacketCreator.serverNotice(6, playerName + " 已被禁止登陆游戏.").getBytes());
                    } catch (RemoteException e) {
                        cserv.reconnectWorld();
                    }
                }
            }
        } else if (splitted[0].equals("!tempban")) {
            Calendar tempB = Calendar.getInstance();
            String originalReason = CommandProcessor.joinAfterString(splitted, ":");

            if ((splitted.length < 4) || (originalReason == null)) {
                throw new IllegalCommandSyntaxException(4);
            }

            int yChange = CommandProcessor.getNamedIntArg(splitted, 1, "y", 0);
            int mChange = CommandProcessor.getNamedIntArg(splitted, 1, "m", 0);
            int wChange = CommandProcessor.getNamedIntArg(splitted, 1, "w", 0);
            int dChange = CommandProcessor.getNamedIntArg(splitted, 1, "d", 0);
            int hChange = CommandProcessor.getNamedIntArg(splitted, 1, "h", 0);
            int iChange = CommandProcessor.getNamedIntArg(splitted, 1, "i", 0);
            int gReason = CommandProcessor.getNamedIntArg(splitted, 1, "r", 7);

            String reason = c.getPlayer().getName() + " tempbanned " + splitted[1] + ": " + originalReason;

            if (gReason > 14) {
                mc.dropMessage("You have entered an incorrect ban reason ID, please try again.");
                return;
            }

            DateFormat df = DateFormat.getInstance();
            tempB.set(tempB.get(1) + yChange, tempB.get(2) + mChange, tempB.get(5) + wChange * 7 + dChange, tempB.get(11) + hChange, tempB.get(12) + iChange);

            MapleCharacter victim = cserv.getPlayerStorage().getCharacterByName(splitted[1]);

            if (victim == null) {
                int accId = MapleClient.getAccIdFromCharName(splitted[1]);
                if ((accId >= 0) && (MapleCharacter.tempban(reason, tempB, gReason, accId))) {
                    cserv.getWorldInterface().broadcastMessage(c.getPlayer().getName(), MaplePacketCreator.serverNotice(6, "The character " + splitted[1] + " has been temporarily banned until " + df.format(tempB.getTime()) + " for: " + originalReason).getBytes());
                } else {
                    mc.dropMessage("There was a problem offline banning character " + splitted[1] + ".");
                }
            } else {
                victim.tempban(reason, tempB, gReason);
                cserv.getWorldInterface().broadcastMessage(c.getPlayer().getName(), MaplePacketCreator.serverNotice(6, "The character " + splitted[1] + " has been temporarily banned until " + df.format(tempB.getTime()) + " for: " + originalReason).getBytes());
            }
        } else if (splitted[0].equals("!dc")) {
            int level = 0;
            MapleCharacter victim;
            if (splitted[1].charAt(0) == '-') {
                level = StringUtil.countCharacters(splitted[1], 'f');
                victim = cserv.getPlayerStorage().getCharacterById(Integer.parseInt(splitted[2]));
            } else {
                victim = cserv.getPlayerStorage().getCharacterById(Integer.parseInt(splitted[1]));
            }
            if (level < 2) {
                victim.getClient().disconnect();
                victim.Dci();
            } else {
                mc.dropMessage("Please use dc -f instead.");
            }
        } else if (splitted[0].equals("!临时封号处理")) {
            String splitted1 = splitted[1];
            String splitted2 = splitted[2];
            if ((splitted1 == null) || (splitted1.equals(""))) {
                mc.dropMessage("口令输入错误。");
                return;
            }
            if ((splitted2 == null) || (splitted2.equals(""))) {
                mc.dropMessage("封号理由不能为空，请输入封号原因。");
                return;
            }
            int accId = Integer.parseInt(splitted[1]);
            Calendar tempB = Calendar.getInstance();
            String reason = c.getPlayer().getName() + " tempbanned id:[" + splitted[1] + "].reason: " + splitted[2];
            DateFormat df = DateFormat.getInstance();
            tempB.set(tempB.get(1), tempB.get(2), tempB.get(5) + 3, tempB.get(11), tempB.get(12));
            MapleCharacter victim = cserv.getPlayerStorage().getCharacterById(accId);
            if (victim == null) {
                if ((accId >= 0) && (MapleCharacter.tempban(reason, tempB, 7, accId))) {
                    mc.dropMessage("玩家ID为[" + accId + "]的帐号并不在线，封号成功。停封到" + df.format(tempB.getTime()) + "帐号正常.");
                } else {
                    mc.dropMessage("玩家ID为[" + accId + "]的并不存在.");
                }
            } else {
                victim.cherryTempBan(reason, tempB, 7);
                victim.setCherryBan(true);
                MapleMap target = cserv.getMapFactory().getMap(910000002);
                MaplePortal targetPortal = target.getPortal(0);
                victim.changeMap(target, targetPortal);
                mc.dropMessage("玩家:" + victim.getName() + " 被送往自由市场，限制行为到 " + df.format(tempB.getTime()));

                victim.dropMessage(1, victim.getCherryBanTimestamp().getYear() + 1900 + "年" + (victim.getCherryBanTimestamp().getMonth() + 1) + "月" + victim.getCherryBanTimestamp().getDate() + "日以后起\r\n恢复正常游戏状态。");
            }

       } else if (splitted[0].equalsIgnoreCase("!掉线处理1")) {
            MapleCharacter victim = cserv.getPlayerStorage().getCharacterById(Integer.parseInt(splitted[1]));
            victim.getClient().disconnect();

        } else if (splitted[0].equals("!掉线处理")) {
            int level = 0;
            MapleCharacter victim;
            if (splitted[1].charAt(0) == '-') {
                level = StringUtil.countCharacters(splitted[1], 'f');
                victim = cserv.getPlayerStorage().getCharacterByName(splitted[2]);
            } else {
                victim = cserv.getPlayerStorage().getCharacterByName(splitted[1]);
            }
            if (level < 2) {
                victim.getClient().disconnect();
                victim.Dci();
            } else {
                mc.dropMessage("Please use dc -f instead.");
            }



        } else if (splitted[0].equals("!unban")) {
            String playerName = splitted[1];

            PreparedStatement ps = null;
            ResultSet rs = null;
            PreparedStatement psb = null;
            ResultSet rsb = null;
            try {
                Connection con = DatabaseConnection.getConnection();
                ps = con.prepareStatement("SELECT accountid FROM characters WHERE name = ?");
                ps.setString(1, playerName);
                rs = ps.executeQuery();
                if (rs.next()) {
                    int accountid = rs.getInt("accountid");
                    psb = con.prepareStatement("SELECT banned, tempban FROM accounts WHERE id = ?");
                    psb.setInt(1, accountid);
                    rsb = psb.executeQuery();
                    rsb.next();
                    if ((rsb.getInt("banned") != 1) && (rsb.getLong("tempban") == 0L)) {
                        rsb.close();
                        psb.close();
                        mc.dropMessage(playerName + " account is not banned.");
                        return;
                    }
                    rsb.close();
                    psb.close();
                    psb = con.prepareStatement("UPDATE accounts SET banned = 0, banreason = null, tempban = '2008-00-00 00:00:00', greason = null WHERE id = ?");
                    psb.setInt(1, accountid);
                    psb.executeUpdate();
                    psb.close();
                    mc.dropMessage(playerName + "'：帐号已经成功取消封停.");
                } else {
                    mc.dropMessage(playerName + " 不存在!");
                }
                rs.close();
                ps.close();
            } catch (SQLException ex) {
                //////System.out.println("SQL Exception: " + ex);
            } finally {
                try {
                    if (rsb != null) {
                        rsb.close();
                    }
                    if (psb != null) {
                        psb.close();
                    }
                    if (rs != null) {
                        rs.close();
                    }
                    if (ps != null) {
                        ps.close();
                    }
                } catch (SQLException ex) {
                }
            }
        }
    }

    public CommandDefinition[] getDefinition() {
        return new CommandDefinition[]{new CommandDefinition("封号处理", "charname reason", "Permanently ip, mac and account ban the given character", 5),
                                      // new CommandDefinition("tempban", "<name> [i / m / w / d / h] <amount> [r  [reason id] : Text Reason", "Tempbans the given account", 5),
                                       //new CommandDefinition("dc", "[-f] name", "Disconnects player matching name provided. Use -f only if player is persistent!", 5),
                                       //new CommandDefinition("unban", "<character name>", "Unbans the character's account", 50),
                                       new CommandDefinition("临时封号处理", "charname reason", "Permanently ip, mac and account ban the given character", 5),
                                       new CommandDefinition("掉线处理", "[-f] name", "Disconnects player matching name provided. Use -f only if player is persistent!", 3),
                                       new CommandDefinition("掉线处理1", "[-f] name", "Disconnects player matching name provided. Use -f only if player is persistent!", 3)};
    }
}

/* Location:           E:\maoxiandaodanji\dist\cherry.jar
 * Qualified Name:     net.sf.cherry.client.messages.commands.BanningCommands
 * JD-Core Version:    0.6.0
 */