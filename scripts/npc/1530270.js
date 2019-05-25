var status = 0;
var ay = "#fUI/CashShop.img/CSBeauty/eyeColor/Enable/2#"; //蓝色方块
function start() {
	status = -1;
	action(1, 0, 0);
}

function action(mode, type, selection) {
	if (mode == -1) {
		cm.dispose();
	} else {
		if (status >= 0 && mode == 0) {
			cm.sendOk("好的,如果你想好了要做什么,我会很乐意的为你服务的..");
			cm.dispose();
			return;
		}
		if (mode == 1) {
			status++;
		} else {
			status--;
		}
		if (status == 0) {
			cm.sendSimple("#d请选择你需要的传送：\r\n\r\n#L1#"+ay+" #b[地图]战甲吹泡泡鱼#r（可爆内存卡）\r\n#l#L2#" + ay + " #b[地图]红色枫叶/换极品卷轴#r（危险，新手不要去）\r\n#l#L3#" + ay + " #b[地图]荣誉勋章/升级内在能力#r（危险！声望）\r\n#l#L4#" + ay + " #b[地图]力量母矿系列#r（140级装备需要，危险！！！）\r\n#l#L5#" + ay + " #b[地图]漂漂猪海岸#r（可获得 猪头）\r\n#l#L6#" + ay + " #b[地图]时间异常之地#r（可获得 绿帽海贼的发动机）\r\n#l#L7#" + ay + " #b[地图]灼热峡谷#r（可获得 变形的尖牙）\r\n#l#L8#" + ay + " #b[地图]苔藓树林西部森林2#r（可获得 青苔石）#l\r\n");
		} else if (status == 1) {
			if (selection == 1) {
				cm.dispose();
				cm.warp(221020701);
			} else if (selection == 2) {
				cm.dispose();
				cm.warp(273010000);
			} else if (selection == 3) {
				cm.dispose();
				cm.warp(273030300);
			} else if (selection == 4) {
				cm.dispose();
				cm.warp(273060100);
			} else if (selection == 5) {
				cm.dispose();
				cm.warp(120000400);
			} else if (selection == 6) {
				cm.dispose();
				cm.warp(220060201);
			} else if (selection == 7) {
				cm.dispose();
				cm.warp(273030000);
			} else if (selsection == 8) {
				cm.dispose()
				cm.warp(300010200);
			}
		}
	}
}
