/**
 *	��Ӱ˫���ﵽ40����
 */
var status = -1;

function start(mode, type, selection) {
    if (mode == 1) {
        status++;
    } else {
        if (status == 0) {
            qm.dispose();
            return;
        }
        status--;
    }
    if (status == 0) {
        qm.sendNext("��Ӱ˫���ﵽ��40����\r\n\r\n#fUI/UIWindow.img/QuestIcon/4/0#\r\n\r\n#i3800008# èͷӥͼ�� 1����\r\n\r\n#i1012188# #t1012188# 1����");
    } else if (status == 1) {
        if (qm.isQuestFinished(10612)) {
            qm.dispose();
        } else {
            qm.sendOk("��ȡ�ɹ��ˡ�");
            qm.gainItem(1012188, 1); //��ɫ���
            qm.gainItem(3800008, 1); //èͷӥͼ��
            qm.forceCompleteQuest();
            qm.dispose();
        }
    }
}