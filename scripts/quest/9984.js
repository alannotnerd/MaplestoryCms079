var status = -1;

function end(mode, type, selection) {
	if (mode == -1) {
		qm.dispose();
	} else {
		if (mode == 1)
			status++;
		else
			status--;
		if (status == 0) {
			if (qm.getPlayer().getHp() < 50) {
				qm.sendNext("���Ƶĺܰ�");
				qm.dispose();
			} else {
				qm.sendNext("���Ѿ��ռ���#b50����Ҷ#k��ѽ�����������֪���ѷ�Ҷ����������ʲô����Ľ���ɡ������ھ͸����㡣Ҳûɶ�ô�����");
			}
		} else if (status == 1) {
			qm.sendNextPrev("�Ǻǣ�˵Ц�ġ���ô��û�����ء���Ϊ������������һ�����ϣ����ϲ������Ȼ����ʲô�ö����������������Ҳ���кܺõ�Ч����");
		} else if (status == 2) {
			qm.sendNextPrev("���������������ҵķ�Ҷ������Ķ�����ϣ������ϲ��~��\r\n\r\n#fUI/UIWindow.img/QuestIcon/4/0#\r\n#v1032035# 1 #t1032035# \r\n\r\n#fUI/UIWindow.img/QuestIcon/8/0# 5000 exp");
		} else if (status == 3) {
			qm.gainExp(5000);
			qm.gainItem(1032035, 1);
			qm.gainItem(4001126, -50);
			qm.forceCompleteQuest(9984);
			qm.dispose();
		}
	}
}
