var status = 0;
var ao = "#fEffect/CharacterEff/1022223/2/0#"; //星光蓝2
function start() {
	status = -1;
	action(1, 0, 0);
}

function action(mode, type, selection) {
	if (mode == -1) {
		cm.dispose();
	} else {
		if (mode == 1)
			status++;
		else
			status--;
		if (status == -1) {
			cm.dispose();
		} else if (status == 0) {
			var selStr = "#k您好，请选择你需要的功能：#r（注意背包位置和空间）\r\n\r\n";
			selStr += "#L0#"+ao+"#d双倍道具#l  #L1#"+ao+"稀有椅子#l  #L2#"+ao+"极品卷轴#l\r\n";
					selStr += "#L3#"+ao+"喇叭出售#l  #L4#"+ao+"伤害皮肤#l  #L5#"+ao+"顶级副手#l\r\n";
					selStr += "#L6#"+ao+"上层装备#l  #L7#"+ao+"稀有骑宠#l  #L8#"+ao+"巨匠装备#l\r\n";
					selStr += "#L9#"+ao+"魔方，火花，其他#l  #L10#"+ao+"装备图腾#l\r\n";
			cm.sendSimple(selStr);
		} else if (status == 1) {
			switch (selection) {
			case 0:
				cm.dispose();
				cm.openNpc(9900002, 11);
				break;
			case 1:
				cm.dispose();
				cm.openNpc(2120025);
				break;
			case 2:
				cm.dispose();
				cm.openNpc(9000069, 7);
				break;
			case 3:
				cm.dispose();
				cm.openNpc(9900002, 12);
				break;
			case 4:
				cm.dispose();
				cm.openNpc(1540660);
				break;
			case 5:
				cm.dispose();
				cm.openNpc(9310169);
				break;
			case 6:
				cm.dispose();
				cm.openNpc(9000069, 8);
				break;
			case 7:
				cm.dispose();
				cm.openNpc(9310376);
				break;
			case 8:
				cm.dispose();
				cm.openNpc(9900004, 12);
				break;
			case 9:
				cm.dispose();
				cm.openNpc(9900004, 18);
				break;
			case 10:
				cm.dispose();
				cm.openNpc(9900004, 20);
				break;	
			}
		}
	}
}
