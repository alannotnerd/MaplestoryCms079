package net.sf.cherry.net.channel.handler;

import net.sf.cherry.client.MapleCharacter;
import net.sf.cherry.client.MapleClient;
import net.sf.cherry.net.AbstractMaplePacketHandler;
import net.sf.cherry.tools.MaplePacketCreator;
import net.sf.cherry.tools.data.input.SeekableLittleEndianAccessor;

public class CharInfoRequestHandler extends AbstractMaplePacketHandler {

    public void handlePacket(SeekableLittleEndianAccessor slea, MapleClient c) {
        c.doneedlog(this, c.getPlayer());

        int actionId = slea.readInt();
        if (actionId <= c.getLastActionId()) {
            c.getSession().write(MaplePacketCreator.enableActions());
            return;
        }
        c.setLastActionId(actionId);
        int cid = slea.readInt();
        MapleCharacter player = (MapleCharacter) c.getPlayer().getMap().getMapObject(cid);
        if ((player != null) && ((!player.isGM()) || ((c.getPlayer().isGM()) && (player.isGM())))) {
            c.getSession().write(MaplePacketCreator.charInfo(player));
        } else {
            c.getSession().write(MaplePacketCreator.enableActions());
        }
    }
}