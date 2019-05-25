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
//        var selStr = "#fUI/UIWindow2.img/Quest/quest_info/summary_icon/summary#\r\n#fUI/UIWindow2.img/QuestAlarm/BtQ/normal/0#亲爱的#r#h ##k您好，请您选择您需要的功能:\r\n(#r请看好购买哦.点了就买啦!#k):\r\n#b#L0#双倍道具#l		#L5#各种椅子#l\r\n#L4##r绝版点装#b#l		#L7#道具卷轴#l\r\n#L8#玩具商店#l";
        var selStr = "#fUI/UIWindow2.img/Quest/quest_info/summary_icon/summary#\r\n#fUI/UIWindow2.img/QuestAlarm/BtQ/normal/0#亲爱的#r#h ##k您好，请您选择您需要的功能:\r\n(#r请看好购买哦.点了就买啦!#k):\r\n#b#L0#双倍道具#l    #L7#道具卷轴#l\r\n#L8#玩具商店#l";

        cm.sendSimple(selStr);
    } else if (status == 1) {
		//除了9010057其它都停止使用
        switch (selection) {
        case 0:
            cm.dispose();
            cm.openNpc(9010057, 11); //双倍道具
            break;
        case 4:
            cm.dispose();
            cm.openNpc(9000069, 1); //绝版点装
            break;
        case 5:
            cm.dispose();
            cm.openNpc(9000069, 2); //各种椅子
            break;
        case 6:
            cm.dispose();
            cm.openNpc(9900002, 9); //各种喇叭
            break;
        case 7:
            cm.dispose();
            cm.openNpc(9010057, 102); //洗点卷轴
            break;
        case 8:
            cm.dispose();
            cm.openNpc(9010057, 24); //玩具商店
            break;
        case 9:
            cm.dispose();
            cm.openNpc(9900002, 25); //骑宠商店
            break;
	case 10:
            cm.dispose();
            cm.openNpc(9900002, 100); //破攻石头
            break;
	case 11:
            cm.dispose();
            cm.openNpc(9900002, 1301); //一键潜能
            break;
        }
    }
}