var status = 0
var text;
var wp1 = "#fUI/CashShop.img/CSEffect/number/9#";  //数字 后面改数字0-9
var wn7 = "#fUI/Basic.img/Cursor/43/3#";  //蓝圈
var wn6 = "#fUI/Basic.img/Cursor/34/0#";  //圈
var tz20 = "#fEffect/CharacterEff/1114000/1/0#";  //红星花
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
        } 
	else if (status == 0) {
	text = "#b您好！这里是店铺、仓库、地图爆率查询中心，请点击下面需要的服务！#l\r\n\r\n"
	text += "#L0#"+tz20+"[#r雇佣店铺#k管理#k]#l\r\n\r\n"
	text += "#L1#"+tz20+"[#r仓库服务#k管理#k]#l\r\n\r\n"
	text += "#L2#"+tz20+"[查看当前#r地图、怪物#k爆率#k]#l\r\n\r\n"
	cm.sendSimple(text);
	} else if (status == 1) {
        switch (selection) {
        case 1:
            cm.dispose();
            cm.openNpc(9030100);
            break;
		case 2:
            cm.dispose();
            cm.openNpc(9900003,5);
            break;	
		}
	}
}