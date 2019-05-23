var status = -1;
function action(mode, type, selection) {
    if (mode == 1) {
        status++;
    } else {
        status--;
    }

    if (status == 0) {
        cm.sendNextS("#h0#，你来晚了。捉迷藏现在开始。既然已经到了大人不许来的地方，就应该好好玩玩。", 0);
    } else if (status == 1) {
        cm.sendYesNo("你来晚了，你来找我们。我们现在躲起来。你到前面的大树那里数到10。");
    } else if (status == 2) {
        cm.warp(931000001, 1);
        cm.dispose();
    }
}