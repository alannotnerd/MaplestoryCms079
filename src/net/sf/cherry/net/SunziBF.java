/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
package net.sf.cherry.net;

import net.sf.cherry.client.IItem;
import net.sf.cherry.client.MapleClient;
import net.sf.cherry.client.MapleInventoryType;
import net.sf.cherry.server.MapleInventoryManipulator;
import net.sf.cherry.server.MapleItemInformationProvider;
import net.sf.cherry.tools.MaplePacketCreator;
import net.sf.cherry.tools.data.input.SeekableLittleEndianAccessor;

/**
 *
 * @author Administrator
 */
public class SunziBF extends AbstractMaplePacketHandler {

    private MapleClient client;

    public MapleClient getClient() {
        return client;
    }

    @Override
    public void handlePacket(SeekableLittleEndianAccessor slea, MapleClient c) {
        c.doneedlog(this, c.getPlayer());
        slea.readInt();
        byte slot = (byte) slea.readShort();
        int itemid = slea.readInt();
        MapleItemInformationProvider ii = MapleItemInformationProvider.getInstance();
        IItem item = c.getPlayer().getInventory(MapleInventoryType.USE).getItem(slot);
        if ((item == null) || (item.getItemId() != itemid) || (c.getPlayer().getLevel() > 255)) {
            //c.disconnect();
            return;
        }
        int expGained = ii.getExpCache(itemid) * c.getChannelServer().getExpRate();
        c.getPlayer().gainExp(expGained, true, false);
        c.getSession().write(MaplePacketCreator.enableActions());
        MapleInventoryManipulator.removeFromSlot(c, MapleInventoryType.USE, slot, (short) 1, false);

    }
}