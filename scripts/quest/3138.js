/*
	���� - �ž��ĳǱ��
*/
var status = -1;

function start(mode, type, selection) {
    if (mode == -1) {
        qm.dispose();
    } else {
        if (mode == 1) {
            status++;
        } else {
            if (status == 3) {
                qm.sendNext("���û��������ô������˰��ҵĻ����ҾͲ����ܶ�������е��顣�����ٿ���һ����");
                qm.dispose();
            }
            status--;
        }
        if (status == 0) {
            if (qm.getMapId() == 180000001) {
                qm.sendOk("���ź�������ΪΥ���û����򱻽�ֹ��Ϸ���������������ϵ����Ա.");
                qm.dispose();
            } else {
                qm.PlayerToNpc("��˭����д�����أ�û�з����ˡ���Ҫ��һ����");
            }
        } else if (status == 1) {
            qm.sendNextPrev("���Ķ�����ŵ�ð�ռң�\r\n\r\n����ʮ�����˵Ĺ���Ա������#b#p2161012##k���Ҿͳ�����˵�ˡ�����ʮ�����˵Ĺ���Ա����ð�յ���������߶���ִ������а����������");
        } else if (status == 2) {
            qm.sendNextPrev("�������������ڵĵط�����#rʨ����֮��#k����ɢ����֮ǰ�Ҵ�û������ǿ�Һڰ���Ϣ���Ҹо����˱ȱ���ѩ��ĺ���������ķεĿֲ���");
        } else if (status == 3) {
            qm.sendYesNo("Ϊ������ҵ�������Ҫ�������������ð�ռҵİ�����Ը������ҵĻ�����������¿���");
        } else if (status == 4) {
            qm.sendNext("лл��������������һ�Σ�˵�����Ѿ����������ˡ�����ʱ����ȣ�������������������һ��Сħ����������֮����ͻ��ƶ��������ڵĵط�����ô��һ�������");
        } else if (status == 5) {
            qm.forceStartQuest();
            qm.warp(211060000);
            qm.dispose();
        }
    }
}

function end(mode, type, selection) {
    qm.dispose();
}