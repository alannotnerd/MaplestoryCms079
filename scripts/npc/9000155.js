var status = 0;
var ab = "#fEffect/CharacterEff/1112925/0/0#"; //蓝星
var ad = "#fEffect/CharacterEff/1112926/0/0#"; //红星
var ww = "#fEffect/CharacterEff/1042176/0/0#"; //爱心红
var wi14 = "#fUI/UIPVP.img/MiniMapIcon/star#"; //黄星星
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
		var selStr = "#n#k亲爱的#r#h ##k您好，请选择你需要 的功能！\r\n\r\n";
            selStr += "#L0#"+ab+"#r余额抽奖#l\r\n";
		cm.sendSimple(selStr);
	} else if (status == 1) {
	    switch (selection) {
	    case 0:
		   cm.dispose();
		   cm.openNpc(9010062);
		   break;
		}
	}
}