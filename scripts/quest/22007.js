var status = -1;

function start(mode, type, selection) {
    status++;
    if (mode != 1) {
        if (type == 1 && mode == 0) {
            status -= 2;
        } else {
            qm.sendNext("��Ը�⣿�Ǿ����ˡ��������ҾͲ��ܸ��㡣");
            qm.dispose();
            return;
        }
    }
    if (status == 0) {
        qm.sendNext(" �ţ��ðɣ��Ұѷ��������㣬����Ҫ������һ���¡���������ȥ�� ���� ���һ�ûȥ�ء�������Ϊ�Ҿ����鷳��������ܰ���ȥ�� ���� ���ҾͰѷ��������㡣��ô����������");
    } else if (status == 1) {
        qm.sendOk(" �õģ�����쵽#b�ұߵ� ����Ͱ#k ȥ���� ���� �û������������Ͱ ���Ϳ��Ի�� ���� ����̫��Ļ����᲻̫���㣬��ֻҪ��1���������С�");
        qm.forceStartQuest();
        qm.dispose();
    }
}

function end(mode, type, selection) {
    status++;
    if (mode != 1) {
        if (type == 1 && mode == 0) {
            status -= 2;
        } else {
            qm.sendNext("�ţ���֡�������û�����úá����³���һ�°ɡ�");
            qm.dispose();
            return;
        }
    }
    if (status == 0) {
        qm.sendNext("Ŷ������ �������𣿿�ѵ����Ұɡ������������������");
    } else if (status == 1) {
        qm.sendYesNo("�������š���֪���⵽�׿���������ʲô���� \r\n\r\n#fUI/UIWindow.img/QuestIcon/8/0# 360 exp");
    } else if (status == 2) {
        qm.forceCompleteQuest();
        qm.gainExp(360);
        if (qm.haveItem(4032451)) {
            qm.gainItem(4032451, -1);
        }
        qm.evanTutorial("UI/tutorial/evan/9/0", 1);
        qm.dispose();
    }
}