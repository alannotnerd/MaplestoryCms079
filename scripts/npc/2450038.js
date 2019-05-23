/*脚本由【小情绪】 提供分享 
如果喜欢 还会和大家分享
*/
var status = 0;
var ab = "#fEffect/CharacterEff/1112925/0/0#"; //蓝星
var ad = "#fEffect/CharacterEff/1112926/0/0#"; //红星
var ww = "#fEffect/CharacterEff/1042176/0/0#"; //爱心红
var wi14 = "#fUI/UIPVP.img/MiniMapIcon/star#";  //黄星星
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
	if (cm.getMapId() == 180000001) {
		cm.sendOk("很遗憾，您因为违反用户守则被禁止游戏活动，如有异议请联系管理员.");
		cm.dispose();
	} else if (status == 0) {
	var selStr = "                #d#e"+ab+"小情绪万能商店"+ad+"\r\n\r\n";
	selStr += "#L0#"+ww+" #b★☆点卷商城  #v5062009# #v5520001# #v2531005# #v2048301##l\r\n";
	selStr += "#L1#"+ww+" #b★☆抵用商城  #v1552075# #v3010760# #v4030034# #v1672067##l\r\n";
	selStr += "#L2#"+ww+" #r★☆点装商城  #v2432309# #v5000264# #v1050209# #v1112947##l\r\n\r\n";
	selStr += "#L3#"+wi14+" #b杂货商店#l  #L4#"+wi14+" 宠物商店#l  #L5#"+wi14+" 口袋商店#l\r\n\r\n";
	selStr += "#L6#"+wi14+" 武器商店#l  #L7#"+wi14+" 土豪商城#l  #L8#"+wi14+" 特殊币店#l\r\n";
	cm.sendSimple(selStr);
	} else if (status == 1) {
		switch (selection) {
		case 0:
		   cm.dispose();
		   cm.openNpc(9000069,6);
		   break;
		case 1:
		   cm.dispose();
		   cm.openNpc(9900004,19);
		   break;
		case 2:
		   cm.dispose();
		   cm.openNpc(9310074,1);
		   break;
		case 3:
		   cm.dispose();
		   cm.openShop(1012123);
		   break;
		case 4:
		   cm.dispose();
		   cm.openNpc();
		   break;
		case 5:
		   cm.dispose();
		   cm.openNpc();
		   break;
		case 6:
		   cm.dispose();
		   cm.openNpc(9310362,9);
		   break;
		case 7:
		   cm.dispose();
		   cm.openNpc(9900004,15);
		   break;
		case 8:
		   cm.dispose();
		   cm.openNpc();
		   break;   
		}
	}
}