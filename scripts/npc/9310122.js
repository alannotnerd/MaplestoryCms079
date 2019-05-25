var a = 0;
var text;
var selects; //记录玩家的选项
var buynum = 0;
var itemlist = Array(
Array(1022261, 50000), //双弩枪攻击力卷轴
Array(1372222, 50000),
Array(1232109, 50000),
Array(1332274, 50000),
Array(1362135, 50000),
Array(1242116, 50000),
Array(1342101, 50000),
Array(1492231, 50000),
Array(1552110, 50000),
Array(1442268, 50000),
Array(1432214, 50000),
Array(1412177, 50000),
Array(1542108, 50000),
Array(1252093, 50000),
Array(1312199, 50000),
Array(1462239, 50000),
Array(1522138, 50000),
Array(1322250, 50000),
Array(1402251, 50000),
Array(1532144, 50000),
Array(1302333, 50000),
Array(1382259, 50000),
Array(1222109, 50000),
Array(1482216, 50000),
Array(1422184, 50000),
Array(1212115, 50000),
Array(1452252, 50000),
Array(1262017, 50000),

Array(1102775, 50000),
Array(1152174, 50000),
Array(1082636, 50000),
Array(1004422, 50000),
Array(1052882, 50000),
Array(1073030, 50000),


Array(1102797, 50000),
Array(1082640, 50000),
Array(1073035, 50000),
Array(1152179, 50000),
Array(1052890, 50000),
Array(1004426, 50000),


Array(1102796, 50000),
Array(1082639, 50000),
Array(1073034, 50000),
Array(1152178, 50000),
Array(1052889, 50000),
Array(1004425, 50000),


Array(1082637, 50000),
Array(1102794, 50000),
Array(1073032, 50000),
Array(1152176, 50000),
Array(1004423, 50000),
Array(1052887, 50000),


Array(1102795, 50000),
Array(1073033, 50000),
Array(1152177, 50000),
Array(1082638, 50000),
Array(1052888, 50000),
Array(1004424, 50000),


Array(1232072, 50000),
Array(1442184, 50000),
Array(1542045, 50000),
Array(1422109, 50000),
Array(1302229, 50000),
Array(1402153, 50000),
Array(1322164, 50000),
Array(1432140, 50000),
Array(1412106, 50000),
Array(1312118, 50000),


Array(1102456, 50000),
Array(1052509, 50000),
Array(1072711, 50000),
Array(1003601, 50000),
Array(1132156, 50000),
Array(1152094, 50000),
Array(1082472, 50000)
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
			text = "#h0#,您可以在这里购买#e#b各种神器#n#k,请选择你想要购买的物品\r\n#b";
			for (var i=0; i<itemlist.length; i++) {
				text += "#L" + i + "##i" + itemlist[i] + ":##t" + itemlist[i] + "# - #r"+(itemlist[i][1]*500)+"#b游戏币  \r\n";
				if (i != 0 && (i+1) % 5 == 0) {
					text += "\r\n";
				}
			}
            cm.sendSimple(text);
        } else if (a == 1) {
			selects = selection;
            cm.sendGetNumber("请输入你请你输入想要购买的数量\r\n\r\n#r1个需要" + (itemlist[selects][1]*500) + "个#b游戏币#k", 0, 0, 999999);
        } else if (a == 2) {
            buynum = selection;
            cm.sendNext("你想购买" + buynum + "个#r#i" + itemlist[selects][0] + "##k？\r\n你将使用掉" + (buynum * itemlist[selects][1]*500) + "游戏币。");
        } else if (a == 3) {
            if (cm.getPlayer().getMeso() >= -buynum * itemlist[selects][1]*500) {
                cm.gainMeso(-buynum * itemlist[selects][1]*500);
                cm.gainItem(itemlist[selects][0], buynum);
                cm.sendOk("购买成功了！");
                cm.dispose();
            } else {
                cm.sendOk("对不起，你没有足够的游戏币。");
                cm.dispose();
            }
        }
    }//mode
}//f