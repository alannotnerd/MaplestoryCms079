var status = -1;

function start(mode, type, selection) {
    status++;
    if (mode != 1) {
        if (type == 1 && mode == 0) {
            status -= 2;
        } else {
            qm.sendNext("�ţ������ ���� �����ǣ��ֵ�֮��Ӧ�úú��ദ�");
            qm.dispose();
            return;
        }
    }
    if (status == 0) {
        qm.sendNext("������С���㣿");
    } else if (status == 1) {
        qm.PlayerToNpc("#b�š�������Ҳ������#k");
    } else if (status == 2) {
        qm.sendNextPrev("�š�����������ô����û˯���أ��������ϴ���һҹ���ס����Բ�û˯����");
    } else if (status == 3) {
        qm.PlayerToNpc("#b����������Ϊ�Ǹ�������Ϊ����һ����ֵ��Ρ�#k");
    } else if (status == 4) {
        qm.sendNextPrev("��ֵ��Σ��μ�ʲô�أ�");
    } else if (status == 5) {
        qm.PlayerToNpc("#b�š���#k");
    } else if (status == 6) {
        qm.PlayerToNpc("#b(˵���μ��������������������顣)");
    } else if (status == 7) {
        qm.sendAcceptDecline("�ǺǺǺǣ�������ô���ε�����أ�û���Ե�������̫���ˡ������˸���Ȥ���Σ�ȥ���� ���� �ɡ���һ����ܸ��˵ġ�");
    } else if (status == 8) {
        qm.forceStartQuest();
        qm.sendNext("#b����#k ȥ #bǰԺ#k ����Ȯι���ˡ��Ӽ����ȥ���ܼ������ˡ�");
    } else if (status == 9) {
        qm.evanTutorial("UI/tutorial/evan/1/0", 1);
        qm.dispose();
    }
}

function end(mode, type, selection) {
    status++;
    if (mode != 1) {
        if (type == 1 && mode == 0) {
            status -= 2;
        } else {
            qm.dispose();
            return;
        }
    }
    if (status == 0) {
        qm.sendNext("Ŷ����������С���㣿������ģ���ô��ô��ĺ���Ȧ��������û˯����ʲô��������ֵ��Σ�ʲô�ΰ����ţ��μ�����������");
    } else if (status == 1) {
        qm.sendNextPrev("�������������������ˡ���Ȼ�ε����������������й��𣿹���������\r\n\r\n#fUI/UIWindow.img/QuestIcon/8/0# 20 exp");
    } else if (status == 2) {
        qm.gainExp(20);
        qm.evanTutorial("UI/tutorial/evan/2/0", 1);
        qm.forceCompleteQuest();
        qm.dispose();
    }
}