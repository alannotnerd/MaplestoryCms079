/*
	Hikari - Showa Town(801000000)
*/

var status = -1;

function start() {
    action(1,0,0);
}

function action(mode, type, selection) {
    if (mode == 1)
	status++;
    else {
	cm.sendOk("��Ҫ�ĕr���ف����ҡ�");
	cm.dispose();
	return;
    }
    if (status == 0) {
	cm.sendYesNo("�����M�����ã� "+300+" ����");
    } else if (status == 1) {
	if (cm.getMeso() < 300) {
	    cm.sendOk("Ո�_�J�ǲ����� "+300+" ���š�");
	} else {
	    cm.gainMeso(-300);
	    if (cm.getPlayerStat("GENDER") == 0) {
		cm.warp(801000100);
	    } else {
		cm.warp(801000200);
	    }
	}
	cm.dispose();
    }
}
