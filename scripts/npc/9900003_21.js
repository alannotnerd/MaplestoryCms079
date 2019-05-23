
var status = 0;
var ttt ="#fUI/UIWindow/Quest/icon2/7#";//"+ttt+"//美化1
var ttt2 ="#fUI/UIWindow/Quest/icon6/7#";////美化2
var ttt3 ="#fUI/UIWindow/Quest/icon3/6#";//"+ttt3+"//美化圆
var ttt4 ="#fUI/UIWindow/Quest/icon5/1#";//"+ttt4+"//美化New
var ttt5 ="#fUI/UIWindow/Quest/icon0#";////美化!
var ttt7 ="#fUI/Basic/BtHide3/mouseOver/0#";//"+ttt6+"//美化会员
var ttt6 ="#fUI/UIWindow.img/PvP/Scroll/enabled/next2#";

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
		var selStr = "\r\n#e#d          欢迎使用征服者币购买物品#n#l#k\r\n";
		selStr +="\r\n#r提示：征服者币请消灭各BOSS或者世界各怪物掉落神秘之冰开出。购买时请注意看清楚，一旦购买概不退货。#k\r\n\r\n";
		selStr +="#b#L0#"+ttt6+" 制作140武器防具150武器防具#l\r\n";
		//selStr +="#L1#"+ttt6+" 购买各种职业副手装备之类等#l\r\n";
		selStr +="#L2#"+ttt6+" 购买各种消耗卷轴特殊之类等#l#k\r\n\r\n";
		selStr +=" ";
		//selStr +="\r\n#d======================================================#k\r\n";
        cm.sendSimple(selStr);
    } else if (status == 1) {
        switch (selection) {
        case 0:
            cm.dispose();
            cm.openNpc(9900003,24);
            break;
        case 1:
            cm.dispose();
            cm.openShop(22221);
            break; 
        case 2:
            cm.dispose();
            cm.openShop(22223);
            break; 
 
 
        }
    }
	}