
var status = 0;
var head = "#fUI/UIWindow2.img/Quest/quest_info/summary_icon/summary#\r\n";
var ttt = "#fUI/UIWindow/Quest/icon2/7#";//"+ttt+"//美化1
var ttt2 = "#fUI/UIWindow/Quest/icon6/7#";////美化2
var ttt3 = "#fUI/UIWindow/Quest/icon3/6#";//"+ttt3+"//美化圆
var ttt4 = "#fUI/UIWindow/Quest/icon5/1#";//"+ttt4+"//美化New
var ttt5 = "#fUI/UIWindow/Quest/icon0#";////美化!
var ttt7 = "#fUI/Basic/BtHide3/mouseOver/0#";//"+ttt6+"//美化会员
var ttt6 = "#fUI/UIWindow2.img/QuestAlarm/BtQ/normal/0#";
//"#fUI/UIWindow.img/PvP/Scroll/enabled/next2#";

function start() {
    status = -1;
    action(1, 0, 0);
}

function action(mode, type, selection) {
    if (status == 0 && mode == 0) {
        cm.dispose();
        return;
    }
    if (mode == 1) {
        status++;
    } else {
        status--;
    }
    if (cm.getMapId() == 180000001) {
        cm.sendOk("很遗憾，您因为违反用户守则被禁止游戏活动，如有异议请联系管理员.")
        cm.dispose();
    }
    else if (status == 0) {
        var selStr = head + "\r\n#e#d您好，本服新增特色副本系列,更多请期待添加..#n#l#k\r\n\r\n";
        //selStr +="\r\n#d======================================================#k\r\n";
        selStr += "#L10#" + ttt6 + "#r12.#e#b 阿里安特竞技场(New~)#l#n\r\n";
        selStr += "#b#L0#" + ttt6 + " #r1.#b 米纳尔森林保卫战#l\r\n";
        selStr += "#L1#" + ttt6 + " #r2.#b 全民飞机大战#l\r\n";
        selStr += "#L2#" + ttt6 + " #r3.#b 被困在城里的冒险家#l\r\n";
        selStr += "#L3#" + ttt6 + " #r4.#b 利弗里的天空庭院#l\r\n";
        selStr += "#L4#" + ttt6 + " #r5.#b 挑战英语村的大卫先生吧#l\r\n";
        selStr += "#L5#" + ttt6 + " #r6.#b 黄金寺院：僧侣诺伊的情愿#l\r\n";
        selStr += "#L6#" + ttt6 + " #r7.#b 关卡火力测试(小试牛刀)#l\r\n";
        selStr += "#L7#" + ttt6 + " #r8.#b 变成废墟的民居#l\r\n";
        selStr += "#L8#" + ttt6 + " #r9. [HOT]#b 无限火力挑战#l\r\n";
		selStr += "#L11#" + ttt6 + "#r10. 神话副本<最强神化耳环>#l\r\n";
        selStr += "#L9#" + ttt6 + "#r11.#b 生化魔人欧碧啦#l\r\n";

        selStr += "\r\n";
        //selStr +="\r\n#d======================================================#k\r\n";
        cm.sendSimple(selStr);
    } else if (status == 1) {
        switch (selection) {
            case 0:
                cm.dispose();
                cm.openNpc(9900003, 109);
                break;
            case 1:
                cm.showMessage(1, "[全民飞机大战] ：玩家 " + cm.getChar().getName() + " 进入了机场候机室。");
                cm.dispose();
                cm.warp(540010001, 0);
                break;
            case 2:
                cm.dispose();
                cm.openNpc(9900003, 107);
                break;
            case 3:
                cm.dispose();
                cm.openNpc(9220032);
                break;
            case 4:
                cm.dispose();
                cm.openNpc(9310057);
                break;
            case 5:
                cm.dispose();
                cm.openNpc(9900003, 101);
                break;
            case 6:
                cm.dispose();
                cm.openNpc(9900003, 102);
                break;
            case 7:
                cm.dispose();
                cm.openNpc(9900003, 700);
                break;
            case 8:
                cm.dispose();
                cm.openNpc(2060103);
                break;
            case 9:
                cm.dispose();
                cm.openNpc(9120050);
                break;
            case 10:
                cm.dispose();
                cm.openNpc(2101017,1);
                break;
			case 11:
				cm.dispose();
				cm.warp(262030000);
				break;


        }
    }
}