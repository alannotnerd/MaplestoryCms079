var status = 0;

function start() {
	status = -1;
	action(1, 0, 0);
}

function action(mode, type, selection) {
	if (mode == -1) {
		cm.dispose();
	} else {
	if (status >= 0 && mode == 0) {
		cm.sendNext("中秋佳节团圆日 中秋佳节倍思亲 ！");
		cm.dispose();
		return;
	}
	if (mode == 1)
		status++;
	else
		status--;
	if (status == 0) {
		cm.sendYesNo("农历八月十五日，是我国传统的中秋节，也是我国仅次于春节的第二大传统节日。八月十五恰在秋季的中间，故谓之中秋节。我国古历法把处在秋季中间的八月， 称谓“仲秋”，所以中秋节又叫“仲秋节”。中秋节是要吃月饼的。游戏里没东西给大家吃。送大家每人一个 #b月饼帽#k 是否领取？");
	} else if (status == 1) {
		if (cm.getChar().getPresent() == 0) {
			cm.gainItem(1002723,1);
			cm.getChar().setPresent(1);
			cm.getChar().saveToDB(true);
			cm.sendOk("中秋节起源的另一个说法是：农历八月十五这一天恰好是稻子成熟的时刻，各家都拜土地神。中秋可能就是秋报的遗俗。恭喜：操作已成功。领取完成！");
			cm.dispose();
		} else {
			cm.sendOk("每个帐号只可以领取#b1次#k。你已经领取过了！");
			cm.dispose();
		       }	
		}
	}
}