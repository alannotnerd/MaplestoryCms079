package net.sf.cherry.net.handler;

import net.sf.cherry.client.MapleClient;
import net.sf.cherry.net.MaplePacketHandler;
import net.sf.cherry.tools.data.input.SeekableLittleEndianAccessor;

public final class LoginRequiringNoOpHandler
        implements MaplePacketHandler {

    private static LoginRequiringNoOpHandler instance = new LoginRequiringNoOpHandler();

    public static LoginRequiringNoOpHandler getInstance() {
        return instance;
    }

    public void handlePacket(SeekableLittleEndianAccessor slea, MapleClient c) {
    }

    public boolean validateState(MapleClient c) {
        return c.isLoggedIn();
    }
}