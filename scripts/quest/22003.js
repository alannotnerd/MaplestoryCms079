var status = -1;

function start(mode, type, selection) {
    status++;
    if (mode != 1) {
        if (type == 1 && mode == 0) {
            status -= 2;
        } else {
            qm.sendNext("��Ҫ�����鷳�Ͳ�Ը��ȥ�����Ǹ��ú��ӣ��԰ɣ���������˵���ɡ�");
            qm.dispose();
            return;
        }
    }
    if (status == 0) {
        qm.sendAcceptDecline("ȥũ���ɻ��ʱ��#b�ְ�#k���˰ѱ㵱����ȥ�ˡ�����ȥ #b#m100030300##k ���ְ���#b�㵱#k��");
    } else if (status == 1) {
        qm.forceStartQuest();
        qm.sendNext("�Ǻǣ�С�����Ȼ�Ǹ��ú��ӡ�#b�Ӽ����ȥ��������ߡ�#k�ְ�һ�������ˣ�����ÿ������͹�ȥ��");
        if (!qm.haveItem(4032448)) {
            qm.gainItem(4032448, 1);
        }
    } else if (status == 3) {
        qm.sendNextPrev("�����С�İѱ㵱Ū���ˣ������ϻ��������ٸ����һ�ݡ�");
    } else if (status == 4) {
        qm.evanTutorial("UI/tutorial/evan/5/0", 1);
        qm.dispose();
    }
}

function end(mode, type, selection) {

}