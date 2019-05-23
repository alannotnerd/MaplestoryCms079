/*
 笔芯制作★风云工作室所有
 完成时间：2013年8月21日 10:50:59
 脚本功能：黄金寺院传送
 */

var a = 0;

function start() {
    a = -1;
    action(1, 0, 0);
}

function action(mode, type, selection) {
    if (mode == -1) {
        cm.dispose();
    } else {
        if (mode == 1)
            a++;
        else
            a--;
        if (a == -1) {
            cm.dispose();
        } else if (a == 0) {
            cm.sendSimple("勇敢的旅行者#b#h0##k，请你帮我！！\n我是黄金寺院的僧人#b诺伊#k。原本和平的这里，不久前因为邪恶的恶魔#r拉瓦那#k的觉醒陷入了危机。\n只有你才能和我一起拯救陷入危机的黄金寺院。你一定要挺清楚哦！\r\n#L0##b这样的事为什么找我呢？我只是在冒险岛世界旅行的旅行者。我不是你所想的那种强大的人。#l\n#k")
        } else if (a == 1) {
            cm.sendNext("不！拯救黄金寺院危机的人只有你。智慧的灵魂让我想到了你，我需要你的帮助，请你帮我吧。")
        } else if (a == 2) {
            cm.sendYesNo("是否现在就前往#b黄金寺院#k？怪物死亡后会掉落130-140装备和必掉魔方 星星哦。")
        } else if (a == 3) {
            cm.saveLocation("MULUNG_TC");
            cm.warp(252030000, 0)
            cm.dispose();
        }//a
    }//mode
}//f