var status = -1;
function action(mode, type, selection) {
	if (mode == 1) {
		status ++;
	} else {
		cm.dispose();
		return;
	}

	if (status == 0) {
		cm.sendYesNo("要移动到能够和其他玩家交易物品的#b<自由市场>#k吗？");
	} else if (status == 1) {
		cm.saveLocation("FREE_MARKET");
		cm.playPortalSE();
		cm.warp(910000000, "st00");
		cm.dispose();
	}
}