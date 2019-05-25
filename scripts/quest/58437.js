?/*
    Made by Pungin
*/
var status = -1;

function start(mode, type, selection) {
    if (mode == 1) {
        status++;
    } else {
        if (status == 1) {
            qm.sendOkSNew("竟然有讨厌冒险的旅行者…真是独特的人。", 0x20, 1);
            qm.dispose();
            return;
        }
        status--;
    }

    if (status == 0) {
        qm.getDirectionStatus(true);
        qm.EnableUI(1, 0);
        qm.DisableUI(true);
        qm.sendNextNew("这里是哪里？", 0x39, 1);
    } else if (status == 1) {
        qm.EnableUI(0);
        qm.DisableUI(false);
        qm.sendYesNoSNew("跟异世界连结的时空的隙缝。异世界跟枫之谷世界是完全不同的世界。只有拥有特别之力的人才能透过时空的隙缝来移动到异世界. 可以从你的身上感觉到那种力量. 你也是否要去新的冒险呢?", 0x20, 1);
    } else if (status == 2) {
        qm.sendOkSNew("不是谁都有这样的机会，所以请好好的享受此冒险。那如果要出发，跟我说声唷。", 0x20, 1);
	qm.completeQuest();
        qm.gainExp(1000);
        qm.dispose();
    } else {
        qm.dispose();
    }
}
