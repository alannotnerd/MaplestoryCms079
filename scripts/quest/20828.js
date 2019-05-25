/* Cygnus revamp
 Noblesse tutorial
 Kimu
 Made by Daenerys
 */
var status = -1;

function start(mode, type, selection) {
    status++;
    if (status == 0) {
        qm.forceStartQuest();
        qm.dispose();
    }
}

function end(mode, type, selection) {
    if (mode == -1) {
        qm.dispose();
    } else {
        if (mode == 1)
            status++;
        else
            status--;
        if (status == 0) {
            qm.sendNext("做得好。这很简单吧？对骑士团而言体力管理是必备的。有很多累人的任务呢。 那麽，就要继续进行下一个训练吗？");
        } else if (status == 1) {
            qm.warp(130030105);
            qm.forceStartQuest();
            qm.completeQuest();
            qm.dispose();
        }
    }
}