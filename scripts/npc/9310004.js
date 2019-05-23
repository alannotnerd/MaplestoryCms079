//cherry_MS
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
		if (mode == 1)
			status++;
		else
			status--;
		if (status == 0) {
			cm.sendNext("看来你在执行秘密任务，祝你好运气。。。");
		}
		else if (status == 1) {
			cm.warp(701010321, 0);
			cm.dispose();
		}else{
			cm.sendOk("就这样吧······");
			cm.dispose();
		}
	}
}	
