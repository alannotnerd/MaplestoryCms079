 package net.sf.cherry.server.maps;
 
 import java.rmi.RemoteException;
import java.util.LinkedList;
import java.util.List;

import net.sf.cherry.client.MapleCharacter;
import net.sf.cherry.net.world.remote.WorldChannelInterface;
import net.sf.cherry.server.TimerManager;
import net.sf.cherry.tools.MaplePacketCreator;
 
 public class MapleTVEffect
 {
   private List<String> message = new LinkedList();
   private MapleCharacter user;
   private static boolean active;
   private int type;
   private MapleCharacter partner;
 
   public MapleTVEffect(MapleCharacter user_, MapleCharacter partner_, List<String> msg, int type_)
   {
     this.message = msg;
     this.user = user_;
     this.type = type_;
     this.partner = partner_;
     broadcastTV(true);
   }
 
   public static boolean isActive() {
     return active;
   }
 
   private void setActive(boolean set) {
     active = set;
   }
 
   private void broadcastTV(boolean active_) {
     WorldChannelInterface wci = this.user.getClient().getChannelServer().getWorldInterface();
     setActive(active_);
     try {
       if (active_) {
         wci.broadcastMessage(null, MaplePacketCreator.enableTV().getBytes());
         wci.broadcastMessage(null, MaplePacketCreator.sendTV(this.user, this.message, this.type <= 2 ? this.type : this.type - 3, this.partner).getBytes());
         int delay = 15000;
         if (this.type == 4)
           delay = 30000;
         else if (this.type == 5) {
           delay = 60000;
         }
         TimerManager.getInstance().schedule(new Runnable()
         {
           public void run()
           {
             MapleTVEffect.this.broadcastTV(false);
           }
         }
         , delay);
       }
       else
       {
         wci.broadcastMessage(null, MaplePacketCreator.removeTV().getBytes());
       }
     }
     catch (RemoteException re)
     {
     }
   }
 }

/* Location:           E:\maoxiandaodanji\dist\cherry.jar
 * Qualified Name:     net.sf.cherry.server.maps.MapleTVEffect
 * JD-Core Version:    0.6.0
 */