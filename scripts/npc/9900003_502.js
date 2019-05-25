/*
	脚本名：连续签到
	作者：Memory
*/
var status = 0;
var times = 0;
var lasttime = 0;
var cal;
var year;
var month;
var day;
var date;

var listItem = Array(
	Array(5064000, 2), //防爆卷轴
	Array(5062000, 10), //神奇魔方
	Array(5064003, 2),  //极真保护之盾
	Array(2431741, 1),  //抵用券3000
	Array(5062002, 20),  //高级魔方
	Array(4310036, 1000),  //征服币
	Array(4032521, 1) //麦格拉斯
);
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
	//开始执行
	if (status == 0) {
/*		if (cm.getPlayer().getName() != "木公子观鱼") {
			cm.sendOk("你不是哈士奇，无法命令我。");
			cm.dispose();
			return;
		}
	*/	var info = getSignInfo();
		var text = "#b【连续签到】#k\r\n\r\n";
		var isSign = ""
		if (!info['isDone']) {
			text+="您已经连续签到了#e#r"+info['times']+"#k#n天。\r\n#r(同一账号下只限一个角色进行连续签到)\r\n#k您今天签到可以领取：\r\n";
		} else {
			isSign = "#r(今天已签到)#b";
			text+="您已经连续签到了#e#r"+info['times']+"#k#n天。\r\n#r(同一账号下只限一个角色进行连续签到)\r\n#k您明天签到可以领取：\r\n";
		}
		text+="#b#i"+listItem[info['times']][0]+":##t"+listItem[info['times']][0]+"##rx"+listItem[info['times']][1]+"#k个\r\n";
		//for(var i=0; i<listItem.length; i++) {
		//	text+="第"+(i+1)+"天：#b#i"+listItem[i][0]+":##t"+listItem[i][0]+"##rx"+listItem[i][1]+"#k个\r\n";
		//}
		text+="\r\n#b#L1#我要签到"+isSign+"#l\r\n";
		text+="#L2#查看所有奖励#l";
		cm.sendSimple(text);
	} else if (status == 1) {
		if (selection == 1) {
			var info = getSignInfo();
			if (cm.getPlayer().getTodayOnlineTime() < 120) {
				cm.sendOk("在线时间小于120分钟，不能签到，请过#r"+(120-cm.getPlayer().getTodayOnlineTime())+"分钟再来签到吧！#k");
				cm.dispose();
				return;
			}
			//if (cm.getPlayer().getLevel< 120)
			if (info['isDone']) {
				cm.sendOk("您今天已经签到过了，不能再进行签到");
				cm.dispose();
				return;
			}
			cm.sendOk("恭喜您，签到成功");
			cm.finishActivity(120111);
			cm.gainItem(listItem[info["times"]][0],listItem[info["times"]][1]);
			var times = info["times"]*1+1;
			if (info["times"]==6) {
				times=0;
			}
			var lastTime = times
			if (times==0) {
				lastTime=7;
			}
			cm.worldSpouseMessage(0x07, "[连续签到] : 玩家【"+cm.getChar().getName()+"】连续"+(lastTime)+"天签到，获取了丰厚的奖励");
			updateSign(times);
			cm.dispose();
		} else if (selection == 2 ){
			var text = "连续签到每日奖励如下：\r\n";
			for(var i=0; i<listItem.length; i++) {
				text+="第"+(i+1)+"天：#b#i"+listItem[i][0]+":##t"+listItem[i][0]+"##rx"+listItem[i][1]+"#k个\r\n";
			}
			cm.sendOk(text);
			cm.dispose();
		} else {
			cm.dispose();
		}
	}
}

function getSignInfo() {
	var lastTimestamp = null;
	var isDone = false;
	var conn = cm.getConnection();
	var pstmt = conn.prepareStatement("select lasttime, times from days_check_log where charid = "+cm.getPlayer().getAccountID()+";");
	var queryTimes = pstmt.executeQuery();
	if (queryTimes.next()) {
		times = queryTimes.getString("times");
		lasttime = queryTimes.getString("lasttime");
		lastTimestamp = lasttime.substring(0, 10);
		lastTimestamp +=" 00:00:00";
		lastTimestamp = java.sql.Timestamp.valueOf(lastTimestamp).getTime();
		queryTimes.close();
	} else {
		pstmt = conn.prepareStatement("insert into days_check_log(charid) values("+cm.getPlayer().getAccountID()+")");
		pstmt.executeUpdate();
		times=0;
	}
	pstmt.close();
	//conn.close();
	cal = java.util.Calendar.getInstance();
	refreshDates(cal);
	date = year + "-" + month + "-" + day + " 00:00:00";
	var currentTimestamp = java.sql.Timestamp.valueOf(date).getTime();
	if (Math.floor(currentTimestamp*1-lastTimestamp*1)<=0) {		
		isDone=true;
	}
	//java.lang.System.out.println((currentTimestamp-lastTimestamp));
	if ((currentTimestamp-lastTimestamp)>(86400*1000)) {
		times=0;
	}
	var info = new Array();
	info['lastTimestamp'] = lastTimestamp;
	info['currentTimestamp'] = currentTimestamp;
	info['times'] = times;
	info['isDone'] = isDone;
	return info;
}

function updateSign(times) {
	var conn = cm.getConnection();
	var pstmt = conn.prepareStatement("update days_check_log set times="+times+", lasttime=CURRENT_TIMESTAMP where charid="+cm.getPlayer().getAccountID()+";");
	pstmt.executeUpdate();
	pstmt.close();
	//conn.close();
}

function refreshDates(calendar) {
    year = calendar.get(java.util.Calendar.YEAR);
    month = calendar.get(java.util.Calendar.MONTH) + 1;
    if (Math.floor(month / 10) == 0) {
        month = "0" + month;
    }
    day = calendar.get(java.util.Calendar.DATE);
    if (Math.floor(day / 10) == 0) {
        day = "0" + day;
    }
}