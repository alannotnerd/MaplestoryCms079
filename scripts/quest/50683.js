/*
	任务: 时间静止之湖的十字旅团
	描述: 接到了十字旅团帮助时间静止之湖地区的指令。去见见时间静止之湖的#p9120210#吧。
*/
var status = -1;

function start(mode, type, selection) {
    qm.sendOk("去时间静止之湖见#p9120210#。");
    qm.forceCompleteQuest();
    qm.dispose();
}
function end(mode, type, selection) {
    qm.dispose();
}