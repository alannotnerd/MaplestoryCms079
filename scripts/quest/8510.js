var status = -1;

function start(mode, type, selection) {
	qm.sendNext("謝謝你。");
	qm.forceCompleteQuest();
	qm.dispose();
}
function end(mode, type, selection) {
	qm.dispose();
}
