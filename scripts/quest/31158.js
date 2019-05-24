/*
	任务: 梦的碎片
	描述: 偶然捡到了梦碎片。去村里看看有没有人知道这是什么东西吧。
*/
var status = -1;

function start(mode, type, selection) {
    qm.sendNext("Thank you so much.");
    qm.forceCompleteQuest();
    qm.dispose();
}
function end(mode, type, selection) {
    qm.sendNext("Thank you so much.");
    qm.forceCompleteQuest();
    qm.dispose();
}