     package net.sf.cherry.net.channel.handler;
 
 import net.sf.cherry.client.MapleCharacter;
import net.sf.cherry.client.MapleClient;
import net.sf.cherry.net.AbstractMaplePacketHandler;
import net.sf.cherry.tools.data.input.SeekableLittleEndianAccessor;
 
/**
 *
 * @author系统坐船处理
 */
public class PartySearchRegisterHandler extends AbstractMaplePacketHandler {

    public void handlePacket(SeekableLittleEndianAccessor slea, MapleClient c) {

        MapleCharacter chr = c.getPlayer();
        int MapID = slea.readInt();
        int 未知 = slea.readByte();
        chr.setNeedsParty(true, MapID, 未知);

    }
}