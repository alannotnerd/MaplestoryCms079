var status = -1;

function start(mode, type, selection) {
    status++;
    if (mode != 1) {
        if (type == 1 && mode == 0) {
            status -= 2;
        } else {
            qm.sendNext("�ţ�ʲô������ ���յĺ��� ��û�뵽�ҵܵ���ô��С��");
            qm.dispose();
            return;
        }
    }
    if (status == 0) {
        qm.sendAcceptDecline("�㲻�������������ļ���ô����ǰ��һ���ˣ���ǰ���ǻ��ºܶ� ���� ��������Խ��Խ���ˡ��ǲ�����Ϊ�����������أ������Ļ�������Ͻ���취���С���˵�Բ��ԣ�");
    } else if (status == 1) {
        qm.forceStartQuest();
        qm.sendNext("�ðɣ�������ȥ�������ɡ�����ȥ #b��Ժ#k ����#r10ֻ ���յĺ���#k ���һḺ��ʣ�µ�����ġ����ˣ���쵽 ��Ժ ȥ�ɡ�");
    } else if (status == 2) {
        qm.evanTutorial("UI/tutorial/evan/10/0", 1);
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
        qm.sendNext("���յĺ��꣬���������");
    } else if (status == 1) {
        qm.PlayerToNpc("#b��˵Ҫȥ��ʰʣ�µĺ���ģ���ô���£�");
    } else if (status == 2) {
        qm.sendNextPrev("�����Ǹ���Һ�����ȥ�ˣ����ߴ���·���±� #o9300385# ץȥ�����ʣ����Ծͻ����ˡ�");
    } else if (status == 3) {
        qm.PlayerToNpc("#b�ò����Ǻ��º�����������˰ɣ�");
    } else if (status == 4) {
        qm.sendNextPrev("���ں�˵ʲô��������Ϊʲô�Ầ�º��ꣿ����һ�㶼�����º��꣡");
    } else if (status == 5) {
        qm.PlayerToNpc("#b����������һֻ #o9300385# !");
    } else if (status == 6) {
        qm.sendNextPrev("�������������");
    } else if (status == 7) {
        qm.PlayerToNpc("#b����");
    } else if (status == 8) {
        qm.sendNextPrev("......");
    } else if (status == 9) {
        qm.sendNextPrev("��������һ���Ÿ���ң�����ҵ����಻�ã������ܾ��ţ�");
    } else if (status == 10) {
        qm.PlayerToNpc("#b(���Խи��Ų�Ը��ȥ������ȥ��)");
    } else if (status == 11) {
        qm.sendNextPrev("�ߺߣ��������������յĺ��� ������ˡ��������ˡ��Ұ�һ��·����ð�ռ����ҵĶ����͸��㣬��Ϊ����ı��ꡣ�������š� \r\n\r\n#fUI/UIWindow.img/QuestIcon/4/0# \r\n#i1372043# 1�� #t1372043# \r\n#i2022621# 25�� #t2022621# \r\n#i2022622# 25�� #t2022622#s \r\n\r\n#fUI/UIWindow.img/QuestIcon/8/0# 910 exp");
    } else if (status == 12) {
        qm.forceCompleteQuest();
        qm.gainItem(1372043, 1);
        qm.gainItem(2022621, 25);
        qm.gainItem(2022622, 25);
        qm.gainExp(910);
        qm.sendNextPrev("��#bħ��ʦ�Ĺ����������ȡ�#k ��Ȼ��Ҳ����ûʲô�ã����������ﵽ���ߣ����Ǻ�˧�ģ���������");
    } else if (status == 13) {
        qm.sendPrev("���������ȷʵ�����ˣ��԰ɣ���֡����������Ϊʲô�������أ������������һ�¡�");
        qm.dispose();
    }
}