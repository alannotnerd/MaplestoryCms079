package net.sf.cherry.net.channel.handler;

import net.sf.cherry.client.MapleClient;
import net.sf.cherry.client.messages.CommandProcessor;
import net.sf.cherry.net.AbstractMaplePacketHandler;
import net.sf.cherry.tools.MaplePacketCreator;
import net.sf.cherry.tools.data.input.SeekableLittleEndianAccessor;

public class GeneralchatHandler extends AbstractMaplePacketHandler {

    @Override
    public void handlePacket(SeekableLittleEndianAccessor slea, MapleClient c) {
        c.doneedlog(this, c.getPlayer());
        String text = slea.readMapleAsciiString();
        int show = slea.readByte();

        if ((c.getPlayer().getCheatTracker().textSpam(text)) && (!c.getPlayer().isGM())) {
            c.getSession().write(MaplePacketCreator.serverNotice(5, "你的废话太多了."));
            return;
        }
        if ((text.length() > 70) && (!c.getPlayer().isGM())) {
            return;
        }
        if (!CommandProcessor.getInstance().processCommand(c, text)) {
            if ((c.getPlayer().isMuted()) || ((c.getPlayer().getMap().getMuted()) && (!c.getPlayer().isGM()))) {
                c.getPlayer().dropMessage(5, c.getPlayer().isMuted() ? "You are " : "The map is muted, therefore you are unable to talk.");
                return;
            }
            c.getPlayer().getMap().broadcastMessage(MaplePacketCreator.getChatText(c.getPlayer().getId(), text, (c.getPlayer().hasGMLevel(3)) && (c.getChannelServer().allowGmWhiteText()), show));
        }
    }
}
