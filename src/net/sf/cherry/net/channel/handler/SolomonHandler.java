 package net.sf.cherry.net.channel.handler;
 
 import net.sf.cherry.client.IItem;
import net.sf.cherry.client.MapleClient;
import net.sf.cherry.client.MapleInventoryType;
import net.sf.cherry.net.AbstractMaplePacketHandler;
import net.sf.cherry.server.MapleInventoryManipulator;
import net.sf.cherry.server.MapleItemInformationProvider;
import net.sf.cherry.tools.MaplePacketCreator;
import net.sf.cherry.tools.data.input.SeekableLittleEndianAccessor;
 
 public class SolomonHandler extends AbstractMaplePacketHandler
 {
   public void handlePacket(SeekableLittleEndianAccessor slea, MapleClient c)
   {
     c.doneedlog(this, c.getPlayer());
     slea.readInt();
     byte slot = (byte)slea.readShort();
     int itemid = slea.readInt();
     MapleItemInformationProvider ii = MapleItemInformationProvider.getInstance();
     IItem item = c.getPlayer().getInventory(MapleInventoryType.USE).getItem(slot);
     if ((item == null) || (item.getItemId() != itemid) || (c.getPlayer().getLevel() > 50)) {
       //c.disconnect();
       return;
     }
     int expGained = ii.getExpCache(itemid) * c.getChannelServer().getExpRate();
     c.getPlayer().gainExp(expGained, true, false);
     c.getSession().write(MaplePacketCreator.enableActions());
     MapleInventoryManipulator.removeFromSlot(c, MapleInventoryType.USE, slot, (short) 1, false);
   }
 }

/* Location:           E:\maoxiandaodanji\dist\cherry.jar
 * Qualified Name:     net.sf.cherry.net.channel.handler.SolomonHandler
 * JD-Core Version:    0.6.0
 */