/*
	内容：武陵道场入口
	所在地图：925020001
*/

var rewardItem = new Array(
						new Array(1032216, 288),
						new Array(1152155, 288),
						new Array(1113070, 288),
                        new Array(1402014, 150),
						new Array(1402037, 150),	// Lv120 - 英雄手套 - 送给武陵道场最强挑战者的传说中的手套。
						new Array(1132115, 600),	// Lv120 - 武公的黑腰带(无描述)
						new Array(2046856, 200),		// 专属饰品攻击力卷轴 - 在饰品上增加物理攻击力属性。
						new Array(2046857, 200),	// 专属饰品魔力卷轴 - 在饰品上增加魔法攻击力属性。
						new Array(2046996, 248),
						new Array(2046997, 248),
						new Array(2047818, 248)
						);

var status = 0;
var text;
var firstsel = 0;
var taskItem = 4001620;	// 武公的证物 - 建造武陵道场的武公的证物。完成武陵道场的一个区域后可以获得，可以在萧公那里交换腰带
var secretBox = 2431988; // 秘密箱子 - Lv140套装
var rewardsel;
var freetimes = 2;		// 免费次数
var basemeso = 5000000;	// 起步收费
var needmeso = 0;

function start() {
	status = -1;
	action(1, 0, 0);
}

function action(mode, type, selection) {
	if (mode <= 0) {
		cm.dispose();
		return;
	} else {
		if (mode == 1) {
			status++;
		} else {
			status--;
		}

		if (status == 0) {
			var times = cm.getBossLog("新版武陵副本");
			needmeso = getNeedMeso(times);
			text = "\t\t\t\t#r#e- 新版武陵道场 -#n#k\r\n\r\n\t欢迎来到新版武陵道场，这里每一层都有实力强大的怪物与你一决雌雄，当然奖励也很丰富，运气好的话可以从怪物身上获得#b#z" + taskItem + "##k，可在我这里兑换#b特有的装备奖励#k，随着难度的提升，经验也会越来越丰富，目前已开放#r30层#k，且在#r17层、29层#k消灭怪物后会100%获得#b超级神奇魔方X5#k丰富大奖，要注意捡取哦！期待您的精彩表现~\r\n\r\n";
			text += "#d今日已挑战的次数：#e" + times + "#n\r\n再次挑战需要金币：#e" + needmeso + "#n#k\r\n";//您的最佳成绩：0层\r\n\r\n
			text += "#b#L0#开始挑战！#l\r\n#L1#关于新版武陵道场#l\r\n#L2#兑换奖励#l";
			cm.sendSimple(text);
		} else if (status == 1) {
			firstsel = selection;
			if (selection == 0) {
				var canenter = true;
				if (cm.getPlayer().getLevel() < 120) {
					cm.sendOk("死亡可不会怜悯你的，120级后再来吧！");
					canenter = false;
				} else if (cm.getParty() != null) {
					cm.sendOk("请退出当前队伍");
					canenter = false;
				} else if (cm.getMeso() < needmeso) {
					cm.sendOk("您的金币不足#r" + needmeso + "#k，无法再次挑战");
					canenter = false;
				}

				if (canenter) {
					text = "祝你好运~";
					cm.sendNext(text);
				} else {
					cm.dispose();
					return;
				}
			} else if (selection == 1){
				text = "\t\t\t\t#r#e- 武陵道场说明 -#n#k\r\n\r\n";
				text += "- 关于消耗品\r\n  开始挑战后无法使用任何消耗物品，只能使用怪物随机掉落的专用特殊药水、超级药水、万能疗伤药。\r\n  #r注：捡取后自动使用。#k\r\n\r\n";
				text += "- 通关奖励\r\n  每层都会有机率掉落#b#z" + taskItem + "##k，在#r17层、29层#k消灭该层所有怪物后会掉落#b超级神奇魔方#k，打开后可获得数量不等的极品套装。\r\n\r\n";
				text += "- 每日挑战次数\r\n  每日可获得#r2次#k免费挑战次数，使用完后再次挑战则需购买门票才能继续挑战，当日挑战次数越多，所需金币也会越多。\r\n";
				cm.sendNext(text);
				status = -1;
				return;
			} else if (selection == 2) {
				text = "请选择您要兑换的奖励：\r\n\r\n";
				for (var i = 0; i < rewardItem.length; i++) {
					text += "#L" + i + "##i" + rewardItem[i][0] + "#" + " #z" + rewardItem[i][0] + "#\r\n";
				}
				cm.sendNext(text);
			}
		} else if (status == 2) {
			//cm.start_DojoAgent(true, false);
			if (firstsel == 0) {
				var em = cm.getEventManager("DoJang");
				if (em == null) {
					cm.sendOk("副本暂未开放，敬请期待~");
					cm.dispose();
					return;
				}

				var eim = em.newInstance(cm.getPlayer().getName());
				var maps = new Array();
				var baseMapId = 925060000;
				var mapFactory = cm.getChannelServer().getMapFactory();
				for (var i = 1; i <= 29; i++) {
					var mapId = baseMapId + i * 100;
					var mapInstanceId = cm.getChannelServer().getEventSM().getNewInstanceMapId();
					var map = mapFactory.CreateInstanceMap(mapId, true, true, true, mapInstanceId);
					//eim.addInstanceMap(mapInstanceId);
					eim.setInstanceMap(mapInstanceId);
					maps.push(new Array(mapId, map));
					eim.setProperty("Dojang"+i, mapId);
				}
				eim.setObjectProperty("maps", maps);
				eim.registerPlayer(cm.getPlayer());
				cm.getPlayer().changeMap(maps[0][1], maps[0][1].getPortal(0));
				cm.setBossLog("新版武陵副本");
				cm.gainMeso(-needmeso);
				cm.worldMessage(0,"[系统公告] : 玩家[" + cm.getPlayer().getName() + "]进入了新版武陵副本，祝TA好运~");
				cm.dispose();
			} else if (firstsel == 2) {
				text = "兑换 #i" + rewardItem[selection][0] + "# 需要 " + rewardItem[selection][1] + " 个 #i" + taskItem + "# ，确定兑换吗？";
				rewardsel = rewardItem[selection];
				cm.sendNext(text);
			}
		} else if (status == 3) {
			if (firstsel == 2) {
				if (!cm.haveItem(taskItem, rewardsel[1])) {
					cm.sendOk("没有足够的 #z" + taskItem + "#，请收集够 " + rewardsel[1] + "个再来兑换吧。");
				} else if (cm.getInventory(1).isFull(1) || cm.getInventory(2).isFull(1)) {
					cm.sendOk("您的装备栏或消耗栏不足 1 格，请清理后再来兑换。");
				} else {
					cm.gainItem(taskItem, -rewardsel[1]);
					cm.gainItem(rewardsel[0], 1);
					cm.sendOk("兑换成功！获得#i" + rewardsel[0] + " #1个。");
				}
			}
			
			cm.dispose();
			return;
		}
	}
}

function getNeedMeso(times) {
	// 50 100 150 250 400 650 1050……  (单位：万)
	if (times < freetimes) {
		return 0;
	} else {
		times -= freetimes - 1;
	}
	var meso = 0;
	var lastmeso = new Array();
	for (var i = 0; i < times; i++) {
		if (lastmeso.length < 2) {
			meso += basemeso;
		} else {
			meso = lastmeso[i-2] + lastmeso[i-1];
		}
		lastmeso.push(meso);
	}
	return meso;
}