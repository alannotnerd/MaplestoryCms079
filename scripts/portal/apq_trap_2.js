function enter(pi) {
	var map = pi.getPlayer().getMap();
	var reactor = map.getReactorByName("gate02");
	var state = reactor.getState();
	if (state >= 4) {
		pi.warp(670010600, 6);
		return true;
	} else {
		pi.getClient().getSession().write(net.sf.cherry.tools.MaplePacketCreator.serverNotice(5, "门已关闭"));
		return false;
	}
}
