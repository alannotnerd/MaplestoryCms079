var status = -1;

function start(mode, type, selection) {
    if (mode == 1) {
        status++;
    } else {
        if (status == 2) {
            qm.sendNext("��û����׼������ô׼���ú���������˵һ����");
            qm.dispose();
            return;
        }
        status--;
    }
    if (status == 0) {
        qm.sendNext("���ˣ�˵��������͸�һ���䣬����Ҫ������һ�׶��ˡ���һ�׶���ʲô���ղ����Ѿ�˵���ˡ����ǲ��ϵ�ĥ���Լ�ֱ����ӵ������սʤ��ħ��ʦ��ʵ����");
    } else if (status == 1) {
        qm.sendNextPrev("��Ȼ�ڼ���ǰ��ȷʵ��Ӣ�ۣ�����Ͼ��Ǻܾ���ǰ�������ˡ�����û�к�ħ��ʦ�����䣬�ڱ�����ⶳ����ô�ã�������ʲô��Ҳû��ô����˰ɣ�����Ҫ��Щ׼�������֪������ô����׼�����");
    } else if (status == 2) {
        qm.askAcceptDecline("�����Ǹ����ı�Ǯ��Ӣ��ҲҪ�ӻ���������ʼѵ���������Ǿ仰��Ҳ֪���ɣ���ȻҪ��#b ������������#k��ʼ���𡭡���������ܲ��ǵ��ˡ�����Ҳû��ϵ������һ����������ˡ����ھͿ�ʼ�������������ɣ�");
    } else if (status == 3) {
        if (!qm.isQuestActive(21015)) {
            qm.forceStartQuest();
        }
        qm.sendNextS("���������ȫ�����ĵ��ϣ�Ҳ�м�ֻ���ޡ�ȥ�����ұߵ�#b��ѩ���ǵ�ԭҰ1#k�����ܿ�������㳦��ѩ���顣������#r10ֻ�㳦��ѩ����#k��������Щ��׾��������Ķ���ץ�ĵ��㳦��ѩ���飬���ܲ��ܻ�ץ�����ɣ�", 1);
    } else if (status == 4) {
        qm.AranTutInstructionalBubble("Effect/OnUserEff.img/guideEffect/aranTutorial/tutorialArrow3");
        qm.dispose();
    }
}

function end(mode, type, selection) {
    qm.dispose();
}