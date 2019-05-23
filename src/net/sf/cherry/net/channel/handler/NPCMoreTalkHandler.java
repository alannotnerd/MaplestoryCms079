package net.sf.cherry.net.channel.handler;

import net.sf.cherry.client.MapleClient;
import net.sf.cherry.net.AbstractMaplePacketHandler;
import net.sf.cherry.scripting.npc.NPCScriptManager;
import net.sf.cherry.scripting.quest.QuestScriptManager;
import net.sf.cherry.tools.data.input.SeekableLittleEndianAccessor;

public class NPCMoreTalkHandler extends AbstractMaplePacketHandler {
	public void handlePacket(SeekableLittleEndianAccessor slea, MapleClient c) {
		c.doneedlog(this, c.getPlayer());
		byte lastMsg = slea.readByte();
		byte action = slea.readByte();

		if (lastMsg == 2) {
			if (action != 0) {
				String returnText = slea.readMapleAsciiString();
				if (c.getQM() != null) {
					c.getQM().setGetText(returnText);
					if (c.getQM().isStart())
						QuestScriptManager.getInstance().start(c, action, lastMsg, -1);
					else
						QuestScriptManager.getInstance().end(c, action, lastMsg, -1);
				} else {
					c.getCM().setGetText(returnText);
					NPCScriptManager.getInstance().action(c, action, lastMsg, -1);
				}
			} else if (c.getQM() != null) {
				c.getQM().dispose();
			} else {
				c.getCM().dispose();
			}
		} else {
			int selection = -1;
			if (slea.available() >= 4L) {
				selection = slea.readInt();
				if (selection < 0) {
					if (c.getQM() != null)
						c.getQM().dispose();
					else {
						c.getCM().dispose();
					}
					return;
				}
			} else if (slea.available() > 0L) {
				selection = slea.readByte();
			}

			if (c.getQM() != null) {
				if (c.getQM().isStart())
					QuestScriptManager.getInstance().start(c, action, lastMsg, selection);
				else
					QuestScriptManager.getInstance().end(c, action, lastMsg, selection);
			} else if (c.getCM() != null)
				NPCScriptManager.getInstance().action(c, action, lastMsg, selection);
		}
	}
}