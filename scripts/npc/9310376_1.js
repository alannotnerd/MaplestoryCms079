var a = 0;
var ion = "#fUI/UIWindow2.img/QuestAlarm/BtQ/normal/0#"
var text;
var selects; //记录玩家的选项
var buynum = 0;
var itemlist = Array(
Array(1702693,35000),
Array(1702692,55000),
Array(1702686,55000),
Array(1702685,55000),
Array(1702684,55000),  
Array(1702682,55000),
Array(1702681,55000), 
Array(1702675,55000), 
Array(1702669,55000),
Array(1702660,55000), 
Array(1702654,55000),
Array(1702640,30000),
Array(1702637,30000),
Array(1702636,30000), 
Array(1702634,30000), 
Array(1702632,30000), 
Array(1702631,30000),
Array(1702629,30000),
Array(1702627,30000), 
Array(1702620,30000),
Array(1702616,30000),
Array(1702606,30000),
Array(1702605,30000),
Array(1702604,30000),
Array(1702603,30000),
Array(1702602,30000),
Array(1702601,30000),
Array(1702600,30000),
Array(1702589,30000),
Array(1702591,30000),
Array(1702593,30000),
Array(1702595,30000),
Array(1702608,30000),
Array(1702624,30000),
Array(1702628,30000),
Array(1702630,30000),
Array(1702633,30000),
Array(1702349,30000),
Array(1702597,30000),
Array(1702611,30000),
Array(1702617,30000),
Array(1702623,30000),
Array(1702625,30000),
Array(1702626,30000),
Array(1702607,30000),
Array(1702576,30000),
Array(1702549,30000),
Array(1702586,30000),
Array(1702594,30000),
Array(1702557,30000),
Array(1702560,30000),
Array(1702567,30000),
Array(1702566,30000),
Array(1702507,30000),
Array(1702489,30000),
Array(1702486,30000),
Array(1702488,30000),
Array(1702534,30000),
Array(1702533,30000),
Array(1702505,30000),
Array(1702503,30000),
Array(1702528,30000),
Array(1702501,30000),
Array(1702401,30000),
Array(1702478,30000),
Array(1702530,30000),
Array(1702382,30000),
Array(1702466,30000),
Array(1702334,30000),
Array(1702485,30000),
Array(1702509,30000),
Array(1702013,30000),
Array(1702374,30000),
Array(1702512,30000),
Array(1702459,30000),
Array(1702508,30000),
Array(1702233,30000),
Array(4000897,30000),
Array(1702228,30000),
Array(1702155,30000),
Array(1702182,30000),
Array(1702208,30000),
Array(1702285,30000),
Array(1702302,30000),
Array(1702261,30000),
Array(1702091,30000),
Array(1702168,30000),
Array(1702367,30000),
Array(1702341,30000),
Array(1322102,30000),
Array(1702366,30000),
Array(1702352,30000),
Array(1302037,30000),
Array(1302061,30000),
Array(1302063,30000),
Array(1302080,30000),
Array(1302084,30000),
Array(1302085,30000),
Array(1302087,30000),
Array(1302169,30000),
Array(1322051,30000),
Array(1332032,30000),
Array(1332053,30000),
Array(1372017,30000),
Array(1372031,30000),
Array(1402037,30000),
Array(1402049,30000),
Array(1402063,30000),
Array(1422011,30000),
Array(1432039,30000),
Array(1432046,30000),
Array(1442026,30000),
Array(1442028,30000),
Array(1442088,30000),
Array(1082019,30000),
Array(1702342,30000),
Array(1702337,30000),
Array(1702335,30000),
Array(1702330,30000),
Array(1702346,30000),
Array(1702340,30000),
Array(1702324,30000),
Array(1702056,30000),
Array(1412056,30000),
Array(1702310,30000),
Array(1702329,30000),
Array(1702316,30000),
Array(1702309,30000),
Array(1702408,30000),
Array(1702415,30000),
Array(1702403,30000),
Array(1702402,30000),
Array(1702375,30000),
Array(1702348,30000),
Array(1702442,30000),
Array(1702422,30000),
Array(1702446,30000)
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
				cm.worldSpouseMessage(0x20,"『稀有点装』 ：玩家 "+ cm.getChar().getName() +" 购买了"+itemlist[selects][0]+"，你还不快来买买买？");
                cm.dispose();
            } else {
                cm.sendOk("对不起，你没有足够的点卷。");
                cm.dispose();
			}
		}
	}
}