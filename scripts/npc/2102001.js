/*
	Slyn - Before Takeoff To Orbis(260000110)
*/

var gm;

function start() {
    status = -1;
    gm = cm.getEventManager("Geenie");
    action(1, 0, 0);
}

function action(mode, type, selection) {
    status++;
    if(mode == 0) {
	cm.sendOk("���Ǻõ�ѡ�񣡣�");
	cm.dispose();
	return;
    }
    if(status == 0) {
	cm.sendYesNo("��Ҫ�뿪����??");
    } else if(status == 1) {
	cm.warp(260000100);
	cm.dispose();
    }
}
