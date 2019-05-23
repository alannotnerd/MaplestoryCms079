 package net.sf.cherry.server;
 
 import java.awt.Point;

import net.sf.cherry.provider.MapleData;
import net.sf.cherry.provider.MapleDataTool;
import net.sf.cherry.server.maps.MapleGenericPortal;
import net.sf.cherry.server.maps.MapleMapPortal;
 
 public class PortalFactory
 {
   private int nextDoorPortal;
 
   public PortalFactory()
   {
     this.nextDoorPortal = 128;
   }
 
   public MaplePortal makePortal(int type, MapleData portal) {
     MapleGenericPortal ret = null;
     if (type == 2)
       ret = new MapleMapPortal();
     else {
       ret = new MapleGenericPortal(type);
     }
     loadPortal(ret, portal);
     return ret;
   }
 
   private void loadPortal(MapleGenericPortal myPortal, MapleData portal) {
     myPortal.setName(MapleDataTool.getString(portal.getChildByPath("pn")));
     myPortal.setTarget(MapleDataTool.getString(portal.getChildByPath("tn")));
     myPortal.setTargetMapId(MapleDataTool.getInt(portal.getChildByPath("tm")));
     int x = MapleDataTool.getInt(portal.getChildByPath("x"));
     int y = MapleDataTool.getInt(portal.getChildByPath("y"));
     myPortal.setPosition(new Point(x, y));
     String script = MapleDataTool.getString("script", portal, null);
     if ((script != null) && (script.equals(""))) {
       script = null;
     }
     myPortal.setScriptName(script);
     if (myPortal.getType() == 6) {
       myPortal.setId(this.nextDoorPortal);
       this.nextDoorPortal += 1;
     } else {
       myPortal.setId(Integer.parseInt(portal.getName()));
     }
   }
 }

/* Location:           E:\maoxiandaodanji\dist\cherry.jar
 * Qualified Name:     net.sf.cherry.server.PortalFactory
 * JD-Core Version:    0.6.0
 */