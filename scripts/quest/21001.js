var status = -1;

function start(mode, type, selection) {
    if (mode == 1) {
        status++;
    } else {
        if (status == 0) {
            qm.sendNext("啊！战神大人拒绝了！");
            qm.dispose();
            return;
        }
        status--;
    }
    if (status == 0) {
        qm.askAcceptDecline("呃呃……吓死我了……快，快带到赫丽娜那边去！");
    } else if (status == 1) {
        if (qm.getQuestStatus(21001) == 0) {
            qm.gainItem(4001271, 1);
            qm.forceStartQuest(21001, null);
        }
        qm.warp(914000300, 0);
        qm.dispose();
    }
}

function end(mode, type, selection) {
    if (mode == 1) {
        status++;
    } else {
        if (status == 0) {
            qm.sendNext("孩子呢？孩子救出来了的话，就赶紧让我们看看。");
            qm.dispose();
            return;
        } else if (status == 8) { // watching the introduction
            if (qm.haveItem(4001271)) {
                qm.gainItem(4001271, -1);
            }
            qm.MovieClipIntroUI(true);
            qm.forceCompleteQuest();
            qm.warp(914090010, 0);
            qm.dispose();
            return;
        }
        status--;
    }
    if (status == 0) {
        qm.sendYesNo("呵呵，平安回来了？孩子呢？孩子也带回来了吗？");
    } else if (status == 1) {
        qm.sendNext("太好了……真是太好了。");
    } else if (status == 2) {
        qm.sendNextPrevS("赶快上船！已经没时间了！", 3);
    } else if (status == 3) {
        qm.sendNextPrev("啊，没错。现在不是感伤的时候。黑魔法师的气息越来越近！似乎他们已经察觉方舟的位置，得赶紧启航，不然就来不及了！");
    } else if (status == 4) {
        qm.sendNextPrevS("立刻出发！", 3);
    } else if (status == 5) {
        qm.sendNextPrev("战神！请你也上船吧！我们理解你渴望战斗的心情……不过，现在已经晚了！战斗就交给你的那些同伴吧，和我们一起去金银岛吧！");
    } else if (status == 6) {
        qm.sendNextPrevS("不行！", 3);
    } else if (status == 7) {
        qm.sendNextPrevS("赫丽娜，你先出发去金银岛。一定要活着，我们一定会再见的。我要和同伴们一起同黑魔法师战斗！", 3);
    } else if (status == 8) {
        qm.sendYesNo("Would you like to skip the video clip?  Even if you skip the scene, game play will not be affected.");
    } else if (status == 9) { // Not watching
        if (qm.haveItem(4001271)) {
            qm.gainItem(4001271, -1);
        }
        qm.forceCompleteQuest();
        qm.warp(140090000, 0);
        qm.dispose();
    }
}