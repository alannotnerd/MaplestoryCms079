package net.sf.cherry.net.handler;

import net.sf.cherry.client.MapleClient;
import net.sf.cherry.net.MaplePacketHandler;
import net.sf.cherry.tools.data.input.SeekableLittleEndianAccessor;

public class KeepAliveHandler
        implements MaplePacketHandler {

    public void handlePacket(SeekableLittleEndianAccessor slea, MapleClient c) {
        c.pongReceived();
    }

    public boolean validateState(MapleClient c) {
        return true;
    }
}