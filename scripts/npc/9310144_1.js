var status = 0;
var icon = "#fUI/UIWindow2.img/QuestAlarm/BtQ/normal/0#";
var ca = java.util.Calendar.getInstance();
var year = ca.get(java.util.Calendar.YEAR); //获得年份
var month = ca.get(java.util.Calendar.MONTH) + 1; //获得月份
var day = ca.get(java.util.Calendar.DATE);//获取日
var hour = ca.get(java.util.Calendar.HOUR_OF_DAY); //获得小时
var minute = ca.get(java.util.Calendar.MINUTE);//获得分钟
var second = ca.get(java.util.Calendar.SECOND); //获得秒
var weekday = ca.get(java.util.Calendar.DAY_OF_WEEK);
function start() {
	status = -1;
	action(1, 0, 0);
}

function action(mode, type, selection) {
	if (mode == -1) {
		cm.dispose();
	} else {
		if (mode == 0 && status == 0) {
			cm.dispose();
			return;
		}
	}
		if (mode == 1)
			status++;
		else
			status--;
		if (status == 0) { 
		var selStr ="   #r#e★★★★---------个人中心---------★★★★\r\n"
            selStr += " ☆☆☆☆#g感谢你的支持，有你我们会做的更好#r☆☆☆☆\r\n\r\n"
			selStr += icon+" #k当前帐号总赞助金额：#r"+cm.getRMB()+" #k元'\r\n\r\n"
			selStr += icon+" 目前点卷余额：#r"+cm.getNX(1)+" #k点\r\n\r\n";
			selStr += icon+" 抵用卷余额：#r"+cm.getNX(2)+" #k点\r\n\r\n";
			selStr += icon+" 游戏时间:#r"+hour+":"+minute+":"+second+"\r\n\r\n";
			selStr += icon+" #k今日在线：#r"+cm.getPlayer().getTodayOnlineTime()+" #k分钟\r\n";
         cm.sendSimple(selStr);
		}
}