var status = 0;
var icon = "#fUI/UIWindow2.img/QuestAlarm/BtQ/normal/0#";//任务图标

function action(mode, type, selection) {
    if(mode == -1) {
        cm.dispose();
	} else {
        if(mode == 0 && status == 0) {
            cm.dispose();
			return;
		}
		if(mode == 1) status++;
		else {
            cm.dispose();
			return;
		}

		if(status == 0) {
			text = "#e#d您今天在" + cm.getServerName() +"世界时长为： #r" + time + "#k #d分钟#n#k\r\n"
		    text += icon + "#r新手成长系统简洁\r\n";
		    text += "#L0#" + icon + "#r【必须】新手出生礼包领取\r\n";
			text += "#L1#" + icon + "#r领取30星徽章一枚#v1190400#    \r\n";
			cm.sendSimple(text);
		}
	}
}