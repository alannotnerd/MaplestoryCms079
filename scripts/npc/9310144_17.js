var aaa ="#fUI/UIWindow2.img/QuestAlarm/BtQ/normal/0#";
//"#fUI/UIWindow.img/PvP/Scroll/enabled/next2#";
var head = "#fUI/UIWindow2.img/Quest/quest_info/summary_icon/summary#\r\n";

var status = 0;
var typed=0;
var rmb = 0;

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
                        var selStr = "#b请选择购买天数：#n#k\r\n";
                        selStr += "#e#r您当前余额为 #d" + cm.getPlayer().getHyPay(1) + "#k#r #e币#n#k\r\n";
                        selStr += "#d您当前的点卷为：#r" + cm.getPlayer().getCSPoints(1) + " #d点#k\r\n\r\n\r\n";
						selStr += "#L1##b"+aaa+" 实惠理财体验一天权[详情点击查看]\r\n\r\n";
						selStr += "#L2##b"+aaa+" 超级实惠理财服务10万点卷/月[详情点击查看]#k\r\n\r\n";
						selStr += "#L3##b"+aaa+" 超级实惠理财服务半年权[详情点击查看]\r\n\r\n";
			            selStr += "#L4##b"+aaa+" 超级实惠理财一年权[详情点击查看]#l#k\r\n";
                        cm.sendSimple(selStr);	
		} else if (status == 1) {
			if (selection == 1) {
				typed=1;
				cm.sendYesNo(head + "- #e#d欢迎办理随身服务一天权：#n#k\r\n\r\n- #e#r提示:#k#n  #rvip神秘盒子 10元现金/天#k\r\n\r\n- #e#d随身服务特权：#n#k\r\n\t\t#b每日可以拿3000万金币工资。\r\n\t\t可自主选择发型。可使用快捷洗血功能。\r\n\t\t每日大量魔方，积分，活力，抽奖\r\n\t\t快捷传送，三倍经验，双倍爆率\r\n\t\t购买点卷特权获得双倍，以及专署副本。\r\n\r\n- #e#d管理提示：#n#b点是进行购买。点否返回上一页.#k");
			} else if (selection == 2) {
				typed=2;
				cm.sendYesNo(head + "- #e#d超级实惠理财服务一月权：#n#k\r\n\r\n- #e#r提示:#k#n  #rvip神秘盒子 100000点卷/月#k\r\n\r\n- #e#d服务特权：#n#k\r\n\t\t#b拥有全服上线提示、独特聊天颜色。\r\n- #e#d详细说明：#n#k\r\n\t\t办理后会扣掉您10万点卷，并且分30天返还4.5万点卷30天内每天享有三倍经验以及双倍爆率，并且30天内会返还您90个高级神奇魔方、大师级神奇魔方、防暴卷轴、祝福卷轴。另可享有免费更换发型以及快速洗血。还可以领取每日金币\r\n\r\n- #e#d管理提示：#n#b点是进行购买。点否返回上一页.#k");
                        } else if (selection == 3) {
				typed=3;
				cm.sendYesNo(head + "- #e#d欢迎办理随身服务半年权：#n#k\r\n\r\n- #e#r提示:#k#n  #rvip神秘盒子 600元余额/年#k\r\n\r\n- #e#d随身服务特权：#n#k\r\n\t\t#b每日可以拿30万金币工资。\r\n\t\t可自主选择发型。可使用快捷洗血功能。\r\n\t\t每日大量魔方，积分，活力，抽奖\r\n\t\t快捷传送，三倍经验，双倍爆率\r\n\t\t购买点卷特权获得双倍，以及专署副本。\r\n\r\n- #e#d管理提示：#n#b点是进行购买。点否返回上一页.#k");
                        } else if (selection == 4) {
				typed=4;
				cm.sendYesNo(head + "- #e#d欢迎办理随身服务半年权：#n#k\r\n\r\n- #e#r提示:#k#n  #rvip神秘盒子 1200余额/年#k\r\n\r\n- #e#d随身服务特权：#n#k\r\n\t\t#b每日可以拿30万金币工资。\r\n\t\t可自主选择发型。可使用快捷洗血功能。\r\n\t\t每日大量魔方，积分，活力，抽奖\r\n\t\t快捷传送，三倍经验，双倍爆率\r\n\t\t购买点卷特权获得双倍，以及专署副本。\r\n\r\n- #e#d管理提示：#n#b点是进行购买。点否返回上一页.#k");	
			}
		} else if (status == 2) {
			if(typed==1){
                if (cm.haveItem(2430865) < 1 && cm.getSpace(2) > 2 && cm.getHyPay(1) >= 10) {
			cm.gainItem(2430865,1,1);
			cm.addHyPay(10);
			cm.sendOk(head + "恭喜您成功购买一天随身服务.");
			cm.getMap().startMapEffect("恭喜玩家 "+cm.getChar().getName()+" 成功购买理财服务一天权。", 5120012);
			cm.worldSpouseMessage(0x20, "[系统公告] : 恭喜 " + cm.getChar().getName() + " 成功购买一天理财服务.");
			cm.dispose();
                } else {
			cm.sendOk(head + "失败：\r\n\r\n#r1). 您的随身服务未到期,无法重复办理.\r\n2). 充值金额未达到条件.\r\n3). 背包里消耗栏位已满,请清理.");
			cm.dispose();
				}
			} else if(typed==2){
                if (cm.haveItem(2430865) < 1 && cm.getSpace(2) > 2 && cm.getPlayer().getCSPoints(1) >= 100000) {
			cm.gainItem(2430865,1,30);
			cm.gainNX(1, -100000);
			cm.sendOk(head + "恭喜您成功购买一个月理财服务.");
			cm.getMap().startMapEffect("恭喜玩家 "+cm.getChar().getName()+" 成功购买理财服务一个月权。", 5120012);
			cm.worldSpouseMessage(0x20, "[系统公告] : 恭喜 " + cm.getChar().getName() + " 成功购买一月理财服务.");
			cm.dispose();
                } else {
			cm.sendOk(head + "失败：\r\n\r\n#r1). 您的理财服务未到期,无法重复办理.\r\n2). 充值金额未达到条件.\r\n3). 背包里消耗栏位已满,请清理.");
			cm.dispose();
				}
			} else if(typed==3){
                if (cm.haveItem(2430865) < 1 && cm.getSpace(2) > 2 && cm.getHyPay(1) >= 600) {
			cm.gainItem(2430865,1,180);
			cm.addHyPay(600);
			cm.sendOk(head + "恭喜您成功购买半年理财服务.");
			cm.getMap().startMapEffect("恭喜玩家 "+cm.getChar().getName()+" 成功购买理财服务半年权。", 5120012);
			cm.worldSpouseMessage(0x20, "[系统公告] : 恭喜 " + cm.getChar().getName() + " 成功购买半年理财服务.");
			cm.dispose();
                } else {
			cm.sendOk(head + "失败：\r\n\r\n#r1). 您的随身服务未到期,无法重复办理.\r\n2). 充值金额未达到条件.\r\n3). 背包里消耗栏位已满,请清理.");
			cm.dispose();
				}
           } else if(typed==4){
                if (cm.haveItem(2430865) < 1 && cm.getSpace(2) > 2 && cm.getHyPay(1) >= 1200) {
			cm.gainItem(2430865,1,180);
			cm.addHyPay(1200);
			cm.sendOk(head + "恭喜您成功购买一年理财服务.");
			cm.getMap().startMapEffect("恭喜玩家 "+cm.getChar().getName()+" 成功购买理财服务一年权。", 5120012);
			cm.worldSpouseMessage(0x20, "[系统公告] : 恭喜 " + cm.getChar().getName() + " 成功购买一年理财服务.");
			cm.dispose();
                } else {
			cm.sendOk(head + "失败：\r\n\r\n#r1). 您的随身服务未到期,无法重复办理.\r\n2). 充值金额未达到条件.\r\n3). 背包里消耗栏位已满,请清理.");
			cm.dispose();
				}
           }
      }
   }
}