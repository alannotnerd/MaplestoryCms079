package net.sf.cherry.net.channel.handler;

import net.sf.cherry.client.MapleCharacter;
import net.sf.cherry.client.MapleClient;
import net.sf.cherry.server.MapleStatEffect;
import net.sf.cherry.tools.MaplePacketCreator;
import net.sf.cherry.tools.data.input.SeekableLittleEndianAccessor;

public class EnergyAttackHandler extends AbstractDealDamageHandler {

    public void handlePacket(SeekableLittleEndianAccessor slea, MapleClient c) {
        c.doneedlog(this, c.getPlayer());
        if (c.getPlayer().getCherryBan()) {
            c.getPlayer().getCherryBanMessage();
            c.getSession().write(MaplePacketCreator.enableActions());
            return;
        }
        AbstractDealDamageHandler.AttackInfo attack = parseDamage(c.getPlayer(), slea, false);
        MapleCharacter player = c.getPlayer();
        int maxdamage = c.getPlayer().getCurrentMaxBaseDamage();
        MapleStatEffect effect = attack.getAttackEffect(c.getPlayer());
        if (effect != null) {
            maxdamage *= effect.getDamage() / 100.0;
        }
        applyAttack(attack, player, maxdamage, 1, c);
        ////System.out.println(""+maxdamage+"");
        
    }
}