/**
 *	��Ӱ˫���ﵽ50����
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
        qm.sendNext("��Ӱ˫���ﵽ��50����\r\n\r\n#fUI/UIWindow.img/QuestIcon/4/0#\r\n\r\n#i3800008# èͷӥͼ�� 1����\r\n\r\n#i2040121# #t2040121# 1����");
    } else if (status == 1) {
        if (qm.isQuestFinished(10613)) {
            qm.dispose();
        } else {
            qm.sendOk("��ȡ�ɹ��ˡ�");
            qm.gainItem(2040121, 1); //��Ӱ˫�����ܾ���
            qm.gainItem(3800008, 1); //èͷӥͼ��
            qm.forceCompleteQuest();
            qm.dispose();
        }
    }
}