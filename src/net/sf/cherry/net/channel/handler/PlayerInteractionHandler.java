package net.sf.cherry.net.channel.handler;

import java.util.Arrays;

import net.sf.cherry.client.IItem;
import net.sf.cherry.client.MapleCharacter;
import net.sf.cherry.client.MapleClient;
import net.sf.cherry.client.MapleInventoryType;
import net.sf.cherry.client.messages.CommandProcessor;
import net.sf.cherry.net.AbstractMaplePacketHandler;
import net.sf.cherry.net.Constants.GameConstants;
import net.sf.cherry.server.AutobanManager;
import net.sf.cherry.server.MapleInventoryManipulator;
import net.sf.cherry.server.MapleItemInformationProvider;
import net.sf.cherry.server.MapleMiniGame;
import net.sf.cherry.server.MapleTrade;
import net.sf.cherry.server.maps.MapleMapObject;
import net.sf.cherry.server.maps.MapleMapObjectType;
import net.sf.cherry.server.movement.FieldLimit;
import net.sf.cherry.server.playerinteractions.HiredMerchant;
import net.sf.cherry.server.playerinteractions.IPlayerInteractionManager;
import net.sf.cherry.server.playerinteractions.MaplePlayerShop;
import net.sf.cherry.server.playerinteractions.MaplePlayerShopItem;
import net.sf.cherry.server.playerinteractions.PlayerInteractionManager;
import net.sf.cherry.tools.MaplePacketCreator;
import net.sf.cherry.tools.data.input.SeekableLittleEndianAccessor;

public class PlayerInteractionHandler extends AbstractMaplePacketHandler {

	public enum Action {
		CREATE(0x00), INVITE(0x02), DECLINE(0x03), VISIT(0x04), ROOM(0x05), CHAT(0x06), EXIT(0x0A), // 0A
		OPEN(0x0B), // 0B
		CASH_ITEM_INTER(0x0D), SET_ITEMS(0x0E), // 77
		SET_MESO(0x0F), // 77
		CONFIRM(0x10), // 77
		ADD_ITEM(0x14), // 13
		BUY(0x15), // 14
		REMOVE_ITEM(0x19), // 18
		BAN_PLAYER(0x1A), // 19
		PUT_ITEM(0x1F), // 1E
		MERCHANT_BUY(0x20), // 1F
		TAKE_ITEM_BACK(0x24), // 23
		MAINTENANCE_OFF(0x25), // 24
		MERCHANT_ORGANIZE(0x26), // 25
		CLOSE_MERCHANT(0x27), // 26
		REQUEST_TIE(0x30), ANSWER_TIE(0x31), GIVE_UP(0x32), READY(0xFF), 小游戏平局(0x31), 小游戏弃权(0x33), 小游戏未知(0x37), // 开始游戏以后退出
		EXIT_AFTER_GAME(0x38), // 退出小游戏
		UN_READY(0x39), // 小游戏准备
		GameMiNi_NO(0x3A), // 小游戏取消准备
		GamMiNi_T(0x3B), // 小游戏T人
		START(0x3C), // 开始小游戏
		GET_RESULT(0x3D), // 完成小游戏(胜利失败)
		SKIP(0x3E), MOVE_OMOK(0x3F), // 小游戏 下棋 或者 翻牌 的动作 ? 完成小游戏(胜利失败)
		SELECT_CARD(0x43);
		/*
		 * 39 准备 3B T人
		 */
		final byte code;

		private Action(int code) {
			this.code = (byte) code;
		}

		public byte getCode() {
			return this.code;
		}
	}

