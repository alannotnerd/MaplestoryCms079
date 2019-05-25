var a = 0;
var ion = "#fUI/UIWindow2.img/QuestAlarm/BtQ/normal/0#"
var text;
var selects; //记录玩家的选项
var buynum = 0;
var itemlist = Array(
Array(1042214,30000),
Array(1042204,30000),
Array(1042202,30000),
Array(1042200,30000),
Array(1042199,30000),  
Array(1042193,30000),
Array(1042194,30000), 
Array(1042221,30000), 
Array(1042242,30000),
Array(1042238,30000), 
Array(1042236,30000),
Array(1042235,30000),
Array(1042277,30000),
Array(1042278,30000), 
Array(1042269,30000), 
Array(1042268,30000), 
Array(1042267,30000),
Array(1042265,35000),
Array(1042264,35000), 
Array(1042263,35000),
Array(1042240,35000),
Array(1042217,35000),
Array(1042260,35000),
Array(1042345,35000),
Array(1042343,35000),
Array(1042342,35000),
Array(1042341,35000),
Array(1042339,35000),
Array(1042340,35000),
Array(1042334,35000),
Array(1042333,35000),
Array(1042332,35000),
Array(1042320,35000),
Array(1042329,35000),
Array(1042357,35000),
Array(1041104,35000),
Array(1042181,35000),
Array(1052671,35000),
Array(1053053,35000),
Array(1053052,35000),
Array(1053051,35000),
Array(1053046,35000),
Array(1053045,35000),
Array(1053042,35000),
Array(1053041,35000),
Array(1053040,35000),
Array(1053006,35000),
Array(1052999,35000),
Array(1052998,35000),
Array(1052997,35000),
Array(1052953,35000),
Array(1051434,35000),
Array(1051351,35000),
Array(1052940,30000),
Array(1042335,30000),
Array(1042336,30000),
Array(1042337,30000),
Array(1042338,30000),
Array(1052951,30000),
Array(1040194,30000),
Array(1041196,30000),
Array(1051440,50000),
Array(1050371,50000),
Array(1050378,50000),
Array(1051453,50000),
Array(1051454,30000),
Array(1051456,30000),
Array(1051457,50000),
Array(1051441,50000),
Array(1052919,30000),
Array(1052925,30000),
Array(1051422,30000),
Array(1042344,30000),
Array(1051386,30000),
Array(1051303,30000),
Array(1051098,30000),
Array(1051172,30000),
Array(1051070,30000),
Array(1042204,30000),
Array(1042198,30000),
Array(1052626,30000),
Array(1051414,30000),
Array(1051385,30000),
Array(1050314,30000),
Array(1042330,30000),
Array(1052605,30000),
Array(1042314,30000),
Array(1041114,30000),
Array(1052709,30000),
Array(1052657,30000),
Array(1051366,30000),
Array(1052727,30000),
Array(1050310,30000),
Array(1042159,30000),
Array(1042285,30000),
Array(1042275,30000),
Array(1052656,30000),
Array(1052550,30000),
Array(1042315,30000),
Array(1051390,30000),
Array(1042316,30000),
Array(1042319,30000),
Array(1050319,30000),
Array(1051392,30000),
Array(1050299,30000),
Array(1052782,30000),
Array(1052781,30000),
Array(1042214,30000),
Array(1042311,30000),
Array(1042312,30000),
Array(1004428,30000),
Array(1042321,30000),
Array(1042313,30000),
Array(1050152,30000),
Array(1051180,30000),
Array(1042104,30000),
Array(1042105,30000),
Array(1052224,30000),
Array(1042142,30000),
Array(1041142,30000),
Array(1052200,30000),
Array(1052061,30000),
Array(1052058,30000),
Array(1051131,30000),
Array(1051150,30000),
Array(1051151,30000),
Array(1051152,30000),
Array(1051153,30000),
Array(1050210,30000),
Array(1051256,30000),
Array(1050229,30000),
Array(1052293,30000),
Array(1051278,30000),
Array(1051280,30000),
Array(1050227,30000),
Array(1051235,30000),
Array(1052201,30000),
Array(1050232,30000),
Array(1051282,30000),
Array(1052294,30000),
Array(1052425,30000),
Array(1052412,30000),
Array(1052455,30000),
Array(1052503,30000),
Array(1051261,30000),
Array(1050230,30000),
Array(1051127,30000),
Array(1051149,30000),
Array(1051192,30000),
Array(1051255,30000),
Array(1042238,30000),
Array(1040192,30000),
Array(1041194,30000),
Array(1042265,30000),
Array(1042241,30000),
Array(1052593,30000),
Array(1052536,30000),
Array(1050312,30000),
Array(1042236,30000),
Array(1042262,30000),
Array(1052661,30000),
Array(1050355,30000),
Array(1004025,30000),
Array(1050119,30000),
Array(1042263,30000)
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