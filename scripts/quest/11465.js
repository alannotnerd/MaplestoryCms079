/**
 *	ʱ��ʯ֧Ԯ
 */
var status = -1;

function start(mode, type, selection) {
    if (mode == 0 && status == 0) {
        qm.sendOk("�����������͵ġ������������ȡ�������������˵����");
        qm.dispose();
        return;
    } else if (mode == 0) {
        status--;
    } else {
        status++;
    }
    if (status == 0) {
        qm.sendYesNo("��ã�#b#h0##k���ڴ�˵���껪�ڼ䣬ÿ�춼�ᷢ�ſ����ƶ����κδ�ׯ��#b#t2430455##kһ�Ρ�����������ȡ��");
    } else if (status == 1) {
        if (qm.canHold(2430455)) {
            qm.gainItem(2430455, 1);
            qm.forceCompleteQuest();
            qm.sendOk("#b#t2430455##k����30���ӵ���ȴʱ�䡣ϣ����ú�ʹ�ã���ð�յ��ȹ����ֵ�ʱ�⡫");
        } else {
            qm.sendOk("�����ռ䲻��.");
        }
        qm.dispose();
    }
}

function end(mode, type, selection) {
}