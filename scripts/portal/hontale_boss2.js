function enter(pi) {
    var em = pi.getEventManager("HorntailBattle");
    if (em != null) {
        var prop = em.getProperty("preheadCheck");
        if (prop != null && prop.equals("2")) {
            pi.mapMessage(6, "��ӭ����������Ѩ2�������ǰ��������ұ�ͷ­��������")
            em.setProperty("preheadCheck", "3");
        }
    }
}