/*
	任务: 兼职袭击 - 降魔十字旅团
	描述: 接到了帮助受伤的#b#p9120217##k去讨伐#b#o5220003##k的指令。到#b#m220040200##k去进行搜索吧。
	获得: 4310018*13 - 十字金币
	      1112605*1 - 十字旅团老兵戒指 III
*/
var status = -1;

function start(mode, type, selection) {
    if (!qm.canHold(4310018, 13) || !qm.canHold(1112605, 1)) {
        qm.sendOk("背包空间不足.");
    } else {
        qm.gainItem(4310018, 13);
        qm.gainItem(1112605, 1);
        qm.forceCompleteQuest();
    }
    qm.dispose();
}
function end(mode, type, selection) {
    if (!qm.canHold(4310018, 13) || !qm.canHold(1112605, 1)) {
        qm.sendOk("背包空间不足.");
    } else {
        qm.gainItem(4310018, 13);
        qm.gainItem(1112605, 1);
        qm.forceCompleteQuest();
    }
    qm.dispose();
}