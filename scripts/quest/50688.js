/*
	����: ��ְϮ�� - ��ħʮ������
	����: �ӵ��˰������˵�#b#p9120218##kȥ�ַ�#b#o5220003##k��ָ���#b#m220040200##kȥ���������ɡ�
	���: 4310018*13 - ʮ�ֽ��
	      1112605*1 - ʮ�������ϱ���ָ III
*/
var status = -1;

function start(mode, type, selection) {
    if (!qm.canHold(4310018, 13) || !qm.canHold(1112605, 1)) {
        qm.sendOk("�����ռ䲻��.");
    } else {
        qm.gainItem(4310018, 13);
        qm.gainItem(1112605, 1);
        qm.forceCompleteQuest();
    }
    qm.dispose();
}
function end(mode, type, selection) {
    if (!qm.canHold(4310018, 13) || !qm.canHold(1112605, 1)) {
        qm.sendOk("�����ռ䲻��.");
    } else {
        qm.gainItem(4310018, 13);
        qm.gainItem(1112605, 1);
        qm.forceCompleteQuest();
    }
    qm.dispose();
}