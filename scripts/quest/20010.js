/*
	NPC Name: 		Kimu
	Description: 		Quest - Cygnus tutorial helper
*/

var status = -1;

function start(mode, type, selection) {
    if (mode == 1) {
        status++;
    } else {
        if (status == 3) {
            qm.sendNext("��һֱ����������ı�ע�⣬�����ٴ������ҡ�");
            qm.safeDispose();
            return;
        }
        status--;
    }
    if (status == 0) {
        qm.sendNext("��ӭ����ʥ�أ�����˭�� �ޣ����� #b#h0##k�� �ܸ��˼����㣡 �����������þ��ˣ� �㽫��Ϊһ��ð�յ���ʿ�� ���� �ҵ������� #p1102004#��");
    } else if (status == 1) {
        qm.sendNextPrev("��������Ϊð�յ���ʿ���е�һԱ������������Աߵ���λ�����������԰������Ϊð�յ���ʿ���е�һԱ��");
    } else if (status == 2) {
        qm.sendNextPrev("�ޣ���������һ�£������һ�����������ż������ע�⵽��NPCͷ����ż�����е��ݣ��ǳ�֮Ϊ#b����QUEST��#k����������㽫���Եõ��ܶ�ḻ�Ľ�����");
    } else if (status == 3) {
        qm.askAcceptDecline("��Ը����� #b#p1102005##k�� ����֪����ô������������ҵ� #p1102005# ��������ô���ԣ�");
    } else if (status == 4) {
        qm.forceStartQuest();
        qm.summonMsg(2);
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
        qm.sendNext("Are you the Noblesse my brother #p1102004# sent? Nice to meet you! I''m #p1102005#. I'll give you the reward #p1102004# asked me to give you. Remember, you can check your Inventory by pressing the #bI key#k. Red potions help you recover HP, and blue ones help recover MP. It's a good idea to learn how to use them beforehand so you''ll be ready with them when you're in danger. \r\n\r\n#fUI/UIWindow.img/QuestIcon/4/0# \r\n#i2000020# 5 #t2000020# \r\n#i2000021# 5 #t2000021# 5 \r\n\r\n#fUI/UIWindow.img/QuestIcon/8/0# 15 exp");
    } else if (status == 1) {
        qm.gainItem(2000020, 5);
        qm.gainItem(2000021, 5);
        qm.forceCompleteQuest();
        qm.gainExp(15);
        qm.summonMsg(3);
        qm.dispose();
    }
}