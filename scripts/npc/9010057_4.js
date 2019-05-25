/*
	名称：运营员
	内容：快速转职
*/

var head = "#fUI/UIWindow2.img/Quest/quest_info/summary_icon/summary#\r\n";

var status = -1;
var jobData = new Array(
        Array("战士", 100, 999),
        Array("剑客", 110, 999),
        Array("勇士", 111, 999),
        Array("英雄", 112, 999),
        Array("准骑士", 120, 999),
        Array("骑士", 121, 999),
        Array("圣骑士", 122, 999),
        Array("枪战士", 130, 999),
        Array("龙骑士", 131, 999),
        Array("黑骑士", 132, 999),
        Array("魔法师", 200, 999),
        Array("火毒法师", 210, 999),
        Array("火毒巫师", 211, 999),
        Array("火毒魔导士", 212, 999),
        Array("冰雷法师", 220, 999),
        Array("冰雷巫师", 221, 999),
        Array("冰雷魔导士", 222, 999),
        Array("牧师", 230, 999),
        Array("祭司", 231, 999),
        Array("主教", 232, 999),
        Array("弓箭手", 300, 999),
        Array("猎人", 310, 999),
        Array("射手", 311, 999),
        Array("神射手", 312, 999),
        Array("弩弓手", 320, 999),
        Array("游侠", 321, 999),
        Array("箭神", 322, 999),
        Array("飞侠", 400, 999),
        Array("刺客", 410, 999),
        Array("无影人", 411, 999),
        Array("隐士", 412, 999),
        Array("侠客", 420, 999),
        Array("独行客", 421, 999),
        Array("侠盗", 422, 999),
        Array("海盗", 500, 999),
        Array("拳手", 510, 999),
        Array("斗士", 511, 999),
        Array("冲锋队长", 512, 999),
        Array("火枪手", 520, 999),
        Array("大副", 521, 999),
        Array("船长", 522, 999),
        Array("魂骑士（一转）", 1100, 9),
        Array("魂骑士（二转）", 1110, 9),
        Array("魂骑士（三转）", 1111, 9),
        Array("魂骑士（四转）", 1112, 9),
        Array("炎术士（一转）", 1200, 9),
        Array("炎术士（二转）", 1210, 9),
        Array("炎术士（三转）", 1211, 9),
        Array("炎术士（四转）", 1212, 9),
        Array("风灵使者（一转）", 1300, 9),
        Array("风灵使者（二转）", 1310, 9),
        Array("风灵使者（三转）", 1311, 9),
        Array("风灵使者（四转）", 1312, 9),
        Array("夜行者（一转）", 1400, 9),
        Array("夜行者（二转）", 1410, 9),
        Array("夜行者（三转）", 1411, 9),
        Array("夜行者（四转）", 1412, 9),
        Array("奇袭者（一转）", 1500, 9),
        Array("奇袭者（二转）", 1510, 9),
        Array("奇袭者（三转）", 1511, 9),
        Array("奇袭者（四转）", 1512, 9),
        Array("战神（一转）", 2100, 0),
        Array("战神（二转）", 2110, 0),
        Array("战神（三转）", 2111, 0),
        Array("战神（四转）", 2112, 0),
		Array("海盗（炮手）", 501, 0),
		Array("火炮手（二转）", 530, 0),
		Array("毁灭炮手（三转）", 531, 0),
		Array("神炮王（究极打炮能手）", 532, 0),
        Array("双弩精灵（一转）", 2300, 1),
        Array("双弩精灵（二转）", 2310, 1),
        Array("双弩精灵（三转）", 2311, 1),
        Array("双弩精灵（四转）", 2312, 1),
        Array("幻影（一转）", 2400, 2),
        Array("幻影（二转）", 2410, 2),
        Array("幻影（三转）", 2411, 2),
        Array("幻影（四转）", 2412, 2),
        Array("夜光法师（一转）", 2700, 3),
        Array("夜光法师（二转）", 2710, 3),
        Array("夜光法师（三转）", 2711, 3),
        Array("夜光法师（四转）", 2712, 3),
        Array("恶魔猎手（一转）", 3100, 4),
        Array("恶魔猎手（二转）", 3110, 4),
        Array("恶魔猎手（三转）", 3111, 4),
        Array("恶魔猎手（四转）", 3112, 4),
        Array("恶魔复仇者（初级）", 3101, 0),
        Array("恶魔复仇者（中级）", 3120, 0),
        Array("恶魔复仇者（高级）", 3121, 0),
        Array("恶魔复仇者（究级）", 3122, 0),
        Array("唤灵法师（一转）", 3200, 999),
        Array("唤灵法师（二转）", 3210, 999),
        Array("唤灵法师（三转）", 3211, 999),
        Array("唤灵法师（四转）", 3212, 999),
        Array("豹弩游侠（一转）", 3300, 999),
        Array("豹弩游侠（二转）", 3310, 999),
        Array("豹弩游侠（三转）", 3311, 999),
        Array("豹弩游侠（四转）", 3312, 999),
        Array("机械师（一转）", 3500, 999),
        Array("机械师（二转）", 3510, 999),
        Array("机械师（三转）", 3511, 999),
        Array("机械师（四转）", 3512, 999),
        Array("尖兵（一转）", 3600, 5),
        Array("尖兵（二转）", 3610, 5),
        Array("尖兵（三转）", 3611, 5),
        Array("尖兵（四转）", 3612, 5),
        Array("米哈尔（一转）", 5100, 6),
        Array("米哈尔（二转）", 5110, 6),
        Array("米哈尔（三转）", 5111, 6),
        Array("米哈尔（四转）", 5112, 6),
        Array("狂龙战士（一转）", 6100, 7),
        Array("狂龙战士（二转）", 6110, 7),
        Array("狂龙战士（三转）", 6111, 7),
        Array("狂龙战士（四转）", 6112, 7),
        Array("爆莉萌天使（一转）", 6500, 8),
        Array("爆莉萌天使（二转）", 6510, 8),
        Array("爆莉萌天使（三转）", 6511, 8),
        Array("爆莉萌天使（四转）", 6512, 8),
		Array("龙的传人（一转）", 508, 0),
		Array("龙的传人（二转）", 570, 0),
		Array("龙的传人（三转）", 571, 0),
		Array("龙的传人（四转）", 572, 0),
		Array("隐月（一转）", 2500, 0),
		Array("隐月（二转）", 2510, 0),
		Array("隐月（三转）", 2511, 0),
		Array("隐月（四转）", 2512, 0)
        ); //比较规范的职业ID统一在这个脚本里面转职
