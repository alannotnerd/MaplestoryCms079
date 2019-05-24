/*
 * The return of the Hero
 * Rien Cold Forest 1
 */

var status = -1;

function start(mode, type, selection) {
    if (mode == 1) {
        status++;
    } else {
        if (status == 3) {
            qm.sendNext("哎呀，别客气！送英雄一瓶药水又不是什么大事。你要是改了主意，请随时来找我。");
            qm.dispose();
            return;
        }
        status--;
    }
    if (status == 0) {
        qm.sendNext("咦？什么人在岛上……？哎呦，这不是#p1201000#吗？#p1201000#来这里是为了……这人是#p1201000#的朋友吗？啊？你说这人是英雄？");
    } else if (status == 1) {
        qm.sendNextPrev("     #i4001170#");
    } else if (status == 2) {
        qm.sendNextPrev("这位原来就是#p1201000#一族数百年间苦苦守候的英雄啊！啊，乍一看倒是和普通人没什么两样……");
    } else if (status == 3) {
        qm.askAcceptDecline("不过，既然被黑魔法师的诅咒给冰封了数百年，现在体力一定很虚弱吧。#b我这里有些恢复体力的药水，赶紧喝下去吧#k。");
    } else if (status == 4) { // TODO HP set to half
        qm.sendNext("请先喝掉药水，然后再慢慢谈！");
        qm.gainItem(2000022, 1);
        qm.forceStartQuest();
    } else if (status == 5) {
        qm.sendNextPrevS("#b（这药水怎么喝？……不记得了……）#k", 3);
    } else if (status == 6) {
        qm.summonMsg(0xE);
        qm.dispose();
    }
}

function end(mode, type, selection) {
    if (mode == 1) {
        status++;
    } else {
        status--;
    }
    if (status == 0) {
        qm.sendNext("我们一直试图在冰层深处寻找传说中的英雄，不过从没想过真能找到你！预言果然没有错！#p1201000#做出了正确的选择！既然英雄重新回来了，我们就没有必要再惧怕黑魔法师了！");
    } else if (status == 1) {
        qm.sendNextPrev("哎呦，我怎么抓着您聊了这么久？实在是太高兴了……其他的企鹅估计也会像我这样的。虽然知道你很忙，不过在回村子的路上，#b还是尽量和其他的企鹅搭搭话吧#k。有大英雄和他们说话，他们肯定会惊讶得要死！\r\n\r\n#fUI/UIWindow.img/QuestIcon/4/0# \r\n#i2000022# #t2000022# 5个\r\n#i2000023# #t2000023# 5个\r\n\r\n#fUI/UIWindow.img/QuestIcon/8/0# 16 exp");
    } else if (status == 2) {
        qm.sendNextPrev("你升级了吗？不知道你有没有得到技能点数？在冒险岛世界，每升1级就能获得技能点数3。按#bK键#k，打开技能栏就可确认。");
        if (qm.getQuestStatus(21010) == 1) {
            qm.gainExp(16);
            qm.gainItem(2000022, 5);
            qm.gainItem(2000023, 5);
            qm.forceCompleteQuest();
        }
    } else if (status == 3) {
        qm.sendNextPrevS("#b（对我这么亲切，我却什么都想不起来。我真的是英雄吗？还是先查看一下技能吧……怎么查看技能呀？）#k");
    } else if (status == 4) {
        qm.summonMsg(0xF);
        qm.dispose();
    }
}