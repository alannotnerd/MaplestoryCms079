/*
	����: ȥ�ɣ����ű���ѩ��
	����: ��#b#p9120206##k������Խ���ʮ�����ŵ�ָ����������Ĵ�ׯ��ȥ�������ɡ�
*/
var status = -1;

function start(mode, type, selection) {
    qm.sendNext("Come to El Nath.");
    qm.forceCompleteQuest();
    qm.dispose();
}
function end(mode, type, selection) {
    qm.dispose();
}