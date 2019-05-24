var status = -1;

function start(mode, type, selection) {
	if (mode == -1) {
		qm.dispose();
	} else {
		if (mode == 1)
			status++;
		else
			status--;
		if (status == 0) {
			qm.sendAcceptDecline("…………听说你是个神坑，我想和你比较比较，谁更坑");
		} else if (status == 1) {
			qm.openNpc(1201001,2);
			//qm.forceCompleteQuest();
			qm.dispose();
		}else{
			qm.dispose();
}
	}
}
