package net.sf.cherry.net.channel.handler;

import java.util.List;

import net.sf.cherry.client.IEquip;
import net.sf.cherry.client.IItem;
import net.sf.cherry.client.ISkill;
import net.sf.cherry.client.Item;
import net.sf.cherry.client.MapleClient;
import net.sf.cherry.client.MapleInventory;
import net.sf.cherry.client.MapleInventoryType;
import net.sf.cherry.client.SkillFactory;
import net.sf.cherry.net.AbstractMaplePacketHandler;
import net.sf.cherry.net.Constants.GameConstants;
import net.sf.cherry.server.MapleItemInformationProvider;
import net.sf.cherry.tools.MaplePacketCreator;
import net.sf.cherry.tools.data.input.SeekableLittleEndianAccessor;

public class ScrollHandler extends AbstractMaplePacketHandler {

    public void handlePacket(SeekableLittleEndianAccessor slea, MapleClient c) {
        int actionId = slea.readInt();
        if (actionId <= c.getLastActionId()) {
            c.getSession().write(MaplePacketCreator.enableActions());
            return;
        }
        c.setLastActionId(actionId);
        byte slot = (byte) slea.readShort();
        byte dst = (byte) slea.readShort();
        byte ws = (byte) slea.readShort();
        boolean whiteScroll = false;
        boolean legendarySpirit = false;

        if ((ws & 0x2) == 2) {
            whiteScroll = true;
        }
        MapleItemInformationProvider ii = MapleItemInformationProvider.getInstance();
        IEquip toScroll;
      //  Equip 装备;
        if (dst < 0) {
            toScroll = (IEquip) c.getPlayer().getInventory(MapleInventoryType.EQUIPPED).getItem(dst);
           // 装备 = (Equip) (IEquip) c.getPlayer().getInventory(MapleInventoryType.EQUIPPED).getItem(dst);
        } else {
            legendarySpirit = true;
            toScroll = (IEquip) c.getPlayer().getInventory(MapleInventoryType.EQUIP).getItem(dst);
          //  装备 = (Equip) (IEquip) c.getPlayer().getInventory(MapleInventoryType.EQUIP).getItem(dst);
        }
        if (toScroll == null) {
            return;
        }
        short 装备攻击力 = toScroll.getWatk();
        short 装备魔法力 = toScroll.getMatk();
        short 装备力量 = toScroll.getStr();
        short 装备敏捷 = toScroll.getDex();
        short 装备智力 = toScroll.getInt();
        short 装备运气 = toScroll.getLuk();
        byte oldLevel = toScroll.getLevel();
        byte oldSlots = toScroll.getUpgradeSlots();
        MapleInventory useInventory = c.getPlayer().getInventory(MapleInventoryType.USE);
        IItem scroll = useInventory.getItem(slot);
        IItem wscroll = null;

        switch (scroll.getItemId()) {
            case 2049000:
            case 2049001:
            case 2049002:
            case 2049003:
                break;
            default:
                if (toScroll.getUpgradeSlots() >= 1) {
                    break;
                }
                c.getSession().write(MaplePacketCreator.getInventoryFull());
                return;
        }

        List scrollReqs = ii.getScrollReqs(scroll.getItemId());
        if ((scrollReqs.size() > 0) && (!scrollReqs.contains(Integer.valueOf(toScroll.getItemId())))) {
            c.getSession().write(MaplePacketCreator.getInventoryFull());
            return;
        }

        if (whiteScroll) {
            wscroll = useInventory.findById(2340000);
            if ((wscroll == null) || (wscroll.getItemId() != 2340000)) { //不是祝福卷
                whiteScroll = false;
                return;
            }
        }
        if ((!GameConstants.混沌系列(scroll.getItemId())) && (!ii.isCleanSlate(scroll.getItemId())) && (!ii.canScroll(scroll.getItemId(), toScroll.getItemId()))) {
            if (!ii.canScroll(scroll.getItemId(), toScroll.getItemId())) {
                return;
            }
        }


        if (scroll.getQuantity() <= 0) {
          c.getSession().write(MaplePacketCreator.serverNotice(5, "小伙子，数量不足啊！"));
            //  throw new InventoryException("< = 0量时滚动");
        }

        boolean checkIfGM = c.getPlayer().isGM();

        IEquip scrolled = (IEquip) ii.scrollEquipWithId(toScroll, scroll.getItemId(), whiteScroll, checkIfGM);
        IEquip.ScrollResult scrollSuccess = IEquip.ScrollResult.FAIL;
        if (scrolled == null)//滚动
        {
            scrollSuccess = IEquip.ScrollResult.CURSE;//成功   诅咒
        } else if ((scrolled.getLevel() > oldLevel) || ((ii.isCleanSlate(scroll.getItemId())) && (scrolled.getUpgradeSlots() == oldSlots + 1))) {
          //  System.out.println("A-装备力量：" + 装备力量 + "||装备敏捷:" + 装备敏捷 + "||装备智力" + 装备智力 + "||装备运气" + 装备运气 + "");
            scrollSuccess = IEquip.ScrollResult.SUCCESS; //普通卷轴成功
        }
     //    if((scrolled.getUpgradeSlots() == 0)){
       //    scrollSuccess = IEquip.ScrollResult.SUCCESS;
       // }
        useInventory.removeItem(scroll.getPosition(), (byte) 1, false);
        if (whiteScroll) { //是祝福卷
            useInventory.removeItem(wscroll.getPosition(), (byte) 1, false);
            if (wscroll.getQuantity() < 1) //祝福卷数量没有
            {
                c.getSession().write(MaplePacketCreator.clearInventoryItem(MapleInventoryType.USE, wscroll.getPosition(), false));
            } else {//开始消耗 祝福卷
                c.getSession().write(MaplePacketCreator.updateInventorySlot(MapleInventoryType.USE, (Item) wscroll));
            }
        }
        if (scrollSuccess == IEquip.ScrollResult.CURSE) {//诅咒
            c.getSession().write(MaplePacketCreator.scrolledItem(scroll, toScroll, true));

            if (dst < 0) {
                c.getPlayer().getInventory(MapleInventoryType.EQUIPPED).removeItem(toScroll.getPosition()); //装备
            } else {
                c.getPlayer().getInventory(MapleInventoryType.EQUIP).removeItem(toScroll.getPosition());//装备
            }
        } else {
            c.getSession().write(MaplePacketCreator.scrolledItem(scroll, scrolled, false));
        }

        c.getPlayer().getMap().broadcastMessage(MaplePacketCreator.getScrollEffect(c.getPlayer().getId(), scrollSuccess, legendarySpirit));
         /*  short 装备综合 = (short) (装备力量 / 10);
        short 装备综合2 = (short) (装备综合 + 装备力量);
        装备.setStr(装备综合2);*/
       // System.out.println("B-装备力量：" + 装备力量 + "||装备敏捷:" + 装备敏捷 + "||装备智力" + 装备智力 + "||装备运气" + 装备运气 + "");
        ISkill LS = SkillFactory.getSkill(1003);
        int LSLevel = c.getPlayer().getSkillLevel(LS);
        
        if (legendarySpirit && LSLevel <= 0) {
            return;
        }
        /* if (scrollSuccess == IEquip.ScrollResult.SUCCESS) {
         
         /*if (c.getPlayer().getLevel() >= 40)
         c.getPlayer().finishAchievement(12);
         else {
         c.getSession().write(MaplePacketCreator.serverNotice(5, "[系统奖励] 恭喜砸卷成功。但是因为系统限制，你未能得到相应的奖励！"));
         }*/
        //}

        if ((dst < 0) && ((scrollSuccess == IEquip.ScrollResult.SUCCESS) || (scrollSuccess == IEquip.ScrollResult.CURSE))) {
            c.getPlayer().equipChanged();
        }
    }
}
