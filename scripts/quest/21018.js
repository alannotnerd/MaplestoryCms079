var status = -1;

function start(mode, type, selection) {
    if (mode == 1) {
        status++;
    } else {
        if (status == 1) {
            qm.sendNext("ֻҪ����5ֻ�Ϳ����ˣ���������");
            qm.dispose();
            return;
        }
        status--;
    }
    if (status == 0) {
        qm.sendNext("�������Ҳ���һ�£�������Ϊֹ�Ļ�������ѵ����������Է����ܼ򵥡�����������һ����ǿ�����͵Ĺ��ޣ��д���ѩ���飬��ֻҪ�������Ϳ��ԣ�Ҫ���ܻ���#r50#kֻ������ˡ���");
    } else if (status == 1) {
        qm.askAcceptDecline("����#o0100134#�����������Ͳ��࣬ɱ����ô����²�����̬ƽ��ı��֣�������5ֻ�Ͳ���ˡ��㿴����ѵ������Ȼ����֮���Ƕ�ô�κ�г������������������");
    } else if (status == 2) {
        if (!qm.isQuestActive(21018)) {
            qm.forceStartQuest();
        }
        qm.sendNextS("#o0100134#�ڵ��Ľ����������ߵ�·һֱ�ߣ����ܿ���#b#m140010200##k����ȥ��������#r5ֻ#o0100134#s#k��");
    } else if (status == 3) {
        qm.AranTutInstructionalBubble("Effect/OnUserEff.img/guideEffect/aranTutorial/tutorialArrow1");
        qm.dispose();
    }
}

function end(mode, type, selection) {
    qm.dispose();
}