var status = -1;

function start(mode, type, selection) {
    if (qm.getPlayer().getJunior1() > 0) {
        qm.forceCompleteQuest();
        qm.gainExp(3000);
        qm.sendNext("Good job!");
    } else {
        qm.sendNext("�ţ��� �ҿ��㻹û�гɹ���¼һ��ͬѧ�ء���");
    }
    qm.dispose();
}

function end(mode, type, selection) {
    if (qm.getPlayer().getJunior1() > 0) {
        qm.forceCompleteQuest();
        qm.gainExp(3000);
        qm.sendNext("Good job!");
    } else {
        qm.sendNext("�ţ��� �ҿ��㻹û�гɹ���¼һ��ͬѧ�ء���");
    }
    qm.dispose();
}