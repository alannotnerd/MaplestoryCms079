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
			if(qm.getQuestStatus(4762)==2){
			qm.sendOk("���Ѿ���ȡ������������Ŭ����15�����Ի���½����");
						qm.forceCompleteQuest(4762);
			qm.dispose();
			}else{
			qm.sendNext("��ϲ�㵱ǰ�ȼ��Ѿ�����#b10#k����");
			}
		} else if (status == 1) {
			qm.sendOk("��ϲ��ȼ��ﵽ��#r10#k�������Ѿ���ʽ̤����Gogoð�յ������̣�������˧��˧�����ԱΪ������������=100�㣬��������̳����й���˫��Ŷ��\r\n\r\n#fUI/UIWindow.img/QuestIcon/4/0#\r\n20��ҡ����=100��");
			qm.gainMeso(200000);
			qm.gainNX(100);
			qm.forceCompleteQuest(4762);
			qm.dispose();
		} 
	}
}
