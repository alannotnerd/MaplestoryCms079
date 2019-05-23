package net.sf.cherry.net.channel.handler;

import java.net.InetAddress;
import java.rmi.RemoteException;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import net.sf.cherry.client.MapleBuffStat;
import net.sf.cherry.client.MapleClient;
import net.sf.cherry.net.AbstractMaplePacketHandler;
import net.sf.cherry.net.channel.ChannelServer;
import net.sf.cherry.net.world.MapleMessengerCharacter;
import net.sf.cherry.server.MapleTrade;
import net.sf.cherry.tools.MaplePacketCreator;
import net.sf.cherry.tools.data.input.SeekableLittleEndianAccessor;

public class ChangeChannelHandler extends AbstractMaplePacketHandler {

    private static final Logger log = LoggerFactory.getLogger(ChangeChannelHandler.class);

    public void handlePacket(SeekableLittleEndianAccessor slea, MapleClient c) {
        c.doneedlog(this, c.getPlayer());
        int channel = slea.readByte() + 1;
        if (!c.getPlayer().isAlive()) {
            c.getSession().write(MaplePacketCreator.enableActions());
            return;
        }
        String[] socket = c.getChannelServer().getIP(channel).split(":");
        if (c.getPlayer().getTrade() != null) {
            MapleTrade.cancelTrade(c.getPlayer());
        }
        try {
            c.getPlayer().cancelMagicDoor();
        } catch (NullPointerException npe) {
        } catch (NegativeArraySizeException nase) {
        }
        if (c.getPlayer().getBuffedValue(MapleBuffStat.PUPPET) != null) {
            c.getPlayer().cancelEffectFromBuffStat(MapleBuffStat.PUPPET);
        }
        if (c.getPlayer().getBuffedValue(MapleBuffStat.SUMMON) != null) {
            c.getPlayer().cancelEffectFromBuffStat(MapleBuffStat.SUMMON);
        }
        if (c.getPlayer().isBanned()) {
            c.getPlayer().dropMessage("你已被游戏管理员禁止任何操作。");
            return;
        }
            //if(c.getChannel() != 2&&c.getPlayer().getItemQuantity(5360015, false) == 0){ //不等于2频道的时候给予更换频道
             /*if (c.getPlayer().getItemQuantity(5360015, false) == 0) {
            c.getPlayer().dropMessage("你没有双倍爆率卡，无法进入爆率专线。");
            return;*/
        if (!c.getPlayer().getDiseases().isEmpty()) {
            c.getPlayer().cancelAllDebuffs();
        }
        try {
            c.getChannelServer().getWorldInterface().addBuffsToStorage(c.getPlayer().getId(), c.getPlayer().getAllBuffs());
        } catch (RemoteException e) {
            log.info("RemoteException: {}", e);
            c.getChannelServer().reconnectWorld();
        }
        c.setPacketLog(false);
        c.getPlayer().saveToDB(true);
        if (c.getPlayer().getCheatTracker() != null) {
            c.getPlayer().getCheatTracker().dispose();
        }
        if (c.getPlayer().getMessenger() != null) {
            MapleMessengerCharacter messengerplayer = new MapleMessengerCharacter(c.getPlayer());
            try {
                c.getChannelServer().getWorldInterface().silentLeaveMessenger(c.getPlayer().getMessenger().getId(), messengerplayer);
            } catch (RemoteException e) {
                c.getChannelServer().reconnectWorld();
            }
        }
        c.getPlayer().getMap().removePlayer(c.getPlayer());
        ChannelServer.getInstance(c.getChannel()).removePlayer(c.getPlayer());
        c.updateLoginState(1);
        /*for (FakeCharacter fc : c.getPlayer().getFakeChars()) {
            //if (fc.getFakeChar().getMap() == c.getPlayer().getMap()) {
                c.getChannelServer().getAllClones().remove(fc);
                c.getPlayer().getMap().removePlayer(fc.getFakeChar());
          //  }
        }*/
        c.getPlayer().getFakeChars().clear();
        try {
            c.getSession().write(MaplePacketCreator.getChannelChange(InetAddress.getByName(socket[0]), Integer.parseInt(socket[1])));
        } catch (Exception e) {
            throw new RuntimeException(e);
        //}
    }
}
}