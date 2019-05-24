function enter(pi) {
    if (pi.getQuestStatus(6153) == 1) {
        if (!pi.haveItem(4031471)) {
            if (pi.haveItem(4031475)) {
                var em = pi.getEventManager("4jberserk");
                if (em == null) {
                    pi.playerMessage("由于未知的原因，你不能进入到里面。");
                } else {
                    em.startInstance(pi.getPlayer());
                    return true;
                }
                // start event here
                // if ( ret != 0 ) target.message( "Other character is on the quest currently. Please try again later." );
            } else {
                pi.playerMessage("To enter, you need a key to Forgotten Shrine.");
            }
        } else {
            pi.playerMessage("Sayram already has shield.");
        }
    } else {
        pi.playerMessage("你不能进入到里面。");
    }
    return false;
}