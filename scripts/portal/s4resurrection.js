function enter(pi) {
    if (pi.getQuestStatus(6132) == 1) {
        var em = pi.getEventManager("s4resurrection");
        if (em == null) {
            pi.playerMessage("����δ֪��ԭ���㲻�ܽ��뵽���棬������һ�Ρ�");
        } else { // 923000100
            var prop = em.getProperty("started");
            if (prop == null || prop.equals("false")) {
                em.startInstance(pi.getPlayer());
                return true;
            } else {
                pi.playerMessage("�Ѿ����˽���������");
            }
        }
    } else {
        pi.playerMessage("�㲻�ܽ��뵽���档");
    }
    return false;
}