/*
	Erin - Before Takeoff To Ellinia(200000112)
*/

function start() {
    status = -1;
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
	cm.warp(200000111, 0);
	cm.dispose();
    }
}