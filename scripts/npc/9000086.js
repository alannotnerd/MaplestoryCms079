var status = -1;
var map = -1;
var target = -1;
var portal = 0;
function action(mode, type, selection) {
	if (mode == 1) {
		status ++;
	} else {
		cm.dispose();
		return;
	}

	if (status == 0) {
		map = cm.getMapId();
		if (map == 200000000 || map == 220000000 || map == 240000000 || map == 250000000 || map == 260000000) {
			target = map + 100;
		} else if (map == 130000000) {
			target = map + 210;
		} else if (map == 140000000) {
			target = map + 20300;
		} else if (map == 310000000) {
			target = map + 10;
		} else {
			target = 104020100;
			portal = 1;
		}
		cm.sendYesNo("距离当前位置最近的大陆移动码头是#m" + target + "#。你想移动到#b<#m" + target + "#>#k去吗？");
	} else if (status == 1) {
		cm.warp(target, portal);
		cm.dispose();
	}
}