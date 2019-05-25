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
        qm.sendNextNew("#e<训练公告>#n\r\n练新兵们请参加敏捷性训练. 可以跟训练生克里斯塔·连兹一起进行训练。", 0x21, 1);
    } else if (status == 1) {
        qm.forceStartQuest();
        qm.dispose();
    } else {
        qm.dispose();
    }
}