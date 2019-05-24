var status = -1;

function start(mode, type, selection) {
    if (mode == 1) {
        status++;
    } else {
        if (status == 1) {
            qm.sendNext("����Ӣ�۴��˶��Կ϶����а����ġ�����һ�����¡�");
            qm.dispose();
            return;
        }
        status--;
    }
    if (status == 0) {
        qm.sendSimple("Ӣ��Ӣ�۴��ˡ�����һֱ��������㡣 \r\n#b#L0#��������״����#l");
    } else if (status == 1) {
        qm.askAcceptDecline("�ҴӺܾ���ǰ������Ӣ�۴���һ���������Ȼ����������Ӣ�ۣ���֪Ӣ���ܷ�������������ݱ���");
    } else if (status == 2) {
        qm.forceStartQuest();
        qm.sendNextS("��������Ĳ��Ϸ����⸽�����������ˡ��ͷ�Ӣ�۴����ҵ�������ӣ���#b#t4032309##k��#b#t4032310##k�������ҡ�Ȼ���Ҿ������̰��������á�", 1);
    } else if (status == 3) {
        qm.summonMsg(18);
        qm.dispose();
    }
}

function end(mode, type, selection) {
    if (mode == 1) {
        status++;
    } else {
        if (status == 0) {
            qm.sendNext("What? You don't want the potion?");
            qm.dispose();
            return;
        }
        status--;
    }
    if (status == 0) {
        qm.sendNext("���϶������������Եȡ���ô���һ������ \r\n\r\n#fUI/UIWindow.img/QuestIcon/4/0#\r\n#v3010062# 1�� #t3010062#\r\n\r\n#fUI/UIWindow.img/QuestIcon/8/0# 95 exp");
    } else if (status == 1) {
        if (qm.getQuestStatus(21013) == 1) {
            qm.gainItem(3010062, 1);
            qm.gainExp(95);
            qm.forceCompleteQuest();
        }
        qm.sendNextPrevS("���ˣ����������ˣ��ٺ٣�������Ӣ�ۿ϶�Ҳ������ҪЪЪ��ʱ��������һֱ������һ�����ӡ�", 1);
    } else if (status == 2) {
        qm.sendNextPrevS("���������Ӣ��Ҳ������Զ�������棬�϶�Ҳ��ƣ�͡������ʱ�򡣵�������Ӣ�����ܹ��˷�����ȡ�����ʤ���ġ�", 1);
    } else if (status == 3) {
        qm.summonMsg(19);
        qm.dispose();
    }
}