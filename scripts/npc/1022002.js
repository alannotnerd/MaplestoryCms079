var status = 0;

function start() {
	status = -1;
	action(1, 0, 0);
}

function action(mode, type, selection) {
	if (mode == -1) {
		cm.dispose();
	} else {
		if (status >= 0 && mode == 0) {
			cm.sendOk("�������Ǹ�������ϧ�������ˡ����������ң����߰ɡ�");
			cm.dispose();
			return;
		}
		if (mode == 1)
			status++;
		else
			status--;
		if (status == 0) {
			cm.sendYesNo("ʲô��������ս����ֵķ�ӡ������������Сë��ȥ��ս�Ļ����ܿ��ܻᶪ�����������������ҵ���ûʲô��ϵ��һ����Ҫ#b10000���#k�������ѣ���Ӧ���аɣ�");
		} else if (status == 1) {
			if (cm.getLevel() >= 50) {
				if (cm.getMeso() < 10000) {
					cm.sendOk("���Ǯ��û�У�����һ����ֵ��ˣ����߿���");
					cm.dispose();
				} else {
					cm.sendNext("�ã���ɱ�Թ�ҡ�����֮����ȥ���ҵ�ͽ��#b��Ӱ#k���Ϳ��Բμ�Զ���ӡ�");
				}
			} else {
				cm.sendOk("û�ﵽ50����Сë����ȥ������ʸ�û�С����߿���");
				cm.dispose();
			}
		} else if (status == 2) {
			cm.gainMeso(-10000);
			cm.warp(100000204);
			cm.dispose();
		}
	}
}