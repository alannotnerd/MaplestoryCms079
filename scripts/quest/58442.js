?/*
 Made by Pungin
 */
var status = -1;

function start(mode, type, selection) {
    if (mode == 1) {
        status++;
    } else {
        status--;
    }

    if (status == 0) {
        qm.sendNextNew("那个…有可以吃的吗？真的好饿…", 0x20, 1);
    } else if (status == 1) {
        qm.sendNextPrevNew("现在我也没有什麽能吃的东西耶…等我一下喔. 我去找找看有没有可以吃的东西。", 0x38, 1);
    } else if (status == 2) {
        qm.sendNextPrevNew("真的吗…？谢谢！ ", 0x20, 1);
    } else if (status == 3) {
        qm.sendNextPrevNew("(在这里不管多努力，还是很难找到ㄧ些食物. 是不是要回到枫之谷看看呢? 去找 K 获得ㄧ些建议吧。)", 0x38, 1);
    } else if (status == 4) {
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
        qm.sendNextNew("怎麽了呢？", 0x20, 1);
    } else if (status == 1) {
        qm.sendNextPrevNew("K！异世界的村民在饥饿中. 不能这样下去. 把枫之谷世界的食粮搬到异世界如何?", 0x38, 1);
    } else if (status == 2) {
        qm.sendNextPrevNew("把枫之谷世界的物品搬到异世界? 从其他时空搬移东西，还真是第一次听到的事情。 ", 0x20, 1);
    } else if (status == 3) {
        qm.sendNextPrevNew("不管如何必须要的事情。", 0x38, 1);
    } else if (status == 4) {
        qm.sendNextPrevNew("没有办法了…会帮忙把枫之谷的食粮移动到异世界。", 0x20, 1);
    } else if (status == 5) {
        qm.completeQuest();
        qm.dispose();
    } else {
        qm.dispose();
    }
}