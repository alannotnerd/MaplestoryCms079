

function start() {
	status = -1;
	action(1, 0, 0);
}

function action(mode, type, selection) {
	if (mode == -1 || mode == 0) {
		cm.dispose();
		return;
	} else {
		if (mode == 1)
			status++;
		else
			status--;
		if (status == 0) {
			cm.sendYesNo("想要离开这里外面去吗？一旦离开，再进来时就要重新开始挑战，确定要离开吗？");
		}
		else if(status == 1) {
			cm.warp(220080000);
			cm.dispose();
		}
	}
}
