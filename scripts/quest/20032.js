/* global qm */
var status = -1;

function start(mode, type, selection) {
    qm.forceStartQuest();
    qm.dispose();
}

function end(mode, type, selection) {
    if (mode === 1) {
        status++;
    } else {
        status--;
    }

    var i = -1;
    if (status <= i++) {
        qm.dispose();
    } else if (status === i++) {
        qm.getNPCTalk(["為什麼要花這麼久時間？ 慢吞吞的~清掃都做完了嗎？我現在不會放水了。看什麼？ 清掃完畢還不快來幫忙整理物品！"], [4, 1106002, 0, 0, 0, 0, 0, 1, 0]);
        qm.spawnMob(9001048, 312, 119);
        qm.spawnMob(9001048, 110, -157);
    } else if (status === i++) {
        qm.completeQuest();
        qm.gainItem(2001503, 20);
        qm.dispose();
        qm.warp(913070003, 0);
    } else {
        qm.dispose();
    }
}
