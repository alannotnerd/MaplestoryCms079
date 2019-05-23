package net.sf.cherry.net.channel.handler;

import net.sf.cherry.client.MapleCharacter;
import net.sf.cherry.client.MapleClient;
import net.sf.cherry.net.AbstractMaplePacketHandler;
import net.sf.cherry.scripting.npc.NPCScriptManager;
import net.sf.cherry.server.life.MapleNPC;
import net.sf.cherry.server.maps.MapleMapObjectType;
import net.sf.cherry.tools.MaplePacketCreator;
import net.sf.cherry.tools.data.input.SeekableLittleEndianAccessor;

public class NPCTalkHandler extends AbstractMaplePacketHandler {

    public void handlePacket(SeekableLittleEndianAccessor slea, MapleClient c) {
        c.doneedlog(this, c.getPlayer());
        MapleCharacter player = c.getPlayer();
        player.setCurrenttime(System.currentTimeMillis());
        if (player.getCurrenttime() - player.getLasttime() < player.getDeadtime()) {
            player.dropMessage(1,"使用NPC过于太快.请慢一点.");
            c.getSession().write(MaplePacketCreator.enableActions());
            return;
        }
        player.setLasttime(System.currentTimeMillis());
        int oid = slea.readInt();
        slea.readInt();
        if ((c.getPlayer().getMap().getMapObject(oid) == null) || (!c.getPlayer().getMap().getMapObject(oid).getType().equals(MapleMapObjectType.NPC))) {
            c.getSession().write(MaplePacketCreator.enableActions());
            return;
        }
        MapleNPC npc = (MapleNPC) c.getPlayer().getMap().getMapObject(oid);
        if (npc.getId() == 9010009) {
            c.getSession().write(MaplePacketCreator.sendDuey((byte) 9, DueyActionHandler.loadItems(c.getPlayer())));
        }
        if (npc.hasShop()) {
            if (c.getPlayer().getShop() != null) {
                c.getPlayer().setShop(null);
                c.getSession().write(MaplePacketCreator.confirmShopTransaction((byte) 20));
            }
            npc.sendShop(c);
        } else {
            if ((c.getCM() != null) || (c.getQM() != null)) {
                c.getSession().write(MaplePacketCreator.enableActions());
                return;
            }
            if (c.getCM() == null) {
                NPCScriptManager.getInstance().start(c, npc.getId());
            }
        }
    }
}
