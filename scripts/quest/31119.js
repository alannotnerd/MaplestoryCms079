/*
	任务: 变了的森林
	描述: 去见见圣地森林中的桉吧。
*/
var status = -1;

function start(mode, type, selection) {
    qm.sendNext("你过来点，我就在你的后面。");
    qm.forceCompleteQuest();
    qm.dispose();
}
function end(mode, type, selection) {
    qm.sendNext("你过来点，我就在你的后面。");
    qm.forceCompleteQuest();
    qm.dispose();
}