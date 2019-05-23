var status = -1;
function action(mode, type, selection) {
    if (mode == 1) {
        status++;
    } else {
        if (status == 0) {
            cm.dispose();
        }
        status--;
    }
    if (status == 0) {
        cm.sendSimple("你好～天气不错吧？要想使用怪物公园，当然应该来找我。我能为你做什么呢？\r\n#b#L0#交换#t4001513##l\r\n#L1#交换#t4001515##l\r\n#L2#交换#t4001521##l\r\n#L3#购买入场券#l#k");
    } else if (status == 1) {
        if (selection == 0) {
            status = -1;
	if(cm.haveItem(4001513) >= 10){
	cm.gainItem(4001513,-10);
	cm.gainItem(4001514,1);
            cm.sendOk("恭喜你交换成功.");
	    cm.dispose();
	}else{
            cm.sendNext("怎么回事？没有啊。要想交换入场券，需要#b10个入场券碎片#k。");
}
        } else if (selection == 1) {
            status = -1;
	if(cm.haveItem(4001515) >= 10){
	cm.gainItem(4001515,-10);
	cm.gainItem(4001514,1);
            cm.sendOk("恭喜你交换成功.");
	    cm.dispose();
	}else{
            cm.sendNext("怎么回事？没有啊。要想交换入场券，需要#b10个入场券碎片#k。");
}
        } else if (selection == 2) {
            status = -1;
	if(cm.haveItem(4001521) >= 10){
	cm.gainItem(4001521,-10);
	cm.gainItem(4001522,1);
            cm.sendOk("恭喜你交换成功.");
	    cm.dispose();
	}else{
            cm.sendNext("怎么回事？没有啊。要想交换入场券，需要#b10个入场券碎片#k。");
}
        } else if (selection == 3) {
            cm.sendSimple("嗯～本来不能这样的，因为我最近心情很好，所以才会破例卖给你。#r不管是哪种入场券，每人一天只能购买3张#k。对了，这件事一定要对休彼德蔓保密！\r\n#b#L0##t4001514#5万金币#l\r\n#L1##t4001516#10万金币#l\r\n#L2##t4001522#20万金币#l#k");
        }
    } else if (status == 2) {
        if (selection == 0) {
	if(cm.getMeso() >= 50000){
	cm.gainItem(4001514,1);
	cm.gainMeso(-50000);
            cm.sendOk("恭喜你购买成功");
	    cm.dispose();
	} else {
            cm.sendOk("你是不是没钱，或者没地方放入场券了啊？你再确认一下。");
	    cm.dispose();
}
        } else if (selection == 1) {
	if(cm.getMeso() >= 100000){
	cm.gainItem(4001516,1);
	cm.gainMeso(-100000);
            cm.sendOk("恭喜你购买成功");
	    cm.dispose();
	} else {
            cm.sendOk("你是不是没钱，或者没地方放入场券了啊？你再确认一下。");
	    cm.dispose();
}
        } else if (selection == 2) {
	if(cm.getMeso() >= 200000){
	cm.gainItem(4001522,1);
	cm.gainMeso(-200000);
            cm.sendOk("恭喜你购买成功");
	    cm.dispose();
	} else {
            cm.sendOk("你是不是没钱，或者没地方放入场券了啊？你再确认一下。");
	    cm.dispose();
        }
        cm.dispose();
    }
}}