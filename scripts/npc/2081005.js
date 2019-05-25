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
			cm.sendOk("I envy your wise choice. If you do change your mind, speak to me at any time.");
			cm.dispose();
			return;
		}
		if (mode == 1)
			status++;
		else
			status--;
		if (status == 0) {
			if (cm.getPlayer().getBuffedValue(net.sf.cherry.client.MapleBuffStat.MORPH) == 4) {
				cm.sendYesNo("Would you like to venture deep into the Cave of Life? I must warn you that very strong monsters dwell there.");
			}
			else {
				cm.sendOk("Who goes there? Only Cornians are permitted to enter the Cave of Life.");
				cm.dispose();
				return;
			}
		} 
		else if (status == 1) {
			cm.warp(240050000);
			cm.getPlayer().cancelEffectFromBuffStat(net.sf.cherry.client.MapleBuffStat.MORPH);
			cm.dispose();
			return;
		}
	}
}
