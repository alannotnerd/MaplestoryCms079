package net.sf.cherry.net.channel.handler;

import net.sf.cherry.client.MapleClient;
import net.sf.cherry.net.AbstractMaplePacketHandler;
import net.sf.cherry.server.life.MapleMonster;
import net.sf.cherry.server.maps.MapleMap;
import net.sf.cherry.tools.data.input.SeekableLittleEndianAccessor;

public class AutoAggroHandler extends AbstractMaplePacketHandler {

    public void handlePacket(SeekableLittleEndianAccessor slea, MapleClient c) {
        int oid = slea.readInt();
        MapleMap map = c.getPlayer().getMap();
        MapleMonster monster = map.getMonsterByOid(oid);
        if ((monster != null) && (monster.getController() != null)) {
            if (!monster.isControllerHasAggro()) {
                if (map.getCharacterById(monster.getController().getId()) == null) {
                    monster.switchController(c.getPlayer(), true);
                } else {
                    monster.switchController(monster.getController(), true);
                }
            } else if (map.getCharacterById(monster.getController().getId()) == null) {
                monster.switchController(c.getPlayer(), true);
            }
        } else if ((monster != null) && (monster.getController() == null)) {
            monster.switchController(c.getPlayer(), true);
        }
    }
}