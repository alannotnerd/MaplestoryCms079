/*
	NPC Name: 		Kisan
	Description: 		Quest - Cygnus tutorial helper
*/

var status = -1;

function start(mode, type, selection) {
    if (mode == 1) {
        status++;
    } else {
        if (status == 2) {
            qm.sendNext("�㲻��Ҫ���������");
            qm.safeDispose();
            return;
        }
        status--;
    }
    if (status == 0) {
        qm.sendNext("����෽ʽ���������ԣ� ����������ķ�ʽ����#b������������#k����ֻҪһ��������ֻҪ�򵥵Ĳ����Ϳ���ɱ�����ˡ�");
    } else if (status == 1) {
        qm.sendNextPrev("�� #bCtrl#k ��������ͨ������ ����㲻����������������������½ǵļ������ô����������İ�����");
    } else if (status == 2) {
        qm.askAcceptDecline("��һ�°ɣ�������ҵ� #r#o100120##k�� ������ǣ�Ȼ�����̸����");
    } else if (status == 3) {
        qm.forceStartQuest();
        qm.summonMsg(4);
        qm.dispose();
    }
}

function end(mode, type, selection) {
    if (mode == 1) {
        status++;
    } else {
        status--;
    }
    if (status == 0) {
        qm.sendNext("�ޣ��������Ѿ��ɹ������ #o100120#�� �ܼ򵥣���������Щֻ����ͨ�Ĺ���������Ĺ���������ǳ�Σ�յ����硣���ˣ��������Ѿ�ͨ�����ҵĲ��ԣ����͸���һ�㶫���ɡ�");
    } else if (status == 1) {
        qm.gainItem(1002869, 1);
        qm.gainItem(1052177, 1);
        qm.forceCompleteQuest();
        qm.gainExp(30);
        qm.summonMsg(6);
        qm.dispose();
    }
}