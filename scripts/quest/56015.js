/**
 *	1级奖励
 */
var status = -1;

function start(mode, type, selection) {
    status++;
    if (status == 0) {
        if (qm.isQuestFinished(56015)) {
            qm.dispose();
        } else {
            qm.sendOk("恭喜! 你获得了#v2022457# x 50。");
            qm.gainItem(2022457, 50);
            qm.completeQuest();
            qm.dispose();
        }
    }
}