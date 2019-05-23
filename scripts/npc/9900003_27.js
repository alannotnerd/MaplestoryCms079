var a = 0;
var ion = "#fUI/UIWindow2.img/QuestAlarm/BtQ/normal/0#"
var text;
var selects; //记录玩家的选项
var buynum = 0;
var itemlist = Array(
Array(3015439,2500000),
Array(3015482,1500000),
Array(3015526,1200000),
Array(3015296,800000),
Array(3015295,800000),  
Array(3015524,800000),
Array(3015519,800000), 

Array(3015419,1000000), 
Array(3015311,800000),
Array(3015310,1000000), 
Array(3015443,800000),
Array(3015384,800000),
Array(3015461,500000),
Array(3015451,500000), 
Array(3015538,500000), 
Array(3015529,500000), 
Array(3015309,500000)
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
			selects = selection;
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