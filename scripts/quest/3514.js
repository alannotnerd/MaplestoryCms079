var status = -1;

function end(mode, type, selection) {
    if (mode == 0) {
        status--;
    } else {
        status++;
    }
    if (status == 0) {
        qm.forceCompleteQuest(3514);
        qm.dispose();
    }
}
