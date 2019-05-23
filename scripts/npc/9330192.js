var status = -1;
var j = java.lang.Math.floor(Math.random() * 9);
var k = java.lang.Math.floor(Math.random() * 9);

function action(mode, type, selection) {
	if (cm.getMap().getAllMonstersThreadsafe().size() == 0) {
		for (var i = j; i <= j; i++) {
			if (j == 0) {
				cm.gainMeso(20000);
			} else if (j == 1) {
				cm.gainMeso(20000);
			} else if (j == 2) {
				cm.gainItem(4310030, 1);
				cm.playerMessage( - 1, "额外获得运动会币1个");
				cm.gainMeso(20000);
			} else if (j == 3) {
				cm.gainMeso(20000);
			} else if (j == 4) {
				cm.gainMeso(20000);
			} else if (j == 5) {
				cm.playerMessage( - 1, "额外获得运动会币2个");
				cm.gainMeso(20000);
			} else if (j == 6) {
				cm.gainMeso(20000);
			} else if (j == 7) {
				cm.gainMeso(20000);
			} else {
				cm.gainMeso(20000);
			}
			cm.dispose();
		}
		for (var i = k; i <= k; i++) {
			if (k == 0 || k == 1 || k == 2 || k == 3) {
				cm.gainItem(5072000, 1);
			} else if (k == 4 || k == 5 || k == 6 || k == 7) {
				cm.gainItem(4310030, 1);
			} else {
				cm.gainItem(5076000, 1);
			}
			cm.dispose();
		}
		if (cm.getPlayer().getMapId() == 262030300) {
			cm.warp(262030000);
		} else if (cm.getPlayer().getMapId() == 910024000) {
			cm.warp(910023000);
		} else if (cm.getPlayer().getMapId() == 240080500) {
			cm.warp(240080050);
		}
	} else if (!cm.haveMonster(9410162) && !cm.haveMonster(9410163) && !cm.haveMonster(9410164) && !cm.haveMonster(9410165) && cm.getPlayer().getMapId() == 744000001) {
		cm.gainItem(2431893, 15);
		cm.gainItem(4310129, 50);
		cm.gainItem(2430915, 10);
		cm.gainItem(2430051, 3);
		var basePercent = 0.1;
		if (cm.getLevel()>220) {
			basePercent = 0.02;
		}
		var calcExp = Math.floor(cm.getExpNeededForLevel()*basePercent);
		var expNum = 1;
		var lastExp = 0;
		//如果经验超过21E
		if (calcExp>=2147483647) {
			//计算分成几次
			expNum = Math.floor((calcExp / 2147483647));
			//计算余数
			lastExp = Math.floor((calcExp % 2147483647));
			//根据计算次数多次给予经验
			for(var i = 0; i<expNum; i++) {
				cm.gainExp(2147483647);
			}
			//给予余数经验
			cm.gainExp(lastExp);
		} else {
			cm.gainExp(calcExp);
		}
		cm.warp(744000000);
		cm.worldSpouseMessage(0x17,"[枫之高校] : 【"+ cm.getChar().getName() +"】成功通关，获得大量经验,大量奖励！  ");
		cm.sendOk("恭喜你获得了15个#v2431893#和10个#v2430915#和50个#v4310129#以及大量经验");
		cm.dispose();
	} else {
		cm.dispose();
		cm.sendOk("请检查地图上是否还存在怪物，否则无法领取奖励！");
	}
}