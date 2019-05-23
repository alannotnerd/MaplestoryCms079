 package net.sf.cherry.net.channel.handler;
 
 import java.util.ArrayList;
import java.util.List;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import net.sf.cherry.client.MapleClient;
import net.sf.cherry.client.MapleStat;
import net.sf.cherry.net.AbstractMaplePacketHandler;
import net.sf.cherry.tools.MaplePacketCreator;
import net.sf.cherry.tools.Pair;
import net.sf.cherry.tools.data.input.SeekableLittleEndianAccessor;
 
 public class DistributeAutoAPHandler extends AbstractMaplePacketHandler
 {
   private static Logger log = LoggerFactory.getLogger(DistributeAutoAPHandler.class);
 
   public void handlePacket(SeekableLittleEndianAccessor slea, MapleClient c)
   {
     c.doneedlog(this, c.getPlayer());
     List statupdate = new ArrayList(2);
     c.getSession().write(MaplePacketCreator.updatePlayerStats(statupdate, true));
     slea.readInt();
     int count = slea.readInt();
     for (int i = 0; i < count; i++) {
       int update = slea.readInt();
       int updatenumber = slea.readInt();
       if (c.getPlayer().getRemainingAp() >= updatenumber) {
         switch (update) {
         case 256:
           if (c.getPlayer().getStr() + updatenumber >= 30000) {
             return;
           }
           c.getPlayer().setStr(c.getPlayer().getStr() + updatenumber);
           statupdate.add(new Pair(MapleStat.STR, Integer.valueOf(c.getPlayer().getStr())));
           break;
         case 512:
           if (c.getPlayer().getDex() + updatenumber >= 30000) {
             return;
           }
           c.getPlayer().setDex(c.getPlayer().getDex() + updatenumber);
           statupdate.add(new Pair(MapleStat.DEX, Integer.valueOf(c.getPlayer().getDex())));
           break;
         case 1024:
           if (c.getPlayer().getInt() + updatenumber >= 30000) {
             return;
           }
           c.getPlayer().setInt(c.getPlayer().getInt() + updatenumber);
           statupdate.add(new Pair(MapleStat.INT, Integer.valueOf(c.getPlayer().getInt())));
           break;
         case 2048:
           if (c.getPlayer().getLuk() + updatenumber >= 30000) {
             return;
           }
           c.getPlayer().setLuk(c.getPlayer().getLuk() + updatenumber);
           statupdate.add(new Pair(MapleStat.LUK, Integer.valueOf(c.getPlayer().getLuk())));
           break;
         default:
           c.getSession().write(MaplePacketCreator.updatePlayerStats(MaplePacketCreator.EMPTY_STATUPDATE, true));
           return;
         }
         c.getPlayer().setRemainingAp(c.getPlayer().getRemainingAp() - updatenumber);
       } else {
         log.info("[h4x] Player {} is distributing AP to {} without having any", c.getPlayer().getName(), Integer.valueOf(update));
       }
     }
     statupdate.add(new Pair(MapleStat.AVAILABLEAP, Integer.valueOf(c.getPlayer().getRemainingAp())));
     c.getSession().write(MaplePacketCreator.updatePlayerStats(statupdate, true));
   }
 }

/* Location:           E:\maoxiandaodanji\dist\cherry.jar
 * Qualified Name:     net.sf.cherry.net.channel.handler.DistributeAutoAPHandler
 * JD-Core Version:    0.6.0
 */