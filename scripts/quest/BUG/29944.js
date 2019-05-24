/*
	任务: 特殊课程最高级生
	描述: 救出了被关起来的转职官，击败了黑色之翼的新武器。继续积聚力量，一定可以完全消灭黑色之翼。
	获得: 1142245 - 特别课程高级生
*/
var status = -1;

function start(mode, type, selection) {
    if (qm.canHold(1142245, 1) && qm.getPlayer().getLevel() >= 10 && ((qm.getPlayer().getJob() / 1000) | 0) == 3) {
        qm.forceStartQuest();
        qm.forceCompleteQuest();
        qm.gainItem(1142245, 1);
    }
    qm.dispose();
}

function end(mode, type, selection) {
    if (qm.canHold(1142245, 1) && qm.getPlayer().getLevel() >= 10 && ((qm.getPlayer().getJob() / 1000) | 0) == 3) {
        qm.forceStartQuest();
        qm.forceCompleteQuest();
        qm.gainItem(1142245, 1);
    }
    qm.dispose();
}