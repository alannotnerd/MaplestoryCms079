function enter(pi) {
    if (pi.getQuestStatus(2073) == 1) {
        pi.warp(900000000, 0);
        return true;
    } else {
        pi.playerMessage(5, "���ص�������ֹ�����ǰ��...");
        return false;
    }
}