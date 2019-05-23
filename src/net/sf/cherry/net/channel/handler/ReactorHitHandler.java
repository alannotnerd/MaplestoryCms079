package net.sf.cherry.net.channel.handler;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import net.sf.cherry.client.MapleClient;
import net.sf.cherry.net.AbstractMaplePacketHandler;
import net.sf.cherry.server.maps.MapleReactor;
import net.sf.cherry.tools.data.input.SeekableLittleEndianAccessor;

public class ReactorHitHandler extends AbstractMaplePacketHandler {

    private static Logger log = LoggerFactory.getLogger(ReactorHitHandler.class);

    public void handlePacket(SeekableLittleEndianAccessor slea, MapleClient c) {
        c.doneedlog(this, c.getPlayer());
        int oid = slea.readInt();
        //slea.readInt();
        int charPos = slea.readInt();
        short stance = slea.readShort();
        //slea.readInt();

        MapleReactor reactor = c.getPlayer().getMap().getReactorByOid(oid);
        if ((reactor != null) && (reactor.isAlive())) {
            reactor.hitReactor(charPos, stance, c);
        }
    }
}
