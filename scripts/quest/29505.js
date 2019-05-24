var status = -1;

function start(mode, type, selection) {
	qm.sendNext("謝謝你完成此任務\r\n如果還會看此任務請重登。");
	//qm.gainItem(1142077, 1);
	qm.forceCompleteQuest();
	qm.dispose();
}

function end(mode, type, selection) {
	qm.forceCompleteQuest();
	qm.dispose();
}
