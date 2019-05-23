package net.sf.cherry.net.channel.handler;

import net.sf.cherry.client.MapleBuffStat;
import net.sf.cherry.client.MapleCharacter;
import net.sf.cherry.client.MapleClient;
import net.sf.cherry.client.SkillFactory;
import net.sf.cherry.net.AbstractMaplePacketHandler;
import net.sf.cherry.net.MaplePacketHandler;
import net.sf.cherry.server.maps.MapleSummon;
import net.sf.cherry.tools.MaplePacketCreator;
import net.sf.cherry.tools.data.input.SeekableLittleEndianAccessor;

public class DamageSummonHandler extends AbstractMaplePacketHandler
        implements MaplePacketHandler {

    public void handlePacket(SeekableLittleEndianAccessor slea, MapleClient c) {
        c.doneedlog(this, c.getPlayer());

        int skillid = slea.readInt();
        int unkByte = slea.readByte();
        int damage = slea.readInt();
        int monsterIdFrom = slea.readInt();

        if (SkillFactory.getSkill(skillid) != null) {
            MapleCharacter player = c.getPlayer();
            MapleSummon summon = (MapleSummon) player.getSummons().get(Integer.valueOf(skillid));

            if (summon != null) {
                summon.addHP(-damage);
                if (summon.getHP() <= 0) {
                    player.cancelEffectFromBuffStat(MapleBuffStat.PUPPET);
                }
            }
            player.getMap().broadcastMessage(player, MaplePacketCreator.damageSummon(player.getId(), skillid, damage, unkByte, monsterIdFrom), summon.getPosition());
        }
    }
}