var noAdvance = head + "对不起，现在你不能转职。你的等级必须在 ";
var advance = head + "#r - 小助手主页 >> 转职功能 #k\r\n\r\n你好哦，我这里可以提供快速转职哦~";
var unable = head + "好像你已经通过了全部的转职了，你的冒险生活怎么样？如果遇到不开心的事，笑笑就过了。以后还有很多事情等着你去面对。";
var noThanks = "\r\n\r\n#L1#谢谢，但是我现在暂时不想转职。#l";
var check = "你确定你想成为一个 ";
var congrats = "你想成为一个 ";
var first;
var newJobName;
var newJob;

function start () {
	status = -1;
	action(1, 0, 0);
}


function action (mode, type, selection) {
	if (mode == -1) {
		cm.dispose();
		return;
	}

	if (mode == 1) {
		status++;
	} else {
		status--;
	}

	if (status == -1) {
		cm.dispose();
		return;
	}

	if (cm.getPlayer().getSubcategory() == 1) {
		sdchangejob();
		return;
	} else if (cm.getPlayer().getSubcategory() == 2) {
		hpchangejob();
		return;
	} else if (cm.getPlayer().getSubcategory() == 10) {
		lrchangejob();
		return;
	}

	if (cm.haveItem(2431305)) { // 如果有火光武器箱，那么提示玩家使用后才能转职
		cm.sendOk("#r您还有上次转职未使用的火光武器箱，请使用后再转职。");
		cm.dispose();
		return;
	}

	if (status == 0) {
		if (cm.getJob() % 100 == 0) {
			noAdvance += cm.getJob() % 1000 == 0 ? "10级以上" : "30级以上";
		} else {
			noAdvance += cm.getJob() % 10 == 0 ? "60级以上" : "100级以上";
			noAdvance += " 才能转职，你现在的等级为 " + cm.getPlayerStat("LVL") + " 级。";
		}
		if (cm.getJob() % 10 == 2 && cm.getJob() != 2002 && cm.getJob() != 3002) {//四转不允许转职
			cm.sendOk(unable);
			cm.dispose();
			return;
		} else {
			if (cm.getJob() % 1000 == 0 || cm.getJob() == 0 || cm.getJob() == 3000 || cm.getJob() == 2002 || cm.getJob() == 2003 || cm.getJob() == 2004 || cm.getJob() == 2005 || cm.getJob() == 2000 || cm.getJob() == 6001 || cm.getJob() == 3001 || cm.getJob() == 3002) {
				if (cm.getPlayerStat("LVL") == 8 || cm.getPlayerStat("LVL") == 9) {//如果是法师
					for (var i = 0; i < jobData.length; i++)
						if (jobData[i][1] == (200 + cm.getJob()))
							advance += "\r\n#b#L" + jobData[i][1] + "#" + jobData[i][0] + "#l";
				} else if (cm.getPlayerStat("LVL") >= 10) {//其他职业
					if (cm.getJob() == 2000) {
						advance += "\r\n#b#L" + 2100 + "# 战神（一转）#l";
					} else if (cm.getJob() == 2002) {
						advance += "\r\n#b#L" + 2300 + "# 双弩精灵（一转）#l";
					} else if (cm.getJob() == 2003) {
						advance += "\r\n#b#L" + 2400 + "# 幻影（一转）#l";
					} else if (cm.getJob() == 2004) {
						advance += "\r\n#b#L" + 2700 + "# 夜光法师（一转）#l";
					} else if (cm.getJob() == 2005) {
						advance += "\r\n#b#L" + 2500 + "# 隐月（一转）#l";
					} else if (cm.getJob() == 3002) {
						advance += "\r\n#b#L" + 3600 + "# 尖兵（一转）#l";
					} else if (cm.getJob() == 6000) {
						advance += "\r\n#b#L" + 6100 + "# 狂龙战士（一转）#l";
					} else if (cm.getJob() == 6001) {
						advance += "\r\n#b#L" + 6500 + "# 爆莉萌天使（一转）#l";
					} else if (cm.getJob() == 3001) {
						advance += "\r\n#b#L" + 3100 + "# 恶魔猎手（一转）#l";
						advance += "\r\n#b#L" + 3101 + "# 恶魔复仇者（一转）#l";
					} else {
						for (var i = 0; i < jobData.length; i++) {
							if ((jobData[i][1] % 100 == 0) && (jobData[i][1] > cm.getJob()) && (jobData[i][1] < (600 + cm.getJob()))) {
								advance += "\r\n#b#L" + jobData[i][1] + "#" + jobData[i][0] + "#l";
							} else if (cm.getJob() == 0 & jobData[i][1] % 100 == 0 && (jobData[i][1] > cm.getJob()) && (jobData[i][1] < (600 + cm.getJob()))) {
								advance += "\r\n#b#L" + jobData[i][1] + "#" + jobData[i][0] + "#l";
							}
						}
					}
				} else {
					cm.sendOk(noAdvance);
					cm.dispose();
					return;
				}
				first = true;
			} else if (cm.getJob() % 100 == 0 || cm.getJob() == 3101) { //第二次转职
				if (cm.getPlayerStat("LVL") >= 30) {
					if (cm.getJob() == 3101) {
						advance += "\r\n#b#L" + 3120 + "# 恶魔复仇者（中级）#l";
					} else {
						for (var i = 0; i < jobData.length; i++)
							if (((jobData[i][1] % 10 == 0 && jobData[i][1] % 100 != 0)) && (jobData[i][1] > cm.getJob() && jobData[i][1] <= (cm.getJob() + 30)))
								advance += "\r\n#b#L" + jobData[i][1] + "#" + jobData[i][0] + "#l";
					}
				} else {
					cm.sendOk(noAdvance);
					cm.dispose();
					return;
				}
			} else if (cm.getJob() % 10 == 0 || cm.getJob() % 10 == 1 || cm.getJob() == 3120 || cm.getJob() == 3121) { // 第三次\4次转职
				if (cm.getPlayerStat("LVL") >= (cm.getJob() % 10 == 1 ? 100 : 60)) {
					for (var i = 0; i < jobData.length; i++)
						if (jobData[i][1] - 1 == cm.getJob())
							advance += "\r\n#b#L" + jobData[i][1] + "#" + jobData[i][0] + "#l";
				} else {
					cm.sendOk(noAdvance);
					cm.dispose();
					return;
				}
			} else {
				cm.sendOk(unable);
				cm.dispose();
				return;
			}
			advance += noThanks;
			cm.sendSimple(advance);
		}
	} else if (status == 1) {
		if (selection == 1) {
			cm.sendOk("你现在不想转职吗？那好吧。等你想要转职可以来找我，我时时刻刻在这里。");
			cm.dispose();
		} else {
			if (cm.getSpace(2) >= 1) {
				newJob = selection;
				for (var i = 0; i < jobData.length; i++) {
					if (jobData[i][1] == newJob) {
						newnewJobName = jobData[i][0];
					}
				}
				cm.sendNext("你确定想好要成为一个 #b" + newnewJobName + "#k 吗？\r\n\r\n#r - 战神转职、四转转职、暗影双刀转职，因为有学习技能操作，可能会延迟2~3秒，请不要关闭对话框。造成的技能异常不能恢复。\r\n\r\n#r - 转职后，会赠送道具。请确认你的道具栏每格都有2个以上的空格。如果转职后因背包格数不足而领取不到道具，不能恢复。")
			} else {
				cm.sendNext("继续转职的话，请让装备栏和消耗栏各腾出两个格子。")
				cm.dispose();
			}
		}//selection
	} else if (status == 2) {
		cm.changeJob(newJob);
		cm.gainItem(2431305, 1); //火光武器箱 根据角色情况而赠送道具
		cm.playerMessage(-1, "赠送给你 >>> 火光武器箱 一个，可以根据你的角色等级获取相应的道具！")
//		if (first) {
//			cm.resetAp();
//		}//如果是一转，重置AP
		switch (newJob) {
			case 2700:
				equip(1352400); // Lv10 - 闪电宝珠(无描述)
				break;
			case 2710:
				equip(1352401); // Lv30 - 耀眼宝珠(无描述)
				break;
			case 2711:
				equip(1352402); // Lv60 - 闪耀宝珠(无描述)
				break;
			case 2712:
				equip(1352403); // Lv100 - 命运宝珠(无描述)
				break;
			case 6100:
				equip(1352500); // Lv10 - 诺巴精髓(无描述)
				break;
			case 6110:
				equip(1352501); // Lv30 - 守护之诺巴精髓(无描述)
				break;
			case 6111:
				equip(1352502); // Lv60 - 正义之诺巴精髓(无描述)
				break;
			case 6112:
				equip(1352503); // Lv100 - 真理之诺巴精髓(无描述)
				break;
			case 6500:
				equip(1352601); // Lv10 - 粉色灵魂手镯(无描述)
				break;
			case 6510:
				equip(1352602); // Lv30 - 紫色灵魂手镯(无描述)
				break;
			case 6511:
				equip(1352603); // Lv60 - 蓝色灵魂手镯(无描述)
				break;
			case 6512:
				equip(1352604); // Lv100 - 绿色灵魂手镯(无描述)
				break;
			case 3300:
			case 3310:
			case 3311:
			case 3312: {
				if (!cm.hasSkill(30001061)) {
					cm.teachSkill(30001061, 1);
				}
				if (!cm.hasSkill(30001062)) {
					cm.teachSkill(30001062, 1);
				}
				break;
			}

		}
		cm.sendOk("经过小助手的辛苦培养。从现在开始你已经是#b" + newnewJobName + "#k了！\r\n赠送给你#b火光武器箱#k一个，可以根据你的角色等级获取相应的道具！");
		cm.dispose();
	}
}

