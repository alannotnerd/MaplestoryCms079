var status = -1;

function start(mode, type, selection) {
    if (mode > 0)
        status++;
    else {
        qm.dispose();
        return;
    }
    if (status == 0)
        qm.sendAcceptDecline("唉唉，你回來了。我可以看到你在10級了。它看起來像你閃爍的一絲希望努力成為一個騎士。基本的訓練已經結束，現在是時候為你做的決定。");
    else if (status == 1) {
        qm.sendOk("左邊有五個人他們就是騎士團的領導人在等著你。");
        qm.forceStartQuest();
        qm.forceCompleteQuest();
        qm.dispose();
    }
}