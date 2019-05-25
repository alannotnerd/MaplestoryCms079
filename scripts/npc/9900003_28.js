var a = 0;
var ion = "#fUI/UIWindow2.img/QuestAlarm/BtQ/normal/0#"
var text;
var selects; //记录玩家的选项
var buynum = 0;
var itemlist = Array(
Array(3015002,5000000),
Array(3010832,4000000),
Array(3015051,3000000),
Array(3015075,2500000),
Array(3015304,2000000),  
Array(3010936,1000000),
Array(3010788,1000000), 

Array(3010853,1200000), 
Array(3015193,1500000),
Array(3015224,1200000), 
Array(3010658,750000),
Array(3015143,300000),
Array(3015328,1500000),
Array(3015227,1200000), 
Array(3015225,1000000), 
Array(3015236,800000), 
Array(3015263,800000),

Array(3015272,800000),
Array(3015312,800000), 
Array(3015181,300000),
Array(3015338,450000),
Array(3016101,500000),
Array(3015234,500000),
Array(3015260,300000),
Array(3015259,300000),
Array(3015329,300000),
Array(3015195,300000),
Array(3015257,300000),
Array(3015155,300000),
Array(3015144,300000),
Array(3015142,300000),
Array(3015178,300000),
Array(3015100,300000),
Array(3015109,200000),
Array(3015183,300000),
Array(3015197,300000),
Array(3015211,300000),
Array(3010783,800000),
Array(3010876,800000),
Array(3010696,800000),
Array(3010715,500000),
Array(3010070,200000),
Array(3010779,300000),
Array(3010820,450000),
Array(3010511,350000),
Array(3010842,350000),
Array(3010843,350000),
Array(3010760,350000),
Array(3014005,500000),
Array(3010879,350000),
Array(3010877,350000)
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