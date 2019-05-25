var status = 0;
var minLevel = 180;
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
	if (cm.getPlayer().getClient().getChannel() == 1 || cm.getPlayer().getClient().getChannel() == 2 || cm.getPlayer().getClient().getChannel() == 3) {
        if (status == 0) {
            cm.sendSimple("- #e#d关在城里的冒险家#k#n:\r\n\r\n#b副本一共提供十二个关卡,每个关卡各有不同，有上楼，消灭怪物，找出口等等。完成后会解救出被绑架的NPC，同时疯狂点击该NPC会获得奖励。#k\r\n副本要求：\r\n#r1). 可在1,2,3线可挑战。\r\n2). 组队员等级必须要在" + minLevel + "级以上。\r\n3). 组队员必须要" + minPartySize + "人以上，" + maxPartySize + "人以下。\r\n\r\n#L0#[执行]拯救被困在城里的冒险家#l")
        } else if (status == 1) {
            if (selection == 0) {
                if (cm.getParty() == null) { // 没有组队
                    cm.sendOk("请组队后和我谈话。");
                    cm.dispose();
                } else if (!cm.isLeader()) { // 不是队长
                    cm.sendOk("队长必须在这里。请让他和我说话。");
                    cm.dispose();
				} else if (cm.getMap(921160100).getCharactersSize() || cm.getMap(921160200).getCharactersSize() || cm.getMap(921160300).getCharactersSize() || cm.getMap(921160310).getCharactersSize() || cm.getMap(921160320).getCharactersSize() || cm.getMap(921160330).getCharactersSize() || cm.getMap(921160340).getCharactersSize() || cm.getMap(921160350).getCharactersSize() || cm.getMap(921160400).getCharactersSize() || cm.getMap(921160500).getCharactersSize() || cm.getMap(921160600).getCharactersSize() || cm.getMap(921160700).getCharactersSize() > 0) {
					cm.sendOk("本次森林保卫战已经在进行中。请等待或者换线后尝试..");
					cm.dispose();
                    } else  {
		if (cm.getEventCount("解救1") < 1){
		//if (cm.checkPartyEventCount("海怪1")){
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
                        var em = cm.getEventManager("Prison");
                        if (em == null) {
                            cm.sendOk("此任务正在建设当中。");
                        } else {
                            var prop = em.getProperty("state");
                            if (prop.equals("0") || prop == null) {
                                em.startInstance(cm.getParty(), cm.getMap(), 198);
								cm.worldSpouseMessage(0x8, "[系统公告]　　玩家 " + cm.getChar().getName() + " 等级 " + cm.getChar().getLevel() + "　带队开始了逃脱任务!");
								cm.setPartyEventCount("解救1");
                                cm.dispose();
                                return;
                            } else {
                                cm.sendOk("任务里面已经有人了，请稍等！");
                            }
                        }
                        cm.dispose();
                    } else {
                        cm.sendOk("请确认你的组队员：\r\n\r\n#b1、组队员必须要" + minPartySize + "人以上，" + maxPartySize + "人以下。\r\n2、组队员等级必须要在" + minLevel + "级以上。\r\n\r\n（#r如果仍然错误, 重新下线,再登陆 或者请重新组队。#k#b）");
                        cm.dispose();
                    }
               // } else {
		//	cm.sendOk("请检查队伍中是否存在已完成次数#b队员#k。");
		//	cm.dispose();
		//	}
                } else {
			cm.sendOk("对不起，该帐号每天只能进入1次。\r\n");
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
        		cm.sendOk("只有在1,2,3频道才可以参加任务。");
	}
    }
}