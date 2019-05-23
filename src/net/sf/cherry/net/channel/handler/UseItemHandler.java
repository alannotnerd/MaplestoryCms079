 package net.sf.cherry.net.channel.handler;
 
 import net.sf.cherry.client.IItem;
import net.sf.cherry.client.MapleClient;
import net.sf.cherry.client.MapleInventoryType;
import net.sf.cherry.net.AbstractMaplePacketHandler;
import net.sf.cherry.scripting.npc.NPCScriptManager;
import net.sf.cherry.server.MapleInventoryManipulator;
import net.sf.cherry.server.MapleItemInformationProvider;
import net.sf.cherry.tools.MaplePacketCreator;
import net.sf.cherry.tools.data.input.SeekableLittleEndianAccessor;
 
 public class UseItemHandler extends AbstractMaplePacketHandler
 {
   public void handlePacket(SeekableLittleEndianAccessor slea, MapleClient c)
   {
     c.doneedlog(this, c.getPlayer());
     if (!c.getPlayer().isAlive()) {
       c.getSession().write(MaplePacketCreator.enableActions());
       return;
     }
     MapleItemInformationProvider ii = MapleItemInformationProvider.getInstance();
     slea.readInt();
     byte slot = (byte)slea.readShort();
     int itemId = slea.readInt();//物品ID
     IItem toUse = c.getPlayer().getInventory(MapleInventoryType.USE).getItem(slot);
     if ((toUse != null) && (toUse.getQuantity() > 0) && (toUse.getItemId() == itemId)) {//如果使用的道具不为空并且..
       if (c.getPlayer().getCherryBan()) {
         c.getPlayer().getCherryBanMessage();
         c.getSession().write(MaplePacketCreator.enableActions());
         return;
       }
       if ((itemId == 2022178) || (itemId == 2022433) || (itemId == 2050004)) {
         c.getPlayer().dispelDebuffs();
         remove(c, slot);
         return;
       }if (itemId == 2050003) {
         c.getPlayer().dispelDebuffsi();
         remove(c, slot);
         return;
       }if (itemId == 2022618) { //法老的宝石盒
         NPCScriptManager.getInstance().start(c, 1061007); //打开NPC
         remove(c, slot);
         return;
       }
       
       if (isTownScroll(itemId)) {
         if (ii.getItemEffect(toUse.getItemId()).applyTo(c.getPlayer())) {
           remove(c, slot);
         }
         c.getSession().write(MaplePacketCreator.enableActions());
         return;
       }
       remove(c, slot);
       ii.getItemEffect(toUse.getItemId()).applyTo(c.getPlayer());
       c.getPlayer().checkBerserk();
     }
     //log.info("1未知的消息处理 {} ({}) {}\n{}", new Object[] { from, Integer.valueOf(content.length), HexTool.toString(content), HexTool.toStringFromAscii(content) });
   }
 
   private final void remove(MapleClient c, byte slot) {
     MapleInventoryManipulator.removeFromSlot(c, MapleInventoryType.USE, slot, (byte) 1, false);
     c.getSession().write(MaplePacketCreator.enableActions());
   }
 
   private boolean isTownScroll(int itemId) {
     return (itemId >= 2030000) && (itemId < 2030021);
   }
 }

