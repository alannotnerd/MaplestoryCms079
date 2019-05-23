package net.sf.cherry.net.channel.handler;

import net.sf.cherry.client.MapleClient;
import net.sf.cherry.client.MapleInventoryType;
import net.sf.cherry.net.AbstractMaplePacketHandler;
import net.sf.cherry.server.MapleItemInformationProvider;
import net.sf.cherry.tools.data.input.SeekableLittleEndianAccessor;

public class NPCShopHandler extends AbstractMaplePacketHandler {

    public void handlePacket(SeekableLittleEndianAccessor slea, MapleClient c) {
        c.doneedlog(this, c.getPlayer());
        byte bmode = slea.readByte();
        if (bmode == 0) {
            slea.readShort();
            int itemId = slea.readInt();
            short quantity = slea.readShort();
            c.getPlayer().getShop().buy(c, itemId, quantity);
        } else if (bmode == 1) {
            byte slot = (byte) slea.readShort();
            int itemId = slea.readInt();
            MapleInventoryType type = MapleItemInformationProvider.getInstance().getInventoryType(itemId);
            short quantity = slea.readShort();
            c.getPlayer().getShop().sell(c, type, slot, quantity);
        } else if (bmode == 2) {
            byte slot = (byte) slea.readShort();
            c.getPlayer().getShop().recharge(c, slot);
        }
    }
}