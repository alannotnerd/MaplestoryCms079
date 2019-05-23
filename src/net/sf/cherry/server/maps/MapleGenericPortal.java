 package net.sf.cherry.server.maps;
 
 import java.awt.Point;

import net.sf.cherry.client.MapleCharacter;
import net.sf.cherry.client.MapleClient;
import net.sf.cherry.client.anticheat.CheatingOffense;
import net.sf.cherry.net.channel.ChannelServer;
import net.sf.cherry.scripting.portal.PortalScriptManager;
import net.sf.cherry.server.MaplePortal;
import net.sf.cherry.tools.MaplePacketCreator;
 
 public class MapleGenericPortal
   implements MaplePortal
 {
   private String name;
   private String target;
   private Point position;
   private int targetmap;
   private int type;
   private int id;
   private String scriptName;
   private boolean status = true;
 
   public MapleGenericPortal(int type) { this.type = type;
   }
 
   public int getId()
   {
     return this.id;
   }
 
   public void setId(int id) {
     this.id = id;
   }
 
   public String getName()
   {
     return this.name;
   }
 
   public Point getPosition()
   {
     return this.position;
   }
 
   public String getTarget()
   {
     return this.target;
   }
 
   public int getTargetMapId()
   {
     return this.targetmap;
   }
 
   public int getType()
   {
     return this.type;
   }
 
   public String getScriptName()
   {
     return this.scriptName;
   }
 
   public void setName(String name) {
     this.name = name;
   }
 
   public void setPosition(Point position) {
     this.position = position;
   }
 
   public void setTarget(String target) {
     this.target = target;
   }
 
   public void setTargetMapId(int targetmapid) {
     this.targetmap = targetmapid;
   }
 
   public void setScriptName(String scriptName)
   {
     this.scriptName = scriptName;
   }
 
   public void enterPortal(MapleClient c)
   {
     MapleCharacter player = c.getPlayer();
     double distanceSq = getPosition().distanceSq(player.getPosition());
     if (distanceSq > 22500.0D) {
       player.getCheatTracker().registerOffense(CheatingOffense.USING_FARAWAY_PORTAL, "D" + Math.sqrt(distanceSq));
     }
 
     boolean changed = false;
     if (getPortalState()) {
       if (getScriptName() != null) {
         changed = PortalScriptManager.getInstance().executePortalScript(this, c);
       } else if (getTargetMapId() != 999999999) {
         MapleMap to = ChannelServer.getInstance(c.getChannel()).getMapFactory().getMap(getTargetMapId());
         MaplePortal pto = to.getPortal(getTarget());
         if (pto == null) {
           pto = to.getPortal(0);
         }
         c.getPlayer().changeMap(to, pto);
         changed = true;
       }
     }
     else c.getSession().write(MaplePacketCreator.serverNotice(5, "挑战BOSS的战斗正在进行中，请稍后再来。"));
 
     if (!changed)
       c.getSession().write(MaplePacketCreator.enableActions());
   }
 
   public void setPortalState(boolean newStatus)
   {
     this.status = newStatus;
   }
 
   public boolean getPortalState()
   {
     return this.status;
   }
 }
