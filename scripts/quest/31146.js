/*
	任务: 拯救南哈特
	描述: 阿勒斯决定救出南哈特。去见见长老阿勒斯吧。
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