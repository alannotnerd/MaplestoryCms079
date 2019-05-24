/*
	NPC Name: 		Kinu
	Description: 		Quest - Cygnus tutorial helper
*/

var status = -1;

function start(mode, type, selection) {
    if (mode == 1) {
        status++;
    } else {
        if (status == 2) {
            qm.sendNext("��ͨ������������Ĺ������ܡ�");
            qm.safeDispose();
            return;
        }
        status--;
    }
    if (status == 0) {
        qm.sendNext("��һֱ�ڵ��㣬h0#�� �ҵ������� #p1102006# �� �š������������Ѿ�ѧ������ͨ�����ˣ�����ѧ�������ͨ�����������������ѧ����Щ���ܽ����ڷ�Ҷ�������к��а���Ŷ��");
    } else if (status == 1) {
        qm.sendNextPrev("ÿһ��������������Ӧ��#b���ܵ�#k�����԰�#bk#k���鿴��ļ��ܡ��Ѽ��ܵ��������Ҫ�ӵļ������棬�����ˡ����õļ��ܿ����ü������÷����Լ�ϲ���ļ������档");
    } else if (status == 2) {
        qm.askAcceptDecline("�������㻹û���ǣ���ᷢ���������кܶ���ʹ�������ţ�Ǽ��ܣ�������ǣ��ɹ����������Ұɡ��Ҿ���������㡣");
    } else if (status == 3) {
        qm.forceStartQuest();
        qm.summonMsg(8);
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
        qm.sendNext("������ţͶ���������кܶ���Ȥ�ļ��ܡ��ðɣ�����Լ�����ҽ�����һЩ������\r\n\r\n#fUI/UIWindow.img/QuestIcon/4/0# \r\n#fUI/UIWindow.img/QuestIcon/8/0# 40 exp");
    } else if (status == 1) {
        qm.gainItem(4000483, -1);
        qm.forceCompleteQuest();
        qm.gainExp(40);
        qm.dispose();
    }
}