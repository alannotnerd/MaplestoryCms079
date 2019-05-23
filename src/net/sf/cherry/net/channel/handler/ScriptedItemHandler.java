 package net.sf.cherry.net.channel.handler;
 
 import net.sf.cherry.client.IItem;
import net.sf.cherry.client.MapleClient;
import net.sf.cherry.net.AbstractMaplePacketHandler;
import net.sf.cherry.scripting.npc.NPCScriptManager;
import net.sf.cherry.server.MapleItemInformationProvider;
import net.sf.cherry.tools.data.input.SeekableLittleEndianAccessor;
 
 public class ScriptedItemHandler extends AbstractMaplePacketHandler
 {
   public void handlePacket(SeekableLittleEndianAccessor slea, MapleClient c)
   {
     c.doneedlog(this, c.getPlayer());
     MapleItemInformationProvider ii = MapleItemInformationProvider.getInstance();
     slea.readInt();
     byte itemSlot = (byte)slea.readShort();
     int itemId = slea.readInt();
     int npcId = ii.getScriptedItemNpc(itemId);
     IItem item = c.getPlayer().getInventory(ii.getInventoryType(itemId)).getItem(itemSlot);
 
     if ((item == null) || (item.getItemId() != itemId) || (item.getQuantity() <= 0) || (npcId == 0)) {
       return;
     }
     NPCScriptManager.getInstance().start(c, npcId);
   }
 }

/* Location:           E:\maoxiandaodanji\dist\cherry.jar
 * Qualified Name:     net.sf.cherry.net.channel.handler.ScriptedItemHandler
 * JD-Core Version:    0.6.0
 */