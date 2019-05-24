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
			if(qm.getQuestStatus(4765)==2){
			qm.sendOk("你已经领取过奖励，继续努力到40级可以获得更多奖励喔");
			qm.forceCompleteQuest(4765);
			qm.dispose();
			}else{
			qm.sendNext("恭喜你当前等级已经到达#b30#k级。");
			}
		} else if (status == 1) {
			qm.sendOk("恭喜你等级达到了#r30#k级，你已经正式算是Gogo冒险岛的一员了，管理员为你助力送你一个皇家坐骑卷，你可以在豆豆屋抽取皇家坐骑一个哦！\r\n\r\n#fUI/UIWindow.img/QuestIcon/4/0#\r\n#v4001126# 500、#v4001215# 1个");
			qm.gainItem(4001126, 500);
			qm.gainItem(4001215, 1);
			qm.forceCompleteQuest(4765);
			qm.dispose();
		} 
	}
}
