/*
 * 冒险岛玩家指令
 */
package net.sf.cherry.client.messages.commands;

import net.sf.cherry.client.MapleCharacter;
import net.sf.cherry.client.MapleClient;
import net.sf.cherry.client.MapleStat;
import net.sf.cherry.client.messages.Command;
import net.sf.cherry.client.messages.CommandDefinition;
import net.sf.cherry.client.messages.IllegalCommandSyntaxException;
import net.sf.cherry.client.messages.MessageCallback;
import net.sf.cherry.client.messages.ServernoticeMapleClientMessageCallback;
import net.sf.cherry.net.channel.ChannelServer;
import net.sf.cherry.scripting.npc.NPCScriptManager;
import net.sf.cherry.tools.MaplePacketCreator;

public class PlayerCommands implements Command {

    @Override
    public void execute(MapleClient c, MessageCallback mc, String[] splitted) throws Exception,
            IllegalCommandSyntaxException {
        MapleCharacter player = c.getPlayer();
        ChannelServer cserv = c.getChannelServer();

        if (splitted[0].equals("@假死")) {
            NPCScriptManager.getInstance().dispose(c);
            c.getSession().write(MaplePacketCreator.enableActions());
            new ServernoticeMapleClientMessageCallback(5, c).dropMessage("[个人信息] 已经解除了假死。");
        } else if (splitted[0].equals("@帮助")) {
        	/*
             * HHHHHHHHHHHHHHHHHHHHHH*游戏帮助文档开始*HHHHHHHHHHHHHHHHHHHHHHHHH
             */
            mc.dropMessage("@力量   < 增加属性到力量能力值 >");
            mc.dropMessage("@敏捷   < 增加属性到敏捷能力值 >");
            mc.dropMessage("@智力   < 增加属性到智力能力值 >");
            mc.dropMessage("@运气   < 增加属性到运气能力值 >");
            mc.dropMessage("@假死   < 解除各种不能对话问题 >");
            mc.dropMessage("@爆率   < 查询当前地图怪物爆率 >");
            mc.dropMessage("@转职   < 转职 >");
            mc.dropMessage("@刷新   < 经验值变负数可以使用 >");
            mc.dropMessage("@自由   <可以立即返回自由市场,但扎昆,黑龙洞内无法使用 >");
        } else if (splitted[0].equals("@爆率")) {
            NPCScriptManager npc = NPCScriptManager.getInstance();
            npc.start(c, 2000);
        } else if (splitted[0].equals("@刷新")) {
            if (player.getExp() < 0) {
                player.setExp(0);
                player.updateSingleStat(MapleStat.EXP, player.getExp());
                new ServernoticeMapleClientMessageCallback(5, c).dropMessage("[命令使用成功] 成功清空了你的经验值！");
            } else {
                new ServernoticeMapleClientMessageCallback(5, c).dropMessage("你没有出现经验错误！无法使用该命令！");
                c.getSession().write(MaplePacketCreator.enableActions());
            }
        } else if (splitted[0].equals("@力量") || splitted[0].equals("@智力") || splitted[0].equals("@运气") || splitted[0].equals("@敏捷")) {
            int amount = Integer.parseInt(splitted[1]);
            boolean str = splitted[0].equals("@力量");
            boolean Int = splitted[0].equals("@智力");
            boolean luk = splitted[0].equals("@运气");
            boolean dex = splitted[0].equals("@敏捷");
            if (amount > 0 && amount <= player.getRemainingAp() && amount <= 32763 || amount < 0 && amount >= 0 && Math.abs(amount) + player.getRemainingAp() <= 32767) {
                if (str && amount + player.getStr() <= 32767 && amount + player.getStr() >= 4) {
                    player.setStr(player.getStr() + amount);
                    player.updateSingleStat(MapleStat.STR, player.getStr());
                    player.setRemainingAp(player.getRemainingAp() - amount);
                    player.updateSingleStat(MapleStat.AVAILABLEAP, player.getRemainingAp());
                } else if (Int && amount + player.getInt() <= 32767 && amount + player.getInt() >= 4) {
                    player.setInt(player.getInt() + amount);
                    player.updateSingleStat(MapleStat.INT, player.getInt());
                    player.setRemainingAp(player.getRemainingAp() - amount);
                    player.updateSingleStat(MapleStat.AVAILABLEAP, player.getRemainingAp());
                } else if (luk && amount + player.getLuk() <= 32767 && amount + player.getLuk() >= 4) {
                    player.setLuk(player.getLuk() + amount);
                    player.updateSingleStat(MapleStat.LUK, player.getLuk());
                    player.setRemainingAp(player.getRemainingAp() - amount);
                    player.updateSingleStat(MapleStat.AVAILABLEAP, player.getRemainingAp());
                } else if (dex && amount + player.getDex() <= 32767 && amount + player.getDex() >= 4) {
                    player.setDex(player.getDex() + amount);
                    player.updateSingleStat(MapleStat.DEX, player.getDex());
                    player.setRemainingAp(player.getRemainingAp() - amount);
                    player.updateSingleStat(MapleStat.AVAILABLEAP, player.getRemainingAp());
                } else {
                    mc.dropMessage("请确保你的某个属性值不超过32767点！.");
                }
            } else {
                mc.dropMessage("请确保你的某个属性值不超过32767点！并且有足够的点加！.");
            }
        } else if (splitted[0].equals("@转职")) {
            NPCScriptManager npc = NPCScriptManager.getInstance();
            npc.start(c, 9900002, 0);
       } else if (splitted[0].equals("@自由")) {
            NPCScriptManager npc = NPCScriptManager.getInstance();
            npc.start(c, 9900004, 666);
  
        } else if (splitted[0].equals("@修改密码")) {
        	if (splitted.length > 1) {
        		if (splitted[1].length()>5) {
        			mc.dropMessage("新密码最少必须4位.");
        			return;
				}
				if(c.setAccountPassword(splitted[1])){
					mc.dropMessage("设置成功.");
				}else{
					mc.dropMessage("设置密码发生错误，请稍候重试！");
				}
        	}
        }
    }

    public static void GameX(Exception e) {
        e.toString();
    }

    @Override
    public CommandDefinition[] getDefinition() {
        return new CommandDefinition[]{
                    new CommandDefinition("假死", "", "解除NPC不能对话问题", 0),
                    new CommandDefinition("刷新", "", "EXP负数", 0),
                    new CommandDefinition("帮助", "", "帮助命令", 0),
                    new CommandDefinition("爆率", "", "查看游戏内怪物爆率", 0),
                    new CommandDefinition("自由", "", "回到自由", 0),
                    new CommandDefinition("力量", "<amount>", "Sets your strength to a higher amount if you have enough AP or takes it away if you aren't over 32767 AP.", 0),
                    new CommandDefinition("智力", "<amount>", "Sets your intelligence to a higher amount if you have enough AP or takes it away if you aren't over 32767 AP.", 0),
                    new CommandDefinition("运气", "<amount>", "Sets your luck to a higher amount if you have enough AP or takes it away if you aren't over 32767 AP.", 0),
                    new CommandDefinition("敏捷", "<amount>", "Sets your dexterity to a higher amount if you have enough AP or takes it away if you aren't over 32767 AP.", 0),
                    new CommandDefinition("转职", "", "转职", 0),
                    new CommandDefinition("修改密码", "<新密码>", "修改密码", 0),
        };
    }

    public static int getOptionalIntArg(String splitted[], int position, int def) {
        if (splitted.length > position) {
            try {
                return Integer.parseInt(splitted[position]);
            } catch (NumberFormatException nfe) {
                return def;
            }
        }
        return def;
    }
}