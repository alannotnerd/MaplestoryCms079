/*
 Made by Pungin
 */

        var status = -1;

function start(mode, type, selection) {
    if (mode == 1) {
        status++;
    } else {
        if (status == 4) {
            qm.sendOkSNew("真是可惜的事情。", 0x20, 1);
            qm.dispose();
            return;
        }
        status--;
    }

    if (status == 0) {
        qm.sendNextNew("您好，我的名字叫「K」。#b#h0##k，可以听听我的话吗？ ", 0x20, 1);
    } else if (status == 1) {
        qm.sendNextPrevNew("可是我不认识你阿. 你怎麽会知道我的名字呢？", 0x38, 1);
    } else if (status == 2) {
        qm.sendNextPrevNew("嗯. 那个我认为不是重点. 不管怎样，现在我跟你在谈话的事情为比较重要吧? 我能保证我绝对不是什麽奇怪的人. 反而是提出ㄧ些有趣事情的人喔。", 0x20, 1);
    } else if (status == 3) {
        qm.sendNextPrevNew("现在虽然无法了解你说的事情…好…你先说说看吧…", 0x38, 1);
    } else if (status == 4) {
        qm.sendYesNoSNew("感谢你. 那先暂时移动到别的地方好了. 跟我一起走吧。", 0x20, 1);
    } else if (status == 5) {
        qm.completeQuest();
        qm.gainExp(1000);
        qm.saveReturnLocation("MULUNG_TC");
        if (qm.getMapId() != 814000000) {
            qm.warp(814000000);
        }
        qm.dispose();
    } else {
        qm.dispose();
    }
}
