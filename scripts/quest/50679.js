/*
	����: �ȹ��������µ�Ů��
	����: ������#b#p9120219##k˵������������ҡ�
	���: 4310018*5 - ʮ�ֽ��
	      1112601*1 - ʮ������������ָ II
*/
var status = -1;

function start(mode, type, selection) {
    if (!qm.canHold(4310018, 5) || !qm.canHold(1112601, 1)) {
        qm.sendOk("�����ռ䲻��.");
    } else {
        qm.gainItem(4310018, 5);
        qm.gainItem(1112601, 1);
        qm.forceStartQuest(50682);
        qm.forceStartQuest(50686);
        qm.forceCompleteQuest();
    }
    qm.dispose();
}
function end(mode, type, selection) {
    if (!qm.canHold(4310018, 5) || !qm.canHold(1112601, 1)) {
        qm.sendOk("�����ռ䲻��.");
    } else {
        qm.gainItem(4310018, 5);
        qm.gainItem(1112601, 1);
        qm.forceStartQuest(50682);
        qm.forceStartQuest(50686);
        qm.forceCompleteQuest();
    }
    qm.dispose();
}