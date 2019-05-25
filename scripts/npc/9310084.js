var status = 0;
var job;

importPackage(net.sf.cherry.client);

function start() {
	status = -1;
	action(1, 0, 0);
}

function action(mode, type, selection) {
	if (mode == -1) {
		cm.dispose();
	} else {
		if ((mode == 0 && status == 2) || (mode == 0 && status == 13)) {
			cm.dispose();
			return;
		}
		if (mode == 1)
			status++;
		else
			status--;
		if (status == 0) {
			cm.sendNext("嗯？是否想进入#r红鸾宫#k呢。这需要消耗一个#v5090100#x99.");
		} else if (status == 1) {
			cm.sendYesNo("怎么样，想去吗？#v5090100#，点我的人需要99个");
		} else if (status == 2) {
			if(cm.haveItem(5090100,99)){
				cm.gainItem(5090100,-99);
				cm.组队传送(700000100);
				cm.dispose();
			}else{
				cm.sendOk("抱歉，你没有#v5090100#x99，这个在拍卖可以购买。");
				cm.dispose();
			}
		}
	}
}	
