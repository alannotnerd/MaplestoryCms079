var a = 0;
var text;
var selects; //记录玩家的选项
var buynum = 0;
var itemlist = Array(
Array(1003843, 500000),
Array(1004075, 800000),
Array(1003719, 450000),
Array(1003720, 450000),
Array(1003721, 450000),
Array(1003722, 500000),
Array(1022226, 1200000),
Array(1182017, 800000),
Array(1190302, 800000),
Array(1032219, 1500000),
Array(1113020, 800000),
Array(1113084, 800000),
Array(1012319, 80000),
Array(1202023, 50000),// -
Array(1202027, 50000),//  - 
Array(1202031, 50000),
Array(1202035, 50000),
Array(1112918, 50000, 7),
Array(2070019, 3000),
Array(1082489, 300000),
Array(1012170, 300000),
Array(1132211, 300000),
Array(1152120, 300000),
Array(1132246, 600000),
Array(1122267, 600000),
Array(1032223, 600000),
Array(1113075, 600000),
Array(1122122, 300000),
Array(1122123, 300000),
Array(1122124, 300000),
Array(1122124, 300000),
Array(1122125, 300000),
Array(1122126, 300000),
Array(1102471, 200000),
Array(1102472, 200000),
Array(1102473, 200000),
Array(1102474, 200000),
Array(1102475, 200000),
Array(1072732, 200000),
Array(1072733, 200000),
Array(1072734, 200000),
Array(1072735, 200000),
Array(1072736, 200000),
Array(1132164, 200000),
Array(1132165, 200000),
Array(1132166, 200000),
Array(1132167, 200000),
Array(1132168, 200000)
);

function start() {
    a = -1;
    action(1, 0, 0);
}

function action(mode, type, selection) {
    if (mode == -1) {
		cm.sendOk("好吧，等你考虑清楚了再来找我。");
        cm.dispose();
    } else {
        if (mode == 1)
            a++;
        else
            a--;
        if (a == -1) {
            cm.dispose();
        } else if (a == 0) {
			text = "亲爱的#r#h0##k您好,请选择希望购买的道具：\r\n#b";
			for (var i=0; i<itemlist.length; i++) {
				var validtime = "";
				if (itemlist[i][2]!=null) {
					validtime="/ #e"+itemlist[i][2]+"天权#n";
				}
				text += "#L" + i + "##i" + itemlist[i] + ":##t" + itemlist[i] + "# "+validtime+" - #r"+itemlist[i][1]+"#b点卷  \r\n";
				if (i != 0 && (i+1) % 5 == 0) {
					text += "\r\n";
				}
			}
            cm.sendSimple(text);
			/*
        } else if (a == 1) {
			selects = selection;
            cm.sendGetNumber("请输入你请你输入想要购买的数量\r\n\r\n#r1个需要" + itemlist[selects][1] + "个#b点卷#k", 0, 0, 999999);*/
        } else if (a == 1) {
            selects = selection;
			buynum = 1;
            cm.sendYesNo("你想购买" + buynum + "个#r#i" + itemlist[selects][0] + "##k？\r\n你将使用掉" + (buynum * itemlist[selects][1]) + "点卷。");
        } else if (a == 2) {
            if (cm.getChar().getCSPoints(1) >= buynum * itemlist[selects][1]) {
                cm.getChar().modifyCSPoints(1, -buynum * itemlist[selects][1]);
				if (itemlist[selects][2]!=null) {
					cm.gainItem(itemlist[selects][0], buynum, itemlist[selects][2]);	
				} else {
                	cm.gainItem(itemlist[selects][0], buynum);
				}
				cm.sendOk("购买成功了！");
                cm.dispose();
            } else {
                cm.sendOk("对不起，你没有足够的点卷。");
                cm.dispose();
            }
        }
    }//mode
}//f
