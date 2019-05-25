var aaa ="#fUI/UIWindow.img/PvP/Scroll/enabled/next2#";

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
                        var selStr = "#d您好，1月1日至2月28日活动期间只要收集200枚春节币即可领取活动奖励。#n#k\r\n";
                        selStr +="\r\n#L1##b"+aaa+" 200枚春节币兑换150材料包#l#k\r\n";
                        cm.sendSimple(selStr);	
		} else if (status == 1) {
			if (selection == 1) {
				typed=1;
				cm.sendYesNo("- #e#d活动奖品：#n#k\r\n\r\n#b需要#t4310110# x 200：\t\t\t\t #r " + cm.itemQuantity(4310110) + " / 200 个\r\n\r\n当您收集完后将会得到\r\n #i2431938# #t2431938# x1 个\r\n #i1112159# #t1112159# x1 个\r\n #i1112271# #t1112271# x1 个\r\n\r\n- #e#d管理提示：#n#b点是进行领取。点否返回上一页.#k");
			} else if (selection == 2) {
				typed=2;
				cm.sendYesNo("- #e#d法弗纳贯雷枪需要的材料：#n#k\r\n\r\n#b需要#t4021012#：\t\t\t\t #r " + cm.itemQuantity(4021012) + " / 30 个\r\n#b需要#t4021010#： \t\t\t\t\t\t#r" + cm.itemQuantity(4021010) + " / 30 个\r\n#b需要#t4021011#： \t\t\t\t  #r" + cm.itemQuantity(4021011) + " / 30 个\r\n#b需要#t4000082#： \t\t\t\t  #r" + cm.itemQuantity(4000082) + " / 400 个\r\n#b需要#t4000124#：\t\t\t#r" + cm.itemQuantity(4000124) + " / 50 个\r\n#b需要#t4310015#：\t\t\t\t\t\t#r" + cm.itemQuantity(4310015) + " / 3 个\r\n#b需要#t4021019#：\t\t\t\t\t\t  #r" + cm.itemQuantity(4021019) + " / 1 个\r\n#b需要#t4033356#：\t\t\t\t\t   #r" + cm.itemQuantity(4033356) + " / 50 个\r\n#b需要#t4310030#： \t\t\t\t\t\t#r" + cm.itemQuantity(4310030) + " / 5000 个#k\r\n\r\n- #e#d管理提示：#n#b点是进行制作。点否返回上一页.#k");
                        } else if (selection == 3) {
				typed=3;
				cm.sendYesNo("- #e#d法弗纳追风者需要的材料：#n#k\r\n\r\n#b需要#t4021012#：\t\t\t\t #r " + cm.itemQuantity(4021012) + " / 30 个\r\n#b需要#t4021010#： \t\t\t\t\t\t#r" + cm.itemQuantity(4021010) + " / 30 个\r\n#b需要#t4021011#： \t\t\t\t  #r" + cm.itemQuantity(4021011) + " / 30 个\r\n#b需要#t4000082#： \t\t\t\t  #r" + cm.itemQuantity(4000082) + " / 400 个\r\n#b需要#t4000124#：\t\t\t#r" + cm.itemQuantity(4000124) + " / 50 个\r\n#b需要#t4310015#：\t\t\t\t\t\t#r" + cm.itemQuantity(4310015) + " / 3 个\r\n#b需要#t4021019#：\t\t\t\t\t\t  #r" + cm.itemQuantity(4021019) + " / 1 个\r\n#b需要#t4033356#：\t\t\t\t\t   #r" + cm.itemQuantity(4033356) + " / 50 个\r\n#b需要#t4310030#： \t\t\t\t\t\t#r" + cm.itemQuantity(4310030) + " / 5000 个#k\r\n\r\n- #e#d管理提示：#n#b点是进行制作。点否返回上一页.#k");
                        } else if (selection == 4) {
				typed=4;
				cm.sendYesNo("- #e#d法弗纳风翼弩需要的材料：#n#k\r\n\r\n#b需要#t4021012#：\t\t\t\t #r " + cm.itemQuantity(4021012) + " / 30 个\r\n#b需要#t4021010#： \t\t\t\t\t\t#r" + cm.itemQuantity(4021010) + " / 30 个\r\n#b需要#t4021011#： \t\t\t\t  #r" + cm.itemQuantity(4021011) + " / 30 个\r\n#b需要#t4000082#： \t\t\t\t  #r" + cm.itemQuantity(4000082) + " / 400 个\r\n#b需要#t4000124#：\t\t\t#r" + cm.itemQuantity(4000124) + " / 50 个\r\n#b需要#t4310015#：\t\t\t\t\t\t#r" + cm.itemQuantity(4310015) + " / 3 个\r\n#b需要#t4021019#：\t\t\t\t\t\t  #r" + cm.itemQuantity(4021019) + " / 1 个\r\n#b需要#t4033356#：\t\t\t\t\t   #r" + cm.itemQuantity(4033356) + " / 50 个\r\n#b需要#t4310030#： \t\t\t\t\t\t#r" + cm.itemQuantity(4310030) + " / 5000 个#k\r\n\r\n- #e#d管理提示：#n#b点是进行制作。点否返回上一页.#k");	
                        } else if (selection == 5) {
				typed=5;
				cm.sendYesNo("- #e#d法弗纳危险之手需要的材料：#n#k\r\n\r\n#b需要#t4021012#：\t\t\t\t #r " + cm.itemQuantity(4021012) + " / 30 个\r\n#b需要#t4021010#： \t\t\t\t\t\t#r" + cm.itemQuantity(4021010) + " / 30 个\r\n#b需要#t4021011#： \t\t\t\t  #r" + cm.itemQuantity(4021011) + " / 30 个\r\n#b需要#t4000082#： \t\t\t\t  #r" + cm.itemQuantity(4000082) + " / 400 个\r\n#b需要#t4000124#：\t\t\t#r" + cm.itemQuantity(4000124) + " / 50 个\r\n#b需要#t4310015#：\t\t\t\t\t\t#r" + cm.itemQuantity(4310015) + " / 3 个\r\n#b需要#t4021019#：\t\t\t\t\t\t  #r" + cm.itemQuantity(4021019) + " / 1 个\r\n#b需要#t4033356#：\t\t\t\t\t   #r" + cm.itemQuantity(4033356) + " / 50 个\r\n#b需要#t4310030#： \t\t\t\t\t\t#r" + cm.itemQuantity(4310030) + " / 5000 个#k\r\n\r\n- #e#d管理提示：#n#b点是进行制作。点否返回上一页.#k");
                        } else if (selection == 6) {
				typed=6;
				cm.sendYesNo("- #e#d法弗纳大马士革剑需要的材料：#n#k\r\n\r\n#b需要#t4021012#：\t\t\t\t #r " + cm.itemQuantity(4021012) + " / 30 个\r\n#b需要#t4021010#： \t\t\t\t\t\t#r" + cm.itemQuantity(4021010) + " / 30 个\r\n#b需要#t4021011#： \t\t\t\t  #r" + cm.itemQuantity(4021011) + " / 30 个\r\n#b需要#t4000082#： \t\t\t\t  #r" + cm.itemQuantity(4000082) + " / 400 个\r\n#b需要#t4000124#：\t\t\t#r" + cm.itemQuantity(4000124) + " / 50 个\r\n#b需要#t4310015#：\t\t\t\t\t\t#r" + cm.itemQuantity(4310015) + " / 3 个\r\n#b需要#t4021019#：\t\t\t\t\t\t  #r" + cm.itemQuantity(4021019) + " / 1 个\r\n#b需要#t4033356#：\t\t\t\t\t   #r" + cm.itemQuantity(4033356) + " / 50 个\r\n#b需要#t4310030#： \t\t\t\t\t\t#r" + cm.itemQuantity(4310030) + " / 5000 个#k\r\n\r\n- #e#d管理提示：#n#b点是进行制作。点否返回上一页.#k");
                        } else if (selection == 7) {
				typed=7;
				cm.sendYesNo("- #e#d法弗纳急速之刃需要的材料：#n#k\r\n\r\n#b需要#t4021012#：\t\t\t\t #r " + cm.itemQuantity(4021012) + " / 30 个\r\n#b需要#t4021010#： \t\t\t\t\t\t#r" + cm.itemQuantity(4021010) + " / 30 个\r\n#b需要#t4021011#： \t\t\t\t  #r" + cm.itemQuantity(4021011) + " / 30 个\r\n#b需要#t4000082#： \t\t\t\t  #r" + cm.itemQuantity(4000082) + " / 400 个\r\n#b需要#t4000124#：\t\t\t#r" + cm.itemQuantity(4000124) + " / 50 个\r\n#b需要#t4310015#：\t\t\t\t\t\t#r" + cm.itemQuantity(4310015) + " / 3 个\r\n#b需要#t4021019#：\t\t\t\t\t\t  #r" + cm.itemQuantity(4021019) + " / 1 个\r\n#b需要#t4033356#：\t\t\t\t\t   #r" + cm.itemQuantity(4033356) + " / 50 个\r\n#b需要#t4310030#： \t\t\t\t\t\t#r" + cm.itemQuantity(4310030) + " / 5000 个#k\r\n\r\n- #e#d管理提示：#n#b点是进行制作。点否返回上一页.#k");
                        } else if (selection == 8) {
				typed=8;
				cm.sendYesNo("- #e#d法弗纳洞察手杖需要的材料：#n#k\r\n\r\n#b需要#t4021012#：\t\t\t\t #r " + cm.itemQuantity(4021012) + " / 30 个\r\n#b需要#t4021010#： \t\t\t\t\t\t#r" + cm.itemQuantity(4021010) + " / 30 个\r\n#b需要#t4021011#： \t\t\t\t  #r" + cm.itemQuantity(4021011) + " / 30 个\r\n#b需要#t4000082#： \t\t\t\t  #r" + cm.itemQuantity(4000082) + " / 400 个\r\n#b需要#t4000124#：\t\t\t#r" + cm.itemQuantity(4000124) + " / 50 个\r\n#b需要#t4310015#：\t\t\t\t\t\t#r" + cm.itemQuantity(4310015) + " / 3 个\r\n#b需要#t4021019#：\t\t\t\t\t\t  #r" + cm.itemQuantity(4021019) + " / 1 个\r\n#b需要#t4033356#：\t\t\t\t\t   #r" + cm.itemQuantity(4033356) + " / 50 个\r\n#b需要#t4310030#： \t\t\t\t\t\t#r" + cm.itemQuantity(4310030) + " / 5000 个#k\r\n\r\n- #e#d管理提示：#n#b点是进行制作。点否返回上一页.#k");
                        } else if (selection == 9) {
				typed=9;
				cm.sendYesNo("- #e#d法弗纳魔冠之杖需要的材料：#n#k\r\n\r\n#b需要#t4021012#：\t\t\t\t #r " + cm.itemQuantity(4021012) + " / 30 个\r\n#b需要#t4021010#： \t\t\t\t\t\t#r" + cm.itemQuantity(4021010) + " / 30 个\r\n#b需要#t4021011#： \t\t\t\t  #r" + cm.itemQuantity(4021011) + " / 30 个\r\n#b需要#t4000082#： \t\t\t\t  #r" + cm.itemQuantity(4000082) + " / 400 个\r\n#b需要#t4000124#：\t\t\t#r" + cm.itemQuantity(4000124) + " / 50 个\r\n#b需要#t4310015#：\t\t\t\t\t\t#r" + cm.itemQuantity(4310015) + " / 3 个\r\n#b需要#t4021019#：\t\t\t\t\t\t  #r" + cm.itemQuantity(4021019) + " / 1 个\r\n#b需要#t4033356#：\t\t\t\t\t   #r" + cm.itemQuantity(4033356) + " / 50 个\r\n#b需要#t4310030#： \t\t\t\t\t\t#r" + cm.itemQuantity(4310030) + " / 5000 个#k\r\n\r\n- #e#d管理提示：#n#b点是进行制作。点否返回上一页.#k");
                        } else if (selection == 10) {
				typed=10;
				cm.sendYesNo("- #e#d法弗纳魔力夺取者需要的材料：#n#k\r\n\r\n#b需要#t4021012#：\t\t\t\t #r " + cm.itemQuantity(4021012) + " / 30 个\r\n#b需要#t4021010#： \t\t\t\t\t\t#r" + cm.itemQuantity(4021010) + " / 30 个\r\n#b需要#t4021011#： \t\t\t\t  #r" + cm.itemQuantity(4021011) + " / 30 个\r\n#b需要#t4000082#： \t\t\t\t  #r" + cm.itemQuantity(4000082) + " / 400 个\r\n#b需要#t4000124#：\t\t\t#r" + cm.itemQuantity(4000124) + " / 50 个\r\n#b需要#t4310015#：\t\t\t\t\t\t#r" + cm.itemQuantity(4310015) + " / 3 个\r\n#b需要#t4021019#：\t\t\t\t\t\t  #r" + cm.itemQuantity(4021019) + " / 1 个\r\n#b需要#t4033356#：\t\t\t\t\t   #r" + cm.itemQuantity(4033356) + " / 50 个\r\n#b需要#t4310030#： \t\t\t\t\t\t#r" + cm.itemQuantity(4310030) + " / 5000 个#k\r\n\r\n- #e#d管理提示：#n#b点是进行制作。点否返回上一页.#k");
                        } else if (selection == 11) {
				typed=11;
				cm.sendYesNo("- #e#d法弗纳魔力源泉杖需要的材料：#n#k\r\n\r\n#b需要#t4021012#：\t\t\t\t #r " + cm.itemQuantity(4021012) + " / 30 个\r\n#b需要#t4021010#： \t\t\t\t\t\t#r" + cm.itemQuantity(4021010) + " / 30 个\r\n#b需要#t4021011#： \t\t\t\t  #r" + cm.itemQuantity(4021011) + " / 30 个\r\n#b需要#t4000082#： \t\t\t\t  #r" + cm.itemQuantity(4000082) + " / 400 个\r\n#b需要#t4000124#：\t\t\t#r" + cm.itemQuantity(4000124) + " / 50 个\r\n#b需要#t4310015#：\t\t\t\t\t\t#r" + cm.itemQuantity(4310015) + " / 3 个\r\n#b需要#t4021019#：\t\t\t\t\t\t  #r" + cm.itemQuantity(4021019) + " / 1 个\r\n#b需要#t4033356#：\t\t\t\t\t   #r" + cm.itemQuantity(4033356) + " / 50 个\r\n#b需要#t4310030#： \t\t\t\t\t\t#r" + cm.itemQuantity(4310030) + " / 5000 个#k\r\n\r\n- #e#d管理提示：#n#b点是进行制作。点否返回上一页.#k");
                        } else if (selection == 12) {
				typed=12;
				cm.sendYesNo("- #e#d法弗纳精神之刃需要的材料：#n#k\r\n\r\n#b需要#t4021012#：\t\t\t\t #r " + cm.itemQuantity(4021012) + " / 30 个\r\n#b需要#t4021010#： \t\t\t\t\t\t#r" + cm.itemQuantity(4021010) + " / 30 个\r\n#b需要#t4021011#： \t\t\t\t  #r" + cm.itemQuantity(4021011) + " / 30 个\r\n#b需要#t4000082#： \t\t\t\t  #r" + cm.itemQuantity(4000082) + " / 400 个\r\n#b需要#t4000124#：\t\t\t#r" + cm.itemQuantity(4000124) + " / 50 个\r\n#b需要#t4310015#：\t\t\t\t\t\t#r" + cm.itemQuantity(4310015) + " / 3 个\r\n#b需要#t4021019#：\t\t\t\t\t\t  #r" + cm.itemQuantity(4021019) + " / 1 个\r\n#b需要#t4033356#：\t\t\t\t\t   #r" + cm.itemQuantity(4033356) + " / 50 个\r\n#b需要#t4310030#： \t\t\t\t\t\t#r" + cm.itemQuantity(4310030) + " / 5000 个#k\r\n\r\n- #e#d管理提示：#n#b点是进行制作。点否返回上一页.#k");
                        } else if (selection == 13) {
				typed=13;
				cm.sendYesNo("- #e#d法弗纳死亡使者需要的材料：#n#k\r\n\r\n#b需要#t4021012#：\t\t\t\t #r " + cm.itemQuantity(4021012) + " / 30 个\r\n#b需要#t4021010#： \t\t\t\t\t\t#r" + cm.itemQuantity(4021010) + " / 30 个\r\n#b需要#t4021011#： \t\t\t\t  #r" + cm.itemQuantity(4021011) + " / 30 个\r\n#b需要#t4000082#： \t\t\t\t  #r" + cm.itemQuantity(4000082) + " / 400 个\r\n#b需要#t4000124#：\t\t\t#r" + cm.itemQuantity(4000124) + " / 50 个\r\n#b需要#t4310015#：\t\t\t\t\t\t#r" + cm.itemQuantity(4310015) + " / 3 个\r\n#b需要#t4021019#：\t\t\t\t\t\t  #r" + cm.itemQuantity(4021019) + " / 1 个\r\n#b需要#t4033356#：\t\t\t\t\t   #r" + cm.itemQuantity(4033356) + " / 50 个\r\n#b需要#t4310030#： \t\t\t\t\t\t#r" + cm.itemQuantity(4310030) + " / 5000 个#k\r\n\r\n- #e#d管理提示：#n#b点是进行制作。点否返回上一页.#k");
                        } else if (selection == 14) {
				typed=14;
				cm.sendYesNo("- #e#d法弗纳双风翼弩需要的材料：#n#k\r\n\r\n#b需要#t4021012#：\t\t\t\t #r " + cm.itemQuantity(4021012) + " / 30 个\r\n#b需要#t4021010#： \t\t\t\t\t\t#r" + cm.itemQuantity(4021010) + " / 30 个\r\n#b需要#t4021011#： \t\t\t\t  #r" + cm.itemQuantity(4021011) + " / 30 个\r\n#b需要#t4000082#： \t\t\t\t  #r" + cm.itemQuantity(4000082) + " / 400 个\r\n#b需要#t4000124#：\t\t\t#r" + cm.itemQuantity(4000124) + " / 50 个\r\n#b需要#t4310015#：\t\t\t\t\t\t#r" + cm.itemQuantity(4310015) + " / 3 个\r\n#b需要#t4021019#：\t\t\t\t\t\t  #r" + cm.itemQuantity(4021019) + " / 1 个\r\n#b需要#t4033356#：\t\t\t\t\t   #r" + cm.itemQuantity(4033356) + " / 50 个\r\n#b需要#t4310030#： \t\t\t\t\t\t#r" + cm.itemQuantity(4310030) + " / 5000 个#k\r\n\r\n- #e#d管理提示：#n#b点是进行制作。点否返回上一页.#k");
			}
		} else if (status == 2) {
			if(typed==1){
                if (cm.haveItem(4310110, 200)) {
			cm.gainItem(4310110, -200);
			cm.gainItem(2431938, 1);
			cm.gainItem(1112159, 1);
			cm.gainItem(1112271, 1);
			cm.sendOk("恭喜您获得活动奖励法弗纳武器材料包一个。");
			cm.worldSpouseMessage(0x20, "『活动公告』 : 恭喜 " + cm.getChar().getName() + " 活动奖励中获得150法弗纳武器一把。");
			cm.dispose();
				} else {
			cm.sendOk("您当前春节币不足，请满足后再来兑换。");
			cm.dispose();
				}
			} else if(typed==2){
                if (cm.haveItem(4310030, 5000) && cm.haveItem(4033356, 50) && cm.getSpace(1) >= 1 && cm.haveItem(4021012, 30) && cm.haveItem(4021010, 30) && cm.haveItem(4021011, 30) && cm.haveItem(4000082, 400) && cm.haveItem(4000124, 50) && cm.haveItem(4310015, 3) && cm.haveItem(4021019, 1)) {
			cm.gainItem(1432167,1);
			cm.gainItem(4310030, -5000);
			cm.gainItem(4033356, -50);
			cm.gainItem(4021012, -30);
			cm.gainItem(4021011, -30);
			cm.gainItem(4021010, -30);
			cm.gainItem(4000082, -400);
			cm.gainItem(4000124, -50);
			cm.gainItem(4310015, -3);
			cm.gainItem(4021019, -1);
			cm.sendOk("恭喜您合成法弗纳贯雷枪一把.");
			cm.worldSpouseMessage(0x20, "[任务公告] : 恭喜 " + cm.getChar().getName() + " 在市场<KINYOU>处制作了法弗纳贯雷枪.");
			cm.dispose();
                } else {
			cm.sendOk("合成失败：\r\n\r\n#b需要#t4021012#：\t\t\t\t #r " + cm.itemQuantity(4021012) + " / 30 个\r\n#b需要#t4021010#： \t\t\t\t\t\t#r" + cm.itemQuantity(4021010) + " / 30 个\r\n#b需要#t4021011#： \t\t\t\t  #r" + cm.itemQuantity(4021011) + " / 30 个\r\n#b需要#t4000082#： \t\t\t\t  #r" + cm.itemQuantity(4000082) + " / 400 个\r\n#b需要#t4000124#：\t\t\t#r" + cm.itemQuantity(4000124) + " / 50 个\r\n#b需要#t4310015#：\t\t\t\t\t\t#r" + cm.itemQuantity(4310015) + " / 3 个\r\n#b需要#t4021019#：\t\t\t\t\t\t  #r" + cm.itemQuantity(4021019) + " / 1 个\r\n#b需要#t4033356#：\t\t\t\t\t   #r" + cm.itemQuantity(4033356) + " / 50 个\r\n#b需要#t4310030#： \t\t\t\t\t\t#r" + cm.itemQuantity(4310030) + " / 5000 个#k");
			cm.dispose();
				}
			} else if(typed==3){
                if (cm.haveItem(4310030, 5000) && cm.haveItem(4033356, 50) && cm.getSpace(1) >= 1 && cm.haveItem(4021012, 30) && cm.haveItem(4021010, 30) && cm.haveItem(4021011, 30) && cm.haveItem(4000082, 400) && cm.haveItem(4000124, 50) && cm.haveItem(4310015, 3) && cm.haveItem(4021019, 1)) {
			cm.gainItem(1452205,1);
			cm.gainItem(4310030, -5000);
			cm.gainItem(4033356, -50);
			cm.gainItem(4021012, -30);
			cm.gainItem(4021011, -30);
			cm.gainItem(4021010, -30);
			cm.gainItem(4000082, -400);
			cm.gainItem(4000124, -50);
			cm.gainItem(4310015, -3);
			cm.gainItem(4021019, -1);
			cm.sendOk("恭喜您合成法弗纳追风者一把.");
			cm.worldSpouseMessage(0x20, "[任务公告] : 恭喜 " + cm.getChar().getName() + " 在市场<KINYOU>处制作了法弗纳追风者.");
			cm.dispose();
                } else {
			cm.sendOk("合成失败：\r\n\r\n#b需要#t4021012#：\t\t\t\t #r " + cm.itemQuantity(4021012) + " / 30 个\r\n#b需要#t4021010#： \t\t\t\t\t\t#r" + cm.itemQuantity(4021010) + " / 30 个\r\n#b需要#t4021011#： \t\t\t\t  #r" + cm.itemQuantity(4021011) + " / 30 个\r\n#b需要#t4000082#： \t\t\t\t  #r" + cm.itemQuantity(4000082) + " / 400 个\r\n#b需要#t4000124#：\t\t\t#r" + cm.itemQuantity(4000124) + " / 50 个\r\n#b需要#t4310015#：\t\t\t\t\t\t#r" + cm.itemQuantity(4310015) + " / 3 个\r\n#b需要#t4021019#：\t\t\t\t\t\t  #r" + cm.itemQuantity(4021019) + " / 1 个\r\n#b需要#t4033356#：\t\t\t\t\t   #r" + cm.itemQuantity(4033356) + " / 50 个\r\n#b需要#t4310030#： \t\t\t\t\t\t#r" + cm.itemQuantity(4310030) + " / 5000 个#k");
			cm.dispose();
				}
			} else if(typed==4){
                if (cm.haveItem(4310030, 5000) && cm.haveItem(4033356, 50) && cm.getSpace(1) >= 1 && cm.haveItem(4021012, 30) && cm.haveItem(4021010, 30) && cm.haveItem(4021011, 30) && cm.haveItem(4000082, 400) && cm.haveItem(4000124, 50) && cm.haveItem(4310015, 3) && cm.haveItem(4021019, 1)) {
			cm.gainItem(1462193,1);
			cm.gainItem(4310030, -5000);
			cm.gainItem(4033356, -50);
			cm.gainItem(4021012, -30);
			cm.gainItem(4021011, -30);
			cm.gainItem(4021010, -30);
			cm.gainItem(4000082, -400);
			cm.gainItem(4000124, -50);
			cm.gainItem(4310015, -3);
			cm.gainItem(4021019, -1);
			cm.sendOk("恭喜您合成法弗纳风翼弩一把.");
			cm.worldSpouseMessage(0x20, "[任务公告] : 恭喜 " + cm.getChar().getName() + " 在市场<KINYOU>处制作了法弗纳风翼弩.");
			cm.dispose();
                } else {
			cm.sendOk("合成失败：\r\n\r\n#b需要#t4021012#：\t\t\t\t #r " + cm.itemQuantity(4021012) + " / 30 个\r\n#b需要#t4021010#： \t\t\t\t\t\t#r" + cm.itemQuantity(4021010) + " / 30 个\r\n#b需要#t4021011#： \t\t\t\t  #r" + cm.itemQuantity(4021011) + " / 30 个\r\n#b需要#t4000082#： \t\t\t\t  #r" + cm.itemQuantity(4000082) + " / 400 个\r\n#b需要#t4000124#：\t\t\t#r" + cm.itemQuantity(4000124) + " / 50 个\r\n#b需要#t4310015#：\t\t\t\t\t\t#r" + cm.itemQuantity(4310015) + " / 3 个\r\n#b需要#t4021019#：\t\t\t\t\t\t  #r" + cm.itemQuantity(4021019) + " / 1 个\r\n#b需要#t4033356#：\t\t\t\t\t   #r" + cm.itemQuantity(4033356) + " / 50 个\r\n#b需要#t4310030#： \t\t\t\t\t\t#r" + cm.itemQuantity(4310030) + " / 5000 个#k");
			cm.dispose();
				}
			} else if(typed==5){
                if (cm.haveItem(4310030, 5000) && cm.haveItem(4033356, 50) && cm.getSpace(1) >= 1 && cm.haveItem(4021012, 30) && cm.haveItem(4021010, 30) && cm.haveItem(4021011, 30) && cm.haveItem(4000082, 400) && cm.haveItem(4000124, 50) && cm.haveItem(4310015, 3) && cm.haveItem(4021019, 1)) {
			cm.gainItem(1472214,1);
			cm.gainItem(4310030, -5000);
			cm.gainItem(4033356, -50);
			cm.gainItem(4021012, -30);
			cm.gainItem(4021011, -30);
			cm.gainItem(4021010, -30);
			cm.gainItem(4000082, -400);
			cm.gainItem(4000124, -50);
			cm.gainItem(4310015, -3);
			cm.gainItem(4021019, -1);
			cm.sendOk("恭喜您合成法弗纳危险之手一把.");
			cm.worldSpouseMessage(0x20, "[任务公告] : 恭喜 " + cm.getChar().getName() + " 在市场<KINYOU>处制作了法弗纳危险之手.");
			cm.dispose();
                } else {
			cm.sendOk("合成失败：\r\n\r\n#b需要#t4021012#：\t\t\t\t #r " + cm.itemQuantity(4021012) + " / 30 个\r\n#b需要#t4021010#： \t\t\t\t\t\t#r" + cm.itemQuantity(4021010) + " / 30 个\r\n#b需要#t4021011#： \t\t\t\t  #r" + cm.itemQuantity(4021011) + " / 30 个\r\n#b需要#t4000082#： \t\t\t\t  #r" + cm.itemQuantity(4000082) + " / 400 个\r\n#b需要#t4000124#：\t\t\t#r" + cm.itemQuantity(4000124) + " / 50 个\r\n#b需要#t4310015#：\t\t\t\t\t\t#r" + cm.itemQuantity(4310015) + " / 3 个\r\n#b需要#t4021019#：\t\t\t\t\t\t  #r" + cm.itemQuantity(4021019) + " / 1 个\r\n#b需要#t4033356#：\t\t\t\t\t   #r" + cm.itemQuantity(4033356) + " / 50 个\r\n#b需要#t4310030#： \t\t\t\t\t\t#r" + cm.itemQuantity(4310030) + " / 5000 个#k");
			cm.dispose();
				}
			} else if(typed==6){
                if (cm.haveItem(4310030, 5000) && cm.haveItem(4033356, 50) && cm.getSpace(1) >= 1 && cm.haveItem(4021012, 30) && cm.haveItem(4021010, 30) && cm.haveItem(4021011, 30) && cm.haveItem(4000082, 400) && cm.haveItem(4000124, 50) && cm.haveItem(4310015, 3) && cm.haveItem(4021019, 1)) {
			cm.gainItem(1332225,1);
			cm.gainItem(4310030, -5000);
			cm.gainItem(4033356, -50);
			cm.gainItem(4021012, -30);
			cm.gainItem(4021011, -30);
			cm.gainItem(4021010, -30);
			cm.gainItem(4000082, -400);
			cm.gainItem(4000124, -50);
			cm.gainItem(4310015, -3);
			cm.gainItem(4021019, -1);
			cm.sendOk("恭喜您合成法弗纳大马士革剑一把.");
			cm.worldSpouseMessage(0x20, "[任务公告] : 恭喜 " + cm.getChar().getName() + " 在市场<KINYOU>处制作了法弗大马士革剑.");
			cm.dispose();
                } else {
			cm.sendOk("合成失败：\r\n\r\n#b需要#t4021012#：\t\t\t\t #r " + cm.itemQuantity(4021012) + " / 30 个\r\n#b需要#t4021010#： \t\t\t\t\t\t#r" + cm.itemQuantity(4021010) + " / 30 个\r\n#b需要#t4021011#： \t\t\t\t  #r" + cm.itemQuantity(4021011) + " / 30 个\r\n#b需要#t4000082#： \t\t\t\t  #r" + cm.itemQuantity(4000082) + " / 400 个\r\n#b需要#t4000124#：\t\t\t#r" + cm.itemQuantity(4000124) + " / 50 个\r\n#b需要#t4310015#：\t\t\t\t\t\t#r" + cm.itemQuantity(4310015) + " / 3 个\r\n#b需要#t4021019#：\t\t\t\t\t\t  #r" + cm.itemQuantity(4021019) + " / 1 个\r\n#b需要#t4033356#：\t\t\t\t\t   #r" + cm.itemQuantity(4033356) + " / 50 个\r\n#b需要#t4310030#： \t\t\t\t\t\t#r" + cm.itemQuantity(4310030) + " / 5000 个#k");
			cm.dispose();
				}
			} else if(typed==7){
                if (cm.haveItem(4310030, 5000) && cm.haveItem(4033356, 50) && cm.getSpace(1) >= 1 && cm.haveItem(4021012, 30) && cm.haveItem(4021010, 30) && cm.haveItem(4021011, 30) && cm.haveItem(4000082, 400) && cm.haveItem(4000124, 50) && cm.haveItem(4310015, 3) && cm.haveItem(4021019, 1)) {
			cm.gainItem(1342082,1);
			cm.gainItem(4310030, -5000);
			cm.gainItem(4033356, -50);
			cm.gainItem(4021012, -30);
			cm.gainItem(4021011, -30);
			cm.gainItem(4021010, -30);
			cm.gainItem(4000082, -400);
			cm.gainItem(4000124, -50);
			cm.gainItem(4310015, -3);
			cm.gainItem(4021019, -1);
			cm.sendOk("恭喜您合成法弗纳急速之刃一把.");
			cm.worldSpouseMessage(0x20, "[任务公告] : 恭喜 " + cm.getChar().getName() + " 在市场<KINYOU>处制作了法弗纳急速之刃.");
			cm.dispose();
                } else {
			cm.sendOk("合成失败：\r\n\r\n#b需要#t4021012#：\t\t\t\t #r " + cm.itemQuantity(4021012) + " / 30 个\r\n#b需要#t4021010#： \t\t\t\t\t\t#r" + cm.itemQuantity(4021010) + " / 30 个\r\n#b需要#t4021011#： \t\t\t\t  #r" + cm.itemQuantity(4021011) + " / 30 个\r\n#b需要#t4000082#： \t\t\t\t  #r" + cm.itemQuantity(4000082) + " / 400 个\r\n#b需要#t4000124#：\t\t\t#r" + cm.itemQuantity(4000124) + " / 50 个\r\n#b需要#t4310015#：\t\t\t\t\t\t#r" + cm.itemQuantity(4310015) + " / 3 个\r\n#b需要#t4021019#：\t\t\t\t\t\t  #r" + cm.itemQuantity(4021019) + " / 1 个\r\n#b需要#t4033356#：\t\t\t\t\t   #r" + cm.itemQuantity(4033356) + " / 50 个\r\n#b需要#t4310030#： \t\t\t\t\t\t#r" + cm.itemQuantity(4310030) + " / 5000 个#k");
			cm.dispose();
				}
			} else if(typed==8){
                if (cm.haveItem(4310030, 5000) && cm.haveItem(4033356, 50) && cm.getSpace(1) >= 1 && cm.haveItem(4021012, 30) && cm.haveItem(4021010, 30) && cm.haveItem(4021011, 30) && cm.haveItem(4000082, 400) && cm.haveItem(4000124, 50) && cm.haveItem(4310015, 3) && cm.haveItem(4021019, 1)) {
			cm.gainItem(1362090,1);
			cm.gainItem(4310030, -5000);
			cm.gainItem(4033356, -50);
			cm.gainItem(4021012, -30);
			cm.gainItem(4021011, -30);
			cm.gainItem(4021010, -30);
			cm.gainItem(4000082, -400);
			cm.gainItem(4000124, -50);
			cm.gainItem(4310015, -3);
			cm.gainItem(4021019, -1);
			cm.sendOk("恭喜您合成法弗纳洞察手杖一把.");
			cm.worldSpouseMessage(0x20, "[任务公告] : 恭喜 " + cm.getChar().getName() + " 在市场<KINYOU>处制作了法弗纳洞察手杖.");
			cm.dispose();
                } else {
			cm.sendOk("合成失败：\r\n\r\n#b需要#t4021012#：\t\t\t\t #r " + cm.itemQuantity(4021012) + " / 30 个\r\n#b需要#t4021010#： \t\t\t\t\t\t#r" + cm.itemQuantity(4021010) + " / 30 个\r\n#b需要#t4021011#： \t\t\t\t  #r" + cm.itemQuantity(4021011) + " / 30 个\r\n#b需要#t4000082#： \t\t\t\t  #r" + cm.itemQuantity(4000082) + " / 400 个\r\n#b需要#t4000124#：\t\t\t#r" + cm.itemQuantity(4000124) + " / 50 个\r\n#b需要#t4310015#：\t\t\t\t\t\t#r" + cm.itemQuantity(4310015) + " / 3 个\r\n#b需要#t4021019#：\t\t\t\t\t\t  #r" + cm.itemQuantity(4021019) + " / 1 个\r\n#b需要#t4033356#：\t\t\t\t\t   #r" + cm.itemQuantity(4033356) + " / 50 个\r\n#b需要#t4310030#： \t\t\t\t\t\t#r" + cm.itemQuantity(4310030) + " / 5000 个#k");
			cm.dispose();
				}
			} else if(typed==9){
                if (cm.haveItem(4310030, 5000) && cm.haveItem(4033356, 50) && cm.getSpace(1) >= 1 && cm.haveItem(4021012, 30) && cm.haveItem(4021010, 30) && cm.haveItem(4021011, 30) && cm.haveItem(4000082, 400) && cm.haveItem(4000124, 50) && cm.haveItem(4310015, 3) && cm.haveItem(4021019, 1)) {
			cm.gainItem(1382208,1);
			cm.gainItem(4310030, -5000);
			cm.gainItem(4033356, -50);
			cm.gainItem(4021012, -30);
			cm.gainItem(4021011, -30);
			cm.gainItem(4021010, -30);
			cm.gainItem(4000082, -400);
			cm.gainItem(4000124, -50);
			cm.gainItem(4310015, -3);
			cm.gainItem(4021019, -1);
			cm.sendOk("恭喜您合成法弗纳魔冠之杖一把.");
			cm.worldSpouseMessage(0x20, "[任务公告] : 恭喜 " + cm.getChar().getName() + " 在市场<KINYOU>处制作了法弗纳魔冠之杖.");
			cm.dispose();
                } else {
			cm.sendOk("合成失败：\r\n\r\n#b需要#t4021012#：\t\t\t\t #r " + cm.itemQuantity(4021012) + " / 30 个\r\n#b需要#t4021010#： \t\t\t\t\t\t#r" + cm.itemQuantity(4021010) + " / 30 个\r\n#b需要#t4021011#： \t\t\t\t  #r" + cm.itemQuantity(4021011) + " / 30 个\r\n#b需要#t4000082#： \t\t\t\t  #r" + cm.itemQuantity(4000082) + " / 400 个\r\n#b需要#t4000124#：\t\t\t#r" + cm.itemQuantity(4000124) + " / 50 个\r\n#b需要#t4310015#：\t\t\t\t\t\t#r" + cm.itemQuantity(4310015) + " / 3 个\r\n#b需要#t4021019#：\t\t\t\t\t\t  #r" + cm.itemQuantity(4021019) + " / 1 个\r\n#b需要#t4033356#：\t\t\t\t\t   #r" + cm.itemQuantity(4033356) + " / 50 个\r\n#b需要#t4310030#： \t\t\t\t\t\t#r" + cm.itemQuantity(4310030) + " / 5000 个#k");
			cm.dispose();
				}
			} else if(typed==10){
                if (cm.haveItem(4310030, 5000) && cm.haveItem(4033356, 50) && cm.getSpace(1) >= 1 && cm.haveItem(4021012, 30) && cm.haveItem(4021010, 30) && cm.haveItem(4021011, 30) && cm.haveItem(4000082, 400) && cm.haveItem(4000124, 50) && cm.haveItem(4310015, 3) && cm.haveItem(4021019, 1)) {
			cm.gainItem(1372177,1);
			cm.gainItem(4310030, -5000);
			cm.gainItem(4033356, -50);
			cm.gainItem(4021012, -30);
			cm.gainItem(4021011, -30);
			cm.gainItem(4021010, -30);
			cm.gainItem(4000082, -400);
			cm.gainItem(4000124, -50);
			cm.gainItem(4310015, -3);
			cm.gainItem(4021019, -1);
			cm.sendOk("恭喜您合成法弗纳魔力夺取者一把.");
			cm.worldSpouseMessage(0x20, "[任务公告] : 恭喜 " + cm.getChar().getName() + " 在市场<KINYOU>处制作了法弗纳魔力夺取者.");
			cm.dispose();
                } else {
			cm.sendOk("合成失败：\r\n\r\n#b需要#t4021012#：\t\t\t\t #r " + cm.itemQuantity(4021012) + " / 30 个\r\n#b需要#t4021010#： \t\t\t\t\t\t#r" + cm.itemQuantity(4021010) + " / 30 个\r\n#b需要#t4021011#： \t\t\t\t  #r" + cm.itemQuantity(4021011) + " / 30 个\r\n#b需要#t4000082#： \t\t\t\t  #r" + cm.itemQuantity(4000082) + " / 400 个\r\n#b需要#t4000124#：\t\t\t#r" + cm.itemQuantity(4000124) + " / 50 个\r\n#b需要#t4310015#：\t\t\t\t\t\t#r" + cm.itemQuantity(4310015) + " / 3 个\r\n#b需要#t4021019#：\t\t\t\t\t\t  #r" + cm.itemQuantity(4021019) + " / 1 个\r\n#b需要#t4033356#：\t\t\t\t\t   #r" + cm.itemQuantity(4033356) + " / 50 个\r\n#b需要#t4310030#： \t\t\t\t\t\t#r" + cm.itemQuantity(4310030) + " / 5000 个#k");
			cm.dispose();
				}
			} else if(typed==11){
                if (cm.haveItem(4310030, 5000) && cm.haveItem(4033356, 50) && cm.getSpace(1) >= 1 && cm.haveItem(4021012, 30) && cm.haveItem(4021010, 30) && cm.haveItem(4021011, 30) && cm.haveItem(4000082, 400) && cm.haveItem(4000124, 50) && cm.haveItem(4310015, 3) && cm.haveItem(4021019, 1)) {
			cm.gainItem(1212063,1);
			cm.gainItem(4310030, -5000);
			cm.gainItem(4033356, -50);
			cm.gainItem(4021012, -30);
			cm.gainItem(4021011, -30);
			cm.gainItem(4021010, -30);
			cm.gainItem(4000082, -400);
			cm.gainItem(4000124, -50);
			cm.gainItem(4310015, -3);
			cm.gainItem(4021019, -1);
			cm.sendOk("恭喜您合成法弗纳魔力源泉杖一把.");
			cm.worldSpouseMessage(0x20, "[任务公告] : 恭喜 " + cm.getChar().getName() + " 在市场<KINYOU>处制作了法弗纳魔力源泉杖.");
			cm.dispose();
                } else {
			cm.sendOk("合成失败：\r\n\r\n#b需要#t4021012#：\t\t\t\t #r " + cm.itemQuantity(4021012) + " / 30 个\r\n#b需要#t4021010#： \t\t\t\t\t\t#r" + cm.itemQuantity(4021010) + " / 30 个\r\n#b需要#t4021011#： \t\t\t\t  #r" + cm.itemQuantity(4021011) + " / 30 个\r\n#b需要#t4000082#： \t\t\t\t  #r" + cm.itemQuantity(4000082) + " / 400 个\r\n#b需要#t4000124#：\t\t\t#r" + cm.itemQuantity(4000124) + " / 50 个\r\n#b需要#t4310015#：\t\t\t\t\t\t#r" + cm.itemQuantity(4310015) + " / 3 个\r\n#b需要#t4021019#：\t\t\t\t\t\t  #r" + cm.itemQuantity(4021019) + " / 1 个\r\n#b需要#t4033356#：\t\t\t\t\t   #r" + cm.itemQuantity(4033356) + " / 50 个\r\n#b需要#t4310030#： \t\t\t\t\t\t#r" + cm.itemQuantity(4310030) + " / 5000 个#k");
			cm.dispose();
				}
			} else if(typed==12){
                if (cm.haveItem(4310030, 5000) && cm.haveItem(4033356, 50) && cm.getSpace(1) >= 1 && cm.haveItem(4021012, 30) && cm.haveItem(4021010, 30) && cm.haveItem(4021011, 30) && cm.haveItem(4000082, 400) && cm.haveItem(4000124, 50) && cm.haveItem(4310015, 3) && cm.haveItem(4021019, 1)) {
			cm.gainItem(1242060,1);
			cm.gainItem(4310030, -5000);
			cm.gainItem(4033356, -50);
			cm.gainItem(4021012, -30);
			cm.gainItem(4021011, -30);
			cm.gainItem(4021010, -30);
			cm.gainItem(4000082, -400);
			cm.gainItem(4000124, -50);
			cm.gainItem(4310015, -3);
			cm.gainItem(4021019, -1);
			cm.sendOk("恭喜您合成法弗纳精神之刃一把.");
			cm.worldSpouseMessage(0x20, "[任务公告] : 恭喜 " + cm.getChar().getName() + " 在市场<KINYOU>处制作了法弗纳精神之刃.");
			cm.dispose();
                } else {
			cm.sendOk("合成失败：\r\n\r\n#b需要#t4021012#：\t\t\t\t #r " + cm.itemQuantity(4021012) + " / 30 个\r\n#b需要#t4021010#： \t\t\t\t\t\t#r" + cm.itemQuantity(4021010) + " / 30 个\r\n#b需要#t4021011#： \t\t\t\t  #r" + cm.itemQuantity(4021011) + " / 30 个\r\n#b需要#t4000082#： \t\t\t\t  #r" + cm.itemQuantity(4000082) + " / 400 个\r\n#b需要#t4000124#：\t\t\t#r" + cm.itemQuantity(4000124) + " / 50 个\r\n#b需要#t4310015#：\t\t\t\t\t\t#r" + cm.itemQuantity(4310015) + " / 3 个\r\n#b需要#t4021019#：\t\t\t\t\t\t  #r" + cm.itemQuantity(4021019) + " / 1 个\r\n#b需要#t4033356#：\t\t\t\t\t   #r" + cm.itemQuantity(4033356) + " / 50 个\r\n#b需要#t4310030#： \t\t\t\t\t\t#r" + cm.itemQuantity(4310030) + " / 5000 个#k");
			cm.dispose();
				}
			} else if(typed==13){
                if (cm.haveItem(4310030, 5000) && cm.haveItem(4033356, 50) && cm.getSpace(1) >= 1 && cm.haveItem(4021012, 30) && cm.haveItem(4021010, 30) && cm.haveItem(4021011, 30) && cm.haveItem(4000082, 400) && cm.haveItem(4000124, 50) && cm.haveItem(4310015, 3) && cm.haveItem(4021019, 1)) {
			cm.gainItem(1232057,1);
			cm.gainItem(4310030, -5000);
			cm.gainItem(4033356, -50);
			cm.gainItem(4021012, -30);
			cm.gainItem(4021011, -30);
			cm.gainItem(4021010, -30);
			cm.gainItem(4000082, -400);
			cm.gainItem(4000124, -50);
			cm.gainItem(4310015, -3);
			cm.gainItem(4021019, -1);
			cm.sendOk("恭喜您合成法弗纳死亡使者一把.");
			cm.worldSpouseMessage(0x20, "[任务公告] : 恭喜 " + cm.getChar().getName() + " 在市场<KINYOU>处制作了法弗纳死亡使者.");
			cm.dispose();
                } else {
			cm.sendOk("合成失败：\r\n\r\n#b需要#t4021012#：\t\t\t\t #r " + cm.itemQuantity(4021012) + " / 30 个\r\n#b需要#t4021010#： \t\t\t\t\t\t#r" + cm.itemQuantity(4021010) + " / 30 个\r\n#b需要#t4021011#： \t\t\t\t  #r" + cm.itemQuantity(4021011) + " / 30 个\r\n#b需要#t4000082#： \t\t\t\t  #r" + cm.itemQuantity(4000082) + " / 400 个\r\n#b需要#t4000124#：\t\t\t#r" + cm.itemQuantity(4000124) + " / 50 个\r\n#b需要#t4310015#：\t\t\t\t\t\t#r" + cm.itemQuantity(4310015) + " / 3 个\r\n#b需要#t4021019#：\t\t\t\t\t\t  #r" + cm.itemQuantity(4021019) + " / 1 个\r\n#b需要#t4033356#：\t\t\t\t\t   #r" + cm.itemQuantity(4033356) + " / 50 个\r\n#b需要#t4310030#： \t\t\t\t\t\t#r" + cm.itemQuantity(4310030) + " / 5000 个#k");
			cm.dispose();
				}
			} else if(typed==14){
                if (cm.haveItem(4310030, 5000) && cm.haveItem(4033356, 50) && cm.getSpace(1) >= 1 && cm.haveItem(4021012, 30) && cm.haveItem(4021010, 30) && cm.haveItem(4021011, 30) && cm.haveItem(4000082, 400) && cm.haveItem(4000124, 50) && cm.haveItem(4310015, 3) && cm.haveItem(4021019, 1)) {
			cm.gainItem(1522094,1);
			cm.gainItem(4310030, -5000);
			cm.gainItem(4033356, -50);
			cm.gainItem(4021012, -30);
			cm.gainItem(4021011, -30);
			cm.gainItem(4021010, -30);
			cm.gainItem(4000082, -400);
			cm.gainItem(4000124, -50);
			cm.gainItem(4310015, -3);
			cm.gainItem(4021019, -1);
			cm.sendOk("恭喜您合成法弗纳双风翼弩一把.");
			cm.worldSpouseMessage(0x20, "[任务公告] : 恭喜 " + cm.getChar().getName() + " 在市场<KINYOU>处制作了法弗纳双风翼弩.");
			cm.dispose();
                } else {
			cm.sendOk("合成失败：\r\n\r\n#b需要#t4021012#：\t\t\t\t #r " + cm.itemQuantity(4021012) + " / 30 个\r\n#b需要#t4021010#： \t\t\t\t\t\t#r" + cm.itemQuantity(4021010) + " / 30 个\r\n#b需要#t4021011#： \t\t\t\t  #r" + cm.itemQuantity(4021011) + " / 30 个\r\n#b需要#t4000082#： \t\t\t\t  #r" + cm.itemQuantity(4000082) + " / 400 个\r\n#b需要#t4000124#：\t\t\t#r" + cm.itemQuantity(4000124) + " / 50 个\r\n#b需要#t4310015#：\t\t\t\t\t\t#r" + cm.itemQuantity(4310015) + " / 3 个\r\n#b需要#t4021019#：\t\t\t\t\t\t  #r" + cm.itemQuantity(4021019) + " / 1 个\r\n#b需要#t4033356#：\t\t\t\t\t   #r" + cm.itemQuantity(4033356) + " / 50 个\r\n#b需要#t4310030#： \t\t\t\t\t\t#r" + cm.itemQuantity(4310030) + " / 5000 个#k");
			cm.dispose();
				}
           }
      }
   }
 }