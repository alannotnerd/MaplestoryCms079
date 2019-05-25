/* RED 1st impact
    Ray of Light
    Made by Pungin
*/

var status = -1;

function action(mode, type, selection) {
    if (mode == 1) {
        status++;
	} else {
        status--;
    }

    if(cm.isAllReactorState(1008010, 5) == true){
		if (status == -1 && mode != 1) {
			cm.sendNextS("想到要去未知的地方,就有点害怕...", 16);
			cm.dispose();
		} else if (status == 0) {
			cm.sendYesNo("确定要离开这里，前往新的世界吗？");
		} else if (status == 1) {
			cm.sendNextS("走吧，到新的世界去。", 16);
		} else if (status == 2) {
			cm.dispose();
			cm.forceStartQuest(32200);
			cm.forceCompleteQuest(32200);
			cm.gainExp(16);
			cm.warp(4000002);
		} else {
			cm.dispose();
		}
	} else {
		cm.topMsg("不破坏掉锁链的话，无法离开。");
		cm.dispose();
    }
}
