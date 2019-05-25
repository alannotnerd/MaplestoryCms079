var status = 0;
var typed=0;
//中介币的物品ID
var xhbid = 4310014; //雪花币
var zjbid = 4000463;//国庆纪念币
var zyhzid = 4033356;//正义火种1
var zfzbid = 4310036;//征服者币
var yzpid = 3800747; //一张牌自定义 余额
var xhbNum = java.lang.Math.floor(Math.random() + 500000);
var zjbNum = java.lang.Math.floor(Math.random() + 1000000);
var zyhzNum = java.lang.Math.floor(Math.random() + 100000);
var zfzbNum = java.lang.Math.floor(Math.random() + 200000);
var yzpNum = java.lang.Math.floor(Math.random() + 5000000);
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
			cm.sendSimple("亲爱的#r#h ##k您好，我是伤害上限突破系统:\r\n#r#L10#伤害上限突破简介#l\r\n\r\n#L1#[武器]充值余额突破 (#k目前状态：#r土豪推荐#b)#l\r\n#L2#[武器]雪花币突破 (#k目前状态：#r土豪推荐#b)#l\r\n#L3#[武器]中介币突破 (#k目前状态：#r推荐内容#b)#l\r\n#L4#[武器]正义火种突破 (#k目前状态：#r火爆内容#b)#l\r\n#L5#[武器]征服者币突破 (#k目前状态：#r火爆内容#b)#l");
		} else if (status == 1) {
			if (selection == 10) {
				cm.sendOk("\t我能够为你的武器增加武器攻击伤害上限以提升您的潜在输出能力。使用不同的道具对武器伤害上限提升的效果不同。\r\n    1.消耗#b50充值余额#k突破，每次可以为武器提升500W伤害。\r\n\t2.消耗100个#b#v4310014#雪花币#k突破，每次可以为武器提升50W的伤害。\r\n\t3.消耗50个#b#v4000463#中介币#k突破，每次可以为武器提升100W的伤害。\r\n\t4.消耗3个#b#v4033356#正义火种1#k突破，每次可以为武器提升10W的伤害。\r\n\t5.消耗400个#b#v4310036#征服者币#k突破，每次可以为武器提升20W的伤害。");
			} else {
				typed = selection;
				if (selection == 1) {
					cm.sendYesNo("是否花费#k50余额对当前穿戴的武器进行伤害上限突破？-[已经开放]");
				} else if (selection == 2) { 
					cm.sendYesNo("是否花费100个#b雪花币#k对当前穿戴的武器进行伤害上限突破？");
				} else if (selection == 3) {
					cm.sendYesNo("是否花费50个#b中介币#k对当前穿戴的武器进行伤害上限突破？");
				} else if (selection == 4) {
					cm.sendYesNo("是否花费30个#b正义火种1#k对当前穿戴的武器进行伤害上限突破？");
				} else if (selection == 5) {
					cm.sendYesNo("是否花费400个#b征服者币#k对当前穿戴的武器进行伤害上限突破？");
				}
			}
		} else if (status == 2 ) {
				selection = typed;
		    if (selection == 1 ) {
			    if (cm.getHyPay(1) > 49 ) {
						if (cm.changeLimitBreak(yzpNum)) {
						    cm.addHyPay(50,true);
								cm.sendOk("#b伤害上限突破成功.\r\n\r\n本次追加伤害为：#r"+ yzpNum +"#b.");
							cm.worldSpouseMessage(0x20,"[伤害突破] 玩家 "+ cm.getChar().getName() +" 使用 [ 50 ]余额 让武器伤害上限突破成功 本次追加 "+ yzpNum +" 伤害值 。");
						} else {
							cm.sendOk("#b突破失败.\r\n系统为检测到角色身上装备武器.");
						}
							cm.dispose();
						} else {
							cm.sendOk("#b突破失败.\r\n需要 50充值余额 才可以突破.");
							cm.dispose();
						}
			} else if (selection == 2) {
					if (cm.haveItem(4310014, 100)) {
						if (cm.changeLimitBreak(xhbNum)) {
							cm.gainItem(4310014, -100);
							cm.sendOk("#b伤害上限突破成功.\r\n\r\n本次追加伤害为：#r"+ xhbNum +"#b.");
							cm.worldSpouseMessage(0x20,"[伤害突破] 玩家 "+ cm.getChar().getName() +" 使用 雪花币 让武器伤害上限突破成功 本次追加 "+ xhbNum +" 伤害值 。");
						} else {
							cm.sendOk("#b突破失败.\r\n系统为检测到角色身上装备武器.");
						}
							cm.dispose();
						} else {
							cm.sendOk("#b突破失败.\r\n需要 100个 雪花币 才可以突破.");
							cm.dispose();
						}
			} else if (selection == 3) {
				if (cm.haveItem(4000463, 50)) {
					if (cm.changeLimitBreak(zjbNum)) {
						cm.gainItem(4000463, -50);
						cm.sendOk("#b伤害上限突破成功.\r\n\r\n本次追加伤害为：#r"+ zjbNum +"#b.");
							cm.worldSpouseMessage(0x20,"[伤害突破] 玩家 "+ cm.getChar().getName() +" 使用 中介币 让武器伤害上限突破成功 本次追加 "+ zjbNum +" 伤害值 。");
					} else {
						cm.sendOk("#b突破失败.\r\n系统为检测到角色身上装备武器.");
					}
					    cm.dispose();
				    } else {
					    cm.sendOk("#b突破失败.\r\n需要 50个 中介币 才可以突破.");
					    cm.dispose();
				}
			} else if (selection == 4) {
				if (cm.haveItem(4033356, 3)) {
					if (cm.changeLimitBreak(zyhzNum)) {
						cm.gainItem(4033356, -3);
						cm.sendOk("#b伤害上限突破成功.\r\n\r\n本次追加伤害为：#r"+ zyhzNum +"#b.");
							cm.worldSpouseMessage(0x20,"[伤害突破] 玩家 "+ cm.getChar().getName() +" 使用 正义火种 让武器伤害上限突破成功 本次追加 "+ zyhzNum +" 伤害值 。");
					} else {
						cm.sendOk("#b突破失败.\r\n系统为检测到角色身上装备武器.");
					}
					    cm.dispose();
				} else {
					    cm.sendOk("#b突破失败.\r\n需要 3个 正义火种1 才可以突破.");
					    cm.dispose();
				}
			} else if (selection == 5) {
				if (cm.haveItem(4310036, 400)) {
					if (cm.changeLimitBreak(zfzbNum)) {
						cm.gainItem(4310036, -400);
						cm.sendOk("#b伤害上限突破成功.\r\n\r\n本次追加伤害为：#r"+ zfzbNum +"#b.");
							cm.worldSpouseMessage(0x20,"[伤害突破] 玩家 "+ cm.getChar().getName() +" 使用 正义火种 让武器伤害上限突破成功 本次追加 "+ zfzbNum +" 伤害值 。");
					} else {
						cm.sendOk("#b突破失败.\r\n系统为检测到角色身上装备武器.");
					}
					    cm.dispose(); 
				} else {
					    cm.sendOk("#b突破失败.\r\n需要 400个 征服者币 才可以突破.");
					    cm.dispose();
				}
			}
		}
	}
}