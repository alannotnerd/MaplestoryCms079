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
			qm.sendAcceptDecline("��ֵ����ڼ䣬��׼���˺ܶ�����ʴ��⡣��Ҫ��Ҫ�μӣ�");
		} else if (status == 1) {
			qm.forceStartQuest(9991);
			qm.sendNext("����������ûʱ�䣬���һ���������Ұɡ�");
		} else if (status == 2) {
			qm.dispose();
		}
	}
}
