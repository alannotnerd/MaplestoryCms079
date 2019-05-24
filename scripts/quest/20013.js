/*
	NPC Name: 		Kia
	Description: 		Quest - Cygnus tutorial helper
*/

var status = -1;

function start(mode, type, selection) {
    if (mode == 1) {
	status++;
    } else {
	if (status == 2) {
	    qm.sendNext("�š������Ҿ������");
	    qm.safeDispose();
	    return;
	}
	status--;
    }
    if (status == 0) {
	qm.sendNext("#b(*��������������*)#k");
    } else if (status == 1) {
	qm.sendNextPrev("���� �٣� ��������һ�����Ҷ���֪���п����ˡ� ��һ���Ǹղź� #p1102006# ������˰ɡ���ӭ�㣡���� #p1102007#�����ҵ�����Ʒ #b����#k�����ڿ�����һ����ϲ�������");
    } else if (status == 2) {
	qm.sendNextPrev("�ȵȣ� �Ҳ��ܰװ׵��͸��㶫������Ϊ�ҵĲ���û���ˣ� ������ҵ���������Ĳ����� �㿴����Χ����ط��� ����Կ����кܶ����ӣ� ����Դ��� #t4032267# �� #t4032268# ������");
    } else if (status == 3) {
	qm.sendNextPrev("��֪����ô�����������õ������أ���Ͱ���ǰ�����ӵ�����һ�����ʹ����ͨ�������������������Σ��Ϳ��Ի�ȡ����Ĳ����ˡ�");
    } else if (status == 4) {
	qm.askAcceptDecline("����� 1�� #b#t4032267##k �� 1�� #b#t4032268##k ������Щ�����ҽ�����һ�����");
    } else if (status == 5) {
	qm.forceStartQuest();
	qm.summonMsg(9);
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
	qm.sendNext("���������Ҫ�Ķ����������ҿ����� �ޣ� ��Щ������������Ҫ�ġ� ���ǵ�ȷ��һ�� #t4032267# ��һ�� #t4032268#���һ�����Щ�����͸���һ�����ӡ�");
    } else if (status == 1) {
	qm.sendNextPrev("����������� #t3010060#���������ô������Ư���ɡ� �������ӣ�����Ը���Ļظ�HP\MP�� ���Է��ڿ�ݼ��ϳ��������ˣ��͵������ˣ�ף����죡 \r\n\r\n#fUI/UIWindow.img/QuestIcon/4/0# \r\n#i3010060# 1 #t3010060# \r\n#fUI/UIWindow.img/QuestIcon/8/0# 95 exp");
    } else if (status == 2) {
	qm.gainItem(4032267, -1);
	qm.gainItem(4032268, -1);
	qm.gainItem(3010060, 1);
	qm.forceCompleteQuest();
	qm.forceCompleteQuest(20000);
	qm.forceCompleteQuest(20001);
	qm.forceCompleteQuest(20002);
	qm.forceCompleteQuest(20015);
	qm.gainExp(95);
	qm.summonMsg(10);
	qm.dispose();
    }
}