var status = 0;
var cost = 3000;
function start() {
    cm.sendYesNo("�����Ƿ���ȥ�Ϻ�̲?? 3000���һ��~~~~");
}

function action(mode, type, selection) {
    if (mode != 1) {
        if (mode == 0)
        cm.sendOk("��Ȼ�㲻Ҫ�Ǿ�����~~~");
        cm.dispose();
        return;
    }
    status++;
    if (status == 1) {
		if(cm.getMeso() < cost) {
		cm.sendOk("��ûǮ����ȥ�Ϻ�̲!!");
		cm.dispose();
		} else {
		cm.gainMeso(-cost);
		cm.warp(701000100, 0);
        cm.dispose();
    }
}
}