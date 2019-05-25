?/*
 Made by Pungin
 */
        var status = -1;

function start(mode, type, selection) {
    if (mode == 1) {
        status++;
    } else {
        if (status == 0) {
            qm.sendOkSNew("喔不…也许会真的哭出来…", 0x38, 1);
            qm.dispose();
            return;
        }
        status--;
    }

    if (status == 0) {
        qm.sendYesNoSNew("果然大家的表情都很沉闷…那个孩子现在也是快要哭出来的表情…要去跟他说说话吗？", 0x38, 1);
    } else if (status == 1) {
        qm.sendNextNew("你还好吗？一个人吗？", 0x38, 1);
    } else if (status == 2) {
        qm.sendNextPrevNew("妈妈为了我去找食物了…因为肚子饿无法使出力量…", 0x20, 1);
    } else if (status == 3) {
        qm.sendNextPrevNew("...\r\n#b(真是让人难过…没有我能帮忙的事情吗？)", 0x38, 1);
    } else if (status == 4) {
        qm.gainExp(1000);
        qm.completeQuest();
        qm.dispose();
    } else {
        qm.dispose();
    }
}