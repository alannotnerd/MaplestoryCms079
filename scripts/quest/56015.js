/**
 *	1������
 */
var status = -1;

function start(mode, type, selection) {
    status++;
    if (status == 0) {
        if (qm.isQuestFinished(56015)) {
            qm.dispose();
        } else {
            qm.sendOk("��ϲ! ������#v2022457# x 50��");
            qm.gainItem(2022457, 50);
            qm.forceCompleteQuest();
            qm.dispose();
        }
    }
}