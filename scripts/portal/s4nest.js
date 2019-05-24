function enter(pi) {
    if (pi.getQuestStatus(6241) == 1 || pi.getQuestStatus(6243) == 1) {
        if (pi.getJob() == 312) {
            if (pi.haveItem(4001113)) {
                if (pi.getPlayerCount(924000100) > 0) {
                    pi.playerMessage("挑战已经开始了，你不能进去。");
                    return false;
                }
                var em = pi.getEventManager("s4nest");
                if (em == null) {
                    pi.playerMessage("由于未知的原因，你不能进入。");
                } else {
                    em.startInstance(pi.getPlayer());
                    return true;
                }
            } else {
                pi.playerMessage("你没有火凤凰的卵，不能进入。");
            }
        } else if (pi.getJob() == 322) {
            if (pi.haveItem(4001114)) {
                if (pi.getPlayerCount(924000100) > 0) {
                    pi.playerMessage("挑战已经开始了，你不能进去。");
                    return false;
                }
                var em = pi.getEventManager("s4nest");
                if (em == null) {
                    pi.playerMessage("由于未知的原因，你不能进入。");
                } else {
                    em.startInstance(pi.getPlayer());
                    return true;
                }
            } else {
                pi.playerMessage("你没有冰凤凰的卵，不能进入。");
            }
        }
    } else {
        pi.playerMessage("未知的力量阻挡着你的前进。");
    }
    return false;
}