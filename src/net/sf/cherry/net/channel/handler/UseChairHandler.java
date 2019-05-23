package net.sf.cherry.net.channel.handler;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import net.sf.cherry.client.MapleClient;
import net.sf.cherry.client.MapleInventoryType;
import net.sf.cherry.net.AbstractMaplePacketHandler;
import net.sf.cherry.server.maps.FakeCharacter;
import net.sf.cherry.tools.MaplePacketCreator;
import net.sf.cherry.tools.data.input.SeekableLittleEndianAccessor;

public class UseChairHandler extends AbstractMaplePacketHandler {

    private static Logger log = LoggerFactory.getLogger(UseItemHandler.class);

    public void handlePacket(SeekableLittleEndianAccessor slea, MapleClient c) {
        c.doneedlog(this, c.getPlayer());
        int itemId = slea.readInt();
        if (c.getPlayer().getInventory(MapleInventoryType.SETUP).findById(itemId) == null) { //如果背包没有椅子
            return;
        }
        /*if (c.getPlayer().isGM()) {
            LaoHuJiHandler laohuji = new LaoHuJiHandler();
            laohuji.LaoHuJi(c, itemId,100);
        }*/
        // if(itemId == 3011000){ //坐上椅子后是1
        //      c.getPlayer().set怪物伤害(1);
        //}
        c.getPlayer().setChair(itemId);
        c.getPlayer().getMap().broadcastMessage(c.getPlayer(), MaplePacketCreator.showChair(c.getPlayer().getId(), itemId), false);
        c.getSession().write(MaplePacketCreator.enableActions());
        for (FakeCharacter ch : c.getPlayer().getFakeChars()) {
            ch.getFakeChar().setChair(itemId);
            ch.getFakeChar().getMap().broadcastMessage(ch.getFakeChar(), MaplePacketCreator.showChair(ch.getFakeChar().getId(), itemId), false);
        }
    }
}
