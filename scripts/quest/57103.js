var status = -1;

function start(mode, type, selection) {
    if (mode == 1) {
        status++;
    } else {
        status--;
    }
    if (status == -1) {
        if (mode != 1) {
            qm.sendOk("目前还不是很清醒。");
        }
        qm.dispose();
    } else if (status == 0) {
        qm.sendYesNo("我是尼子家族的家臣，曾一起参加过本能寺攻略战，我叫山中幸盛，在介绍详细情况之前可以先知道一下怎麽称呼您吗？");
    } else if (status == 1) {
        if (!qm.isQuestActive(57103)) {
            qm.forceStartQuest();
        }
        qm.sendNext("我是松山家族的家臣，也是信包的儿子，我叫剑斗。", 2);
    } else if (status == 2) {
        qm.sendNextPrev("剑斗… 有听说过好几次，晓月类的神圣而名扬四海的剑斗，很荣幸见到你。");
    } else if (status == 3) {
        qm.sendNextPrev("感到荣幸的是我，可以见到忠义的榜样而有名的山中幸盛，有参加过本能寺 攻略战，若早一点知道的话，早就打招呼啦。", 2);
    } else if (status == 4) {
        qm.sendNextPrev("很想再聊多一点，但是先简单说一下在本能寺攻略战中发生的事情和目前的情况，若准备好了告诉一下。");
    } else {
        qm.dispose();
    }
	qm.completeQuest();
		qm.forceStartQuest(57104);
        qm.gainExp(621);
        qm.dispose();
}

function end(mode, type, selection) {
    
        qm.dispose();

}