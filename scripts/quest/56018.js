/**
 *	10������
 */
var status = -1;

function start(mode, type, selection) {
    status++;
    if (status == 0) {
        if (qm.isQuestFinished(56018)) {
            qm.dispose();
        } else {
            qm.sendOk("��ϲ! ������#v2022457# x 100��");
            qm.gainItem(2022457, 100);
            qm.forceCompleteQuest();
            qm.dispose();
        }
    }
}