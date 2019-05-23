var status = -1;

function start(mode, type, selection) {
	qm.sendNext("Go back to Erev to report about the situation.");
	qm.forceStartQuest();
	qm.completeQuest();
	qm.dispose();
}

function end(mode, type, selection) {
	qm.forceStartQuest();
	qm.completeQuest();
	qm.dispose();
}