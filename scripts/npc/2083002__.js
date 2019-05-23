function start() {
	status = -1;
	action(1, 0, 0);
}

function action(mode, type, selection) {
	if (mode == -1) {
		cm.dispose();
	} 
	else {
		if (mode == 0) {
			var instance = cm.isPlayerInstance();
			if (instance == false) cm.sendOk("Good luck on defeating Horntail!");
			else cm.sendOk("Good luck on completing the Boss Quest!");
			cm.dispose();
			return;
		}
		if (mode == 1)
			status++;
		else
			status--;
		if (status == 0) {
			var instance = cm.isPlayerInstance();
			if (instance == false) cm.sendSimple("What would you like to do? \r\n #L0#Return to the entrance of the Cave of Life#l");
			else cm.sendSimple("What would you like to do? \r\n #L0#Leave the Boss Quest#l");
		} 
		else if (status == 1) {
			cm.sendYesNo("Are you sure you want to do that? You won't be able to come back!");
		}
		else if (status == 2) {
			var instance = cm.isPlayerInstance();
			if (instance == false) cm.warp(240050000);
			else cm.removePlayerFromInstance();
			cm.dispose();
			return;
		} 
	}
}