function equip(itemId) {
    cm.gainItemAndEquip(itemId, -10);
}

function sdchangejob() {
	if (status == 0) {
		if (cm.getJob() == 434) {//已经转职完毕
			cm.sendOk("双刀的生活怎么样？如果生活遇到困难笑一笑就过了，没有什么的。")
			cm.dispose();
		} else if (cm.getJob() == 0 && cm.getPlayerStat("LVL") >= 10) {//第一次转职
			newJob = 400;
			newJobName = "飞侠（双刀）";
		} else if (cm.getJob() == 400 && cm.getPlayerStat("LVL") >= 20) {//第二次转职
			newJob = 430;
			newJobName = "见习刀客";
		} else if (cm.getJob() == 430 && cm.getPlayerStat("LVL") >= 30) {//第三次转职
			newJob = 431;
			newJobName = "双刀客";
		} else if (cm.getJob() == 431 && cm.getPlayerStat("LVL") >= 45) {//第四次转职
			newJob = 432;
			newJobName = "双刀侠";
		} else if (cm.getJob() == 432 && cm.getPlayerStat("LVL") >= 60) {//第五次转职
			newJob = 433;
			newJobName = "血刀";
		} else if (cm.getJob() == 433 && cm.getPlayerStat("LVL") >= 100) {//第六次转职
			newJob = 434;
			newJobName = "暗影双刀";
		} else {
			cm.sendOk("你现在还不符合条件哦，暗影双刀的转职等级是：#r\r\n10>>20>>30>>45>>60>>100!")
			cm.dispose();
		}
		cm.sendNext("你确定你想成为一个#b" + newJobName + "#k吗？");
	} else if (status == 1) {
//		if (newJob == 400) {
//			cm.resetAp();
//		}
		cm.changeJob(newJob);
		cm.gainItem(2431305, 1); //火光武器箱 根据角色情况而赠送道具
		cm.playerMessage(-1, "赠送给你 >>> 火光武器箱 一个，可以根据你的角色等级获取相应的道具！")
		cm.sendOk("已经成功转职成了#b" + newJobName + "#k")
		cm.dispose();
	}
}

