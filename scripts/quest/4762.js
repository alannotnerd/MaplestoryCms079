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
			if(qm.getQuestStatus(4762)==2){
			qm.sendOk("你已经领取过奖励，继续努力到15级可以获得新奖励喔");
						qm.forceCompleteQuest(4762);
			qm.dispose();
			}else{
			qm.sendNext("恭喜你当前等级已经到达#b10#k级。");
			}
		} else if (status == 1) {
			qm.sendOk("恭喜你等级达到了#r10#k级，你已经正式踏上了Gogo冒险岛的征程，你们最帅的帅哥管理员为你助力送你点卷=100点，你可以在商城自行购买双倍哦！\r\n\r\n#fUI/UIWindow.img/QuestIcon/4/0#\r\n20金币、点卷=100点");
			qm.gainMeso(200000);
			qm.gainNX(100);
			qm.forceCompleteQuest(4762);
			qm.dispose();
		} 
	}
}
