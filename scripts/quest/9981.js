importPackage(net.sf.cherry.client);

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
			qm.sendNext("ף����Ŭ����������Ϊ������ף�أ�������һ����Ҷ��ϣ��������#r#eð�յ�#k#k�ȹ�����һ�졫\r\n\r\n#fUI/UIWindow.img/QuestIcon/4/0#\r\n#v4001126# 29��");
		} else if (status == 1) {
			qm.forceCompleteQuest(9981);
			qm.gainItem(4001126, 29);
			qm.dispose();
		}
	}
}
