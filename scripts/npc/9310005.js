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
			cm.sendNext("为了执行秘密任务，我送你进入通道。。。");
		}
		else if (status == 1) {
			
					if(cm.getPlayerCount(701010322)==0){
					cm.warp(701010322, 0);
					cm.addMapTimer(120);
					cm.getMap(701010322).addMapTimer(120, 701010320);
					cm.dispose();
				}else{
				cm.sendNextPrev("里面有正在执行任务的玩家，请稍后在尝试进入。");
				cm.dispose();
				}
		}
		else{
				cm.sendOk("就这样吧。");
				cm.dispose();
		}
	}
}	
