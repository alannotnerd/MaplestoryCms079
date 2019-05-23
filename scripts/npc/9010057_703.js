var status;
var text;
var payurl = "http://baidu.com";
var num, cash;
var head = "#fUI/UIWindow2.img/Quest/quest_info/summary_icon/summary#\r\n";
var icon = "#fUI/UIWindow2.img/QuestAlarm/BtQ/normal/0#";
var icon2 = "#fUI/UIToolTip.img/Item/Equip/Star/Star#";

function start() {
    status = -1;
    action(1, 0, 0);
}

function action(mode, type, selection) {
    if (mode == -1) {
        cm.dispose();
        return;
    } else {
        if (mode == 0 && status == 0) {
            cm.dispose();
            return;
        }
        if (mode == 1)
            status++;
        else {
            cm.dispose();
            return;
        }
    }

    var rmb = cm.getHyPay(1);
	
    if (status == 0) {
        text = head + "- "+cm.getServerName()+" -\r\n\r\n";
        text += "#r\t冰淇淋为充值后直接获得的个数，1人民币=1000冰淇淋。\r\n兑换的点券可用于购买游戏商城道具。\r\n";
        text += "#k\t" + icon2 + "当前冰淇淋为：" + rmb + "个\r\n";
        //text += "\t" + icon2 + "累积幻币总额：" + cm.getTotalRMB() + "幻币\r\n";
        text += "\t" + icon2 + "当前点券余额：" + cm.getNX(1) + "点\r\n\r\n";
        text += "#b#L0#" + icon + "冰淇淋兑换点券(1冰淇淋=100点券)#l\r\n";
		text += "#L2#" + icon + "领取充值奖励#l\r\n";
		text += "#L3#" + icon + "冰淇淋理财#l\r\n";
        text += "#r#L1#" + icon + "立即充值冰淇淋#l";
        cm.sendSimple(text);
    } else if (status == 1) {
        if (selection == 0) {
            cm.sendGetNumber("当前冰淇淋余额：" + rmb + "冰淇淋\r\n请输入要兑换的冰淇淋点数(1-10000)：", 1, 1, 10000);
        } else if(selection == 1) {
            cm.openWeb(payurl);
            cm.sendNext("正在跳转充值页面，充值完毕后点击下一步……");
            status = -1;
        }else if(selection == 2) {
			cm.dispose();
			cm.openNpc(9010057,609);
		}else if(selection == 3)
		{
			cm.dispose();
			cm.openNpc(9010057,606);
		}
    } else if (status == 2) {
        num = selection;
        cash = num * 1000;
        if (num < 1 || num > 10000) {
            cm.sendOk("输入的点数范围有误，请重新输入。");
            cm.dispose();
            return;
        }
        if (rmb < num) {
            cm.sendOk("您当前可兑换的冰淇淋为" + rmb + "HB，请重新输入");
            cm.dispose();
            return;
        }
        cm.sendYesNo("是否使用#r" + num + "HB#k兑换#r" + cash + "#k点券？");
    } else if (status == 3) {
        cm.gainRMB(-num);
        cm.gainNX(1, cash);
        cm.sendOk("兑换成功！冰淇淋与点券变动如下：\r\n当前冰淇淋余额：" + cm.getRMB() + "  #r↓" + num + "#k\r\n当前点券余额：" + cm.getNX(1) + "点  #g↑" + cash + "#k");
        cm.dispose();
    }
}