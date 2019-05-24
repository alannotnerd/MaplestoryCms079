function enter(pi) {
    if (!pi.dojoAgent_NextMap(false, false)) {
        pi.playerMessage("有一些怪物。");
    }else{
	pi.resetMapS();
	}
	
}