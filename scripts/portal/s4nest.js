function enter(pi) {
    if (pi.getQuestStatus(6241) == 1 || pi.getQuestStatus(6243) == 1) {
        if (pi.getJob() == 312) {
            if (pi.haveItem(4001113)) {
                if (pi.getPlayerCount(924000100) > 0) {
                    pi.playerMessage("��ս�Ѿ���ʼ�ˣ��㲻�ܽ�ȥ��");
                    return false;
                }
                var em = pi.getEventManager("s4nest");
                if (em == null) {
                    pi.playerMessage("����δ֪��ԭ���㲻�ܽ��롣");
                } else {
                    em.startInstance(pi.getPlayer());
                    return true;
                }
            } else {
                pi.playerMessage("��û�л��˵��ѣ����ܽ��롣");
            }
        } else if (pi.getJob() == 322) {
            if (pi.haveItem(4001114)) {
                if (pi.getPlayerCount(924000100) > 0) {
                    pi.playerMessage("��ս�Ѿ���ʼ�ˣ��㲻�ܽ�ȥ��");
                    return false;
                }
                var em = pi.getEventManager("s4nest");
                if (em == null) {
                    pi.playerMessage("����δ֪��ԭ���㲻�ܽ��롣");
                } else {
                    em.startInstance(pi.getPlayer());
                    return true;
                }
            } else {
                pi.playerMessage("��û�б���˵��ѣ����ܽ��롣");
            }
        }
    } else {
        pi.playerMessage("δ֪�������赲�����ǰ����");
    }
    return false;
}