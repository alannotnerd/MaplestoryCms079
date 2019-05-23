 package net.sf.cherry.net.channel.handler;
 
 import net.sf.cherry.client.IItem;
import net.sf.cherry.client.MapleClient;
import net.sf.cherry.client.MapleInventoryType;
import net.sf.cherry.net.AbstractMaplePacketHandler;
import net.sf.cherry.server.MapleInventoryManipulator;
import net.sf.cherry.server.MapleItemInformationProvider;
import net.sf.cherry.server.MapleStatEffect;
import net.sf.cherry.tools.MaplePacketCreator;
import net.sf.cherry.tools.data.input.SeekableLittleEndianAccessor;
 
 public class PetAutoPotHandler extends AbstractMaplePacketHandler
 {
   public void handlePacket(SeekableLittleEndianAccessor slea, MapleClient c)
   {
     c.doneedlog(this, c.getPlayer());
     if (!c.getPlayer().isAlive()) {
       c.getSession().write(MaplePacketCreator.enableActions());
       return;
     }
     slea.readByte();
     slea.readLong();
     slea.readInt();
     byte slot = (byte)slea.readShort();
     int itemId = slea.readInt();
     IItem toUse = c.getPlayer().getInventory(MapleInventoryType.USE).getItem(slot);
     if ((toUse != null) && (toUse.getQuantity() > 0)) {
       if (toUse.getItemId() != itemId) {
         c.getSession().write(MaplePacketCreator.enableActions());
         return;
       }
       MapleInventoryManipulator.removeFromSlot(c, MapleInventoryType.USE, slot,(byte) 1, false);
       MapleStatEffect stat = MapleItemInformationProvider.getInstance().getItemEffect(toUse.getItemId());
       stat.applyTo(c.getPlayer());
       if (stat.getMp() > 0) {
         c.getSession().write(MaplePacketCreator.sendAutoMpPot(itemId));
       }
       if (stat.getHp() > 0)
         c.getSession().write(MaplePacketCreator.sendAutoHpPot(itemId));
     }
   }
 }

