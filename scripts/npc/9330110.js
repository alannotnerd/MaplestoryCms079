var status = -1;
var sel;

function action(mode, type, selection) {
    if (mode == 1) {
	status++;
    } else {
		if (status == 0) {
			cm.dispose();
			return;
		}
	status--;
    }

    if (status == 0) {
	cm.sendSimple("你现在想要做什么呢?\n\r #b#L4#查看钓鱼规则。#l\n\r #b#L5#兑换#z1142146##l");
    } else if (status == 1) {
	sel = selection;
	if (sel == 4) {
	    cm.sendOk("进入钓鱼场需要等级10级以上并且你需要携带鱼竿和鱼饵才可以钓鱼。进入钓鱼场后你有1分钟的时间钓鱼,一定要抓紧时间哦~~~");
	    cm.safeDispose();
	} else if (sel == 5) {
	    if (cm.haveItem(4031627, 500)) {
		if (cm.canHold(1142146)) {
		    cm.gainItem(4031627, -500);
		    cm.gainItemPeriod(1142146, 1, 30);
		    cm.sendOk("兑换成功,祝您游戏愉快。")
		} else {
		    cm.sendOk("#z1142146#只能兑换一个,你现在已经有了。");
		}
	    } else {
		cm.sendOk("兑换#b#z1142146##k需要#b500条#z4031627##k,请收集后在来!")
	    }
	    cm.safeDispose();
	}
    }
}