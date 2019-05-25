var status = -1;
var answer = false;
function action(mode, type, selection) {
    if (mode == 1) {
        status++;
    } else {
        if (status == 5) {
            cm.sendNext("#b（本来不打算要下手的，突然手一滑！）#k");
            return;
        }
        status--;
    }
    if (cm.getPlayer().getMapId() == 931000011) {
        cm.dispose();
        return;
    }

    if (cm.getInfoQuest(23007).indexOf("vel00=1") == -1 && cm.getInfoQuest(23007).indexOf("vel01=1") == -1) {
        if (status == 0) {
            cm.sendNext("不可以再靠近了…！");
        } else if (status == 1) {
            cm.sendNextPrev("怎麽会来这里？这里是禁止出入的地方。");
        } else if (status == 2) {
            cm.sendNextPrevS("你是谁？！", 2);
        } else if (status == 3) {
            cm.sendNextPrev("我…我这里，往上看。");
        } else if (status == 4) {
            cm.updateInfoQuest(23007, "vel00=1");
            cm.showWZEffect("Effect/Direction4.img/Resistance/ClickVel");
            cm.dispose();
        }
    } else if (cm.getInfoQuest(23007).indexOf("vel00=1") != -1 && cm.getInfoQuest(23007).indexOf("vel01=1") == -1) {
        if (status == 0) {
            cm.sendNext("我是…　#r杰利麦勒博士#k的实验者。我叫作#b斐勒#k… 虽然不知道你们怎麽跑进来的，快点出去！要是被博士发现的话，就完蛋了！");
        } else if (status == 1) {
            cm.sendNextPrevS("实验者？杰利麦勒？到底在说什麽啊？这里到底是什麽地方？你为什麽要进去里面啊？", 2);
        } else if (status == 2) {
            cm.sendNextPrev("你不知道杰利麦勒？ 杰利麦勒博士… 黑色翅膀的疯狂科学家！这里是杰利麦勒的研究室，杰利麦勒在这里尽心人体实验…");
        } else if (status == 3) {
            cm.sendNextPrevS("人体…实验？", 2);
        } else if (status == 4) {
            cm.sendNextPrev("对，人体实验，你如果被抓到，说不定也会变成实验品！快逃跑！");
        } else if (status == 5) {
            cm.sendNextPrevS("什麽？逃、逃跑…？但是你…！", 2);
        } else if (status == 6) {
            cm.sendNextPrev("…嘘！小声一点！杰利麦勒博士来了。");
        } else if (status == 7) {
            cm.updateInfoQuest(23007, "vel00=2");
            cm.warp(931000011, 0);
            cm.dispose();
        }
    } else if (cm.getInfoQuest(23007).indexOf("vel01=1") != -1) {
        if (status == 0) {
            cm.sendNext("好险…杰利麦勒好像有事出去了…快，就趁现在，你快点走吧。");
        } else if (status == 1) {
            cm.sendNextPrevS("我一个人逃走吗？那你呢？", 2);
        } else if (status == 2) {
            cm.sendNext("我没有办法逃走。杰利麦勒博士记得自己实验过的所有东西，只要少一个，马上就会发现的…所以你快走吧。");
        } else if (status == 3) {
            cm.sendNextPrevS("不可以！你也跟我一起走！", 2);
        } else if (status == 4) {
            cm.sendNext("就说不可能了，更何况我…被关在这里面。想要逃也逃不了…谢谢你为我操心。好久没有人这麽关心我了。快，快去吧。");
        } else if (status == 5) {
            cm.sendYesNo("#b（斐勒把眼睛闭了起来，就像放弃了一切，该怎麽办？去关斐勒的实验室看看！）#k");
        } else if (status == 6) {
            cm.gainExp(60);
            cm.warp(931000013, 0);
            cm.dispose();
        }
    }
}