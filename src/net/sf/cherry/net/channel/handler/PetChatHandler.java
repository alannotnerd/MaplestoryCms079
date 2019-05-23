package net.sf.cherry.net.channel.handler;

import net.sf.cherry.client.MapleClient;
import net.sf.cherry.net.AbstractMaplePacketHandler;
import net.sf.cherry.tools.MaplePacketCreator;
import net.sf.cherry.tools.data.input.SeekableLittleEndianAccessor;

public class PetChatHandler extends AbstractMaplePacketHandler {

    public void handlePacket(SeekableLittleEndianAccessor slea, MapleClient c) {
        c.doneedlog(this, c.getPlayer());
        int petId = slea.readInt();
        slea.readInt();
        slea.readByte();
        int act = slea.readByte();
        String text = slea.readMapleAsciiString();
        c.getPlayer().getMap().broadcastMessage(c.getPlayer(), MaplePacketCreator.petChat(c.getPlayer().getId(), c.getPlayer().getPetByUniqueId(petId), act, text), true);
    }
}