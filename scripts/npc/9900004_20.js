var aaa = "#fUI/UIWindow2.img/QuestAlarm/BtQ/normal/0#";
//"#fUI/UIWindow.img/PvP/Scroll/enabled/next2#";
var head = "#fUI/UIWindow2.img/Quest/quest_info/summary_icon/summary#\r\n";

var itemlist = new Array(
		Array(1202000, 2500),		
		Array(1202001, 2500),		
		Array(1202002, 2500),		
		Array(1202003, 2500),		
		Array(1202004, 2500),		
		Array(1202023, 2500),		
		Array(1202024, 2500),		
		Array(1202025, 2500),		
		Array(1202026, 2500),		
		Array(1202027, 2500),		
		Array(1202028, 2500),		
		Array(1202029, 2500),		
		Array(1202030, 2500),		
		Array(1202031, 2500),		
		Array(1202032, 2500),		
		Array(1202033, 2500),		
		Array(1202034, 2500),		
		Array(1202035, 2500),		
		Array(1202036, 2500),		
		Array(1202037, 2500),		
		Array(1202038, 2500),		
		Array(1202039, 2000),		
		Array(1202040, 2500),		
		Array(1202041, 2500),		
		Array(1202042, 2500),		
		Array(1202047, 2500),		
		Array(1202048, 2500),		
		Array(1202049, 2500),		
		Array(1202050, 2500),		
		Array(1202051, 2500),		
		Array(1202052, 2500),		
		Array(1202053, 2500),		
		Array(1202054, 2500),		
		Array(1202055, 2500),		
		Array(1202056, 2500),		
		Array(1202057, 2500),		
		Array(1202058, 2500),		
		Array(1202059, 2500),		
		Array(1202060, 2500),		
		Array(1202061, 2500),		
		Array(1202062, 2500),		
		Array(1202083, 2500),		
		Array(1202084, 2500),		
		Array(1202085, 2500),		
		Array(1202086, 2500),		
		Array(1202087, 2500),		
		Array(1202088, 2500),		
		Array(1202089, 2500),		
		Array(1202090, 2500),		
		Array(1202091, 2500),		
		Array(1202092, 2500),		
		Array(1202093, 2500),		
		Array(1202094, 2500),		
		Array(1202095, 2500),		
		Array(1202096, 2500),		
		Array(1202097, 2500),		
		Array(1202098, 2500),		
		Array(1202099, 2500),		
		Array(1202100, 2500),		
		Array(1202101, 2500),		
		Array(1202102, 2500),		
		Array(1202103, 2500),		
		Array(1202104, 2500),		
		Array(1202105, 2500),		
		Array(1202106, 2500),		
		Array(1202107, 2500),		
		Array(1202108, 2500),		
		Array(1202109, 2500),		
		Array(1202110, 2500),		
		Array(1202111, 2500),		
		Array(1202112, 2500),		
		Array(1202113, 2500),		
		Array(1202114, 2500),		
		Array(1202115, 2500),		
		Array(1202116, 2500),		
		Array(1202117, 2500),		
		Array(1202118, 2500),		
		Array(1202119, 2500),		
		Array(1202120, 2500),		
		Array(1202121, 2500),		
		Array(1202122, 2500),		
		Array(1202123, 2500),		
		Array(1202124, 2500),		
		Array(1202133, 2500),		
		Array(1202134, 2500),		
		Array(1202135, 2500),		
		Array(1202136, 2500),		
		Array(1202137, 2500),		
		Array(1202138, 2500),		
		Array(1202139, 2500),		
		Array(1202140, 2500),		
		Array(1202141, 2500),		
		Array(1202142, 2500),		
		Array(1202143, 2500),		
		Array(1202144, 2500),		
		Array(1202145, 2500),		
		Array(1202146, 2500),		
		Array(1202147, 2500),		
		Array(1202148, 2500),		
		Array(1202149, 2500),		
		Array(1202150, 2500),		
		Array(1202151, 2500),		
		Array(1202152, 2500),		
		Array(1202153, 2500),		
		Array(1202154, 2500),		
		Array(1202155, 2500),		
		Array(1202156, 2500),		
		Array(1202157, 2500),		
		Array(1202158, 2500),		
		Array(1202160, 2500),		
		Array(1202161, 2500),		
		Array(1202162, 2500),		
		Array(1202163, 2500),		
		Array(1202164, 2500),		
		Array(1202173, 2500),		
		Array(1202174, 2500),		
		Array(1202175, 2500),		
		Array(1202187, 2500),		
		Array(1202188, 2500),		
		Array(1202189, 2500),		
		Array(1202190, 2500),		
		Array(1202191, 2500),		
		Array(1202192, 2500),		
		Array(1202193, 2500),		
		Array(1202200, 2500),		
		Array(1202201, 2500),		
		Array(1202202, 2500),		
		Array(1202203, 2500),		
		Array(1202204, 2500),		
		Array(1202205, 2500),		
		Array(1202206, 2500),		
		Array(1202207, 2500),		
		Array(1202208, 2500),		
		Array(1202209, 2500),		
		Array(1202210, 2500),		
		Array(1202211, 2500),		
		Array(1202212, 2500),		
		Array(1202213, 2500),		
		Array(1202214, 2500),		
		Array(1202218, 2500),		
		Array(1202219, 2500),		
		Array(1202220, 2500)

        );

