function enter(pi) {
    if (pi.getQuestStatus(6134) == 1) {
        var em = pi.getEventManager("s4resurrection2");
        if (em == null) {
            pi.playerMessage("����δ֪��ԭ���㲻�ܽ��뵽���档");
        } else {
            var prop = em.getProperty("started");
            if (prop == null || prop.equals("false")) {
                em.startInstance(pi.getPlayer());
                return true;
            } else {
                pi.playerMessage("�Ѿ���������ս����");
            }
        }
    } else {
        pi.playerMessage("�㲻�ܽ��뵽���档");
    }
    return false;
}