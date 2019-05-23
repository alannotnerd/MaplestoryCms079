/*
 《该文件是XioxMS服务端的核心文件之一》
 目前版权 (C) 2010年   XioxMS             <100807851@qq.com>
 * -----------------------------------------------------------*
 之前人员 (C) 2008年   Huy              <patrick.huy@frz.cc>
 Matthias Butz       <matze@odinms.de>
 Jan Christian Meyer <vimes@odinms.de>
 * ------------------------------------------------------------*
 ◎该服务端目前维护人员:xioxms
 ◎这个文件是自由形式.你可以任意内容
 ◎这个程序发布的目的是期望它能有用@
 ◎如果你需要技术支持,可以联系更新/维护人员<QQ100807851>
 ◎你应该已经收到一份Affero GNU通用公共授权
 -如果不是,请仔细查看http://www.gnu.org/licenses/*
 */
package net.sf.cherry.net.channel.handler;

import net.sf.cherry.client.MapleCharacter;
import net.sf.cherry.client.MapleClient;
import net.sf.cherry.client.MapleInventory;
import net.sf.cherry.client.MapleInventoryType;
import net.sf.cherry.net.AbstractMaplePacketHandler;
import net.sf.cherry.server.MapleInventoryManipulator;
import net.sf.cherry.tools.MaplePacketCreator;
import net.sf.cherry.tools.data.input.SeekableLittleEndianAccessor;

/**
 *
 * @author Matze
 */
public class ItemMoveHandler extends AbstractMaplePacketHandler {

    /**
     * 精灵吊坠启用的时间
     */
    private long fairy_PendantStartMills;
    /**
     * 精灵吊坠移除的时间
     */
    private long fairy_PendantEndMills=-1;

