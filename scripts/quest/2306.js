/* 
	����: Σ���е�Ģ������
*/

var status = -1;

function start(mode, type, selection) {
    status++;
    if (mode != 1) {
        if (type == 1 && mode == 0) {
            status -= 2;
        } else {
            qm.sendOk("Really? It's an urgent matter, so if you have some time, please see me.");
            qm.dispose();
            return;
        }
    }
    if (status == 0) {
        if (qm.getMapId() == 180000001) {
            qm.sendOk("���ź�������ΪΥ���û����򱻽�ֹ��Ϸ���������������ϵ����Ա.");
            qm.dispose();
        } else {
            qm.sendAcceptDecline("�������ǿ������࣬����һ�������������æ�����Ƿ�Ը��������");
        }
    } else if (status == 1) {
        qm.sendNext("���·�����Ģ�������������������Ҳ��̫��������Ǻ���ܽ�����");
    } else if (status == 2) {
        qm.sendNext("�Ҳ�֪�������ϸ�ڣ�������������æ������ܻ��ʡ�����ʱ�����Ģ��������������һ���ţ������������������ \r\n\r\n#fUI/UIWindow.img/QuestIcon/4/0#\r\n#v4032375# #t4032375#");
    } else if (status == 3) {
        qm.gainItem(4032375, 1);
        qm.forceStartQuest();
        qm.sendYesNo("�����������ȥĢ���Ǳ��Ļ����ҿ�������ȥ����ȷ��Ҫȥ��");
    } else if (status == 4) {
        qm.warp(106020000);
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
        qm.sendNext("�ţ������תְ�̹�����������ż���");
    } else if (status == 1) {
        qm.sendNextPrev("�ҿ���������");
    } else if (status == 2) {
        qm.sendNextPrev("�ðɣ���Ȼ����תְ�̹ٵ��Ƽ��ţ���������һ���ܰ����ˣ��ܱ�Ǹ��û�����ҽ��ܣ����ǰ�ΧĢ���Ǳ����������������������ģ�������������ʱ�Ĳ���֮�أ����ǵ��������⣬������ˣ���ӭ������Ģ��������");
    } else if (status == 3) {
        qm.forceCompleteQuest();
        qm.gainItem(4032375, -1);
        qm.forceStartQuest(2312);
        qm.dispose();
    }
}