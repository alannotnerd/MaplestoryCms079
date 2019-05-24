var status = -1;

function start(mode, type, selection) {
    if (qm.getPlayer().getJunior1() > 0) {
        qm.forceCompleteQuest();
        qm.gainExp(3000);
        qm.sendNext("Good job!");
    } else {
        qm.sendNext("嗯？？ 我看你还没有成功登录一个同学呢。。");
    }
    qm.dispose();
}

function end(mode, type, selection) {
    if (qm.getPlayer().getJunior1() > 0) {
        qm.forceCompleteQuest();
        qm.gainExp(3000);
        qm.sendNext("Good job!");
    } else {
        qm.sendNext("嗯？？ 我看你还没有成功登录一个同学呢。。");
    }
    qm.dispose();
}