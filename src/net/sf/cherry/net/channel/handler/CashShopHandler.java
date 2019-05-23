
package net.sf.cherry.net.channel.handler;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.SQLException;
import java.sql.Timestamp;

import net.sf.cherry.client.IItem;
import net.sf.cherry.client.MapleCSInventoryItem;
import net.sf.cherry.client.MapleCharacter;
import net.sf.cherry.client.MapleClient;
import net.sf.cherry.client.MapleInventory;
import net.sf.cherry.client.MapleInventoryType;
import net.sf.cherry.client.MaplePet;
import net.sf.cherry.client.MapleRing;
import net.sf.cherry.database.DatabaseConnection;
import net.sf.cherry.net.AbstractMaplePacketHandler;
import net.sf.cherry.net.Constants.GameConstants;
import net.sf.cherry.net.Constants.set;
import net.sf.cherry.server.AutobanManager;
import net.sf.cherry.server.CashItemFactory;
import net.sf.cherry.server.CashItemInfo;
import net.sf.cherry.server.MapleInventoryManipulator;
import net.sf.cherry.server.MapleItemInformationProvider;
import net.sf.cherry.tools.MaplePacketCreator;
import net.sf.cherry.tools.data.input.SeekableLittleEndianAccessor;

/**
 *
 * @author Acrylic (Terry Han)
 */
public class CashShopHandler extends AbstractMaplePacketHandler {

    private static org.slf4j.Logger log = org.slf4j.LoggerFactory.getLogger(CashShopHandler.class);

