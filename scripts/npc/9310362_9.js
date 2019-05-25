var status = 0
	var text;
var wp1 = "#fUI/CashShop.img/CSEffect/number/9#"; //数字 后面改数字0-9
var wn7 = "#fUI/Basic.img/Cursor/43/3#"; //蓝圈
var wn6 = "#fUI/Basic.img/Cursor/34/0#"; //圈
var tz20 = "#fEffect/CharacterEff/1114000/1/0#"; //红星花
var wp4 = "#fUI/CashShop.img/CSSubTabBar/Tab/4/Disable/0#"; //武器开头
var ppp = "#fEffect/CharacterEff/1112907/4/0#"; //泡炮
var axx1 = "#fEffect/CharacterEff/1062114/1/0#"; //爱心
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
		cm.sendOk("很遗憾，您因为违反用户守则被禁止游戏活动，如有异议请联系管理员.")
		cm.dispose();
	} else if (status == 0) {
		text = "#d├------------------全职业武器店------------------┤\r\n\r\n";
		text += "#L0#" + axx1 + "#r副手商店#b（超能力者.隐月.双弩.恶魔.幻影等）#l\r\n\r\n";
		text += "#L1#" + axx1 + "#d弓箭手#l#L2#" + axx1 + "#d飞侠飞镖（双刀）#l#L3#" + axx1 + "#d战士#l#L4#" + axx1 + "#d尖兵#l\r\n\r\n";
		text += "#L5#" + axx1 + "#d冒险家#l#L6#" + axx1 + "#d法师#l#L7#" + axx1 + "#d海盗#l#L8#" + axx1 + "#d幻影#l#L18#"+axx1+"#d爆破手\r\n\r\n";
		text += "#L9#" + axx1 + "#d恶魔猎手（复仇者）#l#L10#" + axx1 + "#d火炮#l#L11#" + axx1 + "#d夜光#l#L12#" + axx1 + "#d双弩#l\r\n\r\n";
		text += "#L13#" + axx1 + "#d超能力#l#L14#" + axx1 + "#d狂龙#l#L15#" + axx1 + "#d萌天使#l#L16#" + axx1 + "#d米哈尔#l\r\n\r\n";
		text += "#L17#" + axx1 + "#r外星人#k商店#l\r\n\r\n";
		text += "        #b温馨提示：特殊飞镖请到废弃药店补充飞镖哦！#l\r\n";
		cm.sendSimple(text);
	} else if (status == 1) {
		switch (selection) {
		case 0:
			cm.dispose();
			cm.openShop(1012127);
			break;
		case 1:
			cm.dispose();
			cm.openShop(1012128);
			break;
		case 2:
			cm.dispose();
			cm.openShop(1012129);
			break;
		case 3:
			cm.dispose();
			cm.openShop(1012130);
			break;
		case 4:
			cm.dispose();
			cm.openShop(1012131);
			break;
		case 5:
			cm.dispose();
			cm.openShop(1012132);
			break;
		case 6:
			cm.dispose();
			cm.openShop(1012133);
			break;
		case 7:
			cm.dispose();
			cm.openShop(1012134);
			break;
		case 8:
			cm.dispose();
			cm.openShop(1012135);
			break;
		case 9:
			cm.dispose();
			cm.openShop(1012136);
			break;
		case 10:
			cm.dispose();
			cm.openShop(1012137);
			break;
		case 11:
			cm.dispose();
			cm.openShop(1012138);
			break;
		case 12:
			cm.dispose();
			cm.openShop(1012139);
			break;
		case 13:
			cm.dispose();
			cm.openShop(1012140);
			break;
		case 14:
			cm.dispose();
			cm.openShop(1012141);
			break;
		case 15:
			cm.dispose();
			cm.openShop(1012142);
			break;
		case 16:
			cm.dispose();
			cm.openShop(1012143);
			break;
		case 17:
			cm.dispose();
			cm.openShop(1012144);
			break;
		case 18:
			cm.dispose();
			cm.openShop(1012145);
			break;	
		}
	}
}
