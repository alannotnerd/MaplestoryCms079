var status = -1;

function start(mode, type, selection) {
    if (mode == 1) {
        status++;
    } else {
        if (status == 6) {
            qm.sendNext("Oh, is 5 not enough? If you feel the need to train further, please feel free to slay more than that. If you slay all of them, I''ll just have to look the other way even if it breaks my heart, since they will have been sacrificed for a good cause...");
            qm.dispose();
            return;
        }
        status--;
    }
    if (status == 0) {
      qm.sendNext("与黑魔法师战斗的英雄们……有关他们的信息几乎什么都没有留下。即使在预言书中也只有记载5位英雄，也没有任何有关他们外貌的描述。你还能记起来些什么吗？", 8);
    } else if (status == 1) {
        qm.sendNextPrev("一点都想不起来了……", 2);
    } else if (status == 2) {
        qm.sendNextPrev("果然，黑魔法师的诅咒果然很厉害。不过，作为英雄的你肯定和过去应该还会存在某个联系点。会是什么呢？武器和衣服是不是在战斗中都遗弃了呢……啊，对了，应该是#b武器#k！", 8);
    } else if (status == 3) {
        qm.sendNextPrev("武器？", 2);
    } else if (status == 4) {
        qm.sendNextPrev("以前，我们在冰窖中挖掘英雄的时候，发现过一个巨大的武器。我们猜测可能是英雄使用的武器，所以就放在村子的中央。你来来去去的时候没看到吗？ #b#p1201001##k…… \r\r#i4032372#\r\r大概是这个样子……", 8);
    } else if (status == 5) {
        qm.sendNextPrev("确实，那个巨大的战斧在村子里，看起来是有些奇怪。", 2);
    } else if (status == 6) {
        qm.sendAcceptDecline("没错，就是那个东西，据说英雄的武器是会挑选主人的，如果你就是使用巨大的战斧的英雄，那么在抓住巨大的战斧的刹那，武器应该会有反映的。快去点击#b巨大的战斧试试#k。");
    } else if (status == 7) {
		qm.sendOk("如果#p1201001#有反映，就说明你是使用过巨大战斧的英雄，是#b战神#k。");
        if (!qm.isQuestActive(21100)) {
			qm.startQuest();
        }

        qm.showWZEffect("Effect/Direction1.img/aranTutorial/ClickPoleArm", 1);
        qm.dispose();
    }
}

function end(mode, type, selection) {
    qm.dispose();
}