    public void handlePacket(SeekableLittleEndianAccessor slea, MapleClient c) {

        int actionId = slea.readInt();
        if (actionId <= c.getLastActionId()) {
            c.getSession().write(MaplePacketCreator.enableActions());
            return;
        }
        
        MapleCharacter player = c.getPlayer();
        player.setCurrenttime(System.currentTimeMillis());
        if (player.getCurrenttime() - player.getLasttime() < player.get防止复制时间()) {
	        c.getSession().write(MaplePacketCreator.enableActions());
	        return;
        }
        player.setLasttime(System.currentTimeMillis());
        
        c.setLastActionId(actionId);
        MapleInventoryType type = MapleInventoryType.getByType(slea.readByte());
        MapleInventory inventory = c.getPlayer().getInventory(type);
        byte src = (byte) slea.readShort();
        byte dst = (byte) slea.readShort();
        short quantity = slea.readShort();
        //////System.out.println("src=" + src + "   dst=" + dst + "   quantity=" + quantity);

        //玩家移除项链
        if (src == -17) {
            long end = System.currentTimeMillis();
            long endInterval = System.currentTimeMillis();
            c.getSession().write(MaplePacketCreator.enableActions());
            setFairy_PendantEndMills(System.currentTimeMillis());
                
            
        }
        //玩家从背包中装备某物品
        if (src > 0 && dst < 0) {
              if (inventory.getItem(src).getItemId() == 1802033) { //判断物品代码
                String prefix = "";
                prefix = "装备蝙蝠魔套装."; //提示语句
                c.getPlayer().dropMessage(5, prefix);                            //引用消息

            }
            MapleInventoryManipulator.unequip(c, src, dst);}//试试看一些装备
        if (src < 0 && dst > 0) {
            MapleInventoryManipulator.unequip(c, src, dst);
        } else if (dst < 0) {
            //log.error("你当前使用的道具是:"+src+"模式为:"+dst+"还不知道11111"+c);
            if (inventory.getItem(src).getItemId() == 1122017) { //判断物品代码
                long 开始计时 = System.currentTimeMillis();// 搜索当前时间对应的毫秒数
                setFairy_PendantStartMills(System.currentTimeMillis());
                String prefix = "由于装备了[精灵吊坠]击退怪物可以获得 经验加成.最高5小时可加成50%."; //提示语句
                c.getPlayer().dropMessage(5, prefix);                      //引用消息
            }
            if (inventory.getItem(src).getItemId() == 1122018) { //判断物品代码
                String prefix = "";
                prefix = "你装备了[温暖的围脖]击退怪物可以获得双倍经验!"; //提示语句
                c.getPlayer().dropMessage(5, prefix);                            //引用消息

            }
                      
            MapleInventoryManipulator.equip(c, src, dst); //装备上去
        } else if (c.getPlayer().getInventory(type).getItem(src) == null) { //装备窗口扔出去
           MapleInventoryManipulator.drop(c, type, src, quantity);
            return;
        } else if (dst == 0) {
            if (quantity < 0) {
                c.getPlayer().dropMessage(1, "要么你的约会，或者你是一个黑客。所以GT * O在这里。（如果你约会的时候，我问你滚。无论哪种方式，你是一个黑客。)");
                try {
                    c.getChannelServer().getWorldInterface().broadcastGMMessage(c.getPlayer().getName(), MaplePacketCreator.serverNotice(0, "Duper alert: " + c.getPlayer().getName() + " is dropping negative amount of items.").getBytes());
                } catch (Throwable u) {
                }
                return;
            }
            if (c.getPlayer().getInventory(type).getItem(src) == null) {
                c.getSession().write(MaplePacketCreator.enableActions());
                return;
            }
            //////System.out.println("2");
            MapleInventoryManipulator.drop(c, type, src, quantity);
        } else {
            //////System.out.println("3");
            MapleInventoryManipulator.move(c, type, src, dst);
        }
    }
//    public void handlePacket(SeekableLittleEndianAccessor slea, MapleClient c) {
//        int actionId = slea.readInt();
//        if (actionId <= c.getLastActionId()) {
//            c.getSession().write(MaplePacketCreator.enableActions());
//            return;
//        }
//        c.setLastActionId(actionId);
//        MapleInventoryType type = MapleInventoryType.getByType(slea.readByte());
//        MapleInventory inventory = c.getPlayer().getInventory(type);
//        byte src = (byte) slea.readShort();
//        byte dst = (byte) slea.readShort();
//        short quantity = slea.readShort();
//        //////System.out.println("src=" + src + "   dst=" + dst + "   quantity=" + quantity);
//        if (src < 0 && dst > 0) {
//            MapleInventoryManipulator.unequip(c, src, dst);
//        } else if (dst < 0) {
//            //log.error("你当前使用的道具是:"+src+"模式为:"+dst+"还不知道11111"+c);
//            if (inventory.getItem(src).getItemId() == 1122017) { //判断物品代码
//                String prefix = "";
//                prefix = "由于装备了[精灵吊坠]击退怪物可以获得双倍经验"; //提示语句
//                c.getPlayer().dropMessage(5, prefix);                      //引用消息
//            }
//            if (inventory.getItem(src).getItemId() == 1122018) { //判断物品代码
//                String prefix = "";
//                prefix = "你装备了[温暖的围脖]击退怪物可以获得双倍经验!"; //提示语句
//                c.getPlayer().dropMessage(5, prefix);                            //引用消息
//
//            }
//            MapleInventoryManipulator.equip(c, src, dst);
//        } else if (inventory.getItem(src).getItemId() == 5110000) {
//            c.getSession().write(MaplePacketCreator.enableActions());
//            return;
//        } else if (dst == 0) {
//            if (quantity < 0) {
//                c.getPlayer().dropMessage(1, "Either you're Tryst, or you're a hacker. So GT*O here.\r\n(P.S. If you're Tryst, I ask you to **** OFF. Either way, you're a hacker.)");
//                try {
//                    c.getChannelServer().getWorldInterface().broadcastGMMessage(c.getPlayer().getName(), MaplePacketCreator.serverNotice(0, "Duper alert: " + c.getPlayer().getName() + " is dropping negative amount of items.").getBytes());
//                } catch (Throwable u) {
//                }
//                return;
//            }
//            if (c.getPlayer().getInventory(type).getItem(src) == null) {
//                c.getSession().write(MaplePacketCreator.enableActions());
//                return;
//            }
//            MapleInventoryManipulator.drop(c, type, src, quantity);
//        } else {
//            MapleInventoryManipulator.move(c, type, src, dst);
//        }
//    }

    /**
     * @return the fairy_PendantStartMills
     */
    public long getFairy_PendantStartMills() {
        return fairy_PendantStartMills;
    }

    /**
     * @param fairy_PendantStartMills the fairy_PendantStartMills to set
     */
    public void setFairy_PendantStartMills(long fairy_PendantStartMills) {
        this.fairy_PendantStartMills = fairy_PendantStartMills;
    }

    /**
     * @return the fairy_PendantEndMills
     */
    public long getFairy_PendantEndMills() {
        return fairy_PendantEndMills;
    }

    /**
     * @param fairy_PendantEndMills the fairy_PendantEndMills to set
     */
    public void setFairy_PendantEndMills(long fairy_PendantEndMills) {
        this.fairy_PendantEndMills = fairy_PendantEndMills;
    }
}