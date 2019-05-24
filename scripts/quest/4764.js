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
			if(qm.getQuestStatus(4764)==2){
			qm.sendOk("你已经领取过奖励，继续努力到30级可以获得新奖励喔");
			qm.forceCompleteQuest(4764);
			qm.dispose();
			}else{
			qm.sendNext("恭喜你当前等级已经到达#b20#k级。");
			}
		} else if (status == 1) {
			qm.sendOk("恭喜你等级达到了#r20#k级，Gogo冒险岛真诚的欢迎你的到来，管理员为你助力送你一张装备租赁卷、你可以在大姐大处租赁武器一把，使用时间：一天使用权！\r\n\r\n#fUI/UIWindow.img/QuestIcon/4/0#\r\n#v5220007# 1张");
			qm.gainItem(5220007, 1);
			qm.forceCompleteQuest(4764);
			qm.dispose();
		} 
	}
}
