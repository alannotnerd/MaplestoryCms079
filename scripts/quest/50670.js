/*
	任务: 十字旅团
	描述: 从一个名叫十字旅团的奇怪团体那里接到了提议。到金银岛的村庄中寻找十字旅团的#b#p9120206##k，并与其对话吧。
*/
var status = -1;

function start(mode, type, selection) {
    qm.sendNext("Join the Silent Crusade...");
    qm.forceCompleteQuest();
    qm.dispose();
}
function end(mode, type, selection) {
    qm.dispose();
}