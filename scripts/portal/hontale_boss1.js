function enter(pi) {
    var em = pi.getEventManager("HorntailBattle");
    if (em != null) {
        var prop = em.getProperty("preheadCheck");
        if (prop != null && prop.equals("0")) {
            pi.mapMessage(6, "��ӭ����������Ѩ�������Ǻ�����ͷ��������")
            em.setProperty("preheadCheck", "1");
        }
    }
}