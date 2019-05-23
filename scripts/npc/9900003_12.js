/*
 完成时间：2013年7月21日 12:13:28
 脚本功能：活动丰收
 */


var selects;
var mode;
var EventList = Array(
		Array("#r[签到福利] 每日签到#k#l", 7),
		Array("#r[签到福利] 连续签到#k#l", 502),
        Array("#r[HOTTIME] 隐藏的箱子。#k#l", 103),
        Array("#r[HOTTIME] 数字猜猜猜！#k#l", 104),
		Array("#r[日常任务] 月枫的需求#k#l", 110),
		Array("#r[日常任务] 金利奇的口袋#k#l", 120)
);

function start() {
    status = -1;
    action(1, 0, 0);
}

function action(mode, type, selection) {
    if (status >= 0 && mode == 0) {
       cm.openNpc(9900003)
        return;
    }
    if (mode == 1)
        status++;
    else
        status--;

    if (status == 0) {
        var text = "目前" + cm.getServerName() + "已开始的活动有下列\r\n请按照您的喜好选择活动：\r\n#b"
        for (var i = 0; i < EventList.length; i++) {
            text += "#L" + i + "# " + EventList[i][0] + "\r\n"
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