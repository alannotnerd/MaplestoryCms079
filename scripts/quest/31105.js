/*
	任务: 被破坏的射手村
	描述: 向长老阿勒斯了解未来的情况。
*/
var status = -1;

function start(mode, type, selection) {
    if (mode == -1) {
        qm.dispose();
    } else {
        if (mode == 1) {
            status++;
        } else {
            status--;
        }
        if (status == -1) {
            qm.dispose();
        } else if (status == 0) {
            qm.sendNext("一切都是因为黑暗魔法师的原因……。")
        } else if (status == 1) {
            qm.sendNext("你去问问嚇丽娜，她就在我的旁边。")
            qm.forceStartQuest();
            qm.dispose();
        }
    }
}

function end(mode, type, selection) {
    qm.dispose();
}