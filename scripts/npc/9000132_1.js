/* 点卷商店 */

var status = 0;

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
    if (status == 0) {
        var selStr = "#fUI/UIWindow2.img/QuestAlarm/BtQ/normal/0#亲爱的#r#h ##k您好,请您选择您需要的功能:\r\n#L0##b回收包裹内知道道具#l   #L1#一键清空包裹所有道具#l";
        cm.sendSimple(selStr);
    } else if (status == 1) {
        switch (selection) {
        case 0:
            cm.dispose();
            cm.openNpc(9010057, 500); //鲤鱼兑换金龙鱼
            break;
        case 1:
            cm.dispose();
            cm.openNpc(9000132, 0); //金龙鱼兑换道具
            break;
        case 5:
            cm.dispose();
            cm.openNpc(9330108, 2); //青鱼兑换金龙鱼
            break;
        case 6:
            cm.dispose();
            cm.openNpc(9330108, 3); //剑鱼兑换金龙鱼
            break;
        case 7:
            cm.dispose();
            cm.openNpc(9330108, 4); //鲑鱼兑换金龙鱼
            break;
        }
    }
}