/**
 *	传说格拉泰斯戒指
 */

var status = -1;

function start(mode, type, selection) {
    qm.forceStartQuest();;
    qm.dispose();
}

function end(mode, type, selection) {
    qm.completeQuest();
    qm.dispose();
}