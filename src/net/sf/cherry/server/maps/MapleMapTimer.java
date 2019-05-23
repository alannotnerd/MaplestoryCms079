 package net.sf.cherry.server.maps;
 
 import java.util.Calendar;
import java.util.concurrent.ScheduledFuture;

import net.sf.cherry.client.MapleClient;
import net.sf.cherry.net.MaplePacket;
import net.sf.cherry.tools.MaplePacketCreator;
 
 public class MapleMapTimer
 {
   private int duration;
   private Calendar startTime;
   private Calendar predictedStopTime;
   private int mapToWarpTo = -1;
   private int minLevelToWarp = 0;
   private int maxLevelToWarp = 256;
   private ScheduledFuture<?> sf0F;
 
   public MapleMapTimer(ScheduledFuture<?> sfO, int newDuration, int mapToWarpToP, int minLevelToWarpP, int maxLevelToWarpP)
   {
     this.duration = newDuration;
     this.startTime = Calendar.getInstance();
     this.predictedStopTime = Calendar.getInstance();
     this.predictedStopTime.add(13, this.duration);
     this.mapToWarpTo = mapToWarpToP;
     this.minLevelToWarp = minLevelToWarpP;
     this.maxLevelToWarp = maxLevelToWarpP;
     this.sf0F = sfO;
   }
 
   public MaplePacket makeSpawnData()
   {
     long StopTimeStamp = this.predictedStopTime.getTimeInMillis();
     long CurrentTimeStamp = Calendar.getInstance().getTimeInMillis();
     int timeLeft = (int)(StopTimeStamp - CurrentTimeStamp) / 1000;
     return MaplePacketCreator.getClock(timeLeft);
   }
 
   public void sendSpawnData(MapleClient c) {
     c.getSession().write(makeSpawnData());
   }
 
   public ScheduledFuture<?> getSF0F() {
     return this.sf0F;
   }
 
   public int warpToMap() {
     return this.mapToWarpTo;
   }
 
   public int minLevelToWarp() {
     return this.minLevelToWarp;
   }
 
   public int maxLevelToWarp() {
     return this.maxLevelToWarp;
   }
 
   public int getTimeLeft()
   {
     long StopTimeStamp = this.predictedStopTime.getTimeInMillis();
     long CurrentTimeStamp = Calendar.getInstance().getTimeInMillis();
     int timeLeft = (int)(StopTimeStamp - CurrentTimeStamp) / 1000;
     return timeLeft;
   }
 }

/* Location:           E:\maoxiandaodanji\dist\cherry.jar
 * Qualified Name:     net.sf.cherry.server.maps.MapleMapTimer
 * JD-Core Version:    0.6.0
 */