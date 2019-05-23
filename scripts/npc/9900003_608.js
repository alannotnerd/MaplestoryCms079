
var status = -1;
var text;
var sel;
var time;
var aaa ="#fUI/UIWindow.img/PvP/Scroll/enabled/next2#";
var ca = java.util.Calendar.getInstance();
var hour = ca.get(java.util.Calendar.HOUR_OF_DAY); //获得小时
var minute = ca.get(java.util.Calendar.MINUTE);//获得分钟
var second = ca.get(java.util.Calendar.SECOND); //获得秒

// 每个礼包所需的在线时长
var condition = new Array(30, 60, 120, 360, 560, 720, 850, 1000, 1250);
var reward = new Array(// 礼包编号、道具id、数量
					// 30
					Array(1, 2000005, 200), //超级药水
					Array(1, 5072000, 5, 1),  //喇叭5个
					Array(1, 2450020, 1),  //经验值1.5倍
					Array(1, 2431738, 1),

					// 60
					Array(2, 5062000, 10),
					Array(2, 5072000, 5, 1),  //喇叭5个
					Array(2, 2450020, 1),  //经验值1.5倍
					Array(2, 4310110, 2),  //春节纪念币
					Array(2, 2431739, 1),
					
					// 120
					Array(3, 2340000, 3),
					Array(3, 5064000, 3),
					Array(3, 5062002, 10),
					Array(3, 5076000, 5, 1), //道具喇叭
					Array(3, 2450020, 1),  //经验值1.5倍
					Array(3, 4001714, 1),
                    Array(3, 4001839, 20),
                    Array(3, 4001832, 20),
					Array(3, 4310110, 2),  //春节纪念币
					Array(3, 2431739, 2),
					Array(3, 2300001, 10),

					// 360
					Array(4, 2340000, 3),
					Array(4, 5064000, 3),
					Array(4, 5062002, 10),
					Array(4, 5062500, 10),
					Array(4, 2049306, 2), //高级装备强化卷
				      //Array(4, 2049116, 2),  //惊人正义20%
					Array(4, 2450020, 1),  //经验值1.5倍
					Array(4, 4001714, 1),
					Array(4, 4310110, 4),  //春节纪念币
                    Array(4, 4001839, 30),
                    Array(4, 4001832, 30),
					Array(4, 2430069, 1),
					Array(4, 2432353, 5),
					Array(4, 2431739, 4),
					Array(4, 2300001, 20),

					// 720
					Array(5, 4000463, 2),
					Array(5, 2340000, 10),
					Array(5, 5064000, 10),
					Array(5, 5062002, 20),
					Array(5, 5062500, 20),
				    Array(5, 5062009, 10),
					Array(5, 2049306, 5), //高级装备强化卷
					Array(5, 2049137, 100),  //惊人正义40%
					Array(5, 2049137, 100),  //惊人正义40%
					Array(5, 2049704, 1),  // A 级潜能卷
					Array(5, 2450020, 1),  // 经验值1.5倍
					Array(5, 4001714, 5),
					Array(5, 4310110, 2), // 春节纪念币
					Array(5, 2430069, 2),
					Array(5, 2432353, 10),
					Array(5, 2431741, 5),
					Array(5, 2290285, 2),
					Array(5, 2300001, 30),

					// 850
					Array(6, 2049323, 5),
					Array(6, 2300001, 50),
					Array(6, 5062000, 10),
					Array(6, 5062002, 30),
                    Array(6, 5062009, 20),
					Array(6, 4033356, 1),
					Array(6, 5062500, 30),
					Array(6, 4000463, 5),
					Array(6, 5064000, 10),
					Array(6, 2290285, 5),
					Array(6, 2340000, 10),
					Array(6, 2049752, 1),
                    Array(6, 2430069, 5),
					Array(6, 2049135, 5),
					Array(6, 4310110, 4),
					Array(6, 4001785, 2),
					Array(6, 4310015, 2),

					// 850
					Array(7, 5062000, 10),
					Array(7, 5072000, 5, 1),  //喇叭5个
					Array(7, 2450020, 1),  //经验值1.5倍
					Array(7, 4310110, 2),  //春节纪念币
					Array(7, 2431739, 1),
					
					// 1000
					Array(8, 2340000, 3),
					Array(8, 5064000, 3),
					Array(8, 5062002, 10),
					Array(8, 5076000, 5, 1), //道具喇叭
					Array(8, 2450020, 1),  //经验值1.5倍
					Array(8, 4001714, 1),
                    Array(8, 4001839, 20),
                    Array(8, 4001832, 20),
					Array(8, 4310110, 2),  //春节纪念币
					Array(8, 2431739, 2),
					Array(8, 2300001, 10),

					// 1250
					Array(9, 2340000, 3),
					Array(9, 5064000, 3),
					Array(9, 5062002, 10),
					Array(9, 5062500, 10),
					Array(9, 2049306, 2), //高级装备强化卷
				      //Ar9ay(4, 2049116, 2),  //惊人正义20%
					Array(9, 2450020, 1),  //经验值1.5倍
					Array(9, 4001714, 1),
					Array(9, 4310110, 4),  //春节纪念币
                    Array(9, 4001839, 30),
                    Array(9, 4001832, 30),
					Array(9, 2430069, 1),
					Array(9, 2432353, 5),
					Array(9, 2431739, 4),
					Array(9, 2300001, 20)
			);

