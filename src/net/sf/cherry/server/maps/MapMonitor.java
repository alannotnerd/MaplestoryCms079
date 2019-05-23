 package net.sf.cherry.server.maps;
 
 import java.util.concurrent.ScheduledFuture;

import net.sf.cherry.server.MaplePortal;
import net.sf.cherry.server.TimerManager;
import net.sf.cherry.tools.MaplePacketCreator;
 
 public class MapMonitor
 {
   private ScheduledFuture<?> monitorSchedule;
   private MapleMap map;
   private MaplePortal portal;
   private int ch;
   private MapleReactor reactor;
 
   public MapMonitor(final MapleMap map, MaplePortal portal, int ch, MapleReactor reactor)
   {
     this.map = map;
     this.portal = portal;
     this.ch = ch;
     this.reactor = reactor;
     this.monitorSchedule = TimerManager.getInstance().register(new Runnable()
     {
       public void run()
       {
         if (map.getCharacters().size() <= 0)
           MapMonitor.this.cancelAction();
       }
     }
     , 5000L);
   }
 
   public void cancelAction()
   {
     this.monitorSchedule.cancel(false);
     this.map.killAllMonsters();
     if (this.portal != null) {
       this.portal.setPortalState(true);
     }
     if (this.reactor != null) {
       this.reactor.setState((byte)0);
       this.reactor.getMap().broadcastMessage(MaplePacketCreator.triggerReactor(this.reactor, 0));
     }
     this.map.resetReactors();
   }
 }

/* Location:           E:\maoxiandaodanji\dist\cherry.jar
 * Qualified Name:     net.sf.cherry.server.maps.MapMonitor
 * JD-Core Version:    0.6.0
 */