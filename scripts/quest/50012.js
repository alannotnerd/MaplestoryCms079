/*
	����: ħ������ѧ��������Դ
	����: #o9400295#Ҳ���Զ�ȡ���ڻ���״̬��#p9120030#�����壬��αװ��#p9120030#����־������#o9400296#�����ұ��뾡�콫���¸���#p9120025#��
*/

function start(mode, type, selection) {
    qm.dispose();
}

function end(mode, type, selection) {
    if (qm.getQuestStatus(50012) == 0) {
        qm.forceStartQuest();
    } else {
        qm.forceCompleteQuest(50015);
        qm.forceCompleteQuest();
    }
    qm.dispose();
}