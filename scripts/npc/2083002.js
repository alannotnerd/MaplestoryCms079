/*
	Crystal of Roots - Leafre Cave of life
 */

var status = -1;

function action(mode, type, selection) {
	if (mode == -1) {
		cm.dispose();
	} else {
		if (status < 1 && mode == 0) {
			cm.sendOk("�ã���Ҫ��ʱ���������ҡ�");
			cm.dispose();
			return;
		}
    if (mode == 1) {
        status++;
    } else {
        status--;
    }
    if (status == 0) {
        if (cm.getMapId() == 240050400) {
            cm.sendYesNo("�����뿪���ﵽ #m240040700# ��?");
        } else {
            cm.sendYesNo("�����뿪���ﵽ #m240040700# ��?");
        }
    } else if (status == 1) {
        if (cm.getMapId() == 240050400) {
            cm.warp(240040700, 0);
			cm.dispose();
        } else {
            cm.warp(240040700, 0);
			cm.dispose();
        }
        cm.dispose();
    }
}
}