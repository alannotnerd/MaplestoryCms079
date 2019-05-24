/*
	任务: 魔术、科学和宇宙能源
	描述: #o9400295#也可以夺取处于昏迷状态的#p9120030#的肉体，再伪装成#p9120030#的意志并控制#o9400296#…！我必须尽快将此事告诉#p9120025#。
*/

function start(mode, type, selection) {
    qm.dispose();
}

function end(mode, type, selection) {
    if (qm.getQuestStatus(50012) == 0) {
        qm.forceStartQuest();
    } else {
        qm.forceCompleteQuest(50015);
        qm.forceCompleteQuest();
    }
    qm.dispose();
}