/*
	����: ʮ������
	����: ��һ������ʮ�����ŵ������������ӵ������顣���������Ĵ�ׯ��Ѱ��ʮ�����ŵ�#b#p9120206##k��������Ի��ɡ�
*/
var status = -1;

function start(mode, type, selection) {
    qm.sendNext("Join the Silent Crusade...");
    qm.forceCompleteQuest();
    qm.dispose();
}
function end(mode, type, selection) {
    qm.dispose();
}