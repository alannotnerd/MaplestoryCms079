 package net.sf.cherry.net.channel.handler;
 
 import net.sf.cherry.client.ExpTable;
import net.sf.cherry.client.MapleClient;
import net.sf.cherry.client.MapleInventoryType;
import net.sf.cherry.net.AbstractMaplePacketHandler;
import net.sf.cherry.server.MapleInventoryManipulator;
import net.sf.cherry.tools.MaplePacketCreator;
import net.sf.cherry.tools.Randomizer;
import net.sf.cherry.tools.data.input.SeekableLittleEndianAccessor;
 
 public class MountFoodHandler extends AbstractMaplePacketHandler
 {
   public void handlePacket(SeekableLittleEndianAccessor slea, MapleClient c)
   {
     c.doneedlog(this, c.getPlayer());
     slea.readInt();
     slea.readShort();
     int itemid = slea.readInt();
     if (c.getPlayer().getInventory(MapleInventoryType.USE).findById(itemid) != null)
       if (c.getPlayer().getMount() != null) {
         c.getPlayer().getMount().setTiredness(c.getPlayer().getMount().getTiredness() - 30);
         c.getPlayer().getMount().setExp(Randomizer.getInstance().nextInt(26) + 12 + c.getPlayer().getMount().getExp());
         int level = c.getPlayer().getMount().getLevel();
         boolean levelup = (c.getPlayer().getMount().getExp() >= ExpTable.getMountExpNeededForLevel(level)) && (level < 31) && (c.getPlayer().getMount().getTiredness() != 0);
         if (levelup) {
           c.getPlayer().getMount().setLevel(level + 1);
         }
         c.getPlayer().getMap().broadcastMessage(MaplePacketCreator.updateMount(c.getPlayer().getId(), c.getPlayer().getMount(), levelup));
         MapleInventoryManipulator.removeById(c, MapleInventoryType.USE, itemid, 1, true, false);
       } else {
         c.getPlayer().dropMessage("无法使用。");
       }
   }
 }

/* Location:           E:\maoxiandaodanji\dist\cherry.jar
 * Qualified Name:     net.sf.cherry.net.channel.handler.MountFoodHandler
 * JD-Core Version:    0.6.0
 */