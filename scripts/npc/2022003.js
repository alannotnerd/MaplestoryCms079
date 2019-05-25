/*
 *	组队任务：侏儒怪皇帝的复活
 */

var status = -1;
var minLevel = 120;

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
        cm.sendSimple("#e<组队任务：侏儒怪皇帝的复活>#n\r\n你来啦，#b#h0##k。你来找我有什么事吗？呵呵呵。#e#b\r\n#L0# 1.我想阻止侏儒怪皇帝莱格斯的复活。#l\r\n#L1# 2.我需要装万年冰河水的空瓶。#l\r\n#L2# 3.我想听听说明。#l\r\n#L3# 4.我想领取物品。#l");
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
                while (it.hasNext()) {
                    var cPlayer = it.next();
                    var ccPlayer = cm.getPlayer().getMap().getCharacterById(cPlayer.getId());
                    if (ccPlayer != null && ccPlayer.getLevel() >= minLevel) {
                        levelValid += 1;
                    } else {
                        next = false;
                    }
                    if (ccPlayer.getMapId() == mapId) {
                        inMap += (ccPlayer.isGM() ? 3 : 1);
                    }
                }
                if (party.size() > maxPartySize || inMap < minPartySize) {
                    next = false;
                }
                if (next) {
                    var em = cm.getEventManager("Rex");
                    if (em == null) {
                        cm.sendOk("当前服务器未开启次功能，请稍后在试...");
                    } else {
                        var prop = em.getProperty("state");
                        if (prop.equals("0") || prop == null) {
                            em.startInstance(cm.getPlayer().getParty(), cm.getPlayer().getMap(), 200);
                        } else {
                            cm.sendOk("Another party quest has already entered this channel.");
                        }
                    }
                } else {
                    cm.sendNext("你所属的组队人数在" + minPartySize + "人以下，没办法进去。必须有" + minLevel + "级以上的角色" + minPartySize + "个以上才能进去。请确认一下，然后再来找我。");
                }
            }
            cm.dispose();
        } else if (selection == 1) {
            cm.sendNext("是吗？你们要为我邪摩斯准备万年冰河水？真了不起。在护卫我的时候，如果我遇到了危险，一定要给我喝万年冰河水。如果我死了的话，你们所有的努力就会成为泡影，呵呵。");
        } else if (selection == 2) {
            cm.sendOk("侏儒怪皇帝#r#o9300281##k马上就要复活了。封印#r#o9300281##k的封印石的力量好像变弱了。看来只能到#r#o9300281##k封印着的#b#m921120500##k去阻止他复活了……需要的话，我可以把你带到那里。但是你必须保证我的安全。\r\n－#e限制时间#n：20分钟\r\n－#e参加人数#n：" + minPartySize + "～" + maxPartySize + "人\r\n");
            cm.dispose();
        } else if (selection == 3) {
            status = 2;
            cm.sendSimple("你想领取什么东西？#e#b\r\n#L0# 1.我想领取#t1032102#。#l\r\n#L1# 2.我想领取#t1032103#。#l\r\n#L2# 3.我想领取#t1032104#。#l\r\n#L3# 4.我想领取#t1902048#。");
        }
    } else if (status == 2) {
        if (cm.haveItem(4032649)) {
            cm.sendNextPrev("喂，你好像已经有#t4032649#了啊？用它来装水就行。不需要更多的瓶子，呵呵。");
        } else {
            cm.gainItem(4032649, 1);
        }
        cm.dispose();
    } else if (status == 3) {
        if (selection == 0) {
            if (!cm.canHold(1032102, 1)) {
                cm.sendOk("请确保背包有足够的空间.");
            } else if (cm.haveItem(4001530, 50) && cm.haveItem(1032077, 1)) {
                cm.gainItem(4001530, -50);
                cm.gainItem(1032077, -1);
                cm.gainItem(1032102, 1);
            } else {
                cm.sendNext("要想领取#b#t1032102##k，需要50个#b#t4001530##k和#b#t1032077##k。你快去搜集吧。");
            }
        } else if (selection == 1) {
            if (!cm.canHold(1032103, 1)) {
                cm.sendOk("请确保背包有足够的空间.");
            } else if (cm.haveItem(4001530, 50) && cm.haveItem(1032078, 1)) {
                cm.gainItem(4001530, -50);
                cm.gainItem(1032078, -1);
                cm.gainItem(1032103, 1);
            } else {
                cm.sendNext("要想领取#b#t1032103##k，需要50个#b#t4001530##k和#b#t1032078##k。你快去搜集吧。");
            }
        } else if (selection == 2) {
            if (!cm.canHold(1032104, 1)) {
                cm.sendOk("请确保背包有足够的空间.");
            } else if (cm.haveItem(4001530, 50) && cm.haveItem(1032079, 1)) {
                cm.gainItem(4001530, -50);
                cm.gainItem(1032079, -1);
                cm.gainItem(1032104, 1);
            } else {
                cm.sendNext("要想领取#b#t1032104##k，需要50个#b#t4001530##k和#b#t1032079##k。你快去搜集吧。");
            }
        } else if (selection == 3) {
            if (!cm.canHold(1902048, 1)) {
                cm.sendOk("请确保背包有足够的空间或者您已经领取过.");
            } else if (cm.haveItem(4001530, 300)) {
                cm.gainItem(4001530, -300);
                cm.gainItem(1902048, 1);
            } else {
                cm.sendNext("要想领取#t1902048#，需要300个#b#t4001530##k。你快去搜集吧。");
            }
        }
        cm.dispose();
    }
}