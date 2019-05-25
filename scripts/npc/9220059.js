 var status = 0;
var minLevel = 220;
var maxLevel = 255;
var minPartySize = 1;
var maxPartySize = 1;

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
            cm.sendSimple("#e<火爆任务：挑战可劳德>#n\r\n你想挑战我吗？我手里可有好多宝贝，如果你能够击败我，#e#b法弗纳、极真装备#n#k那都不是事儿……。\r\n\r\n#r1.该任务每天一次，无法重置\r\n2.该任务需消耗5000点券\r\n#b#L0#我想执行组队任务。#l\r\n#L2##r我要兑换法弗纳武器箱。#b#l\r\n#L1#我想听一下说明。#l")
        } else if (status == 1) {
            if (selection == 0) {
                if (cm.getParty() == null) { // 没有组队
                    cm.sendOk("请组队后和我谈话。");
                    cm.dispose();
                } else if (!cm.isLeader()) { // 不是队长
                    cm.sendOk("请叫队长和我谈话。");
                    cm.dispose();
                } else {
                    var party = cm.getParty().getMembers();
                    var mapId = cm.getPlayer().getMapId();
                    var next = true;
                    var levelValid = 0;
                    var inMap = 0;
                    var it = party.iterator();
                    while (it.hasNext()) {
                        var cPlayer = it.next();
                        if ((cPlayer.getLevel() >= minLevel) && (cPlayer.getLevel() <= maxLevel)) {
                            levelValid += 1;
                        } else {
                            next = false;
                        }
                        if (cPlayer.getMapid() == mapId) {
                            inMap += 1;
                        }
                    }
                    if (party.size() < minPartySize || party.size() > maxPartySize || inMap < minPartySize) {
                        next = false;
                    }
                    if (next) {
                        var em = cm.getEventManager("Zkld");
                        //cm.worldMessage(cm.getChar().getName() + "   带领他的队伍进入了玩具城101副本挑战任务.想去的快去组织队伍吧！");
                        if (em == null) {
                            cm.sendOk("此任务正在建设当中。");
                        } else {
							if (cm.getPlayer().getCSPoints(1)<=5000 && !cm.haveItem(4032521, 1)) {
								cm.sendOk("你好像没有5000点券或者VIP邀请券，无法进入战场");
								cm.dispose();
								return;
							}
							if (cm.getBossLog("克劳德")>=5) {
								cm.sendOk("你今天已经不能再挑战了。");
								cm.dispose();
								return;
							}
                            if (cm.getPlayerCount(861000000) == 0) {
								//cm.setBossLog("克劳德");
                                em.startInstance(cm.getParty(), cm.getMap());
                                cm.dispose();
                                return;
                            } else {
                                cm.sendOk("目前该频道已经有人在挑战，请换个频道重新进入。");
                                cm.dispose();
                            }
                        }
                        cm.dispose();
                    } else {
                        cm.sendOk("请确认你的组队员：\r\n\r\n#b1、组队员必须要" + minPartySize + "人以上，" + maxPartySize + "人以下。\r\n2、组队员等级必须要在" + minLevel + "级以上。\r\n\r\n（#r如果仍然错误, 重新下线,再登陆 或者请重新组队。#k#b）");
                        cm.dispose();
                    }
                } //判断组队
            } else if (selection == 1) {
                cm.sendOk("击败克劳德后，可找彬博士领取#b神奇魔方、高级神奇魔方、大师附加神奇魔方、征服币以及#e#r法弗纳武器箱子兑换币#n#k等等，并且你还有几率获得#r稀有椅子、极真系列装备、法弗纳武器#k\r\n执行任务的条件：\r\n\r\n#b1、组队员必须要" + minPartySize + "人以上，" + maxPartySize + "人以下。\r\n2、组队员等级必须要在" + minLevel + "级以上。\r\n3、执行副本需要交纳5000点券\r\n4、副本每天一次，\r\n\r\n（#r如果仍然错误, 重新下线,再登陆 或者请重新组队。#k#b）");
                cm.dispose();
			} else if (selection == 2) {
                cm.sendYesNo("兑换法弗纳需要集齐#r#e40#k#n个#r#v4310003##t4310003##k，是否进行兑换？");
            }
        } else if (status == 2) {
			if (cm.haveItem(4310003, 40)) {
				if (cm.getSpace(2)<1) {
					cm.sendOk("你的消耗栏满了，请至少留出一个位置");
					cm.dispose();
					return;
				}
				cm.gainItem(2431938, 1);
				cm.gainItem(4310003, -40);
				cm.sendOk("恭喜您兑换成功！请到普通等级管理员处进行装备制作！");
				cm.channelMessage(0x20, "『系统公告』" + " : " + "恭喜玩家【" + cm.getChar().getName() + "】成功在克劳德处兑换了法弗纳武器箱一个。");
			} else {
				cm.sendOk("你好像没有那么多#r#v4310003##t4310003##k");
			}
			cm.dispose();
		}
    }
}
