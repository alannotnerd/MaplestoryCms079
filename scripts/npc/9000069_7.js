var a = 0;
var text;
var selects; //记录玩家的选项
var buynum = 0;
var itemlist = Array(
Array(4001716, 500000),
Array(2434340, 500000),
Array(2432069, 500000),
Array(2431938, 500000),
Array(2432741, 5000),
Array(2612061, 150000),
Array(2612062, 150000),
Array(2613050, 150000),
Array(2613051, 150000),
Array(2616061, 50000),
Array(2616062, 50000),
Array(2615031, 50000),
Array(2615032, 50000),
Array(2430096, 200000),
Array(2049750,15000),
Array(2049323,10000),
Array(5064003, 3000), 
Array(5064000, 2000),
Array(5064100, 1000),
Array(2500002, 5000),
Array(2501001, 5000),
Array(2049600, 10000),
Array(2049009, 5000),
Array(2049005, 8000),
Array(2049405, 5000),
Array(2048314, 5000),
Array(2048307, 8000),
Array(2340000, 1500),
Array(2049137,10000),
Array(2049116,20000),
Array(2049124,15000), 
Array(2040874,50000), 
Array(2040875,50000),
Array(2612010,100000),
Array(2613000,100000),
Array(2613001,100000),
Array(2046913,100000),
Array(2046914,100000), 
Array(2046173,100000),
Array(2046577,80000),
Array(2046578,80000),
Array(2046579,80000),
Array(2046580,80000)
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
			text = "#r#h0#,#k你好！在这里可以选择你想要购买的物品\r\n#b";
			for (var i=0; i<itemlist.length; i++) {
				text += "#L" + i + "##i" + itemlist[i] + ":##t" + itemlist[i] + "# - #r"+itemlist[i][1]+"#b点卷  \r\n";
				if (i != 0 && (i+1) % 5 == 0) {
					text += "\r\n";
				}
			}
            cm.sendSimple(text);
        } else if (a == 1) {
			selects = selection;
            cm.sendGetNumber("请输入你请你输入想要购买的数量\r\n\r\n#r1个需要" + itemlist[selects][1] + "个#b点卷#k", 0, 0, 999999);
        } else if (a == 2) {
            buynum = selection;
            cm.sendNext("你想购买" + buynum + "个#r#i" + itemlist[selects][0] + "##k？\r\n你将使用掉" + (buynum * itemlist[selects][1]) + "点卷。");
        } else if (a == 3) {
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
    }//mode
}//f
