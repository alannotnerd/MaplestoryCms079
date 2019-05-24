function enter(pi) {
    var em = pi.getEventManager("HorntailBattle");
    if (em != null) {
        var prop = em.getProperty("preheadCheck");
        if (prop != null && prop.equals("2")) {
            pi.mapMessage(6, "欢迎来到试练洞穴2，这里是暗黑龙王右边头颅的试练！")
            em.setProperty("preheadCheck", "3");
        }
    }
}