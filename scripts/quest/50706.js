/*
	任务: 突袭！- 降魔十字旅团
	描述: 得知#b#p9120218##k背叛了十字旅团，现在正在派人追捕。真让人不敢相信。据说她要去和#b#o9400729##k接头，赶快到#b#m251010500##k#去追踪她吧。
	获得: 4310018*25 - 十字金币
	      1112611*1 - 十字旅团英雄戒指 III
*/
var status = -1;

function start(mode, type, selection) {
    if (!qm.canHold(4310018, 25) || !qm.canHold(1112611, 1)) {
        qm.sendOk("背包空间不足.");
    } else {
        qm.gainItem(4310018, 25);
        qm.gainItem(1112611, 1);
        qm.forceCompleteQuest(50709);
        qm.sendOk("Come to Leafre.");
        qm.forceCompleteQuest();
    }
    qm.dispose();
}
function end(mode, type, selection) {
    if (!qm.canHold(4310018, 25) || !qm.canHold(1112611, 1)) {
        qm.sendOk("背包空间不足.");
    } else {
        qm.gainItem(4310018, 25);
        qm.gainItem(1112611, 1);
        qm.forceCompleteQuest(50709);
        qm.sendOk("Come to Leafre.");
        qm.forceCompleteQuest();
    }
    qm.dispose();
}