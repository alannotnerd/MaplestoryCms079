 package net.sf.cherry.net;
 
 import net.sf.cherry.client.MapleClient;
 
 public abstract class AbstractMaplePacketHandler
   implements MaplePacketHandler
 {
   public boolean validateState(MapleClient c)
   {
     return c.isLoggedIn();
   }
 }
