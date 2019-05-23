var status = -1;
//TEMPORARY QUEST NOW SKIPPING
//this quest is AFTER SHEDDING 1
function start(mode, type, selection) {
	qm.gainItem(1142157,1);
	qm.removeAll(4032503);
	qm.completeQuest();
	qm.dispose();
}

function end(mode, type, selection) {
	qm.completeQuest();
	qm.dispose();
}