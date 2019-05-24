/*
	任务: 拯救谢丽尔！- 降魔十字旅团
	描述: 受伤的#b#p9120218##k为了恢复名誉，带着伤讨伐#b#o6220001##k去了。到#b#m221040400##k那边去救她吧。
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