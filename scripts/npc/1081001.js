/**
	Pison - Florina Beach(110000000)
**/
var status = -1;
var returnmap = -1;

function action(mode, type, selection) {
    if (mode == 1) {
	status++;
    } else {
	cm.sendNext("�㲻��ȥ #m"+returnmap+"# ������̫����!\r\n����������߻����ǹ��úúã����㽲���·�ص�����ǰ��!");
	cm.safeDispose();
	return;
    }
    if (status == 0) {
	returnmap = cm.getSavedLocation("FLORINA");
	cm.sendSimple("���������뿪 #b#m110000000##k? ��������ҿ��԰�����ص� #b#m"+returnmap+"##k. ������Ҫ1500��� r\n\r\n#L0##b ��Ը�⸶ 1500 ���.#l");
    } else if (status == 1) {
	cm.sendYesNo("��ȷ������ص� #b#m"+returnmap+"##k? �ðɣ����ǵ��߿����");
    } else if (status == 2) {
	if (cm.getMeso() < 1500) {
		cm.sendOk("�����Ҳ���Ү!");
		cm.dispose();
	} else {
	if (returnmap < 0) {
		returnmap = 104000000;
	}
	cm.gainMeso(-1500);
	cm.warp(returnmap, 0);
	cm.clearSavedLocation("FLORINA");
	cm.dispose();
    }
}
}