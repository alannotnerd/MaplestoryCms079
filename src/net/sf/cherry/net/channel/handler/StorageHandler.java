package net.sf.cherry.net.channel.handler;

import net.sf.cherry.client.IItem;
import net.sf.cherry.client.MapleClient;
import net.sf.cherry.client.MapleInventoryType;
import net.sf.cherry.net.AbstractMaplePacketHandler;
import net.sf.cherry.net.Constants.GameConstants;
import net.sf.cherry.server.MapleInventoryManipulator;
import net.sf.cherry.server.MapleItemInformationProvider;
import net.sf.cherry.server.MapleStorage;
import net.sf.cherry.tools.MaplePacketCreator;
import net.sf.cherry.tools.data.input.SeekableLittleEndianAccessor;

public class StorageHandler extends AbstractMaplePacketHandler {
	public void handlePacket(SeekableLittleEndianAccessor slea, MapleClient c) {
		MapleItemInformationProvider ii = MapleItemInformationProvider.getInstance();
		byte mode = slea.readByte();
		MapleStorage storage = c.getPlayer().getStorage();
		if (mode == 4) {
			byte type = slea.readByte();
			byte slot = slea.readByte();
			slot = storage.getSlot(MapleInventoryType.getByType(type), slot);
			IItem item = storage.takeOut(slot);
//			if (item.getItemId() >= 5010000 && item.getItemId() <= 5999999 || item.getUniqueId() > 0) {
//				c.getSession().write(MaplePacketCreator.serverNotice(1, "逗比。"));
//				return;
//			}
//			if (GameConstants.is豆豆装备(item.getItemId())) {
//				c.getSession().write(MaplePacketCreator.serverNotice(1, "豆豆装备无法存入仓库！"));
//				return;
//			}
			if (item != null) {
				if (MapleInventoryManipulator.checkSpace(c, item.getItemId(), item.getQuantity(), item.getOwner())) {
					MapleInventoryManipulator.addFromDrop(c, item, "Taken out from storage by " + c.getPlayer().getName(), false);
				} else {
					storage.store(item);
					c.getSession().write(MaplePacketCreator.serverNotice(1, "背包已满"));
				}
				storage.sendTakenOut(c, ii.getInventoryType(item.getItemId()));
			}
		} else if (mode == 5) {
			byte slot = (byte) slea.readShort();
			int itemId = slea.readInt();
			short quantity = slea.readShort();

//			if (itemId >= 5010000 && itemId <= 5999999) {
//				c.getSession().write(MaplePacketCreator.serverNotice(1, "逗比。"));
//				return;
//			}
			if (GameConstants.is豆豆装备(itemId)) {
				c.getSession().write(MaplePacketCreator.serverNotice(1, "豆豆装备无法存入仓库！"));
				return;
			}
			if (quantity < 1) {
				// c.disconnect();
				return;
			}
			if (storage.isFull()) {
				c.getSession().write(MaplePacketCreator.getStorageFull());
				return;
			}
			if (c.getPlayer().getMeso() < 100) {
				c.getSession().write(MaplePacketCreator.serverNotice(1, "你没有足够的金币"));
			} else {
				MapleInventoryType type = ii.getInventoryType(itemId);
				IItem item = c.getPlayer().getInventory(type).getItem(slot).copy();
				if ((item.getItemId() == itemId)
						&& ((item.getQuantity() >= quantity) || (ii.isThrowingStar(itemId)) || (ii.isBullet(itemId)))) {
					if ((ii.isThrowingStar(itemId)) || (ii.isBullet(itemId))) {
						quantity = item.getQuantity();
					}
					if (!c.getPlayer().haveItem(itemId, quantity, true, false)) {
						return;
					}
					item.log("Stored by " + c.getPlayer().getName(), false);
					c.getPlayer().gainMeso(-100, false, true, false);
					MapleInventoryManipulator.removeFromSlot(c, type, slot, quantity, false);
					item.setQuantity(quantity);
					storage.store(item);
				} else {
					// c.disconnect();
					return;
				}
			}
			storage.sendStored(c, ii.getInventoryType(itemId));
		} else if (mode == 6) { //排序
		   storage.arrange();
           storage.update(c);
		} else if (mode == 7) {
			int meso = slea.readInt();
			int storageMesos = storage.getMeso();
			int playerMesos = c.getPlayer().getMeso();
			if (((meso > 0) && (storageMesos >= meso)) || ((meso < 0) && (playerMesos >= -meso))) {
				if ((meso < 0) && (storageMesos - meso < 0)) {
					meso = -(Integer.MAX_VALUE - storageMesos);
					if (-meso > playerMesos)
						throw new RuntimeException("everything sucks");
				} else if ((meso > 0) && (playerMesos + meso < 0)) {
					meso = Integer.MAX_VALUE - playerMesos;
					if (meso > storageMesos) {
						throw new RuntimeException("everything sucks");
					}
				}
				storage.setMeso(storageMesos - meso);
				c.getPlayer().gainMeso(meso, false, true, false);
			} else {
				// c.disconnect();
				return;
			}
			storage.sendMeso(c);
		} else if (mode == 8) {
			storage.close();
		}
	}
}

/*
 * Location: E:\maoxiandaodanji\dist\cherry.jar Qualified Name:
 * net.sf.cherry.net.channel.handler.StorageHandler JD-Core Version: 0.6.0
 */