/* 
	累积充值领取礼包
*/
var ca = java.util.Calendar.getInstance();
var hour = ca.get(java.util.Calendar.HOUR_OF_DAY); //获得小时
var minute = ca.get(java.util.Calendar.MINUTE);//获得分钟
var second = ca.get(java.util.Calendar.SECOND); //获得秒
var head = "#fUI/UIWindow2.img/Quest/quest_info/summary_icon/summary#\r\n";
var icon = "#fUI/UIWindow2.img/QuestAlarm/BtQ/normal/0#"

// 最高累积天数
var day = 7;
// 每个阶段礼包所需的充值数
var condition = new Array(30, 50, 100, 200);
// 礼包内容
var reward = new Array(
					// 礼包1
					Array(1, 5062002, 5),
					Array(1, 5064000, 2),
					Array(1, 2340000, 5),
					Array(1, 2049323, 2),

					// 礼包2
					Array(2, 5062002, 10),
					Array(2, 5064000, 4),
					Array(2, 2340000, 10),
					Array(2, 2049323, 4),

					// 礼包3
					Array(3, 5062002, 15),
					Array(3, 5064000, 6),
					Array(3, 2340000, 15),
					Array(3, 2049323, 6),

					// 礼包4
					Array(4, 5062002, 30),
					Array(4, 5064000, 12),
					Array(4, 2340000, 30),
					Array(4, 2049323, 12),

					// 礼包5
					//Array(5, 3994417, 1),
					Array(5, 2049137, 10),
					Array(5, 5062002, 10),
					Array(5, 5062500, 10),
					Array(5, 2340000, 10),
					
					// 礼包6
					//Array(6, 3994418, 1),
					Array(6, 2049137, 15),
					Array(6, 5062002, 15),
					Array(6, 5062500, 15),
					Array(6, 2340000, 15),
					Array(6, 5064000, 15),

					// 礼包7
					//Array(7, 3994419, 1),
					Array(7, 2049137, 25),
					Array(7, 5062002, 25),
					Array(7, 5062500, 25),
					Array(7, 2340000, 25),
					Array(7, 5064000, 25),					

					// 礼包8
					Array(8, 3994417, 1),
					Array(8, 3994418, 1),
					Array(8, 3994419, 1),
					Array(8, 2049137, 66),
					Array(8, 5062002, 66),
					Array(8, 5062500, 66),
					Array(8, 2340000, 66),
					Array(8, 5064000, 66)
					//Array(8, 4001715, 3)
					);


var status = -1;
var text;
var paylog;
var sel;
var daily = "每日充值礼包";
var grandtotal = "7天累计充值礼包";
var giftname;

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

	if (status == 0) {
		paylog = cm.getSevenDayPayLog(day);
		text = head + "#e- 充值礼包领取 -#n\r\n\r\n";
		text += "#d您总共充值金额为： #r" + cm.getPlayer().getRMB() + " #d元，最近 #r7#d 日的充值记录为：#k\r\n\r\n\t#e";
		//text += "您最近7日的充值记录：\r\n\r\n\t#e";
		text += paylog + "#n\r\n#b";
		
		var loop = false;
		for (var i = 0; i < condition.length; i++) {
			giftname = (!loop ? daily : grandtotal) + (i + 1);
			if (!loop) {
				text += "#L" + i + "#" + icon + "领取每日充值" + condition[i] + "元奖励";
				if (i+1 == condition.length) {
					i = -1;
					loop = !loop;
				}
			} else {
				text += "#L" + (i + condition.length) + "#" + icon + "领取连续7天每日充值" + condition[i] + "元奖励";
			}
			if (cm.getPlayer().getBossLogAcc(giftname) > 0) {
				text += "(已领取)";
			}
			text += "#l\r\n";
		}

		cm.sendOk(text);
	} else if (status == 1) {
		// 23:50 ~ 23: 59 前一天不领取的时间  00:00 ~ 00:10 第二天不领取的时间  
		if ((hour == 23 && (minute >= 50 && minute <= 59)) || (hour == 0 && (minute >= 0 && minute <= 10))){
			cm.sendOk(head + "#d服务器当前时间： #r" + hour +" 时 " + minute + " 分 " + second + " 秒#k\r\n\r\n#e#d提示#n#k：#r23 ： 50 #b至#r 00 ： 10 #b时无法领取在线奖励。#k");
			cm.dispose();
			return;
		}
		sel = selection + 1;
		giftname = (selection < condition.length ? daily : grandtotal) + (selection < condition.length ? sel : sel - condition.length);
		if (cm.getPlayer().getBossLogAcc(giftname) > 0) {
			cm.sendOk(head + "这个礼包您已经领取过了");
			cm.dispose();
			return;
		}
		text = head + "#e- 礼包物品 -#n\r\n\r\n";
		for (var i = 0; i < reward.length; i++) {
			if (reward[i][0] == sel) {
				text += "#i" + reward[i][1] + "# #z" + reward[i][1] + "#[" + reward[i][2] + "个]\r\n";
			}
		}
		cm.sendYesNo(text);
	} else if (status == 2) {
		var rmb = sel <= condition.length ? condition[sel - 1] : condition[sel - 1 - condition.length];
		if (sel <= condition.length) {
			if (paylog.get(0) < rmb) {
				cm.sendOk("您今日充值不满" + rmb + "元，无法领取这个礼包。");
				cm.dispose();
				return;
			}
		} else {
			for (var i = 0; i < day; i++) {
				if (paylog.get(i) < rmb) {
					cm.sendOk("您最近7天没有达到连续充值" + rmb + "元，无法领取这个礼包。");
					cm.dispose();
					return;
				}
			}
		}
		var rewardlist = new Array();
		for (var i = 0; i < reward.length; i++) {
			if (reward[i][0] == sel) {
				rewardlist.push(new Array(reward[i][1], reward[i][2]));
			}
		}
		if (!cm.canHoldSlots(rewardlist.length)) {
			cm.sendOk("包裹空间不足，请确保包裹每个栏位有至少 " + rewardlist.length + " 格空间");
			cm.dispose();
			return;
		}
		for (var i = 0; i < rewardlist.length; i++) {
			cm.gainItem(rewardlist[i][0], rewardlist[i][1]);
		}
		cm.setBossLogAcc(giftname);
		cm.playerMessage(1, "领取成功！");
		//cm.channelMessage(0x18, "『每日充值』" + " : " + "玩家 " + cm.getChar().getName() + " 领取了每日充值 " + condition[sel-1] + " 元奖励。");
		cm.dispose();
	}
}