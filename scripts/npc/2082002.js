function start() {
    status = -1;
    action(1, 0, 0);
}

function action(mode, type, selection) {
    status++;
    if(mode == 0) {
	cm.sendOk("�ܰ�ࡣ����뿪��");
	cm.dispose();
	return;
    }
    if(status == 0) {
	cm.sendYesNo("��Ҫ�뿪���ϣ�");
    } else if(status == 1) {
	cm.warp(240000110, 0);
	cm.dispose();
    }
}
