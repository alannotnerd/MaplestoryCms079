/* 哈拉克 - 创建家族 */

var head = "#fUI/UIWindow2.img/Quest/quest_info/summary_icon/summary#\r\n";
var icon = "#fUI/UIWindow2.img/QuestAlarm/BtQ/normal/0#";
var icon2 = "#fUI/UIToolTip.img/Item/Equip/Star/Star#";

var status = -1;

function start() {
    action(1, 0, 0);
}

function action(mode, type, selection) {
    if (mode == 0 && status == 1) {
        cm.dispose();
        return;
    }
    if (mode == 1) {
        status++;
    } else {
        status--;
    }
    if (status == 0) {
		//10周年枫叶 4310080 星星 4001839
		cm.sendSimple(head + "我是星星中介:\r\n#L1#" + icon + "把100个星星兑换为1个10周年枫叶#l\r\n#L2#" + icon + "把1个10周年枫叶兑换为95个星星#l\r\n");
	}
	if (status == 1)
	{
		if(!(cm.canHold(4310080, 1) && cm.canHold(4001839, 95))) {
			cm.sendOk(head + "兑换失败,请您确认在背包所有栏目窗口中是否有一格以上的空间.");
			cm.dispose();
			return;
		}
		switch (selection)
		{
		case 1:
			if (cm.haveItem(4001839, 100) == true) {
				cm.gainItem(4001839, - 100);
				cm.gainItem(4310080, + 1);
				cm.sendOk(head + "恭喜你,兑换成功!");
				cm.dispose();
				return;
			} else {
				cm.sendOk(head + "兑换失败,你没有100颗星星");
				cm.dispose();
				return;
			}
			break;
		case 2:
			if (cm.haveItem(4310080, 1) == true) {
				cm.gainItem(4310080, - 1);
				cm.gainItem(4001839, + 95);
				cm.sendOk(head + "恭喜你,兑换成功!");
				cm.dispose();
				return;
			} else {
				cm.sendOk(head + "兑换失败,你没有1个10周年枫叶");
				cm.dispose();
				return;
			}
			break;
		}
		cm.dispose();
		return;
	}
}