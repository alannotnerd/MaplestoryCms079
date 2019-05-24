/*
	任务: 秘密团体临时成员
	描述: 按照留下的人偶的指示，通过了秘密团体加入测试，成为了#b秘密团体临时成员#k。
*/
var status = -1;

function start(mode, type, selection) {
    if (qm.getPlayer().getLevel() >= 10 && (qm.getPlayer().getJob() / 100) | 0 == 22) {
        qm.forceStartQuest();
        qm.forceCompleteQuest();
    }
    qm.dispose();
}

function end(mode, type, selection) {
    if (qm.getPlayer().getLevel() >= 10 && (qm.getPlayer().getJob() / 100) | 0 == 22) {
        qm.forceStartQuest();
        qm.forceCompleteQuest();
    }
    qm.dispose();
}