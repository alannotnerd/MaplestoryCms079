var a = 0;
var ion = "#fUI/UIWindow2.img/QuestAlarm/BtQ/normal/0#"
var text;
var selects; //记录玩家的选项
var buynum = 0;
var itemlist = Array(
Array(5000264,200000),
Array(5000067,30000),
Array(5000415,30000),
Array(5000424,30000),
Array(5000055,30000),  
Array(5000324,30000),
Array(5000292,30000), 
Array(5000291,30000), 
Array(5000290,30000),
Array(5000217,30000), 
Array(5000216,30000),
Array(5000215,30000),
Array(5000231,30000),
Array(5000232,30000), 
Array(5000233,30000), 
Array(5000237,30000), 
Array(5000239,30000),
Array(5000249,35000),
Array(5000250,35000), 
Array(5000256,35000),
Array(5000261,35000),
Array(5000258,35000),
Array(5000257,35000),
Array(5000276,35000),
Array(5000277,35000),
Array(5000281,35000),
Array(5000282,35000),
Array(5000283,35000),
Array(5000316,35000),
Array(5000284,35000),
Array(5000320,35000),
Array(5000321,35000),
Array(5000322,35000),
Array(5000328,35000),
Array(5000330,35000),
Array(5000331,35000),
Array(5000332,35000),
Array(5000341,35000),
Array(5000342,35000),
Array(5000343,35000),
Array(5000344,35000),
Array(5000345,35000),
Array(5000137,35000),
Array(5000227,35000),
Array(5000038,35000),
Array(5000264,35000),
Array(5000369,35000),
Array(5000370,35000),
Array(5000371,35000),
Array(5000368,35000),
Array(5000381,35000),
Array(2432554,35000),
Array(5000385,35000),
Array(5000255,30000),
Array(5000054,30000),
Array(5000191,30000),
Array(5000310,30000),
Array(5000287,30000),
Array(5000311,30000),
Array(5000433,30000),
Array(5000434,30000),
Array(5000435,50000),
Array(5000402,50000),
Array(5000403,50000),
Array(5000404,50000),
Array(5000405,30000),
Array(5000406,30000),
Array(5000407,50000),
Array(1051441,50000),
Array(5001007,30000),
Array(5001009,30000),
Array(5000300,30000),
Array(5000301,30000),
Array(5000302,30000),
Array(5000303,30000),
Array(5000304,30000),
Array(5000305,30000),
Array(5000306,30000),
Array(5000307,30000),
Array(5000308,30000),
Array(5000033,30000),
Array(5000053,30000),
Array(5000094,30000),
Array(5000426,30000),
Array(5000427,30000),
Array(5000416,30000),
Array(5000417,30000),
Array(5000365,30000),
Array(5000367,30000),
Array(5000295,30000),
Array(5000294,30000),
Array(5000293,30000),
Array(5000408,30000),
Array(5000409,30000),
Array(5000391,30000),
Array(5000208,30000),
Array(5000205,30000),
Array(5000204,30000),
Array(5000035,30000),
Array(5000030,30000)
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
		//} else if(a == 2) {
		    //var itemid = itemlist[selection];
		    //var itemnum = Math.floor(Math.random()*1+1);
		//var item = im.gainGachaponItem(itemid, itemnum, "宠物");
		    //cm.gainPetItem(itemlist, 90);
		    //cm.gainPet(itemid, "我爱BMS", 15, 1642, 100, 0, -100);
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