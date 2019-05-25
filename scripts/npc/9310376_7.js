var a = 0;
var ion = "#fUI/UIWindow2.img/QuestAlarm/BtQ/normal/0#"
var text;
var selects; //记录玩家的选项
var buynum = 0;
var itemlist = Array(
Array(1072838,20000),
Array(1072515,20000),
Array(1072529,20000),
Array(1072531,20000),
Array(1072426,20000),  
Array(1072258,20000),
Array(1072259,20000), 
Array(1072808,20000), 
Array(1072817,20000),
Array(1072868,20000), 
Array(1072862,20000),
Array(1072851,20000),
Array(1072843,20000),
Array(1072951,20000), 
Array(1072998,20000), 
Array(1073013,20000), 
Array(1073014,20000),
Array(1073025,20000),
Array(1073127,20000), 
Array(1073129,20000),
Array(1073144,20000),
Array(1073145,20000),
Array(1073150,20000),
Array(1073098,20000),
Array(1073109,20000),
Array(1073009,20000),
Array(1073012,20000),
Array(1073022,20000),
Array(1073023,20000),
Array(1073037,20000),
Array(1072367,20000),
Array(1073046,20000),
Array(1073047,20000),
Array(1073056,20000),
Array(1073058,20000),
Array(1073075,20000),
Array(1073074,20000),
Array(1073088,20000),
Array(1073078,20000),
Array(1073079,20000),
Array(1072908,20000),
Array(1071079,20000),
Array(1072910,20000),
Array(1072779,20000),
Array(1072821,20000),
Array(1072942,20000),
Array(1072911,20000),
Array(1072860,20000),
Array(1072919,20000),
Array(1071076,20000),
Array(1071078,20000),
Array(1072543,20000),
Array(1072337,20000),
Array(1072832,20000),
Array(1072820,20000)
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