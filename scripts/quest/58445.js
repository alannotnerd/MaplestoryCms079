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
        qm.sendNextNew("训练新兵 #h0# 吗? 从训练兵团有接收到物品赠送的事项. 请跟我来领支给用品吧。", 0x21, 1);
    } else if (status == 1) {
        qm.sendNextPrevNew("支给用品是什麽呢？", 0x38, 1);
    } else if (status == 2) {
        qm.sendNextPrevNew("我猜应该是立体机动装置. 请在近期内收取物品。", 0x21, 1);
    } else if (status == 3) {
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
        qm.sendNextNew("为了支给用品来的吗? 名称是…嗯…阿! 在这， #h0# 没错吧? 赠送给你立体机动装置吧。", 0x21, 1);
    } else if (status == 1) {
        if (!qm.canHold(1073010)) {
            qm.topMsg("装备栏位不足。请空出 1格以上的空位。");
            qm.dispose();
            return;
        }
        qm.gainItem(1073010, 1);
        qm.completeQuest();
        qm.updateInfoQuest(58445, "clear=1");
        qm.sendOkSNew("请穿用看看是否合身以及功能是否正常。\r\n以防万一弄不见了还会支配，因此到时来找我。", 0x20, 1);
        qm.dispose();
    } else {
        qm.dispose();
    }
}