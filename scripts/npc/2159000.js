var status = -1;
function action(mode, type, selection) {
    status++;
    if (status == 0) {
    	cm.sendNext("哦……你来啦？捉迷藏还没开始……我们现在回去不好吗？大人们不是让我们不要到矿山这边来玩吗？");
    } else if (status == 1) {
	cm.sendNext("哎呀，胆小鬼。都已经来了，怎么能就这样回去呢？总得做点什么吧？", 2159002);
    	cm.dispose();
    }
}