	public void handlePacket(SeekableLittleEndianAccessor slea, MapleClient c) {
		/*
		 * c.doneedlog(this, c.getPlayer()); if (c.getPlayer().getCherryBan()) {
		 * c.getPlayer().getCherryBanMessage();
		 * c.getSession().write(MaplePacketCreator.enableActions()); return; }
		 * MapleCharacter chr = c.getPlayer();
		 */
		//// System.out.println(slea);
		MapleCharacter chr = c.getPlayer();
		byte mode = slea.readByte();
		if (mode == Action.CREATE.getCode()) {
			byte createType = slea.readByte();
			if (createType == 3) {
				MapleTrade.startTrade(c.getPlayer());
			} else {
				if (createType == 1) { // omok mini game
					if ((c.getPlayer().hasMerchant()) || (c.getPlayer().tempHasItems())) {
						c.getPlayer().dropMessage(1, "您已经开过店了，或者还有物品在弗兰德里那没取回。");
						return;
					}
					if (c.getPlayer().getChalkboard() != null
							|| FieldLimit.CANNOTMINIGAME.check(c.getPlayer().getMap().getFieldLimit())) {
						return;
					}
					String desc = slea.readMapleAsciiString();
					slea.readByte(); // 20 6E 4E
					int type = slea.readByte(); // 20 6E 4E
					MapleMiniGame game = new MapleMiniGame(chr, desc);
					c.getPlayer().setMiniGame(game);
					game.setPieceType(type);
					game.setGameType("omok");
					c.getPlayer().getMap().addMapObject(game);
					c.getPlayer().getMap().broadcastMessage(MaplePacketCreator.addOmokBox(chr, 1, 0));
					game.sendOmok(c, type);
				} else if (createType == 2) { // matchcard

					if ((c.getPlayer().hasMerchant()) || (c.getPlayer().tempHasItems())) {
						c.getPlayer().dropMessage(1, "您已经开过店了，或者还有物品在弗兰德里那没取回。");
						return;
					}
					if (c.getPlayer().getChalkboard() != null) {
						return;
					}
					String desc = slea.readMapleAsciiString();
					slea.readByte(); // 20 6E 4E
					int type = slea.readByte(); // 20 6E 4E
					MapleMiniGame game = new MapleMiniGame(chr, desc);
					game.setPieceType(type);
					if (type == 0) {
						game.setMatchesToWin(6);
					} else if (type == 1) {
						game.setMatchesToWin(10);
					} else if (type == 2) {
						game.setMatchesToWin(15);
					}
					game.setGameType("matchcard");
					c.getPlayer().setMiniGame(game);
					c.getPlayer().getMap().addMapObject(game);
					c.getPlayer().getMap().broadcastMessage(MaplePacketCreator.addMatchCardBox(chr, 1, 0));
					game.sendMatchCard(c, type);
					/*
					 * if (c.getPlayer().getChalkboard() != null) { return; } if
					 * (createType == 1 || createType == 2) { String desc =
					 * slea.readMapleAsciiString(); String pass = null; if
					 * (slea.readByte() == 1) { pass =
					 * slea.readMapleAsciiString(); } int type =
					 * slea.readByte(); IPlayerInteractionManager game = new
					 * MapleMiniGame(c.getPlayer(), type, desc);
					 * c.getPlayer().setInteraction(game); if (createType == 1)
					 * { ((MapleMiniGame) game).setGameType(MiniGameType.OMOK);
					 * } else if (createType == 2) { if (type == 0) {
					 * ((MapleMiniGame) game).setMatchesToWin(6); } else if
					 * (type == 1) { ((MapleMiniGame) game).setMatchesToWin(10);
					 * } else if (type == 2) { ((MapleMiniGame)
					 * game).setMatchesToWin(15); } ((MapleMiniGame)
					 * game).setGameType(MiniGameType.MATCH_CARDS); }
					 * c.getPlayer().getMap().addMapObject((
					 * PlayerInteractionManager) game);
					 * c.getPlayer().getMap().broadcastMessage(
					 * MaplePacketCreator.sendInteractionBox(c.getPlayer()));
					 * //chr.getMap().broadcastMessage(MaplePacketCreator.
					 * addOmokBox(chr, 1, 0));
					 */

					/*
					 * if ((createType == 1) || (createType == 2)) { if
					 * ((c.getPlayer().hasMerchant()) ||
					 * (c.getPlayer().tempHasItems())) {
					 * c.getPlayer().dropMessage(1, "您已经开过店了，或者还有物品在弗兰德里那没取回。");
					 * return; } String desc = slea.readMapleAsciiString();
					 * String pass = null; if (slea.readByte() == 1) { pass =
					 * slea.readMapleAsciiString(); } int type =
					 * slea.readByte(); c.getPlayer().getMap().broadcastMessage(
					 * MaplePacketCreator.sendInteractionBox(c.getPlayer()));
					 */
				} else if ((createType == 4) || (createType == 5)) {
					if (createType == 4) {
						c.getPlayer().dropMessage(1, "开店请使用雇佣商人");
						return;
					}
					if ((!c.getPlayer().hasMerchant()) && (c.getPlayer().tempHasItems())) {
						c.getPlayer().dropMessage(1, "请通过弗兰德里拿回物品");
						return;
					}
					if ((!c.getPlayer().getMap()
							.getMapObjectsInRange(c.getPlayer().getPosition(), 19500.0D,
									Arrays.asList(new MapleMapObjectType[] { MapleMapObjectType.SHOP,
											MapleMapObjectType.HIRED_MERCHANT }))
							.isEmpty()) || (c.getPlayer().getMapId() < 910000001)
							|| (c.getPlayer().getMapId() > 910000002)) {
						c.getPlayer().dropMessage(1, "只有在自由市场1D-2D洞内才可以开设商店!");
						return;
					}
					String desc = slea.readMapleAsciiString();
					slea.skip(3);
					int itemId = slea.readInt();

					if (c.getPlayer().haveItem(itemId, 1, false, true)) {
						IPlayerInteractionManager shop;
						if (createType == 4) {
							shop = new MaplePlayerShop(c.getPlayer(), itemId, desc);
						} else {
							shop = new HiredMerchant(c.getPlayer(), itemId, desc);
						}
						c.getPlayer().setInteraction(shop);
						c.getSession().write(MaplePacketCreator.getInteraction(c.getPlayer(), true));
					} else {
						AutobanManager.getInstance().autoban(c,
								"XSource| Merchant Shop: Attempt to open a shop without the item.");
						return;
					}
				} else {
					//////// System.out.println("Unhandled PLAYER_INTERACTION
					//////// packet: " + slea.toString());
				}
			}
			// System.out.println("1");
		} else if (mode == Action.INVITE.getCode()) {
			int otherPlayer = slea.readInt();
			MapleCharacter otherChar = c.getPlayer().getMap().getCharacterById(otherPlayer);
			MapleTrade.inviteTrade(c.getPlayer(), otherChar);
			// System.out.println("2");
		} else if (mode == Action.CASH_ITEM_INTER.getCode()) {
			byte 类型 = slea.readByte();
			byte 现金交易 = slea.readByte();
			int 未知类型 = slea.readInt();
			int oid = slea.readInt();
			MapleCharacter otherChar = c.getPlayer().getMap().getCharacterById(oid);
			MapleMapObject ob = c.getPlayer().getMap().getMapObject(oid);
			if (现金交易 == 6 && 类型 == 4 && (c.getPlayer().getTrade() != null)
					&& (c.getPlayer().getTrade().getPartner() != null)) {
				// byte 未知 = slea.readByte();
				MapleTrade.接受现金交易(c.getPlayer(), c.getPlayer().getTrade().getPartner().getChr());
				c.getPlayer().dropMessage(6, "玩家 " + otherChar + "  接受现金交易邀请!");
			} else if (现金交易 == 6 && 类型 != 4) {
				MapleTrade.start现金交易(c.getPlayer());
				MapleTrade.现金交易(c.getPlayer(), otherChar);
				c.getPlayer().dropMessage(6, "向玩家 " + otherChar + "  发送现金交易邀请!");
			} else if (((ob instanceof IPlayerInteractionManager)) && (c.getPlayer().getInteraction() == null)
					&& 现金交易 != 6) {
				IPlayerInteractionManager ips = (IPlayerInteractionManager) ob;
				if (ips.getShopType() == 1) {
					HiredMerchant merchant = (HiredMerchant) ips;
					if (merchant.isOwner(c.getPlayer())) {
						merchant.setOpen(false);
						merchant.broadcast(MaplePacketCreator.shopErrorMessage(13, 1), false);
						merchant.removeAllVisitors(16, 0);
						c.getPlayer().setInteraction(ips);
						c.getSession().write(MaplePacketCreator.getInteraction(c.getPlayer(), false));
						return;
					}
					if (!merchant.isOpen()) {
						c.getPlayer().dropMessage(1, "主人正在整理商店物品\r\n请稍后再度光临！");
						return;
					}
				} else if ((ips.getShopType() == 2) && (((MaplePlayerShop) ips).isBanned(c.getPlayer().getName()))) {
					c.getPlayer().dropMessage(1, "你已经被禁止进入此店铺");
					return;
				}

				if (ips.getFreeSlot() == -1) {
					c.getSession().write(MaplePacketCreator.getMiniBoxFull());
					return;
				}
				c.getPlayer().setInteraction(ips);
				ips.addVisitor(c.getPlayer());
				c.getSession().write(MaplePacketCreator.getInteraction(c.getPlayer(), false));
				//////// System.out.println("雇佣");
			} // System.out.println("3");
		} else if (mode == Action.DECLINE.getCode()) {
			MapleTrade.declineTrade(c.getPlayer());
			// System.out.println("4");
		} else if (mode == Action.VISIT.getCode()) {
			if ((c.getPlayer().getTrade() != null) && (c.getPlayer().getTrade().getPartner() != null)) {
				MapleTrade.visitTrade(c.getPlayer(), c.getPlayer().getTrade().getPartner().getChr());
				////////// System.out.println("交易");
			} else {
				int oid = slea.readInt();
				MapleMapObject ob = c.getPlayer().getMap().getMapObject(oid);
				if (ob instanceof MapleMiniGame) {
					MapleMiniGame game = (MapleMiniGame) ob;
					if (game.hasFreeSlot() && !game.isVisitor(c.getPlayer())) {
						game.addVisitor(c.getPlayer());
						chr.setMiniGame(game);
						if (game.getGameType().equals("omok")) {
							game.sendOmok(c, game.getPieceType());
						} else if (game.getGameType().equals("matchcard")) {
							game.sendMatchCard(c, game.getPieceType());
						}
						/*
						 * switch (game.getGameType()) { case "omok":
						 * game.sendOmok(c, game.getPieceType()); break; case
						 * "matchcard": game.sendMatchCard(c,
						 * game.getPieceType()); break; }
						 */
					} else {
						c.getSession().write(MaplePacketCreator.getMiniGameFull());
					}
				} else if (((ob instanceof IPlayerInteractionManager)) && (c.getPlayer().getInteraction() == null)) {
					IPlayerInteractionManager ips = (IPlayerInteractionManager) ob;
					if (ips.getShopType() == 1) {
						HiredMerchant merchant = (HiredMerchant) ips;
						if (merchant.isOwner(c.getPlayer())) {
							merchant.setOpen(false);
							merchant.broadcast(MaplePacketCreator.shopErrorMessage(13, 1), false);
							merchant.removeAllVisitors(16, 0);
							c.getPlayer().setInteraction(ips);
							c.getSession().write(MaplePacketCreator.getInteraction(c.getPlayer(), false));
							return;
						}
						if (!merchant.isOpen()) {
							c.getPlayer().dropMessage(1, "主人正在整理商店物品\r\n请稍后再度光临！");
							return;
						}
					} else if ((ips.getShopType() == 2)
							&& (((MaplePlayerShop) ips).isBanned(c.getPlayer().getName()))) {
						c.getPlayer().dropMessage(1, "你已经被禁止进入此店铺");
						return;
					}

					if (ips.getFreeSlot() == -1) {
						c.getSession().write(MaplePacketCreator.getMiniBoxFull());
						return;
					}
					c.getPlayer().setInteraction(ips);
					ips.addVisitor(c.getPlayer());
					c.getSession().write(MaplePacketCreator.getInteraction(c.getPlayer(), false));
					// ////////System.out.println("雇佣！！！！！！");
				}

				// ////////System.out.println("雇佣？？？？？？");
			} // System.out.println("5");
		} else if (mode == Action.CHAT.getCode()) {
			if (c.getPlayer().getTrade() != null) {
				c.getPlayer().getTrade().chat(slea.readMapleAsciiString());
			} else if (chr.getMiniGame() != null) {
				MapleMiniGame game = chr.getMiniGame();
				if (game != null) {
					game.chat(c, slea.readMapleAsciiString());
				}
			} else if (c.getPlayer().getInteraction() != null) {
				IPlayerInteractionManager ips = c.getPlayer().getInteraction();
				String message = slea.readMapleAsciiString();
				CommandProcessor.getInstance().processCommand(c, message);
				ips.broadcast(MaplePacketCreator.shopChat(c.getPlayer().getName() + " : " + message,
						ips.isOwner(c.getPlayer()) ? 0 : ips.getVisitorSlot(c.getPlayer()) + 1), true);
			} // System.out.println("6");
		} else if (mode == Action.EXIT.getCode() || mode == Action.EXIT_AFTER_GAME.getCode()) {
			if (c.getPlayer().getTrade() != null) {
				MapleTrade.cancelTrade(c.getPlayer());
			} else {
				MapleMiniGame game = chr.getMiniGame();
				IPlayerInteractionManager ips = c.getPlayer().getInteraction();
				c.getPlayer().setInteraction(null);
				if (ips != null) {
					if (ips.isOwner(c.getPlayer())) {
						if (ips.getShopType() == 2) {
							boolean save = false;
							for (MaplePlayerShopItem items : ips.getItems()) {
								if (items.getBundles() > 0) {
									IItem item = items.getItem();
									item.setQuantity(items.getBundles());
									if (MapleInventoryManipulator.addFromDrop(c, item)) {
										items.setBundles((short) 0);
									} else {
										save = true;
										break;
									}
								}
							}
							ips.removeAllVisitors(3, 1);
							ips.closeShop(save);
						} else if (ips.getShopType() == 1) {
							c.getSession().write(MaplePacketCreator.shopVisitorLeave(0));
						} else if ((ips.getShopType() == 3) || (ips.getShopType() == 4)) {
							ips.removeAllVisitors(3, 1);
						}
					} else {
						ips.removeVisitor(c.getPlayer());
					}
				} else if (game != null) {
					chr.setMiniGame(null);
					if (game.isOwner(c.getPlayer())) {
						chr.getMap().broadcastMessage(MaplePacketCreator.removeCharBox(c.getPlayer()));
						game.broadcastToVisitor(MaplePacketCreator.getMiniGameClose());
					} else {
						game.removeVisitor(c.getPlayer());
					}
				}
			} // System.out.println("7");
		} else if (mode == Action.OPEN.getCode()) {
			/*
			 * if ((!c.getPlayer().getMap().getMapObjectsInRange(c.getPlayer().
			 * getPosition(), 19500.0D, Arrays.asList(new
			 * MapleMapObjectType[]{MapleMapObjectType.SHOP,
			 * MapleMapObjectType.HIRED_MERCHANT})).isEmpty()) ||
			 * (c.getPlayer().getMapId() < 910000001) ||
			 * (c.getPlayer().getMapId() > 910000022)) {
			 * c.getPlayer().dropMessage(1, "不能在这里开设店铺"); return; }
			 */
			IPlayerInteractionManager shop = c.getPlayer().getInteraction();
			if ((shop != null) && (shop.isOwner(c.getPlayer()))) {
				c.getPlayer().getMap().addMapObject((PlayerInteractionManager) shop);
				if (shop.getShopType() == 1) {
					HiredMerchant merchant = (HiredMerchant) shop;
					c.getPlayer().setHasMerchant(true);
					merchant.setOpen(true);
					c.getPlayer().getMap().broadcastMessage(MaplePacketCreator.spawnHiredMerchant(merchant));
					c.getPlayer().setInteraction(null);
				} else if (shop.getShopType() == 2) {
					c.getPlayer().getMap().broadcastMessage(MaplePacketCreator.sendInteractionBox(c.getPlayer()));
				}
				slea.readByte();
			} // System.out.println("8");
		} else if (mode == Action.SET_MESO.getCode()) {
			c.getPlayer().getTrade().setMeso(slea.readInt());
			// System.out.println("9");
		} else if (mode == Action.SET_ITEMS.getCode()) {
			MapleItemInformationProvider ii = MapleItemInformationProvider.getInstance();
			MapleInventoryType ivType = MapleInventoryType.getByType(slea.readByte());
			IItem item = c.getPlayer().getInventory(ivType).getItem((byte) slea.readShort());
			/*
			 * if (item.getItemId() >= 5010000 && item.getItemId() <= 5999999 ||
			 * item.getItemId() >= 1602000 && item.getItemId() <= 1799999 ||
			 * item.getItemId() == 1122000 || item.getItemId() == 1112404) {
			 * c.getPlayer().dropMessage(1,"现金道具不能给别人。"); return; }
			 */
			if (ii.isCash(item.getItemId()) == true) {
				c.getPlayer().dropMessage(1, "现金道具不能给别人。");
				return;
			}
			long checkq = slea.readShort();
			short quantity = (short) (int) checkq;
			byte targetSlot = slea.readByte();
			byte flag = item.getFlag();
			if ((c.getPlayer().getTrade() != null) && (item != null)) {
				if (checkq > 4000L) {
					AutobanManager.getInstance().autoban(c, "XSource| PE while in trade.");
				}
				if (((quantity <= item.getQuantity()) && (quantity >= 0)) || (ii.isThrowingStar(item.getItemId()))
						|| (ii.isBullet(item.getItemId()))) {
					if ((!c.getChannelServer().allowUndroppablesDrop()) && (ii.isDropRestricted(item.getItemId()))) {
						if (flag != GameConstants.UNTRADEABLE) {
							c.getSession().write(MaplePacketCreator.enableActions());
							return;
						}
					}
					IItem tradeItem = item.copy();
					if ((ii.isThrowingStar(item.getItemId())) || (ii.isBullet(item.getItemId()))) {
						tradeItem.setQuantity(item.getQuantity());
						MapleInventoryManipulator.removeFromSlot(c, ivType, item.getPosition(), item.getQuantity(),
								true);
					} else {
						tradeItem.setQuantity(quantity);
						MapleInventoryManipulator.removeFromSlot(c, ivType, item.getPosition(), quantity, true);
					}
					tradeItem.setPosition(targetSlot);
					c.getPlayer().getTrade().addItem(tradeItem);
				}
			}
			//////// System.out.println("123456");
			// System.out.println("9");
		} else if (mode == Action.CONFIRM.getCode()) {
			MapleTrade.completeTrade(c.getPlayer());
			// System.out.println("10");
		} else if ((mode == Action.ADD_ITEM.getCode()) || (mode == Action.PUT_ITEM.getCode())) {
			MapleInventoryType type = MapleInventoryType.getByType(slea.readByte());
			byte slot = (byte) slea.readShort();
			short bundles = slea.readShort();// 数量
			short perBundle = slea.readShort();
			int price = slea.readInt();
			IItem ivItem = c.getPlayer().getInventory(type).getItem(slot);
			IItem sellItem = ivItem.copy();
			sellItem.setQuantity(perBundle);
			MaplePlayerShopItem item = new MaplePlayerShopItem(sellItem, bundles, price);
			IPlayerInteractionManager shop = c.getPlayer().getInteraction();
			long checkquantity = bundles * perBundle;
			int checkiquantity = bundles * perBundle;
			short checksmquantity = (short) (bundles * perBundle);
			if ((shop != null) && (shop.isOwner(c.getPlayer())) && (ivItem != null)
					&& (ivItem.getQuantity() >= bundles * perBundle)) {
				if (price < 0) {
					AutobanManager.getInstance().autoban(c, "销售物品出现负数价格.异常数据包编辑.");
					return;
				}
				if ((bundles <= 0) || (perBundle <= 0) || (checkquantity > 20000L) || (checksmquantity < 0)
						|| (checkiquantity < 0) || (checkiquantity > 20000)) {
					AutobanManager.getInstance().autoban(c, "异常物品销售: " + sellItem.getItemId());
					return;
				}
				if ((bundles > 1200) || (perBundle > 4000)) {
					return;
				}
				MapleItemInformationProvider ii = MapleItemInformationProvider.getInstance();
				if (ii.isCash(ivItem.getItemId()) == true) {
					c.getPlayer().dropMessage(1, "现金道具不能给别人。");
					return;
				}
				if ((ii.isThrowingStar(ivItem.getItemId())) || (ii.isBullet(ivItem.getItemId()))) {
					MapleInventoryManipulator.removeFromSlot(c, type, slot, ivItem.getQuantity(), true);
				} else {
					MapleInventoryManipulator.removeFromSlot(c, type, slot, (short) (bundles * perBundle), true);
				}
				if (shop.getItemType() == 4) {
					shop.addItem(item);
				} else {
					shop.addItem(item);
				}
				c.getSession().write(MaplePacketCreator.shopItemUpdate(shop));
				// ////////System.out.println("完结");
			} // System.out.println("11");
		} else if ((mode == Action.BUY.getCode()) || (mode == Action.MERCHANT_BUY.getCode())) {
			int item = slea.readByte();
			short quantity = slea.readShort();
			IPlayerInteractionManager shop = c.getPlayer().getInteraction();
			shop.buy(c, item, quantity);
			shop.broadcast(MaplePacketCreator.shopItemUpdate(shop), true);
			// System.out.println("12");
		} else if ((mode == Action.TAKE_ITEM_BACK.getCode()) || (mode == Action.REMOVE_ITEM.getCode())) {
			int slot = slea.readShort();
			IPlayerInteractionManager shop = c.getPlayer().getInteraction();
			if ((shop != null) && (shop.isOwner(c.getPlayer()))) {
				MaplePlayerShopItem item = (MaplePlayerShopItem) shop.getItems().get(slot);
				if (item.getBundles() > 0) {
					IItem iitem = item.getItem();
					iitem.setQuantity(item.getBundles());
					MapleInventoryManipulator.addFromDrop(c, iitem);
				}
				shop.removeFromSlot(slot);
				c.getSession().write(MaplePacketCreator.shopItemUpdate(shop));
			} // System.out.println("13");
		} else if (mode == Action.CLOSE_MERCHANT.getCode()) {
			IPlayerInteractionManager merchant = c.getPlayer().getInteraction();
			if ((merchant != null) && (merchant.getShopType() == 1) && (merchant.isOwner(c.getPlayer()))) {
				boolean save = false;
				for (MaplePlayerShopItem items : merchant.getItems()) {
					if (items.getBundles() > 0) {
						IItem item;
						item = items.getItem();
						item.setQuantity(items.getBundles());
						if (MapleInventoryManipulator.商店防止复制1(c, item)) { //
							// System.out.println("关闭雇佣A:"+items.getBundles()+"||"+items.getItem());
							items.setBundles((short) 0);
						} else {
							save = true;
							// System.out.println("关闭雇佣B");
							break;
						}

					}
				}
				// System.out.println("关闭雇佣C:"+save);
				merchant.removeAllVisitors(3, 1);
				merchant.closeShop(save);
				c.getPlayer().setInteraction(null);
				c.getPlayer().setHasMerchant(false);
				c.getPlayer().dropMessage(1, "装备/消耗/其他/设置类物品\r\n请通过弗兰德里拿回剩余物品。");
			} // System.out.println("14");
		} else if (mode == Action.MAINTENANCE_OFF.getCode()) {
			HiredMerchant merchant = (HiredMerchant) c.getPlayer().getInteraction();
			if ((merchant != null) && (merchant.isOwner(c.getPlayer()))) {
				merchant.setOpen(true);
				merchant.tempItemsUpdate();
			} // System.out.println("15");
		} else if (mode == Action.BAN_PLAYER.getCode()) {
			IPlayerInteractionManager imps = c.getPlayer().getInteraction();
			if ((imps != null) && (imps.isOwner(c.getPlayer()))) {
				((MaplePlayerShop) imps).banPlayer(slea.readMapleAsciiString());
			} // System.out.println("16");
		} else if (mode == Action.READY.getCode()) {
			MapleMiniGame game = chr.getMiniGame();
			game.broadcast(MaplePacketCreator.getMiniGameReady(game));
			// System.out.println("17");
		} else if (mode == Action.UN_READY.getCode()) {
			MapleMiniGame game = chr.getMiniGame();
			game.broadcast(MaplePacketCreator.getMiniGameUnReady(game));
			// System.out.println("18");
		} else if (mode == Action.GameMiNi_NO.getCode()) {
			MapleMiniGame game = chr.getMiniGame();
			game.broadcast(MaplePacketCreator.getMiniGameUnReadyNO(game));
			// System.out.println("19");
		} else if (mode == Action.START.getCode()) {
			MapleMiniGame game = chr.getMiniGame();
			if (game.getGameType().equals("omok")) {
				game.broadcast(MaplePacketCreator.getMiniGameStart(game, game.getLoser()));
				chr.getMap().broadcastMessage(MaplePacketCreator.addOmokBox(game.getOwner(), 2, 1));
			}
			if (game.getGameType().equals("matchcard")) {
				game.shuffleList();
				if (game.getMatchesToWin() == 6) {
					game.broadcast(MaplePacketCreator.getMatchCardStart(game, game.getLoser(), 12));
				} else if (game.getMatchesToWin() == 10) {
					game.broadcast(MaplePacketCreator.getMatchCardStart(game, game.getLoser(), 20));
				} else if (game.getMatchesToWin() == 15) {
					game.broadcast(MaplePacketCreator.getMatchCardStart(game, game.getLoser(), 30));
				}
				chr.getMap().broadcastMessage(MaplePacketCreator.addMatchCardBox(game.getOwner(), 2, 1));
			} // System.out.println("19");
		} else if (mode == Action.GIVE_UP.getCode()) {
			MapleMiniGame game = chr.getMiniGame();
			if (game.getGameType().equals("omok")) {
				if (game.isOwner(c.getPlayer())) {
					game.broadcast(MaplePacketCreator.getMiniGameOwnerForfeit(game));
				} else {
					game.broadcast(MaplePacketCreator.getMiniGameVisitorForfeit(game));
				}
			}
			if (game.getGameType().equals("matchcard")) {
				if (game.isOwner(c.getPlayer())) {
					game.broadcast(MaplePacketCreator.getMatchCardVisitorWin(game));
				} else {
					game.broadcast(MaplePacketCreator.getMatchCardOwnerWin(game));
				}
			} // System.out.println("20");
		} else if (mode == Action.REQUEST_TIE.getCode()) {
			MapleMiniGame game = chr.getMiniGame();
			if (game.isOwner(c.getPlayer())) {
				game.broadcastToVisitor(MaplePacketCreator.getMiniGameRequestTie(game));
			} else {
				game.getOwner().getClient().announce(MaplePacketCreator.getMiniGameRequestTie(game));
			} // System.out.println("21");
		} else if (mode == Action.ANSWER_TIE.getCode()) {
			MapleMiniGame game = chr.getMiniGame();
			slea.readByte();
			if (game.getGameType().equals("omok")) {
				game.broadcast(MaplePacketCreator.getMiniGameTie(game));
			}
			if (game.getGameType().equals("matchcard")) {
				game.broadcast(MaplePacketCreator.getMatchCardTie(game));
			} // System.out.println("22");
		} else if (mode == Action.SKIP.getCode()) {
			MapleMiniGame game = chr.getMiniGame();
			if (game.isOwner(c.getPlayer())) {
				game.broadcast(MaplePacketCreator.getMiniGameSkipOwner(game));
			} else {
				game.broadcast(MaplePacketCreator.getMiniGameSkipVisitor(game));
			} // System.out.println("23");
		} else if (mode == Action.MOVE_OMOK.getCode()) {
			int x = slea.readInt(); // x point
			int y = slea.readInt(); // y point
			int type = slea.readByte(); // piece ( 1 or 2; Owner has one piece,
										// visitor has another, it switches
										// every game.)
			chr.getMiniGame().setPiece(x, y, type, c.getPlayer());
			// System.out.println("24");
		} else if (mode == Action.SELECT_CARD.getCode()) {
			int turn = slea.readByte(); // 1st turn = 1; 2nd turn = 0
			int slot = slea.readByte(); // slot
			MapleMiniGame game = chr.getMiniGame();
			int firstslot = game.getFirstSlot();
			if (turn == 1) {
				game.setFirstSlot(slot);
				if (game.isOwner(c.getPlayer())) {
					game.broadcastToVisitor(MaplePacketCreator.getMatchCardSelect(game, turn, slot, firstslot, turn));
				} else {
					game.getOwner().getClient()
							.announce(MaplePacketCreator.getMatchCardSelect(game, turn, slot, firstslot, turn));
				}
			} else if ((game.getCardId(firstslot + 1)) == (game.getCardId(slot + 1))) {
				if (game.isOwner(c.getPlayer())) {
					game.broadcast(MaplePacketCreator.getMatchCardSelect(game, turn, slot, firstslot, 2));
					game.setOwnerPoints();
				} else {
					game.broadcast(MaplePacketCreator.getMatchCardSelect(game, turn, slot, firstslot, 3));
					game.setVisitorPoints();
				}
			} else if (game.isOwner(c.getPlayer())) {
				game.broadcast(MaplePacketCreator.getMatchCardSelect(game, turn, slot, firstslot, 0));
			} else {
				game.broadcast(MaplePacketCreator.getMatchCardSelect(game, turn, slot, firstslot, 1));
			} // System.out.println("25");
		} else if (mode == Action.MERCHANT_ORGANIZE.getCode()) {
			IPlayerInteractionManager imps = c.getPlayer().getInteraction();
			for (int i = 0; i < imps.getItems().size(); i++) {
				if (((MaplePlayerShopItem) imps.getItems().get(i)).getBundles() == 0) {
					imps.removeFromSlot(i);
				}
			} // System.out.println("26");
			c.getSession().write(MaplePacketCreator.shopItemUpdate(imps));
		}
	}
}