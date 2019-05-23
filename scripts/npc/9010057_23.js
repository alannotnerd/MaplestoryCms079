/*
	根据每日活跃度完成进度领取奖励
*/

var status;
var head = "#fUI/UIWindow2.img/Quest/quest_info/summary_icon/summary#\r\n";

function start () {
	status = -1;
	action(1, 0, 0);
}

function action (mode, type, selection) {
	if (mode == 0) {
		cm.dispose();
		return;
	} else {
		status++;
	}

	if (status == 0) {
		// 所有活跃度任务：任务名称，对齐格式需填充的空格数量，任务ID，每日可接受次数，每次完成可获得活跃度
		var task = new Array(
							Array("每日签到(拍卖页面)", 13, 120101),
							Array("给装备砸卷", 21, 120102),
							Array("使用魔方", 23, 120103),
							Array("废弃任务", 23, 120104),
							Array("挑战扎昆", 23, 120105),
							Array("挑战品克缤", 21, 120106),
							Array("击杀任意BOSS", 19, 120107),
							Array("在线300分钟", 20, 120108),
							Array("在线800分钟", 20, 120109),
							Array("环任务", 25, 120110),
							Array("每日红包", 23, 120111),
							Array("兑换中介币", 21, 120112),
							Array("兑换点券", 23, 120113),
							Array("闯关副本", 23, 120114)
			);
		var activity = cm.getActivity();
		var isreceive = cm.getRecevieReward();
		var text = head + "#e┌\t\t\t   ─ 今日活跃进度 ─   \t\t\t┐#n\r\n\r\n";
		if (isreceive == -1) {
			text += "      #e#r活跃度：" + activity;
			if (activity >= cm.getMaxActivity()) {
				text += "(您已经领取了今日所有活跃奖励)";
			} else {
				text += "(距离领取下阶段奖励还需" + cm.getAQNextStageNeed() + "点)";
			}
		} else {
			text += "      " + "#L100#" + "#e#r活跃度：" + activity + "(点击领取第" + isreceive + "阶段的活跃奖励)#l";
		}
		text += "#k#n\r\n\r\n   任务名称					    活跃度(次)	完成进度\r\n\r\n";
		for (var i=0; i<task.length; i++) {
			var completecount = cm.getPlayer().MissionGetFinish(cm.getPlayer().getId(), task[i][2]);
			if (completecount - cm.getAQMaxTimes(task[i][2]) == 0) { // 如果该任务全部完成，将该任务的描述改为绿色
				text += "#g";
			}

			// 任务名称
			text += "   " + task[i][0];

			// 对其格式
			for (var j = task[i][1]; j > 0; j--) {
				text += " ";
			}
			// 推荐等级
			//text += getStar(task[i][1]);

			// 活跃度(次)
			text += cm.getAQActivity(task[i][2]) + "点";
			
			// 对其格式
			if (cm.getAQActivity(task[i][2]) - 10 < 0) {
				text += " ";
			}

			// 任务可完成次数
			text += "       " + completecount +"/" + cm.getAQMaxTimes(task[i][2]) + "次\r\n#k";
		}
		text += "#e\r\n└\t\t\t\t\t\t\t\t\t\t\t┘#n";

		cm.sendOkS(text, 2);
	} else if (status == 1) {
		if (selection == 100) {
			if (!cm.haveSpace(2)) {
				cm.sendOk("消耗栏空间不足，请整理后再试。");
				cm.dispose();
				return;
			}
			var recevieStage = cm.getRecevieReward();
			cm.gainItem(2431977 + (recevieStage - 1), 1);
			cm.setBossLog("活跃度礼包" + recevieStage);
			cm.sendOk("#r第" + recevieStage + "阶段活跃度礼包领取成功，快看看有什么好东西吧~");
			cm.worldMessage(0x18, "[活跃度系统] : 恭喜 " + cm.getChar().getName() + " 完成 " + recevieStage + " 阶段活跃度成功领取礼包。");
		}
		cm.dispose();
	}
}