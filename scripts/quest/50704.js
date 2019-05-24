/*
	任务: 向着武陵 - 降魔十字旅团
	描述: 接到了十字旅团帮助武陵地区的指令。去见见武陵的#b#p9120214##k吧。
*/
var status = -1;

function start(mode, type, selection) {
    qm.sendOk("去武陵见#b#p9120214##k");
    qm.forceCompleteQuest();
    qm.dispose();
}
function end(mode, type, selection) {
    qm.dispose();
}