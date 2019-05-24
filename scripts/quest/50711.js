/*
	任务: 森林深处的真相 - 降魔十字旅团
	描述: 收到了有关背叛者#p9120218#的位置的情报。接到了抓捕#p9120218#的命令，她真的是背叛者吗？快赶去#b#m240010901##k揭开真相！
	获得: 4310018*35 - 十字金币
	      1112613*1 - 十字旅团降魔戒指
*/
var status = -1;

function start(mode, type, selection) {
    qm.dispose();
}

function end(mode, type, selection) {
    if (!qm.canHold(4310018, 35) || !qm.canHold(1112613, 1)) {
        qm.sendOk("背包空间不足.");
    } else {
        qm.gainItem(4310018, 35);
        qm.gainItem(1112613, 1);
        qm.forceCompleteQuest();
    }
    qm.dispose();
}