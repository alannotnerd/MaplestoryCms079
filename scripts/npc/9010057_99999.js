var status;
var text;
var packagelist = new Array(
	Array(1, 2000001),
	Array(10, 2000001),
	Array(20, 2000001),
	Array(30, 2000001),
	Array(40, 2000001)
	);
var icon = "#fUI/UIWindow2.img/QuestAlarm/BtQ/normal/0#";
var head = "#fUI/UIWindow2.img/Quest/quest_info/summary_icon/summary#\r\n";
var icon2 = "#fUI/UIToolTip.img/Item/Equip/Star/Star#";

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
        if (mode == 1)
            status++;
        else {
        	cm.dispose();
        	return;
        }

        var totaltime = cm.getPlayer().getTotalOnlineTime();

        if (status == 0) {
        	text = head + icon + "- 今日回顾 -\r\n\r\n";
        	text += icon2 + "今日在线时长：" + cm.getPlayer().getTodayOnlineTime() + "分钟\r\n";
        	text += icon2 + "在奇幻总时长：" + totaltime + "分钟\r\n";
        	var index = getNextPackage();
        	if (index > -1) {
        		var gaptime = packagelist[index][0] - totaltime;
        		if (gaptime <= 0) {
        			text += icon2 + "#r#e您现在可以立即领取 【在线" + packagelist[index][0] + "分钟礼包】#k#n";
        		} else {
        			text += icon2 + "再累积 " + gaptime + " 分钟即可获得 【在线" + packagelist[index][0] + "分钟礼包】";
        		}
        	}
        	text += "\r\n\r\n" + icon + "#e是否现在退出游戏？#n";
        	cm.sendYesNo(text);
        } else if (status == 1) {
        	cm.dispose();
        	cm.sendGameExit();
        }
    }
}

function getNextPackage() {
	var time = cm.getPlayer().getTotalOnlineTime();
	if (time > packagelist[packagelist.length - 1][0]) {
		return -1;
	}

	for (var i in packagelist) {
		if (time >= packagelist[i][0] && cm.getBossLog("总时长" + packagelist[i][0] + "分钟礼包") <= 0) {
			return i;
		}
	}
	return 0;
}