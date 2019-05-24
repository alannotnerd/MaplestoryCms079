/*
	NPC Name: 		Kinu
	Description: 		Quest - Cygnus tutorial helper
*/

var status = -1;

function start(mode, type, selection) {
    if (mode == 1) {
        status++;
    } else {
        if (status == 2) {
            qm.sendNext("普通攻击是最基础的攻击技能。");
            qm.safeDispose();
            return;
        }
        status--;
    }
    if (status == 0) {
        qm.sendNext("我一直在等你，h0#。 我的名字是 #p1102006# 。 嗯……。看来你已经学过了普通攻击了？你想学会除了普通攻击外的其它技能吗？学会这些技能将会在枫叶谷世界中很有帮助哦。");
    } else if (status == 1) {
        qm.sendNextPrev("每一次升级，都有相应的#b技能点#k。可以按#bk#k键查看你的技能。把技能点加在你想要加的技能上面，别忘了。常用的技能可以用键盘设置放在自己喜欢的键盘上面。");
    } else if (status == 2) {
        qm.askAcceptDecline("趁现在你还没忘记，你会发现在这里有很多怪物，使用你的蜗牛壳技能，打败他们！成功后，再来找我吧。我就在这里等你。");
    } else if (status == 3) {
        qm.forceStartQuest();
        qm.summonMsg(8);
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
        qm.sendNext("除了蜗牛投掷术，还有很多有趣的技能。好吧，按照约定，我将送你一些东西。\r\n\r\n#fUI/UIWindow.img/QuestIcon/4/0# \r\n#fUI/UIWindow.img/QuestIcon/8/0# 40 exp");
    } else if (status == 1) {
        qm.gainItem(4000483, -1);
        qm.forceCompleteQuest();
        qm.gainExp(40);
        qm.dispose();
    }
}