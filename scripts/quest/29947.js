/*
	任务: 冒险骑士团的继承人
	描述: 冒险骑士团的继承人终极冒险家诞生了。
	需要: 1142257 - 冒险骑士继承者
*/
var status = -1;

function start(mode, type, selection) {
    if (qm.haveItem(1142257, 1) && qm.getPlayer().getLevel() >= 10) {
        qm.forceStartQuest();
        qm.forceCompleteQuest();
    }
    qm.dispose();
}

function end(mode, type, selection) {
    if (qm.haveItem(1142257, 1) && qm.getPlayer().getLevel() >= 10) {
        qm.forceStartQuest();
        qm.forceCompleteQuest();
    }
    qm.dispose();
}