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
			if(qm.getQuestStatus(4762).getId()==2){
			qm.sendOk("你已经领取过奖励，继续努力到15级可以获得新奖励喔");
			qm.dispose();
			}else{
			qm.sendNext("恭喜你当前等级已经到达#b10#k级。");
			}
		} else if (status == 1) {
			qm.sendOk("恭喜你获得系统奖励！\r\n\r\n#fUI/UIWindow.img/QuestIcon/4/0#\r\n100000金币");
			qm.gainMeso(100000);
			qm.completeQuest();
			qm.dispose();
		} 
	}
}