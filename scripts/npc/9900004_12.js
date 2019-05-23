/* 绝版抵用卷商店 脸饰*/

var a = 0;
var text;
var selects; //记录玩家的选项
var buynum = 0;
var itemlist = Array(
Array(1542075, 200000),//巨匠之戒
Array(1113055, 200000),//巨匠之戒
Array(1152154, 200000),//巨匠护肩
Array(1032200, 200000),//巨匠耳环
Array(1212077, 400000),//巨匠黑甲凶灵
Array(1222072, 400000),//巨匠天使手铳
Array(1232071, 400000),//巨匠死亡使者
Array(1402204, 400000),//巨匠巨剑
Array(1242076, 400000),//巨匠精神之刃
Array(1302285, 400000),//巨匠战剑
Array(1312162, 400000),//巨匠战斗切肉斧
Array(1322213, 400000),//巨匠大战斗锤
Array(1332235, 400000),//巨匠小妖精刀
Array(1342084, 400000),//巨匠小刀
Array(1362099, 400000),//巨匠手杖
Array(1372186, 400000),//巨匠邪恶杖
Array(1382220, 400000),//巨匠战斗长杖
Array(1412144, 400000),//巨匠战斧
Array(1422149, 400000),//巨匠战锤
Array(1432176, 400000),//巨匠战斗之矛
Array(1442232, 400000),//巨匠地狱之鸟
Array(1452214, 400000),//巨匠战斗弓
Array(1462202, 400000),//巨匠弩
Array(1472223, 400000),//巨匠黑手甲
Array(1482177, 400000),//巨匠狮鹫拳爪
Array(1492188, 400000),//巨匠无尽之枪
Array(1522103, 400000),//巨匠鹰弩枪
Array(1532106, 400000),//巨匠火炮
Array(1252058, 400000)//巨匠光能魔法棒
);
//var selectedItem = -1;
//var selectedCost = -1;

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
			text = "#k亲爱的#r#h0#,#k您好请选择您希望购买的道具：\r\n\r\n#b";
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