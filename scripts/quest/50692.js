/*
	任务: 拯救克洛乌！- 降魔十字旅团
	描述: 受伤的#p9120217#为了恢复名誉，带着伤讨伐#o6220001#去了。到#m221040400#那边去救他吧。
	获得: 4310018*15 - 十字金币
	      1112606*1 - 十字旅团勇士戒指 I
*/
var status = -1;

function start(mode, type, selection) {
    if (!qm.canHold(4310018, 15) || !qm.canHold(1112606, 1)) {
        qm.sendOk("背包空间不足.");
    } else {
        qm.gainItem(4310018, 15);
        qm.gainItem(1112606, 1);
        qm.forceCompleteQuest(50694);
        qm.sendOk("Come to Nihal Desert.");
        qm.forceCompleteQuest();
    }
    qm.dispose();
}
function end(mode, type, selection) {
    if (!qm.canHold(4310018, 15) || !qm.canHold(1112606, 1)) {
        qm.sendOk("背包空间不足.");
    } else {
        qm.gainItem(4310018, 15);
        qm.gainItem(1112606, 1);
        qm.forceCompleteQuest(50694);
        qm.sendOk("Come to Nihal Desert.");
        qm.forceCompleteQuest();
    }
    qm.dispose();
}