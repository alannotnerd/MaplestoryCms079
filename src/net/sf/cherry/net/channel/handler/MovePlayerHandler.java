 package net.sf.cherry.net.channel.handler;
 
 import java.util.ConcurrentModificationException;
import java.util.List;

import net.sf.cherry.client.MapleCharacter;
import net.sf.cherry.client.MapleClient;
import net.sf.cherry.client.anticheat.CheatingOffense;
import net.sf.cherry.server.TimerManager;
import net.sf.cherry.server.maps.FakeCharacter;
import net.sf.cherry.server.movement.AbsoluteLifeMovement;
import net.sf.cherry.server.movement.LifeMovementFragment;
import net.sf.cherry.tools.MaplePacketCreator;
import net.sf.cherry.tools.data.input.SeekableLittleEndianAccessor;
 
 public class MovePlayerHandler extends AbstractMovementPacketHandler {

    private static org.slf4j.Logger log = org.slf4j.LoggerFactory.getLogger(MovePlayerHandler.class);

    @Override
    public void handlePacket(SeekableLittleEndianAccessor slea, MapleClient c) {
        slea.readByte();
        slea.readLong();
        slea.readLong();//v079
        slea.readLong();//v079
        slea.readLong();//v079
        final List<LifeMovementFragment> res = parseMovement(slea);
        c.getPlayer().setLastRes(res);
        if (res != null) {
            if (slea.available() != 18) {
             //   log.warn("slea.available != 18 (movement parsing error)");
                return;
            }
            MapleCharacter player = c.getPlayer();
            try {
                if (!player.isHidden()) {
                    c.getPlayer().getMap().broadcastMessage(player, MaplePacketCreator.movePlayer(player.getId(), res), false);
                }
                if (CheatingOffense.FAST_MOVE.isEnabled() || CheatingOffense.HIGH_JUMP.isEnabled()) {
                    checkMovementSpeed(player, res);
                }
                updatePosition(res, player, 0);
                player.getMap().movePlayer(player, player.getPosition());
                if (c.getPlayer().hasFakeChar()) {
                int i = 1;
                for (final FakeCharacter ch : c.getPlayer().getFakeChars()) {
                    if (ch.follow() && ch.getFakeChar().getMap() == player.getMap()) {
                        TimerManager.getInstance().schedule(new Runnable() {

                            @Override
                            public void run() {
                                ch.getFakeChar().getMap().broadcastMessage(ch.getFakeChar(), MaplePacketCreator.movePlayer(ch.getFakeChar().getId(), res), false);
                                updatePosition(res, ch.getFakeChar(), 0);
                                ch.getFakeChar().getMap().movePlayer(ch.getFakeChar(), ch.getFakeChar().getPosition());
                            }
                        }, i * 300);
                        i++;
                    }
                }
            }
                //player.getCheatTracker().checkFJ(c);
            } catch (ConcurrentModificationException cme) {
            } catch (Exception e) {
                log.warn("无法移动播放器 (" + player.getName() + ")");
            }
        }
    }

    private static void checkMovementSpeed(MapleCharacter chr, List<LifeMovementFragment> moves) {
        double playerSpeedMod = chr.getSpeedMod() + 0.005;
        boolean encounteredUnk0 = false;
        for (LifeMovementFragment lmf : moves) {
            if (lmf.getClass() == AbsoluteLifeMovement.class) {
                final AbsoluteLifeMovement alm = (AbsoluteLifeMovement) lmf;
                double speedMod = Math.abs(alm.getPixelsPerSecond().x) / 125.0;
                if (speedMod > playerSpeedMod) {
                    if (alm.getUnk() == 0) { // to prevent FJ fucking us
                        encounteredUnk0 = true;
                    }
                    if (!encounteredUnk0) {
                        if (speedMod > playerSpeedMod) {
                            chr.getCheatTracker().registerOffense(CheatingOffense.FAST_MOVE);
                        }
                    }
                }
            }
        }
    }
}