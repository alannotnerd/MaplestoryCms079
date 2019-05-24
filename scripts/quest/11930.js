/**
 *	[鬼节]不给糖果，他们就会捣蛋～！
 */

var status = -1;

function start(mode, type, selection) {
    qm.forceStartQuest();;
    qm.dispose();
}

function end(mode, type, selection) {
    qm.forceCompleteQuest();
    qm.dispose();
}