function hpchangejob() {
	if (status == 0) {
		if (cm.getJob() == 532) {
			cm.sendOk("火炮手的生活怎么样？如果生活遇到困难笑一笑就过了，没有什么的。");
			cm.dispose();
		} else if (cm.getJob() == 0 && cm.getPlayerStat("LVL") >= 10) {
			newJob = 501;
			newJobName = "海盗（炮手）";
		} else if (cm.getJob() == 501 && cm.getPlayerStat("LVL") >= 30) {
			newJob = 530;
			newJobName = "火炮手（二转）";
		} else if (cm.getJob() == 530 && cm.getPlayerStat("LVL") >= 60) {
			newJob = 531;
			newJobName = "毁灭炮手（三转）";
		} else if (cm.getJob() == 531 && cm.getPlayerStat("LVL") >= 100) {
			newJob = 532;
			newJobName = "神炮王（究极打炮能手）";
		}
		cm.sendNext("你确定你想成为一个#b" + newJobName + "#k吗？");
	} else if (status == 1) {
//		if (newJob == 501) {
//			cm.resetAp();
//		}
		cm.changeJob(newJob);
		cm.gainItem(2431305, 1); //火光武器箱 根据角色情况而赠送道具
		cm.playerMessage(-1, "赠送给你 >>> 火光武器箱 一个，可以根据你的角色等级获取相应的道具！")
		cm.sendOk("已经成功转职成了#b" + newJobName + "#k")
		cm.dispose();
	}
}

