
function start() {
	status = -1;
	action(1, 0, 0);
}

function action(mode, type, selection) {
    if (mode == 1) {
		status++;
    } else {
		if (status <= 1) {
			cm.dispose();
			return;
		}
		status--;
    }
    if (status == 0) {
		cm.sendYesNo("你确定要离开么？");
	} else if (status == 1) {
		cm.warp(106021400, "TD_MC_enterboss1");
		cm.dispose();
    }else{
		cm.dispose();
	}
}