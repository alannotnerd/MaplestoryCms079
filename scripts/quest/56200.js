/*
	���� - �����־������
*/
var status = -1;

function start(mode, type, selection) {
    if (mode == -1) {
        qm.dispose();
    } else {
        if (mode == 1) {
            status++;
        } else {
            if (status == 0) {
                qm.dispose();
                return;
            } else if (status == 1) {
                qm.sendOk("���û���������������ء���");
                qm.dispose();
            }
            status--;
        }
        if (status == 0) {
            qm.sendNext("���ء�����û���������Ұ������ǴӰ��¶�˹̹����Ҷ�������еģ�����ͻȻ��һ����ֵĴ��ű��򿪣��кܶ����������ų������ץ������Ҷ�ǵ�����ռ������Ҷ�ǣ�");
        } else if (status == 1) {
            qm.sendYesNo("ð�ռң���ɲ���������Ҷ�Ǿ��Ұ���");
        } else if (status == 2) {
            qm.forceCompleteQuest();
            qm.forceCompleteQuest(56201);
            qm.forceCompleteQuest(56202);
            qm.forceCompleteQuest(56203);
            qm.warp(703000000, 0); //703100010
            qm.dispose();
        }
    }
}

function end(mode, type, selection) {
    qm.dispose();
}