var a = 0;
var ion = "#fUI/UIWindow2.img/QuestAlarm/BtQ/normal/0#"
var text;
var selects; //记录玩家的选项
var buynum = 0;
var itemlist = Array(
Array(1062233,30000),
Array(1062232,30000),
Array(1062231,30000),
Array(1062228,30000),
Array(1062226,30000),  
Array(1062225,30000),
Array(1062224,30000), 
Array(1062223,30000), 
Array(1062222,30000),
Array(1062221,30000), 
Array(1062220,30000),
Array(1062219,30000),
Array(1062218,30000),
Array(1062182,30000), 
Array(1062183,30000), 
Array(1062184,30000), 
Array(1062185,30000),
Array(1062186,35000),
Array(1062187,35000), 
Array(1062188,35000),
Array(1062189,35000),
Array(1062204,35000),
Array(1062207,35000),
Array(1061138,35000),
Array(1062208,35000),
Array(1062209,35000),
Array(1062179,35000),
Array(1062211,35000),
Array(1062212,35000),
Array(1062213,35000),
Array(1062214,35000),
Array(1062216,35000),
Array(1062217,35000),
Array(1061212,35000),
Array(1061211,35000),
Array(1061007,35000),
Array(1050342,35000),
Array(1062203,35000),
Array(1062210,35000),
Array(1061113,35000),
Array(1062171,35000),
Array(1062172,35000),
Array(1052782,35000),
Array(1062093,35000),
Array(1061148,35000),
Array(1061207,35000),
Array(1060181,35000),
Array(1062174,35000),
Array(1062072,35000),
Array(1062173,35000)
);

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
			text = ion+"#k亲爱的#r#h0#,#k您好请选择您希望购买的道具：\r\n\r\n#b";
			for (var i=1; i<=itemlist.length; i++) {
				text += "#L" + (i) + "##i" + itemlist[i-1] + ":##t" + itemlist[i-1] + "# - #r"+itemlist[i-1][1]+"#b点卷  \r\n";
				if (i != 0 && (i+1) % 5 == 0) {
					text += "\r\n";
				}
			}
            cm.sendSimple(text);
        } else if (a == 1) {
			selects = (selection-1);
            buynum = 1;
            cm.sendYesNo("你想购买" + buynum + "个#r#i" + itemlist[selects][0] + "##k？\r\n你将使用掉" + (buynum * itemlist[selects][1]) + "点卷。");
		} else if (a == 2) {
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
	}
}