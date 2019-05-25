var ii = "#fEffect/CharacterEff/1112904/0/0#"; //爱心彩色
var status = -1;
var itemList = Array(
		Array(1222058, 500, 1, 0), 
		Array(1452205, 500, 1, 0), 
		Array(1442223, 500, 1, 0), 
		Array(1402196, 500, 1, 0), 
		Array(1342082, 500, 1, 0), 
		Array(1252015, 500, 1, 0), 
		Array(1232057, 500, 1, 0), 
		Array(1322203, 500, 1, 0), 
		Array(1312153, 500, 1, 0), 
		Array(1382208, 500, 1, 0), 
		Array(1302275, 500, 1, 0), 
		Array(1522094, 500, 1, 0), 
		Array(1582016, 500, 1, 0), 
		Array(1482168, 500, 1, 0), 
		Array(1472214, 500, 1, 0), 
		Array(1462193, 500, 1, 0), 
		Array(1422140, 500, 1, 0), 
		Array(1552063, 500, 1, 0), 
		Array(1242061, 500, 1, 0),
		Array(1372177, 500, 1, 0), 
		Array(1242060, 500, 1, 0), 
		Array(1362090, 500, 1, 0), 
		Array(1532098, 500, 1, 0), 
		Array(1492179, 500, 1, 0), 
		Array(1412135, 500, 1, 0), 
		Array(1542063, 500, 1, 0), 
		Array(1262016, 500, 1, 0), 
		Array(1332225, 500, 1, 0), 
		Array(1002391, 500, 1, 0), 
		Array(1212063, 500, 1, 0), 
		Array(1432167, 500, 1, 0),
		Array(1372222, 150, 1, 0),
		Array(1232109, 150, 1, 0),
		Array(1332274, 150, 1, 0),
		Array(1332274, 150, 1, 0),
		Array(1362135, 150, 1, 0),
		Array(1242116, 150, 1, 0),
		Array(1342101, 150, 1, 0),
		Array(1242120, 150, 1, 0),
		Array(1582017, 150, 1, 0),
		Array(1492231, 150, 1, 0),
		Array(1552110, 150, 1, 0),
		Array(1102775, 150, 1, 0),
		Array(1442268, 150, 1, 0),
		Array(1432214, 150, 1, 0),
		Array(1412177, 150, 1, 0),
		Array(1542108, 150, 1, 0),
		Array(1252093, 150, 1, 0),
		Array(1152174, 150, 1, 0),
		Array(1312199, 150, 1, 0),
		Array(1102797, 150, 1, 0),
		Array(1102796, 150, 1, 0),
		Array(1462239, 150, 1, 0),
		Array(1082637, 150, 1, 0),
		Array(1082636, 150, 1, 0),
		Array(1102795, 150, 1, 0),
		Array(1082639, 150, 1, 0),
		Array(1102794, 150, 1, 0),
		Array(1082638, 150, 1, 0),
		Array(1082640, 150, 1, 0),
		Array(1522138, 150, 1, 0),
		Array(1322250, 150, 1, 0),
		Array(1073030, 150, 1, 0),
		Array(1073033, 150, 1, 0),
		Array(1402251, 150, 1, 0),
		Array(1152177, 150, 1, 0),
		Array(1073032, 150, 1, 0),
		Array(1152176, 150, 1, 0),
		Array(1073035, 150, 1, 0),
		Array(1152179, 150, 1, 0),
		Array(1073034, 150, 1, 0),
		Array(1152178, 150, 1, 0),
		Array(1532144, 150, 1, 0),
		Array(1302333, 150, 1, 0),
		Array(1004422, 150, 1, 0),
		Array(1004423, 150, 1, 0),
		Array(1052890, 150, 1, 0),
		Array(1052888, 150, 1, 0),
		Array(1052889, 150, 1, 0),
		Array(1472261, 150, 1, 0),
		Array(1052887, 150, 1, 0),
		Array(1052882, 150, 1, 0),
		Array(1004424, 150, 1, 0),
		Array(1004425, 150, 1, 0),
		Array(1382259, 150, 1, 0),
		Array(1004426, 150, 1, 0),
		Array(1222109, 150, 1, 0),
		Array(1482216, 150, 1, 0),
		Array(1422184, 150, 1, 0),
		Array(1212115, 150, 1, 0),
		Array(1452252, 150, 1, 0),
		Array(1262017, 150, 1, 0));

		
