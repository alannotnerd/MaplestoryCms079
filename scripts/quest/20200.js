/*
 * Cygnus 2nd Job advancement
 */

var status = -1;

function start(mode, type, selection) {
    qm.sendNext("如果你想参加骑士等级考试，可以随时来圣地。各个骑士团长会对你的能力进行测试，如果合格，就会任命你为正式的骑士。再见……");
    qm.forceStartQuest();
    qm.dispose();
}

function end(mode, type, selection) {
    qm.dispose();
}