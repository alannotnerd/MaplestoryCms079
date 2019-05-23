package net.sf.cherry.net.channel.handler;

import net.sf.cherry.client.MapleClient;
import net.sf.cherry.net.AbstractMaplePacketHandler;
import net.sf.cherry.scripting.reactor.ReactorScriptManager;
import net.sf.cherry.server.maps.MapleReactor;
import net.sf.cherry.tools.data.input.SeekableLittleEndianAccessor;

public final class TouchReactorHandler extends AbstractMaplePacketHandler {

    public final void handlePacket(SeekableLittleEndianAccessor slea, MapleClient c) {
        c.doneedlog(this, c.getPlayer());
        int oid = slea.readInt();
        MapleReactor reactor = c.getPlayer().getMap().getReactorByOid(oid);
        if (reactor != null) {
            if (slea.readByte() != 0) {
                ReactorScriptManager.getInstance().touch(c, reactor);
            } else {
                ReactorScriptManager.getInstance().untouch(c, reactor);
            }
        }
    }
}