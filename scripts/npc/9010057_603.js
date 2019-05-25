
var status = 0;
var ttt ="#fUI/UIWindow/Quest/icon2/7#";//"+ttt+"//美化1
var ttt2 ="#fUI/UIWindow/Quest/icon6/7#";////美化2
var ttt3 ="#fUI/UIWindow/Quest/icon3/6#";//"+ttt3+"//美化圆
var ttt4 ="#fUI/UIWindow/Quest/icon5/1#";//"+ttt4+"//美化New
var ttt5 ="#fUI/UIWindow/Quest/icon0#";////美化!
var ttt6 ="#fUI/UIWindow2.img/QuestAlarm/BtQ/normal/0#";
//"#fUI/UIWindow.img/PvP/Scroll/enabled/next2#";//"+ttt6+"//美化会员
var z = "#fUI/UIWindow.img/PvP/Scroll/enabled/next2#";//"+z+"//美化
var tt ="#fEffect/ItemEff/1112811/0/0#";//音符
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
        var selStr = head + "- #d#e绑定奇幻国度币商城系统#n#k：\r\n\r\n";
	selStr += "#d您当前拥有可用点卷为： #r " + cm.getPlayer().getCSPoints(1) + " #k#d点\r\n您当前拥有绑定奇幻国度币：  #r"+cm.getPlayerPoints()+"#k #d点#k\r\n\r\n";
	selStr += "#b#L0#"+ttt6+" 购买绑定奇幻国度币[点卷购买比率 1：10]#l\r\n\r\n";
	selStr += "#L1#"+ttt6+" 绑定奇幻国度币商城[内置抵用卷商店]#l\r\n\r\n";
	//selStr += "#L2#"+ttt6+" 打开网站进行充值[本服充值专用]#l\r\n\r\n";
        cm.sendSimple(selStr);
    } else if (status == 1) {
        switch (selection) {
        case 0:
            cm.dispose();
            cm.openNpc(9310144, 10);
            break;
        case 1:
            cm.dispose();
            cm.openNpc(9310144, 11);
            break;
        case 2:
            cm.dispose();
            //cm.openWeb("http://www.libaopay.com/buy/?wid=40792");
            break;
        













}
    }
}
