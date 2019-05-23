 package net.sf.cherry.net.handler;
 
 import net.sf.cherry.client.MapleClient;
import net.sf.cherry.net.MaplePacketHandler;
import net.sf.cherry.tools.data.input.SeekableLittleEndianAccessor;
 
public final class NoOpHandler implements MaplePacketHandler {

    private static NoOpHandler instance = new NoOpHandler();

    private NoOpHandler() {
        // singleton
    }

    public static NoOpHandler getInstance() {
        return instance;
    }

    @Override
    public void handlePacket(SeekableLittleEndianAccessor slea, MapleClient c) {
        // no op
    }

    @Override
    public boolean validateState(MapleClient c) {
        return true;
    }
}