var status = -1;
function action(mode, type, selection) {
	if (mode == 1) {
		status ++;
	} else {
		cm.dispose();
		return;
	}

	if (status == 0) {
		cm.sendYesNo("你想移动到匠人的村庄匠人街吗？在#b<匠人街>#k可以学习#b采药、采矿、装备制作、饰品制作、炼金术等#k5种专业技术。");
	} else if (status == 1) {
		cm.saveLocation("ARDENTMILL");
		cm.playPortalSE();
		cm.warp(910001000, "st00");
		cm.dispose();
	}
}