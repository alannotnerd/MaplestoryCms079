var a = 0,
	text, selects, buynum = 0,
	itemlist = [
		[5150040, 980],
		[5150064, 980],
		[5150100, 980],
		[5150119, 980],
		[5150126, 980],
		[5150123, 980],
		[5150124, 980],
		[5150135, 980],
		[5150139, 980]
	];

function start() {
	a = -1;
	action(1, 0, 0)
}
function action(b, d, c) {
	if (-1 == b) cm.dispose();
	else if (1 == b ? a++ : a--, -1 == a) cm.dispose();
	else if (0 == a) {
		text = "#h0#,您可以在这里购买#e#b理发卷#n#k,请选择你想要购买的物品\r\n#b";
		for (b = 0; b < itemlist.length; b++) text += "#L" + b + "##i" + itemlist[b] + ":##t" + itemlist[b] + "# - #r" + itemlist[b][1] + "#b抵用卷  \r\n", 0 != b && 0 == (b + 1) % 5 && (text += "\r\n");
		cm.sendSimple(text)
	} else 1 == a ? (selects = c, cm.sendGetNumber("请输入你请你输入想要购买的数量\r\n\r\n#r1个需要" + itemlist[selects][1] + "个#b抵用卷#k", 0, 0, 999999)) : 2 == a ? (buynum = c, cm.sendNext("你想购买" + buynum + "个#r#i" + itemlist[selects][0] + "##k？\r\n你将使用掉" + buynum * itemlist[selects][1] + "抵用卷。")) : 3 == a && (cm.getPlayer().getMeso() >= -buynum * itemlist[selects][1] ? (cm.gainNX(2, -buynum * itemlist[selects][1]), cm.gainItem(itemlist[selects][0], buynum), cm.sendOk("购买成功了！")) : cm.sendOk("对不起，你没有足够的抵用卷。"), cm.dispose())
};