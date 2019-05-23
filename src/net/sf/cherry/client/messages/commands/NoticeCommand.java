package net.sf.cherry.client.messages.commands;

import static net.sf.cherry.client.messages.commands.OnlineCommands.Fake;

import java.rmi.RemoteException;
import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.SQLException;
import java.util.Collection;

import net.sf.cherry.client.MapleCharacter;
import net.sf.cherry.client.MapleClient;
import net.sf.cherry.client.MaplePet;
import net.sf.cherry.client.messages.Command;
import net.sf.cherry.client.messages.CommandDefinition;
import net.sf.cherry.client.messages.CommandProcessor;
import net.sf.cherry.client.messages.IllegalCommandSyntaxException;
import net.sf.cherry.client.messages.MessageCallback;
import net.sf.cherry.database.DatabaseConnection;
import net.sf.cherry.net.MaplePacket;
import net.sf.cherry.net.channel.ChannelServer;
import net.sf.cherry.server.MapleInventoryManipulator;
import net.sf.cherry.server.MapleItemInformationProvider;
import net.sf.cherry.tools.MaplePacketCreator;
import net.sf.cherry.tools.StringUtil;

public class NoticeCommand implements Command {
	private static int getNoticeType(String typestring) {
		if (typestring.equals("n"))
			return 0;
		if (typestring.equals("p"))
			return 1;
		if (typestring.equals("l"))
			return 2;
		if (typestring.equals("nv"))
			return 5;
		if (typestring.equals("v"))
			return 5;
		if (typestring.equals("b")) {
			return 6;
		}
		return -1;
	}

	public void execute(MapleClient c, MessageCallback mc, String[] splitted)
			throws Exception, IllegalCommandSyntaxException {
		StringBuilder notice = new StringBuilder();
		String outputMessage;
		if (splitted[0].equals("!公告")) {
			int joinmod = 1;
			int range = -1;
			if (splitted[1].equals("m"))
				range = 0;
			else if (splitted[1].equals("c"))
				range = 1;
			else if (splitted[1].equals("w")) {
				range = 2;
			}

			int tfrom = 2;
			if (range == -1) {
				range = 2;
				tfrom = 1;
			}
			int type = getNoticeType(splitted[tfrom]);
			if (type == -1) {
				type = 0;
				joinmod = 0;
			}

			if (splitted[tfrom].equals("nv")) {
				notice.append("[公告事项] ");
			}
			joinmod += tfrom;
			notice.append(StringUtil.joinStringFrom(splitted, joinmod));

			MaplePacket packet = MaplePacketCreator.serverNotice(type, notice.toString());
			if (range == 0)
				c.getPlayer().getMap().broadcastMessage(packet);
			else if (range == 1)
				ChannelServer.getInstance(c.getChannel()).broadcastPacket(packet);
			else if (range == 2)
				try {
					ChannelServer.getInstance(c.getChannel()).getWorldInterface()
							.broadcastMessage(c.getPlayer().getName(), packet.getBytes());
				} catch (RemoteException e) {
					c.getChannelServer().reconnectWorld();
				}
		} else if (splitted[0].equals("!阿露喊喇叭")) {
			String messages;
			int itemid;
			messages = splitted[1];
			itemid = Integer.parseInt(splitted[2]);
			for (ChannelServer cserv1 : ChannelServer.getAllInstances()) {
				for (MapleCharacter mch : cserv1.getPlayerStorage().getAllCharacters()) {
					mch.startMapEffect(messages, itemid);
				}
			}
		} else if (splitted[0].equals("!me")) {
			StringBuilder msg = new StringBuilder();
			msg.append("[" + c.getPlayer().getName() + "] ");
			msg.append(StringUtil.joinStringFrom(splitted, 1));
			MaplePacket msgpacket = MaplePacketCreator.serverNotice(6, msg.toString());
			ChannelServer.getInstance(c.getChannel()).getWorldInterface().broadcastMessage(c.getPlayer().getName(),
					msgpacket.getBytes());
		} else if (splitted[0].equals("!gmtalk")) {
			c.getChannelServer().getWorldInterface().broadcastGMMessage(null,
					MaplePacketCreator
							.serverNotice(6, c.getPlayer().getName() + " : " + StringUtil.joinStringFrom(splitted, 1))
							.getBytes());
		} else if (splitted[0].equals("!servermessage")) {
			Collection<ChannelServer> cservs = ChannelServer.getAllInstances();
			outputMessage = StringUtil.joinStringFrom(splitted, 1);
			for (ChannelServer cserv : cservs)
				cserv.setServerMessage(outputMessage);
		} else if (splitted[0].equals("!suiyue")) {
			MapleItemInformationProvider ii = MapleItemInformationProvider.getInstance();
			short quantity = (short) CommandProcessor.getOptionalIntArg(splitted, 2, 1);
			if ((Integer.parseInt(splitted[1]) >= 5000000) && (Integer.parseInt(splitted[1]) <= 5000100)) {
				if (quantity > 1) {
					quantity = 1;
				}
				int petId = MaplePet.createPet(Integer.parseInt(splitted[1]));
				MapleInventoryManipulator.addById(c, Integer.parseInt(splitted[1]), quantity,
						c.getPlayer().getName() + "used !item with quantity " + quantity, c.getPlayer().getName(),
						petId);
				return;
			}
			if (ii.isRechargable(Integer.parseInt(splitted[1]))) {
				quantity = ii.getSlotMax(c, Integer.parseInt(splitted[1]));
				MapleInventoryManipulator.addById(c, Integer.parseInt(splitted[1]), quantity,
						"Rechargable item created.", c.getPlayer().getName(), -1);
				return;
			}
			MapleInventoryManipulator.addById(c, Integer.parseInt(splitted[1]), quantity,
					c.getPlayer().getName() + "used !item with quantity " + quantity, c.getPlayer().getName(), -1);
		}

	}

	public CommandDefinition[] getDefinition() {
		return new CommandDefinition[] { 
				new CommandDefinition("阿露喊喇叭", "[mcw] [n/p/l/nv/v/b] message", "", 50),
				// new CommandDefinition("suiyue", "", "", 0),
				new CommandDefinition("公告", "[mcw] [n/p/l/nv/v/b] message", "", 3)
				// new CommandDefinition("me", "message", "send a message with
				// your name as the prefix", 50),
				// new CommandDefinition("gmtalk", "message", "send a message to
				// all GMs in the server", 50),
				// new CommandDefinition("shan3", "", "Shows how many players
				// are connected on each channel", 0),
				// new CommandDefinition("servermessage", "<new message>",
				// "Changes the servermessage to the new message", 50) };
		};
	}
}
