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
			cm.sendSimple("#e#d<迷之幻域>#n\r\n#k一梦千年，不甚唏嘘……\r\n#b#L0#我想进入副本。#l\r\n#L1#我想听一下说明。#l\r\n#L2#我想离开这里。")
        } else if (status == 1) {
            if (selection == 0) {
				if (cm.getBossLog("迷之幻域")>=1) {
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
                        var em = cm.getEventManager("Mzhy");
                       
                        if (em == null) {
                            cm.sendOk("此任务正在建设当中。");
                        } else {
                            if (cm.getPlayerCount(931050410) == 0) {
                                em.startInstance(cm.getParty(), cm.getMap());
								 cm.worldSpouseMessage(0x15, "『迷之幻域』：玩家 " + cm.getChar().getName() + " 一阵眩晕，进入了幻境世界。");
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
                cm.sendOk("请确认你的组队员：\r\n\r\n#b1、组队员必须要" + minPartySize + "人以上，" + maxPartySize + "人以下。\r\n2、组队员等级必须要在" + minLevel + "级以上。\r\n\r\n（#r如果仍然错误, 重新下线,再登陆 或者请重新组队。#k#b）");
                cm.dispose();
            } else if (selection == 2) {
                cm.warp(910000000, 0)
                cm.sendOk("难道你不想挑战一下自己吗？？")
                cm.dispose();
            }
        }
    }
}