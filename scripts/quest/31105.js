/*
	����: ���ƻ������ִ�
	����: ���ϰ���˹�˽�δ���������
*/
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
        if (status == -1) {
            qm.dispose();
        } else if (status == 0) {
            qm.sendNext("һ�ж�����Ϊ�ڰ�ħ��ʦ��ԭ�򡭡���")
        } else if (status == 1) {
            qm.sendNext("��ȥ���ʇ����ȣ��������ҵ��Աߡ�")
            qm.forceStartQuest();
            qm.dispose();
        }
    }
}

function end(mode, type, selection) {
    qm.dispose();
}