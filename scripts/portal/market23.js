function enter(pi) {
	pi.getPlayer().saveLocation(net.sf.cherry.server.maps.SavedLocationType.FREE_MARKET);
	pi.warp(910000000, "st00");
	return true;
}
