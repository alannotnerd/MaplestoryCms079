var status = -1;

function start(mode, type, selection) {
    if (mode == 1) {
        status++;
    } else {
        if (status == 5) {
            qm.sendNextS("#b(���ǵ�Ӣ�ۣ���������ô�ˣ�)#k", 2);
            qm.dispose();
            return;
        }
        status--;
    }
    if (status == 0) {
        qm.sendNextS("���ڣ������ǲ����չ���˰ɣ�����ʱ��Ҫ��һ����ǿѵ��ǿ�Ȳ��ܱ�֤��������Ӳ�Ļ������������ɣ��������������Ķ����ɡ�", 8);
    } else if (status == 1) {
        qm.sendNextPrevS("���ȥ#b#m140020200##k����#r#o0100133##k���Կ����������#r20ֻ#k���У��������������������а�������ȥ��ȥ�����ף�����ʲô��Ҫ˵��", 8);
    } else if (status == 2) {
        qm.sendNextPrevS("����Ϊʲô����Ĺ�������Խ��Խ���ˣ�", 2);
    } else if (status == 3) {
        qm.sendNextPrevS("��ҪԽ��Խ�ࡣ�ѵ�˵20ֻ��������Ҫ������100ֻ���ԣ�Ŷ���⻹���������Բ���������֮��������һ��������999ֻ�������ԡ���", 8);
    } else if (status == 4) {
        qm.sendNextPrevS("���������ˣ������͹��ˡ�", 2);
    } else if (status == 5) {
        qm.askAcceptDecline("���ϰ��ϣ��ò�����ôǫ�顣�ҳ��֡����Ӣ�۴��˿����Ͻ�����������������顣�治����Ӣ�۴��ˡ���");
    } else if (status == 6) {
        qm.forceStartQuest();
        qm.sendNextS("#b(����ô˵��ȥ���㲻���������ȥ����999������ˣ��Ͻ���������ˡ�)#k", 2);
    } else if (status == 7) {
        qm.sendNextPrevS("�ǾͰ���������20ֻ#o0100133#��", 8);
    } else if (status == 8) {
        qm.AranTutInstructionalBubble("Effect/OnUserEff.img/guideEffect/aranTutorial/tutorialArrow3");
        qm.dispose();
    }
}

function end(mode, type, selection) {
    qm.dispose();
}