 package net.sf.cherry.net.channel.handler;
 
 import net.sf.cherry.client.MapleCharacter;
import net.sf.cherry.client.MapleClient;
import net.sf.cherry.client.MapleStat;
import net.sf.cherry.client.anticheat.CheatingOffense;
import net.sf.cherry.net.AbstractMaplePacketHandler;
import net.sf.cherry.tools.MaplePacketCreator;
import net.sf.cherry.tools.data.input.SeekableLittleEndianAccessor;
 
 public class GiveFameHandler extends AbstractMaplePacketHandler
 {
   public void handlePacket(SeekableLittleEndianAccessor slea, MapleClient c)
   {
     c.doneedlog(this, c.getPlayer());
     int who = slea.readInt();
     int mode = slea.readByte();
 
     int famechange = mode == 0 ? -1 : 1;
     MapleCharacter target = (MapleCharacter)c.getPlayer().getMap().getMapObject(who);
 
     if (target == c.getPlayer()) {
       c.getPlayer().getCheatTracker().registerOffense(CheatingOffense.FAMING_SELF);
       return;
     }if ((target.isGM()) && (!c.getPlayer().isGM()))
       return;
     if (c.getPlayer().getLevel() < 15) {
       c.getPlayer().getCheatTracker().registerOffense(CheatingOffense.FAMING_UNDER_15);
       return;
     }
     switch (c.getPlayer().canGiveFame(target)) {
    case OK:
       if (Math.abs(target.getFame() + famechange) < 30001) {
         target.addFame(famechange);
         target.updateSingleStat(MapleStat.FAME, target.getFame());
       }
       if (target.getFame() >= 50) {
         target.finishAchievement(9);
       }
       if (!c.getPlayer().isGM()) {
         c.getPlayer().hasGivenFame(target);
       }
       c.getSession().write(MaplePacketCreator.giveFameResponse(mode, target.getName(), target.getFame()));
        target.getClient().getSession().write(MaplePacketCreator.receiveFame(mode, c.getPlayer().getName()));
       break;
   case NOT_TODAY:
       c.getSession().write(MaplePacketCreator.giveFameErrorResponse(3));
       break;
     case NOT_THIS_MONTH:
       c.getSession().write(MaplePacketCreator.giveFameErrorResponse(4));
     }
   }
 }




