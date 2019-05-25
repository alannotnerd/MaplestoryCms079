var status = 0;
var typed = 0;
var myRmb;
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
			var text = "您当前的点卷数量为：#r"+cm.getPlayer().getCSPoints(1)+"#k点\r\n";
			//text += "您当前的#v4000463#为"+cm.getPlayer().getItem()+"#k个\r\n\r\n";
			//text+="您可以在我这里使用点卷兑换中介币或者中介币兑换点卷。#k\r\n";
			text+="#b#L1#点卷兑换中介币#l \r\n#L2#中介币兑换点卷#l \r\n#L3#中介币兑换金币#l";
			cm.sendSimple(text);
			//cm.dispose();
		} else if (status == 1) {
			if (selection == 1) {
				typed = 1;
				cm.sendGetText("#b【点卷兑换中介币】 1000点:1个中介币#k\r\n\r\n您当前有#r"+cm.getPlayer().getCSPoints(1)+"#k点点卷，请输入想要兑换的#r中介币#k数量：");
			} else if (selection == 2) {
				typed = 2;
				cm.sendGetText("#b【中介币兑换点卷】 1个中介币:950点#k\r\n\r\n您当前有#r"+cm.getItemQuantity(4000463)+"#k个中介币，请输入想要兑换的#r中介币#k数量：");
			} else if (selection == 3) {
				typed = 3;
				cm.sendGetText("#b【中介币兑换金币】 1个中介币:3000万#k\r\n\r\n您当前有#r"+cm.getItemQuantity(4000463)+"#k个中介币，请输入想要兑换的#r金币#k数量：");
			}
			//cm.dispose();
		} else if (status == 2) {
			var ybNum = Math.floor(cm.getText()*1);
			if (isNaN(ybNum)){
				cm.sendOk("很抱歉，数量只能为#r数字#k，请重新确认后查询！");
				cm.dispose();
				return;
			}
			if (ybNum<=0) {
				cm.sendOk("请输入大于0的数字！");
				cm.dispose();
				return;
			}
			if (ybNum>10000) {
				cm.sendOk("每次最多输入10000，请返回重新输入");
				cm.dispose();
				return;
			}
			if (typed == 1) {
				if (cm.getPlayer().getCSPoints(1) >= (ybNum*1000)) {
					if (cm.getSpace(4) >= 1) {
						cm.gainNX(1, -ybNum*1000);
						cm.gainItem(4000463, ybNum);
						cm.sendOk("兑换成功");
						cm.dispose();
					} else {
						cm.sendOk("包裹空间不足");
						cm.dispose();
					}
				} else {
					cm.sendOk("你没有那么多点卷");
					cm.dispose();
				}
			} else if (typed == 2) {
				if (cm.haveItem(4000463, ybNum)) {
					cm.gainItem(4000463, -ybNum);
					cm.gainNX(1, ybNum*950);
					cm.sendOk("兑换成功");
					cm.dispose();
				} else {
					cm.sendOk("你没有那么多中介币");
					cm.dispose();
				}
			} else if (typed == 3) {
				if (cm.haveItem(4000463, ybNum)) {
					cm.gainItem(4000463, -ybNum);
					cm.gainMeso(ybNum*30000000);
					cm.sendOk("兑换成功");
					cm.dispose();
				} else {
					cm.sendOk("你没有那么多中介币");
					cm.dispose();
				}
			}
		}
   }
}