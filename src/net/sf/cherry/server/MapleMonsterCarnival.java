 package net.sf.cherry.server;
 
 import java.util.concurrent.ScheduledFuture;

import net.sf.cherry.client.MapleCharacter;
import net.sf.cherry.net.channel.ChannelServer;
import net.sf.cherry.net.world.MapleParty;
import net.sf.cherry.net.world.MaplePartyCharacter;
import net.sf.cherry.server.maps.MapleMap;
import net.sf.cherry.tools.MaplePacketCreator;
 
 public class MapleMonsterCarnival
 {
   public static int D = 3;
   public static int C = 2;
   public static int B = 1;
   public static int A = 0;
   private MapleParty p1;
   private MapleParty p2;
   private MapleMap map;
   private ScheduledFuture<?> timer;
   private ScheduledFuture<?> effectTimer;
   private long startTime;
   private MapleCharacter leader1;
   private MapleCharacter leader2;
   private int redCP;
   private int blueCP;
   private int redTotalCP;
   private int blueTotalCP;
 
   public MapleMonsterCarnival(MapleParty p1, MapleParty p2, int mapid)
   {
     this.p1 = p1;
     this.p2 = p2;
     int chnl = p1.getLeader().getChannel();
     int chnl1 = p2.getLeader().getChannel();
     if (chnl != chnl1) {
       throw new RuntimeException("ERROR: CPQ leaders are on different channels.");
     }
     ChannelServer cs = ChannelServer.getInstance(chnl);
     p1.setEnemy(p2);
     p2.setEnemy(p1);
     this.map = cs.getMapFactory().getMap(mapid);
     int redPortal = 0;
     int bluePortal = 0;
     if (this.map.isPurpleCPQMap()) {
       redPortal = 2;
       bluePortal = 1;
     }
     for (MaplePartyCharacter mpc : p1.getMembers())
     {
       MapleCharacter mc = cs.getPlayerStorage().getCharacterByName(mpc.getName());
       if (mc != null) {
         mc.setMonsterCarnival(this);
         mc.changeMap(this.map, this.map.getPortal(redPortal));
         mc.setTeam(0);
         if (p1.getLeader().getId() == mc.getId()) {
           this.leader1 = mc;
         }
       }
     }
     for (MaplePartyCharacter mpc : p2.getMembers())
     {
       MapleCharacter mc = cs.getPlayerStorage().getCharacterByName(mpc.getName());
       if (mc != null) {
         mc.setMonsterCarnival(this);
         mc.changeMap(this.map, this.map.getPortal(bluePortal));
         mc.setTeam(1);
         if (p2.getLeader().getId() == mc.getId()) {
           this.leader2 = mc;
         }
       }
     }
     this.startTime = (System.currentTimeMillis() + 600000L);
     this.timer = TimerManager.getInstance().schedule(new Runnable()
     {
       public void run() {
         MapleMonsterCarnival.this.timeUp();
       }
     }
     , 600000L);
 
     this.effectTimer = TimerManager.getInstance().schedule(new Runnable()
     {
       public void run() {
         MapleMonsterCarnival.this.complete();
       }
     }
     , 590000L);
 
     TimerManager.getInstance().schedule(new Runnable()
     {
       public void run() {
         MapleMonsterCarnival.this.map.addClock(600);
       }
     }
     , 2000L);
   }
 
   public void playerDisconnected(int charid)
   {
     if ((this.leader1.getId() == charid) || (this.leader2.getId() == charid)) {
       earlyFinish();
       int team = -1;
       for (MaplePartyCharacter mpc : this.leader1.getParty().getMembers()) {
         if (mpc.getId() == charid) {
           team = 0;
         }
       }
       for (MaplePartyCharacter mpc : this.leader2.getParty().getMembers()) {
         if (mpc.getId() == charid) {
           team = 1;
         }
       }
       if (team == -1) {
         team = 1;
       }
       String teamS = "undefined";
       switch (team) {
       case 0:
         teamS = "Red";
         break;
       case 1:
         teamS = "Blue";
       }
 
       this.map.broadcastMessage(MaplePacketCreator.serverNotice(5, "Maple " + teamS + " has quitted the Monster Carnival."));
       return;
     }
     this.map.broadcastMessage(MaplePacketCreator.serverNotice(5, ChannelServer.getInstance(1).getPlayerStorage().getCharacterById(charid).getName() + " has quitted the Monster Carnival."));
   }
 
   public void earlyFinish()
   {
     dispose(true);
   }
 
   public void leftParty(int charid) {
     playerDisconnected(charid);
   }
 
   protected int getRankByCP(int cp) {
     if (cp < 50)
       return D;
     if ((cp > 50) && (cp < 100))
       return C;
     if ((cp > 100) && (cp < 300))
       return B;
     if (cp > 300) {
       return A;
     }
     return D;
   }
 
   protected void dispose() {
     dispose(false);
   }
 
   protected void dispose(boolean warpout) {
     int chnl = this.p1.getLeader().getChannel();
     ChannelServer cs = ChannelServer.getInstance(chnl);
     MapleMap out = cs.getMapFactory().getMap(980000000);
     for (MaplePartyCharacter mpc : this.leader1.getParty().getMembers())
     {
       MapleCharacter mc = cs.getPlayerStorage().getCharacterByName(mpc.getName());
       if (mc != null) {
         mc.setCPQRanking(getRankByCP(this.redTotalCP));
         mc.resetCP();
         if (warpout) {
           mc.changeMap(out, out.getPortal(0));
         }
       }
     }
     for (MaplePartyCharacter mpc : this.leader2.getParty().getMembers())
     {
       MapleCharacter mc = cs.getPlayerStorage().getCharacterByName(mpc.getName());
       if (mc != null) {
         mc.setCPQRanking(getRankByCP(this.blueTotalCP));
         mc.resetCP();
         if (warpout) {
           mc.changeMap(out, out.getPortal(0));
         }
       }
     }
     this.timer.cancel(false);
     this.effectTimer.cancel(false);
     this.redTotalCP = 0;
     this.blueTotalCP = 0;
     this.leader1.getParty().setEnemy(null);
     this.leader2.getParty().setEnemy(null);
   }
 
   public void exit() {
     dispose();
   }
 
   public ScheduledFuture<?> getTimer() {
     return this.timer;
   }
 
   public void finish(int winningTeam) {
     int chnl = this.leader1.getClient().getChannel();
     int chnl1 = this.leader2.getClient().getChannel();
     if (chnl != chnl1) {
       throw new RuntimeException("CPQ leaders are on different channels..");
     }
     ChannelServer cs = ChannelServer.getInstance(chnl);
     if (winningTeam == 0) {
       for (MaplePartyCharacter mpc : this.leader1.getParty().getMembers())
       {
         MapleCharacter mc = cs.getPlayerStorage().getCharacterByName(mpc.getName());
         if (mc != null) {
           mc.setCPQRanking(getRankByCP(this.redTotalCP));
           mc.changeMap(cs.getMapFactory().getMap(this.map.getId() + 2), cs.getMapFactory().getMap(this.map.getId() + 2).getPortal(0));
           mc.setTeam(-1);
         }
       }
       for (MaplePartyCharacter mpc : this.leader2.getParty().getMembers())
       {
         MapleCharacter mc = cs.getPlayerStorage().getCharacterByName(mpc.getName());
         if (mc != null) {
           mc.setCPQRanking(getRankByCP(this.blueTotalCP));
           mc.changeMap(cs.getMapFactory().getMap(this.map.getId() + 3), cs.getMapFactory().getMap(this.map.getId() + 3).getPortal(0));
           mc.setTeam(-1);
         }
       }
     } else if (winningTeam == 1) {
       for (MaplePartyCharacter mpc : this.leader2.getParty().getMembers())
       {
         MapleCharacter mc = cs.getPlayerStorage().getCharacterByName(mpc.getName());
         if (mc != null) {
           mc.changeMap(cs.getMapFactory().getMap(this.map.getId() + 2), cs.getMapFactory().getMap(this.map.getId() + 2).getPortal(0));
           mc.setTeam(-1);
         }
       }
       for (MaplePartyCharacter mpc : this.leader1.getParty().getMembers())
       {
         MapleCharacter mc = cs.getPlayerStorage().getCharacterByName(mpc.getName());
         if (mc != null) {
           mc.changeMap(cs.getMapFactory().getMap(this.map.getId() + 3), cs.getMapFactory().getMap(this.map.getId() + 3).getPortal(0));
           mc.setTeam(-1);
         }
       }
     }
     dispose();
   }
 
   public void timeUp() {
     int cp1 = this.redTotalCP;
     int cp2 = this.blueTotalCP;
     if (cp1 == cp2) {
       extendTime();
       return;
     }
     if (cp1 > cp2)
       finish(0);
     else
       finish(1);
   }
 
   public long getTimeLeft()
   {
     return this.startTime - System.currentTimeMillis();
   }
 
   public int getTimeLeftSeconds() {
     return (int)(getTimeLeft() / 1000L);
   }
 
   public void extendTime() {
     this.map.broadcastMessage(MaplePacketCreator.serverNotice(5, "The time has been extended."));
     this.startTime = (System.currentTimeMillis() + 3000L);
     this.map.addClock(180);
     this.timer = TimerManager.getInstance().schedule(new Runnable()
     {
       public void run() {
         MapleMonsterCarnival.this.timeUp();
       }
     }
     , 180000L);
 
     this.effectTimer = TimerManager.getInstance().schedule(new Runnable()
     {
       public void run() {
         MapleMonsterCarnival.this.complete();
       }
     }
     , 179990L);
   }
 
   public void complete()
   {
     int cp1 = this.redTotalCP;
     int cp2 = this.blueTotalCP;
     if (cp1 == cp2) {
       return;
     }
     boolean redWin = cp1 > cp2;
     int chnl = this.leader1.getClient().getChannel();
     int chnl1 = this.leader2.getClient().getChannel();
     if (chnl != chnl1) {
       throw new RuntimeException("CPQ leaders are on different channels..");
     }
     ChannelServer cs = ChannelServer.getInstance(chnl);
     this.map.killAllMonsters();
     for (MaplePartyCharacter mpc : this.leader1.getParty().getMembers())
     {
       MapleCharacter mc = cs.getPlayerStorage().getCharacterByName(mpc.getName());
       if (mc != null) {
         if (redWin) {
           mc.getClient().getSession().write(MaplePacketCreator.showEffect("quest/carnival/win"));
           mc.getClient().getSession().write(MaplePacketCreator.playSound("MobCarnival/Win"));
         } else {
           mc.getClient().getSession().write(MaplePacketCreator.showEffect("quest/carnival/lose"));
           mc.getClient().getSession().write(MaplePacketCreator.playSound("MobCarnival/Lose"));
         }
       }
     }
     for (MaplePartyCharacter mpc : this.leader2.getParty().getMembers())
     {
       MapleCharacter mc = cs.getPlayerStorage().getCharacterByName(mpc.getName());
       if (mc != null)
         if (!redWin) {
           mc.getClient().getSession().write(MaplePacketCreator.showEffect("quest/carnival/win"));
           mc.getClient().getSession().write(MaplePacketCreator.playSound("MobCarnival/Win"));
         } else {
           mc.getClient().getSession().write(MaplePacketCreator.showEffect("quest/carnival/lose"));
           mc.getClient().getSession().write(MaplePacketCreator.playSound("MobCarnival/Lose"));
         }
     }
   }
 
   public MapleParty getRed()
   {
     return this.p1;
   }
 
   public void setRed(MapleParty p1) {
     this.p1 = p1;
   }
 
   public MapleParty getBlue() {
     return this.p2;
   }
 
   public void setBlue(MapleParty p2) {
     this.p2 = p2;
   }
 
   public MapleCharacter getLeader1() {
     return this.leader1;
   }
 
   public void setLeader1(MapleCharacter leader1) {
     this.leader1 = leader1;
   }
 
   public MapleCharacter getLeader2() {
     return this.leader2;
   }
 
   public void setLeader2(MapleCharacter leader2) {
     this.leader2 = leader2;
   }
 
   public MapleCharacter getEnemyLeader(int team) {
     switch (team) {
     case 0:
       return this.leader2;
     case 1:
       return this.leader1;
     }
     return null;
   }
 
   public int getBlueCP() {
     return this.blueCP;
   }
 
   public void setBlueCP(int blueCP) {
     this.blueCP = blueCP;
   }
 
   public int getBlueTotalCP() {
     return this.blueTotalCP;
   }
 
   public void setBlueTotalCP(int blueTotalCP) {
     this.blueTotalCP = blueTotalCP;
   }
 
   public int getRedCP() {
     return this.redCP;
   }
 
   public void setRedCP(int redCP) {
     this.redCP = redCP;
   }
 
   public int getRedTotalCP() {
     return this.redTotalCP;
   }
 
   public void setRedTotalCP(int redTotalCP) {
     this.redTotalCP = redTotalCP;
   }
 
   public int getTotalCP(int team) {
     if (team == 0)
       return this.redTotalCP;
     if (team == 1) {
       return this.blueTotalCP;
     }
     throw new RuntimeException("Unknown team");
   }
 
   public void setTotalCP(int totalCP, int team)
   {
     if (team == 0)
       this.redTotalCP = totalCP;
     else if (team == 1)
       this.blueTotalCP = totalCP;
   }
 
   public int getCP(int team)
   {
     if (team == 0)
       return this.redCP;
     if (team == 1) {
       return this.blueCP;
     }
     throw new RuntimeException("Unknown team");
   }
 
   public void setCP(int CP, int team)
   {
     if (team == 0)
       this.redCP = CP;
     else if (team == 1)
       this.blueCP = CP;
   }
 }

/* Location:           E:\maoxiandaodanji\dist\cherry.jar
 * Qualified Name:     net.sf.cherry.server.MapleMonsterCarnival
 * JD-Core Version:    0.6.0
 */