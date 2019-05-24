function enter(pi) {
    if (pi.getQuestStatus(6134) == 1) {
        var em = pi.getEventManager("s4resurrection2");
        if (em == null) {
            pi.playerMessage("由于未知的原因，你不能进入到里面。");
        } else {
            var prop = em.getProperty("started");
            if (prop == null || prop.equals("false")) {
                em.startInstance(pi.getPlayer());
                return true;
            } else {
                pi.playerMessage("已经有人在挑战任务。");
            }
        }
    } else {
        pi.playerMessage("你不能进入到里面。");
    }
    return false;
}