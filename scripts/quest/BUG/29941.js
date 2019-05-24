/*
	任务: 特殊课程新生
	描述: 成为了反抗者的一员。 虽然现在伪装成了特殊课程，但总有一天会消灭黑色之翼，夺回村庄。
	获得: 1142242 - 特别课程新生
*/
var status = -1;

function start(mode, type, selection) {
    if (qm.canHold(1142242, 1) && qm.getPlayer().getLevel() >= 10 && ((qm.getPlayer().getJob() / 1000) | 0) == 3) {
        qm.forceStartQuest();
        qm.forceCompleteQuest();
        qm.gainItem(1142242, 1);
    }
    qm.dispose();
}

function end(mode, type, selection) {
    if (qm.canHold(1142242, 1) && qm.getPlayer().getLevel() >= 10 && ((qm.getPlayer().getJob() / 1000) | 0) == 3) {
        qm.forceStartQuest();
        qm.forceCompleteQuest();
        qm.gainItem(1142242, 1);
    }
    qm.dispose();
}