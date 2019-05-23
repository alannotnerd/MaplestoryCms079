/*
 *	组队任务：冰骑士的诅咒
 */

var status = -1;
var minLevel = 30;

var minPartySize = 2;
var maxPartySize = 6;

function action(mode, type, selection) {
    if (mode == 1) {
        status++;
    } else {
        if (status == 0) {
            cm.dispose();
        }
        status--;
    }
    if (status == 0) {
        cm.sendSimple("#e<组队任务：冰骑士的诅咒>#n\r\n等等，嘘……！安静！小心别被冰骑士发现。中了他的诅咒的话，就会变成和我的朋友一样……我就单刀直入了。请你帮帮我的朋友，让他能够解开冰骑士的诅咒！！！\r\n#b#L0#我愿意帮助你的朋友。#l\r\n#L1#我想知道到底发生了什么事。#l\r\n#L2#我想拥有冰骑士的特殊物品。#l\r\n#L3#我想知道今天的剩余挑战次数。#l");
    } else if (status == 1) {
        if (selection == 0) {
            if (cm.getPlayer().getParty() == null || !cm.isLeader()) {
                cm.sendOk("你不是队长啊？让队长来和我说话。");
            } else {
                var party = cm.getPlayer().getParty().getMembers();
                var mapId = cm.getPlayer().getMapId();
                var next = true;
                var levelValid = 0;
                var inMap = 0;
                var it = party.iterator();
                while(it.hasNext()) {
                    var cPlayer = it.next();
                    var ccPlayer = cm.getPlayer().getMap().getCharacterById(cPlayer.getId());
                    if (ccPlayer != null && ccPlayer.getLevel() >= minLevel) {
                        levelValid += 1;
                    } else {
                        next = false;
                    }
                    if (ccPlayer != null && ccPlayer.getMapId() == mapId) {
                        inMap += (ccPlayer.isGM() ? 3 : 1);
                    }
                }
            	if (party.size() > maxPartySize || inMap < minPartySize) {
                	next = false;
            	}
            if (next) {
                var em = cm.getEventManager("Iceman");
                if (em == null) {
                    cm.sendOk("当前服务器未开启此功能，请稍后在试...");
                } else {
                    var prop = em.getProperty("state");
                    if (prop.equals("0") || prop == null) {
                        em.startInstance(cm.getPlayer().getParty(), cm.getPlayer().getMap(), 70);
                    } else {
                        cm.sendOk("当前频道已有玩家在进行任务中，请稍后在试。");
                    }
                }
            } else {
                cm.sendNextPrev("队员不够" + minPartySize + "人。这里非常危险。至少必须有" + minPartySize + "个" + minLevel + "级以上的队员，才能进去。");
            }
            }


            cm.dispose();
        } else if (selection == 1) {
            cm.sendNext("我一直以为我是大人，其他的孩子都很幼稚。阿俊总是跟着我，他是个听话的孩子。我们和往常一样玩捉迷藏，阿俊在抓我的时候，被我吓了一下。我觉得他很搞笑，就逗了他一下，但是……");
        } else if (selection == 2) {
            status = 2;
            cm.sendSimple("据说消灭冰骑士的话，可以获得#b#t4001529##k。用它可以加工成#i1032100:# #b#t1032100##k或#i1072510:#  #b#t1072510##k。 \r\n如果你能消灭冰骑士，解开诅咒，搜集到#t4001529#，我就帮你制作。\r\n#L0##i1032100:# #t1032100# - #t4001529#20个#l\r\n#L1##i1072510:# #t1072510# - #t4001529#10个#l");
        } else if (selection == 3) {
            cm.sendOk("今天剩余挑战次数是无数次。");
            cm.dispose();
        }
    } else if (status == 2) {
        cm.sendNextPrev("阿俊说想变得勇敢，想成为所有人认可的勇敢的人。但是他却被冰骑士骗了，变成了那副模样。请帮帮我的朋友阿俊！要是不快点把诅咒解开的话，阿俊可能会和冰骑士一样，失去人类的心。");
        cm.dispose();
    } else if (status == 3) {
        if (selection == 0) {
            if (!cm.canHold(1032100, 1)) {
                cm.sendOk("请确保背包有足够的空间.");
            } else if (cm.haveItem(4001529, 20)) {
                cm.gainItem(4001529, -20);
                cm.gainItem(1032100, 1);
            } else {
                cm.sendOk("你确定#b#t4001529##k的数量没错？你可别想骗我。");
            }
        } else if (selection == 1) {
            if (!cm.canHold(1072510, 1)) {
                cm.sendOk("请确保背包有足够的空间.");
            } else if (cm.haveItem(4001529, 10)) {
                cm.gainItem(4001530, -10);
                cm.gainItem(1072510, 1);
            } else {
                cm.sendOk("你确定#b#t4001529##k的数量没错？你可别想骗我。");
            }
        }
        cm.dispose();
    }
}