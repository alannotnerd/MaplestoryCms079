var status = -1;

function start(mode, type, selection) {
    if (mode == 1) {
        status++;
    } else {
        if (status == 2) {
            qm.sendNext("�š���˵�����ⷽ���ܹ�����ָ����䡫��������������ֵ��һ�Եġ�");
            qm.dispose();
            return;
        }
        status--;
    }
    if (status == 0) {
        qm.sendNext("Ӣ�ۣ���ã��������ѵ���֪���Լ���Ӣ����ǰ��3���˶�����ô�����ˣ��һ�������������������֪��Ӣ�����ѵ������ˡ�");
    } else if (status == 1) {
        qm.sendNextPrev("�ף�����ô���񲻿��ĵ����ӣ���ʲô�����𣿰�����֪���Լ������ǲ���Ӣ�ۣ���ʧ��������ô�ᡭ���������Ǳ��ⶳ�ڱ������������ĺ���֢��");
    } else if (status == 2) {
        qm.askAcceptDecline("�ţ���Ȼ����Ӣ�ۣ��ӻӽ�Ҳ��ͻ�����ʲô���أ�����ȥ#b���Թ���#k����ô����");
    } else if (status == 3) {
        qm.forceStartQuest();
        qm.sendNext("���ˣ��⸽�������#r#o9300383##k������� #r3ֻ#k���ԣ�˵�������������ʲô�ˡ�");
    } else if (status == 4) {
        qm.sendNextPrevS("Ŷ����Ӧ�û�û������ʹ�ü��ܵķ����ɣ�#b�������ϵ�������ϣ��Է���ʹ��#k�����˼������⣬���ѵ���Ҳ�����ϵ�����������ʹ�á�", 1);
    } else if (status == 5) {
        qm.summonMsg(17);
        qm.dispose();
    }
}

function end(mode, type, selection) {
    if (mode == 1) {
        status++;
    } else {
        if (status == 0) {
            qm.sendNext("ʲô���㲻��Ҫҩˮ��");
            qm.dispose();
            return;
        }
        status--;
    }
    if (status == 0) {
        qm.sendYesNo("�š�������ı����֪����ɶ��û���������������õ��ġ�˵�����ⷴ�����á�����������һЩҩˮ�����Ͱɣ�\r\n\r\n#fUI/UIWindow.img/QuestIcon/4/0#\r\n#v2000022# 10�� #t2000022#\r\n#v2000023# 10�� #t2000023#\r\n\r\n#fUI/UIWindow.img/QuestIcon/8/0# 57 exp");
    } else if (status == 1) {
        qm.gainItem(2000022, 10);
        qm.gainItem(2000023, 10);
        qm.gainExp(57);
        qm.forceCompleteQuest();
        qm.sendOkS("#b�������������Ӣ�ۡ���һ��ʲô������û�е�Ӣ��������ʲô���أ���#k", 2);
        qm.dispose();
    }
}