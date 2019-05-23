package net.sf.cherry.client.messages;

import net.sf.cherry.client.MapleClient;
import net.sf.cherry.tools.MaplePacketCreator;

public class ServernoticeMapleClientMessageCallback implements MessageCallback {
	private MapleClient client;
	private int mode;

	public ServernoticeMapleClientMessageCallback(MapleClient c) {
		this(c.getPlayer().isGM() ? 6 : 5, c);
	}

	public ServernoticeMapleClientMessageCallback(int mode, MapleClient client) {
		this.client = client;
		this.mode = mode;
	}

	public void dropMessage(String message) {
		this.client.getSession().write(MaplePacketCreator.serverNotice(this.mode, message));
	}
}