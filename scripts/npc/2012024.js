/*
	Egnet - Before Takeoff To Ariant(200000152)
*/

var status = -1;

function action(mode, type, selection) {
    if (mode == 1) {
	status++;
    } else {
	cm.sendOk("���Ǻõ�ѡ�񣡣�");
	cm.safeDispose();
	return;
    }
    if (status == 0) {
	cm.sendYesNo("��Ҫ�뿪����??");
    } else if (status == 1) {
	cm.warp(200000151);
	cm.dispose();
    }
}