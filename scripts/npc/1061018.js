
function start() {
    cm.sendYesNo("你想放弃任务,从这里出去吗?");
}

function action(mode, type, selection) {
    if (mode == 1) {
	cm.warp(105100100);
    }
    cm.dispose();
}