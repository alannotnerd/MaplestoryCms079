var a = 0;
var ion = "#fUI/UIWindow2.img/QuestAlarm/BtQ/normal/0#"
var text;
var selects; //记录玩家的选项
var buynum = 0;
var itemlist = Array(
Array(1115024,80000),
Array(1115113,80000),
Array(1115023,80000),
Array(1115112,80000),
Array(1115022,80000),  
Array(1115111,80000),
Array(1115018,80000), 
Array(1115105,80000), 
Array(1115011,80000),
Array(1112198,80000), 
Array(1115010,80000),
Array(1112197,80000),
Array(1115008,80000),
Array(1112195,80000), 
Array(1115007,80000), 
Array(1112194,80000), 
Array(1115006,35000),
Array(1112193,35000),
Array(1115005,35000), 
Array(1112192,35000),
Array(1115004,35000),
Array(1112191,35000),
Array(1115003,35000),
Array(1112190,35000),
Array(1112272,35000),
Array(1112160,35000),
Array(1112273,35000),
Array(1112161,35000),
Array(1112961,80000),
Array(1112946,80000),
Array(1112940,80000),
Array(1115009,35000),
Array(1112196,35000),
Array(1112958,35000),
Array(1112959,35000),
Array(1112282,35000),
Array(1112170,35000),
Array(1112278,35000),
Array(1112166,35000),
Array(1112288,35000),
Array(1112176,35000),
Array(1112254,35000),
Array(1112143,35000),
Array(1112274,35000),
Array(1112162,35000),
Array(1112271,35000),
Array(1112159,35000),
Array(1112270,35000),
Array(1112158,35000),
Array(1112269,35000),
Array(1112157,35000),
Array(1112268,35000),
Array(1112156,35000),
Array(1112266,35000),
Array(1112154,35000),
Array(1112149,35000),
Array(1112261,35000),
Array(1112177,35000),
Array(1112289,35000),
Array(1112100,35000, 30),
Array(1112294,35000),
Array(1112181,35000),
Array(1112178,35000),
Array(1112290,35000),
Array(1112150,35000),
Array(1112263,35000),
Array(1112151,35000),
Array(1113021,35000),
Array(1112267,35000),
Array(1112155,35000),
Array(1112943,80000),
Array(1112904,35000),
Array(1112238,35000),
Array(1112135,35000),
Array(1112916,80000),
Array(1112118,35000),
Array(1112228,35000),
Array(1112229,35000),
Array(1112230,35000),
Array(1112119,35000),
Array(1112120,35000),
Array(1112103,35000),
Array(1112252,35000),
Array(1112141,35000),
Array(1112142,35000),
Array(1112253,35000),
Array(1112957,35000, 90),
Array(1112136,35000),
Array(1112257,35000),
Array(1112145,35000),
Array(1112146,35000),
Array(1112258,35000),
Array(1112928,35000, 90),
Array(1112937,80000, 90),
Array(1112101,35000)
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