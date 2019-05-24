var status = -1;
var npc = -1;
var modes = 0;

function start(){
	action(1, 0, 0);	
}

function action(mode, type, sel){
	
	if (mode == 0 && status != 0){
		status--;
	} else if (mode == 1) {
		status++;
	} else {
		cm.dispose();
		return;
	}
	
	if (status == 0){
		var msg = "��ѡ����Ҫ��#d����\r\n\r\n";
		msg += "#L1##r�������#l\r\n";
		msg += "#L0##b��������͸���#l\r\n";
		cm.sendSimple(msg);
	} else if (status == 1) {
		switch(sel){
			case 0:
				npc = 9310071;
				modes = 4;
				break;
			case 1:
				npc = 1032102;
				modes = 1;
				break;
			default :
				cm.sendNext("Error : " + sel);
				cm.dispose();
				break;
		}
		if (modes == 0) {
			cm.dispose();
			cm.openNpc(npc);
			return
		} else {
			cm.dispose();
			cm.openNpc(npc, modes);
			return
		}
		
	} else {
		cm.dispose();
	}
	
}