/*
	任务: 调查角斗场
	描述: 知己知彼，才能百战百胜。去调查一下BOSS薛西斯的根据地角斗场吧。
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