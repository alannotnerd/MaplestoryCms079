var status = -1;

function start(mode, type, selection) {
    if (mode == 1) {
        status++;
    } else {
        if (status == 0) {
            qm.sendNext("#b(You need to think about this for a second...)#k");
            qm.dispose();
            return;
        } else if (status == 2) {
            qm.MovieClipIntroUI(true);
            qm.warp(914090100, 0);
            qm.dispose();
            return;
        }
        status--;
    }
    if (status == 0) {
        qm.sendYesNo("#b(让我确认自己是不是使用#p1201001#的英雄？使劲抓住#p1201001#试试，肯定会有什么反映的。)#k");
    } else if (status == 1) {
        if (qm.getJob() == 2000) {
            qm.changeJob(2100);
            qm.forceCompleteQuest();
            qm.resetStats(35, 4, 4, 4);
            qm.expandInventory(1, 4);
            qm.expandInventory(2, 4);
            qm.expandInventory(3, 4);
            qm.expandInventory(4, 4);
            qm.gainItem(1142129, 1);
            qm.forceCompleteQuest(29924); //medal
            qm.teachSkill(21000000,0,10);//矛连击强化
            qm.teachSkill(21000002,0,20);//双重重击
            qm.teachSkill(21001001,0,15);//战斗步伐
            qm.teachSkill(21001003,0,20);//快速矛
            qm.sendNextS("#b(似乎想起来了什么……)#k", 3);
        }
    } else if (status == 2) {
        qm.sendYesNoS("Will you skip the video clip? Even if you skip the scene, game-play will not be affected.", 1);
    } else if (status == 3) {
        qm.warp(140000000, 0)
        qm.dispose();
    }
}

function end(mode, type, selection) {
    qm.dispose();
}