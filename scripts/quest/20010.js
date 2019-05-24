/*
	NPC Name: 		Kimu
	Description: 		Quest - Cygnus tutorial helper
*/

var status = -1;

function start(mode, type, selection) {
    if (mode == 1) {
        status++;
    } else {
        if (status == 3) {
            qm.sendNext("我一直在这里，如果你改变注意，可以再次来找我。");
            qm.safeDispose();
            return;
        }
        status--;
    }
    if (status == 0) {
        qm.sendNext("欢迎来到圣地！你是谁？ 噢，你是 #b#h0##k！ 很高兴见到你！ 我在这里等你好久了， 你将成为一个冒险岛骑士， 对吗？ 我的名字是 #p1102004#。");
    } else if (status == 1) {
        qm.sendNextPrev("如果你想成为冒险岛骑士团中的一员，你可以找我旁边的那位先生，他可以帮助你成为冒险岛骑士团中的一员。");
    } else if (status == 2) {
        qm.sendNextPrev("噢，我提醒你一下，这个是一项任务。你可能偶尔可以注意到，NPC头顶上偶尔会有灯泡，那称之为#b任务（QUEST）#k。完成任务你将可以得到很多丰富的奖励！");
    } else if (status == 3) {
        qm.askAcceptDecline("你愿意见见 #b#p1102005##k吗？ 你想知道怎么打猎吗？你可以找到 #p1102005# 来教你怎么打猎！");
    } else if (status == 4) {
        qm.forceStartQuest();
        qm.summonMsg(2);
        qm.dispose();
    }
}

function end(mode, type, selection) {
    if (mode == 1) {
        status++;
    } else {
        status--;
    }
    if (status == 0) {
        qm.sendNext("Are you the Noblesse my brother #p1102004# sent? Nice to meet you! I''m #p1102005#. I'll give you the reward #p1102004# asked me to give you. Remember, you can check your Inventory by pressing the #bI key#k. Red potions help you recover HP, and blue ones help recover MP. It's a good idea to learn how to use them beforehand so you''ll be ready with them when you're in danger. \r\n\r\n#fUI/UIWindow.img/QuestIcon/4/0# \r\n#i2000020# 5 #t2000020# \r\n#i2000021# 5 #t2000021# 5 \r\n\r\n#fUI/UIWindow.img/QuestIcon/8/0# 15 exp");
    } else if (status == 1) {
        qm.gainItem(2000020, 5);
        qm.gainItem(2000021, 5);
        qm.forceCompleteQuest();
        qm.gainExp(15);
        qm.summonMsg(3);
        qm.dispose();
    }
}