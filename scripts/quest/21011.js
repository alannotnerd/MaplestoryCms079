function start(mode, type, selection) {
    qm.dispose();
}

var status = -1;

function end(mode, type, selection) {
    if (mode == 1) {
        status++;
    } else {
        if (status == 4) {
            qm.sendNext("���أ���������ѽ�̫������");
            qm.dispose();
            return;
        }
        status--;
    }
    if (status == 0) {
        if (qm.getQuestStatus(21011) == 0) {
            qm.forceStartQuest();
            qm.dispose();
            return;
        }
        qm.sendNext("��#p1201000#��һ��ģ��ѵ������ѵ����Ǵ�˵�е�Ӣ�ۣ�#p1201000#�����ͷ��ص�ͷ�������ǽ��ܽ���ѽ����λ���Ǵ�˵�е�Ӣ���𣿣�");
    } else if (status == 1) {
        qm.sendNextPrev("   #i4001171#");
    } else if (status == 2) {
        qm.sendNextPrev("������Բ���̫�����ˣ��̲�סɤ�Ŵ���Щ�����ء��������˼��������������ᶼ������ˡ���#p1201000#��ؿɿ����ˡ�");
    } else if (status == 3) {
        qm.sendNextPrev("�ȵȡ���Ӣ�۴�����ô��û�������أ�����˵ÿ��Ӣ�۶����Լ��Ķ��������������������Ǻͺ�ħ��ʦս����ʱ����ʧ�ˡ�");
    } else if (status == 4) {
        qm.sendYesNo("��Ȼ�����˵㣬����#b������ѽ����Ű�#k�������͸�Ӣ�۵����Ӣ�����û�����������ǻ���Щ��֣�\r\n\r\n#fUI/UIWindow.img/QuestIcon/4/0#\r\n#v1302000# 1�� #t1302000#\r\n\r\n#fUI/UIWindow.img/QuestIcon/8/0# 35 exp");
    } else if (status == 5) {
        if (qm.getQuestStatus(21011) == 1) {
            qm.gainItem(1302000, 1);
            qm.gainExp(35);
        }
        qm.forceCompleteQuest();
        qm.sendNextPrevS("#b�����Լ��⼼��ˮƽûһ��Ӣ�۵����ӡ�����ѽ��о�Ҳ��İ������ǰ�������ý�������ѽ���ô���أ���#k", 3);
    } else if (status == 6) {
        qm.summonMsg(16); // How to equip shiet
        qm.dispose();
    }
}