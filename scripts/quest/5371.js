
var status = -1;

function start(mode, type, selection) {
    if (mode > 0)
        status++;
    else {
        qm.dispose();
        return;
    }
    if (status == 0)
        qm.sendAcceptDecline("你確定要領勳章了嗎??");
    else if (status == 1) {
        qm.sendOk("恭喜你完成。");
		qm.gainItem(1142103,1)
        qm.forceCompleteQuest();
        qm.dispose();
    }
}