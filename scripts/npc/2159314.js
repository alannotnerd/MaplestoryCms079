var status = -1;

function action(mode, type, selection) {
    if (mode == 1) {
        status++;
    } else {
        status--;
    }

    if (status == 0) {
        cm.forceCompleteQuest(23279);
        cm.EnableUI(0);
        cm.dispose();
        cm.warp(931050040, 0);
    }
}