/*
	����: ͻϮ��- ��ħʮ������
	����: ��֪#b#p9120217##k������ʮ�����ţ�������������׷���������˲������š���˵��Ҫȥ��#b#o9400729##k��ͷ���Ͽ쵽#b#m251010500##kȥ׷�����ɡ�
	���: 4310018*25 - ʮ�ֽ��
	      1112611*1 - ʮ������Ӣ�۽�ָ III
*/
var status = -1;

function start(mode, type, selection) {
    if (!qm.canHold(4310018, 25) || !qm.canHold(1112611, 1)) {
        qm.sendOk("�����ռ䲻��.");
    } else {
        qm.gainItem(4310018, 25);
        qm.gainItem(1112611, 1);
        qm.forceCompleteQuest(50709);
        qm.sendOk("Come to Leafre.");
        qm.forceCompleteQuest();
    }
    qm.dispose();
}
function end(mode, type, selection) {
    if (!qm.canHold(4310018, 25) || !qm.canHold(1112611, 1)) {
        qm.sendOk("�����ռ䲻��.");
    } else {
        qm.gainItem(4310018, 25);
        qm.gainItem(1112611, 1);
        qm.forceCompleteQuest(50709);
        qm.sendOk("Come to Leafre.");
        qm.forceCompleteQuest();
    }
    qm.dispose();
}