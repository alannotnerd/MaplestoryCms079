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
			if(qm.getQuestStatus(4764)==2){
			qm.sendOk("���Ѿ���ȡ������������Ŭ����30�����Ի���½����");
			qm.forceCompleteQuest(4764);
			qm.dispose();
			}else{
			qm.sendNext("��ϲ�㵱ǰ�ȼ��Ѿ�����#b20#k����");
			}
		} else if (status == 1) {
			qm.sendOk("��ϲ��ȼ��ﵽ��#r20#k����Gogoð�յ���ϵĻ�ӭ��ĵ���������ԱΪ����������һ��װ�����޾�������ڴ�����������һ�ѣ�ʹ��ʱ�䣺һ��ʹ��Ȩ��\r\n\r\n#fUI/UIWindow.img/QuestIcon/4/0#\r\n#v5220007# 1��");
			qm.gainItem(5220007, 1);
			qm.forceCompleteQuest(4764);
			qm.dispose();
		} 
	}
}
