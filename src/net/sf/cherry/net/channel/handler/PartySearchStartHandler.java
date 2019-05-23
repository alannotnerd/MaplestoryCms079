 package net.sf.cherry.net.channel.handler;
 
 import java.util.Collection;

import net.sf.cherry.client.MapleCharacter;
import net.sf.cherry.client.MapleClient;
import net.sf.cherry.client.MapleJob;
import net.sf.cherry.net.AbstractMaplePacketHandler;
import net.sf.cherry.server.maps.MapleMap;
import net.sf.cherry.server.maps.MapleMapObject;
import net.sf.cherry.tools.data.input.SeekableLittleEndianAccessor;
 
 public class PartySearchStartHandler extends AbstractMaplePacketHandler
 {
   public void handlePacket(SeekableLittleEndianAccessor slea, MapleClient c)
   {
     c.doneedlog(this, c.getPlayer());
     int min = slea.readInt();
     int max = slea.readInt();
     int members = slea.readInt();
     int jobs = slea.readInt();
     MapleCharacter chr = c.getPlayer();
     MapleMap map = chr.getMap();
     Collection<MapleMapObject> mapobjs = map.getAllPlayers();
     for (MapleMapObject mapobj : mapobjs)
       if ((mapobj instanceof MapleCharacter)) { MapleCharacter tchar = (MapleCharacter)mapobj;
         int charlvl = tchar.getLevel();
         MapleJob tjob = tchar.getJob();
         if ((charlvl < min) || (charlvl > max) || (!isValidJob(tjob, jobs)));
       }
   }
 
   private boolean isValidJob(MapleJob thejob, int jobs) {
     if (thejob == MapleJob.BEGINNER)
       return (jobs & 0x2) > 0;
     if (thejob == MapleJob.WARRIOR)
       return (jobs & 0x4) > 0;
     if ((thejob == MapleJob.HERO) || (thejob == MapleJob.FIGHTER) || (thejob == MapleJob.CRUSADER))
       return (jobs & 0x8) > 0;
     if ((thejob == MapleJob.PALADIN) || (thejob == MapleJob.PAGE) || (thejob == MapleJob.WHITEKNIGHT))
       return (jobs & 0x10) > 0;
     if ((thejob == MapleJob.DARKKNIGHT) || (thejob == MapleJob.SPEARMAN) || (thejob == MapleJob.DRAGONKNIGHT))
       return (jobs & 0x20) > 0;
     if (thejob == MapleJob.MAGICIAN)
       return (jobs & 0x40) > 0;
     if ((thejob == MapleJob.FP_ARCHMAGE) || (thejob == MapleJob.FP_WIZARD) || (thejob == MapleJob.FP_MAGE))
       return (jobs & 0x80) > 0;
     if ((thejob == MapleJob.IL_ARCHMAGE) || (thejob == MapleJob.IL_WIZARD) || (thejob == MapleJob.IL_MAGE))
       return (jobs & 0x100) > 0;
     if ((thejob == MapleJob.BISHOP) || (thejob == MapleJob.CLERIC) || (thejob == MapleJob.PRIEST))
       return (jobs & 0x200) > 0;
     if (thejob == MapleJob.PIRATE)
       return (jobs & 0x400) > 0;
     if ((thejob == MapleJob.BUCCANEER) || (thejob == MapleJob.MARAUDER) || (thejob == MapleJob.BRAWLER))
       return (jobs & 0x800) > 0;
     if ((thejob == MapleJob.CORSAIR) || (thejob == MapleJob.GUNSLINGER) || (thejob == MapleJob.OUTLAW))
       return (jobs & 0x1000) > 0;
     if (thejob == MapleJob.THIEF)
       return (jobs & 0x2000) > 0;
     if ((thejob == MapleJob.NIGHTLORD) || (thejob == MapleJob.ASSASSIN) || (thejob == MapleJob.HERMIT))
       return (jobs & 0x4000) > 0;
     if ((thejob == MapleJob.SHADOWER) || (thejob == MapleJob.BANDIT) || (thejob == MapleJob.CHIEFBANDIT))
       return (jobs & 0x8000) > 0;
     if (thejob == MapleJob.BOWMAN)
       return (jobs & 0x10000) > 0;
     if ((thejob == MapleJob.BOWMASTER) || (thejob == MapleJob.HUNTER) || (thejob == MapleJob.RANGER))
       return (jobs & 0x20000) > 0;
     if ((thejob == MapleJob.CROSSBOWMASTER) || (thejob == MapleJob.CROSSBOWMAN) || (thejob == MapleJob.SNIPER)) {
       return (jobs & 0x40000) > 0;
     }
     return false;
   }
 }
