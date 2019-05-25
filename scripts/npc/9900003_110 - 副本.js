/*
	功能：每日任务 - 环任务20次
	备注：任务初始ID 100100，子任务依次加1，新任务分类的初始ID需间隔100，如100200
*/


var status = 0;
var text = "";
var questid = 100100;
var maxtimes = 20;
var playerid = 0;
var accepttimes = 0;
var questitemid = 0;
var questitemcs = 0;
var hitemid = 0;
var hitemcs = 0;
var questitems = Array(
						4000454,
						4000453,
						4000458,
						4000443,
						4000269,
						4000268,
						4000469,
						4000470,
						4003005,
						4000130,
						4000132,
						4000135,
						4000134,
						4000150,
						4000170,
						4000169,
						4000180,
						4000190,
						4000189,
						4000193,
						4000192,
						4000238,
						4000266,
						4000267,
						4000407,
						4000406,
						4000188,
						4000187,
						4000171,
						4000108,
						4000069,
						4000035,
						4000036,
						4000037,
						4000002,
						4000010,
						4000030,
						4000029,
						4000039

						);

function start () {
	status = -1;
	action(1, 0, 0);
}


function action (mode, type, selection) {
	if (mode == -1) {
		cm.dispose();
	} else {
		if (mode == 1) {
			status++;
		} else {
			status--;
		}

		if (status == -1) {
			cm.dispose();
		} else if (status == 0) {
			playerid = cm.getPlayer().getId();
			accepttimes = cm.getPlayer().MissionGetFinish(playerid, questid);
			text = "\t\t\t\t#e日常任务 - 环任务20次#n\r\n\r\n  您今日可再接取次数：#r" + (maxtimes-accepttimes) + "#k 次\r\n  完成每环任务会获得如下奖励：\r\n\t#r1个#t5062002#、大量游戏经验、15个征服币、50点卷\r\n\r\n#k";
			if (cm.getPlayer().MissionStatus(playerid, questid, 0, 4)) {  // 判断是否接取了任务
				if (cm.getPlayer().MissionStatus(playerid, questid, 0, 0)) { // 判断是否完成任务
					if (cm.getPlayer().MissionStatus(playerid, questid, maxtimes, 3)) { // 判断是否超过完成次数
						text += "您已经完成了今天的任务，请明天0点后再来吧~";
					} else {
						text += "#b#L0#接受任务#l#k\r\n";
						//cm.MissionReMake(playerid, questid, 1, 0, 0);
					}
				} else {
					hitemid = cm.getPlayer().MissionGetMobId(playerid, questid);
					hitemcs = cm.getPlayer().MissionGetMaxNum(playerid, questid, 0);
					text += "#e  当前第#r" + Math.max(1, accepttimes) + "#k环  收集 #r#z" + hitemid + "# " + hitemcs + "#k个#n\r\n\r\n\r\n";
					if (cm.haveItem(hitemid, hitemcs)) {	// 判断是否满足任务条件
						text += "#b#L1#完成任务#l\r\n";
					}
					text += "#r#L2#放弃任务 (无法获得任何奖励，且会消耗一次任务次数)#l\r\n";
				}
			} else {
				text += "#b#L3#接受任务#l\r\n";
			}
			cm.sendSimple(text);
		} else if (status == 1) {
			if (selection == 0) {			// 重新接受任务 初始化
				questitemid = questitems[Math.floor(Math.random()*questitems.length)];	// 任务道具ID
				questitemcs = Math.floor(Math.random()*15) + 20 + Math.floor(Math.random()*cm.getReborns());	// 任务道具数量
				text = "#e第#r" + (accepttimes + 1) + "#k环：\r\n\r\n任务条件： 收集#r#z" + questitemid + "# " + questitemcs + "个#k#n\r\n\r\n#k快去快回~";
				// 重新接受任务
				cm.getPlayer().MissionReMake(playerid, questid, 1, 0, 0);
				// 写入任务道具ID
				cm.getPlayer().MissionSetMobId(playerid, questid, questitemid);
				// 写入任务道具数量
				cm.getPlayer().MissionMaxNum(questid, questitemcs);
				cm.sendOk(text);
				cm.dispose();
			} else if (selection == 1) {	// 完成任务
				//accepttimes = cm.getPlayer().MissionGetFinish(playerid, questid);
				cm.getPlayer().MissionFinish(playerid, questid);
				var calcExp = Math.floor(cm.getPlayer().getExpNeededForLevel()*0.02)+Math.floor(Math.random()*1000000+1000000);
				cm.gainExp(calcExp);
                cm.gainItem(5062002, 1);
				cm.gainItem(4310036, 15);
                cm.getChar().modifyCSPoints(1,50);
				cm.gainItem(hitemid, -hitemcs);
				cm.finishActivity(120110);
				text = "恭喜您完成了任务~~";
				cm.sendOk(text);
				cm.channelMessage(0x18, "[日常任务]" + " : " + "恭喜玩家【" + cm.getChar().getName() + "】,完成了【第"+accepttimes+"环】任务获得了丰厚的奖励。");
                cm.playerMessage(-1, "获得经验"+calcExp);
				cm.playerMessage(-1, "获得征服币15个");
				cm.playerMessage(-1, "获得高级魔法1个");
				cm.playerMessage(-1, "获得50点卷");
				cm.dispose();
			} else if (selection == 2) {	// 放弃任务
				cm.getPlayer().MissionFinish(playerid, questid);
				text = "任务已放弃……";
				cm.sendOk(text);
				cm.dispose();
			} else if (selection == 3) {	// 接受任务
				questitemid = questitems[Math.floor(Math.random()*questitems.length)];	// 任务道具ID
				questitemcs = Math.floor(Math.random()*15) + 20 + Math.floor(Math.random()*cm.getReborns());	// 任务道具数量
				text = "#e第#r" + (accepttimes + 1) + "#k环：\r\n\r\n任务条件： 收集#r#z" + questitemid + "# " + questitemcs + "个#k#n\r\n\r\n#k快去快回~";
				// 创建任务，写入任务道具ID
				cm.getPlayer().MissionMake(playerid, questid, 1, 0, 0, questitemid);
				// 写入任务道具数量
				cm.getPlayer().MissionMaxNum(questid, questitemcs);
				cm.sendOk(text);
				cm.dispose();
			}
		}
	}
}