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
            qm.sendYesNo("СŮ����ð�յ�������ֺ󣬺�ħ��ʦ����Ϣ�����ø�ǿ�ˡ���˵�Ѿ���������Ϊ��ħ��ʦ����Ϣ�����ʵ����ʡ����˱��ʵ�����֮�󣬹���Ҳ����ĸ�ǿ�����뾡��Ա��ʵ����ʽ��з������С������ܰ�����");
        } else if (status == 1) {
            qm.forceStartQuest();
            qm.dispose();
        }
    }
}