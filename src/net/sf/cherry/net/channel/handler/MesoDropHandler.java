 package net.sf.cherry.net.channel.handler;
 
 import net.sf.cherry.client.MapleClient;
import net.sf.cherry.net.AbstractMaplePacketHandler;
import net.sf.cherry.tools.MaplePacketCreator;
import net.sf.cherry.tools.data.input.SeekableLittleEndianAccessor;
 
 public class MesoDropHandler extends AbstractMaplePacketHandler
 {
   public void handlePacket(SeekableLittleEndianAccessor slea, MapleClient c)
   {
     c.doneedlog(this, c.getPlayer());
     if (c.getPlayer().getCherryBan()) {
       c.getPlayer().getCherryBanMessage();
       c.getSession().write(MaplePacketCreator.enableActions());
       return;
     }
     int actionId = slea.readInt();
     if (actionId <= c.getLastActionId()) {
       c.getSession().write(MaplePacketCreator.enableActions());
       return;
     }
     c.setLastActionId(actionId);
     int meso = slea.readInt();
 
     if ((!c.getPlayer().isAlive()) || (meso < 10) || (meso > 50000) || (meso > c.getPlayer().getMeso())) {
       c.getSession().write(MaplePacketCreator.enableActions());
       return;
     }
 
     c.getPlayer().gainMeso(-meso, false, true);
     c.getPlayer().getMap().spawnMesoDrop(meso, c.getPlayer().getPosition(), c.getPlayer(), c.getPlayer(), false);
   }
 }

/* Location:           E:\maoxiandaodanji\dist\cherry.jar
 * Qualified Name:     net.sf.cherry.net.channel.handler.MesoDropHandler
 * JD-Core Version:    0.6.0
 */