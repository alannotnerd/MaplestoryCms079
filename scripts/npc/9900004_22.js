var hh = "#fEffect/CharacterEff/1112903/0/1#"; //爱心粉2
var status = 0;
function start() {
	status = -1;
	action(1, 0, 0);
}
function action(mode, type, selection) {
	if (status == 0 && mode == 0) {
		cm.dispose();
		return;
	}
	if (mode == 1) {
		status++;
	} else {
		status--;
	}
	if (status == 0) {
		var selStr = "#e#d┌-----------------充值中心------------------┐\r\n#l";
		selStr += "               #n#k小情绪游戏充值中心\r\n\r\n";
		selStr += "          #d▲ #k充值请联系GM给你发放双倍余额▲\r\n";
		selStr += "  ▲充值直接QQ震动你当前的开端主，震动到他给你充值#d▲\r\n";
		selStr += "               #r方法百试不爽，还不快去\r\n\r\n";
		selStr += "  #r▲   充值比例[ 1:1 ]   ▲△   [首冲双倍余额]    △\r\b\r\n";
		//selStr += "               #L0#累计充值抽奖系统\r\n";
		selStr += "#L1#" + hh + "#r充值余额#l  #L2#" + hh + "#b充值礼包#l  #L3#" + hh + "中介系统#l\r\n";
		selStr += "#L4#" + hh + "#r余额点卷#l  #L5#" + hh + "#b余额商城#l  #L6#" + hh + "余额礼包#l\r\n\r\n";
		selStr += "#d#e└------------------------------------------┘\r\n"
		cm.sendSimple(selStr);
	} else if (status == 1) {
		switch (selection) {
		case 0:
			cm.dispose();
			cm.openNpc();
			break;
		case 1:
			cm.dispose();
			//cm.openWeb("http://sae.kmmmhh.com/OnlinePay.html?m=34329&g=1143 ");
			cm.sendOk("#e#r充值请找端主，唯一充值官网www.shoukabao.com\r\n #d 端主太黑了咱们暴揍他一顿把，打死直接埋了")
			break;
		case 2:
			cm.dispose();
			cm.openNpc(9900004,23);
			break;
		case 3:
			cm.dispose();
			cm.openNpc(9310144,4);
			break;
		case 4:
			cm.dispose();
			cm.openNpc(9900004,24);
			break;
		case 5:
			cm.dispose();
			cm.openNpc(9310070,1);
			break;
		case 6:
			cm.dispose();
			cm.openNpc(9330254, 1);
			break;	
		}
	}
}
