function enter(pi) {
    if (pi.getQuestStatus(6132) == 1) {
        var em = pi.getEventManager("s4resurrection");
        if (em == null) {
            pi.playerMessage("由于未知的原因，你不能进入到里面，请再试一次。");
        } else { // 923000100
            var prop = em.getProperty("started");
            if (prop == null || prop.equals("false")) {
                em.startInstance(pi.getPlayer());
                return true;
            } else {
                pi.playerMessage("已经有人进入了任务。");
            }
        }
    } else {
        pi.playerMessage("你不能进入到里面。");
    }
    return false;
}