var status = -1;
var typed = 0;
var transId = 4031997;
function start() {
    action(1, 0, 0);
}

function action(mode, type, selection) {
	if (mode == 1) {
		status++;
	} else {
		if (status >= 0) {
			cm.dispose();
			return;
		}
		status--;
	}
	if (status == 0) {
		var text = "亲爱的#b#e#h ##n#k，欢迎来到点卷中介所，需要什么帮助吗？\r\n\r\n";
		text+="\t当前点卷余额：#r"+cm.getPlayer().getCSPoints(1)+"#k点\r\n";
		text+="\t当前#t"+transId+"#数量：#r"+cm.getItemQuantity(transId)+"#k个\r\n\r\n";
		text+="#b#L3#了解点卷中介说明#l\r\n";
		text+="#L1#兑换点卷#l\r\n";
		text+="#L2#兑换蘑菇金币#l\r\n";
		cm.sendSimple(text);
	} else if (status == 1) {
		typed = selection;
		if (selection == 3) {
			status = -1;
			cm.sendSimple("1个#b#t"+transId+"##k可以兑换#r800点卷#k，#r1000点卷#k可以兑换1个#b#t"+transId+"##k。#b#t"+transId+"##k可用于玩家之间的交易与贩售。");
		} else if (selection == 1) {
			var maxTimes = cm.getItemQuantity(transId);
			cm.sendGetNumber("#d#e<中介币兑换点卷>#n#k\r\n当前最多可以兑换#r"+(maxTimes*800)+"#k点卷，最多输入#r"+maxTimes+"#k。\r\n请输入兑换的#b#t"+transId+"##k数量:\r\n兑换比例为 1 : 800\r\n", 1, 1, maxTimes);
		} else if (selection == 2) {
			var maxTimes = Math.floor(cm.getPlayer().getCSPoints(1)/1000);
			if (maxTimes>300)
				maxTimes = 300;
			cm.sendGetNumber("#d#e<点卷兑换中介币>#n#k\r\n本次最多可以兑换#r"+maxTimes+"#k个#b#t"+transId+"##k\r\n请输入兑换的#b#t"+transId+"##k数量:\r\n兑换比例为 1000 : 1\r\n", 1, 1, maxTimes);
		}
	} else if (status == 2) {
		var quantity = Math.floor(selection);
		if (quantity <= 0) {
			cm.sendOk("Error");
			cm.dispose();
			return;
		}
		if (typed == 1) {
			if (cm.haveItem(transId, quantity)) {
				status=-1;
				var nx = 800*quantity;
				cm.gainItem(transId, -quantity);
				cm.gainNX(nx);
				cm.sendSimple("成功兑换了#r"+nx+"#k点卷");
			} else {
				cm.sendOk("你好像没有那么多#b#t"+transId+"##k哦！");
				cm.dispose();
			}
		} else if (typed == 2) {
			if (cm.getSpace(4)<1) {
				status = -1;
				cm.sendSimple("您的背包空间不足，请整理背包中其他栏的空间。");
			} else {
				var maxNumber = quantity*1000;
				if (cm.getPlayer().getCSPoints(1)>=maxNumber) {
					status =-1;
					cm.gainItem(transId, quantity);
					cm.gainNX(-maxNumber);
					cm.sendSimple("成功兑换了#r"+quantity+"#k个中介币");
				} else {
					cm.sendOk("你好像没有那么多点卷哦！");
					cm.dispose();
				}
			}
		}
	}
}