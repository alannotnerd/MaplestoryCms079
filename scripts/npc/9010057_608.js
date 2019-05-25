
var status = -1;
var text;
var sel;
var time;
var head = "#fUI/UIWindow2.img/Quest/quest_info/summary_icon/summary#\r\n";
var aaa = "#fUI/UIWindow2.img/QuestAlarm/BtQ/normal/0#";
//"#fUI/UIWindow.img/PvP/Scroll/enabled/next2#";
var ca = java.util.Calendar.getInstance();
var hour = ca.get(java.util.Calendar.HOUR_OF_DAY); //获得小时
var minute = ca.get(java.util.Calendar.MINUTE);//获得分钟
var second = ca.get(java.util.Calendar.SECOND); //获得秒

// 每个礼包所需的在线时长
var condition = new Array(10, 30, 60, 120, 300, 600, 800, 1000);
var reward = new Array(// 礼包编号、道具id、数量
					// 礼包1
					Array(1, 2000005, 100), //超级药水
					Array(1, 2450020, 1),

					// 礼包2
					Array(2, 2000005, 100),  //超级药水
					Array(2, 5130002, 1, 30 * 1000 * 60),  //强效护身符
					Array(2, 5072000, 5, 1),  //喇叭5个
					Array(2, 2450020, 2),  //经验值1.5倍

					// 礼包3
					Array(3, 5062500, 5),  //大师附加神奇魔方
					Array(3, 5062000, 5),  //神奇魔方
					Array(3, 5062002, 5),  //高级神奇魔方
					Array(3, 5030001, 1, 1), //雇佣商人一天权
					Array(3, 5076000, 5, 1), //道具喇叭
					Array(3, 2049306, 5), //高级装备强化卷
					Array(3, 4001713, 10),

					// 礼包4
					Array(4, 5062000, 8),
					Array(4, 5062002, 8),
					Array(4, 5062500, 8),
					Array(4, 2049306, 1), //高级装备强化卷
					//Array(4, 2049124, 3),  //正向混沌卷轴
					Array(3, 4001713, 5),
					Array(4, 4310110, 1),  //春节纪念币
					

					// 礼包5
					Array(5, 5062000, 10),
					Array(5, 5062002, 10),
					Array(5, 5062500, 10),
					Array(5, 2340000, 1),
					//Array(5, 2049124, 1),  //正向混沌卷轴
					Array(5, 2049306, 1), //高级装备强化卷
					Array(5, 4310110, 1),  //春节纪念币
					
					// 礼包6 
					Array(6, 5062000, 12),
					Array(6, 5062002, 12),
					Array(6, 5062500, 12),
					Array(6, 5062010, 1),  // 终极神奇魔方
					Array(6, 2049704, 1),  // A 级潜能卷
					Array(6, 2340000, 2),
					Array(6, 5064000, 2),  //防爆卷轴
					Array(6, 2049306, 1), //高级装备强化卷
					//Array(6, 2049124, 2), //正向混沌卷轴
					Array(6, 4310110, 2), //春节纪念币
					
				
					//礼包7
					Array(7, 5062000, 15),
					Array(7, 5062002, 15),
					Array(7, 5062500, 15),
					Array(7, 5062010, 5),  // 终极神奇魔方
					Array(7, 2340000, 3),
					Array(7, 5064000, 3),  //防爆卷轴
					Array(7, 2049306, 2), //高级装备强化卷
					//Array(7, 2049124, 3), //正向混沌卷轴
					Array(7, 4310110, 4), //春节纪念币
					
					//礼包8
					Array(8, 4001714, 15),
					Array(8, 5064000, 10),  //防爆卷轴
				    Array(8, 2450022, 2),
					Array(8, 2022709, 2),
					Array(8, 4310110, 5),  //春节纪念币
					Array(8, 5062010, 5),  // 终极神奇魔方
		            Array(8, 5062000, 15),
					Array(8, 5062002, 15),
					Array(8, 5062500, 15)
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
		text = head + "#e#d您今天在"+cm.getServerName()+"时长为： #r" + time + "#k #d分钟#n#k\r\n#e#d提示#n#k：#e#r23 ： 50#n #b至#r #e00 ： 10#n #b时无法领取在线奖励。#k\r\n#b请在 #e#r23：50#n#b 分前领取当天未领取的奖励。以免造成损失。#k\r\n\r\n";
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
			cm.sendOk(head + "#d服务器当前时间： #r" + hour +" 时 " + minute + " 分 " + second + " 秒#k\r\n\r\n#e#d提示#n#k：#r23 ： 50 #b至#r 00 ： 10 #b时无法领取在线奖励。#k");
			cm.dispose();
			return;
		}
		if (cm.getBossLog("在线礼包" + selection) > 0) {
			cm.sendOk(head + "这个礼包您已经领取过了");
			cm.dispose();
			return;
		}
		sel = selection;
		text = head + "#e#r- 在线 " + condition[selection - 1] + " 分钟奖励 -#k#n\r\n\r\n";
		for (var i = 0; i < reward.length; i++) {
			if (reward[i][0] == selection) {
				text += "#i" + reward[i][1] + "# #z" + reward[i][1] + "#[" + reward[i][2] + "个]\r\n";
			}
		}
		cm.sendYesNo(text);
	} else if (status == 2) {
		if (time < condition[sel-1]) {
			cm.sendOk(head + "在线时间不足，无法领取。");
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
			cm.sendOk(head + "包裹空间不足，请确保包裹每个栏位有至少 " + rewardlist.length + " 格空间");
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
		cm.showMessage(1, "『在线时间奖励』" + " : " + "玩家 " + cm.getChar().getName() + " 领取了在线 " + condition[sel-1] + " 分钟奖励。");
		if (sel == 5) {
			cm.finishActivity(120108);
		} else if (sel == 6) {
			cm.finishActivity(120109);
		}
		cm.dispose();
	}
}