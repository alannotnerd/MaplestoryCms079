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
			if(qm.getQuestStatus(4771)==2){
			qm.sendOk("��Ľ����Ѿ�ȫ����ȡ�ꡣ");
						qm.forceCompleteQuest(4771);
			qm.dispose();
			}else{
			qm.sendNext("��ϲ�㵱ǰ�ȼ��Ѿ�����#b72#k����");
			}
		} else if (status == 1) {
			qm.sendOk("��ϲ����ϵͳ������\r\n\r\n#fUI/UIWindow.img/QuestIcon/4/0#\r\n#v5390002# x 1��");
			qm.gainItem(5390002, 1);
			qm.forceCompleteQuest(4771);
			qm.dispose();
		} 
	}
}
