/*
	任务: 特殊课程高级生
	描述: 破坏了夺走埃德尔斯坦的能量的能量传送装置。黑色之翼到底在策划什么阴谋呢……
	获得: 1142244 - 特别课程中级生
*/
var status = -1;

function start(mode, type, selection) {
    if (qm.canHold(1142244, 1) && qm.getPlayer().getLevel() >= 10 && ((qm.getPlayer().getJob() / 1000) | 0) == 3) {
        qm.forceStartQuest();
        qm.forceCompleteQuest();
        qm.gainItem(1142244, 1);
    }
    qm.dispose();
}

function end(mode, type, selection) {
    if (qm.canHold(1142244, 1) && qm.getPlayer().getLevel() >= 10 && ((qm.getPlayer().getJob() / 1000) | 0) == 3) {
        qm.forceStartQuest();
        qm.forceCompleteQuest();
        qm.gainItem(1142244, 1);
    }
    qm.dispose();
}