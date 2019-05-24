/*
	任务: 英雄的后裔
	描述: 获得了阿弗利埃过去的英雄龙神弗里德使用过的勋章。被认可为#b英雄的后裔#k。
*/
var status = -1;

function start(mode, type, selection) {
    if (qm.getPlayer().getLevel() >= 10 && ((qm.getPlayer().getJob() / 100) | 0) == 22) {
        qm.forceStartQuest();
        qm.forceCompleteQuest();
    }
    qm.dispose();
}

function end(mode, type, selection) {
    if (qm.getPlayer().getLevel() >= 10 && ((qm.getPlayer().getJob() / 100) | 0) == 22) {
        qm.forceStartQuest();
        qm.forceCompleteQuest();
    }
    qm.dispose();
}