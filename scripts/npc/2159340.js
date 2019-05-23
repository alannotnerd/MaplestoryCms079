var status = -1;

function action(mode, type, selection) {
    if (mode == 0) {
        status--;
    } else {
        status++;
    }

    if (status == 0) {
        cm.sendNextS("什… 什么？ 那是什么呢？！", 5, 2159340);
    } else if (status == 1) {
        cm.getDirectionInfo("Effect/Direction6.img/effect/tuto/balloonMsg2/1", 2000, 0, -100, 0, 0);
        cm.getDirectionInfo(1, 900);
    } else if (status == 2) {
        cm.sendNextS("(…发生什么事了？ 力量几乎全都消失了。 前面的这个东西… 难道就是这个东西吸走我的力量？)", 3);
    } else if (status == 3) {
        cm.sendNextPrevS("这… 我不曾听说有这种东西！", 5, 2159341);
    } else if (status == 4) {
        cm.sendNextPrevS("这是在做什么？ 为什么要做出这种事？ 从你们身上感受到的那股力量… 是黑魔法师的力量？", 3);
    } else if (status == 5) {
        cm.sendNextPrevS("要抓住那小子才可以不被追究责任！", 5, 2159340);
    } else if (status == 6) {
        cm.getDirectionInfo("Effect/Direction6.img/effect/tuto/balloonMsg1/16", 2000, 0, -100, 0, 0);
        cm.getDirectionInfo(1, 1500);
    } else if (status == 7) {
        cm.getDirectionInfo(0, 366, 0);
        cm.getDirectionInfo("Skill/3112.img/skill/31121006/effect", 0, 0, 0, 0, 0);
        cm.environmentChange("demonSlayer/31121006", 5);
        cm.getDirectionInfo(1, 900);
    } else if (status == 8) {
        cm.getDirectionInfo("Effect/Direction6.img/effect/tuto/balloonMsg1/17", 2000, 0, -100, 0, 0);
        cm.getDirectionInfo(1, 900);
    } else if (status == 9) {
        cm.environmentChange("demonSlayer/31121006h", 5);
        cm.setNPCSpecialAction(2159340, "die");
        cm.setNPCSpecialAction(2159341, "die");
        cm.getDirectionInfo(1, 990);
    } else if (status == 10) {
        cm.removeNPCRequestController(2159340);
        cm.removeNPCRequestController(2159341);
        cm.getDirectionInfo("Effect/Direction6.img/effect/tuto/balloonMsg0/13", 2000, 0, -100, 0, 0);
        cm.sendNextS("(好惊人的技术… 那个人到底是谁？)", 5, 2159342);
    } else if (status == 11) {
        cm.getDirectionInfo(1, 1500);
    } else if (status == 12) {
        cm.sendNextS("(呜… 光是应付那些家伙就消耗太多力量了… 这里是什么地方呢？ 至少不是对我抱持善意的地方。 快点离开这里吧。)", 3);
    } else if (status == 13) {
        cm.getDirectionInfo(3, 2);
        cm.getDirectionInfo(1, 990);
    } else if (status == 14) {
        cm.getDirectionInfo(3, 0);
        cm.getDirectionInfo("Effect/Direction6.img/effect/tuto/balloonMsg1/12", 2000, 0, -100, 0, 0);
        cm.getDirectionInfo(1, 990);
    } else if (status == 15) {
        cm.getDirectionEffect(2, "Effect/Direction6.img/effect/tuto/balloonMsg1/4", 2000, 0, -100, 1, 1, 0, 0, 5417499);
        cm.getDirectionInfo(1, 1200);
    } else if (status == 16) {
        cm.sendNextS("(糟糕了。 意识逐渐变模糊了… 若是现在被攻击就危险了！)", 3);
    } else if (status == 17) {
        cm.sendNextPrevS("等等。 冷静点， 我并没有打算和你交手。 你是谁呢？ 为何会在这里？", 5, 2159342);
    } else if (status == 18) {
        cm.sendNextPrevS("(他身上感觉不到黑魔法师的气息。)\r\n不要过来…！", 3);
    } else if (status == 19) {
        cm.sendNextPrevS("你都已经站不稳了，为何还说出那种话呢？ 你到底知道黑色翅膀对你做了什么吗？ 旁边的机械是能量传送装置… 黑色翅膀夺走你的力量了。", 5, 2159342);
    } else if (status == 20) {
        cm.sendNextPrevS("(能量传送装置…？ 你是指这个东西吗？ 不过，黑色翅膀是什么呢？ 看来你什么都不知道… 到底是怎么回事呢？)", 3);
    } else if (status == 21) {
        cm.getDirectionInfo("Effect/Direction6.img/effect/tuto/balloonMsg0/13", 2000, 0, -100, 0, 0);
        cm.getDirectionInfo(1, 1500);
    } else if (status == 22) {
        cm.sendNextS("你是谁？ 怎么会… 咳咳。 你应该知道这件事吗？", 3);
    } else if (status == 23) {
        cm.sendNextPrevS("我末日反抗军的成员 J.  和黑色翅膀是敌对关系。 虽然我不清楚详细情况，但是我可没有恶劣到会和一个伤患交手。 不过，你的状态看起来不太好，我来帮…", 5, 2159342);
    } else if (status == 24) {
        cm.sendNextPrevS("什么… 力量…  已经… 无法再…", 3);
    } else if (status == 25) {
        cm.getDirectionInfo(0, 373, 0);
        if (cm.getPlayer().getGender() == 0) {
            cm.getDirectionInfo("Effect/Direction6.img/effect/tuto/fallMale", 0, 0, 0, 0, 0);
        } else {
            cm.getDirectionInfo("Effect/Direction6.img/effect/tuto/fallFemale", 0, 0, 0, 0, 0);
        }
        cm.getDirectionInfo(1, 600);
    } else if (status == 26) {
        cm.getDirectionEffect(2, "Effect/Direction6.img/effect/tuto/balloonMsg1/13", 2000, 0, -100, 1, 1, 0, 0, 5417499);
        cm.getDirectionInfo(1, 1500);
    } else {
        cm.removeNPCRequestController(2159342);
        cm.dispose();
        cm.warp(931050030, 0);
    }
}