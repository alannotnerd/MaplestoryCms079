/* 飞上蓝天 */

var status = -1;

function start(mode, type, selection) {
    if (mode == 1) {
        status++;
    } else {
        if (status == 2) {
            qm.sendOk("你难道不觉得每个人都有飞翔的愿望吗？");
            qm.dispose();
            return;
        }
        status--;
    }
    if (status == 0) {
        qm.sendNext("你好，冒险家。今天我联系你，是有事情想告诉你。");
    } else if (status == 1) {
        qm.sendNextPrev("今天的天气格外晴朗。真想在天空中飞行……要是能在天上飞，那该有多好？");
    } else if (status == 2) {
        qm.sendYesNo("为什么突然说这些？呵呵，如果有可以在天上飞的方法，你感兴趣吗？");
    } else if (status == 3) {
        qm.sendNext("在天上飞非常简单。只要有#b飞机#k，谁都可以在天上飞。在哪里能找到飞机？听说从飞行员位置上退休下来的#b教官奥斌#k在出租飞机。");
    } else if (status == 4) {
        qm.sendNextPrev("在#b金银岛、圣地、埃德尔斯坦、玩具城、阿里安特、武陵、神木村#k的升降场可以见到教官奥斌，你去见见他吧。");
        qm.completeQuest();
        qm.dispose();
    }
}

function end(mode, type, selection) {
    qm.dispose();
}