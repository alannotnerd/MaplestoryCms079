var status = -1;

function start(mode, type, selection) {
	if (mode == -1) {
		qm.dispose();
	} else {
		if (mode == 1)
			status++;
		else
			status--;
		if (status == 0) {
			if(qm.getQuestStatus(4767)==2){
			qm.sendOk("你已经领取过奖励，继续努力到60级可以获得更多奖励喔");
			qm.dispose();
			}else{
			qm.sendNext("恭喜你当前等级已经到达#b50#k级。");
			}
		} else if (status == 1) {
			qm.sendOk("恭喜你等级达到了#r50#k级，你在Gogo冒险岛已经算是小有成就了，管理员为你助力送你一个末日风暴币，你可以在拍卖兑换【粉色扎昆头盔】一个，使用权：3天\r\n\r\n#fUI/UIWindow.img/QuestIcon/4/0#\r\n#v4001126# 1000、#v4310057# 1个");
			qm.gainItem(4001126, 1000);
			qm.gainItem(4310057, 1);
			qm.forceCompleteQuest(4767);
			qm.dispose();
		} 
	}
}
