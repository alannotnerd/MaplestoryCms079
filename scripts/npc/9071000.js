/*
 *	 怪物公园 - 休彼德蔓
 */

var status = -1;

function start() {
    action(1, 0, 0);
}

function action(mode, type, selection) {
    if (mode == -1) {
        cm.dispose();
    } else {
        if (status == 0 && mode == 0) {
            cm.dispose();
        }
        if (mode == 1) {
            status++;
        } else {
            status--;
        }
        if (status == 0) {
            cm.sendSimple("欢迎来到怪物公园！呵呵，我是怪物公园的主人休彼德蔓。看你一脸的好奇。有什么问题的话，可以问我。\r\n#b#L0#怪物公园是什么？#l\r\n#L1#听说怪物公园里可以获得特殊的物品……？#l\r\n#L2#我想用#t4310020#交换物品。#l");
        } else if (status == 1) {
            if (selection == 0) {
                status = 2;
                cm.sendNext("#b怪物公园#k是什么？呵呵，就是可以见到我休彼德蔓在冒险岛各地搜集到的特殊的怪物的地方。外貌……虽然都一样。但是消灭它们之后，你就知道有什么不同了，呵呵。");
            } else if (selection == 1) {
                status = -1;
                cm.sendNext("哈哈，这么快就传出去了吗？我为到怪物公园来玩的人准备了特别的东西。你想看一看吗？\r\n#i1012270:# #b#t1012270#（5天）#k \r\n#i1162008:# #b#t1162008#（7天）#k \r\n#i2430275:# #b#t2430275##k \r\n#i2550000:# #b#t2550000##k \r\n\r\n怎么样？很想得到吧？呵呵呵，我在怪物公园的怪物身上放了特殊的纪念品。打猎怪物，可以发现#b#t4310020##k。搜集之后交给#b拉库#k，就能交换到我准备的特殊的东西。");
            } else if (selection == 2) {
                status = -1;
                cm.sendOk("因为最近有很多事情需要处理，来访问怪物公园的游客也越来越多，所以我没办法亲自负责交换。\r\n所以我就把这件事交给了那边的#b杂货商人拉库#k，你去找他交换吧。祝你过得愉快～");
            }
        } else if (status == 2) {
            cm.dispose();
        } else if (status == 3) {
            cm.sendNextPrev("你也知道，我一向重视和平和团结。为了让大家在一起享受快乐，我把怪物公园内的副本全部改成了#b组队游戏区域#k。虽然一个人也能进去，但是组队进去会更好。");
        } else if (status == 4) {
            cm.sendPlayerToNpc("竟然会开放怪物公园，你又在打什么主意啊？");
        } else if (status == 5) {
            cm.sendNextPrev("呵呵呵，你在说什么呢……我只是想让大家开心罢了。别想太多，尽情地去玩吧。啊，对了，需要入场券才能进去，这个我不说你也知道吧？");
        } else if (status == 6) {
            status = -1;
            cm.sendNextPrev("在普通地区打猎，可以获得#b#t4001513##k、#b#t4001515##k和#b#t4001521##k。搜集10张交给#b#p9071002##k，可以交换到一张入场券。");
        } else if (status == 7) {
            cm.dispose();
        }
    }
}