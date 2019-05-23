/* 等待主人的武器 */

var status = -1;

function start(mode, type, selection) {
    if (mode == 1) {
        status++;
    } else {
        if (status == 0) {
            qm.sendNext("有很紧急的事情。要是拒绝的话，肯定会后悔的哦？#b有关你长矛的事情#k，也就是有关你的过去。谁知道呢？……说不定这个长矛能够唤醒你的能力？");
            qm.dispose();
            return;
        }
        status--;
    }
    if (status == 0) {
        qm.sendAcceptDecline("修炼进展得如何？哟，等级升得这么高了？难怪人们都说济州岛是养马的天堂，金银岛是升级的天堂……对了，现在还不是说闲话的时候。能否麻烦你回岛上来一趟？");
    } else if (status == 1) {
        qm.forceStartQuest(21200, "3"); //??
        qm.completeQuest();
        qm.forceStartQuest(21202); //skip just in case
        qm.forceStartQuest(21203, "0");
        qm.sendOk("#b保管在#m140000000##k的你的#b#p1201001##k突然出现了奇怪的反应。据说长矛在呼唤自己主人的时候才会发出那样的反应。#b也许有什么事情要转达给你？#k请速回岛上一趟吧。");
        qm.dispose();
    }
}

function end(mode, type, selection) {
    if (mode == 1) {
        status++;
    } else {
        if (status == 11) {
            qm.sendNext("你这家伙！好歹也要努力颠峰一下吧？");
            qm.dispose();
            return;
        } else if (status == 13) {
            qm.MovieClipIntroUI(true);
            qm.warp(914090200, 0);
            qm.dispose();
            return;
        }
        status--;
    }
    if (status == 0) {
        qm.sendNext("嗡嗡嗡嗡嗡……", 2);
    } else if (status == 1) {
        qm.sendNextPrev("#b（#p1201001#在发出嗡鸣声。奇怪，那边的少年是谁？）#k", 2);
    } else if (status == 2) {
        qm.sendNextPrev("#b（以前没见过他啊？怎么看起来不太像人类？）#k", 2);
    } else if (status == 3) {
        qm.sendNextPrev("喂！战神！还听不见我的声音吗？到底听不听得见？唉，烦死了！");
    } else if (status == 4) {
        qm.sendNextPrev("#b（咦？这是谁的声音？怎么听起来像个凶巴巴的少年……）#k", 2);
    } else if (status == 5) {
        qm.sendNextPrev("唉……哪有这样的主人啊？丢开武器在冰窟里睡了几百年，现在连话都听不懂了……");
    } else if (status == 6) {
        qm.sendNextPrev("你是谁啊？", 2);
    } else if (status == 7) {
        qm.sendNextPrev("啊，战神？现在听到我的声音了？是我啊，不记得我了？我就是武器#b长矛 #p1201002##k啊？");
    } else if (status == 8) {
        qm.sendNextPrev("#b（……#p1201002#？#p1201001#会说话？）#k", 2);
    } else if (status == 9) {
        qm.sendNextPrev("不至于吧？这么吃惊？再怎么失忆，总不能连我都忘了吧？太不够意思了！");
    } else if (status == 10) {
        qm.sendNextPrev("不好意思，真的一点都想不起来。", 2);
    } else if (status == 11) {
        qm.sendYesNo("说声不好意思就能算了？！几百年来就我一个人孤苦伶仃地，有多寂寞你知道吗？不管怎样，你快点给我想起来！");
    } else if (status == 12) {
        qm.sendNext("#b（一口一个自己是#p1201001#、#p1201002#的，还越说越生气了。再这么说下去也不会有啥进展，还是先走到 #p1201000#跟前，好好商量商量。）#k", 2);
        qm.completeQuest();
        qm.forceStartQuest(21202); //skip just in case
        qm.forceStartQuest(21203, "0");
    } else if (status == 13) {
        qm.sendYesNo("Would you like to skip the video clip?  Even if you skip the scene, game play will not be affected.");
    } else if (status == 14) {
        qm.dispose();
    }
}