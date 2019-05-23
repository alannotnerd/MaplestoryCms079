/*
 * 次元传送口
 */

function start() {
    cm.sendSlideMenu(5, cm.getSlideMenuSelection(5));
}

function action(mode, type, selection) {
    if (mode != 1) {
        cm.dispose();
        return;
    }
    cm.warp(cm.getSlideMenuDataIntegers(5, selection)[0], cm.getSlideMenuDataIntegers(5, selection)[1]);
    cm.dispose();
}