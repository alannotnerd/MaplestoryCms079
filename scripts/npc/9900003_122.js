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
        var selStr = "                    #e#r每日收集任务#n\r\n#b收集#i4001084##i4001083##i4001430#可获得10个#i5062002#+2000抵用卷\r\n#d#e#L0#★完成以上收集★#l\r\n\r\n#b收集#i4000175##i4000243##i2210006##i4000235#可获得5个#i5062500#+1000点卷\r\n#d#e#L1#★完成以上收集★#l";
        cm.sendSimple(selStr);
    } else if (status == 1) {
        switch (selection) {
        case 0:
            if (cm.haveItem(4001084,1) && cm.haveItem(4001083,1) && cm.haveItem(4001430,1) && cm.getBossLog("抵用收集任务") < 1) {
		cm.gainItem(4001084, -1);
		cm.gainItem(4001083, -1);
		cm.gainItem(4001430, -1);
                cm.gainItem(5062002,10);
				cm.gainNX(2, 2000);
				//cm.getBossLog("抵用收集任务");
				cm.setBossLog("抵用收集任务");
                cm.sendOk("兑换成功\r\n祝你游戏愉快!");
				cm.worldSpouseMessage(0x20,"『每日任务』 ：玩家 "+ cm.getChar().getName() +" 完成了每日抵用卷收集任务。");
            } else {
                cm.sendOk("你缺少东西或者今天已经兑换");
            }
            break;
        case 1:
            if (cm.haveItem(4000175,1) && cm.haveItem(4000243,1) && cm.haveItem(2210006,1) && cm.haveItem(4000235,1) && cm.getBossLog("点卷收集任务") < 1) {
		cm.gainItem(4000175, -1);
		cm.gainItem(4000243, -1);
		cm.gainItem(2210006, -1);
		cm.gainItem(4000235, -1);
                cm.gainItem(5062500,5);
				cm.gainNX(1, 1000);
				//cm.finishActivity(120111);
				//cm.getBossLog("点卷收集任务");
				cm.setBossLog("点卷收集任务");
                cm.sendOk("兑换成功\r\n祝你游戏愉快!");
				cm.worldSpouseMessage(0x20,"『每日任务』 ：玩家 "+ cm.getChar().getName() +" 完成了每日点卷收集任务。");
            } else {
                cm.sendOk("你缺少东西或者今天已经兑换");
            }
            break;
        case 10:
            if (cm.getMeso() >= 500 && cm.haveItem(2431893,100)) {
                //cm.gainMeso( - 500000);
		cm.gainItem(2431893, -100);
                cm.gainItem(5062009,10);
                cm.sendOk("兑换成功\r\n祝你游戏愉快!");
            } else {
                cm.sendOk("红魔方碎片x100,我不能与你兑换");
            }
            break;
        case 2:
            if (cm.getMeso() >= 500000 && cm.haveItem(4009121,100)) {
                cm.gainMeso( - 500000);
		cm.gainItem(4009121, -100);
                cm.gainItem(5062000,1);
                cm.sendOk("兑换成功\r\n祝你游戏愉快!");
            } else {
                cm.sendOk("你没有50W金币和忘却之头盔x100,我不能与你兑换");
            }
            break;
        case 3:
            if (cm.getMeso() >= 500000 && cm.haveItem(4000004,300)) {
                cm.gainMeso( - 500000);
		cm.gainItem(4000004, -300);
                cm.gainItem(5062002,1);
                cm.sendOk("兑换成功\r\n祝你游戏愉快!");
            } else {
                cm.sendOk("你没有50W金币和绿液球x300,我不能与你兑换");
            }
            break;
        case 4:
            if (cm.getMeso() >= 500000 && cm.haveItem(4000273,300)) {
                cm.gainMeso( - 500000);
		cm.gainItem(4000273, -300);
                cm.gainItem(5062002,1);
                cm.sendOk("兑换成功\r\n祝你游戏愉快!");
            } else {
                cm.sendOk("你没有50W金币和陈年老骨头x300,我不能与你兑换");
            }
            break;
        case 5:
            if (cm.getMeso() >= 500000 && cm.haveItem(4009121,300)) {
                cm.gainMeso( - 500000);
		cm.gainItem(4009121, -300);
                cm.gainItem(5062002,1);
                cm.sendOk("兑换成功\r\n祝你游戏愉快!");
            } else {
                cm.sendOk("你没有50W金币和忘却之头盔x300,我不能与你兑换");
            }
            break;
        }
        cm.dispose();
    }
}