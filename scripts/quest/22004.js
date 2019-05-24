var status = -1;

function start(mode, type, selection) {
    status++;
    if (mode != 1) {
        if (type == 1 && mode == 0) {
            status -= 2;
        } else {
            qm.sendNext("�š���#p1013101#�Ļ���Ӧ�þ��ܰ����ˡ�");
            qm.dispose();
            return;
        }
    }
    if (status == 0) {
        qm.sendNext("���ũ���ϵ�#o1210100#�е���֡�������Ե�޹ʵط�Ƣ��������һЩ���˵����顣�ҶԴ˺ܵ��ģ����Խ������ͳ����ˡ���Ȼ��һֻ#o1210100#�������ʣ��ӵ�����ȥ�ˡ�");
    } else if (status == 1) {
        qm.sendAcceptDecline("���ҵ�#o1210100#֮ǰ�������Ȱѻ��˵�����޺á����û��ò���̫���أ�ֻҪ�м���#t4032498#Ӧ�þ����޺��ˡ�С���㣬Ҫ�����ܰ����Ѽ�#b3��#t4032498##k�ͺ��ˡ���");
    } else if (status == 2) {
        qm.forceStartQuest();
        qm.sendNext("Ŷ������лл�㡣#b#t4032498##k���Դ���Χ��#r#o0130100##k�����Ѽ�����������Ȼ���Ǻ�ǿ������С�ĵĻ������ܻ�����Σ�ա���һ��Ҫ�ú�ʹ�ü��ܵ��ߡ�");
    } else if (status == 3) {
        qm.evanTutorial("UI/tutorial/evan/6/0", 1);
        qm.dispose();
    }
}

function end(mode, type, selection) {
    status++;
    if (mode != 1) {
        if (type == 1 && mode == 0) {
            status -= 2;
        } else {
            qm.dispose();
            return;
        }
    }
    if (status == 0) {
        qm.sendNext("Ŷ��#t4032498#�Ѽ����������˲�����Ӧ�ø���ʲô��Ϊ�����ء������ˣ������Ǹ������� \r\n\r\n#fUI/UIWindow.img/QuestIcon/4/0# \r\n#i3010097# #t3010097#1�� \r\n#i2022621# #t2022621# 15��\r\n#i2022622# #t2022622# 15�� \r\n\r\n#fUI/UIWindow.img/QuestIcon/8/0# 210 exp");
    } else if (status == 1) {
        qm.forceCompleteQuest();
        qm.gainItem(4032498, -3);
        qm.gainItem(3010097, 1);
        qm.gainItem(2022621, 15);
        qm.gainItem(2022622, 15);
        qm.gainExp(210);
        qm.sendNextPrev("���ˣ������������ʣ�µ�ľ������һ�����ӡ���Ȼ��̫�ÿ�����ȴ�ܽ�ʵ���͸����ðɡ�");
    } else if (status == 2) {
        qm.evanTutorial("UI/tutorial/evan/7/0", 1);
        qm.dispose();
    }
}