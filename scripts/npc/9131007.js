 var status = -1;

function start() {
    switch (cm.getMapId()) {
        case 807100000:
            cm.sendNext("翻过本能寺外墙，打开东门。");
            cm.dispose();
            break;
        case 807100002:
            cm.forceStartQuest(57101);
            cm.environmentChange("guide1");
            cm.environmentChange("guide2");
            cm.environmentChange("guide3");
            action(1, 0, 0);
            break;
        default:
            cm.dispose();
    }
}

function action(mode, type, selection) {
    if (mode == 1) {
        status++;
    } else {
        status--;
    }

    switch (cm.getMapId()) {
        case 807100002:
            if (status == 0) {
		cm.sendSangokuTalk("果然做的很好，我越来越喜欢你啦。", 9131007, false, true);
            } else if (status == 1) {
                cm.sendNextPrevS("并不困难，况且战斗已经开始了所以更加简单…到底在发生什么事情？是负责北边的上杉谦信南边的士兵首先攻进去的？", 2);
            } else if (status == 2) {
		cm.sendSangokuTalk("说好各方面同时进攻的，若不是某个人想打乱计划忽略进攻信号就很难说啦。当然还是有可疑的地方… 但是没办法确定所以现在答应你没什么意义吧。", 9131007, false, true);
            } else if (status == 3) {
		cm.sendSangokuTalk("营内很混乱所以我们很容易进攻，目前情况对我们没有害处，关于真相的确认等阻挡织田信长後再进行也不晚，趁胜攻击本堂吧。", 9131007, false, true);
            } else if (status == 4) {
                cm.sendPrevS("知道了，失陪啦！", 2);
            } else {
                cm.dispose();
            }
            break;
    }
}