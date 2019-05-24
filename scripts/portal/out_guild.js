function enter(pi) {
    var returnMap = pi.getSavedLocation("GUILD");
    pi.clearSavedLocation("GUILD");
    if (returnMap < 0) {
        returnMap = 200000300;
    }
    pi.warp(returnMap);
}