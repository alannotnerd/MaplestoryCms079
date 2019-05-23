 package net.sf.cherry.client.messages.commands;
 
import net.sf.cherry.client.MapleCharacter;
import net.sf.cherry.client.MapleClient;
import net.sf.cherry.client.messages.Command;
import net.sf.cherry.client.messages.CommandDefinition;
import net.sf.cherry.client.messages.IllegalCommandSyntaxException;
import net.sf.cherry.client.messages.MessageCallback;
import net.sf.cherry.net.channel.ChannelServer;
import net.sf.cherry.server.TimerManager;
import net.sf.cherry.tools.MaplePacketCreator;
 
 public class RateCommands
   implements Command
 {

    @Override
    public void execute(MapleClient c, MessageCallback mc, String[] splitted) throws Exception, IllegalCommandSyntaxException {
        if (splitted[0].equals("!倍率修改")) {
            if (splitted.length > 2) {
                int arg = Integer.parseInt(splitted[2]);
                int seconds = Integer.parseInt(splitted[3]);
                int mins = Integer.parseInt(splitted[4]);
                int hours = Integer.parseInt(splitted[5]);
                int time = seconds + (mins * 60) + (hours * 60 * 60);
                boolean bOk = true;
                for (final ChannelServer cservs : ChannelServer.getAllInstances()) {
                    if (splitted[1].equals("exp")) {
                        if (arg <= 500) {
                            cservs.setExpRate(arg);
                            cservs.broadcastPacket(MaplePacketCreator.serverNotice(6, "经验已经成功修改为 " + arg + "倍。祝大家游戏开心！"));
                        } else {
                            mc.dropMessage("操作已被系统限制。");
                        }
                    } else if (splitted[1].equals("drop")) {
                        if (arg <= 100) {
                            cservs.setDropRate(arg);
                            cservs.broadcastPacket(MaplePacketCreator.serverNotice(6, "爆率已经成功修改为 " + arg + "倍。祝大家游戏开心！"));
                        } else {
                            mc.dropMessage("操作已被系统限制。");
                        }
                    } else if (splitted[1].equals("meso")) {
                        if (arg <= 500) {
                            cservs.setMesoRate(arg);
                            cservs.broadcastPacket(MaplePacketCreator.serverNotice(6, "金币已经成功修改为 " + arg + "倍。祝大家游戏开心！"));
                        } else {
                            mc.dropMessage("操作已被系统限制。");
                        }
                    } else if (splitted[1].equals("bossdrop")) {
                        if (arg <= 500) {
                            cservs.setBossDropRate(arg);
                            cservs.broadcastPacket(MaplePacketCreator.serverNotice(6, "BOSS掉宝已经成功修改为 " + arg + "倍。祝大家游戏开心！"));
                        } else {
                            mc.dropMessage("操作已被系统限制。");
                        }
                    } else if (splitted[1].equals("petexp")) {
                        if (arg <= 5) {
                            cservs.setPetExpRate(arg);
                            cservs.broadcastPacket(MaplePacketCreator.serverNotice(6, "宠物经验已经成该修改为 " + arg + "倍。祝大家游戏开心！"));
                        } else {
                            mc.dropMessage("操作已被系统限制。");
                        }
                    } else {
                        bOk = false;
                    }
                    final String rate = splitted[1];
                    TimerManager.getInstance().schedule(new Runnable() {

                        @Override
                        public void run() {
                            if (rate.equals("exp")) {
                                cservs.setExpRate(5);
                            } else if (rate.equals("drop")) {
                                cservs.setDropRate(10);
                            } else if (rate.equals("meso")) {
                                cservs.setMesoRate(1);
                            } else if (rate.equals("bossdrop")) {
                                cservs.setBossDropRate(10);
                            } else if (rate.equals("petexp")) {
                                cservs.setPetExpRate(1);
                            }
                            cservs.broadcastPacket(MaplePacketCreator.serverNotice(6, " 系统双倍活动已经结束。系统已成功自动切换为正常游戏模式！"));
                        }
                    }, time * 1000);
                }
                if (bOk == false) {
                    mc.dropMessage("使用方法: !rate <exp|drop|meso|boss|pet> <类> <秒> <分> <时>");
                }
            } else {
                mc.dropMessage("使用方法: !rate <exp|drop|meso|boss|pet> <类> <秒> <分> <时>");
            }
        } else if (splitted[0].equals("!倍率查看")) {
            ChannelServer cserv = c.getChannelServer();
            mc.dropMessage("目前服务器经验爆率信息:");
            mc.dropMessage("经验: " + cserv.getExpRate() + "倍 | 宠物: " + cserv.getPetExpRate() + "倍");
            mc.dropMessage("爆率: " + cserv.getDropRate() + "倍 | BOSS爆率: " + cserv.getBossDropRate() + "倍");
            mc.dropMessage("金币: " + cserv.getMesoRate() + "倍");
        } else if (splitted[0].equals("!阿露给所有玩家点卷")) {
            if (splitted.length > 2) {
                int type = Integer.parseInt(splitted[1]);
                int quantity = Integer.parseInt(splitted[2]);
                if (type == 0) {
                    type = 0;
                } else if (type == 1) {
                    type = 1;
                } else {
                    c.getPlayer().dropMessage(6, "用法: !给所有人点卷 [点卷类型0-1] [点卷数量][0是点卷.1是抵用卷]");
                    return;
                }
                if (quantity > 100000) {
                    quantity = 100000;
                }
                int ret = 0;
                for (ChannelServer cserv : ChannelServer.getAllInstances()) {
                    for (MapleCharacter mch : cserv.getPlayerStorage().getAllCharacters()) {
                        mch.modifyCSPoints(type, quantity);
                        mch.dropMessage(-11, new StringBuilder().append("[系统提示] 恭喜您获得管理员赠送给您的").append(type == 1 ? "点券 " : " 抵用券 ").append(quantity).append(" 点.").toString());
                        mch.dropMessage(-1, new StringBuilder().append("[系统提示] 恭喜您获得管理员赠送给您的").append(type == 1 ? "点券 " : " 抵用券 ").append(quantity).append(" 点.").toString());
                        ret++;
                    }
                }
                if (type == 0) {
                    for (ChannelServer cserv1 : ChannelServer.getAllInstances()) {
                        for (MapleCharacter mch : cserv1.getPlayerStorage().getAllCharacters()) {
                            mch.startMapEffect("管理员发放" + quantity + "点卷给在线的所有玩家！快感谢帅气的管理员吧！", 5121009);
                        }
                    }
                } else if (type == 1) {
                    for (ChannelServer cserv1 : ChannelServer.getAllInstances()) {
                        for (MapleCharacter mch : cserv1.getPlayerStorage().getAllCharacters()) {
                            mch.startMapEffect("管理员发放" + quantity + "抵用卷给在线的所有玩家！快感谢帅气的管理员吧！", 5121009);
                        }
                    }
                }
                c.getPlayer().dropMessage(6, new StringBuilder().append("命令使用成功，当前共有: ").append(ret).append(" 个玩家获得: ").append(quantity).append(" 点的").append(type == 1 ? "点券 " : " 抵用券 ").append(" 总计: ").append(ret * quantity).toString());
            } else {
                c.getPlayer().dropMessage(6, "用法: !阿露给所有玩家点卷 [点卷类型0-1] [点卷数量][0是点卷.1是抵用卷]");
            }
            
        } else if (splitted[0].equals("!给所有玩家经验")) {
            if (splitted.length > 1) {
                int quantity = Integer.parseInt(splitted[1]);
                int ret = 0;
                for (ChannelServer cserv : ChannelServer.getAllInstances()) {
                    for (MapleCharacter mch : cserv.getPlayerStorage().getAllCharacters()) {
                        //mch.modifyCSPoints(type, quantity);
                        mch.gainExp(quantity, false, false);
                        //mch.dropMessage(-11, new StringBuilder().append("[系统提示] 恭喜您获得管理员赠送给您的").append(type == 1 ? "点券 " : " 经验 ").append(quantity).append(" 点.").toString());
                        //mch.dropMessage(-1, new StringBuilder().append("[系统提示] 恭喜您获得管理员赠送给您的").append(type == 1 ? "点券 " : " 经验 ").append(quantity).append(" 点.").toString());
                        ret++;
                    }
                }
                for (ChannelServer cserv1 : ChannelServer.getAllInstances()) {
                    for (MapleCharacter mch : cserv1.getPlayerStorage().getAllCharacters()) {
                        mch.startMapEffect("管理员发放" + quantity + "经验给在线的所有玩家！快感谢帅气的管理员吧！", 5121009);
                    }
                }
                c.getPlayer().dropMessage(6, new StringBuilder().append("命令使用成功，当前共有: ").append(ret).append(" 个玩家获得: ").append(quantity).append(" 点的").append(" 经验 ").append(" 总计: ").append(ret * quantity).toString());
            } else {
                c.getPlayer().dropMessage(6, "用法: !给所有玩家经验");
            }
        } else if (splitted[0].equals("!给所有玩家冒险币")) {
            if (splitted.length > 1) {
                int quantity = Integer.parseInt(splitted[1]);
                int ret = 0;
                for (ChannelServer cserv : ChannelServer.getAllInstances()) {
                    for (MapleCharacter mch : cserv.getPlayerStorage().getAllCharacters()) {
                        mch.gainMeso(quantity, true);
                        //mch.dropMessage(-11, new StringBuilder().append("[系统提示] 恭喜您获得管理员赠送给您的").append(type == 1 ? "点券 " : " 经验 ").append(quantity).append(" 点.").toString());
                        //mch.dropMessage(-1, new StringBuilder().append("[系统提示] 恭喜您获得管理员赠送给您的").append(type == 1 ? "点券 " : " 经验 ").append(quantity).append(" 点.").toString());
                        ret++;
                    }
                }
                for (ChannelServer cserv1 : ChannelServer.getAllInstances()) {
                    for (MapleCharacter mch : cserv1.getPlayerStorage().getAllCharacters()) {
                        mch.startMapEffect("管理员发放" + quantity + "冒险币给在线的所有玩家！快感谢帅气的管理员吧！", 5121009);
                    }
                }
                c.getPlayer().dropMessage(6, new StringBuilder().append("命令使用成功，当前共有: ").append(ret).append(" 个玩家获得: ").append(quantity).append(" 冒险币 ").append(" 总计: ").append(ret * quantity).toString());
            } else {
                c.getPlayer().dropMessage(6, "用法: !给所有玩家冒险币");
            
            }
        }
    }

     @Override
    public CommandDefinition[] getDefinition() {
        return new CommandDefinition[]{
                    new CommandDefinition("倍率修改", "<exp|drop|meso|bossdrop|petexp> <amount> <seconds> <minutes> <hours>", "Changes the specified rate", 50),
                    new CommandDefinition("阿露给所有玩家点卷", "用法: !阿露给所有玩家经验 [点卷类型0-1] [点卷数量][0是点卷.1是抵用卷]", "给所有人点卷", 50),
                    new CommandDefinition("给所有玩家冒险币", "用法: !阿露给所有玩家冒险币", "给所有人冒险币", 50),
                    new CommandDefinition("给所有玩家经验", "用法: !阿露给所有玩家经验", "给所有人经验", 50),
                    new CommandDefinition("倍率查看", "", "Shows each rate", 50)
                };
    }
}