var status = -1;

function start(mode, type, selection) {
    status++;
    if (mode != 1) {
        if (type == 1 && mode == 0) {
            status -= 2;
        } else {
            qm.sendNext("你，不愿意去吗？你想看到哥哥我被狗咬吗？快重新和我说话，接受任务！");
            qm.dispose();
            return;
        }
    }
    if (status == 0) {
        qm.sendNext("一大早就来开玩笑，哈哈哈。别乱说了，快去给#p1013102#喂饭吧。");
    } else if (status == 1) {
        qm.PlayerToNpc("#b嗯？那不是#p1013101#的事情吗？");
    } else if (status == 2) {
        qm.sendYesNo("你这家伙！快去喂呀！！ #p1013102#有多讨厌我，你也知道。哥哥我去的话，它一定会咬我的。猎犬喜欢你，你去给它送饭。");
    } else if (status == 3) {
        qm.gainItem(4032447, 1);
        qm.sendNext("你快到#b左边#k去给 #b#p1013102##k 喂饲料。那个家伙好象肚子饿了，从刚才开始就一直在叫。");
        qm.forceStartQuest();
    } else if (status == 4) {
        qm.sendPrev("给#p1013102#喂完食之后，赶快回来。");
        qm.dispose();
    }
}

function end(mode, type, selection) {
    status++;
    if (mode != 1) {
        if (type == 1 && mode == 0) {
            status -= 2;
        } else {
            qm.dispose();
            return;
        }
    }
    if (status == 0) {
        qm.sendNext("#b(You place food in Bulldog's bowl.)#k");
    } else if (status == 1) {
        qm.sendOk("#b(Bulldog is totally sweet. Utah is just a coward.)#k\r\n\r\n#fUI/UIWindow.img/QuestIcon/8/0# 35 exp");
    } else if (status == 2) {
        qm.completeQuest();
        qm.gainItem(4032447, -1);
        qm.gainExp(35);
        qm.sendOk("#b(Looks like Bulldog has finished eating. Return to Utah and let him know.)#k");
        qm.dispose();
    }
}