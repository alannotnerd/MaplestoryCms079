/*
	����: ��ƿ�е����� - ��ħʮ������
	����: �ӵ����ַ�#o6090004#��ί�С���#m261010003#ȥ���������ɡ���ɺ�ֱ�������ɳĮ������#p9120212#�㱨�ɡ�
	���: 4310018*19 - ʮ�ֽ��
	      1112608*1 - ʮ��������ʿ��ָ III
	      
*/
var status = -1;

function start(mode, type, selection) {
    if (!qm.canHold(4310018, 19) || !qm.canHold(1112608, 1)) {
        qm.sendOk("�����ռ䲻��.");
    } else {
        qm.gainItem(4310018, 19);
        qm.gainItem(1112608, 1);
        qm.forceStartQuest(50701);
        qm.forceCompleteQuest();
    }
    qm.dispose();
}
function end(mode, type, selection) {
    if (!qm.canHold(4310018, 19) || !qm.canHold(1112608, 1)) {
        qm.sendOk("�����ռ䲻��.");
    } else {
        qm.gainItem(4310018, 19);
        qm.gainItem(1112608, 1);
        qm.forceStartQuest(50701);
        qm.forceCompleteQuest();
    }
    qm.dispose();
}