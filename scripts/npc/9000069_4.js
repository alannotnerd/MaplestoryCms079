var a = 0;
var text;
var selects; //记录玩家的选项
var buynum = 0;
var itemlist = Array(
Array(1112793, 20),
Array(1012319, 18), // 这个是脸饰的
Array(1022226, 18),
Array(1112918, 18, 7),
//Array(2431938, 198),
//Array(2070019, 20),
Array(1132246, 80),
Array(1122267, 80),
Array(1032223, 80),
Array(1113075, 80),
Array(1113074, 80),
Array(1113073, 80),
Array(1113072, 80),
Array(1122122, 80),
Array(1122123, 80),
Array(1122124, 80),// -
Array(1122125, 80),//  - 
Array(1122126, 80),
Array(1032219, 80),
Array(1152155, 80),
Array(1003722, 80),
Array(1113070, 80),
Array(1113084, 80),
Array(1113020, 80),
Array(1662073, 80),
Array(1662072, 80),
Array(1672069, 80),
Array(1190301, 80),
Array(1182017, 80)
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
			text = "#h0#,您可以在这里兑换#e#b上乘装备#n#k,请选择你想要购买的物品\r\n#b";
			for (var i=0; i<itemlist.length; i++) {
				var validtime = "";
				if (itemlist[i][2]!=null) {
					validtime="/ #e"+itemlist[i][2]+"天权#n";
				}
				text += "#L" + i + "##i" + itemlist[i] + ":##t" + itemlist[i] + "# "+validtime+" - #r"+itemlist[i][1]+"#b蜗牛票  \r\n";
				if (i != 0 && (i+1) % 5 == 0) {
					text += "\r\n";
				}
			}
            cm.sendSimple(text);
			/*
        } else if (a == 1) {
			selects = selection;
            cm.sendGetNumber("请输入你请你输入想要购买的数量\r\n\r\n#r1个需要" + itemlist[selects][1] + "个#b蜗牛票#k", 0, 0, 999999);*/
        } else if (a == 1) {
            selects = selection;
			buynum = 1;
            cm.sendYesNo("你想购买" + buynum + "个#r#i" + itemlist[selects][0] + "##k？\r\n你将使用掉" + (buynum * itemlist[selects][1]) + "蜗牛票。");
        } else if (a == 2) {
            if (cm.haveItem(4002001,buynum * itemlist[selects][1])) {
                cm.gainItem(4002001, -buynum * itemlist[selects][1]);
				if (itemlist[selects][2]!=null) {
					cm.gainItem(itemlist[selects][0], buynum, itemlist[selects][2]);	
				} else {
                	cm.gainItem(itemlist[selects][0], buynum);
				}
				cm.sendOk("购买成功了！");
                cm.dispose();
            } else {
                cm.sendOk("对不起，你没有足够的蜗牛票。");
                cm.dispose();
            }
        }
    }//mode
}//f
