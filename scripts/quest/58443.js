?/*
 Made by Pungin
 */
        var status = -1;

function start(mode, type, selection) {
    if (mode == 1) {
        status++;
    } else {
        if (status == 0) {
            qm.sendOkSNew("不是说想帮助饥饿的小孩吗？变心了吗？", 0x20, 1);
            qm.dispose();
            return;
        }
        status--;
    }

    if (status == 0) {
        qm.sendYesNoSNew("第一次尝试的关系，先选择简单的东西吧…可以从枫之谷世界怪物中取得的马铃薯如何呢？请打倒枫之谷怪物收集50个马铃薯。", 0x20, 1);
    } else if (status == 1) {
        qm.sendOkSNew("希望这事情可以顺利完成.。", 0x20, 1);
        qm.forceStartQuest();
        qm.dispose();
    } else {
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
        if (!qm.haveItem(4034246, 50)) {
            qm.dispose();
            return;
        }
        qm.sendNextNew("来，先吃点这些东西吧。  ", 0x38, 1);
    } else if (status == 1) {
        qm.sendNextPrevNew("哇! 马铃薯! 谢谢你! 刚刚肚子真的超级饿. 你怎麽获得这些的呢?  ", 0x20, 1);
    } else if (status == 2) {
        qm.sendNextPrevNew("呃…就去随便找一下…跟妈妈一起吃喔。", 0x38, 1);
    } else if (status == 3) {
        qm.sendNextPrevNew("好! 真得很感谢你！", 0x20, 1);
    } else if (status == 4) {
        qm.sendNextPrevNew("(那小孩会喜欢真是太好了。)", 0x38, 1);
    } else if (status == 5) {
        qm.gainItem(4034246, -50);
        qm.completeQuest();
        qm.warp(814000000);
        qm.dispose();
    } else {
        qm.dispose();
    }
}