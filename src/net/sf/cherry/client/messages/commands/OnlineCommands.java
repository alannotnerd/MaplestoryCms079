package net.sf.cherry.client.messages.commands;

import java.rmi.RemoteException;
import java.util.Collection;

import net.sf.cherry.client.MapleCharacter;
import net.sf.cherry.client.MapleCharacterUtil;
import net.sf.cherry.client.MapleClient;
import net.sf.cherry.client.messages.Command;
import net.sf.cherry.client.messages.CommandDefinition;
import net.sf.cherry.client.messages.MessageCallback;
import net.sf.cherry.net.channel.ChannelServer;

public class OnlineCommands implements Command {
	public static void Fake(Exception e) {
		e.toString();
	}

	public void execute(MapleClient c, MessageCallback mc, String[] splitted) throws Exception, RemoteException {
		if (splitted[0].toLowerCase().equals("!在线玩家")) {
			mc.dropMessage("在线人物: ");
			for (ChannelServer cs : ChannelServer.getAllInstances()) {
				mc.dropMessage("[频道 " + cs.getChannel() + "]");
				StringBuilder sb = new StringBuilder();
				Collection<MapleCharacter> cmc = cs.getPlayerStorage().getAllCharacters();
				for (MapleCharacter chr : cmc) {
					if (sb.length() > 150) {
						sb.setLength(sb.length() - 2);
						mc.dropMessage(sb.toString());
						sb = new StringBuilder();
					}
					if (!chr.isGM()) {
						sb.append(MapleCharacterUtil.makeMapleReadable("ID:" + chr.getId() + ",Name:" + chr.getName()));
						sb.append(", ");
					}
				}
				if (sb.length() >= 2) {
					sb.setLength(sb.length() - 2);
					mc.dropMessage(sb.toString());
				}
			}

		} else if ((splitted[0].equalsIgnoreCase("!读取玩家")) || (splitted[0].equalsIgnoreCase("!charinfo"))) {
			MapleCharacter victim1 = c.getChannelServer().getPlayerStorage().getCharacterByName(splitted[1]);
			if (victim1 == null) {
				mc.dropMessage("人物未找到！ ");
				return;
			}
			StringBuilder builder = new StringBuilder();
			builder.append(MapleClient.getLogMessage(victim1, "")); // Could use
																	// null i
																	// think ?
			mc.dropMessage(builder.toString());

			builder = new StringBuilder();
			builder.append("Map: ");
			builder.append(victim1.getMapId());
			builder.append("  坐标: X: ");
			builder.append(victim1.getPosition().x);
			builder.append(" Y: ");
			builder.append(victim1.getPosition().y);
			builder.append(" | RX0: ");
			builder.append(victim1.getPosition().x + 50);
			builder.append(" | RX1: ");
			builder.append(victim1.getPosition().x - 50);
			builder.append(" | FH: ");
			builder.append(victim1.getMap().getFootholds().findBelow(victim1.getPosition()).getId());
			mc.dropMessage(builder.toString());
			builder = new StringBuilder();
			builder.append("HP: ");
			builder.append(victim1.getHp());
			builder.append("/");
			builder.append(victim1.getCurrentMaxHp());
			builder.append(" | MP: ");
			builder.append(victim1.getMp());
			builder.append("/");
			builder.append(victim1.getCurrentMaxMp());
			builder.append(" | EXP: ");
			builder.append(victim1.getExp());
			builder.append(" | 在一个组队里: ");
			builder.append(victim1.getParty() != null);
			builder.append(" | 在一个商城里: ");
			builder.append(victim1.getTrade() != null);
			mc.dropMessage(builder.toString());
			builder = new StringBuilder();
			builder.append("远程地址: ");
			builder.append(victim1.getClient().getSession().getRemoteAddress());
			mc.dropMessage(builder.toString());
			// victim1.getClient().dropDebugMessage(mc);
		}
	}

	public CommandDefinition[] getDefinition() {
		return new CommandDefinition[] {
				new CommandDefinition("在线玩家", "", "List all of the users on the server, organized by channel.", 2),
				new CommandDefinition("读取玩家", "charname", "读取玩家信息", 2), 
				new CommandDefinition("charinfo", "charname", "Shows info about the character with the given name", 2), 
		};
	}
}
