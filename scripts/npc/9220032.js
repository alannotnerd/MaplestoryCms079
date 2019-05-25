/*
 脚本功能：天空庭院相关
 */

var a = 0;
var need;
var can = true;
var itemid;
var item = Array(
        Array(1003423, 500),
        Array(1102360, 500),
        Array(1042233, 500),
        Array(1082414, 500),
        Array(1062149, 500),
        Array(1072638, 500),
        Array(1003424, 700),
        Array(1102361, 700),
        Array(1042234, 700),
        Array(1082415, 700),
        Array(1062150, 700),
        Array(1072639, 700), //三叶草系列套装
        Array(3010412, 7200),
        Array(3010415, 7200),
        Array(3010504, 7200),
        Array(1102382, 8800),
        Array(1102383, 8800),
        Array(1142524, 12000),
        Array(1102476, 14000),
        Array(1102477, 14000),
        Array(1102478, 14000),
        Array(1102479, 14000),
        Array(1102480, 14000)
        )

function start() {
    a = -1;
    action(1, 0, 0);
}

function action(mode, type, selection) {
    if (mode == -1) {
        cm.dispose();
    }
    else {
        if (mode == 1)
            a++;
        else
            a--;
        if (a == -1) {
            cm.dispose();
        } else if (a == 0) {
            if (cm.getMap().getId() == 706020000) {
                a = 10;
                cm.sendSimple("为了报答你帮我清理提诺,我会送给你几个四叶草幸运币.#b\r\n#L0# 领取四叶草幸运币（请在60秒内领取，不然会被T下线！）.")
            } else if (cm.getMap().getId() == 706020100) {//天空庭院入口
                cm.sendSimple("你好!欢迎来到天空庭院!你想要做什么?#b\r\n#L0# 我想知道天空庭院是干吗的?#l\r\n#L1# 我想用四叶草幸运币对换道具.\r\n#L2# #e#r进入天空庭院。#b#n")
            } else {
                a = 5;
                cm.sendNext("你好!我是利弗里。那些发疯的提诺真的要把我美丽的花园给毁了!请马上来天空庭院帮助我!!")
            }
        } else if (a == 1) {
            if (selection == 0) {
                cm.sendNext("天空庭院是我美丽的花园,但是可恶的提诺却要把我的花园给毁了!")
            } else if (selection == 1) {
                var text = "请问你想要对换什么物品?\r\n#b"
                for (var i = 0; i < item.length; i++) {
                    text += "#L" + i + "#  #i4032056# x " + item[i][1] + " :  #b#i" + item[i][0] + "##z" + item[i][0] + "##k#b\r\n"
                }
                a = 7;
                cm.sendSimple(text);
            } else if (selection == 2) {//进入天空庭院
                a = 9;
                cm.sendYesNo("你确定了吗？现在就进入天空庭院？\r\n今天已经进入天空庭院" + cm.getBossLog('天空庭院') + "次。")
            }//selection
        } else if (a == 2) {
            cm.sendNext("花园里面有很多好玩的东西,进入后有10分钟的限制,请帮忙我把提诺消灭.消灭的途中,我会在庭院中放置一个宝物箱,你只要用普通攻击攻击宝物箱,就能获取到里面的道具了!这是我给你的报酬!")
        } else if (a == 3) {
            cm.sendNext("宝箱内的四叶草幸运币可以跟我对换很多好玩的东西，等下你可以重新和我对话，选择第二个选项就可以看到可以对换什么物品了！")
        } else if (a == 4) {
            cm.sendNext("不过，需要注意的是。天空庭院因为被提诺施了魔法，所以一天最多只能进入5次。")
        } else if (a == 5) {
            a = -1;
            cm.sendNext(" 介绍就到这里了，如果有什么不懂的。再重新和我对话。")
        } else if (a == 6) {
            cm.sendNext("请马上过来吧,这里还有一些关于天空庭院的介绍,你来了之后我再告诉你!")
        } else if (a == 7) {
            cm.saveLocation("WORLDTOUR");
            cm.warp(706020100, 0);
            cm.dispose();
        } else if (a == 8) {
            itemid = item[selection][0];
            need = item[selection][1];
            cm.sendNext("你目前现在有" + cm.itemQuantity(4032056) + "个#t4032056#。\r\n你确定用" + need + "个#t4032056#对换1个#t" + itemid + "#吗？")
        } else if (a == 9) {
            for (var i = 1; i < 5; i++) {
                if (cm.getSpace(i) < 1) {
                    can = false;
                }
            }
            if (can) {
                if (cm.haveItem(4032056, need)) {
                    cm.gainItem(4032056, -need);
                    cm.gainItem(itemid, 1)
                    cm.sendOk("好了，对换成功了。看看你喜欢不喜欢这个道具呢？")
                } else {
                    cm.sendOk("你好像没有足够的#t4032056#。")
                }
                cm.dispose();
            } else {
                cm.sendOk("请让所有的背包栏腾出一个空格。")
                cm.dispose();
            }
        } else if (a == 10) {//进入天空庭院
            if (cm.getParty() == null) { // 没有组队
                cm.sendOk("请组队后和我谈话。");
                cm.dispose();
            } else if (!cm.isLeader()) { // 不是队长
                cm.sendOk("请叫队长和我谈话。");
                cm.dispose();
            } else if (cm.getBossLog('天空庭院') >= 5) {
                cm.sendOk("你不能进去，天空庭院一天只能进入5次。")
                cm.dispose();
            } else {
                var party = cm.getParty().getMembers().size();
                var mapId = cm.getPlayer().getMapId();
                if (party != 1) {
                    cm.sendOk("对不起，天空庭院只能一个人进去。\r\n请开设只有你一个人的组队。")
                    cm.dispose();
                } else {
                    var em = cm.getEventManager("SkyPark");
                    if (em == null) {
                        cm.sendOk("此任务正在建设当中。");
                    } else {
                        var prop = em.getProperty("started");
                        if (prop == "false" || prop == null) {
                            cm.setBossLog('天空庭院')
                            em.startInstance(cm.getParty(), cm.getMap());
                            cm.dispose();
                            return;
                        } else {
                            cm.sendOk("对不起，此频道已经有人在天空庭院里面了。");
                            cm.dispose();
                        }
                    }
                }
            }
        } else if (a == 11) {
            var rand = Math.floor(Math.random() * 20);
            cm.gainItem(4032056, rand);
            cm.playerMessage(1, "随机送给了你" + rand + "个四叶草幸运币\r\n请好好保存!!")
            cm.dispose();
        }//status
    }//mode
}//f