var a = 0;
var text;
var selects; //记录玩家的选项
var buynum = 0;
var itemlist = Array(
Array(1112918, 18000, 7),
Array(2431938, 68000),
Array(1132246, 78000),
Array(1122267, 78000),
Array(1032223, 78000),
Array(1113075, 78000),
Array(1122122, 88000),
Array(1122123, 88000),
Array(1122124, 88000),// -
Array(1122125, 88000),//  - 
Array(1122126, 88000),//  -
Array(1102476, 70000), // 诺巴西亚戴斯披风 // (无描述)
Array(1102477, 70000), // 诺巴赫尔梅斯披风 // (无描述)
Array(1102478, 70000), // 诺巴凯伦披风 // (无描述)
Array(1102479, 70000), // 诺巴利卡昂披风 // (无描述)
Array(1102480, 70000), // 诺巴阿尔泰披风 // (无描述)
Array(1072737, 70000), // 诺巴西亚戴斯靴 // (无描述)
Array(1072738, 70000), // 诺巴赫尔梅斯靴 // (无描述)
Array(1072739, 70000), // 诺巴凯伦靴 // (无描述)
Array(1072740, 70000), // 诺巴利卡昂靴 // (无描述)
Array(1072741, 70000), // 诺巴阿尔泰靴 // (无描述)
Array(1132169, 70000), // 诺巴西亚戴斯腰带 // (无描述)
Array(1132170, 70000), // 诺巴赫尔梅斯腰带 // (无描述)
Array(1132171, 70000), // 诺巴凯伦腰带 // (无描述)
Array(1132172, 70000), // 诺巴利卡昂腰带 // (无描述)
Array(1132173, 70000), // 诺巴阿尔泰腰带 // (无描述)
Array(3994417,90000),// - 红色蜡笔 - 红色蜡笔。
Array(3994418,90000),// - 橙色蜡笔 - 橙色蜡笔。
Array(3994419,90000),// - 黄色蜡笔 - 黄色蜡笔。
Array(3994420,90000),// - 绿色蜡笔 - 绿色蜡笔。
Array(3994421,90000),// - 青色蜡笔 - 青色蜡笔。
Array(3994422,90000)// - 蓝色蜡笔 - 蓝色蜡笔。Array(3994423,260)// - 紫色蜡笔 - 紫色蜡笔。 
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
				text += "#L" + i + "##i" + itemlist[i] + ":##t" + itemlist[i] + "# "+validtime+" - #r"+itemlist[i][1]+"#b点券  \r\n";
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
            cm.sendYesNo("你想购买" + buynum + "个#r#i" + itemlist[selects][0] + "##k？\r\n你将使用掉" + (buynum * itemlist[selects][1]) + "点券。");
        } else if (a == 2) {
            if (cm.getPlayer().getCSPoints(1)>buynum * itemlist[selects][1]) {
                cm.gainNX(1, -buynum * itemlist[selects][1]);
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