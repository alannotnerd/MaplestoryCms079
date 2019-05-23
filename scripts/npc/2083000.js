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
			cm.sendOk("I envy your wise choice, Horntail is an overwhelming power. If you do change your mind, speak to me at any time.");
			cm.dispose();
			return;
		}
		if (mode == 1)
			status++;
		else
			status--;
		if (status == 0) {
			if (cm.getPlayer().getLevel() < 80) {
				cm.sendOk("The slate has a message written on it, however you cannot work out its meaning.");
				cm.dispose();
				return;
			}
			else {
				if (cm.haveItem(4001086)) {
					cm.sendYesNo("Welcome young warrior to the Cave of Life. It seems you are a member of the Dragon Squad and are highly commendable. Do you want me to take you directly to the \r\n     entrance of the mighty Horntail's cave?");
				}
				else {
					cm.sendOk("The slate lights up a hidden message: \r\n#bWelcome stranger to the Cave of Live. To proceed, you  \r\n	must prove yourself to Moira, leader of the Dragon Squad.");
					cm.dispose();
					return;
				}
			}
		} 
		else if (status == 1) {
			cm.warp(240050400);
			cm.dispose();
			return;
		}
	}
}
