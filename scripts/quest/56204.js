/*
	���� - δ������Ҷ��
*/

var status = -1;

function start(mode, type, selection) {
    if (mode == 1) {
        status++;
    } else {
        if (status == 0) {
            qm.sendOk("������������ô��С����������ô�ܰ��������˵�ħ���أ�");
            qm.safeDispose();
            return;
        }
        status--;
    }
    if (status == 0) {
        qm.sendYesNo("�Ѿ�û�й�������");
    } else if (status == 1) {
        qm.PlayerToNpc("�������ﰡ����Щ���ﵽ���ǡ���");
    } else if (status == 2) {
        qm.sendNextPrev("��������Ҷ�ǣ���ղ�ͨ���������ţ�������Щ������Ϊ�˻ص���ȥ����Ҷ�ǣ������õ�ʱ���ţ�");
    } else if (status == 3) {
        qm.PlayerToNpc("���������δ������Ҷ�ǣ����⵽������ô�����أ�");
    } else if (status == 4) {
        qm.sendNextPrev("��Ҷ��ԭ����һ����ƽ���Ĵ�ׯ����ͻȻ��һ�죬��Щ�����˴��˽�������ׯ�ͱ��������������ӡ���");
    } else if (status == 5) {
        qm.PlayerToNpc("�ɶ�������ˡ������ǵ���ΪʲôҪ��ô������");
    } else if (status == 6) {
        qm.sendNext("������֪������Ҷ�ǵĵ����������������Ҫ�Ŀ����������������������Ǿʹ������������ð������������ҲΪ�˱�����ׯ��ս���������ǵ�����̫�١��������ڱ�����ڵ��������");
    } else if (status == 7) {
        qm.sendNext("�㿴��ȥ���������ܲ��ܰ�����");
    } else if (status == 8) {
        qm.forceStartQuest();
        qm.dispose();
    }
}

function end(mode, type, selection) {
    qm.dispose();
}