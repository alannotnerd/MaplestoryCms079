/*
 *重生的谜之蛋|| 永恒的谜之蛋
 */
package net.sf.cherry.net.channel.handler;

import net.sf.cherry.client.LuckyTurntable;
import net.sf.cherry.client.MapleClient;
import net.sf.cherry.client.MapleInventoryType;
import net.sf.cherry.net.AbstractMaplePacketHandler;
import net.sf.cherry.server.MapleItemInformationProvider;
import net.sf.cherry.tools.MaplePacketCreator;
import net.sf.cherry.tools.data.input.SeekableLittleEndianAccessor;

public class MZD extends AbstractMaplePacketHandler {
   @Override
   public void handlePacket(SeekableLittleEndianAccessor slea, MapleClient c)
   {
	  //toDrop.add(4280000); //永恒的谜之蛋
      //toDrop.add(4280001); //重生的谜之蛋
	  //72 00  0F 00  C1 4E 41 00 00  没有“重生的热度5490001”
	  //72 00  0F 00  C1 4E 41 00 01  有“重生的热度5490001”
	  byte slot = slea.readByte();
	  slea.skip(1);
      int itemid = slea.readInt();
      
      MapleInventoryType type = MapleItemInformationProvider.getInstance().getInventoryType(itemid);      
      if (c.getPlayer().getInventory(type).getItem(slot).getItemId() != itemid || 
      	  c.getPlayer().getInventory(type).countById(itemid) < 1) {
          return;
      }
      //TODO:Mak  谜之蛋来爆爆爆
      LuckyTurntable.getInstance().UseAItemToTurntable(c, itemid);
      c.getSession().write(MaplePacketCreator.enableActions());
   }
}
