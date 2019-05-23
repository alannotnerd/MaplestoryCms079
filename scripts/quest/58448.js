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
        qm.sendNextNew("#e<训练公告>#n\r\n训练新兵们请参加格斗术训练. 可以跟训练生亚妮·雷恩哈特一起进行训练。", 0x21, 1);
    } else if (status == 1) {
        qm.forceStartQuest();
        qm.dispose();
    } else {
        qm.dispose();
    }
}