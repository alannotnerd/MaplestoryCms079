/*
 * 黑龙箱子那些
 */
/*package net.sf.cherry.net;

 import net.sf.cherry.client.IItem;
 import net.sf.cherry.client.MapleClient;
 import net.sf.cherry.client.MapleInventoryType;
 import net.sf.cherry.net.channel.handler.RandomizerNew;
 import net.sf.cherry.scripting.npc.NPCScriptManager;
 import net.sf.cherry.tools.MaplePacketCreator;
 import net.sf.cherry.tools.data.input.SeekableLittleEndianAccessor;*/
/**
 *
 * @author Administrator
 */
/*public class BAOWUHE extends AbstractMaplePacketHandler
 {
    
 public void handlePacket(SeekableLittleEndianAccessor slea, MapleClient c)
 {
 byte slot = (byte)slea.readShort();
 int itemId = slea.readInt();//物品ID
 IItem toUse = c.getPlayer().getInventory(MapleInventoryType.USE).getItem(slot);
 if ((toUse != null) && (toUse.getQuantity() > 0) && (toUse.getItemId() == itemId)) {//如果使用的道具不为空并且..
 if (c.getPlayer().getCherryBan()) {
 c.getPlayer().getCherryBanMessage();
 c.getSession().write(MaplePacketCreator.enableActions());
 return;
 }
 if (itemId == 2022570||itemId <= 2022584) { //企鹅王武器箱子到防具箱子
 NPCScriptManager.getInstance().start(c, 9330005);
 c.getSession().write(MaplePacketCreator.enableActions());
 }if (itemId == 2022615) { //地铁遗失物箱子
 NPCScriptManager.getInstance().start(c, 9330006);
 c.getSession().write(MaplePacketCreator.enableActions());
 }if (itemId == 2022618) { //地铁遗失物箱子
 NPCScriptManager.getInstance().start(c, 9330008);
 c.getSession().write(MaplePacketCreator.enableActions());
 }if (itemId == 2022670) { //黑龙箱子
 NPCScriptManager.getInstance().start(c, 9330009);
 c.getSession().write(MaplePacketCreator.enableActions());
 }
 }
 }
 }*/
/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
package net.sf.cherry.net;

/**
 *
 * @ 黑龙箱子之类的宝箱
 */
import java.util.List;

import net.sf.cherry.client.Item;
import net.sf.cherry.client.MapleClient;
import net.sf.cherry.client.MapleInventoryType;
import net.sf.cherry.client.messages.ServernoticeMapleClientMessageCallback;
import net.sf.cherry.scripting.npc.NPCScriptManager;
import net.sf.cherry.server.CashItemInfo;
import net.sf.cherry.server.MapleInventoryManipulator;
import net.sf.cherry.server.MapleItemInformationProvider;
import net.sf.cherry.server.MapleItemInformationProvider.RewardItem;
import net.sf.cherry.tools.MaplePacketCreator;
import net.sf.cherry.tools.Pair;
import net.sf.cherry.tools.Randomizer;
import net.sf.cherry.tools.data.input.SeekableLittleEndianAccessor;

public class BAOWUHE extends AbstractMaplePacketHandler {

    @Override
    public void handlePacket(SeekableLittleEndianAccessor slea, MapleClient c) {
        byte slot = (byte) slea.readShort();
        int itemId = slea.readInt();
        if (c.getPlayer().getInventory(MapleInventoryType.USE).getItem(slot).getItemId() != itemId || 
        	c.getPlayer().getInventory(MapleInventoryType.USE).countById(itemId) < 1) {
            return;
        }
        MapleItemInformationProvider ii = MapleItemInformationProvider.getInstance();
        Pair<Integer, List<RewardItem>> rewards = ii.getItemReward(itemId);
        for (RewardItem reward : rewards.getRight()) {
            if (!MapleInventoryManipulator.checkSpace(c, reward.itemid, reward.quantity, "")) {
                c.getSession().write(MaplePacketCreator.getShowInventoryFull());
                c.getPlayer().dropMessage("背包空间不足！");
                break;
            }
            
            if (itemId == 2022615) { //地铁遗失物箱子
                 NPCScriptManager.getInstance().start(c, 9330006);
                 c.getSession().write(MaplePacketCreator.enableActions());
            } else if (itemId == 2022618) { //地铁遗失物箱子
                 NPCScriptManager.getInstance().start(c, 9330008);
                 c.getSession().write(MaplePacketCreator.enableActions());
            } else if (itemId == 2022615) { //补偿盒子
                NPCScriptManager.getInstance().start(c, 9330006, 1);
                c.getSession().write(MaplePacketCreator.enableActions());
                break;
            } else if (itemId == 2022613) { //法老王盒子1
                NPCScriptManager.getInstance().start(c,9310057, 1);
                c.getSession().write(MaplePacketCreator.enableActions());
                break;
            } else if (itemId == 2022618) { //法老王盒子2
                NPCScriptManager.getInstance().start(c, 9330008);
                c.getSession().write(MaplePacketCreator.enableActions());
                break;
            } else if ((Randomizer.getInstance().nextInt(rewards.getLeft()) < reward.prob)) {//Is it even possible to get an item with prob 1?USE  //消耗类的黑龙箱子 与 企鹅王的宝物盒的爆率设置
                if (ii.getInventoryType(reward.itemid) == MapleInventoryType.EQUIP) {
                    Item item = (Item) ii.getEquipById(reward.itemid);
                    if (reward.period != -1) {
                        item.setExpiration(System.currentTimeMillis() + (reward.period * 60 * 60 * 10));
                    }
                    if(MapleInventoryManipulator.addFromDrop(c, item, false))
                      c.getPlayer().dropMessage("获得物品！");
                } else {
                    MapleInventoryManipulator.addById(c, reward.itemid, reward.quantity, "");
                }
                MapleInventoryManipulator.removeById(c, MapleInventoryType.USE, itemId, 1, false, false);
                if (reward.worldmsg != null) {
                    String msg = reward.worldmsg;
                    msg.replaceAll("/name", c.getPlayer().getName());
                    msg.replaceAll("/item", ii.getName(reward.itemid));
                    c.getPlayer().getMap().broadcastMessage(MaplePacketCreator.serverNotice(6, msg));
                }
                break;
            }
        }
        c.getSession().write(MaplePacketCreator.enableActions());
    }
}
