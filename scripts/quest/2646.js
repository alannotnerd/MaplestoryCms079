/* RED 1st impact
 The Explorer Book and A Maple Leaf
 Made by Daenerys
 */
var status = -1;

function start(mode, type, selection) {
    if (mode == 1) {
        status++;
    } else {
        if (status == 1) {
            qm.sendNext("嗯?为什么不收下呢?有了这个,就可以替你自己留下属于自己的故事啊!", 4, 1012100);
            qm.dispose();
            return;
        }
        status--;
    }
    if (status == 0) {
        qm.sendNext("今天我是来送你礼物的,这是一本让你能够在将来纪录[zealms]世界旅行时,所经历的一切的#b冒险之书#k,有了这个,将来你就能够纪录你自己的故事了!", 4, 1012100);
    } else if (status == 1) {
        qm.sendYesNoS("怎么样呢?要收下#b冒险之书#k吗?", 15, 1012100);
    } else if (status == 2) {
        qm.sendNext("让我瞧一瞧...适合战士你的冒险之书.....", 4, 1012100);
    } else if (status == 3) {
        qm.sendNextPrev("那么,希望将来你能够有一段奇幻愉快的冒险.", 4, 1012100);
    } else if (status == 4) {
        qm.forceStartQuest();
        qm.dispose();
    }
}

function end(mode, type, selection) {
    if (mode == 1)
        status++;
    else
        status--;
    if (status == 0) {
        qm.sendNext("#b冒险之书#k吗? 在这里可以记录我的冒险岛故事的书?", 16);
    } else if (status == 1) {
        qm.sendNextPrev("刚好正是要开始冒险的时候，那么从现在开始就行了. …咦?", 16);
    } else if (status == 2) {
        qm.forceStartQuest();
        qm.completeQuest();
        qm.dispose();
        qm.showMapleLeafScene();
    }
}