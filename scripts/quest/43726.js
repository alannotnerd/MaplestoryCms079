/*
	鏄庢槦鏄熺悆镊嫊閲嶈ō浠诲嫏
*/

var status = -1;

function start(mode, type, selection) {
    qm.forceStartQuest();
    qm.completeQuest();
    qm.dispose();
}

function end(mode, type, selection) {
    qm.completeQuest();
    qm.dispose();
}