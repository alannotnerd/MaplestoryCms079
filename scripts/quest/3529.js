/*
	NPC Name: 		Grendel the really old
	Description: 		Quest - In search of the lost memory
*/
var status = -1;

function start(mode, type, selection) {
    if (mode == -1) {
        qm.dispose();
    } else {
        if (mode == 1) {
            status++;
        } else {
            status--;
        }
        if (status == 0) {
            qm.sendNext("����ԭ�����㡣û�뵽�ܾ�֮���ܿ����㡣�Һܸ��˿�����������ɬ�����ֵ����Ϊ�˴�ħ��ʦ�������ܾò��������ǵ��ҵ��㣬�ҵ������������ů��������Ѱ�������ļ��������������Ѿ��Ǻܾúܾ���ǰ�����ˣ��¸����꣬�������˻���������ɡ�����ȥ#b�Թ���#k�ɡ�������������㡣��ô�ټ�����");
            qm.forceCompleteQuest();
            qm.forceCompleteQuest(3507);
            qm.dispose();
        }
        //qm.forceStartQuest();
    }
}

function end(mode, type, selection) {
    if (mode == -1) {
        qm.dispose();
    } else {
        if (mode == 1) {
            status++;
        } else {
            status--;
        }
        if (status == 0) {
            qm.sendNextPrev("Test");
            qm.dispose();
        }
    }
}