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
			cm.sendNext("你是为了打败大王蜈蚣来的吧？我送你到大王蜈蚣所在地吧！");
		}else if (status == 1) {
			cm.sendNextPrev("一定要打败大王蜈蚣，夺回#b赤珠#k平安回来。。。");
		}
		else if (status == 2) {
			
					if(cm.getPlayerCount(701010323)==0){
					cm.warp(701010323, 0);
					cm.addMapTimer(600);
					cm.getMap(701010323).addMapTimer(600, 701010320);
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
