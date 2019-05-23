?/*
 Made by Pungin
 */
        var status = -1;

function start(mode, type, selection) {
    if (mode == 1) {
        status++;
    } else {
        if (status == 5) {
            qm.sendOkSNew("不想要这个徽章吗？", 0x20, 1);
            qm.dispose();
            return;
        }
        status--;
    }

    if (status == 0) {
        qm.sendNextNew("K 城墙崩溃了! 村民陷入危险耶!！", 0x38, 1);
    } else if (status == 1) {
        qm.sendNextPrevNew("我也知道 #h0#..但是这是 异世界的事情. 还有已经无法再旅行异世界了. 但是你随时可以再旅行到你记忆里存在的那个时间点. 因为那不是穿越时空，而是追随你的记忆的关系.。", 0x20, 1);
    } else if (status == 2) {
        qm.sendNextPrevNew("虽然这个时间非常依依不舍…但是只能放弃。", 0x38, 1);
    } else if (status == 3) {
        qm.sendNextPrevNew("看在你这麽依依不舍，我特别给你一个礼物吧. 异世界的徽章! 但是我不能免费给你. 带来跟这徽章交换的物品时，我会再跟你交换喔。", 0x20, 1);
    } else if (status == 4) {
        qm.sendNextPrevNew("想跟哪一种道具交换呢？  ", 0x38, 1);
    } else if (status == 5) {
        qm.sendYesNoSNew("我想一下~ 小小的东西就可以了! 去看看杂货商店如何? 应该会有跟这徽章能交换的道具吧? 那我在这里等你把东西找到吧?。", 0x20, 1);
    } else if (status == 6) {
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
        if (!qm.haveItem(1182140)) {
            qm.dispose();
            return;
        }
        qm.sendNextNew("那，就用这徽章交换没有问题吗？", 0x38, 1);
    } else if (status == 1) {
        qm.sendNextPrevNew("好吧 。#h0#…献给你 异世界最後的回忆吧。", 0x20, 1);
    } else if (status == 2) {
        if (!qm.canHold(1182141)) {
            qm.topMsg("装备栏位不足。请空出 1格以上的空位。");
            qm.dispose();
            return;
        }
        qm.gainItem(1182140, -1);
        qm.gainItem(1182141, 1);
        qm.completeQuest();
        qm.dispose();
    } else {
        qm.dispose();
    }
}