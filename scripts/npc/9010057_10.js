var a = 0;
var text;
var selects; //记录玩家的选项
var buynum = 0;
var itemlist = Array(
					Array(5062000, 500),
					Array(5062002, 1000),
					Array(5062500, 1000),
					Array(5064000, 4900),
					Array(5064100, 30000),
					Array(5050000, 100),
					Array(2614002, 80000),
					Array(5072000, 100),
					Array(5073000, 500),
					Array(5074000, 500),
					Array(5076000, 800),
					Array(5390000, 1000),
					Array(5390001, 1000),
					Array(5390002, 1000),
					Array(5390003, 1000),
					Array(5390004, 1000),
					Array(5390005, 2000),
					Array(5390006, 5000),
					Array(5390007, 3000),
					Array(5390008, 3000),
					Array(5079001, 1000),
					Array(5079002, 1000),
					Array(5390010, 5000),
					Array(5390018, 5000),
					Array(5520000, 3000),
					Array(5520001, 5000)
					);
var head = "#fUI/UIWindow2.img/Quest/quest_info/summary_icon/summary#\r\n";

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
			text = head + "#h0#,你好！在这里可以选择你想要购买的物品,点击图片购买\r\n#b";
			for (var i=0; i<itemlist.length; i++) {
				text += "#L" + i + "##i" + itemlist[i] + "#";
				if (i != 0 && (i+1) % 5 == 0) {
					text += "\r\n";
				}
			}
            cm.sendSimple(text);
        } else if (a == 1) {
			selects = selection;
            cm.sendGetNumber("请输入你请你输入想要购买的数量\r\n\r\n#r - 1个需要" + itemlist[selects][1] + "点卷", 0, 0, 999999);
        } else if (a == 2) {
            buynum = selection;
            cm.sendNext("你想购买" + buynum + "个#r#i" + itemlist[selects][0] + "##k？\r\n你将使用掉" + (buynum * itemlist[selects][1]) + "点卷。");
        } else if (a == 3) {
            if (cm.getChar().getCSPoints(1) >= buynum * itemlist[selects][1]) {
                cm.getChar().modifyCSPoints(1, -buynum * itemlist[selects][1]);
                cm.gainItem(itemlist[selects][0], buynum);
                cm.sendOk("购买成功了！");
                cm.dispose();
            } else {
                cm.sendOk("对不起，你没有足够的点卷。");
                cm.dispose();
            }
        }
    }//mode
}//f