function lrchangejob() {
	if (status == 0) {
		if (cm.getJob() == 572) {
			cm.sendOk("龙的传人怎么样？如果生活遇到困难笑一笑就过了，没有什么的。");
			cm.dispose();
		} else if (cm.getJob() == 0 && cm.getPlayerStat("LVL") >= 10) {
			newJob = 508;
			newJobName = "龙的传人（一转）";
		} else if (cm.getJob() == 508 && cm.getPlayerStat("LVL") >= 30) {
			newJob = 570;
			newJobName = "龙的传人（二转）";
		} else if (cm.getJob() == 570 && cm.getPlayerStat("LVL") >= 60) {
			newJob = 571;
			newJobName = "龙的传人（三转）";
		} else if (cm.getJob() == 571 && cm.getPlayerStat("LVL") >= 100) {
			newJob = 572;
			newJobName = "龙的传人（四转）";
		}
		cm.sendNext("你确定你想成为一个#b" + newJobName + "#k吗？");
	} else if (status == 1) {
//		if (newJob == 508) {
//			cm.resetAp();
//		}
		cm.changeJob(newJob);
		cm.gainItem(2431305, 1); //火光武器箱 根据角色情况而赠送道具
		cm.playerMessage(-1, "赠送给你 >>> 火光武器箱 一个，可以根据你的角色等级获取相应的道具！")
		cm.sendOk("已经成功转职成了#b" + newJobName + "#k")
		cm.dispose();
	}
}