/*
	任务: 去吧！向着冰峰雪域
	描述: 在#b#p9120206##k那里可以接受十字旅团的指令。到金银岛的村庄中去见见他吧。
*/
var status = -1;

function start(mode, type, selection) {
    qm.sendNext("Come to El Nath.");
    qm.forceCompleteQuest();
    qm.dispose();
}
function end(mode, type, selection) {
    qm.dispose();
}