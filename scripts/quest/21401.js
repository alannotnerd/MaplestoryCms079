var status = -1;

function start(mode, type, selection) {
	if (mode == -1) {
		qm.dispose();
	} else {
		if (mode == 1)
			status++;
		else
			status--;
		if (status == 0) {
			qm.sendAcceptDecline("����������˵���Ǹ���ӣ��������ȽϱȽϣ�˭����");
		} else if (status == 1) {
			qm.openNpc(1201001,2);
			//qm.forceCompleteQuest();
			qm.dispose();
		}else{
			qm.dispose();
}
	}
}
