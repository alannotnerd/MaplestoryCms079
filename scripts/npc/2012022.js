var status = -1;

function action(mode, type, selection) {
    status++;
    if (mode == 0) {
	cm.sendOk("���Ǻõ�ѡ�񣡣�");
	cm.safeDispose();
	return;
    }
    if (status == 0) {
	cm.sendYesNo("��Ҫ�뿪����??");
    } else if(status == 1) {
	cm.warp(200000131, 0);
	cm.dispose();
    }
}