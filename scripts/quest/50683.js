/*
	����: ʱ�侲ֹ֮����ʮ������
	����: �ӵ���ʮ�����Ű���ʱ�侲ֹ֮��������ָ�ȥ����ʱ�侲ֹ֮����#p9120210#�ɡ�
*/
var status = -1;

function start(mode, type, selection) {
    qm.sendOk("ȥʱ�侲ֹ֮����#p9120210#��");
    qm.forceCompleteQuest();
    qm.dispose();
}
function end(mode, type, selection) {
    qm.dispose();
}