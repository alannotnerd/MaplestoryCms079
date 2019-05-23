 package net.sf.cherry.scripting.portal;
 
 import net.sf.cherry.client.MapleClient;
import net.sf.cherry.client.messages.ServernoticeMapleClientMessageCallback;
import net.sf.cherry.scripting.AbstractPlayerInteraction;
import net.sf.cherry.server.MaplePortal;
import net.sf.cherry.server.maps.MapMonitor;
import net.sf.cherry.server.maps.MapleMapObject;
import net.sf.cherry.server.maps.MapleMapObjectType;
import net.sf.cherry.server.maps.MapleReactor;
import net.sf.cherry.tools.MaplePacketCreator;
 
 public class PortalPlayerInteraction extends AbstractPlayerInteraction
 {
   private MaplePortal portal;
   private MapleClient c;
 
   public PortalPlayerInteraction(MapleClient c, MaplePortal portal)
   {
     super(c);
     this.c = c;
     this.portal = portal;
   }
 
   public MaplePortal getPortal() {
     return this.portal;
   }
 
   public MapleClient getC() {
     return getClient();
   }
 
   public boolean isMonster(MapleMapObject o) {
     return o.getType() == MapleMapObjectType.MONSTER;
   }
 
   public void blockPortal() {
     this.c.getPlayer().blockPortal(getPortal().getScriptName());
   }
 
   public void unblockPortal() {
     this.c.getPlayer().unblockPortal(getPortal().getScriptName());
   }
   public void createMapMonitor(int mapId, boolean closePortal, int reactorMap, int reactor) {
     if (closePortal) {
       this.portal.setPortalState(false);
     }
     MapleReactor r = null;
     if (reactor > -1) {
       r = this.c.getChannelServer().getMapFactory().getMap(reactorMap).getReactorById(reactor);
       r.setState((byte)1);
       this.c.getChannelServer().getMapFactory().getMap(reactorMap).broadcastMessage(MaplePacketCreator.triggerReactor(r, 1));
     }
     new MapMonitor(this.c.getChannelServer().getMapFactory().getMap(mapId), closePortal ? this.portal : null, this.c.getChannel(), r);
   }
   public void sendMessage(String message) {
     new ServernoticeMapleClientMessageCallback(0, this.c).dropMessage(message);
   }
 }

/* Location:           E:\maoxiandaodanji\dist\cherry.jar
 * Qualified Name:     net.sf.cherry.scripting.portal.PortalPlayerInteraction
 * JD-Core Version:    0.6.0
 */