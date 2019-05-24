/*
	任务: 特殊课程中级生
	描述: 消灭了过去在实验室中见到过的黑色之翼席勒。通过执行任务，逐渐成长为一名真正的反抗者。
	获得: 1142243 - 特别课程初级生
*/
var status = -1;

function start(mode, type, selection) {
    if (qm.canHold(1142243, 1) && qm.getPlayer().getLevel() >= 10 && ((qm.getPlayer().getJob() / 1000) | 0) == 3) {
        qm.forceStartQuest();
        qm.forceCompleteQuest();
        qm.gainItem(1142243, 1);
    }
    qm.dispose();
}

function end(mode, type, selection) {
    if (qm.canHold(1142243, 1) && qm.getPlayer().getLevel() >= 10 && ((qm.getPlayer().getJob() / 1000) | 0) == 3) {
        qm.forceStartQuest();
        qm.forceCompleteQuest();
        qm.gainItem(1142243, 1);
    }
    qm.dispose();
}