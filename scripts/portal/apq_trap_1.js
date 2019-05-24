function enter(pi) {
    var map = pi.getPlayer().getMap();
    var reactor = map.getReactorByName("gate01");
    var state = reactor.getState();
    if (state >= 4) {
        pi.warp(670010600, 4);
        return true;
    } else {
        pi.getClient().getSession().write(tools.MaplePacketCreator.serverNotice(5, "The gate is closed1."));
        return false;
    }
}