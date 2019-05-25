
var status = 0;
var ttt ="#fUI/UIWindow/Quest/icon2/7#";//"+ttt+"//美化1
var ttt2 ="#fUI/UIWindow/Quest/icon6/7#";////美化2
var ttt3 ="#fUI/UIWindow/Quest/icon3/6#";//"+ttt3+"//美化圆
var ttt4 ="#fUI/UIWindow/Quest/icon5/1#";//"+ttt4+"//美化New
var ttt5 ="#fUI/UIWindow/Quest/icon0#";////美化!
var ttt7 ="#fUI/Basic/BtHide3/mouseOver/0#";//"+ttt6+"//美化会员
var ttt6 ="#fUI/UIWindow.img/PvP/Scroll/enabled/next2#";

var icon = "#fUI/UIWindow2.img/QuestAlarm/BtQ/normal/0#"
var icon2 = "#fUI/UIToolTip.img/Item/Equip/Star/Star#";

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
		var selStr = "";
		/*= "\r\n#e#d#L33#奇幻国度欢迎您。如果您对本服不了解请点这里#n#l#k\r\n";
		selStr +="\r\n#d======================================================#k\r\n";
		selStr +="#L15##r"+ttt6+"在线奖励#l#L17#"+ttt6+"充值奖励#l#k#b#L3#"+ttt6+"组队任务#l#L5#"+ttt6+"点卷中介#l\r\n\r\n";
		selStr +="#b#L12##r"+ttt6+"重置副本#l#L14#"+ttt6+"解锁密码#l\r\n\r\n";
		selStr +="#b#L19#"+ttt6+"装备制作#l#b#L16#"+ttt6+"活动奖励#l#b#L20#"+ttt6+"绑定商城#l\r\n\r\n";
		selStr +="#b#L21#"+ttt6+"超聚划算#l\r\n\r\n";
		//selStr +="#b#L1#"+ttt6+"每日寻宝#l#L2#"+ttt6+"现金购物#l#L3#"+ttt6+"日常任务#l#L5#"+ttt6+"点卷中介#l\r\n\r\n";
		//selStr +="#L4#"+ttt6+"美容美发#l#L10##r"+ttt6+"游戏宝贝#l#L9##r"+ttt6+"魔法物品#l#L11##b"+ttt6+"挑战首领#l\r\n\r\n";
		//selStr +="#b#L13#"+ttt6+"点卷任务#l#L12#"+ttt6+"重置副本#l#L14#"+ttt6+"解锁密码#l#k#L15##r"+ttt6+"在线奖励#l#k\r\n\r\n";
		//selStr +="#b#L16#"+ttt6+"金币商城#l#r#L17#"+ttt6+"充值奖励#l#b#L18#"+ttt6+"怪物币店#l#r#L19#"+ttt6+"RED币商店#l\r\n";
		selStr += "\r\n#d======================================================#k\r\n";*/
		selStr += "  #fUI/UIWindow2.img/Quest/quest_info/summary_icon/summary#\r\n";
		selStr += "  " + icon2 + "奇幻国度:为你服务是我们一生的荣幸 ^_^ \r\n";
		selStr += "#L15##r" + icon + "在线奖励#l#L20#" + icon + "绑定商城#l#k#b#L5#" + icon + "点卷中介#l\r\n\r\n";
		selStr += "#b#L12##r" + icon + "重置副本#l#L3#" + icon + "组队任务#l#L19#" + icon + "装备制作#l\r\n\r\n";
        	cm.sendSimple(selStr);
    } else if (status == 1) {
        switch (selection) {
        case 0:
            cm.dispose();
            cm.openNpc(9010057, 601);
            break;
        case 1:
            cm.dispose();
            cm.openNpc(9010057, 602);
            break;
        case 8:
            cm.dispose();
            cm.openNpc(9010057, 603);
            break;
        case 4:
            cm.dispose();
            cm.openNpc(9900003, 9);
            break;
        case 2:
            cm.dispose();
            cm.openNpc(9900003, 15);
            break;
        case 5:
            cm.dispose();
            cm.openNpc(9010057, 604);
            break;
        case 3:
            cm.dispose();
            cm.openNpc(9010057, 605);
            break; 
        case 6:
            cm.dispose();
            cm.openNpc(9020000);
            break; 
        case 7:
            cm.dispose();
            cm.openNpc(2040034);
            break;
        case 10:
            cm.dispose();
            cm.openNpc(9900003, 10);
            break;
		case 9:
            cm.dispose();
            cm.openNpc(9900003, 108);
            break;
		case 11:
            cm.dispose();
            cm.openNpc(9900003, 13);
            break;
		case 12:
            cm.dispose();
            cm.openNpc(9010057, 607);
            break;
		case 13:
            cm.dispose();
            cm.openNpc(9900003, 110);
            break;
		case 14:
            cm.dispose();
            cm.openNpc(9900003, 111);
            break;
	    case 15:
            cm.dispose();
            cm.openNpc(9010057, 608);
            break;
		case 16:
	    //cm.sendOk("近期开放");
            cm.dispose();
	    cm.openNpc(9310144, 1);
            //cm.openShop(500);
            break;
		case 17:
            cm.dispose();
            cm.openNpc(9010057, 609);
            break;
		case 18:
	    cm.sendOk("近期开放");
            cm.dispose();
            //cm.openShop(600);
            break;
		case 19:
            cm.dispose();
            cm.openNpc(9010057, 611);
            break;
		case 20:
            cm.dispose();
            cm.openNpc(9010057, 603);
            break;
		case 21:
            cm.dispose();
            cm.openNpc(9010057, 606);
            break;
        case 33:
            cm.dispose();
            cm.openNpc(9330006);
            break;       













}
    }
}
