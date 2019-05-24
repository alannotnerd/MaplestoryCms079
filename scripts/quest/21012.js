var status = -1;

function start(mode, type, selection) {
    if (mode == 1) {
        status++;
    } else {
        if (status == 2) {
            qm.sendNext("嗯……说不定这方法能够让你恢复记忆～不论怎样，还是值得一试的。");
            qm.dispose();
            return;
        }
        status--;
    }
    if (status == 0) {
        qm.sendNext("英雄！你好！啊？你难道不知道自己是英雄吗？前面3个人都喊那么大声了，我还能听不见吗？整个岛都知道英雄苏醒的事情了。");
    } else if (status == 1) {
        qm.sendNextPrev("咦，你怎么好像不开心的样子？有什么问题吗？啊？不知道自己到底是不是英雄？你失忆了吗？怎么会……看样子是被封冻在冰里数百年来的后遗症。");
    } else if (status == 2) {
        qm.askAcceptDecline("嗯，既然你是英雄，挥挥剑也许就会想起什么来呢？试着去#b打猎怪兽#k，怎么样？");
    } else if (status == 3) {
        qm.forceStartQuest();
        qm.sendNext("对了，这附近有许多#r#o9300383##k，请击退 #r3只#k试试，说不定你就能想起什么了。");
    } else if (status == 4) {
        qm.sendNextPrevS("哦，你应该还没有忘记使用技能的方法吧？#b将技能拖到快捷栏上，以方便使用#k。除了技能以外，消费道具也可以拖到这里来方便使用。", 1);
    } else if (status == 5) {
        qm.summonMsg(17);
        qm.dispose();
    }
}

function end(mode, type, selection) {
    if (mode == 1) {
        status++;
    } else {
        if (status == 0) {
            qm.sendNext("什么？你不需要药水？");
            qm.dispose();
            return;
        }
        status--;
    }
    if (status == 0) {
        qm.sendYesNo("嗯……看你的表情就知道你啥都没想起来。不过不用担心。说不定这反倒更好。来，这里有一些药水，加油吧！\r\n\r\n#fUI/UIWindow.img/QuestIcon/4/0#\r\n#v2000022# 10个 #t2000022#\r\n#v2000023# 10个 #t2000023#\r\n\r\n#fUI/UIWindow.img/QuestIcon/8/0# 57 exp");
    } else if (status == 1) {
        qm.gainItem(2000022, 10);
        qm.gainItem(2000023, 10);
        qm.gainExp(57);
        qm.forceCompleteQuest();
        qm.sendOkS("#b（就算我真的是英雄……一个什么能力都没有的英雄又能有什么用呢？）#k", 2);
        qm.dispose();
    }
}