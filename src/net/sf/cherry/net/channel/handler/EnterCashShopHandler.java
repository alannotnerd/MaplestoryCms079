 package net.sf.cherry.net.channel.handler;
 
 import java.rmi.RemoteException;

import net.sf.cherry.client.MapleBuffStat;
import net.sf.cherry.client.MapleCharacter;
import net.sf.cherry.client.MapleClient;
import net.sf.cherry.net.AbstractMaplePacketHandler;
import net.sf.cherry.net.channel.ChannelServer;
import net.sf.cherry.net.world.remote.WorldChannelInterface;
import net.sf.cherry.server.maps.FakeCharacter;
import net.sf.cherry.tools.MaplePacketCreator;
import net.sf.cherry.tools.data.input.SeekableLittleEndianAccessor;
 
 public class EnterCashShopHandler extends AbstractMaplePacketHandler
 {
   public void handlePacket(SeekableLittleEndianAccessor slea, MapleClient c)
   {
        MapleCharacter player = c.getPlayer();
     c.doneedlog(this, c.getPlayer());
     if (c.getChannelServer().allowCashshop()) {
       if (c.getPlayer().getBuffedValue(MapleBuffStat.SUMMON) != null) {
         c.getPlayer().cancelEffectFromBuffStat(MapleBuffStat.SUMMON);
       }
        for (FakeCharacter fc : player.getFakeChars()) {
            player.getMap().removePlayer(fc.getFakeChar());
        }
       if (c.getPlayer().getInteraction() != null)
         c.getPlayer().getInteraction().removeVisitor(c.getPlayer());
       try
       {
         WorldChannelInterface wci = ChannelServer.getInstance(c.getChannel()).getWorldInterface();
         wci.addBuffsToStorage(c.getPlayer().getId(), c.getPlayer().getAllBuffs());
       } catch (RemoteException e) {
         c.getChannelServer().reconnectWorld();
       }
       c.getPlayer().getMap().removePlayer(c.getPlayer());
       c.getSession().write(MaplePacketCreator.warpCS(c));
       c.getPlayer().setInCS(true);
       c.getSession().write(MaplePacketCreator.sendWishList(c.getPlayer().getId()));
       c.getSession().write(MaplePacketCreator.showNXMapleTokens(c.getPlayer()));
       c.getSession().write(MaplePacketCreator.getCSInventory(c.getPlayer()));
       c.getSession().write(MaplePacketCreator.getCSGifts(c.getPlayer()));
       c.getPlayer().saveToDB(true);
     } else {
       c.getSession().write(MaplePacketCreator.sendBlockedMessage(3));
       c.getSession().write(MaplePacketCreator.enableActions());
     }
   }
 }

/* Location:           E:\maoxiandaodanji\dist\cherry.jar
 * Qualified Name:     net.sf.cherry.net.channel.handler.EnterCashShopHandler
 * JD-Core Version:    0.6.0
 */