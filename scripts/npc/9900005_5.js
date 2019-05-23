var status = 0;
var minLevel = 230;
var maxLevel = 255;
var minPartySize = 1;
var maxPartySize = 6;

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
        if (mode == 1) status++;
        else status--;
	if (cm.getPlayer().getClient().getChannel() == 1 || cm.getPlayerCount(706041715) == 0) {
        if (status == 0) {
            cm.sendSimple("#r#e<★卧虎藏龙★>强力#n#k\r\n你想和队员们一起努力，完成任务吗？这里面必须要队员的反应能力，奖励形式-npc抽奖\r\n#d暴君防具箱子 冒险之心箱子 150武器箱子 贝勒首饰 祥龙卷轴 所有惊人卷轴（样式：#i2046996#） 星火箱子  #r ★150防具箱子★       #b请让所属组队的队长#k来和我说话。\r\n       #e#L0#我想挑战卧虎藏龙副本。#l\r\n       #L1#我想听一下说明。#l")
        } else if (status == 1) {
            if (selection == 0) {
                if (cm.getParty() == null) { // 没有组队
                    cm.sendOk("请组队后和我谈话。");
                    cm.dispose();
                } else if (!cm.isLeader()) { // 不是队长
                    cm.sendOk("队长必须在这里。请让他和我说话。");
                    cm.dispose();
                    } else  {
		if (cm.checkPartyEventCount("卧虎藏龙",1)){
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
                        var em = cm.getEventManager("Zwhcl");
                        if (em == null) {
                            cm.sendOk("此任务正在建设当中。");
                        } else {
                            var prop = em.getProperty("state");
                            if (prop.equals("0") || prop == null) {
				cm.setPartyEventCount("卧虎藏龙");
                                em.startInstance(cm.getParty(), cm.getMap(), 198);
								cm.worldSpouseMessage(0x20, "『挑战副本』 : 玩家 " + cm.getChar().getName() + " 带着冒险家进入了卧虎藏龙副本。");
								cm.worldSpouseMessage(0x20, "『挑战副本』 : 玩家 " + cm.getChar().getName() + " 带着冒险家进入了卧虎藏龙副本。");
								cm.worldSpouseMessage(0x20, "『挑战副本』 : 玩家 " + cm.getChar().getName() + " 带着冒险家进入了卧虎藏龙副本。");
								cm.worldSpouseMessage(0x20, "『挑战副本』 : 玩家 " + cm.getChar().getName() + " 带着冒险家进入了卧虎藏龙副本。");
                                cm.dispose();
                                return;
                            } else {
                                cm.sendOk("里面已经有人了，请稍等！");
                            }
                        }
                        cm.dispose();
                    } else {
                        cm.sendOk("请确认你的组队员：\r\n\r\n#b1、组队员必须要" + minPartySize + "人以上，" + maxPartySize + "人以下。\r\n2、组队员等级必须要在" + minLevel + "级以上。\r\n\r\n（#r如果仍然错误, 重新下线,再登陆 或者请重新组队。#k#b）");
                        cm.dispose();
                    }
                } else {
			cm.sendOk("对不起，该角色每天只能进入1次。");
			cm.dispose();
			}
		} //判断组队
            } else if (selection == 1) {
                cm.sendOk("请确认你的组队员：\r\n\r\n#b1、组队员必须要" + minPartySize + "人以上，" + maxPartySize + "人以下。\r\n2、组队员等级必须要在" + minLevel + "级以上。\r\n\r\n（#r如果仍然错误, 重新下线,再登陆 或者请重新组队。#k#b）");
                cm.dispose();
            }
        }
		 } else {
        		cm.dispose();
        		cm.sendOk("你进不去:\r\n#e#r1.#d你没有在1线.\r\n#r2.#d或里面正在有人挑战.");
	}
    }
}