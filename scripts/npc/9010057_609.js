
var status = 0;
var ttt ="#fUI/UIWindow/Quest/icon2/7#";//"+ttt+"//美化1
var ttt2 ="#fUI/UIWindow/Quest/icon6/7#";////美化2
var ttt3 ="#fUI/UIWindow/Quest/icon3/6#";//"+ttt3+"//美化圆
var ttt4 ="#fUI/UIWindow/Quest/icon5/1#";//"+ttt4+"//美化New
var ttt5 ="#fUI/UIWindow/Quest/icon0#";////美化!
var ttt7 ="#fUI/Basic/BtHide3/mouseOver/0#";//"+ttt6+"//美化会员
var ttt6 ="#fUI/UIWindow2.img/QuestAlarm/BtQ/normal/0#";
//"#fUI/UIWindow.img/PvP/Scroll/enabled/next2#";
var head = "#fUI/UIWindow2.img/Quest/quest_info/summary_icon/summary#\r\n";

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
            cm.sendOk(head + "很遗憾，您因为违反用户守则被禁止游戏活动，如有异议请联系管理员.")
            cm.dispose();
        } 
    else if (status == 0) {
		var selStr = head + "\r\n#e#d奇幻国度充值奖励系统#n#l#k\r\n";
		selStr +="\r\n提示：充值比率1：1000点卷，支付宝或者网银充值会额外赠送5%点卷奖励。#k\r\n\r\n";
		selStr +="#r#L0#"+ttt6+" 累计充值奖励[每项只能领取一次]#l\r\n";
		selStr +="#b#L1#"+ttt6+" 每日充值奖励[每项每日可领一次]#l\r\n";
		//selStr +="#g#L2#"+ttt6+" 打开充值网站[打开本服充值网站]#l#k\r\n\r\n";//
		selStr +=" ";
		//selStr +="\r\n#d======================================================#k\r\n";
        cm.sendSimple(selStr);
    } else if (status == 1) {
        switch (selection) {
        case 0:
            cm.dispose();
            cm.openNpc(9010057, 610);
            break;
        case 1:
            cm.dispose();
            cm.openNpc(9010057, 602);
            break; 
        case 2:
            cm.dispose();
            //cm.openWeb("http://www.libaopay.com/buy/?wid=40792");
            break; 
 
 
        }
    }
	}