function start() {
	action(1, 0, 0);
}

function action(mode, type, selection) {
	if (status == 0 && mode == 0)
	{
		cm.dispose();
		return;
	}
	if (mode == 1)
	{
		status++;
	} else {
		status--;
	}

	var time = cm.getGamePoints();
	var curlevel = -1;

	if (status == 0) {
		text = "#e#d您今天在" + cm.getServerName() +"世界时长为： #r" + time + "#k #d分钟#n#k\r\n#e#d提示#n#k：#e#r23 ： 50#n #b至#r #e00 ： 10#n #b时无法领取在线奖励。#k\r\n#b请在 #e#r23：50#n#b 分前领取当天未领取的奖励。以免造成损失。#k\r\n\r\n";
		for (var i = 1; i <= condition.length; i++) {
			text += "#b#L" + i + "#"+aaa+" 领取在线" + condition[i-1] + "分钟奖励";
			if (cm.getBossLog("在线礼包" + i) > 0) {
				text += "(已领取)";
				curlevel = curlevel == -1 ? i : curlevel;
			}
			text += "#l\r\n";
		}
		text += "#k";
		cm.sendSimple(text);
	} else if (status == 1) {
		// 23:50 ~ 23: 59 前一天不领取的时间  00:00 ~ 00:10 第二天不领取的时间  
		if ((hour == 23 && (minute >= 50 && minute <= 59)) || (hour == 0 && (minute >= 0 && minute <= 10))){
			cm.sendOk("#d服务器当前时间： #r" + hour +" 时 " + minute + " 分 " + second + " 秒#k\r\n\r\n#e#d提示#n#k：#r23 ： 50 #b至#r 00 ： 10 #b时无法领取在线奖励。#k");
			cm.dispose();
			return;
		}
		if (cm.getBossLog("在线礼包1" + selection) > 0) {
			cm.sendOk("这个礼包您已经领取过了");
			cm.dispose();
			return;
		}
		sel = selection;
		text = "\t\t\t\t#e#r- 在线 " + condition[selection - 1] + " 分钟奖励 -#k#n\r\n\r\n";
		for (var i = 0; i < reward.length; i++) {
			if (reward[i][0] == selection) {
				text += "\t\t\t#i" + reward[i][1] + "# #z" + reward[i][1] + "#[" + reward[i][2] + "个]\r\n";
			}
		}
		cm.sendYesNo(text);
	} else if (status == 2) {
		if (time < condition[sel-1]) {
			cm.sendOk("在线时间不足，无法领取。");
			cm.dispose();
			return;
		}
		var rewardlist = new Array();
		for (var i = 0; i < reward.length; i++) {
			if (reward[i][0] == sel) {
				if (reward[i][3] == null || reward[i][3] == '')
					reward[i][3]=0;
				rewardlist.push(new Array(reward[i][1], reward[i][2], reward[i][3]));
			}
		}
		if (!cm.canHoldSlots(rewardlist.length)) {
			cm.sendOk("包裹空间不足，请确保包裹每个栏位有至少 " + rewardlist.length + " 格空间");
			cm.dispose();
			return;
		}
		for (var i = 0; i < rewardlist.length; i++) {
			if (rewardlist[i][2] != 0) {
				//有期限道具
				cm.gainItemPeriod(rewardlist[i][0], rewardlist[i][1], rewardlist[i][2]);
				//java.lang.System.out.println("有");
			} else {
				//无期限道具
				cm.gainItem(rewardlist[i][0], rewardlist[i][1]);
			}
		}
		cm.setBossLog("在线礼包" + sel);
		cm.playerMessage(1, "领取成功！");
		//cm.channelMessage(0x22, "『在线时间奖励』" + " : " + "玩家 " + cm.getChar().getName() + " 领取了在线 " + condition[sel-1] + " 分钟奖励。");
		cm.worldMessage("『在线时间奖励』玩家["+ cm.getChar().getName() + "] 领取了在线"+ condition[sel-1]+"分钟奖励。");
		if (sel == 4) {
			cm.finishActivity(120108);
		} else if (sel == 6) {
			cm.finishActivity(120109);
		}
		cm.dispose();
	}
}
