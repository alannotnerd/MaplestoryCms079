/*
	����: �������ƶ�����
	����: #o9400295#�����š�����Ϊ����ֹ������ϵ�2102��ĺ�����ҵ��������Ҫѯ������ȥ����ó���ĵ�#p9120033#��ѧ��ͨ����ó���ĵ�·���������һ����ս�������¶����ġ�
*/
var status = -1;

function start(mode, type, selection) {
    if (mode == -1) {
        qm.dispose();
    } else {
        if (mode == 1) {
            status++;
        }
        if (status == 0) {
            qm.sendNext("Okay, so you are going to the battle as well. Thanks... Just letting you know, the enemy is probably more powerful than anything you've ever faced, Are you ready?");
        } else if (status == 1) {
            qm.warp(802000800, 0);
            qm.forceStartQuest();
            qm.dispose();
        }
    }
}

function end(mode, type, selection) {
}