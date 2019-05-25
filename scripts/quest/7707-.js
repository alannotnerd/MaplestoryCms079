/*
	零点重置任务
*/

var status = -1;

function start(mode, type, selection) {
    qm.forceStartQuest();
	qm.enableActions();
    qm.dispose();
}

function end(mode, type, selection) {
    qm.completeQuest();
    qm.dispose();
}