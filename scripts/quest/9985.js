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
				qm.sendNext("�����Ŀ���죬�Һ����Ѿ���������ð�յ��ǽ���ʲô����˵�Ҹò������������õİɣ���ô���أ�������Ҫ��������ǣ���˵ð�յ��ǽ��п��ܻḯʴ#t01012098#���������о�ͦ�����ĵġ�");
			}
		} else if (status == 1) {
			qm.sendNextPrev("�Ǻǣ�������Ц��������Ϊ������������һ�����ϣ����ϲ������Ȼ����ʲô�ö����������������Ҳ���кܺõ�Ч����");
		} else if (status == 2) {
			qm.sendNextPrev("���������������ҵķ�Ҷ�������ñ�ӡ�ϣ������ϲ��~��\r\n\r\n#fUI/UIWindow.img/QuestIcon/4/0#\r\n#v1002419# 1 #t1002419# \r\n\r\n#fUI/UIWindow.img/QuestIcon/8/0# 3000 exp");
		} else if (status == 3) {
			qm.gainExp(3000);
			qm.gainItem(1002419, 1);
			qm.gainItem(4001126, -25);
			qm.forceCompleteQuest(9985);
			qm.dispose();
		}
	}
}
