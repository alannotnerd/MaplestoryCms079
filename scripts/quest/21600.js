var status = -1;

function start(mode, type, selection) {
    if (mode == -1) {
        qm.dispose();
    } else {
        if (mode == 1) {
            status++;
        } else {
            status--;
        }
        if (status == 0) {
            qm.sendNext("�Ѿ�50���˰����ܿ����������·���ǲ��Ǿ͸о����ܶ����أ�վ����������ԭ����ս��ר�õ����");
        } else if (status == 1) {
            qm.sendAcceptDecline("�������Ҫ�������뿪��������ô���Ȱ��æ�������ɣ�����ȥ��#b��Ŭ��#k�ɡ������������ô���ġ���ô����Ը��ȥ��");
        } else if (status == 2) {
            qm.forceStartQuest();
            qm.sendNext("�õġ���ô��Ҫ�鷳����һ���ˡ�����һЩ����������ϸ�����㡣");
        } else if (status == 3) {
            qm.dispose();
        }
    }
}