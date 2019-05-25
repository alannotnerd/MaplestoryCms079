/*
 完成时间：2013年7月21日 12:13:28
 脚本功能：活动丰收
 */


var selects;
var mode;
var EventList = Array(
        Array("#r[HOTTIME] 隐藏的箱子。#k#l", 103),
        Array("#r[HOTTIME] 数字猜猜猜！#k#l", 104),
		Array("#r[每日6000点卷]20环任务#k#l", 110)
        );
var head = "#fUI/UIWindow2.img/Quest/quest_info/summary_icon/summary#\r\n";
var icon = "#fUI/UIWindow2.img/QuestAlarm/BtQ/normal/0#";

function start() {
    status = -1;
    action(1, 0, 0);
}

function action(mode, type, selection) {
    if (status >= 0 && mode == 0) {
		//cm.dispose();
        //cm.openNpc(90010057, 701)
        return;
    }
    if (mode == 1)
        status++;
    else
        status--;

    if (status == 0) {
        var text = head + "目前" + cm.getServerName() + "已开始的活动有下列\r\n请按照您的喜好选择活动：\r\n#b"
        for (var i = 0; i < EventList.length; i++) {
            text += "#L" + i + "# " + icon + EventList[i][0] + "\r\n"
        }
        cm.sendSimple(text)
    } else if (status == 1) {
            selects = selection;
            mode = EventList[selects][1];
            if (EventList[selects][1] >= 10000) {
                cm.openNpc(mode);
            } else {
				cm.dispose();
                cm.openNpc(9900003, mode);
                //cm.setNPC_Mode(0)
            }
    }
}