    @Override
    public void handlePacket(SeekableLittleEndianAccessor slea, MapleClient c) {
        set item_id = new set();
        String itembp_id[] = item_id.getItempb_id();
        int action = slea.readByte();
        int accountId = c.getAccID();
        if (action == 3) { //购买物品
            int useNX = slea.readByte();
            int snCS = slea.readInt();
            CashItemInfo item = CashItemFactory.getItem(snCS);
            for (int i = 0; i < itembp_id.length; i++) {
                if (item.getItemId() == Integer.parseInt(itembp_id[i])) {
                    c.getSession().write(MaplePacketCreator.enableActions());
                    c.getPlayer().dropMessage(1, "这个物品是禁止购买的.");
                    return;
                }
            }
            if (item.getPrice() < 100 && item.getItemId() != 5000033) {//检测物品的价格为0就返回不处理，你可以自定义添加其它的了。
                c.getPlayer().getClient().getSession().write(MaplePacketCreator.serverNotice(1, "禁止购买非法物品"));
                c.getSession().write(MaplePacketCreator.enableActions());
                return;
            } else if (GameConstants.is屏蔽商场物品(item.getItemId())) {//检测物品的价格为0就返回不处理，你可以自定义添加其它的了。
                c.getPlayer().getClient().getSession().write(MaplePacketCreator.serverNotice(1, "没修复商品.禁止购买！"));
                c.getSession().write(MaplePacketCreator.enableActions());
                return;
            } else if (GameConstants.is屏蔽未开放商城宠物(item.getItemId())) {//检测物品的价格为0就返回不处理，你可以自定义添加其它的了。
                c.getPlayer().getClient().getSession().write(MaplePacketCreator.serverNotice(1, "未开放宠物.禁止购买！"));
                c.getSession().write(MaplePacketCreator.enableActions());
                return;
                /*
                 * }else if (item.getItemId() >= 1802000 && item.getItemId() <=
                 * 1802063) {//检测物品的价格为0就返回不处理，你可以自定义添加其它的了。
                 * c.getPlayer().getClient().getSession().write(MaplePacketCreator.serverNotice(1,
                 * "没修复宠物装备.禁止购买！"));
                 * c.getSession().write(MaplePacketCreator.enableActions());
                return;
                 */
            } else if (item.getItemId() == 5000016 && item.getPrice() <= 80000) {//检测物品的价格为0就返回不处理，你可以自定义添加其它的了。
                c.getPlayer().getClient().getSession().write(MaplePacketCreator.serverNotice(1, "未开放宠物.禁止购买！"));
                c.getSession().write(MaplePacketCreator.enableActions());
                return;
            } else if (item.getItemId() == 5200000 && item.getItemId() == 5200001 || item.getItemId() == 5200002) {
                c.getPlayer().getClient().getSession().write(MaplePacketCreator.serverNotice(1, "试图购买修复中的道具,购买无效化"));  //系统返回不处理语句自动提示该对话框。内容可修改
                c.getSession().write(MaplePacketCreator.enableActions());
                return;
            }
            if (c.getPlayer().getCSPoints(useNX) >= item.getPrice()) {
                c.getPlayer().modifyCSPoints(useNX, -item.getPrice());
            } else {
                c.getSession().write(MaplePacketCreator.enableActions());
                AutobanManager.getInstance().autoban(c, "试图购买现金物品，但是没有足够的点券。");
                return;
            }
            //经验卡已经被屏敞掉了。小黑板功能已经修复了
            if (item.getItemId() >= 5000000 && item.getItemId() <= 5000100) {
                int petId = MaplePet.createPet(item.getItemId(), c.getPlayer());
                if (petId == -1) {
                    return;
                }
                MapleCSInventoryItem citem = new MapleCSInventoryItem(petId, item.getItemId(), snCS, (short) item.getCount(), false);
                long period = 90;
                Timestamp ExpirationDate = new Timestamp(System.currentTimeMillis() + (period * 24 * 60 * 60 * 1000));
                citem.setExpire(ExpirationDate);
                c.getPlayer().getCSInventory().addItem(citem);
                c.getSession().write(MaplePacketCreator.enableCSorMTS());
                c.getSession().write(MaplePacketCreator.showBoughtCSItem(c, citem));
            } else {
                MapleCSInventoryItem citem = new MapleCSInventoryItem(MapleCharacter.getNextUniqueId(), item.getItemId(), snCS, (short) item.getCount(), false);
                long period = item.getPeriod();
                Timestamp ExpirationDate = new Timestamp(System.currentTimeMillis());
                ExpirationDate = new Timestamp(((System.currentTimeMillis() / 1000) + (period * 24 * 60 * 60)) * 1000);
                if (period == 0) {
                    ExpirationDate = null;
                }
                if (item.getItemId() == 5211047 || item.getItemId() == 5360014) {
                    ExpirationDate = new Timestamp(((System.currentTimeMillis() / 1000) + (3 * 60 * 60)) * 1000);
                }

                citem.setExpire(ExpirationDate);
                c.getPlayer().getCSInventory().addItem(citem);//获取现金项目
                //c.getPlayer().getCSInventory().removeItem(5531000,1); //神秘箱子
                //c.getPlayer().getClient().getSession().write(MaplePacketCreator.serverNotice(1, "单独消费满2000点卷。系统赠送随机箱子！"));
                c.getSession().write(MaplePacketCreator.showBoughtCSItem(c, citem)); //显示了CS项目
            }
            if(useNX == 0){//判断是否是点卷
            c.getPlayer().gainxflh(item.getPrice());//记录点卷购买消费点卷数量
            }
            if(c.getPlayer().getxflh() >= 2000){//判断消费点卷数量
               // MapleInventoryManipulator.addById(c, 5531000, (short) 1, "系统自动赠送一个神秘箱子");
              //  MapleInventory etcInventory = c.getPlayer().getInventory(MapleInventoryType.CASH);
               // byte slot = etcInventory.findById(5531000).getPosition();
               // c.getSession().write(MaplePacketCreator.showBoughtCSQuestItem(slot, 5531000));
                //c.getPlayer().setxflh(-2000);//扣除消费点卷数量 
              //  c.getPlayer().setxflh(0);//直接设置消费礼盒的金额
               // c.getPlayer().getClient().getSession().write(MaplePacketCreator.serverNotice(1, "消费2000以上点卷！\r\n系统自动赠送一个神秘箱子！\r\n系统自动帮你放入背包！\r\n退出商城请打开背包查收！"));
            }
            c.getPlayer().saveToDB(true);
            c.getSession().write(MaplePacketCreator.showNXMapleTokens(c.getPlayer())); //显示点卷
            c.getSession().write(MaplePacketCreator.enableActions()); //能行动
        } else if (action == 4) { //赠送礼物     赠送礼物的封包已经抓完了。可以正常使用
            int snCS = slea.readInt();
            int type = slea.readByte();
            String recipient = slea.readMapleAsciiString();
            String message = slea.readMapleAsciiString();
            CashItemInfo item = CashItemFactory.getItem(snCS);
            for (int i = 0; i < itembp_id.length; i++) {
                if (item.getItemId() == Integer.parseInt(itembp_id[i]) && item.getItemId() == 5201000 && item.getItemId() == 5201001 && item.getItemId() == 5201002 && item.getItemId() == 5201003 && item.getItemId() == 5201004 && item.getItemId() == 5201005 && item.getItemId() == 5570000 && item.getItemId() >= 5390000 && item.getItemId() <= 5390030 &&item.getItemId() == 5520000) {
                    c.getSession().write(MaplePacketCreator.enableActions());
                    c.getPlayer().dropMessage(1, "这个物品是禁止赠送的.");
                    return;
                }
            }
            if (c.getPlayer().getCSPoints(type) >= item.getPrice()) {
                if (MapleCharacter.getAccountIdByName(recipient) != -1) {
                    if (MapleCharacter.getAccountIdByName(recipient) == c.getPlayer().getAccountID()) {
                        c.getSession().write(MaplePacketCreator.showCannotToMe());
                    } else {
                        c.getPlayer().modifyCSPoints(type, -item.getPrice());
                        MapleCSInventoryItem gift = new MapleCSInventoryItem(0, item.getItemId(), snCS, (short) item.getCount(), true);
                        gift.setSender(c.getPlayer().getName());
                        gift.setMessage(message);
                        gift.setExpire(new Timestamp(((System.currentTimeMillis() / 1000) + (item.getPeriod() * 24 * 60 * 60)) * 1000));
                        try {
                            Connection con = DatabaseConnection.getConnection();
                            PreparedStatement ps = con.prepareStatement("INSERT INTO csgifts (accountid, itemid, sn, quantity, sender, message, expiredate) VALUES (?, ?, ?, ?, ?, ?, ?)");
                            ps.setInt(1, MapleCharacter.getAccountIdByName(recipient));
                            ps.setInt(2, item.getItemId());
                            ps.setInt(3, snCS);
                            ps.setInt(4, item.getCount());
                            ps.setString(5, c.getPlayer().getName());
                            ps.setString(6, message);
                            Timestamp ExpirationDate = new Timestamp(System.currentTimeMillis());
                            if ((item.getItemId() >= 5000000 && item.getItemId() <= 5000100) || item.getItemId() == 1112906 || item.getItemId() == 1112905) {
                                ExpirationDate = new Timestamp(((System.currentTimeMillis() / 1000) + (90 * 24 * 60 * 60)) * 1000);
                            } else if (item.getItemId() == 5211047 || item.getItemId() == 5360014) {
                                ExpirationDate = new Timestamp(((System.currentTimeMillis() / 1000) + (3 * 60 * 60)) * 1000);
                            } else if (item.getPeriod() != 0) {
                                ExpirationDate = new Timestamp(((System.currentTimeMillis() / 1000) + (item.getPeriod() * 24 * 60 * 60)) * 1000);
                            } else {
                                ExpirationDate = null;
                            }
                            ps.setTimestamp(7, ExpirationDate);
                            ps.executeUpdate();
                            ps.close();
                        } catch (SQLException se) {
                            log.error("Error saving gift to database", se);
                        }
                        c.getSession().write(MaplePacketCreator.getGiftFinish(c.getPlayer().getName(), item.getItemId(), (short) item.getCount()));
                    }
                } else {
                    c.getSession().write(MaplePacketCreator.showCheckName());
                }
            } else {
                c.getSession().write(MaplePacketCreator.enableActions());
                AutobanManager.getInstance().autoban(c, "试图购买现金物品，但是没有足够的点券。");  //如果显示延迟错误可以提示该语句
                return;
            }
            c.getPlayer().saveToDB(true);
            c.getSession().write(MaplePacketCreator.enableCSorMTS());
            c.getSession().write(MaplePacketCreator.showNXMapleTokens(c.getPlayer()));
            c.getSession().write(MaplePacketCreator.enableActions());
        } else if (action == 5) {
            try {
                Connection con = DatabaseConnection.getConnection();
                PreparedStatement ps = con.prepareStatement("DELETE FROM wishlist WHERE charid = ?");
                ps.setInt(1, c.getPlayer().getId());
                ps.executeUpdate();
                ps.close();

                int i = 10;
                while (i > 0) {
                    int sn = slea.readInt();
                    if (sn != 0) {
                        ps = con.prepareStatement("INSERT INTO wishlist(charid, sn) VALUES(?, ?) ");
                        ps.setInt(1, c.getPlayer().getId());
                        ps.setInt(2, sn);
                        ps.executeUpdate();
                        ps.close();
                    }
                    i--;
                }
            } catch (SQLException se) {
                log.error("错误的SQL执行", se);
            }
            c.getSession().write(MaplePacketCreator.updateWishList(c.getPlayer().getId()));
            //以下代码为扩充代码语句。但是079的扩充貌似还有地方没有弄好。导致无法扩充
        } else if (action == 6) { //扩充仓库
            int useNX = slea.readByte();
            byte add = slea.readByte();
            if (add == 0) {
                byte type = slea.readByte();
                MapleInventoryType invtype = MapleInventoryType.getByType(type);
                byte slots = c.getPlayer().getInventory(invtype).getSlots();
                if (c.getPlayer().getCSPoints(useNX) < 600) {
                    c.getSession().write(MaplePacketCreator.enableCSorMTS());
                    c.getSession().write(MaplePacketCreator.showNXMapleTokens(c.getPlayer()));
                    c.getSession().write(MaplePacketCreator.enableActions());
                    return;
                }
                if (slots <= 92) {
                    c.getPlayer().modifyCSPoints(useNX, -600);
                    c.getPlayer().getInventory(invtype).setSlotLimit((byte) (slots + 4));
                    c.getSession().write(MaplePacketCreator.serverNotice(1, "扩充成功."));
                } else {
                    c.getSession().write(MaplePacketCreator.serverNotice(1, "您无法继续进行扩充."));
                }
            } else if (add == 1) {
                int sn = slea.readInt();
                byte type = 1;
                switch (sn) {
                    case 50200018:
                        type = 1;
                        break;
                    case 50200019:
                        type = 2;
                        break;
                    case 50200020:
                        type = 3;
                        break;
                    case 50200021:
                        type = 4;
                        break;
                    case 50200043:
                        type = 5;
                        break;
                }
                MapleInventoryType invtype = MapleInventoryType.getByType(type);
                byte slots = c.getPlayer().getInventory(invtype).getSlots();
                if (c.getPlayer().getCSPoints(useNX) < 1100) {
                    c.getSession().write(MaplePacketCreator.enableCSorMTS());
                    c.getSession().write(MaplePacketCreator.showNXMapleTokens(c.getPlayer()));
                    c.getSession().write(MaplePacketCreator.enableActions());
                    return;
                }
                if (slots <= 86) {
                    c.getPlayer().modifyCSPoints(useNX, -1100);
                    c.getPlayer().getInventory(invtype).setSlotLimit((byte) (slots + 8));
                    c.getSession().write(MaplePacketCreator.serverNotice(1, "扩充成功."));
                } else {
                    c.getSession().write(MaplePacketCreator.serverNotice(1, "您无法继续进行扩充."));
                }
            }
            c.getPlayer().saveToDB(true);
            c.getSession().write(MaplePacketCreator.enableCSorMTS());
            c.getSession().write(MaplePacketCreator.showNXMapleTokens(c.getPlayer()));
            c.getSession().write(MaplePacketCreator.enableActions());
            /*
             * } else if (action == 8) { useNX = slea.readByte() + 1; cItem =
             * CashItemFactory.getItem(slea.readInt()); int slots =
             * c.getCharacterSlots(); if ((cItem == null) ||
             * (c.getPlayer().getCSPoints(useNX) <= cItem.getPrice()) || (slots
             * > 30) || (cItem.getItemId() != 5430000)) {
             * c.getSession().write(MaplePacketCreator.serverNotice(1,
             * "角色栏扩充失败，点卷余额不足或者栏位已超过上限。"));
             * c.getSession().write(MaplePacketCreator.showNXMapleTokens(c.getPlayer()));
             * return; } if (c.gainCharacterSlot()) {
             * c.getPlayer().modifyCSPoints(useNX, -cItem.getPrice());
             * c.getSession().write(MaplePacketCreator.serverNotice(1, new
             * StringBuilder().append("角色栏扩充成功，当前栏位: ").append(slots +
             * 1).toString())); } else {
             * c.getSession().write(MaplePacketCreator.serverNotice(1,
             * "角色栏扩充失败。")); }
             * c.getSession().write(MaplePacketCreator.showNXMapleTokens(c.getPlayer()));
             * ////System.out.println();
             */
        } else if (action == 0x0D) { //商城=>包裹
            int uniqueid = slea.readInt(); //csid.. not like we need it anyways
            slea.readInt();//0
            slea.readByte();//0
            byte type = slea.readByte();
            byte unknown = slea.readByte();
            IItem item = c.getPlayer().getCSInventory().getItem(uniqueid).toItem();
            if (item != null) {
                byte slot = c.getPlayer().getInventory(MapleItemInformationProvider.getInstance().getInventoryType(item.getItemId())).getNextFreeSlot();
                if (slot == -1) {
                    c.getSession().write(MaplePacketCreator.serverNotice(1, "您的包裹已满."));
                } else {
                    c.getPlayer().getInventory(MapleItemInformationProvider.getInstance().getInventoryType(item.getItemId())).addItem(item);
                    c.getPlayer().getCSInventory().removeItem(uniqueid);
                    c.getSession().write(MaplePacketCreator.transferFromCSToInv(item, slot));
                }
            } else {
            }
            c.getPlayer().saveToDB(true);
            c.getSession().write(MaplePacketCreator.enableCSorMTS());
            c.getSession().write(MaplePacketCreator.showNXMapleTokens(c.getPlayer()));
            c.getSession().write(MaplePacketCreator.enableActions());
        } else if (action == 0x0E) { //包裹=>商城
            int uniqueid = slea.readInt();
            slea.readInt();//0
            slea.readByte(); //1?

            IItem item = null;
            for (MapleInventory inventory : c.getPlayer().getAllInventories()) {
                item = inventory.findByUniqueId(uniqueid);
                if (item != null) {

                    MapleCSInventoryItem citem = new MapleCSInventoryItem(item.getUniqueId(), item.getItemId(), CashItemFactory.getSnFromId(item.getItemId()), item.getQuantity(), false);
                    citem.setExpire(item.getExpiration());
                    c.getPlayer().getCSInventory().addItem(citem);

                    inventory.removeItem(item.getPosition(), item.getQuantity(), false);
                    c.getSession().write(MaplePacketCreator.transferFromInvToCS(c.getPlayer(), citem));
                    break;
                }
            }
            c.getPlayer().saveToDB(true);
            c.getSession().write(MaplePacketCreator.enableCSorMTS());
            c.getSession().write(MaplePacketCreator.showNXMapleTokens(c.getPlayer()));
            c.getSession().write(MaplePacketCreator.enableActions());
        } else if (action == 0x21) { //购买任务物品
            int snCS = slea.readInt();
            CashItemInfo item = CashItemFactory.getItem(snCS);
            if (c.getPlayer().getCSPoints(0) >= 999000000 && snCS != 80000258 && snCS != 80000259) {
                c.getPlayer().modifyCSPoints(0, -999000000);
                MapleInventoryManipulator.addById(c, item.getItemId(), (short) item.getCount(), "购买了任务物品");
                MapleInventory etcInventory = c.getPlayer().getInventory(MapleInventoryType.ETC);
                byte slot = etcInventory.findById(item.getItemId()).getPosition();
                c.getSession().write(MaplePacketCreator.showBoughtCSQuestItem(slot, item.getItemId()));
            } else if (snCS == 80000258 || snCS == 80000259) {
                c.getPlayer().modifyCSPoints(0, -0);
                MapleInventoryManipulator.addById(c, item.getItemId(), (short) item.getCount(), "购买了任务物品");
                MapleInventory etcInventory = c.getPlayer().getInventory(MapleInventoryType.ETC);
                byte slot = etcInventory.findById(item.getItemId()).getPosition();
                c.getSession().write(MaplePacketCreator.showBoughtCSQuestItem(slot, item.getItemId()));
                c.getPlayer().getClient().getSession().write(MaplePacketCreator.serverNotice(1, "任务物品购买成功！\r\n系统自动帮你放入背包！\r\n退出商城请打开背包查收！"));
            } else {
                c.getSession().write(MaplePacketCreator.enableActions());
                c.getPlayer().getClient().getSession().write(MaplePacketCreator.serverNotice(1, "您购买的物品非法\r\n请勿使用非法的WZ文件."));
                c.getSession().write(MaplePacketCreator.enableActions());
                return;
            }
            c.getSession().write(MaplePacketCreator.showNXMapleTokens(c.getPlayer()));
            c.getSession().write(MaplePacketCreator.enableCSorMTS());
            c.getSession().write(MaplePacketCreator.enableActions());
            return;
        } else if (action == 0x1F) { //购买礼包
            int type = slea.readByte();
            int snCS = slea.readInt();
            CashItemInfo cashPackage = CashItemFactory.getItem(snCS);
            if (c.getPlayer().getCSPoints(type) >= cashPackage.getPrice()) {
                c.getPlayer().modifyCSPoints(type, -cashPackage.getPrice());
            } else {
                c.getSession().write(MaplePacketCreator.enableActions());
                return;
            }
            for (CashItemInfo item : CashItemFactory.getPackageItems(cashPackage.getItemId())) {
                if ((item.getItemId() >= 5000000) && (item.getItemId() <= 5000100)) {
                    int itemid = item.getItemId();
                    if (itemid == 5000028) {
                        itemid = 5000029;
                    }
                    if (itemid == 5000047) {
                        itemid = 5000048;
                    }
                    int petId = MaplePet.createPet(itemid, c.getPlayer());
                    if (petId == -1) {
                        return;
                    }
                    MapleCSInventoryItem citem = new MapleCSInventoryItem(petId, item.getItemId(), snCS, (short) item.getCount(), false);
                    long period = 90;
                    Timestamp ExpirationDate = new Timestamp(System.currentTimeMillis() + (period * 24 * 60 * 60 * 1000));
                    citem.setExpire(ExpirationDate);
                    c.getPlayer().getCSInventory().addItem(citem);
                    c.getSession().write(MaplePacketCreator.showBoughtCSItem(c, citem));
                } else {
                    MapleCSInventoryItem citem = new MapleCSInventoryItem(MapleCharacter.getNextUniqueId(), item.getItemId(), snCS, (short) item.getCount(), false);
                    long period = item.getPeriod();
                    Timestamp ExpirationDate = new Timestamp(System.currentTimeMillis());
                    ExpirationDate = new Timestamp(((System.currentTimeMillis() / 1000) + (period * 24 * 60 * 60)) * 1000);
                    if (period == 0) {
                        ExpirationDate = null;
                    }
                    if (item.getItemId() == 5211047 || item.getItemId() == 5360014) {
                        ExpirationDate = new Timestamp(((System.currentTimeMillis() / 1000) + (3 * 60 * 60)) * 1000);
                    }
                    if (item.getItemId() == 1112906 && item.getItemId() == 1112905) {
                        ExpirationDate = new Timestamp(((System.currentTimeMillis() / 1000) + (period * 24 * 60 * 60)) * 1000);
                    }
                    citem.setExpire(ExpirationDate);
                    c.getPlayer().getCSInventory().addItem(citem);
                    c.getSession().write(MaplePacketCreator.showBoughtCSItem(c, citem));
                }
                c.getPlayer().getCSInventory().saveToDB();
            }
            c.getPlayer().saveToDB(true);
            c.getSession().write(MaplePacketCreator.enableCSorMTS());
            c.getSession().write(MaplePacketCreator.showNXMapleTokens(c.getPlayer()));
            c.getSession().write(MaplePacketCreator.enableActions());
        } else if (action == 0x1D) { //购买结婚戒指相关
            int snCS = slea.readInt();
            String recipient = slea.readMapleAsciiString();
            String message = slea.readMapleAsciiString();
            CashItemInfo item = CashItemFactory.getItem(snCS);
            for (int i = 0; i < itembp_id.length; i++) {
                if (item.getItemId() == Integer.parseInt(itembp_id[i])) {
                    c.getSession().write(MaplePacketCreator.enableActions());
                    c.getPlayer().dropMessage(1, "这个物品是禁止购买的.");
                    return;
                }
            }
            if (c.getPlayer().getCSPoints(0) >= item.getPrice()) {
                if (MapleCharacter.getAccountIdByName(recipient) != -1) {
                    c.getPlayer().modifyCSPoints(0, -item.getPrice());
                    MapleCSInventoryItem gift = new MapleCSInventoryItem(0, item.getItemId(), snCS, (short) item.getCount(), true);
                    MapleCSInventoryItem citem = new MapleCSInventoryItem(MapleCharacter.getNextUniqueId(), item.getItemId(), snCS, (short) item.getCount(), false);
                    gift.setSender(c.getPlayer().getName());
                    gift.setMessage(message);
                    gift.setExpire(new Timestamp(((System.currentTimeMillis() / 1000) + (item.getPeriod() * 24 * 60 * 60)) * 1000));
                    try {
                        Connection con = DatabaseConnection.getConnection();
                        PreparedStatement ps = con.prepareStatement("INSERT INTO csgifts (accountid, itemid, sn, quantity, sender, message, expiredate) VALUES (?, ?, ?, ?, ?, ?, ?)");
                        ps.setInt(1, MapleCharacter.getAccountIdByName(recipient));
                        ps.setInt(2, item.getItemId());
                        ps.setInt(3, snCS);
                        ps.setInt(4, item.getCount());
                        ps.setString(5, c.getPlayer().getName());
                        ps.setString(6, message);
                        ps.setTimestamp(7, null);
                        ps.executeUpdate();
                        ps.close();
                    } catch (SQLException se) {
                        log.error("Error saving gift to database", se);
                    }
                    c.getPlayer().getCSInventory().addItem(citem);
                    c.getSession().write(MaplePacketCreator.showBoughtCSItem(c, citem));
                    MapleRing.createRing(MapleCharacter.getNextUniqueId(), MapleCharacter.getNextUniqueId() + 1, c.getPlayer().getId(), MapleCharacter.getIdByName(recipient), c.getPlayer().getName(), recipient);
                    c.getSession().write(MaplePacketCreator.serverNotice(1, "购买成功。\r\n每次进商城只能购买一次\r\n友谊/恋人戒子\r\n否则会卡号！."));
                } else {
                    c.getSession().write(MaplePacketCreator.serverNotice(1, "未登陆的角色"));
                }
            } else {
                c.getSession().write(MaplePacketCreator.enableActions());
                return;
            }
            c.getPlayer().getCSInventory().saveToDB();
            c.getSession().write(MaplePacketCreator.enableCSorMTS());
            c.getSession().write(MaplePacketCreator.showNXMapleTokens(c.getPlayer()));
            c.getSession().write(MaplePacketCreator.enableActions());
        } else if (action == 0x24) { //购买挚友戒指相关
            int snCS = slea.readInt();
            String recipient = slea.readMapleAsciiString();
            String message = slea.readMapleAsciiString();
            CashItemInfo item = CashItemFactory.getItem(snCS);
            for (int i = 0; i < itembp_id.length; i++) {
                if (item.getItemId() == Integer.parseInt(itembp_id[i])) {
                    c.getSession().write(MaplePacketCreator.enableActions());
                    c.getPlayer().dropMessage(1, "这个物品是禁止购买的.");
                    return;
                }
            }
            if (c.getPlayer().getCSPoints(0) >= item.getPrice()) {
                if (MapleCharacter.getAccountIdByName(recipient) != -1) {
                    c.getPlayer().modifyCSPoints(0, -item.getPrice());
                    MapleCSInventoryItem gift = new MapleCSInventoryItem(0, item.getItemId(), snCS, (short) item.getCount(), true);
                    MapleCSInventoryItem citem = new MapleCSInventoryItem(MapleCharacter.getNextUniqueId(), item.getItemId(), snCS, (short) item.getCount(), false);
                    gift.setSender(c.getPlayer().getName());
                    gift.setMessage(message);
                    gift.setExpire(new Timestamp(((System.currentTimeMillis() / 1000) + (item.getPeriod() * 24 * 60 * 60)) * 1000));
                    try {
                        Connection con = DatabaseConnection.getConnection();
                        PreparedStatement ps = con.prepareStatement("INSERT INTO csgifts (accountid, itemid, sn, quantity, sender, message, expiredate) VALUES (?, ?, ?, ?, ?, ?, ?)");
                        ps.setInt(1, MapleCharacter.getAccountIdByName(recipient));
                        ps.setInt(2, item.getItemId());
                        ps.setInt(3, snCS);
                        ps.setInt(4, item.getCount());
                        ps.setString(5, c.getPlayer().getName());
                        ps.setString(6, message);
                        ps.setTimestamp(7, null);
                        ps.executeUpdate();
                        ps.close();
                    } catch (SQLException se) {
                        log.error("Error saving gift to database", se);
                    }
                    c.getPlayer().getCSInventory().addItem(citem);
                    c.getSession().write(MaplePacketCreator.showBoughtCSItem(c, citem));
                    MapleRing.createRing(MapleCharacter.getNextUniqueId(), MapleCharacter.getNextUniqueId() + 1, c.getPlayer().getId(), MapleCharacter.getIdByName(recipient), c.getPlayer().getName(), recipient);
                    c.getSession().write(MaplePacketCreator.serverNotice(1, "购买成功。\r\n每次进商城只能购买一次\r\n友谊/恋人戒子\r\n否则会卡号！."));
                } else {
                    c.getSession().write(MaplePacketCreator.serverNotice(1, "未登陆的角色"));
                }
            } else {
                c.getSession().write(MaplePacketCreator.enableActions());
                return;
            }
            c.getPlayer().getCSInventory().saveToDB();
            c.getSession().write(MaplePacketCreator.enableCSorMTS());
            c.getSession().write(MaplePacketCreator.showNXMapleTokens(c.getPlayer()));
            c.getSession().write(MaplePacketCreator.enableActions());
        } else if (action == 0x2A) {
            int snCS = slea.readInt();
            //CashItemInfo item = CashItemFactory.getItem(snCS);
            if ((snCS == 50200031) && (c.getPlayer().getCSPoints(0) >= 500)) {
                c.getPlayer().modifyCSPoints(0, -500);
                c.getPlayer().modifyCSPoints(1, 500);
                c.getSession().write(MaplePacketCreator.serverNotice(1, "兑换500抵用卷成功"));
            } else if ((snCS == 50200032) && (c.getPlayer().getCSPoints(0) >= 1000)) {
                c.getPlayer().modifyCSPoints(0, -1000);
                c.getPlayer().modifyCSPoints(1, 1000);
                c.getSession().write(MaplePacketCreator.serverNotice(1, "兑换抵1000用卷成功"));
            } else if ((snCS == 50200033) && (c.getPlayer().getCSPoints(0) >= 5000)) {
                c.getPlayer().modifyCSPoints(0, -5000);
                c.getPlayer().modifyCSPoints(1, 5000);
                c.getSession().write(MaplePacketCreator.serverNotice(1, "兑换5000抵用卷成功"));
            } else {
                c.getSession().write(MaplePacketCreator.serverNotice(1, "没有找到这个道具的信息！\r\n或者你点卷不足无法兑换！"));
            }
            c.getPlayer().saveToDB(true);
            c.getSession().write(MaplePacketCreator.enableCSorMTS());
            c.getSession().write(MaplePacketCreator.showNXMapleTokens(c.getPlayer()));
            c.getSession().write(MaplePacketCreator.enableActions());
        }
        c.getPlayer().getCSInventory().saveToDB();
        c.getSession().write(MaplePacketCreator.enableCSorMTS());
        c.getSession().write(MaplePacketCreator.showNXMapleTokens(c.getPlayer()));
        c.getSession().write(MaplePacketCreator.enableActions());
    }
}