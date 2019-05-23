package net.sf.cherry.net.channel.handler;

import java.net.InetAddress;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import net.sf.cherry.client.MapleCharacter;
import net.sf.cherry.client.MapleClient;
import net.sf.cherry.client.MapleInventoryType;
import net.sf.cherry.client.MapleStat;
import net.sf.cherry.net.AbstractMaplePacketHandler;
import net.sf.cherry.net.channel.ChannelServer;
import net.sf.cherry.server.MapleInventoryManipulator;
import net.sf.cherry.server.MaplePortal;
import net.sf.cherry.server.maps.FakeCharacter;
import net.sf.cherry.server.maps.MapleMap;
import net.sf.cherry.tools.MaplePacketCreator;
import net.sf.cherry.tools.data.input.SeekableLittleEndianAccessor;

public class ChangeMapHandler extends AbstractMaplePacketHandler {

    private static Logger log = LoggerFactory.getLogger(ChangeMapHandler.class);

    public void handlePacket(SeekableLittleEndianAccessor slea, MapleClient c) {
        c.doneedlog(this, c.getPlayer());
        if (slea.available() == 0L) {
            /*if (c.getPlayer().getParty() != null) {
                c.getPlayer().setParty(c.getPlayer().getParty());
            }
            String ip = ChannelServer.getInstance(c.getChannel()).getIP(c.getChannel());
            String[] socket = ip.split(":");
            c.getPlayer().saveToDB(true);
            c.getPlayer().setInCS(false);
            c.getPlayer().setInMTS(false);
            c.getPlayer().cancelSavedBuffs();
            ChannelServer.getInstance(c.getChannel()).removePlayer(c.getPlayer());
            c.updateLoginState(1);
            try {
                c.getSession().write(MaplePacketCreator.getChannelChange(InetAddress.getByName(socket[0]), Integer.parseInt(socket[1])));
                c.disconnect();
            } catch (Exception e) {
                throw new RuntimeException(e);
            }*/
            
            String[] socket = c.getChannelServer().getIP().split(":");
            c.getPlayer().saveToDB(true);
            c.getPlayer().setInCS(false);
            c.getChannelServer().removePlayer(c.getPlayer());
            c.updateLoginState(MapleClient.LOGIN_SERVER_TRANSITION);
            try {
                c.getSession().write(MaplePacketCreator.getChannelChange(InetAddress.getByName(socket[0]), Integer.parseInt(socket[1])));
            } catch (Exception e) {
                throw new RuntimeException(e);
            }
        } else {
            slea.readByte();
            int targetid = slea.readInt();

            String startwp = slea.readMapleAsciiString();
            MaplePortal portal = c.getPlayer().getMap().getPortal(startwp);
            MapleCharacter player = c.getPlayer();
            if ((targetid != -1) && (!c.getPlayer().isAlive())) {
                boolean executeStandardPath = true;
                if (player.getEventInstance() != null) {
                    executeStandardPath = player.getEventInstance().revivePlayer(player);
                }
                if (executeStandardPath) {
                    if (c.getPlayer().haveItem(5510000, 1, false, true)) {
                        c.getPlayer().setHp(50);
                        MapleInventoryManipulator.removeById(c, MapleInventoryType.CASH, 5510000, 1, true, false);
                        c.getPlayer().changeMap(c.getPlayer().getMap(), c.getPlayer().getMap().getPortal(0));
                        c.getPlayer().updateSingleStat(MapleStat.HP, 50);
                        c.getSession().write(MaplePacketCreator.serverNotice(5, "使用了原地复活术。死亡后您在当前地图复活。"));
                    } else {
                        player.setHp(50);
                        if (c.getPlayer().getMap().getForcedReturnId() != 999999999) {
                            MapleMap to = c.getPlayer().getMap().getForcedReturnMap();
                            MaplePortal pto = to.getPortal(0);
                            player.setStance(0);
                            player.changeMap(to, pto);
				            for (FakeCharacter ch : c.getPlayer().getFakeChars()) {
				                    ch.getFakeChar().changeMap(to, pto);
				            }
                        } else {
                            MapleMap to = c.getPlayer().getMap().getReturnMap();
                            MaplePortal pto = to.getPortal(0);
                            player.setStance(0);
                            player.changeMap(to, pto);
				            for (FakeCharacter ch : c.getPlayer().getFakeChars()) {
				                    ch.getFakeChar().changeMap(to, pto);
				            }
                        }
                    }
                }

            } else if (targetid != -1 && c.getPlayer().isGM()) {
                MapleMap to = ChannelServer.getInstance(c.getChannel()).getMapFactory().getMap(targetid);
                MaplePortal pto = to.getPortal(0);
                player.changeMap(to, pto);
	            for (FakeCharacter ch : c.getPlayer().getFakeChars()) {
	               ch.getFakeChar().changeMap(to, pto);
	            }
            } else if (targetid != -1 && !c.getPlayer().isGM()) {
                MapleMap to = ChannelServer.getInstance(c.getChannel()).getMapFactory().getMap(targetid);
                if (c.getPlayer().isGM() || 
                		(
                		   (player.getMapId() == 0 && to.getId() == 10000)
                        || (player.getMapId() == 914090010 && to.getId() == 914090011)
                        || (player.getMapId() == 914090011 && to.getId() == 914090012)
                        || (player.getMapId() == 914090012 && to.getId() == 914090013)
                        || (player.getMapId() == 914090013 && to.getId() == 140090000)
                        )
                	) {
                    MaplePortal pto = to.getPortal(0);
                    player.changeMap(to, pto);
                    for (FakeCharacter ch : c.getPlayer().getFakeChars()) {              
                      ch.getFakeChar().changeMap(to, pto);
                    }
                } else {
                    c.getSession().write(MaplePacketCreator.enableActions());
                    log.warn("玩家 {} 试图以非正常方式切换地图！", c.getPlayer().getName());
                }
            } else {
                if (portal != null) {
                    portal.enterPortal(c);
                    for (FakeCharacter fc : player.getFakeChars()) {
                        if (fc.getFakeChar().getMap() == player.getMap()) {
                            c.getChannelServer().getAllClones().remove(fc);
                            player.getMap().removePlayer(fc.getFakeChar());
                        }
                    }
                    player.getFakeChars().clear();
                } else {
                    c.getSession().write(MaplePacketCreator.enableActions());
                    log.warn("Portal {} not found on map {}", startwp, c.getPlayer().getMap().getId());
                }
            }
        }
    }
}