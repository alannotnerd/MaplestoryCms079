/*
	任务: 比国王还可怕的女王
	描述: 资助人#b#p9120219##k说有事情想拜托我。
	获得: 4310018*5 - 十字金币
	      1112601*1 - 十字旅团熟练戒指 II
*/
var status = -1;

function start(mode, type, selection) {
    if (!qm.canHold(4310018, 5) || !qm.canHold(1112601, 1)) {
        qm.sendOk("背包空间不足.");
    } else {
        qm.gainItem(4310018, 5);
        qm.gainItem(1112601, 1);
        qm.forceStartQuest(50682);
        qm.forceStartQuest(50686);
        qm.forceCompleteQuest();
    }
    qm.dispose();
}
function end(mode, type, selection) {
    if (!qm.canHold(4310018, 5) || !qm.canHold(1112601, 1)) {
        qm.sendOk("背包空间不足.");
    } else {
        qm.gainItem(4310018, 5);
        qm.gainItem(1112601, 1);
        qm.forceStartQuest(50682);
        qm.forceStartQuest(50686);
        qm.forceCompleteQuest();
    }
    qm.dispose();
}