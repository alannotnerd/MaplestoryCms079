var status = 0;

function start() {
    status = -1;
    action(1, 0, 0);
} 

function action(mode, type, selection) {
    if (mode == 1)
        status++;
    else if (mode == 0)
        status--;
    else {
        cm.dispose();
        return;
    }
    if (status == 0) {
        cm.sendNext("You, who are destined to be a Dragon Master... You have\r\nfinally arrived.");
    } else if (status == 1) {
        cm.sendNextPrev("Go and fulfill your duties as the Dragon Master...");
    } else if (status == 2) {
        cm.warp(900090101);
        cm.dispose();
    }
}