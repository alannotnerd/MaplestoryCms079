/*
	任务: 特殊课程毕业生
	描述: 达到了200级。成长结束……但是黑色之翼还没有消失。在击败黑色之翼，拯救埃德尔斯坦之前，战斗还将继续。
	获得: 1142246 - 特别课程毕业生
*/
var status = -1;

function start(mode, type, selection) {
    if (qm.getPlayer().getLevel() >= 200 && ((qm.getPlayer().getJob() / 1000) | 0) == 3) {
        if (!qm.haveItem(1142246, 1) && qm.canHold(1142246, 1)) {
            qm.gainItem(1142246, 1);
        }
        qm.forceStartQuest();
        qm.forceCompleteQuest();
    }
    qm.dispose();
}

function end(mode, type, selection) {
    if (qm.getPlayer().getLevel() >= 200 && ((qm.getPlayer().getJob() / 1000) | 0) == 3) {
        if (!qm.haveItem(1142246, 1) && qm.canHold(1142246, 1)) {
            qm.gainItem(1142246, 1);
        }
        qm.forceStartQuest();
        qm.forceCompleteQuest();
    }
    qm.dispose();
}