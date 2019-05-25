
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
			selStr += "#L0#"+ao+"#d兑换道具#l  #L1#"+ao+"巨匠装备#l  #L2#"+ao+"职业副手#l\r\n\r\n";
			selStr += "#L3#"+ao+"抵用时装#l  #L4#"+ao+"绝版椅子#l  #L5#"+ao+"抵用机器人#l\r\n";
			cm.sendSimple(selStr);
		} else if (status == 1) {
			switch (selection) {
			case 0:
				cm.dispose();
				cm.openNpc(9900003, 16);
				break;
			case 1:
				cm.dispose();
				cm.openNpc(9900004,12);
				break;
			case 2:
				cm.dispose();
				cm.openNpc(1540104);
				break;
			case 3:
				cm.dispose();
				cm.openNpc(9900004, 11);
				break;
			case 4:
				cm.dispose();
				cm.openNpc(9900004, 8);
				break;
			case 5:
				cm.dispose();
				cm.openNpc(9900004, 10);
				break;	
			}
		}
	}
}
