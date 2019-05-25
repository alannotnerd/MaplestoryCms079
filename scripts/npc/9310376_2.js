var a = 0;
var ion = "#fUI/UIWindow2.img/QuestAlarm/BtQ/normal/0#"
var text;
var selects; //记录玩家的选项
var buynum = 0;
var itemlist = Array(
Array(1102926,30000),
Array(1102920,80000),
Array(1102910,80000),
Array(1102908,80000),
Array(1102903,80000),  
Array(1102900,80000),
Array(1102884,30000), 
Array(1102876,30000), 
Array(1102875,30000),
Array(1102874,30000), 
Array(1102870,30000),
Array(1102869,30000),
Array(1102868,30000),
Array(1102853,30000), 
Array(1102865,30000), 
Array(1102863,30000), 
Array(1102861,30000),
Array(1102857,30000),
Array(1102858,30000), 
Array(1102859,30000),
Array(1102860,30000),
Array(1102864,30000),
Array(1102842,30000),
Array(1102844,30000),
Array(1102754,30000),
Array(1102816,30000),
Array(1102822,30000),
Array(1102836,30000),
Array(1102706,30000),
Array(1102841,30000),
Array(1102845,30000),
Array(1102847,30000),
Array(1102853,30000),
Array(1102854,30000),
Array(1102466,30000),
Array(1102572,30000),
Array(1102309,30000),
Array(1102308,30000),
Array(1102307,30000),
Array(1102757,30000),
Array(1102709,30000),
Array(1102699,30000),
Array(5010101,30000),
Array(1102376,30000),
Array(1102548,30000),
Array(1102587,30000),
Array(1102511,30000),
Array(1102683,30000),
Array(1102705,30000),
Array(1102550,30000),
Array(1102620,30000),
Array(1102583,30000),
Array(1102676,30000),
Array(1102644,30000),
Array(1102726,30000),
Array(1102142,30000),
Array(1102697,30000),
Array(1102688,30000),
Array(1102669,30000),
Array(1102225,30000),
Array(1102217,30000),
Array(1102157,30000),
Array(1102503,30000),
Array(1102380,30000),
Array(1102385,30000),
Array(1102386,30000),
Array(1102238,30000),
Array(1102245,30000),
Array(1102285,30000),
Array(1102286,30000),
Array(1102287,30000),
Array(1102270,30000),
Array(1102273,30000),
Array(1102288,30000),
Array(1102253,30000),
Array(1102298,30000),
Array(1102299,30000),
Array(1102297,30000),
Array(1102310,30000),
Array(1102319,30000),
Array(1102272,30000),
Array(1102323,30000),
Array(1102324,30000),
Array(1102349,30000),
Array(1102325,30000),
Array(1102326,30000),
Array(1102338,30000),
Array(1102350,30000),
Array(1102374,30000),
Array(1102353,30000),
Array(1102357,30000),
Array(1102593,30000),
Array(1102564,30000),
Array(1102615,30000),
Array(1102453,30000),
Array(1102450,30000),
Array(1102451,30000),
Array(1102452,30000),
Array(1102487,30000)
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