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
			if(qm.getQuestStatus(4769)==2){
			qm.sendOk("���Ѿ���ȡ������������Ŭ����71�����Ի�ø��ཱ���");
			qm.forceCompleteQuest(4769);
			qm.dispose();
			}else{
			qm.sendNext("��ϲ�㵱ǰ�ȼ��Ѿ�����#b70#k����");
			}
		} else if (status == 1) {
			qm.sendOk("��ϲ��ȼ��ﵽ��#r70#k�������Ѿ���ʽ����Gogoð�յ���һ�������ˣ�����ԱΪ������������=1000�㣬ף����Gogoð�յ�����������������۷壡\r\n\r\n#fUI/UIWindow.img/QuestIcon/4/0#\r\n#v4310057# x 1����#v4001215# x 2�������=100W�����=1000��");
			qm.gainItem(4310057, 1);
			qm.gainItem(4001215, 2);
			qm.gainNX(1000);
			qm.gainMeso(1000000);
			qm.forceCompleteQuest(4769);
			qm.dispose();
		} 
	}
}
