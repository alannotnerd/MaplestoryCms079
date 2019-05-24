function enter(pi) {
    var returnMap = pi.getSavedLocation("TURNEGG");
    pi.clearSavedLocation("TURNEGG");
    if (returnMap < 0) {
	returnMap = 102000000;
    }
    var target = pi.getMap(returnMap);
    var portal = target.getPortal("GHousingIn00");
    if (portal == null) {
	portal = target.getPortal(0);
    }
    if (pi.getMapId() != target) {
//pi.playPortalSE();
	pi.getPlayer().changeMap(target, portal);
    }
}