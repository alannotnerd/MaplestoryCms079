/*
	����: ɭ��������� - ��ħʮ������
	����: �յ����йر�����#p9120218#��λ�õ��鱨���ӵ���ץ��#p9120218#�����������Ǳ������𣿿��ȥ#b#m240010901##k�ҿ����࣡
	���: 4310018*35 - ʮ�ֽ��
	      1112613*1 - ʮ�����Ž�ħ��ָ
*/
var status = -1;

function start(mode, type, selection) {
    qm.dispose();
}

function end(mode, type, selection) {
    if (!qm.canHold(4310018, 35) || !qm.canHold(1112613, 1)) {
        qm.sendOk("�����ռ䲻��.");
    } else {
        qm.gainItem(4310018, 35);
        qm.gainItem(1112613, 1);
        qm.forceCompleteQuest();
    }
    qm.dispose();
}