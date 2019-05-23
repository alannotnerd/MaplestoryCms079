var a = 0;
var text;
var selects; //记录玩家的选项
var icon = "#fUI/UIWindow2.img/QuestAlarm/BtQ/normal/0#";
var buynum = 0;
var itemlist = Array(
		Array(2431944, 2000),
		Array(2431945, 2000),
		Array(5062000, 20),
		Array(5062002, 40),
		Array(5064100, 30),
		Array(2340000, 30),
		Array(2049116, 320),
		Array(2049124, 550),
		Array(2049704, 320),
		Array(2049752, 550),
		Array(2046008, 840),
		Array(2046009, 840),
		Array(2046108, 840),
		Array(2046109, 840),
		Array(1352203, 360),
		Array(1352213, 360),
		Array(1352223, 360),
		Array(1352233, 360),
		Array(1352243, 360),
		Array(1352253, 360),
		Array(1352263, 360),
		Array(1352273, 360),
		Array(1352283, 360),
		Array(1352293, 360),
		Array(1352903, 360),
		Array(1352913, 360),
		Array(1352923, 360),
		Array(1352953, 360),
		Array(1352963, 360),
		Array(1353004, 360),
		Array(1352973, 360),
		Array(1352933, 360),
		Array(1352703, 360));

function start() {
	a = -1;
	action(1, 0, 0);
}

function action(mode, type, selection) {
	if (mode == -1) {
		cm.dispose();
	} else {
		if (mode == 1)
			a++;
		else
			a--;
		if (a == -1) {
			cm.dispose();
		} else if (a == 0) {
			text = icon+"亲爱的#r#h #,#k您好欢迎使用活力值兑换饰品\r\n\r\n";
			text += icon+"#k活力值#r"+cm.getPlayer().getPlayerEnergy()+"点#b\r\n\r\n";
			for (var i = 0; i < itemlist.length; i++) {
				text += "#L" + i + "##i" + itemlist[i] + ":##t" + itemlist[i] + "# - #r" + itemlist[i][1] + "#b活力值  \r\n";
				if (i != 0 && (i + 1) % 5 == 0) {
					text += "\r\n";
				}
			}
			cm.sendSimple(text);
		} else if (a == 1) {
			selects = selection;
			cm.sendGetNumber("请输入你请你输入想要购买的数量\r\n\r\n1个需要#r" + itemlist[selects][1] + "点#b活力值#k", 0, 0, 999999);
		} else if (a == 2) {
			buynum = selection;
			cm.sendNext("你想购买" + buynum + "个#r#i" + itemlist[selects][0] + "##k？\r\n你将使用掉" + (buynum * itemlist[selects][1]) + "活力值。");
		} else if (a == 3) {
			if (cm.getChar().getEnerqy >= buynum * itemlist[selects][1]) {
				cm.getChar().modifyEnerqy(-buynum * itemlist[selects][1]);
				cm.gainItem(itemlist[selects][0], buynum);
				cm.sendOk("购买成功了！");
				cm.dispose();
			} else {
				cm.sendOk("对不起，你没有足够的活力值。");
				cm.dispose();
			}
		}
	} //mode
} //f
