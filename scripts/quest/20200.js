/*
 * Cygnus 2nd Job advancement
 */

var status = -1;

function start(mode, type, selection) {
    qm.sendNext("�������μ���ʿ�ȼ����ԣ�������ʱ��ʥ�ء�������ʿ�ų��������������в��ԣ�����ϸ񣬾ͻ�������Ϊ��ʽ����ʿ���ټ�����");
    qm.forceStartQuest();
    qm.dispose();
}

function end(mode, type, selection) {
    qm.dispose();
}