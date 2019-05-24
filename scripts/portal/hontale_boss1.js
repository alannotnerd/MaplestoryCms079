function enter(pi) {
    var em = pi.getEventManager("HorntailBattle");
    if (em != null) {
        var prop = em.getProperty("preheadCheck");
        if (prop != null && prop.equals("0")) {
            pi.mapMessage(6, "欢迎来到试练洞穴，这里是黑龙左头的试练！")
            em.setProperty("preheadCheck", "1");
        }
    }
}