var status = 0;
var typed = 0;
var rmb = 0;
var seld;

function start() {
    status = -1;
    action(1, 0, 0);
}

function action(mode, type, selection) {
    if (mode == -1) {
        cm.dispose();
    } else {
        if (mode == 0 && status == 0) {
            cm.dispose();
            return;
        }
        if (mode == 1)
            status++;
        else
            status--;
        if (status == 0) {
            var selStr = "#d#这里是图腾专卖店，请选择你需要的：#n#k\r\n";
            selStr += "#d您当前拥有点券：  #r" + cm.getNX(1) + "#k #d点\r\n#您当前拥有抵用券：  #r" + cm.getNX(2) + "#d#k 点#k\r\n\r\n";
            for (var i in itemlist) {
                selStr += "#L" + i + "##b" + aaa + " 购买 #r#z" + itemlist[i][0] + "##k 需" + (i >= 2 && i <=4 ? "" : " 要 ") + "#r" + itemlist[i][1] + "#k 点券#l\r\n";
            }
            selStr += " \r\n\r\n";
            cm.sendSimple(selStr);
        } else if (status == 1) {
			seld = selection;
			cm.sendYesNo("确定购买一个 #r#z" + itemlist[seld][0] + "##k吗？ 将会使用掉您 #r" + itemlist[seld][1] + "点券. ");
        } else if (status == 2) {
		//	var nx1 = cm.getNX(1);
		//	var nx2 = cm.getNX(2);
		//	if (nx1 < itemlist[seld][1] && nx2 < itemlist[seld][1] || cm.getSpace(2) < 1) {
			if(cm.getPlayer().getCSPoints(1) <  itemlist[seld][1] || cm.getSpace(1) < 1){		
				cm.sendOk(head + "购买失败：\r\n\r\n#r1). 当前点卷未达到条件.\r\n2). 背包装备栏位已满,请清理.");
			} else {
				//cm.gainNX(nx2 < itemlist[seld][1] ? 1 : 2, -itemlist[seld][1]);
				cm.gainNX(1,-itemlist[seld][1]);
				cm.gainItem(itemlist[seld][0], 1);
				cm.sendOk("恭喜您成功购买#z" + itemlist[seld][0] + "#.");
				cm.getMap().startMapEffect("恭喜玩家 " + cm.getChar().getName() + " 成功购买" + cm.getItemName(itemlist[seld][0]) + "一个。", 5120012);
				cm.worldSpouseMessage(0x20, "『点券商城』 : 恭喜 " + cm.getChar().getName() + " 用点卷购买" + cm.getItemName(itemlist[seld][0]) + "一个.");
			}
			cm.dispose();
        }
    }
}