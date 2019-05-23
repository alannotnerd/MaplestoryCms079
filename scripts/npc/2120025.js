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
			var selStr = "#k您好，请选择你需要的服务：\r\n\r\n";
			selStr += "#L0#"+ao+"#r情侣椅子#l  #L1#"+ao+"封面椅子#l  #L2#"+ao+"抱枕椅子#l\r\n";
			selStr += "#L3#"+ao+"134 椅子#l  #L4#"+ao+"超炫椅子#l\r\n";
			cm.sendSimple(selStr);
		} else if (status == 1) {
			switch (selection) {
			case 0:
				cm.dispose();
				cm.openNpc(9900003, 20);
				break;
			case 1:
				cm.dispose();
				cm.openNpc(9900003, 25);
				break;
			case 2:
				cm.dispose();
				cm.openNpc(9900003, 26);
				break;
			case 3:
				cm.dispose();
				cm.openNpc(9900003, 27);
				break;
			case 4:
				cm.dispose();
				cm.openNpc(9900003, 28);
				break;	
			}
		}
	}
}
