var status = 0;

var text;
var sel;
var time;
var head = "#fUI/UIWindow2.img/Quest/quest_info/summary_icon/summary#\r\n";
var icon = "#fUI/UIWindow2.img/QuestAlarm/BtQ/normal/0#";//任务图标
var aaa ="#fUI/UIWindow.img/PvP/Scroll/enabled/next2#";
var ca = java.util.Calendar.getInstance();
var hour = ca.get(java.util.Calendar.HOUR_OF_DAY); //获得小时
var minute = ca.get(java.util.Calendar.MINUTE);//获得分钟
var second = ca.get(java.util.Calendar.SECOND); //获得秒

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
		
	var time = cm.getGamePoints();
	var curlevel = -1;
	
    }
    if (cm.getMapId() == 180000001) {
            cm.sendOk("很遗憾，您因为违反用户守则被禁止游戏活动，如有异议请联系管理员.")
            cm.dispose();
        } 
    else if (status == 0) {
		
		text = "#d#e├---------------每日魔方皇家----------------┤\r\n";
		text += "#L0#"+icon+"#b每日魔方皇家[#v5150040#×10#v5150053#×10#v5062000#×50]#l\r\n\r\n";
		text += "     #e#k每个帐号每天限领#r1#k次   #k你目前已经领取#r0#k次"
        cm.sendSimple(text);
    } else if (status == 1) {
        switch (selection) {
        case 0://杂货商店
            cm.dispose();
            cm.openShop(1012123);
            break;
		
		}
    }
}