/*
	任务: 废都荣誉市民
	描述: 帮助内拉洗刷了废都的污名，成为了#b废都荣誉市民#k。
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