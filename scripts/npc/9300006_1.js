 var status = 0;
var minLevel = 180;
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
            cm.sendSimple("#e#d<金猪保卫战>#n\r\n#k唉……最近有好多残暴的野猪来我的养猪场捣乱，你能帮我赶走它们吗？\r\n#b#L0#开始挑战#l\r\n#L1#副本介绍#l\r\n")
        } else if (status == 1) {
            if (selection == 0) {
				if (cm.getBossLog("保卫金猪")>=2) {
					cm.sendOk("您今日的次数已经使用完了，无法再进入副本。");
					cm.dispose();
				} else if (cm.getParty() == null) { // 没有组队
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
                        var em = cm.getEventManager("Yzc");
                        if (em == null) {
                            cm.sendOk("此任务正在建设当中。");
                        } else {
                            if (cm.getPlayerCount(866010454) == 0) {
                                em.startInstance(cm.getParty(), cm.getMap());
								cm.setBossLog("保卫金猪");
								cm.worldSpouseMessage(0x15, "『保卫金猪』：玩家 " + cm.getChar().getName() + " 受蒋老板之托，开始清扫野猪。");
                                cm.dispose();
                                return;
                            } else {
                                cm.sendOk("目前该频道已经有人在副本当中，请换个频道重新进入。");
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
                cm.sendOk("在金猪保卫战中，你需要消灭入侵的#b残暴野猪#k，保护#b金猪#k不受到伤害，如果你不小心打死了#b金猪#k则任务失败。在副本限定的#r10分钟#k内，消灭的野猪越多，奖励也会越多。");
                cm.dispose();
            } else if (selection == 2) {
                cm.warp(910000000, 0)
                cm.sendOk("难道你不想挑战一下自己吗？？")
                cm.dispose();
            }
        }
    }
}