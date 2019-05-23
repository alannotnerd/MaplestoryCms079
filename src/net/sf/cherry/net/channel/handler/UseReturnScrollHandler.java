 package net.sf.cherry.net.channel.handler;
 
 import net.sf.cherry.client.IItem;
import net.sf.cherry.client.MapleClient;
import net.sf.cherry.client.MapleInventoryType;
import net.sf.cherry.net.AbstractMaplePacketHandler;
import net.sf.cherry.server.MapleInventoryManipulator;
import net.sf.cherry.server.MapleItemInformationProvider;
import net.sf.cherry.tools.MaplePacketCreator;
import net.sf.cherry.tools.data.input.SeekableLittleEndianAccessor;
 
 public class UseReturnScrollHandler extends AbstractMaplePacketHandler
 {
   public void handlePacket(SeekableLittleEndianAccessor slea, MapleClient c)
   {
     c.doneedlog(this, c.getPlayer());
     if (!c.getPlayer().isAlive()) {
       c.getSession().write(MaplePacketCreator.enableActions());
       return;
     }
     slea.readInt();
     byte slot = (byte)slea.readShort();
     int itemId = slea.readInt();
 
     MapleItemInformationProvider ii = MapleItemInformationProvider.getInstance();
     IItem toUse = c.getPlayer().getInventory(MapleInventoryType.USE).getItem(slot);
 
     if ((toUse == null) || (toUse.getQuantity() < 1) || (toUse.getItemId() != itemId)) {
       return;
     }
 
     if (ii.getItemEffect(toUse.getItemId()).applyReturnScroll(c.getPlayer()))
       MapleInventoryManipulator.removeFromSlot(c, MapleInventoryType.USE, slot, (byte) 1, false);
     else
       c.getSession().write(MaplePacketCreator.enableActions());
   }
 }

/* Location:           E:\maoxiandaodanji\dist\cherry.jar
 * Qualified Name:     net.sf.cherry.net.channel.handler.UseReturnScrollHandler
 * JD-Core Version:    0.6.0
 */