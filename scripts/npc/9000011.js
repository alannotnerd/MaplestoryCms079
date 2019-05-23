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
        var selStr = "#fUI/UIWindow2.img/Quest/quest_info/summary_icon/summary#\r\n#fUI/UIWindow2.img/QuestAlarm/BtQ/normal/0#亲爱的#r#h ##k您好，想兑换什么: \r\n#e#r注意背包是否有空格 \r\n#r#e注意背包是否有空格#k#n\r\n#b#L12##v4000457#红色头盔x500 兑换 #v2431965##l\r\n#b#L13##v4000457#红色头盔x2000 兑换 #v2432154##l\r\n#b#L14##v4000457#红色头盔x2000 兑换 #v2432153##l\r\n#b#L15##v4000195#苗木x2000 兑换 #v2432131##l\r\n#b#L16##v4000622#猪猪的蓝蝴蝶结x2000 兑换 #v2431966##l\r\n#b#L17##v4000017#猪头x2000 兑换 #v2432639##l\r\n#b#L101##v4000472#蛇笛x500 兑换 #v1402037##l\r\n#b#L0##v4000472#蛇笛x200 兑换 #v1402014##l\r\n#L1##v4000273#陈年老骨头x100 兑换 #v1002418##l\r\n#L7##v4000273#陈年老骨头x200 兑换 #v1302024##l\r\n#L10##v4000083#小石球的石片x100 兑换 #v1051098##l\r\n#L2##v4000083#小石球的石片x100 兑换 #v1050100##l\r\n#L3##v4000372#灭火器x200 兑换 #v1050127##l\r\n#L4##v4000372#灭火器x200 兑换 #v1051140##l\r\n#L5##v4000191#黑山羊角x200 兑换 #v1302063##l\r\n#L6##v4000191#黑山羊角x300 兑换 #v1302106##l\r\n#L8##v4000035#桌布x200 兑换 #v1332021##l\r\n#L9##v4000035#桌布x300 兑换 #v1442039##l\r\n#L11##v4000012#绿蘑菇盖x100 兑换 #v1322012##l";
        cm.sendSimple(selStr);
    } else if (status == 1) {
        switch (selection) {
        case 0:
            if (cm.getMeso() >= 500000 && cm.haveItem(4000472,200)) {
                cm.gainMeso( - 500000);
		cm.gainItem(4000472, -200);
                cm.gainItem(1402014,1);
                cm.sendOk("兑换成功\r\n祝你游戏愉快!");
            } else {
                cm.sendOk("你没有50W金币和蛇笛x200,我不能与你兑换");
            }
            break;
        case 1:
            if (cm.getMeso() >= 500000 && cm.haveItem(4000273,100)) {
                cm.gainMeso( - 500000);
		cm.gainItem(4000273, -100);
                cm.gainItem(1002418,1);
                cm.sendOk("兑换成功\r\n祝你游戏愉快!");
            } else {
                cm.sendOk("你没有50W金币和陈年老骨头x100,我不能与你兑换");
            }
            break;
        case 10:
            if (cm.getMeso() >= 500 && cm.haveItem(4000083,100)) {
                //cm.gainMeso( - 500000);
		cm.gainItem(4000083, -100);
                cm.gainItem(1051098,1);
                cm.sendOk("兑换成功\r\n祝你游戏愉快!");
            } else {
                cm.sendOk("你没有50W金币和小石球的石片x100,我不能与你兑换");
            }
            break;
        case 2:
            if (cm.getMeso() >= 500000 && cm.haveItem(4000083,100)) {
                cm.gainMeso( - 500000);
		cm.gainItem(4000083, -100);
                cm.gainItem(1050100,1);
                cm.sendOk("兑换成功\r\n祝你游戏愉快!");
            } else {
                cm.sendOk("你没有50W金币和小石球的石片x100,我不能与你兑换");
            }
            break;
        case 3:
            if (cm.getMeso() >= 500000 && cm.haveItem(4000372,200)) {
                cm.gainMeso( - 500000);
		cm.gainItem(4000372, -200);
                cm.gainItem(1050127,1);
                cm.sendOk("兑换成功\r\n祝你游戏愉快!");
            } else {
                cm.sendOk("你没有50W金币和灭火器x200,我不能与你兑换");
            }
            break;
        case 4:
            if (cm.getMeso() >= 500000 && cm.haveItem(4000372,200)) {
                cm.gainMeso( - 500000);
		cm.gainItem(4000372, -200);
                cm.gainItem(1051140,1);
                cm.sendOk("兑换成功\r\n祝你游戏愉快!");
            } else {
                cm.sendOk("你没有50W金币和灭火器x200,我不能与你兑换");
            }
            break;
        case 5:
            if (cm.getMeso() >= 500000 && cm.haveItem(4000191,200)) {
                cm.gainMeso( - 500000);
		cm.gainItem(4000191, -200);
                cm.gainItem(1302063,1);
                cm.sendOk("兑换成功\r\n祝你游戏愉快!");
            } else {
                cm.sendOk("你没有50W金币和黑山羊角x200,我不能与你兑换");
            }
            break;
        case 6:
            if (cm.getMeso() >= 500000 && cm.haveItem(4000191,300)) {
                cm.gainMeso( - 500000);
		cm.gainItem(4000191, -300);
                cm.gainItem(1302106,1);
                cm.sendOk("兑换成功\r\n祝你游戏愉快!");
            } else {
                cm.sendOk("你没有50W金币和黑山羊角x300,我不能与你兑换");
            }
            break;
        case 7:
            if (cm.getMeso() >= 500000 && cm.haveItem(4000273,200)) {
                cm.gainMeso( - 500000);
		cm.gainItem(4000273, -200);
                cm.gainItem(1302024,1);
                cm.sendOk("兑换成功\r\n祝你游戏愉快!");
            } else {
                cm.sendOk("你没有50W金币和陈年老骨头x200,我不能与你兑换");
            }
            break;
        case 8:
            if (cm.getMeso() >= 500000 && cm.haveItem(4000035,200)) {
                cm.gainMeso( - 500000);
		cm.gainItem(4000035, -200);
                cm.gainItem(1332021,1);
                cm.sendOk("兑换成功\r\n祝你游戏愉快!");
            } else {
                cm.sendOk("你没有50W金币和桌布x200,我不能与你兑换");
            }
            break;
        case 9:
            if (cm.getMeso() >= 500000 && cm.haveItem(4000035,300)) {
                cm.gainMeso( - 500000);
		cm.gainItem(4000035, -300);
                cm.gainItem(1442039,1);
                cm.sendOk("兑换成功\r\n祝你游戏愉快!");
            } else {
                cm.sendOk("你物品不够,我不能与你兑换");
            }
            break;
        case 11:
            if (cm.getMeso() >= 500000 && cm.haveItem(4000012,100)) {
                cm.gainMeso( - 500000);
		cm.gainItem(4000012, -100);
                cm.gainItem(1322012,1);
                cm.sendOk("兑换成功\r\n祝你游戏愉快!");
            } else {
                cm.sendOk("你物品不够,我不能与你兑换");
            }
            break;
        case 12:
            if (cm.getMeso() >= 500000 && cm.haveItem(4000457,500)) {
                cm.gainMeso( - 500000);
		cm.gainItem(4000457, -500);
                cm.gainItem(2431965,1);
                cm.sendOk("兑换成功\r\n祝你游戏愉快!");
            } else {
                cm.sendOk("你物品不够,我不能与你兑换");
            }
            break;
        case 13:
            if (cm.getMeso() >= 500000 && cm.haveItem(4000457,2000)) {
                cm.gainMeso( - 500000);
		cm.gainItem(4000457, -2000);
                cm.gainItem(2432154,1);
                cm.sendOk("兑换成功\r\n祝你游戏愉快!");
            } else {
                cm.sendOk("你物品不够,我不能与你兑换");
            }
            break;
        case 14:
            if (cm.getMeso() >= 500000 && cm.haveItem(4000457,2000)) {
                cm.gainMeso( - 500000);
		cm.gainItem(4000457, -2000);
                cm.gainItem(2432153,1);
                cm.sendOk("兑换成功\r\n祝你游戏愉快!");
            } else {
                cm.sendOk("你物品不够,我不能与你兑换");
            }
            break;
        case 15:
            if (cm.getMeso() >= 500000 && cm.haveItem(4000195,2000)) {
                cm.gainMeso( - 500000);
		cm.gainItem(4000195, -2000);
                cm.gainItem(2432131,1);
                cm.sendOk("兑换成功\r\n祝你游戏愉快!");
            } else {
                cm.sendOk("你物品不够,我不能与你兑换");
            }
            break;
        case 16:
            if (cm.getMeso() >= 500000 && cm.haveItem(4000622,2000)) {
                cm.gainMeso( - 500000);
		cm.gainItem(4000622, -2000);
                cm.gainItem(2431966,1);
                cm.sendOk("兑换成功\r\n祝你游戏愉快!");
            } else {
                cm.sendOk("你物品不够,我不能与你兑换");
            }
            break;
        case 17:
            if (cm.getMeso() >= 500000 && cm.haveItem(4000017,2000)) {
                cm.gainMeso( - 500000);
		cm.gainItem(4000017, -2000);
                cm.gainItem(2432639,1);
                cm.sendOk("兑换成功\r\n祝你游戏愉快!");
            } else {
                cm.sendOk("你物品不够,我不能与你兑换");
            }
            break;
        case 18:
            if (cm.getMeso() >= 5000000 && cm.haveItem(4000019,1)) {
                cm.gainMeso( - 5000000);
		cm.gainItem(4000019, -1);
                cm.gainItem(2000005,1000);
                cm.sendOk("兑换成功\r\n祝你游戏愉快!");
            } else {
                cm.sendOk("你需要绿色蜗牛壳x1+500W,我不能与你兑换");
            }
            break;
        case 101:
            if (cm.getMeso() >= 5000000 && cm.haveItem(4000472,500)) {
                cm.gainMeso( - 5000000);
		cm.gainItem(4000472, -500);
                cm.gainItem(1402037,1);
                cm.sendOk("兑换成功\r\n祝你游戏愉快!");
            } else {
                cm.sendOk("你物品不够,我不能与你兑换");
            }
            break;
        }
        cm.dispose();
    }
}