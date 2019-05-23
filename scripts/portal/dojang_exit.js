importPackage(net.sf.cherry.server.maps);

function enter(pi) {
    var returnMap = pi.getPlayer().getSavedLocation(SavedLocationType.DOJO);
    if (returnMap == null||returnMap <=-1) {
        pi.warp(100000000);
	return true;
    }else{
    pi.getPlayer().clearSavedLocation(SavedLocationType.DOJO);
    pi.warp(returnMap);
    return true;}
}
