function act() {
    rm.mapMessage(6, "һ��λ���Ѿ��ƶ�.");
    var em = rm.getEventManager("OrbisPQ");
    if (em != null) {
        em.setProperty("stage", parseInt(em.getProperty("stage")) + 1);
        var r = rm.getMap().getReactorByName("minerva");
        r.forceHitReactor(r.getState() + 1);
    }
}