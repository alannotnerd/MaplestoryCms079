/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
package net.sf.cherry.net.channel.handler;

import net.sf.cherry.client.MapleCharacter;
import net.sf.cherry.client.MapleClient;
import net.sf.cherry.net.AbstractMaplePacketHandler;
import net.sf.cherry.tools.MaplePacketCreator;
import net.sf.cherry.tools.data.input.SeekableLittleEndianAccessor;

/**
 *
 * @author Administrator
 */
public final class OpenFamilyHandler extends AbstractMaplePacketHandler{
    public final void handlePacket(SeekableLittleEndianAccessor slea, MapleClient c) {
     c.doneedlog(this, c.getPlayer());
     MapleCharacter player = c.getPlayer();
     c.getSession().write(MaplePacketCreator.getFamilyInfo(player));
     c.getSession().write(MaplePacketCreator.enableActions());
   }
}
