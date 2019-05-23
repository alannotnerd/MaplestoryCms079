function start() {	
	action(1, 0, 0);
}

function action(mode, type, selection) {
    if (cm.isQuestActive(2236)) {
	cm.forceCompleteQuest(2236);
	cm.removeAll(4032263);
	cm.sendOk("Quest completed.");
    }
    cm.dispose();
}