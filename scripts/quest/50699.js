/*
	任务: 烧瓶中的眼珠 - 降魔十字旅团
	描述: 接到了讨伐#o6090004#的委托。到#m261010003#去进行搜索吧。完成后直接向尼哈沙漠地区的#p9120212#汇报吧。
	获得: 4310018*19 - 十字金币
	      1112608*1 - 十字旅团勇士戒指 III
	      
*/
var status = -1;

function start(mode, type, selection) {
    if (!qm.canHold(4310018, 19) || !qm.canHold(1112608, 1)) {
        qm.sendOk("背包空间不足.");
    } else {
        qm.gainItem(4310018, 19);
        qm.gainItem(1112608, 1);
        qm.forceStartQuest(50701);
        qm.forceCompleteQuest();
    }
    qm.dispose();
}
function end(mode, type, selection) {
    if (!qm.canHold(4310018, 19) || !qm.canHold(1112608, 1)) {
        qm.sendOk("背包空间不足.");
    } else {
        qm.gainItem(4310018, 19);
        qm.gainItem(1112608, 1);
        qm.forceStartQuest(50701);
        qm.forceCompleteQuest();
    }
    qm.dispose();
}