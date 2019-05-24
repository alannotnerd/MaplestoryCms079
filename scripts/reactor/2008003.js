function act() {
    rm.mapMessage(6, "一个位置已经移动.");
    var em = rm.getEventManager("OrbisPQ");
    if (em != null) {
        em.setProperty("stage", parseInt(em.getProperty("stage")) + 1);
        var r = rm.getMap().getReactorByName("minerva");
        r.forceHitReactor(r.getState() + 1);
    }
}