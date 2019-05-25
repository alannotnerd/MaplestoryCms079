var status = 0;
var minLevel = 45;
var maxLevel = 255;
var minPartySize = 1;
var maxPartySize = 1;
var maxPlay = 5;

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
            cm.sendSimple("#e<挑战任务：阿里安特竞技场>#n\r\n在进入就是阿里安特的竞技场了，你想挑战自己吗？如果你想挑战的话请选出你们的队长，然后和我谈话……。\r\n\r\n每天可完成#r"+maxPlay+"#k次，您今天已经参与了#r"+cm.getBossLog("阿里安特竞技场")+"次#k\r\n#b#L0#我想执行组队任务。#l\r\n#L1#我想听一下说明。#l")
        } else if (status == 1) {
            if (selection == 0) {
				if (cm.getBossLog("阿里安特竞技场") >= maxPlay) {
					cm.sendOk("今天你已经参与了"+maxPlay+"次，不能再参与该副本了！请明天赶早~");
					return;
				}
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
                        var em = cm.getEventManager("AliantSystem");
                        if (em == null) {
                            cm.sendOk("此任务正在建设当中。");
                        } else {
                            if (cm.getPlayerCount(980010101) == 0) {
                                em.startInstance(cm.getParty(), cm.getMap());
                                cm.worldMessage("[组队任务] " + cm.getChar().getName() + "  带领着他的队伍进入了阿里安特竞技场！");
                                cm.setBossLog("阿里安特竞技场");
								cm.dispose();
                                return;
                            } else {
                                cm.sendOk("目前该频道已经有人在竞技场，请换个频道重新进入。");
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