function action(mode, type, selection) {
	ttcj = parseInt(cm.getHyPay(1)/50);
	if (mode == 1) {
		status++;
	} else {
		if (status == 0) {
			//cm.sendOk("不想使用吗？…我的肚子里有各类#b奇特座椅或卷轴、装备、新奇道具#k哦！");
			cm.dispose();
		}
		status--;
	}
	if (status == 0) {
	   var selStr = ii+""+ii+""+ii+""+ii+""+ii+""+ii+""+ii+""+ii+""+ii+""+ii+""+ii+""+ii+""+ii+""+ii+""+ii+""+ii+""+ii+""+ii+""+ii+""+ii+""+ii+""+ii+""+ii+""+ii+""+ii+""+ii+""+ii+""+ii+""+ii+"\r\n";
	   selStr += "#d想抽奖吗？ 精品道具入谁家？ 我这里有150-160不等高级道具魔方 卷轴 奇特座椅 时装 等新奇道具 [ #r还在等待吗 ]\r\n\r\n";
	   selStr += "#r[ #h # ]#d玩家余额：#r"+cm.getHyPay(1)+"  #b[ 50余额抽一回 ]\r\n\r\n";
	   selStr += "#L0#开始抽奖 [可抽#r "+ttcj+" #b次]         #r☆奖品图鉴如下☆#l\r\n\r\n";
	   selStr += "#v1062169##v1062168##v1062167##v1062166##v1062165##v1003801##v1003800##v1003799##v1003798##v1003797##v1042258##v1042257##v1042256##v1042255##v1042254##v1222058##v1452205##v1442223#"
	   cm.sendSimple(selStr);
	}
	//else if (status == 1) {
		//if (cm.addHyPay(50,true)) {
			//cm.sendYesNo("你确定要抽奖吗可是#r50#k余额，想清楚在找我");
		//} else {
			//cm.sendOk("你有#b50#k余额吗?");
			//cm.safeDispose();
		//}
	 else if (status == 1) {
		 (cm.addHyPay(50,true));
		var chance = Math.floor(Math.random() * 1000);
		var finalitem = Array();
		for (var i = 0; i < itemList.length; i++) {
			if (itemList[i][1] >= chance) {
				finalitem.push(itemList[i]);
			}
		}
		if (finalitem.length != 0) {
			var random = new java.util.Random();
			var finalchance = random.nextInt(finalitem.length);
			var itemId = finalitem[finalchance][0];
			var quantity = finalitem[finalchance][2];
			var notice = finalitem[finalchance][3];
			if (cm.getHyPay(1) && cm.canHold()) {
				if (notice == 1) {
					cm.gainGachaponItem(itemId, quantity, "");
				} else {
					cm.gainItem(itemId, quantity);
				}
				//(cm.getHyPay(1)-50);
				cm.sendOk("你获得了 #b#t" + itemId + "##k " + quantity + "个。");
			} else {
				cm.sendOk("你确实有#b50#k余额吗？如果是，请你确认在背包的装备，消耗，其他窗口中是否有一格以上的空间。");
			}
			cm.safeDispose();
			//var status -1;
		} else {
			cm.sendOk("今天的运气可真差，什么都没有拿到。");
			//(cm.getHyPay(1)-50);
			//cm.gainItem(2431174, 1);
			cm.safeDispose();
			 //status -1;
		}
	} else {
		//status = -1;
		cm.dispose();
		//var status = -1;
	}
}
