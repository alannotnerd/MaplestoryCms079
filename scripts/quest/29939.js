/*
	任务: 龙神
	描述: 获得了更强的鳞片，制作出了发出金光的#b龙神#k勋章。
*/
var status = -1;

function start(mode, type, selection) {
    if (qm.getPlayer().getLevel() >= 10 && ((qm.getPlayer().getJob() / 100) | 0) == 22) {
        if (qm.canHold(1142157, 1) && !qm.haveItem(1142157, 1)) {
            qm.gainItem(1142157, 1);
        }
        qm.forceStartQuest();
        qm.forceCompleteQuest();
    }
    qm.dispose();
}

function end(mode, type, selection) {
    if (qm.getPlayer().getLevel() >= 10 && ((qm.getPlayer().getJob() / 100) | 0) == 22) {
        if (qm.canHold(1142157, 1) && !qm.haveItem(1142157, 1)) {
            qm.gainItem(1142157, 1);
        }
        qm.forceStartQuest();
        qm.forceCompleteQuest();
    }
    qm.dispose();
}