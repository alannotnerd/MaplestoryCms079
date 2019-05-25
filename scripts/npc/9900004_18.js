var a = 0;
var text;
var selects; //记录玩家的选项
var buynum = 0;
var itemlist = Array(
Array(2431789, 2000),
Array(2431790, 3500),
Array(5570000, 3000),
Array(5520000, 3500),
Array(5520001, 5000),
Array(5192000, 1500),
Array(5743003, 500),
Array(5062800, 5000), 
Array(2702000, 3000),
Array(2049509, 3000),
Array(2048301, 2000),
Array(4001839, 15),
Array(4001832, 15),
Array(2048700, 2000),// -
Array(2048701, 4500),//  - 
Array(2048702, 6000),
Array(2048703, 8000),
Array(2048704, 10000),
Array(2048716, 15000),
Array(2048717, 20000),
Array(5062000, 1500),
Array(5062002, 3000),
Array(5062009, 5000),
Array(5062500, 3000),
Array(5062024, 5000),
Array(5062400, 10000),
Array(2022746, 10000),
Array(2022747, 20000),
Array(2003516, 1000),
Array(2003517, 2000)
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
            cm.sendGetNumber("请输入你请你输入想要购买的数量\r\n\r\n#r1个需要" + itemlist[selects][1] + "个#b点卷#k", 0, 0, 999999);
		} else if (a == 2) {
			buynum = selection;
            cm.sendYesNo("你想购买" + buynum + "个#r#i" + itemlist[selects][0] + "##k？\r\n你将使用掉" + (buynum * itemlist[selects][1]) + "点卷。");
        } else if (a == 3) {
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
