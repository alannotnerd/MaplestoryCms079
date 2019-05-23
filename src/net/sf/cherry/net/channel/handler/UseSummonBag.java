package net.sf.cherry.net.channel.handler;

import java.util.List;

import net.sf.cherry.client.IItem;
import net.sf.cherry.client.MapleClient;
import net.sf.cherry.client.MapleInventoryType;
import net.sf.cherry.net.AbstractMaplePacketHandler;
import net.sf.cherry.server.MapleInventoryManipulator;
import net.sf.cherry.server.MapleItemInformationProvider;
import net.sf.cherry.server.life.MapleLifeFactory;
import net.sf.cherry.server.life.MapleMonster;
import net.sf.cherry.tools.MaplePacketCreator;
import net.sf.cherry.tools.data.input.SeekableLittleEndianAccessor;

public class UseSummonBag extends AbstractMaplePacketHandler {

    public void handlePacket(SeekableLittleEndianAccessor slea, MapleClient c) {
        c.doneedlog(this, c.getPlayer());
        if (!c.getPlayer().isAlive()) {
            c.getSession().write(MaplePacketCreator.enableActions());
            return;
        }
        if (c.getPlayer().getCherryBan()) {
            c.getPlayer().getCherryBanMessage();
            c.getSession().write(MaplePacketCreator.enableActions());
            return;
        }
        MapleItemInformationProvider ii = MapleItemInformationProvider.getInstance();
        slea.readInt();
        byte slot = (byte) slea.readShort();
        int itemId = slea.readInt();
        IItem toUse = c.getPlayer().getInventory(MapleInventoryType.USE).getItem(slot);
        if (toUse != null && toUse.getQuantity() > 0 && c.getPlayer().getMapId() != 910000022) {
            if ((toUse != null) && (toUse.getQuantity() > 0)) {
                if (toUse.getItemId() != itemId) {
                    return;
                }
                MapleInventoryManipulator.removeFromSlot(c, MapleInventoryType.USE, slot, (byte) 1, false);
                List toSpawn = ii.getSummonMobs(itemId);
                for (int z = 0; z < toSpawn.size(); z++) {
                    MapleItemInformationProvider.SummonEntry se = (MapleItemInformationProvider.SummonEntry) toSpawn.get(z);
                    if ((int) Math.ceil(Math.random() * 100.0D) <= se.getChance()) {
                        MapleMonster mob = MapleLifeFactory.getMonster(se.getMobId());
                        c.getPlayer().getMap().spawnMonsterOnGroundBelow(mob, c.getPlayer().getPosition());
                        switch (se.getMobId()) {
                            case 8810024:
                            case 8810025:
                                c.getPlayer().getMap().killMonster(mob, c.getPlayer(), false);
                                c.getPlayer().getMap().mapMessage(6, "[Notice] Horntail is summoned by the summoning bag.");
                        }
                    }
                }
            } else {
                return;
            }
        } else {
            c.getPlayer().getMap().mapMessage(1, "[召唤包提示] 该地图无法召唤怪物.");
            c.getSession().write(MaplePacketCreator.enableActions());
            return;
        }
        c.getSession().write(MaplePacketCreator.enableActions());
    }
}
