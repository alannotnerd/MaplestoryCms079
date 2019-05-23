//cherry_MS
importPackage(net.sf.cherry.tools);
importPackage(net.sf.cherry.client);

var status = 0;

function start() {
	status = -1;
	action(1, 0, 0);
}

function action(mode, type, selection) {
	if (mode == -1) {
		cm.dispose();
	} else {
		if (mode == 0 && status == 0) {
			cm.dispose();
			return;
		}
		if (mode == 1)
			status++;
		else
			status--;
		if (status == 0) {
			
			cm.sendSimple("你好吗？我是江警察。我能帮你做什么？\r\n#L1##b我想从这里出去。#k ");
			} else if (status == 1) {
			if (selection == 1) {
				cm.warp(701010320, 0);
				cm.dispose();
			} else  {
				cm.sendOk("出状况啦!");
				cm.dispose();
			} 

		}
	}
}
