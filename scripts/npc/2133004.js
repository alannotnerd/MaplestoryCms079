var status = -1;

function action(mode, type, selection) {
    if (mode == 1) {
	status++;
    } else {
	status--;
    }
    switch(cm.getPlayer().getMapId()) {
	case 930000500:
            if (!cm.canHold(4001163, 1)) {
	    	cm.sendNext("���������޷���ȡ��.");
	    } else {
		cm.givePartyExp(100000);
		cm.warpParty(930000600);
                cm.gainItem(4001163,+1);//
cm.����(2, "[" + cm.getPlayer().getName() + "]���������롾��������BOSS��ͼ��������ף�����ǰɣ���");
	    }
	    break;
    }
    cm.dispose();
}