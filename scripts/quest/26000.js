/* ���ŵ�G-ҩˮ */

var status = -1;

function start(mode, type, selection) {
    if (mode == 1) {
        status++;
    } else {
        qm.sendNext("�㲻��������ȡ����Ҫ�Ļ���������һ֮�����ߡ�");
        qm.dispose();
        return;
    }
    if (qm.getGuild().getLevel() < 1 || !qm.getGuild().hasSkill(91000006)) {
        qm.dispose();
        return;
    }
    if (status == 0) {
        qm.sendYesNo("���嶨��֧Ԯ��Ʒ���ˡ��������š�ϣ���㲻Ҫ��ʲô������Ŭ������ȼ���ȼ����֮�󣬾Ϳ��Ի�ø���Ķ����ˡ�");
    } else {
        if (!qm.canHold(2002037, qm.getGuild().getLevel() * 20)) {
            qm.sendOk("��ȷ�������㹻�ı����ռ䡣");
        } else {
            qm.gainItemPeriod(2002037, qm.getGuild().getLevel() * 20, 7);
            qm.forceCompleteQuest();
            qm.sendNext("��һ���������ˡ�����һ��ʱ�򣬻������µ�֧Ԯ��Ʒ����ʱ���ٹ���������");
        }
        qm.dispose();
    }
}

function end(mode, type, selection) {
    if (mode == 1) {
        status++;
    } else {
        qm.sendNext("�㲻��������ȡ����Ҫ�Ļ���������һ֮�����ߡ�");
        qm.dispose();
        return;
    }
    if (qm.getGuild().getLevel() < 1 || !qm.getGuild().hasSkill(91000006)) {
        qm.dispose();
        return;
    }
    if (status == 0) {
        qm.sendYesNo("���嶨��֧Ԯ��Ʒ���ˡ��������š�ϣ���㲻Ҫ��ʲô������Ŭ������ȼ���ȼ����֮�󣬾Ϳ��Ի�ø���Ķ����ˡ�");
    } else {
        if (!qm.canHold(2002037, qm.getGuild().getLevel() * 20)) {
            qm.sendOk("��ȷ�������㹻�ı����ռ䡣");
        } else {
            qm.gainItemPeriod(2002037, qm.getGuild().getLevel() * 20, 7);
            qm.forceCompleteQuest();
            qm.sendNext("��һ���������ˡ�����һ��ʱ�򣬻������µ�֧Ԯ��Ʒ����ʱ���ٹ���������");
        }
        qm.dispose();
    }
}