package net.sf.cherry.net.channel.handler;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import net.sf.cherry.client.IItem;
import net.sf.cherry.client.MapleClient;
import net.sf.cherry.client.MapleInventoryType;
import net.sf.cherry.net.AbstractMaplePacketHandler;
import net.sf.cherry.server.maps.FakeCharacter;
import net.sf.cherry.tools.MaplePacketCreator;
import net.sf.cherry.tools.data.input.SeekableLittleEndianAccessor;

public class UseItemEffectHandler extends AbstractMaplePacketHandler {

    private static Logger log = LoggerFactory.getLogger(UseItemHandler.class);

    public void handlePacket(SeekableLittleEndianAccessor slea, MapleClient c) {
        c.doneedlog(this, c.getPlayer());

        int itemId = slea.readInt();
        IItem toUse;
        if ((itemId == 4290001) || (itemId == 4290000)) //倒霉鸡  金鸡  效果
        {
            toUse = c.getPlayer().getInventory(MapleInventoryType.ETC).findById(itemId);
        } else {
            toUse = c.getPlayer().getInventory(MapleInventoryType.CASH).findById(itemId);
        }
        if ((itemId != 0) && (toUse == null)) {
            return;
        }

        c.getPlayer().setItemEffect(itemId);
        c.getPlayer().getMap().broadcastMessage(c.getPlayer(), MaplePacketCreator.itemEffects(c.getPlayer().getId(), itemId), false);
        if (c.getPlayer().hasFakeChar()) {
            for (FakeCharacter ch : c.getPlayer().getFakeChars()) {
                ch.getFakeChar().setItemEffect(itemId);
                c.getPlayer().getMap().broadcastMessage(ch.getFakeChar(), MaplePacketCreator.itemEffect(c.getPlayer().getId(), itemId), false);
            }
        }
    }
}
