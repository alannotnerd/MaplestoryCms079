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
        qm.sendNextNew("#h0#、该要到回去的时间了。", 0x20, 1);
    } else if (status == 1) {
        qm.sendNextPrevNew("是吗…了解了。", 0x38, 1);
    } else if (status == 2) {
        qm.sendNextPrevNew("很难得，所以最後去向想要到别的人打个招呼如何？", 0x20, 1);
    } else if (status == 3) {
        qm.sendNextPrevNew("去跟最初给马铃薯的孩子们打个招呼吧，去制作最後的回忆吧。", 0x38, 1);
    } else if (status == 4) {
        qm.sendNextPrevNew("那去打个招呼後再来吧. 我在视野良好的城墙上等你。", 0x20, 1);
    } else if (status == 5) {
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
        qm.sendNextNew("唷~好久不见！", 0x38, 1);
    } else if (status == 1) {
        qm.sendNextPrevNew("哇! 你好! 好久不见耶!", 0x20, 1);
    } else if (status == 2) {
        qm.sendNextPrevNew("最近也常常肚子饿吗？", 0x38, 1);
    } else if (status == 3) {
        qm.sendNextPrevNew("不. 现在我开始帮我母亲. 父亲回来前，因为我要保护我妈妈阿", 0x20, 1);
    } else if (status == 4) {
        qm.sendNextPrevNew("哇! 很勇敢呢! 话说我晚点会离开这里. 所以我来跟你告别了. 你要保重喔。", 0x38, 1);
    } else if (status == 5) {
        qm.sendNextPrevNew("是去旅行吗? 有点羡慕呢. 哪时候会回来呢? 你会回来吧？", 0x20, 1);
    } else if (status == 6) {
        qm.sendNextPrevNew("嗯…我回来的话，我一定会再来看你的. 要保重喔。", 0x38, 1);
    } else if (status == 7) {
        qm.sendNextPrevNew("(感到有点依依不舍的心情. 到跟 K要见面的城墙上吧。)", 0x38, 1);
    } else if (status == 8) {
        qm.completeQuest();
        qm.warp(814000900, 1);
        qm.dispose();
    } else {
        qm.dispose();
    }
}